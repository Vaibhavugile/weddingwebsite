
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

export default function WeddingVenue({ invitation }) {
  const bride = invitation?.bride || "Bride";
  const groom = invitation?.groom || "Groom";

  const venue = invitation?.venue || {};
  const date = invitation?.date || {};
  const assets = invitation?.assets || {};

  const venueName = venue.name || "Wedding Venue";
  const venueAddress = venue.address || "Venue details coming soon";

  const venueGif =
    assets.venue || "/assets/wedding-venue.gif";

  const mapUrl = venue.mapUrl || "";

  const numericDate =
    date.numeric ||
    [date.day, date.month, date.year]
      .filter(Boolean)
      .join(" · ");

  const displayDate = date.display || numericDate || "Date to be announced";

  // Calculate weekday from the invitation date.
  const getFormattedDate = () => {
    if (!date.day || !date.year || !date.month) {
      return displayDate;
    }

    const monthMap = {
      JANUARY: 0,
      FEBRUARY: 1,
      MARCH: 2,
      APRIL: 3,
      MAY: 4,
      JUNE: 5,
      JULY: 6,
      AUGUST: 7,
      SEPTEMBER: 8,
      OCTOBER: 9,
      NOVEMBER: 10,
      DECEMBER: 11,
    };

    const monthIndex =
      monthMap[String(date.month).toUpperCase()];

    if (monthIndex === undefined) {
      return displayDate;
    }

    const weddingDate = new Date(
      Number(date.year),
      monthIndex,
      Number(date.day)
    );

    if (Number.isNaN(weddingDate.getTime())) {
      return displayDate;
    }

    const weekday = weddingDate.toLocaleDateString(
      "en-IN",
      { weekday: "long" }
    );

    return `${weekday}, ${displayDate}`;
  };

  return (
    <section
      className="wedding-venue-section"
      id="venue"
    >
      <div className="venue-flower venue-flower-one">
        ❀
      </div>

      <div className="venue-flower venue-flower-two">
        ✿
      </div>

      <div className="venue-container">
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

        <motion.div
          className="venue-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          <div className="venue-artwork">
            <img
              src={venueGif}
              alt={`${bride} and ${groom} wedding venue`}
              loading="lazy"
              className="venue-gif"
            />

            <div className="venue-artwork-shade" />

            <div className="venue-artwork-caption">
              <span>THE BEGINNING OF FOREVER</span>

              <strong>
                {bride} & {groom}
              </strong>

              <small>{numericDate}</small>
            </div>

            <div className="venue-artwork-heart">
              <Heart size={17} />
            </div>
          </div>

          <div className="venue-information">
            <span className="venue-small-label">
              THE WEDDING CELEBRATION
            </span>

            <h3>Join us at</h3>

            <h4>{venueName}</h4>

            <div className="venue-location-divider">
              <span />
              <MapPin size={16} />
              <span />
            </div>

            <div className="venue-place-card">
              <div className="venue-place-icon">
                <Landmark size={20} />
              </div>

              <div className="venue-place-text">
                <span>WEDDING VENUE</span>

                <strong>{venueName}</strong>

                <small>{venueAddress}</small>
              </div>
            </div>

            <div className="venue-date-card">
              <CalendarDays size={17} />

              <div>
                <span>WEDDING DATE</span>

                <strong>{getFormattedDate()}</strong>
              </div>
            </div>

            {mapUrl && (
              <motion.a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="venue-directions-button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Navigation2 size={16} />
                GET DIRECTIONS TO VENUE
              </motion.a>
            )}

            <p className="venue-note">
              We look forward to welcoming you
              to our special celebration.
            </p>
          </div>
        </motion.div>

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
