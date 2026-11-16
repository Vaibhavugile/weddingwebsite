
import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

// Firebase
import { firebaseReady } from "./firebase/firebase";

// Invitation configuration
import { getInvitation } from "./config/getInvitation";

// Admin panel
import AdminApp from "./admin/AdminApp";

// Wedding components
import InvitationIntro from "./components/InvitationIntro";
import HeroSection from "./components/HeroSection";
import OurStory from "./components/OurStory";
import SaveTheDate from "./components/SaveTheDate";
import WeddingCelebrations from "./components/WeddingCelebrations";
import RSVPSection from "./components/RSVPSection";
import WeddingVenue from "./components/WeddingVenue";
import OurMoments from "./components/OurMoments";
import ThankYouSection from "./components/ThankYouSection";
import WeddingMusicPlayer from "./components/WeddingMusicPlayer";

// ============================================================
// ASSET FALLBACKS
// ============================================================

const DEFAULT_ASSETS = {
  hero: "/assets/wedding-hero.png",
  poster: "/assets/wedding-poster.png",
  video: "/assets/invitation-opening.mp4",
  music: "/assets/wedding-romantic-song.mp3",
  couple: "/assets/animated-indian-wedding-couple.gif",
  venue: "/assets/wedding-venue.gif",
  thankYou: "/assets/thank-you-celebration.gif",
  rsvp: "/assets/wedding-ceremony.gif",
};

// ============================================================
// NORMALIZE INVITATION
// ============================================================

function normalizeInvitation(invitation) {
  if (!invitation) return null;

  return {
    ...invitation,

    assets: {
      ...DEFAULT_ASSETS,
      ...(invitation.assets || {}),
    },

    venue: {
      name: "Venue to be announced",
      address: "Address to be announced",
      mapUrl: "",
      ...(invitation.venue || {}),
    },

    date: {
      day: "",
      month: "",
      monthNumber: null,
      year: "",
      display: "Date to be announced",
      numeric: "",
      ...(invitation.date || {}),
    },

    celebrations: Array.isArray(invitation.celebrations)
      ? invitation.celebrations
      : [],

    gallery: Array.isArray(invitation.gallery)
      ? invitation.gallery
      : [],

    story: Array.isArray(invitation.story)
      ? invitation.story
      : [],

    rsvpEnabled: invitation.rsvpEnabled === true,
    storyEnabled: invitation.storyEnabled === true,
    momentsEnabled: invitation.momentsEnabled === true,
  };
}

// ============================================================
// WEDDING HOME
// ============================================================

function WeddingHome({ invitation }) {
  return (
    <main className="page-shell revealed-site">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      {/* HERO */}
      <HeroSection invitation={invitation} />

      {/* OUR STORY */}
      {invitation.storyEnabled && (
        <OurStory invitation={invitation} />
      )}

      {/* SAVE THE DATE */}
      <SaveTheDate invitation={invitation} />

      {/* CELEBRATIONS */}
      <WeddingCelebrations invitation={invitation} />

      {/* RSVP */}
      {invitation.rsvpEnabled && (
        <RSVPSection invitation={invitation} />
      )}

      {/* VENUE */}
      <WeddingVenue invitation={invitation} />

      {/* GALLERY / MOMENTS */}
      {invitation.momentsEnabled && (
        <OurMoments invitation={invitation} />
      )}

      {/* THANK YOU */}
      <ThankYouSection invitation={invitation} />
    </main>
  );
}

// ============================================================
// INVITATION NOT FOUND
// ============================================================

function InvitationNotFound() {
  return (
    <main className="invitation-not-found">
      <div className="not-found-content">
        <span className="not-found-heart">♡</span>

        <h1>Invitation Not Found</h1>

        <p>
          This wedding invitation link may be incorrect
          or unavailable.
        </p>

        <span className="not-found-decoration">
          WITH LOVE &amp; BEST WISHES
        </span>
      </div>
    </main>
  );
}

// ============================================================
// PAGE METADATA
// ============================================================

function InvitationMetadata({ invitation }) {
  useEffect(() => {
    const bride = invitation.bride;
    const groom = invitation.groom;

    const previousTitle = document.title;

    document.title = `${bride} & ${groom} | Wedding Invitation`;

    let description = document.querySelector(
      'meta[name="description"]'
    );

    const createdDescription = !description;

    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }

    const previousDescription =
      description.getAttribute("content");

    description.setAttribute(
      "content",
      `You are invited to celebrate the wedding of ${bride} and ${groom}. Join us for their special celebration.`
    );

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        description.remove();
      } else if (previousDescription !== null) {
        description.setAttribute(
          "content",
          previousDescription
        );
      }
    };
  }, [invitation]);

  return null;
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  // ----------------------------------------------------------
  // CURRENT PATH
  // ----------------------------------------------------------

  const currentPath = window.location.pathname.replace(
    /\/+$/,
    ""
  ) || "/";

  // ----------------------------------------------------------
  // INVITATION CONFIGURATION
  // ----------------------------------------------------------

  const invitation = useMemo(() => {
    const selectedInvitation = getInvitation();

    return normalizeInvitation(selectedInvitation);
  }, []);

  // ----------------------------------------------------------
  // INTRO / MUSIC STATE
  // ----------------------------------------------------------

  const [opened, setOpened] = useState(false);

  const musicRef = useRef(null);

  // ----------------------------------------------------------
  // ADMIN ROUTE
  // ----------------------------------------------------------

  if (currentPath === "/admin") {
    return <AdminApp />;
  }

  // ----------------------------------------------------------
  // INVALID INVITATION
  // ----------------------------------------------------------

  if (!invitation) {
    return <InvitationNotFound />;
  }

  // ----------------------------------------------------------
  // MUSIC
  // ----------------------------------------------------------

  const startMusic = () => {
    musicRef.current?.play();
  };

  // ----------------------------------------------------------
  // OPEN INVITATION
  // ----------------------------------------------------------

  const openInvitation = () => {
    setOpened(true);
  };

  // ----------------------------------------------------------
  // WEDDING WEBSITE
  // ----------------------------------------------------------

  return (
    <>
      <InvitationMetadata invitation={invitation} />

      {/* Persistent wedding music player */}
      <WeddingMusicPlayer
        ref={musicRef}
        musicSrc={invitation.assets.music}
      />

      <AnimatePresence
        mode="sync"
        initial={false}
      >
        {!opened ? (
          <motion.div
            key={`${invitation.id}-intro`}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.01,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <InvitationIntro
              invitation={invitation}
              onOpen={openInvitation}
              onStartMusic={startMusic}
            />
          </motion.div>
        ) : (
          <motion.div
            key={`${invitation.id}-wedding`}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <WeddingHome invitation={invitation} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
