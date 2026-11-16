
import React from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
  Heart,
  Flower2,
} from "lucide-react";

import "./WeddingCelebrations.css";

const WeddingCelebrations = ({ invitation }) => {
  const celebrations = invitation?.celebrations || [];

  const bride = invitation?.bride || "Bride";
  const groom = invitation?.groom || "Groom";

  const coupleNames = `${bride} & ${groom}`;

  const venue = invitation?.venue || {};

  const defaultVenue = [
    venue.name,
    venue.address,
  ].filter(Boolean).join(", ");

  return (
    <section
      className="wedding-events-section"
      id="celebrations"
    >
      <div className="events-background-flower events-flower-one">
        ✿
      </div>

      <div className="events-background-flower events-flower-two">
        ❀
      </div>

      <div className="events-container">
        <motion.div
          className="events-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="events-eyebrow">
            <Sparkles size={13} />
            THE WEDDING FESTIVITIES
            <Sparkles size={13} />
          </span>

          <h2>
            Our <span>Celebrations</span>
          </h2>

          <p>
            Beautiful occasions, countless memories,
            and a lifetime of love.
          </p>

          <div className="events-heading-divider">
            <span />
            <Heart size={15} />
            <span />
          </div>
        </motion.div>

        {celebrations.length > 0 ? (
          <div className="events-grid">
            {celebrations.map((event, index) => {
              const eventVenue =
                event.venue || defaultVenue || "Venue to be announced";

              return (
                <motion.article
                  className={`event-invitation-card event-${event.theme || "wedding"}`}
                  key={event.id || `${event.title}-${index}`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{
                    duration: 0.65,
                    delay: (index % 2) * 0.12,
                  }}
                >
                  <div className="event-card-inner">
                    <div className="event-artwork">
                      <img
                        src={event.image || invitation?.assets?.hero}
                        alt={`${event.title} celebration`}
                        loading="lazy"
                        className="event-gif"
                      />

                      <div className="event-artwork-overlay" />

                      <span className="event-number">
                        {event.number ||
                          String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="event-artwork-tag">
                        {event.tag || "THE WEDDING CELEBRATION"}
                      </span>

                      <div className="event-artwork-bottom">
                        <span className="event-mini-flower">✿</span>
                        <span className="event-mini-line" />
                        <span className="event-mini-flower">✿</span>
                      </div>
                    </div>

                    <div className="event-card-content">
                      <span className="event-small-label">
                        YOU ARE INVITED TO
                      </span>

                      <h3>{event.title}</h3>

                      <p className="event-subtitle">
                        {event.subtitle}
                      </p>

                      <div className="event-details-divider">
                        <span />
                        <Flower2 size={14} />
                        <span />
                      </div>

                      <div className="event-detail-row">
                        <CalendarDays size={15} />
                        <span>{event.date || "Date to be announced"}</span>
                      </div>

                      <div className="event-detail-row">
                        <Clock3 size={15} />
                        <span>{event.time || "Time to be announced"}</span>
                      </div>

                      <div className="event-detail-row">
                        <MapPin size={15} />
                        <span>{eventVenue}</span>
                      </div>

                      <div className="event-card-footer">
                        <span>{coupleNames.toUpperCase()}</span>
                        <Heart size={13} />
                        <span>WITH LOVE</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <motion.div
            className="events-footer-note"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span>✧</span>
            Celebration details will be announced soon
            <span>✧</span>
          </motion.div>
        )}

        {celebrations.length > 0 && (
          <motion.div
            className="events-footer-note"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span>✧</span>
            We can't wait to celebrate with you
            <span>✧</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WeddingCelebrations;
