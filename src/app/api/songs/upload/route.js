import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import connectDB from "@/lib/db";
import Song from "@/models/songs";

const BUCKET = "Dandiya-night-songs";

export async function POST(request) {
  try {
    // Connect MongoDB
    await connectDB();

    // Get form data
    const formData = await request.formData();

    const audioFile = formData.get("file");
    const coverFile = formData.get("cover");

    const title = formData.get("title");
    const artist = formData.get("artist");
    const genre = formData.get("genre");

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!audioFile) {
      return NextResponse.json(
        {
          success: false,
          message: "Song file is required",
        },
        { status: 400 }
      );
    }

    if (!audioFile.type.startsWith("audio/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only audio files are allowed",
        },
        { status: 400 }
      );
    }

    if (!title || !title.toString().trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Song title is required",
        },
        { status: 400 }
      );
    }

    // Max audio = 20MB
    const MAX_AUDIO_SIZE = 20 * 1024 * 1024;

    if (audioFile.size > MAX_AUDIO_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Maximum audio size is 20MB",
        },
        { status: 400 }
      );
    }

    // Cover validation
    if (coverFile) {
      if (!coverFile.type.startsWith("image/")) {
        return NextResponse.json(
          {
            success: false,
            message: "Cover must be an image",
          },
          { status: 400 }
        );
      }

      // Max cover = 5MB
      const MAX_COVER_SIZE = 5 * 1024 * 1024;

      if (coverFile.size > MAX_COVER_SIZE) {
        return NextResponse.json(
          {
            success: false,
            message: "Maximum cover image size is 5MB",
          },
          { status: 400 }
        );
      }
    }

    // -----------------------------
    // CREATE UNIQUE FILE NAMES
    // -----------------------------

    const safeTitle = title
      .toString()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const uniqueId = `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 8)}`;

    // -----------------------------
    // AUDIO PATH
    // -----------------------------

    const audioExtension =
      audioFile.name.split(".").pop() || "mp3";

    const audioFileName =
      `${uniqueId}-${safeTitle}.${audioExtension}`;

    const audioPath = `songs/${audioFileName}`;

    // -----------------------------
    // UPLOAD AUDIO
    // -----------------------------

    const audioArrayBuffer = await audioFile.arrayBuffer();

    const { error: audioUploadError } =
      await supabaseAdmin.storage
        .from(BUCKET)
        .upload(audioPath, audioArrayBuffer, {
          contentType: audioFile.type,
          upsert: false,
        });

    if (audioUploadError) {
      console.error(
        "Audio upload error:",
        audioUploadError
      );

      return NextResponse.json(
        {
          success: false,
          message: "Failed to upload audio",
          error: audioUploadError.message,
        },
        { status: 500 }
      );
    }

    // -----------------------------
    // GET AUDIO URL
    // -----------------------------

    const { data: audioPublicUrlData } =
      supabaseAdmin.storage
        .from(BUCKET)
        .getPublicUrl(audioPath);

    const audioUrl =
      audioPublicUrlData.publicUrl;

    // -----------------------------
    // COVER
    // -----------------------------

    let coverUrl = null;
    let coverPath = null;

    if (coverFile) {
      const coverExtension =
        coverFile.name.split(".").pop() || "jpg";

      const coverFileName =
        `${uniqueId}-${safeTitle}.${coverExtension}`;

      coverPath = `covers/${coverFileName}`;

      const coverArrayBuffer =
        await coverFile.arrayBuffer();

      // Upload cover
      const { error: coverUploadError } =
        await supabaseAdmin.storage
          .from(BUCKET)
          .upload(
            coverPath,
            coverArrayBuffer,
            {
              contentType: coverFile.type,
              upsert: false,
            }
          );

      if (coverUploadError) {
        console.error(
          "Cover upload error:",
          coverUploadError
        );

        // Remove audio if cover upload fails
        await supabaseAdmin.storage
          .from(BUCKET)
          .remove([audioPath]);

        return NextResponse.json(
          {
            success: false,
            message: "Failed to upload cover",
            error: coverUploadError.message,
          },
          { status: 500 }
        );
      }

      // Get cover URL
      const { data: coverPublicUrlData } =
        supabaseAdmin.storage
          .from(BUCKET)
          .getPublicUrl(coverPath);

      coverUrl =
        coverPublicUrlData.publicUrl;
    }

    // -----------------------------
    // SAVE TO MONGODB
    // -----------------------------

    const song = await Song.create({
      title: title.toString().trim(),

      artist: artist
        ? artist.toString().trim()
        : "",

      genre: genre
        ? genre.toString().trim()
        : "",

      audioUrl,

      coverUrl,

      audioPath,

      coverPath,

      isActive: true,

      order: 0,
    });

    // -----------------------------
    // RESPONSE
    // -----------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Song uploaded successfully",

        song: {
          id: song._id,

          title: song.title,
          artist: song.artist,
          genre: song.genre,

          audioUrl: song.audioUrl,
          coverUrl: song.coverUrl,

          audioPath: song.audioPath,
          coverPath: song.coverPath,
        },
      },
      { status: 201 }
    );

    console.log("SUPABASE URL:", process.env.SUPABASE_URL);

  } catch (error) {
    console.error(
      "Song upload error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
        error: error.message,
      },
      { status: 500 }
    );
  }
}