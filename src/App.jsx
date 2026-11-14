
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { firebaseReady } from "./firebase/firebase";

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

function WeddingHome() {
  return (
    <main className="page-shell revealed-site">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <HeroSection />
      {/* <OurStory /> */}
      <SaveTheDate />
      <WeddingCelebrations />
      {/* <RSVPSection /> */}
      <WeddingVenue />
      {/* <OurMoments /> */}
      <ThankYouSection />

     
    </main>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const musicRef = useRef(null);

  const handleInvitationOpen = () => {
    setOpened(true);
  };

  return (
    <>
      {/* Persistent background music */}
      <WeddingMusicPlayer ref={musicRef} />

      {/* Sync mode mounts the homepage immediately */}
      <AnimatePresence mode="sync" initial={false}>
        {!opened ? (
          <motion.div
            key="intro"
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
              onOpen={handleInvitationOpen}
              onStartMusic={() => musicRef.current?.play()}
            />
          </motion.div>
        ) : (
          <motion.div
            key="wedding"
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
            <WeddingHome />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
