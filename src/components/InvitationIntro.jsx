
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

const VIDEO_SRC = "/assets/invitation-opening.mp4";
const POSTER_SRC = "/assets/wedding-hero.png";

export default function InvitationIntro({ onOpen, onStartMusic }) {
  const videoRef = useRef(null);
  const openedRef = useRef(false);
  const musicStartedRef = useRef(false);

  const [stage, setStage] = useState("poster");
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState("");

  // Start romantic music and invitation video from the same card tap.
  const startVideo = async () => {
    // Prevent accidental duplicate music start attempts.
    if (!musicStartedRef.current) {
      musicStartedRef.current = true;

      try {
        const musicPromise = onStartMusic?.();

        // Do not block video playback while music starts.
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

    if (!video) {
      setVideoError("Video player is not ready. Please refresh.");
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

    const playPromise = video.play();

    setStage("video");

    try {
      await playPromise;

      setIsPlaying(true);
      setIsLoading(false);
      setVideoError("");
    } catch (error) {
      console.error("Invitation video playback failed:", error);

      setIsPlaying(false);
      setIsLoading(false);

      setVideoError(
        "Unable to start the invitation video. Please tap retry."
      );
    }
  };

  // Retry video without restarting the background song.
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

      setVideoError(
        "Unable to play the video. Please check your MP4 file."
      );
    }
  };

  // Toggle invitation video sound.
  const toggleSound = () => {
    const video = videoRef.current;
    const nextMuted = !muted;

    setMuted(nextMuted);

    if (video) {
      video.muted = nextMuted;
    }
  };

  // Enter the wedding website after video ends or visitor skips.
  const enterWedding = () => {
    if (openedRef.current) return;

    openedRef.current = true;

    const video = videoRef.current;

    if (video) {
      video.pause();
    }

    setIsPlaying(false);

    // Background music remains playing.
    onOpen?.();
  };

  const handleVideoPlaying = () => {
    setIsPlaying(true);
    setIsLoading(false);
    setVideoError("");
  };

  const handleVideoWaiting = () => {
    setIsLoading(true);
  };

  const handleVideoCanPlay = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    const video = videoRef.current;

    console.error("Invitation video error:", {
      code: video?.error?.code,
      message: video?.error?.message,
      source: VIDEO_SRC,
    });

    setIsPlaying(false);
    setIsLoading(false);

    setVideoError(
      "Unable to load invitation-opening.mp4. Please check the file path and video format."
    );
  };

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return (
    <main
      className="invitation-entry"
      aria-label="Shreyash and Divya wedding invitation"
    >
      {/* Invitation video stage */}
      <section
        className={`video-stage ${
          stage === "video" ? "is-active" : "is-hidden"
        }`}
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
          <source src={VIDEO_SRC} type="video/mp4" />

          Your browser does not support HTML5 video.
        </video>

        <div className="video-controls">
          <span className="video-couple-mark">
            SHREYASH <i>&amp;</i> DIVYA
          </span>

          <button
            type="button"
            className="sound-toggle"
            onClick={toggleSound}
            aria-label={muted ? "Enable sound" : "Mute sound"}
          >
            {muted ? (
              <VolumeX size={17} />
            ) : (
              <Volume2 size={17} />
            )}

            <small>
              {muted ? "SOUND OFF" : "SOUND ON"}
            </small>
          </button>
        </div>

        {/* Video loading animation */}
        {isLoading && !videoError && (
          <div className="video-loading" role="status">
            <span className="video-loading-icon">
              <LoaderCircle
                size={28}
                className="loading-spin"
              />
            </span>

            <span>Preparing your invitation...</span>
          </div>
        )}

        {/* Video error fallback */}
        {videoError && (
          <div className="video-fallback" role="alert">
            <span className="video-fallback-heart">
              <Heart size={27} />
            </span>

            <p>{videoError}</p>

            <button
              type="button"
              className="intro-primary-button"
              onClick={retryVideo}
            >
              <Play size={15} fill="currentColor" />
              Retry Video
            </button>

            <button
              type="button"
              className="fallback-enter"
              onClick={enterWedding}
            >
              Enter Wedding Celebration
            </button>
          </div>
        )}

        {/* Replay video button */}
        {!isPlaying && !isLoading && !videoError && (
          <button
            type="button"
            className="video-play-again"
            onClick={retryVideo}
          >
            <Play size={18} fill="currentColor" />
            Tap to Play
          </button>
        )}

        {/* Skip intro */}
        <button
          type="button"
          className="skip-video"
          onClick={enterWedding}
        >
          SKIP INTRO <span aria-hidden="true">→</span>
        </button>
      </section>

      {/* Invitation poster stage */}
      <AnimatePresence>
        {stage === "poster" && (
          <motion.section
            key="poster"
            className="poster-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.015,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <img
              className="wedding-poster"
              src={POSTER_SRC}
              alt="Shreyash and Divya wedding invitation"
              draggable="false"
              fetchPriority="high"
              onError={() => {
                console.error(
                  "Wedding poster could not load:",
                  POSTER_SRC
                );
              }}
            />

            <div
              className="poster-vignette"
              aria-hidden="true"
            />

            <div
              className="poster-frame"
              aria-hidden="true"
            >
              <span className="poster-frame-corner corner-top-left" />
              <span className="poster-frame-corner corner-top-right" />
              <span className="poster-frame-corner corner-bottom-left" />
              <span className="poster-frame-corner corner-bottom-right" />
            </div>

            <div className="poster-top-mark">
              <Heart size={13} fill="currentColor" />
              <span>SHREYASH &amp; DIVYA</span>
            </div>

            {/* This single card click starts BOTH music and video */}
            <button
              type="button"
              className="poster-tap"
              onClick={startVideo}
              aria-label="Open Shreyash and Divya wedding invitation"
            >
              <span className="poster-play-icon">
                <Play size={17} fill="currentColor" />
              </span>

              <span className="poster-tap-copy">
                <strong>Tap to Open Invitation</strong>

                <small>
                  THE CELEBRATION BEGINS HERE
                </small>
              </span>

              <span
                className="poster-tap-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </button>

            <div className="poster-date">
              <span />
              10 · 12 · 2026
              <span />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
