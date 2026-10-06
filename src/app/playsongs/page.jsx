"use client";

import { useEffect, useRef, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  List,
  Volume2,
  MessageSquareQuote,
  MoreHorizontal,
} from "lucide-react";

export default function MusicPlayer() {
  // ============================================
  // SONGS
  // ============================================

  const [songs, setSongs] = useState([]);

  const [current, setCurrent] = useState(0);

  const [playing, setPlaying] = useState(false);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ============================================
  // AUDIO
  // ============================================

  const audioRef = useRef(null);

  // ============================================
  // FETCH SONGS FROM BACKEND
  // ============================================

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/fetchsongs", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch songs"
          );
        }

        if (!Array.isArray(data.songs)) {
          throw new Error("Invalid songs data");
        }

        const shuffledSongs = shuffleSongs(data.songs);

       setSongs(shuffledSongs);

        console.log(
          `🎵 Loaded ${data.songs.length} songs from ${data.source}`
        );
      } catch (err) {
        console.error("Fetch songs error:", err);

        setError(
          err.message || "Failed to load songs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // ============================================
  // CURRENT SONG
  // ============================================

  const song = songs[current];

  // ============================================
  // PLAY SONG
  // ============================================

  const shuffleSongs = (songs) => {
  const shuffled = [...songs];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled;
};

  const playSong = async (index) => {
    if (!songs.length) return;

    const audio = audioRef.current;

    if (!audio) return;

    const selectedSong = songs[index];

    if (!selectedSong?.audioUrl) {
      console.error(
        "Song does not have audioUrl:",
        selectedSong
      );

      return;
    }

    try {
      // Stop previous song
      audio.pause();

      // Set new song
      audio.src = selectedSong.audioUrl;

      audio.load();

      // Play new song
      await audio.play();

      setPlaying(true);
    } catch (err) {
      console.error(
        "Playback error:",
        err
      );

      console.error(
        "Audio URL:",
        selectedSong.audioUrl
      );

      setPlaying(false);
    }
  };

  // ============================================
  // CHANGE SONG
  // ============================================

  const changeSong = async (newIndex) => {
    if (!songs.length) return;

    const normalizedIndex =
      (newIndex + songs.length) % songs.length;

    setCurrent(normalizedIndex);

    // Start the new song
    await playSong(normalizedIndex);
  };

  // ============================================
  // PREVIOUS
  // ============================================

  const previous = async () => {
    if (!songs.length) return;

    const newIndex =
      (current - 1 + songs.length) %
      songs.length;

    await changeSong(newIndex);
  };

  // ============================================
  // NEXT
  // ============================================

  const next = async () => {
    if (!songs.length) return;

    const newIndex =
      (current + 1) % songs.length;

    await changeSong(newIndex);
  };

  // ============================================
  // PLAY / PAUSE
  // ============================================

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio || !song) return;

    try {
      if (playing) {
        audio.pause();
        setPlaying(false);
      } else {
        /*
         * If audio source is empty, load current song
         */
        if (!audio.src || audio.src !== song.audioUrl) {
          audio.src = song.audioUrl;
          audio.load();
        }

        await audio.play();

        setPlaying(true);
      }
    } catch (err) {
      console.error(
        "Playback error:",
        err
      );

      console.error(
        "Audio URL:",
        song.audioUrl
      );

      setPlaying(false);
    }
  };

  // ============================================
  // AUTO NEXT WHEN SONG ENDS
  // ============================================

  const handleSongEnded = async () => {
    if (!songs.length) return;

    const nextIndex =
      (current + 1) % songs.length;

    setCurrent(nextIndex);

    await playSong(nextIndex);
  };

  // ============================================
  // GET SONG AT POSITION
  // ============================================

  const getSong = (offset) => {
    if (!songs.length) return null;

    const index =
      (current + offset + songs.length) %
      songs.length;

    return songs[index];
  };

  // ============================================
  // LOADING
  // ============================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#c9790b] text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />

          <p className="text-lg font-medium">
            Loading songs...
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // ERROR
  // ============================================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#c9790b] px-5 text-white">
        <div className="max-w-md rounded-2xl border border-white/20 bg-black/20 p-8 text-center backdrop-blur-xl">
          <p className="mb-3 text-xl font-semibold">
            Failed to load songs
          </p>

          <p className="text-sm text-white/70">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // NO SONGS
  // ============================================

  if (!songs.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#c9790b] text-white">
        <p>No songs available.</p>
      </div>
    );
  }

  // ============================================
  // CAROUSEL SONGS
  // ============================================

  const leftFar = getSong(-2);
  const leftNear = getSong(-1);

  const rightNear = getSong(1);
  const rightFar = getSong(2);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#c9790b]"
      style={{
        backgroundImage: `url(${song.coverUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ============================================
          BACKGROUND BLUR
      ============================================ */}

      <div className="absolute inset-0 bg-black/25 backdrop-blur-[35px]" />

      {/* ============================================
          AUDIO ELEMENT
      ============================================ */}

      <audio
        ref={audioRef}
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={handleSongEnded}
        onError={(e) => {
          console.error(
            "Audio element error:",
            e
          );

          console.error(
            "Current audio URL:",
            song?.audioUrl
          );

          setPlaying(false);
        }}
      />

      {/* ============================================
          MAIN CONTENT
      ============================================ */}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pb-32 pt-10">

        {/* ============================================
            CAROUSEL
        ============================================ */}

        <div className="relative flex h-[430px] w-full max-w-6xl items-center justify-center">

          {/* ==========================================
              LEFT FAR CARD - CURRENT - 2
          ========================================== */}

          {leftFar && (
            <div
              className="
                absolute
                left-[3%]
                hidden
                w-[210px]
                rotate-[-8deg]
                scale-90
                overflow-hidden
                rounded-2xl
                border border-white/30
                bg-white/10
                shadow-2xl
                backdrop-blur-md
                lg:block
              "
            >
              <img
                src={leftFar.coverUrl}
                className="h-[270px] w-full object-cover"
                alt={leftFar.title}
              />

              <div className="p-4 text-white">
                <p className="truncate text-lg font-medium">
                  {leftFar.title}
                </p>

                <p className="text-sm text-white/70">
                  {leftFar.artist}
                </p>
              </div>
            </div>
          )}

          {/* ==========================================
              LEFT NEAR CARD - CURRENT - 1
          ========================================== */}

          {leftNear && (
            <div
              className="
                absolute
                left-[17%]
                hidden
                w-[230px]
                rotate-[-5deg]
                scale-95
                overflow-hidden
                rounded-2xl
                border border-white/30
                bg-white/10
                shadow-2xl
                backdrop-blur-md
                md:block
              "
            >
              <img
                src={leftNear.coverUrl}
                className="h-[300px] w-full object-cover"
                alt={leftNear.title}
              />

              <div className="p-4 text-white">
                <p className="truncate text-lg font-medium">
                  {leftNear.title}
                </p>

                <p className="text-sm text-white/70">
                  {leftNear.artist}
                </p>
              </div>
            </div>
          )}

          {/* ==========================================
              MAIN CARD
          ========================================== */}

          <div
            className="
              relative
              z-20
              w-[270px]
              overflow-hidden
              rounded-[22px]
              border
              border-white/40
              bg-white/15
              shadow-[0_25px_70px_rgba(0,0,0,0.4)]
              backdrop-blur-xl
              sm:w-[300px]
              md:w-[320px]
            "
          >
            <div className="relative">

              <img
                src={song.coverUrl}
                alt={song.title}
                className="
                  aspect-square
                  w-full
                  object-cover
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            </div>

            <div className="px-5 py-5 text-center text-white">

              <h1 className="text-xl font-semibold sm:text-2xl">
                {song.title}
              </h1>

              <p className="mt-1 text-sm text-white/75 sm:text-base">
                {song.artist}
              </p>

            </div>
          </div>

          {/* ==========================================
              RIGHT NEAR CARD - CURRENT + 1
          ========================================== */}

          {rightNear && (
            <div
              className="
                absolute
                right-[17%]
                hidden
                w-[230px]
                rotate-[5deg]
                scale-95
                overflow-hidden
                rounded-2xl
                border border-white/30
                bg-white/10
                shadow-2xl
                backdrop-blur-md
                md:block
              "
            >
              <img
                src={rightNear.coverUrl}
                className="h-[300px] w-full object-cover"
                alt={rightNear.title}
              />

              <div className="p-4 text-white">
                <p className="truncate text-lg font-medium">
                  {rightNear.title}
                </p>

                <p className="text-sm text-white/70">
                  {rightNear.artist}
                </p>
              </div>
            </div>
          )}

          {/* ==========================================
              RIGHT FAR CARD - CURRENT + 2
          ========================================== */}

          {rightFar && (
            <div
              className="
                absolute
                right-[3%]
                hidden
                w-[210px]
                rotate-[8deg]
                scale-90
                overflow-hidden
                rounded-2xl
                border border-white/30
                bg-white/10
                shadow-2xl
                backdrop-blur-md
                lg:block
              "
            >
              <img
                src={rightFar.coverUrl}
                className="h-[270px] w-full object-cover"
                alt={rightFar.title}
              />

              <div className="p-4 text-white">
                <p className="truncate text-lg font-medium">
                  {rightFar.title}
                </p>

                <p className="text-sm text-white/70">
                  {rightFar.artist}
                </p>
              </div>
            </div>
          )}

          {/* ==========================================
              MOBILE PREVIOUS
          ========================================== */}

          <button
            onClick={previous}
            className="
              absolute
              left-1
              z-30
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              bg-black/20
              text-white
              backdrop-blur-md
              sm:left-4
              md:hidden
            "
          >
            <ChevronLeft size={20} />
          </button>

          {/* ==========================================
              MOBILE NEXT
          ========================================== */}

          <button
            onClick={next}
            className="
              absolute
              right-1
              z-30
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              bg-black/20
              text-white
              backdrop-blur-md
              sm:right-4
              md:hidden
            "
          >
            <ChevronRight size={20} />
          </button>

        </div>

        {/* ============================================
            MOBILE SONG INFO
        ============================================ */}

        <div className="mt-3 text-center text-white md:hidden">

          <p className="text-lg font-semibold">
            {song.title}
          </p>

          <p className="text-sm text-white/70">
            {song.artist}
          </p>

        </div>

        {/* ============================================
            PLAYER
        ============================================ */}

        <div
          className="
            fixed
            bottom-4
            left-1/2
            z-50
            w-[calc(100%-24px)]
            -translate-x-1/2
            rounded-2xl
            border
            border-white/30
            bg-black/25
            p-3
            shadow-2xl
            backdrop-blur-2xl
            sm:w-[calc(100%-40px)]
            md:bottom-8
            md:max-w-[900px]
            md:rounded-full
            md:px-5
            md:py-3
          "
        >

          <div className="flex items-center gap-3">

            {/* PREVIOUS */}

            <button
              onClick={previous}
              className="
                hidden
                shrink-0
                text-white/80
                hover:text-white
                sm:block
              "
            >
              <ChevronLeft size={25} />
            </button>

            {/* PLAY / PAUSE */}

            <button
              onClick={togglePlay}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                text-black
                transition
                hover:scale-105
              "
            >
              {playing ? (
                <Pause
                  size={18}
                  fill="currentColor"
                />
              ) : (
                <Play
                  size={18}
                  fill="currentColor"
                />
              )}
            </button>

            {/* NEXT */}

            <button
              onClick={next}
              className="
                hidden
                shrink-0
                text-white/80
                hover:text-white
                sm:block
              "
            >
              <ChevronRight size={25} />
            </button>

            {/* CURRENT SONG */}

            <div className="flex min-w-0 flex-1 items-center gap-3">

              <img
                src={song.coverUrl}
                alt={song.title}
                className="
                  h-10
                  w-10
                  shrink-0
                  rounded-lg
                  object-cover
                "
              />

              <div className="min-w-0">

                <p className="truncate text-sm font-medium text-white">
                  {song.title}
                </p>

                <p className="truncate text-xs text-white/60">
                  {song.artist}
                </p>

              </div>

            </div>

            {/* DESKTOP ACTIONS */}

            <div className="hidden items-center gap-5 text-white/80 md:flex">

              <button>
                <MessageSquareQuote size={20} />
              </button>

              <button>
                <List size={20} />
              </button>

              <button>
                <Volume2 size={20} />
              </button>

              <button>
                <MoreHorizontal size={21} />
              </button>

            </div>

            {/* MOBILE MENU */}

            <button className="text-white/80 md:hidden">
              <MoreHorizontal size={21} />
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}