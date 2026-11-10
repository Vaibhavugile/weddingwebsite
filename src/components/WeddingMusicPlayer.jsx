
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect
} from "react";
import { motion } from "framer-motion";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import "./WeddingMusicPlayer.css";

const WeddingMusicPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useImperativeHandle(ref, () => ({
    play: async () => {
      if (!audioRef.current) return;

      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (error) {
        console.warn("Music playback could not start:", error);
        setPlaying(false);
      }
    },

    pause: () => {
      audioRef.current?.pause();
      setPlaying(false);
    }
  }));

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (error) {
        console.warn("Music playback failed:", error);
      }
    }
  };

  const toggleMute = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/wedding-romantic-song.mp3"
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
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setVolume(value);
                  setMuted(value === 0);
                  if (audioRef.current) {
                    audioRef.current.muted = value === 0;
                  }
                }}
                aria-label="Music volume"
              />
            </div>
          )}
        </div>

        <button
          className="music-volume-toggle"
          onClick={() => setShowVolume(!showVolume)}
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
        >
          {playing && (
            <span className="music-ripple" />
          )}

          {playing ? <Pause /> : <Play />}
        </button>
      </motion.div>
    </>
  );
});

WeddingMusicPlayer.displayName = "WeddingMusicPlayer";

export default WeddingMusicPlayer;
