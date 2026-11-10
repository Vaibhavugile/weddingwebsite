
import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Flower2 } from "lucide-react";
import "./ThankYouSection.css";

const THANK_YOU_GIF = "/assets/thank-you-celebration.gif";

export default function ThankYouSection() {
  return (
    <section className="thankyou-section" id="thank-you">
      <div className="thankyou-glow thankyou-glow-one" />
      <div className="thankyou-glow thankyou-glow-two" />

      <motion.div
        className="thankyou-content"
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="thankyou-eyebrow"
          initial={{ opacity: 0, letterSpacing: "5px" }}
          whileInView={{ opacity: 1, letterSpacing: "3px" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Sparkles size={15} />
          WITH LOVE & GRATITUDE
          <Sparkles size={15} />
        </motion.div>

        <motion.div
          className="thankyou-flower flower-left"
          animate={{ rotate: [0, 8, -5, 0], y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          <Flower2 />
        </motion.div>

        <motion.div
          className="thankyou-flower flower-right"
          animate={{ rotate: [0, -8, 5, 0], y: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          <Flower2 />
        </motion.div>

        <motion.div
          className="thankyou-artwork"
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2 }}
        >
          <div className="thankyou-artwork-frame">
            <img
              src={THANK_YOU_GIF}
              alt="Shreyash and Divya thanking their wedding guests"
              loading="lazy"
            />
          </div>
          <div className="thankyou-artwork-decoration">
            <Heart size={18} fill="currentColor" />
          </div>
        </motion.div>

        <motion.div
          className="thankyou-message"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          <span className="thankyou-small-heading">
            OUR HEARTS ARE FULL
          </span>

          <h2>
            Thank You
            <span> for being part of our story</span>
          </h2>

          <div className="thankyou-divider">
            <span />
            <Heart size={17} fill="currentColor" />
            <span />
          </div>

          <p>
            Your love, blessings, smiles and presence made our
            celebration even more beautiful. We are truly grateful
            to have shared these precious moments with you.
          </p>

          <p className="thankyou-closing-line">
            We carry your love with us, always.
          </p>
        </motion.div>

        <motion.div
          className="thankyou-signature"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <span>WITH LOVE,</span>
          <h3>Shreyash <i>&</i> Divya</h3>
          <div className="thankyou-date">10 · 12 · 2026</div>
        </motion.div>

        <motion.div
          className="thankyou-bottom-note"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <Heart size={13} fill="currentColor" />
          A BEAUTIFUL BEGINNING, MADE MORE SPECIAL BY YOU
          <Heart size={13} fill="currentColor" />
        </motion.div>
      </motion.div>
    </section>
  );
}
