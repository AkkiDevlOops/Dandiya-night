
"use client";

import { useEffect, useRef, useState } from "react";

export default function UploadSongsPage() {
  const audioRef = useRef(null);

  // =========================
  // SONGS
  // =========================

  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  // =========================
  // PLAYER
  // =========================

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // =========================
  // FORM
  // =========================

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");

  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const [coverPreview, setCoverPreview] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // =========================
  // COVER PREVIEW
  // =========================

  useEffect(() => {
    if (!coverFile) {
      setCoverPreview(null);
      return;
    }

    const url = URL.createObjectURL(coverFile);

    setCoverPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [coverFile]);

  // =========================
  // PLAY SONG
  // =========================

  const playSong = async (song) => {
  if (!audioRef.current) return;

  console.log("PLAYING SONG:", song);
  console.log("AUDIO URL:", song.audioUrl);

  try {
    const audio = audioRef.current;

    audio.pause();
    audio.src = song.audioUrl;
    audio.load();

    setCurrentSong(song);
    setCurrentTime(0);
    audio.volume = volume;

    await audio.play();

    setIsPlaying(true);
  } catch (error) {
    console.error("Playback error:", error);
    console.error("Audio URL:", song.audioUrl);

    setIsPlaying(false);
  }
};
  // =========================
  // PLAY / PAUSE
  // =========================

  const togglePlay = async () => {
    if (!audioRef.current || !currentSong) {
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();

        setIsPlaying(false);
      } else {
        await audioRef.current.play();

        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Playback error:", error);
    }
  };

  // =========================
  // NEXT SONG
  // =========================

  const nextSong = () => {
    if (!songs.length) return;

    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong?.id
    );

    const nextIndex =
      currentIndex === -1
        ? 0
        : (currentIndex + 1) % songs.length;

    playSong(songs[nextIndex]);
  };

  // =========================
  // PREVIOUS SONG
  // =========================

  const previousSong = () => {
    if (!songs.length) return;

    const currentIndex = songs.findIndex(
      (song) => song.id === currentSong?.id
    );

    const previousIndex =
      currentIndex <= 0
        ? songs.length - 1
        : currentIndex - 1;

    playSong(songs[previousIndex]);
  };

  // =========================
  // AUDIO TIME
  // =========================

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    setCurrentTime(audioRef.current.currentTime);
  };

  // =========================
  // AUDIO METADATA
  // =========================

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration || 0);
  };

  // =========================
  // SONG ENDED
  // =========================

  const handleEnded = () => {
    nextSong();
  };

  // =========================
  // SEEK
  // =========================

  const handleSeek = (e) => {
    const value = Number(e.target.value);

    if (!audioRef.current) return;

    audioRef.current.currentTime = value;

    setCurrentTime(value);
  };

  // =========================
  // VOLUME
  // =========================

  const handleVolume = (e) => {
    const value = Number(e.target.value);

    setVolume(value);

    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  // =========================
  // FORMAT TIME
  // =========================

  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = Math.floor(
      seconds % 60
    );

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // =========================
  // REMOVE COVER
  // =========================

  const removeCover = () => {
    setCoverFile(null);
    setCoverPreview(null);

    const input =
      document.getElementById("cover-file");

    if (input) {
      input.value = "";
    }
  };

  // =========================
  // UPLOAD SONG
  // =========================

  const uploadSong = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!audioFile) {
      setMessage("Please select an audio file.");
      return;
    }

    if (!title.trim()) {
      setMessage("Please enter a song title.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      // Audio
      formData.append("file", audioFile);

      // Cover
      if (coverFile) {
        formData.append("cover", coverFile);
      }

      // Metadata
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("genre", genre);

      const response = await fetch(
        "/api/songs/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Upload failed"
        );
      }

      // =========================
      // CREATE SONG OBJECT
      // =========================

      const newSong = {
        id: Date.now().toString(),

        title: data.song.title,

        artist: data.song.artist,

        genre: data.song.genre,

        audioUrl: data.song.audioUrl,

        coverUrl: data.song.coverUrl,
      };

      setSongs((prev) => [
        ...prev,
        newSong,
      ]);

      // =========================
      // RESET FORM
      // =========================

      setTitle("");
      setArtist("");
      setGenre("");

      setAudioFile(null);
      setCoverFile(null);
      setCoverPreview(null);

      const audioInput =
        document.getElementById(
          "audio-file"
        );

      const coverInput =
        document.getElementById(
          "cover-file"
        );

      if (audioInput) {
        audioInput.value = "";
      }

      if (coverInput) {
        coverInput.value = "";
      }

      setMessage(
        "Song uploaded successfully!"
      );

      // =========================
      // PLAY UPLOADED SONG
      // =========================

      await playSong(newSong);
    } catch (error) {
      console.error(
        "Upload error:",
        error
      );

      setMessage(
        error.message ||
          "Something went wrong."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-white">

      {/* ========================= */}
      {/* AUDIO PLAYER */}
      {/* ========================= */}

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={
          handleLoadedMetadata
        }
        onEnded={handleEnded}
        onPlay={() =>
          setIsPlaying(true)
        }
        onPause={() =>
          setIsPlaying(false)
        }
      />

      <div className="mx-auto max-w-6xl px-5 py-10">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="mb-10">

          <p className="mb-2 text-sm font-medium tracking-widest text-pink-400">
            DANDIYA NIGHT
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Music Library
          </h1>

          <p className="mt-2 text-zinc-400">
            Upload songs and create your
            playlist.
          </p>

        </div>

        {/* ========================= */}
        {/* UPLOAD FORM */}
        {/* ========================= */}

        <section className="mb-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6">

          <div className="mb-6">

            <h2 className="text-xl font-semibold">
              Upload a song
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Add your audio and cover
              artwork.
            </p>

          </div>

          <form
            onSubmit={uploadSong}
            className="space-y-5"
          >

            {/* ===================== */}
            {/* SONG TITLE */}
            {/* ===================== */}

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Song title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="e.g. Dholida"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition focus:border-pink-500"
              />

            </div>

            {/* ===================== */}
            {/* ARTIST */}
            {/* ===================== */}

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Artist
              </label>

              <input
                type="text"
                value={artist}
                onChange={(e) =>
                  setArtist(e.target.value)
                }
                placeholder="e.g. Falguni Pathak"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition focus:border-pink-500"
              />

            </div>

            {/* ===================== */}
            {/* GENRE */}
            {/* ===================== */}

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Genre
              </label>

              <input
                type="text"
                value={genre}
                onChange={(e) =>
                  setGenre(e.target.value)
                }
                placeholder="Garba / Romantic / Chill"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none transition focus:border-pink-500"
              />

            </div>

            {/* ===================== */}
            {/* AUDIO FILE */}
            {/* ===================== */}

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Audio file
              </label>

              <input
                id="audio-file"
                type="file"
                accept=".mp3,audio/mpeg"
                onChange={(e) =>
                  setAudioFile(
                    e.target.files?.[0] ||
                      null
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-black/30 p-3 text-sm text-zinc-400 file:mr-4 file:rounded-lg file:border-0 file:bg-pink-500 file:px-4 file:py-2 file:font-medium file:text-white"
              />

              {audioFile && (
                <p className="mt-2 text-xs text-zinc-500">
                  Selected:{" "}
                  {audioFile.name}
                </p>
              )}

            </div>

            {/* ===================== */}
            {/* COVER IMAGE */}
            {/* ===================== */}

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Cover image
              </label>

              <div className="flex flex-wrap items-center gap-4">

                {/* COVER PREVIEW */}

                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">

                  {coverPreview ? (

                    <img
                      src={coverPreview}
                      alt="Cover preview"
                      className="h-full w-full object-cover"
                    />

                  ) : (

                    <div className="flex h-full w-full items-center justify-center text-3xl">
                      🖼️
                    </div>

                  )}

                </div>

                {/* CHOOSE COVER */}

                <label
                  htmlFor="cover-file"
                  className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium transition hover:bg-white/10"
                >
                  Choose Cover

                  <input
                    id="cover-file"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) => {
                      const selectedFile =
                        e.target.files?.[0];

                      if (selectedFile) {
                        setCoverFile(
                          selectedFile
                        );
                      }
                    }}
                    className="hidden"
                  />

                </label>

                {/* REMOVE */}

                {coverFile && (

                  <button
                    type="button"
                    onClick={removeCover}
                    className="text-sm text-red-400 transition hover:text-red-300"
                  >
                    Remove
                  </button>

                )}

              </div>

              {coverFile && (
                <p className="mt-2 text-xs text-zinc-500">
                  Selected:{" "}
                  {coverFile.name}
                </p>
              )}

            </div>

            {/* ===================== */}
            {/* UPLOAD BUTTON */}
            {/* ===================== */}

            <button
              type="submit"
              disabled={uploading}
              className="w-full rounded-xl bg-pink-500 px-5 py-3 font-semibold transition hover:bg-pink-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading
                ? "Uploading..."
                : "Upload Song"}
            </button>

          </form>

          {/* ========================= */}
          {/* MESSAGE */}
          {/* ========================= */}

          {message && (

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
              {message}
            </div>

          )}

        </section>

        {/* ========================= */}
        {/* PLAYLIST */}
        {/* ========================= */}

        <section>

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              Playlist
            </h2>

            <span className="text-sm text-zinc-500">
              {songs.length}{" "}
              {songs.length === 1
                ? "song"
                : "songs"}
            </span>

          </div>

          {/* EMPTY */}

          {songs.length === 0 ? (

            <div className="rounded-3xl border border-dashed border-white/10 py-16 text-center">

              <div className="mb-3 text-4xl">
                🎵
              </div>

              <p className="font-medium">
                No songs yet
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Upload your first song
                above.
              </p>

            </div>

          ) : (

            <div className="space-y-3">

              {songs.map(
                (song, index) => {

                  const active =
                    currentSong?.id ===
                    song.id;

                  return (

                    <button
                      key={song.id}
                      type="button"
                      onClick={() =>
                        playSong(song)
                      }
                      className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition ${
                        active
                          ? "border-pink-500/40 bg-pink-500/10"
                          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                      }`}
                    >

                      {/* NUMBER */}

                      <div className="w-6 shrink-0 text-center text-sm text-zinc-500">

                        {active &&
                        isPlaying
                          ? "♫"
                          : index + 1}

                      </div>

                      {/* COVER */}

                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-800">

                        {song.coverUrl ? (

                          <img
                            src={
                              song.coverUrl
                            }
                            alt={
                              song.title
                            }
                            className="h-full w-full object-cover"
                          />

                        ) : (

                          <div className="flex h-full w-full items-center justify-center text-xl">
                            🎵
                          </div>

                        )}

                      </div>

                      {/* INFO */}

                      <div className="min-w-0 flex-1">

                        <p
                          className={`truncate font-medium ${
                            active
                              ? "text-pink-400"
                              : "text-white"
                          }`}
                        >
                          {song.title}
                        </p>

                        <p className="mt-1 truncate text-sm text-zinc-500">

                          {song.artist ||
                            "Unknown artist"}

                          {song.genre
                            ? ` • ${song.genre}`
                            : ""}

                        </p>

                      </div>

                      {/* PLAY */}

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">

                        {active &&
                        isPlaying
                          ? "Ⅱ"
                          : "▶"}

                      </div>

                    </button>

                  );
                }
              )}

            </div>

          )}

        </section>

      </div>

      {/* ========================= */}
      {/* BOTTOM PLAYER */}
      {/* ========================= */}

      {currentSong && (

        <div className="sticky bottom-0 border-t border-white/10 bg-[#111113]/95 px-5 py-5 backdrop-blur-xl">

          <div className="mx-auto max-w-6xl">

            {/* SONG INFO */}

            <div className="mb-4 flex items-center gap-4">

              {/* COVER */}

              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-zinc-800">

                {currentSong.coverUrl ? (

                  <img
                    src={
                      currentSong.coverUrl
                    }
                    alt={
                      currentSong.title
                    }
                    className="h-full w-full object-cover"
                  />

                ) : (

                  <div className="flex h-full w-full items-center justify-center text-xl">
                    🎵
                  </div>

                )}

              </div>

              {/* INFO */}

              <div className="min-w-0 flex-1">

                <p className="truncate font-semibold">
                  {currentSong.title}
                </p>

                <p className="truncate text-sm text-zinc-500">
                  {currentSong.artist ||
                    "Unknown artist"}
                </p>

              </div>

            </div>

            {/* PROGRESS */}

            <div className="flex items-center gap-3">

              <span className="w-10 text-right text-xs text-zinc-500">
                {formatTime(
                  currentTime
                )}
              </span>

              <input
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="h-1 flex-1 cursor-pointer accent-pink-500"
              />

              <span className="w-10 text-xs text-zinc-500">
                {formatTime(
                  duration
                )}
              </span>

            </div>

            {/* CONTROLS */}

            <div className="mt-4 flex items-center justify-center gap-5">

              <button
                type="button"
                onClick={
                  previousSong
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Previous song"
              >
                ◀◀
              </button>

              <button
                type="button"
                onClick={
                  togglePlay
                }
                className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-xl transition hover:bg-pink-400"
                aria-label={
                  isPlaying
                    ? "Pause"
                    : "Play"
                }
              >
                {isPlaying
                  ? "Ⅱ"
                  : "▶"}
              </button>

              <button
                type="button"
                onClick={
                  nextSong
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Next song"
              >
                ▶▶
              </button>

            </div>

            {/* VOLUME */}

            <div className="mt-4 flex justify-end">

              <div className="flex items-center gap-3">

                <span className="text-sm">
                  🔊
                </span>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={
                    handleVolume
                  }
                  className="w-28 accent-pink-500"
                  aria-label="Volume"
                />

              </div>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}
