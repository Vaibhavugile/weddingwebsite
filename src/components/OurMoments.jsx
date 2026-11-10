
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Maximize2,
} from "lucide-react";

import "./OurMoments.css";

// Add your actual photographs here whenever ready.
// Leave photo as an empty string to use the animated GIF fallback.
const galleryItems = [
  {
    id: 1,
    title: "Together Forever",
    category: "OUR LOVE STORY",
    photo: "",
    fallback: "/assets/wedding-ceremony.gif",
    layout: "large",
  },
  {
    id: 2,
    title: "Beautiful Beginnings",
    category: "SPECIAL MOMENTS",
    photo: "",
    fallback: "/assets/mehndi-celebration.gif",
    layout: "normal",
  },
  {
    id: 3,
    title: "A Little Romance",
    category: "MADE FOR EACH OTHER",
    photo: "",
    fallback: "/assets/sangeet-celebration.gif",
    layout: "normal",
  },
  {
    id: 4,
    title: "Our Happiness",
    category: "ENDLESS SMILES",
    photo: "",
    fallback: "/assets/haldi-celebration.gif",
    layout: "normal",
  },
  {
    id: 5,
    title: "A Night to Remember",
    category: "MAGICAL MEMORIES",
    photo: "",
    fallback: "/assets/cocktail-celebration.gif",
    layout: "normal",
  },
  {
    id: 6,
    title: "Forever Starts Here",
    category: "SHREYASH & DIVYA",
    photo: "",
    fallback: "/assets/wedding-venue.gif",
    layout: "large",
  },
];

function GalleryImage({ item, onOpen }) {
  const [imageSrc, setImageSrc] = useState(
    item.photo || item.fallback
  );

  const [usingFallback, setUsingFallback] = useState(!item.photo);

  const handleError = () => {
    if (!usingFallback) {
      setUsingFallback(true);
      setImageSrc(item.fallback);
    }
  };

  return (
    <button
      type="button"
      className="moments-image-button"
      onClick={() => onOpen(imageSrc)}
      aria-label={`Open ${item.title}`}
    >
      <img
        src={imageSrc}
        alt={item.title}
        loading="lazy"
        onError={handleError}
      />

      <span className="moments-image-zoom">
        <Maximize2 size={17} />
      </span>
    </button>
  );
}

export default function OurMoments() {
  const [activeImage, setActiveImage] = useState(null);

  const openImage = (src) => {
    setActiveImage(src);
  };

  const closeImage = () => {
    setActiveImage(null);
  };

  const showNext = () => {
    setActiveImage((current) => {
      const currentIndex = galleryItems.findIndex(
        (item) => (item.photo || item.fallback) === current
      );

      const nextIndex =
        currentIndex < 0
          ? 0
          : (currentIndex + 1) % galleryItems.length;

      return galleryItems[nextIndex].photo ||
        galleryItems[nextIndex].fallback;
    });
  };

  const showPrevious = () => {
    setActiveImage((current) => {
      const currentIndex = galleryItems.findIndex(
        (item) => (item.photo || item.fallback) === current
      );

      const previousIndex =
        currentIndex < 0
          ? galleryItems.length - 1
          : (currentIndex - 1 + galleryItems.length) %
            galleryItems.length;

      return galleryItems[previousIndex].photo ||
        galleryItems[previousIndex].fallback;
    });
  };

  return (
    <section className="our-moments-section" id="moments">
      <div className="moments-flower moments-flower-one">❀</div>
      <div className="moments-flower moments-flower-two">✿</div>

      <div className="moments-container">

        {/* Heading */}
        <motion.header
          className="moments-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="moments-eyebrow">
            <Sparkles size={13} />
            A COLLECTION OF MEMORIES
            <Sparkles size={13} />
          </span>

          <h2>
            Our <span>Beautiful Moments</span>
          </h2>

          <p>
            Every picture tells a story.
            Here's a little glimpse of ours.
          </p>

          <div className="moments-divider">
            <span />
            <Heart size={15} />
            <span />
          </div>
        </motion.header>

        {/* Gallery */}
        <div className="moments-gallery">
          {galleryItems.map((item, index) => (
            <motion.article
              key={item.id}
              className={`moments-card moments-card-${item.layout}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.65,
                delay: (index % 3) * 0.1,
              }}
            >
              <div className="moments-card-frame">
                <GalleryImage
                  item={item}
                  onOpen={openImage}
                />

                <div className="moments-card-caption">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>

                <span className="moments-card-heart">
                  <Heart size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="moments-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span>✧</span>
          A lifetime of memories begins with us
          <span>✧</span>
        </motion.div>
      </div>

      {/* Full-screen Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="moments-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            <button
              type="button"
              className="moments-lightbox-close"
              onClick={closeImage}
              aria-label="Close gallery"
            >
              <X size={23} />
            </button>

            <button
              type="button"
              className="moments-lightbox-nav moments-lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={25} />
            </button>

            <motion.img
              key={activeImage}
              src={activeImage}
              alt="Wedding memory"
              className="moments-lightbox-image"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              type="button"
              className="moments-lightbox-nav moments-lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={25} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
