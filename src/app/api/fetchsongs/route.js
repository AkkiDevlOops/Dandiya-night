import { NextResponse } from "next/server";

import { redis } from "@/lib/redis";
import connectDB from "@/lib/db";
import Song from "@/models/songs";

const SONGS_CACHE_KEY = "dandiya:songs";

export async function GET() {
  try {
    // --------------------------------
    // 1. CHECK REDIS CACHE
    // --------------------------------
    // const deletedcachedsongs = await redis.del(SONGS_CACHE_KEY);
    const cachedSongs = await redis.get(SONGS_CACHE_KEY);

    if (cachedSongs) {
      console.log("🎵 Songs: Redis CACHE HIT");

      return NextResponse.json({
        success: true,
        source: "cache",
        songs: cachedSongs,
      });
    }

    console.log("🎵 Songs: Redis CACHE MISS");

    // --------------------------------
    // 2. FETCH FROM MONGODB
    // --------------------------------

    await connectDB();

    const songs = await Song.find({
      isActive: true,
    })
      .sort({ order: 1, createdAt: 1 })
      .select(
        "_id title artist genre audioUrl coverUrl order"
      )
      .lean();

    // --------------------------------
    // 3. FORMAT FOR FRONTEND
    // --------------------------------

    const formattedSongs = songs.map((song) => ({
      id: song._id.toString(),

      title: song.title,
      artist: song.artist,
      genre: song.genre,

      audioUrl: song.audioUrl,
      coverUrl: song.coverUrl,

      order: song.order,
    }));

    // --------------------------------
    // 4. SAVE PERMANENTLY IN REDIS
    // --------------------------------

    await redis.set(
      SONGS_CACHE_KEY,
      formattedSongs
    );

    console.log("🎵 Songs: Saved to Redis");

    // --------------------------------
    // 5. SEND TO FRONTEND
    // --------------------------------

    return NextResponse.json({
      success: true,
      source: "database",
      songs: formattedSongs,
    });

  } catch (error) {
    console.error("Get songs error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch songs",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}