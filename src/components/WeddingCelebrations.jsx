
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

const celebrations = [
  {
    id: "mehndi",
    number: "01",
    title: "Mehndi Ceremony",
    subtitle: "Love painted in beautiful patterns",
    date: "Date to be announced",
    time: "Time to be announced",
    venue: "Venue to be announced",
    image: "/assets/mehndi-celebration.gif",
    theme: "mehndi",
    tag: "THE ART OF LOVE",
  },,
  {
    id: "sangeet",
    number: "02",
    title: "Sangeet Night",
    subtitle: "An evening filled with music and magic",
    date: "Date to be announced",
    time: "Time to be announced",
    venue: "Venue to be announced",
    image: "/assets/sangeet-celebration.gif",
    theme: "sangeet",
    tag: "A NIGHT OF MUSIC",
  },,
  {
    id: "haldi",
    number: "03",
    title: "Haldi Celebration",
    subtitle: "A little sunshine, a lot of love",
    date: "Date to be announced",
    time: "Time to be announced",
    venue: "Venue to be announced",
    image: "/assets/haldi-celebration.gif",
    theme: "haldi",
    tag: "THE TURMERIC CEREMONY",
  },,
  {
    id: "wedding",
    number: "04",
    title: "The Wedding",
    subtitle: "Two hearts, one beautiful forever",
    date: "10 December 2026",
    time: "Time to be announced",
    venue: "Nagaur, Rajasthan",
    image: "/assets/wedding-ceremony.gif",
    theme: "wedding",
    tag: "THE WEDDING CELEBRATION",
  },,
  {
    id: "cocktail",
    number: "05",
    title: "Cocktail Party",
    subtitle: "Let's celebrate in style",
    date: "Date to be announced",
    time: "Time to be announced",
    venue: "Venue to be announced",
    image: "/assets/cocktail-celebration.gif",
    theme: "cocktail",
    tag: "THE GRAND PARTY",
  },
];

const WeddingCelebrations = () => {
  return (
    <section className="wedding-events-section" id="celebrations">
      <div className="events-background-flower events-flower-one">✿</div>
      <div className="events-background-flower events-flower-two">❀</div>

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
            Five beautiful occasions, countless memories,
            and a lifetime of love.
          </p>

          <div className="events-heading-divider">
            <span />
            <Heart size={15} />
            <span />
          </div>
        </motion.div>

        <div className="events-grid">
          {celebrations.map((event, index) => (
            <motion.article
              className={`event-invitation-card event-${event.theme}`}
              key={event.id}
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
                    src={event.image}
                    alt={`${event.title} animated illustration`}
                    loading="lazy"
                    className="event-gif"
                  />

                  <div className="event-artwork-overlay" />

                  <span className="event-number">
                    {event.number}
                  </span>

                  <span className="event-artwork-tag">
                    {event.tag}
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
                  <p className="event-subtitle">{event.subtitle}</p>

                  <div className="event-details-divider">
                    <span />
                    <Flower2 size={14} />
                    <span />
                  </div>

                  <div className="event-detail-row">
                    <CalendarDays size={15} />
                    <span>{event.date}</span>
                  </div>

                  <div className="event-detail-row">
                    <Clock3 size={15} />
                    <span>{event.time}</span>
                  </div>

                  <div className="event-detail-row">
                    <MapPin size={15} />
                    <span>{event.venue}</span>
                  </div>

                  <div className="event-card-footer">
                    <span>SHREYASH & DIVYA</span>
                    <Heart size={13} />
                    <span>WITH LOVE</span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

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
      </div>
    </section>
  );
};

export default WeddingCelebrations;
