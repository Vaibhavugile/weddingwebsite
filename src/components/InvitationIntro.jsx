
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Volume2,
  VolumeX,
  Heart,
  LoaderCircle,
} from "lucide-react";
import "./InvitationIntro.css";

export default function InvitationIntro({
  invitation,
  onOpen,
  onStartMusic,
}) {
  const videoRef = useRef(null);
  const openedRef = useRef(false);
  const musicStartedRef = useRef(false);

  const bride = invitation?.bride || "Bride";
  const groom = invitation?.groom || "Groom";

  const VIDEO_SRC = invitation?.assets?.video || "";
  const POSTER_SRC = invitation?.assets?.poster || invitation?.assets?.hero || "";

  const [stage, setStage] = useState("poster");
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState("");

  const startVideo = async () => {
    if (!musicStartedRef.current) {
      musicStartedRef.current = true;

      try {
        const musicPromise = onStartMusic?.();

        if (musicPromise?.catch) {
          musicPromise.catch((error) => {
            console.warn("Background music could not start:", error);
          });
        }
      } catch (error) {
        console.warn("Background music error:", error);
      }
    }

    const video = videoRef.current;

    if (!video || !VIDEO_SRC) {
      setVideoError("The invitation video is not configured.");
      setStage("video");
      return;
    }

    setMuted(true);
    setIsPlaying(false);
    setIsLoading(true);
    setVideoError("");

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.currentTime = 0;

    setStage("video");

    try {
      await video.play();
      setIsPlaying(true);
      setIsLoading(false);
      setVideoError("");
    } catch (error) {
      console.error("Invitation video playback failed:", error);
      setIsPlaying(false);
      setIsLoading(false);
      setVideoError("Unable to start the invitation video. Please tap retry.");
    }
  };

  const retryVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    setVideoError("");
    setIsLoading(true);
    setIsPlaying(false);

    try {
      video.pause();
      video.currentTime = 0;
      video.muted = muted;
      await video.play();

      setIsPlaying(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Invitation video retry failed:", error);
      setIsPlaying(false);
      setIsLoading(false);
      setVideoError("Unable to play the video. Please check the MP4 file.");
    }
  };

  const toggleSound = () => {
    const video = videoRef.current;
    const nextMuted = !muted;

    setMuted(nextMuted);

    if (video) {
      video.muted = nextMuted;
    }
  };

  const enterWedding = () => {
    if (openedRef.current) return;

    openedRef.current = true;

    videoRef.current?.pause();
    setIsPlaying(false);
    onOpen?.();
  };

  const handleVideoPlaying = () => {
    setIsPlaying(true);
    setIsLoading(false);
    setVideoError("");
  };

  const handleVideoWaiting = () => setIsLoading(true);
  const handleVideoCanPlay = () => setIsLoading(false);

  const handleVideoError = () => {
    const video = videoRef.current;

    console.error("Invitation video error:", {
      code: video?.error?.code,
      message: video?.error?.message,
      source: VIDEO_SRC,
    });

    setIsPlaying(false);
    setIsLoading(false);
    setVideoError("Unable to load the invitation video. Please check its file path and format.");
  };

  useEffect(() => {
    return () => {
      videoRef.current?.pause();
    };
  }, []);

  return (
    <main
      className="invitation-entry"
      aria-label={`${bride} and ${groom} wedding invitation`}
    >
      <section
        className={`video-stage ${stage === "video" ? "is-active" : "is-hidden"}`}
        aria-hidden={stage !== "video"}
      >
        <video
          ref={videoRef}
          className="invitation-video"
          preload="auto"
          playsInline
          webkit-playsinline="true"
          muted={muted}
          controls={false}
          onPlaying={handleVideoPlaying}
          onWaiting={handleVideoWaiting}
          onCanPlay={handleVideoCanPlay}
          onEnded={enterWedding}
          onError={handleVideoError}
        >
          {VIDEO_SRC && <source src={VIDEO_SRC} type="video/mp4" />}
          Your browser does not support HTML5 video.
        </video>

        <div className="video-controls">
          <span className="video-couple-mark">
            {bride.toUpperCase()} <i>&amp;</i> {groom.toUpperCase()}
          </span>

          <button
            type="button"
            className="sound-toggle"
            onClick={toggleSound}
            aria-label={muted ? "Enable sound" : "Mute sound"}
          >
            {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            <small>{muted ? "SOUND OFF" : "SOUND ON"}</small>
          </button>
        </div>

        {isLoading && !videoError && (
          <div className="video-loading" role="status">
            <span className="video-loading-icon">
              <LoaderCircle size={28} className="loading-spin" />
            </span>
            <span>Preparing your invitation...</span>
          </div>
        )}

        {videoError && (
          <div className="video-fallback" role="alert">
            <span className="video-fallback-heart">
              <Heart size={27} />
            </span>

            <p>{videoError}</p>

            {VIDEO_SRC && (
              <button
                type="button"
                className="intro-primary-button"
                onClick={retryVideo}
              >
                <Play size={15} fill="currentColor" />
                Retry Video
              </button>
            )}

            <button
              type="button"
              className="fallback-enter"
              onClick={enterWedding}
            >
              Enter Wedding Celebration
            </button>
          </div>
        )}

        {!isPlaying && !isLoading && !videoError && VIDEO_SRC && (
          <button
            type="button"
            className="video-play-again"
            onClick={retryVideo}
          >
            <Play size={18} fill="currentColor" />
            Tap to Play
          </button>
        )}

        <button
          type="button"
          className="skip-video"
          onClick={enterWedding}
        >
          SKIP INTRO <span aria-hidden="true">→</span>
        </button>
      </section>

      <AnimatePresence>
        {stage === "poster" && (
          <motion.section
            key="poster"
            className="poster-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.015 }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              className="wedding-poster"
              src={POSTER_SRC}
              alt={`${bride} and ${groom} wedding invitation`}
              draggable="false"
              fetchPriority="high"
              onError={() => console.error("Wedding poster could not load:", POSTER_SRC)}
            />

            <div className="poster-vignette" aria-hidden="true" />

            <div className="poster-frame" aria-hidden="true">
              <span className="poster-frame-corner corner-top-left" />
              <span className="poster-frame-corner corner-top-right" />
              <span className="poster-frame-corner corner-bottom-left" />
              <span className="poster-frame-corner corner-bottom-right" />
            </div>

            <div className="poster-top-mark">
              <Heart size={13} fill="currentColor" />
              <span>{bride.toUpperCase()} &amp; {groom.toUpperCase()}</span>
            </div>

            <button
              type="button"
              className="poster-tap"
              onClick={startVideo}
              aria-label={`Open ${bride} and ${groom} wedding invitation`}
            >
              <span className="poster-play-icon">
                <Play size={17} fill="currentColor" />
              </span>

              <span className="poster-tap-copy">
                <strong>Tap to Open Invitation</strong>
                <small>{bride} &amp; {groom}</small>
              </span>

              <span className="poster-tap-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
