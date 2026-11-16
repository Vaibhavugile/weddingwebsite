
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import {
  Music2,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import "./WeddingMusicPlayer.css";

const WeddingMusicPlayer = forwardRef(({ musicSrc }, ref) => {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.load();
    setPlaying(false);
  }, [musicSrc]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  useImperativeHandle(ref, () => ({
    play: async () => {
      const audio = audioRef.current;
      if (!audio || !musicSrc) return;

      try {
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.warn("Music playback could not start:", error);
        setPlaying(false);
      }
    },

    pause: () => {
      audioRef.current?.pause();
      setPlaying(false);
    },
  }), [musicSrc]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !musicSrc) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch (error) {
      console.warn("Music playback failed:", error);
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    setMuted((previous) => !previous);
  };

  const handleVolumeChange = (event) => {
    const value = Number(event.target.value);
    setVolume(value);
    setMuted(value === 0);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicSrc || undefined}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <motion.div
        className="wedding-music-player"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="music-volume-area">
          {showVolume && (
            <div className="music-volume-panel">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? <VolumeX /> : <Volume2 />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                aria-label="Music volume"
              />
            </div>
          )}
        </div>

        <button
          className="music-volume-toggle"
          onClick={() => setShowVolume((previous) => !previous)}
          aria-label="Volume settings"
          type="button"
        >
          {muted ? <VolumeX /> : <Volume2 />}
        </button>

        <button
          className={`music-main-button ${playing ? "is-playing" : ""}`}
          onClick={togglePlayback}
          aria-label={playing ? "Pause music" : "Play music"}
          type="button"
          disabled={!musicSrc}
        >
          {playing && <span className="music-ripple" />}
          {playing ? <Pause /> : <Play />}
        </button>
      </motion.div>
    </>
  );
});

WeddingMusicPlayer.displayName = "WeddingMusicPlayer";

export default WeddingMusicPlayer;
