import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles, Flower2, Camera } from "lucide-react";
import "./OurStory.css";

const milestones = [
  {
    id: 1,
    title: "The Beginning",
    text: "A beautiful connection, two hearts meeting, and the beginning of a story worth cherishing.",
    image: "/assets/story-photo-1.jpg",
    side: "left",
  },
  {
    id: 2,
    title: "Growing Together",
    text: "Through shared smiles, little moments and countless memories, our bond continues to grow.",
    image: "/assets/story-photo-2.jpg",
    side: "right",
  },
  {
    id: 3,
    title: "Forever",
    text: "With the blessings of our families, we are ready to begin our most beautiful chapter together.",
    image: "/assets/story-photo-3.jpg",
    side: "left",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

function PhotoFrame({ src, number, title }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="story-timeline-photo">
      {!imageFailed ? (
        <img
          src={src}
          alt={`Shreyash and Divya — ${title}`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="story-photo-placeholder">
          <Camera size={22} strokeWidth={1.3} />
          <span>PHOTO {String(number).padStart(2, "0")}</span>
          <small>ADD YOUR PHOTO</small>
        </div>
      )}
      <span className="story-photo-ring" aria-hidden="true" />
      <span className="story-photo-number">{number}</span>
    </div>
  );
}

function StoryMilestone({ item, index, reduceMotion }) {
  return (
    <motion.article
      className={`story-milestone story-milestone-${item.side}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="story-milestone-photo">
        <PhotoFrame src={item.image} number={item.id} title={item.title} />
      </div>

      <div className="story-timeline-marker" aria-hidden="true">
        <span className="timeline-marker-ring">
          <Heart size={15} fill="currentColor" />
        </span>
      </div>

      <div className="story-milestone-copy">
        <span className="story-milestone-number">CHAPTER 0{item.id}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <div className="story-milestone-ornament" aria-hidden="true">
          <span />
          <Sparkles size={12} />
          <span />
        </div>
      </div>
    </motion.article>
  );
}

export default function OurStory() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="our-story-section" id="story">
      <div className="our-story-background" aria-hidden="true" />
      <div className="our-story-overlay" aria-hidden="true" />

      <div className="story-floating-petal petal-a" aria-hidden="true">✿</div>
      <div className="story-floating-petal petal-b" aria-hidden="true">❀</div>
      <div className="story-floating-petal petal-c" aria-hidden="true">✧</div>
      <div className="story-floating-petal petal-d" aria-hidden="true">✿</div>

      <div className="our-story-content">
        <motion.header
          className="story-header"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
        >
          <div className="story-eyebrow">
            <span />
            <Flower2 size={14} />
            <span>THE JOURNEY OF TWO HEARTS</span>
            <Flower2 size={14} />
            <span />
          </div>

          <h2>
            Our Story
            <em>A Journey of Two Hearts</em>
          </h2>

          <span className="story-heading-heart" aria-hidden="true">♥</span>

          <p>
            Every love story has its own magic.
            <br />
            Here's a little glimpse into ours.
          </p>
        </motion.header>

        <div className="story-timeline">
          <div className="story-timeline-line" aria-hidden="true">
            <span className="story-line-glow" />
          </div>

          {milestones.map((item, index) => (
            <StoryMilestone
              key={item.id}
              item={item}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <motion.div
          className="story-dance"
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.75 }}
        >
          <div className="story-dance-copy">
            <div className="story-dance-heading">
              <Sparkles size={13} />
              <span>A DANCE OF LOVE</span>
              <Sparkles size={13} />
            </div>

            <h3>
              Shall we dance
              <em>into forever?</em>
            </h3>

            <p>
              One beautiful rhythm, two hearts,
              and a lifetime of dancing together.
            </p>

            <div className="story-dance-caption">
              <Heart size={11} fill="currentColor" />
              <span>TOGETHER IS A BEAUTIFUL PLACE TO BE</span>
              <Heart size={11} fill="currentColor" />
            </div>
          </div>

          <div className="story-dance-art">
            <img
              src="/assets/wedding-dance.gif"
              alt="Bride and groom dancing together"
              loading="lazy"
            />
          </div>
        </motion.div>

        <motion.div
          className="story-signature"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: reduceMotion ? 0 : 0.7 }}
        >
          <div className="story-signature-ornament" aria-hidden="true">
            <span />
            <Heart size={14} fill="currentColor" />
            <span />
          </div>
          <p>And so, our forever begins...</p>
          <h3>Shreyash <span>&</span> Divya</h3>
          <div className="story-signature-date">10 · 12 · 2026</div>
        </motion.div>
      </div>
    </section>
  );
}
