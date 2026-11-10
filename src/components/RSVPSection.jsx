
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Send,
  CheckCircle2,
  CalendarDays,
  Users,
} from "lucide-react";

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { getApps } from "firebase/app";

import "./RSVPSection.css";

const RSVP_GIF = "/assets/wedding-ceremony.gif";

export default function RSVPSection() {
  const [form, setForm] = useState({
    guestName: "",
    guestCount: "1",
    attendance: "yes",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.guestName.trim()) {
      setError("Please enter your name.");
      return;
    }

    const app = getApps()[0];

    if (!app) {
      setError("Firebase is not initialized. Please try again later.");
      return;
    }

    setLoading(true);

    try {
      const db = getFirestore(app);

      await addDoc(collection(db, "wedding_rsvps"), {
        guestName: form.guestName.trim(),
        guestCount:
          form.attendance === "yes"
            ? Number(form.guestCount)
            : 0,
        attendance: form.attendance,
        message: form.message.trim(),
        createdAt: serverTimestamp(),
        weddingCouple: "Shreyash & Divya",
      });

      setSubmitted(true);
    } catch (err) {
      console.error("RSVP submission error:", err);
      setError("We couldn't submit your response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rsvp-section" id="rsvp">
      <div className="rsvp-flower rsvp-flower-one">❀</div>
      <div className="rsvp-flower rsvp-flower-two">✿</div>

      <div className="rsvp-container">
        <motion.div
          className="rsvp-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="rsvp-eyebrow">
            <Sparkles size={13} />
            SAVE YOUR SEAT
            <Sparkles size={13} />
          </span>

          <h2>
            Kindly <span>RSVP</span>
          </h2>

          <p>
            Your presence would make our celebration
            even more special.
          </p>

          <div className="rsvp-divider">
            <span />
            <Heart size={15} />
            <span />
          </div>
        </motion.div>

        <motion.div
          className="rsvp-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.8 }}
        >
          <div className="rsvp-illustration">
            <img
              src={RSVP_GIF}
              alt="Shreyash and Divya celebrating their wedding"
              loading="lazy"
            />

            <div className="rsvp-image-shade" />

            <div className="rsvp-image-caption">
              <span>TOGETHER WITH THEIR FAMILIES</span>
              <strong>Shreyash & Divya</strong>
              <small>10 · 12 · 2026</small>
            </div>

            <div className="rsvp-image-heart">
              <Heart size={17} />
            </div>
          </div>

          <div className="rsvp-form-area">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="rsvp-form-heading">
                    <span>WE WOULD LOVE TO KNOW</span>
                    <h3>Will you join us?</h3>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <label className="rsvp-label">
                      Your name
                    </label>

                    <input
                      className="rsvp-input"
                      type="text"
                      placeholder="Enter your full name"
                      value={form.guestName}
                      onChange={(e) =>
                        updateField("guestName", e.target.value)
                      }
                      maxLength={100}
                      required
                    />

                    <label className="rsvp-label rsvp-attendance-label">
                      Kindly select your response
                    </label>

                    <div className="rsvp-choice-grid">
                      <button
                        type="button"
                        className={`rsvp-choice ${
                          form.attendance === "yes" ? "selected" : ""
                        }`}
                        onClick={() => updateField("attendance", "yes")}
                      >
                        <Heart size={17} />
                        <span>Joyfully Accept</span>
                        <small>I'll be there!</small>
                      </button>

                      <button
                        type="button"
                        className={`rsvp-choice ${
                          form.attendance === "no" ? "selected" : ""
                        }`}
                        onClick={() => updateField("attendance", "no")}
                      >
                        <Heart size={17} />
                        <span>Regretfully Decline</span>
                        <small>Can't make it</small>
                      </button>
                    </div>

                    {form.attendance === "yes" && (
                      <>
                        <label className="rsvp-label">
                          <Users size={14} />
                          Number of guests
                        </label>

                        <select
                          className="rsvp-input"
                          value={form.guestCount}
                          onChange={(e) =>
                            updateField("guestCount", e.target.value)
                          }
                        >
                          {[1, 2, 3, 4, 5, 6].map((count) => (
                            <option key={count} value={count}>
                              {count} {count === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </>
                    )}

                    <label className="rsvp-label">
                      A little message for us (optional)
                    </label>

                    <textarea
                      className="rsvp-input rsvp-message"
                      placeholder="Send us your wishes..."
                      rows="3"
                      maxLength={500}
                      value={form.message}
                      onChange={(e) =>
                        updateField("message", e.target.value)
                      }
                    />

                    {error && (
                      <p className="rsvp-error">{error}</p>
                    )}

                    <button
                      className="rsvp-submit"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        "SENDING YOUR RESPONSE..."
                      ) : (
                        <>
                          SEND MY RSVP
                          <Send size={15} />
                        </>
                      )}
                    </button>

                    <p className="rsvp-form-note">
                      <CalendarDays size={12} />
                      Wedding celebration · 10 December 2026
                    </p>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  className="rsvp-success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="rsvp-success-icon">
                    <CheckCircle2 size={35} />
                  </div>

                  <span>RESPONSE RECEIVED</span>

                  <h3>
                    Thank you,
                    <br />
                    <em>{form.guestName}!</em>
                  </h3>

                  <p>
                    {form.attendance === "yes"
                      ? "We are so happy you'll be celebrating with us. Can't wait to see you!"
                      : "Thank you for letting us know. You'll be missed, and we'll be thinking of you."}
                  </p>

                  <div className="rsvp-success-names">
                    With love,
                    <strong>Shreyash & Divya</strong>
                  </div>

                  <Heart size={18} className="rsvp-success-heart" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p
          className="rsvp-bottom-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          A day made beautiful by the people we love
        </motion.p>
      </div>
    </section>
  );
}
