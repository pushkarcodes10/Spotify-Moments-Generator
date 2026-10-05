/**
 * SPOTIFY MOMENTS GENERATOR — MEDIA ASSETS CONFIGURATION
 * 
 * You can replace any of the image or video URLs below with your own files.
 * If you place your images in the /public folder (e.g. /public/hero-moment.jpg),
 * simply set the path to "/hero-moment.jpg".
 */

export const MEDIA_ASSETS = {
  // 1. Hero 3D Orbit Cards
  heroOrbit: [
    {
      id: "yellow",
      title: "Yellow",
      artist: "Coldplay",
      // CHANGE HERE: Replace with your own image path (e.g. "/moments/yellow.jpg")
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: "midnight-city",
      title: "Midnight City",
      artist: "M83",
      // CHANGE HERE: Replace with your own image path
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: "tum-se-hi",
      title: "Tum Se Hi",
      artist: "Pritam",
      // CHANGE HERE: Replace with your own image path
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: "starboy",
      title: "Starboy",
      artist: "The Weeknd",
      // CHANGE HERE: Replace with your own image path
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=80",
    },
    {
      id: "photograph",
      title: "Photograph",
      artist: "Ed Sheeran",
      // CHANGE HERE: Replace with your own image path
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&auto=format&fit=crop&q=80",
    },
  ],

  // 2. Central Phone Mockup inside Hero
  heroPhone: {
    // CHANGE HERE: Image displayed on the card inside the phone preview
    momentCardImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
  },

  // 3. Kinetic Typography Backgrounds (Masked text images)
  kineticMasks: {
    // CHANGE HERE: Mask image inside "Traditional / Memory" block
    memoryMask: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
    // CHANGE HERE: Mask image inside "Discovery / Keepsake" block
    keepsakeMask: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80",
  },

  // 4. Overlapping 3D Phone Mockups in "How It Works"
  flowPhones: {
    // CHANGE HERE: Image on phone 1
    phone1Image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
  },

  // 5. Floating Polaroid Keepsakes in "Freeze The Moment"
  floatingPolaroids: {
    // CHANGE HERE: Polaroid 1 (Top-Left)
    card1: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80",
    // CHANGE HERE: Polaroid 2 (Top-Center)
    card2: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80",
    // CHANGE HERE: Polaroid 3 (Top-Right)
    card3: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&auto=format&fit=crop&q=80",
    // CHANGE HERE: Polaroid 4 (Bottom-Left)
    card4: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&auto=format&fit=crop&q=80",
    // CHANGE HERE: Polaroid 5 (Bottom-Right)
    card5: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80",
  },

  // 6. Giant "MOMENTS" Cutout Typography Mask
  momentsCutoutMask:
    // CHANGE HERE: Background texture/photo masked inside giant "MOMENTS" letters
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80",

  // 7. Preview image inside "Why Spotify Moments" Accordion
  accordionPreview:
    // CHANGE HERE: Preview card image
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=80",
};
