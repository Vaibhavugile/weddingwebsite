
import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation2,
  Sparkles,
  Heart,
  CalendarDays,
  Landmark,
} from "lucide-react";

import "./WeddingVenue.css";

const VENUE_GIF = "/assets/wedding-venue.gif";

const MAP_URL =
  "https://www.google.com/maps/place/21%C2%B020'17.9%22N+79%C2%B000'17.4%22E/@21.338317,79.0022467,17z/data=!3m1!4b1!4m4!3m3!8m2!3d21.338317!4d79.0048216?entry=ttu&g_ep=EgoyMDI2MTEwNC4wIKXMDSoASAFQAw%3D%3D";

export default function WeddingVenue() {
  return (
    <section className="wedding-venue-section" id="venue">
      <div className="venue-flower venue-flower-one">❀</div>
      <div className="venue-flower venue-flower-two">✿</div>

      <div className="venue-container">

        {/* Section Heading */}
        <motion.header
          className="venue-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="venue-eyebrow">
            <Sparkles size={13} />
            A PLACE TO CELEBRATE LOVE
            <Sparkles size={13} />
          </span>

          <h2>
            Our Wedding <span>Destination</span>
          </h2>

          <p>
            A beautiful place, a special day,
            and the people who mean the most.
          </p>

          <div className="venue-heading-divider">
            <span />
            <Heart size={15} />
            <span />
          </div>
        </motion.header>

        {/* Venue Invitation Card */}
        <motion.div
          className="venue-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >

          {/* Animated Venue Artwork */}
          <div className="venue-artwork">
            <img
              src={VENUE_GIF}
              alt="Shreyash and Divya at Fun Planet Resort wedding venue"
              loading="lazy"
              className="venue-gif"
            />

            <div className="venue-artwork-shade" />

            <div className="venue-artwork-caption">
              <span>THE BEGINNING OF FOREVER</span>

              <strong>Shreyash & Divya</strong>

              <small>10 · 12 · 2026</small>
            </div>

            <div className="venue-artwork-heart">
              <Heart size={17} />
            </div>
          </div>

          {/* Venue Details */}
          <div className="venue-information">

            <span className="venue-small-label">
              THE WEDDING CELEBRATION
            </span>

            <h3>Join us at</h3>

            <h4>Fun Planet Resort</h4>

            <div className="venue-location-divider">
              <span />
              <MapPin size={16} />
              <span />
            </div>

            {/* Resort Address */}
            <div className="venue-place-card">
              <div className="venue-place-icon">
                <Landmark size={20} />
              </div>

              <div className="venue-place-text">
                <span>WEDDING VENUE</span>

                <strong>Fun Planet Resort</strong>

                <small>
                  Patansaongi, Nagpur, Maharashtra
                </small>
              </div>
            </div>

            {/* Wedding Date */}
            <div className="venue-date-card">
              <CalendarDays size={17} />

              <div>
                <span>WEDDING DATE</span>

                <strong>
                  Thursday, 10 December 2026
                </strong>
              </div>
            </div>

            {/* Google Maps Directions */}
            <motion.a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="venue-directions-button"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Navigation2 size={16} />
              GET DIRECTIONS TO VENUE
            </motion.a>

            <p className="venue-note">
              We look forward to welcoming you
              to our special celebration.
            </p>

          </div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          className="venue-bottom-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span>✧</span>

          A journey made beautiful by love

          <span>✧</span>
        </motion.div>

      </div>
    </section>
  );
}
