export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  story: string;
  stack: string[];
  role: string;
  status: string;
  testimonial?: { quote: string; name: string; role: string; organisation: string };
  repoUrl?: string;
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
    role: "Built by me for Route 56 Adventures — handed to me after Kokstad proved the approach worked.",
    status: "Live",
    repoUrl: "https://github.com/kwaAya/matatieletourism",
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
      "Kokstad sits at the gateway to East Griqualand, and the platform was built around that role — helping a visitor plan outward from the town rather than just book a single stay. Filterable listings do the heavy lifting so the site scales with new operators without a rebuild. My uncle handed it over half-finished as a test; I completed the build and gave it the structure and visual identity it didn't have.",
    stack: ["PHP", "MySQL", "SEO"],
    role: "The first one. My uncle handed it over half-finished as a test; I completed the build and gave it the structure and visual identity it didn't have.",
    status: "Live",
    repoUrl: "https://github.com/kwaAya/Route-56-Adventures",
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
    role: "Not my build. Founded and built by my uncle; the platform was already solid. I updated the content and the UI.",
    status: "Live",
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
    role: "Started by Route 56 Adventures. I rebuilt the front end and did substantial back-end work, including the OTP flow, Yoco payment integration, and POPIA-shaped data modelling. Still being finished.",
    status: "Live — not yet in active use",
    repoUrl: "https://github.com/kwaAya/Ngejane-Dental",
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
      "Conceived, designed, and developed 'Digital Break' (digitalbreak.netlify.app), an engaging, fast-paced web-based game launched in May of last year. As a solo developer, I was responsible for the entire game development lifecycle, including game design, frontend and backend programming, UI/UX design, and deployment. The game features intuitive tap mechanics, dynamic challenges with power-ups and boss targets, and a global leaderboard. This project demonstrates my capabilities in full-stack game development, creative problem-solving, and delivering interactive web experiences. No frameworks, no engine — just a canvas and a game loop built by hand. This one exists to show the craft underneath the craft: collision detection, state management, and frame timing written from first principles rather than assembled from a library.",
    stack: ["JavaScript", "HTML5 Canvas", "CSS3"],
    role: "Self-directed. No client, no brief, no framework.",
    status: "Self-directed",
    repoUrl: "https://github.com/kwaAya/Digital-Break-V2.1",
    liveUrl: "https://digitalbreak.netlify.app",
  },
];
