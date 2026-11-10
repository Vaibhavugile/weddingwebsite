
import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./HeroSection.css";

const HERO_IMAGE = "/assets/wedding-hero.png";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setShowScroll(true);
      return;
    }

    const timer = setTimeout(() => {
      setShowScroll(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [reduceMotion]);

  const handleScroll = () => {
    const scrollAmount = window.innerHeight * 0.05;

    window.scrollBy({
      top: scrollAmount,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  };

  return (
    <section
      className="wedding-hero-full"
      id="home"
      aria-label="Shreyash and Divya wedding invitation"
    >
      <motion.img
        src={HERO_IMAGE}
        alt="Shreyash and Divya wedding invitation"
        className="hero-full-image"
        initial={reduceMotion ? false : { opacity: 0, scale: 1.045 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        fetchPriority="high"
        decoding="async"
        draggable="false"
      />

      <div className="hero-image-wash" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="hero-inner-frame" aria-hidden="true">
        <span className="hero-frame-corner hero-frame-top-left" />
        <span className="hero-frame-corner hero-frame-top-right" />
        <span className="hero-frame-corner hero-frame-bottom-left" />
        <span className="hero-frame-corner hero-frame-bottom-right" />
      </div>

      <div className="hero-petal-overlay" aria-hidden="true">
        <span className="hero-petal hero-petal-one">✿</span>
        <span className="hero-petal hero-petal-two">❀</span>
        <span className="hero-petal hero-petal-three">✧</span>
        <span className="hero-petal hero-petal-four">✿</span>
        <span className="hero-petal hero-petal-five">❀</span>
        <span className="hero-petal hero-petal-six">✧</span>
      </div>

      <div className="hero-bottom-glow" aria-hidden="true" />

      {/* Scroll indicator appears after 2 seconds */}
      {showScroll && (
 
<motion.button
  type="button"
  className="hero-scroll-indicator"
  onClick={handleScroll}
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  }}
  aria-label="Scroll down to explore"
>
  <span className="hero-scroll-text">
    SCROLL TO EXPLORE
  </span>

  <span className="hero-scroll-arrow">
    <ChevronDown size={19} strokeWidth={2} />
  </span>
</motion.button>

)}
    </section>
  );
}
