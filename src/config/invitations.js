
/*
|--------------------------------------------------------------------------
| WEDDING INVITATIONS CONFIGURATION
|--------------------------------------------------------------------------
|
| Two separate wedding invitations:
|
| 1. Divya & Shreyash
|    Existing invitation - preserved without changes.
|
| 2. Shreyash & Divya
|    New invitation - Wedding and Reception only.
|
| Shared assets: public/assets/
|
|--------------------------------------------------------------------------
*/

// ================================================================
// SHARED DEFAULT ASSETS
// ================================================================

export const DEFAULT_ASSETS = {
  hero: "/assets/wedding-hero.png",
  poster: "/assets/wedding-hero.png",

  video: "/assets/invitation-opening.mp4",
  music: "/assets/wedding-romantic-song.mp3",

  couple: "/assets/animated-indian-wedding-couple.gif",
  venue: "/assets/wedding-venue.gif",

  thankYou: "/assets/thank-you-celebration.gif",
  rsvp: "/assets/wedding-ceremony.gif",
};

// ================================================================
// DEFAULT FEATURE SETTINGS
// ================================================================

export const DEFAULT_FEATURES = {
  rsvpEnabled: false,
  storyEnabled: false,
  momentsEnabled: false,
};

// ================================================================
// SHARED DEFAULT VENUE
// ================================================================

const DEFAULT_VENUE = {
  name: "Venue to be announced",
  address: "Address to be announced",
  mapUrl: "",
};

// ================================================================
// DIVYA & SHREYASH
// EXISTING INVITATION - KEEPING ALL DETAILS UNCHANGED
// ================================================================

const divyaShreyash = {
  id: "divya-shreyash-wedding-invite",
  slug: "divya-shreyash",

  bride: "Divya",
  groom: "Shreyash",

  date: {
    day: "10",
    month: "DECEMBER",
    monthNumber: 12,
    year: "2026",

    display: "10 December 2026",
    numeric: "10 · 12 · 2026",
  },

  venue: {
    name: "Fun Planet Resort",
    address: "Patansaongi, Nagpur, Maharashtra",

    mapUrl:
      "https://www.google.com/maps/place/21%C2%B020'17.9%22N+79%C2%B000'17.4%22E/@21.338317,79.0022467,17z/data=!3m1!4b1",
  },

  assets: {
    ...DEFAULT_ASSETS,

    hero: "/assets/wedding-hero.png",
    poster: "/assets/wedding-hero.png",

    video: "/assets/invitation-opening.mp4",
    music: "/assets/wedding-romantic-song.mp3",

    couple: "/assets/animated-indian-wedding-couple.gif",
    venue: "/assets/wedding-venue.gif",

    thankYou: "/assets/thank-you-celebration.gif",
    rsvp: "/assets/wedding-ceremony.gif",
  },

  celebrations: [
    {
      id: "haldi",
      number: "01",

      title: "Haldi Celebration",
      subtitle: "A little sunshine, a lot of love",

      date: "09-12-2026",
      time: "12:00 PM",

      venue: "Fun Planet Resort, Nagpur",

      image: "/assets/haldi-celebration.gif",

      theme: "haldi",
      tag: "THE TURMERIC CEREMONY",
    },

    {
      id: "sangeet",
      number: "02",

      title: "Sangeet Night",
      subtitle: "An evening filled with music and magic",

      date: "09-12-2026",
      time: "7:00 PM",

      venue: "Fun Planet Resort, Nagpur",

      image: "/assets/sangeet-celebration.gif",

      theme: "sangeet",
      tag: "A NIGHT OF MUSIC",
    },

    {
      id: "wedding",
      number: "03",

      title: "The Wedding",
      subtitle: "Two hearts, one beautiful forever",

      date: "10-12-2026",
      time: "4:30 PM",

      venue: "Fun Planet Resort, Nagpur",

      image: "/assets/wedding-ceremony.gif",

      theme: "wedding",
      tag: "THE WEDDING CELEBRATION",
    },
  ],

  gallery: [
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
  ],

  story: [],

  ...DEFAULT_FEATURES,

  rsvpEnabled: false,
  storyEnabled: false,
  momentsEnabled: false,
};

// ================================================================
// SHREYASH & DIVYA
// NEW SEPARATE INVITATION
// ONLY TWO FUNCTIONS: WEDDING & RECEPTION
// ================================================================

const shreyashDivya = {
  id: "shreyash-divya-wedding-invite",
  slug: "shreyash-divya",

  bride: "Shreyash",
  groom: "Divya",

  date: {
    day: "10",
    month: "DECEMBER",
    monthNumber: 12,
    year: "2026",

    display: "10 December 2026",
    numeric: "10 · 12 · 2026",
  },

  venue: {
    name: "Fun Planet Resort",
    address: "Patansaongi, Nagpur, Maharashtra",

    mapUrl:
      "https://www.google.com/maps/place/21%C2%B020'17.9%22N+79%C2%B000'17.4%22E/@21.338317,79.0022467,17z/data=!3m1!4b1",
  },

  assets: {
    ...DEFAULT_ASSETS,

    hero: "/assets/wedding-hero6.png",
    poster: "/assets/wedding-hero6.png",

    video: "/assets/invitation-opening1.mp4",
    music: "/assets/wedding-romantic-song.mp3",

    couple: "/assets/animated-indian-wedding-couple.gif",
    venue: "/assets/wedding-venue.gif",

    thankYou: "/assets/thank-you-celebration.gif",
    rsvp: "/assets/wedding-ceremony.gif",
  },

  // ONLY TWO CELEBRATIONS
  celebrations: [
    {
      id: "wedding",
      number: "01",

      title: "The Wedding",
      subtitle: "Two hearts, one beautiful forever",

      date: "10-12-2026",
      time: "4:30 PM",

      venue: "Fun Planet Resort, Nagpur",

      image: "/assets/wedding-ceremony.gif",

      theme: "wedding",
      tag: "THE WEDDING CELEBRATION",
    },

    {
      id: "reception",
      number: "02",

      title: "Wedding Reception & Dinner",
      subtitle: "An evening of love, laughter and celebration",

      date: "10-12-2026",
      time: "8:00 PM",

      venue: "Fun Planet Resort, Nagpur",

      image: "/assets/cocktail-celebration.gif",

      theme: "reception",
      tag: "THE RECEPTION CELEBRATION",
    },
  ],

  gallery: [
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
  ],

  story: [],

  ...DEFAULT_FEATURES,

  rsvpEnabled: false,
  storyEnabled: false,
  momentsEnabled: false,
};
const Gawandekapse = {
  id: "shreyash-divya-wedding-invite",
  slug: "gawandekapse",

  bride: "Shreyash",
  groom: "Divya",

  date: {
    day: "10",
    month: "DECEMBER",
    monthNumber: 12,
    year: "2026",

    display: "10 December 2026",
    numeric: "10 · 12 · 2026",
  },

  venue: {
    name: "Fun Planet Resort",
    address: "Patansaongi, Nagpur, Maharashtra",

    mapUrl:
      "https://www.google.com/maps/place/21%C2%B020'17.9%22N+79%C2%B000'17.4%22E/@21.338317,79.0022467,17z/data=!3m1!4b1",
  },

  assets: {
    ...DEFAULT_ASSETS,

    hero: "/assets/wedding-hero8.png",
    poster: "/assets/wedding-hero8.png",

    video: "/assets/invitation-opening1.mp4",
    music: "/assets/wedding-romantic-song.mp3",

    couple: "/assets/animated-indian-wedding-couple.gif",
    venue: "/assets/wedding-venue.gif",

    thankYou: "/assets/thank-you-celebration.gif",
    rsvp: "/assets/wedding-ceremony.gif",
  },

  // ONLY TWO CELEBRATIONS
  celebrations: [
    {
      id: "wedding",
      number: "01",

      title: "The Wedding",
      subtitle: "Two hearts, one beautiful forever",

      date: "10-12-2026",
      time: "4:30 PM",

      venue: "Fun Planet Resort, Nagpur",

      image: "/assets/wedding-ceremony.gif",

      theme: "wedding",
      tag: "THE WEDDING CELEBRATION",
    },

    {
      id: "reception",
      number: "02",

      title: "Wedding Reception & Dinner",
      subtitle: "An evening of love, laughter and celebration",

      date: "10-12-2026",
      time: "8:00 PM",

      venue: "Fun Planet Resort, Nagpur",

      image: "/assets/cocktail-celebration.gif",

      theme: "reception",
      tag: "THE RECEPTION CELEBRATION",
    },
  ],

  gallery: [
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
  ],

  story: [],

  ...DEFAULT_FEATURES,

  rsvpEnabled: false,
  storyEnabled: false,
  momentsEnabled: false,
};

// ================================================================
// INVITATIONS REGISTRY
// ================================================================

const invitations = {
  [divyaShreyash.slug]: divyaShreyash,
  [shreyashDivya.slug]: shreyashDivya,
  [Gawandekapse.slug]: Gawandekapse,
};

// ================================================================
// HELPER: GET INVITATION BY SLUG
// ================================================================

export function getInvitationBySlug(slug) {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  const normalizedSlug = slug
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();

  return invitations[normalizedSlug] || null;
}

// ================================================================
// HELPER: GET ALL INVITATIONS
// ================================================================

export function getAllInvitations() {
  return Object.values(invitations);
}

// ================================================================
// HELPER: NORMALIZE INVITATION DATA
// ================================================================

export function normalizeInvitation(invitation) {
  if (!invitation || typeof invitation !== "object") {
    return null;
  }

  return {
    ...invitation,

    assets: {
      ...DEFAULT_ASSETS,
      ...(invitation.assets || {}),
    },

    venue: {
      ...DEFAULT_VENUE,
      ...(invitation.venue || {}),
    },

    date: {
      day: "",
      month: "",
      monthNumber: 0,
      year: "",
      display: "",
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

    rsvpEnabled: Boolean(invitation.rsvpEnabled),
    storyEnabled: Boolean(invitation.storyEnabled),
    momentsEnabled: Boolean(invitation.momentsEnabled),
  };
}

// ================================================================
// DEFAULT EXPORT
// ================================================================

export default invitations;
