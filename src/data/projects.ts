export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  story: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  liveUrl: string;
};

export const projects: Project[] = [
  {
    slug: "matatiele-online",
    name: "Matatiele Online",
    tagline: "Tourism portal",
    category: "Tourism",
    description:
      "A digital hub for the town of Matatiele. Business directory, attractions, accommodation listings and SEO-tuned content built to make a place discoverable.",
    story:
      "Matatiele needed to exist online the way it exists on the ground — as a full town, not a single hotel's landing page. The build centres on a business directory and attractions index that a small tourism office can maintain themselves, with SEO structure doing the work of making the town findable in the first place.",
    stack: ["PHP", "MySQL", "SEO"],
    metrics: [
      { label: "Value", value: "R54,000" },
      { label: "Hours", value: "120" },
      { label: "Rate", value: "R450/hr" },
    ],
    liveUrl: "https://matatiele.co.za",
  },
  {
    slug: "kokstad-tourism",
    name: "Kokstad Tourism",
    tagline: "Gateway to East Griqualand",
    category: "Tourism",
    description:
      "A dynamic directory-driven travel platform for Kokstad — dynamic listings, filterable content and a travel planning surface tuned for discovery.",
    story:
      "Kokstad sits at the gateway to East Griqualand, and the platform was built around that role — helping a visitor plan outward from the town rather than just book a single stay. Filterable listings do the heavy lifting so the site scales with new operators without a rebuild.",
    stack: ["PHP", "MySQL", "SEO"],
    metrics: [
      { label: "Value", value: "R45,000" },
      { label: "Hours", value: "100" },
      { label: "Rate", value: "R450/hr" },
    ],
    liveUrl: "https://kokstadtourism.co.za",
  },
  {
    slug: "route-56-adventures",
    name: "Route 56 Adventures",
    tagline: "Tourism aggregator, 16 towns, 765km",
    category: "Aggregator",
    description:
      "Central hub aggregating 16 towns across a 765km corridor. Complex itinerary management, mapped attractions and advanced SEO across a multi-town namespace.",
    story:
      "The hardest part of Route 56 wasn't any single town — it was making 16 of them behave like one coherent route without flattening what makes each stop different. That meant an information architecture built for a corridor first and a town second, plus SEO structured to hold up across the whole namespace.",
    stack: ["PHP", "MySQL", "Maps", "Advanced SEO"],
    metrics: [
      { label: "Value", value: "R67,500" },
      { label: "Hours", value: "150" },
      { label: "Rate", value: "R450/hr" },
    ],
    liveUrl: "https://route56adventures.co.za",
  },
  {
    slug: "ngejane-dental",
    name: "Ngejane Dental",
    tagline: "Healthcare booking & payments",
    category: "Healthcare",
    description:
      "A conversion-focused clinic platform with online booking, OTP verification and Yoco payment integration — POPIA compliant and built to convert.",
    story:
      "A dental clinic's real bottleneck is the phone line, not the chair — so this build moved booking online entirely, with OTP verification to keep it trustworthy and Yoco handling payment. POPIA compliance wasn't a checkbox at the end; it shaped how patient data was modelled from the first schema.",
    stack: ["PHP", "Yoco", "OTP", "POPIA"],
    metrics: [
      { label: "Value", value: "R36,000" },
      { label: "Hours", value: "80" },
      { label: "Rate", value: "R450/hr" },
    ],
    liveUrl: "https://dental.konwaba-brands.co.za/ngejane",
  },
  {
    slug: "digital-break",
    name: "Digital Break V2.1",
    tagline: "Browser game — JS from scratch",
    category: "Gaming",
    description:
      "Interactive browser game with collision detection, state management and game-loop architecture written from scratch — a demo of raw JavaScript craft.",
    story:
      "No frameworks, no engine — just a canvas and a game loop built by hand. This one exists to show the craft underneath the craft: collision detection, state management, and frame timing written from first principles rather than assembled from a library.",
    stack: ["JavaScript", "HTML5 Canvas", "CSS3"],
    metrics: [
      { label: "Value", value: "R27,000" },
      { label: "Hours", value: "60" },
      { label: "Rate", value: "R450/hr" },
    ],
    liveUrl: "https://digitalbreak.netlify.app",
  },
];
