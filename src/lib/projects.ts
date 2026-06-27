import arcImg from "@/assets/work-arc.jpg";
import inotesImg from "@/assets/work-inotes.jpg";
import dailypulseImg from "@/assets/work-dailypulse.jpg";

export type Project = {
  slug: string;
  index: string;
  title: string;
  tagline: string;

  role: string;
  stack: string[];
  live: string;
  github: string;
  image: string;
  context: string;
  built: string[];
  hard: string;
  learned: string;
};

export const projects: Project[] = [
  {
    slug: "vpad",
    index: "01",
    title: "Vpad",
    tagline: "A notes application designed for students with AI integration and real-time collaboration.",
    role: "Full-stack",
    stack: ["React", "AI Integration", "Real-time Sync", "Node.js"], // Placeholder stack based on description
    live: "https://v-pad.vercel.app/",
    github: "https://github.com/Safi-ur-Rehman99/Vpad",
    image: inotesImg, // Placeholder
    context: "Vpad is a notes application designed specifically for students to store and manage their notes. It features two powerful integrations: AI capabilities for quiz generation and summarization, and real-time notes sharing. It solves the common problem of students having to send updated notes back and forth by allowing multiple users to edit shared notes simultaneously in real-time.",
    built: [
      "AI integration for automatic quiz generation from notes.",
      "AI-powered note summarization.",
      "Real-time collaboration letting multiple students edit the same document concurrently.",
      "A student-centric note management system."
    ],
    hard: "Implementing seamless real-time syncing so that edits from multiple users don't conflict or overwrite each other.",
    learned: "Gained significant experience in building collaborative real-time text editing features and integrating AI tools into a practical educational product.",
  },
  {
    slug: "arc",
    index: "02",
    title: "ARC",
    tagline: "Real-time language exchange, built for the messy parts of talking.",

    role: "Full-stack, end to end",
    stack: ["MongoDB", "Express", "React", "Node", "Stream SDK", "JWT", "TailwindCSS"],
    live: "https://arc-dlsj.onrender.com/",
    github: "https://github.com/Safi-ur-Rehman99/ARC",
    image: arcImg,
    context:
      "Language apps either drill flashcards or drop you into a stranger's DMs. ARC sits in the middle — a place where two learners get matched, meet, and actually talk. The hard part of language isn't vocabulary. It's the courage to use it with a real person.",
    built: [
      "Partner matching that pairs learners by native and target language, not by gamified streaks.",
      "Real-time messaging and video calls integrated through the Stream SDK, with a UI that stays out of the way during a call.",
      "JWT authentication with protected routes, persistent sessions, and clean error surfaces when tokens expire.",
      "A MERN backend modeled around conversations rather than profiles — the message thread is the unit of truth.",
    ],
    hard: "Getting video and chat to feel like one product, not two. The first version had call state and chat state living in separate components and they drifted constantly — a user could be on a call with someone they weren't messaging. I rewrote the conversation layer so a session owns both, and the call is just a mode of the same thread.",
    learned:
      "Real-time work punishes you for hand-waving. Every reconnect, every dropped socket, every stale token shows up as a user-visible bug. I left this project with a much sharper instinct for designing around failure instead of around the happy path.",
  },
  {
    slug: "dailypulse",
    index: "03",
    title: "DailyPulse",
    tagline: "A news reader that respects your attention more than your engagement.",

    role: "Frontend",
    stack: ["React", "newsdata.io API", "Client-side filtering", "Responsive UI"],
    live: "https://news-app-xi-olive.vercel.app/",
    github: "https://github.com/Safi-ur-Rehman99/NewsApp",
    image: dailypulseImg,
    context:
      "Most news apps optimize for time-on-site. DailyPulse is built around picking a country, picking a category, and getting out. The interface is deliberately quiet — the headline does the work, not the chrome around it.",
    built: [
      "Client-side filtering across 50+ countries and 10+ categories, with state that survives navigation.",
      "A clean integration with the newsdata.io API, including handling for rate limits and empty result sets.",
      "A responsive layout that scales from a phone in one hand to a desktop reading session without changing how it feels.",
    ],
    hard: "Designing for empty states. Some country-and-category combinations return nothing, and a blank screen feels broken even when it's correct. The fix was language — telling the user what happened in a single line, in the app's voice, instead of staring at white space.",
    learned:
      "Restraint is a real design move. Removing the second column, the social buttons, the trending sidebar — every subtraction made the product feel more confident, not less.",
  },
  {
    slug: "inotes",
    index: "04",
    title: "iNotes",
    tagline: "A notes app that takes the boring parts of production seriously.",

    role: "Full-stack",
    stack: ["React", "Vercel", "Node", "Express", "MongoDB", "JWT"],
    live: "https://i-notes-client-flax.vercel.app/",
    github: "https://github.com/Safi-ur-Rehman99/iNOTES",
    image: inotesImg,
    context:
      "There are a thousand notes apps. iNotes wasn't about reinventing one — it was about treating a small product like a real one. Decoupled architecture, deployed on two surfaces, proper auth, proper isolation. Things you can skip in a tutorial and pay for in production.",
    built: [
      "A decoupled MERN architecture — React on Vercel, Node/Express API on its own host — so the frontend and backend can scale and ship independently.",
      "JWT authentication with full user-level data isolation. Every query is scoped at the database layer; the API never trusts a client-supplied user id.",
      "A note model designed for clean CRUD, with timestamps and a predictable shape across endpoints.",
      "Deployment pipelines that make the two halves easy to redeploy without breaking the contract between them.",
    ],
    hard: "Auth and CORS across two deployment surfaces. It works locally on one origin and then quietly breaks the moment the frontend goes to Vercel. Tracking down the right combination of credentials, headers, and cookie config taught me to read deployment docs the way I read error stacks.",
    learned:
      "Boilerplate is a feature when other people use your product. Boring decisions — clear folder structure, predictable error shapes, env-driven config — pay for themselves the first time you need to ship a fix in five minutes.",
  },
  {
    slug: "kids-corner",
    index: "05",
    title: "Kids Corner",
    tagline: "Sustainable Pre-Loved Toys E-commerce Platform",
    role: "Full-stack",
    stack: ["React", "Firebase", "Tailwind CSS", "Vite"],
    live: "https://kids-corner-f9092.web.app/",
    github: "https://github.com/Safi-ur-Rehman99/project",
    image: dailypulseImg, // Placeholder until a specific image is provided
    context: "Kids Corner is a modern, full-featured e-commerce platform specializing in curated, high-quality pre-loved children's toys. It combines sustainability with affordability, making quality toys accessible while promoting environmental consciousness.",
    built: [
      "Product catalog with smart filtering by category, condition, and price range.",
      "Firebase authentication and real-time database integration.",
      "Persistent shopping cart with real-time updates and quantity management.",
      "Modern UI with gradient design system and WCAG compliant accessibility patterns."
    ],
    hard: "Managing complex cart state and synchronizing it with Firebase in real-time, ensuring users don't lose their items on refresh while maintaining accurate stock levels.",
    learned: "Deepened my understanding of Firebase security rules and NoSQL data modeling for e-commerce, specifically around handling user sessions and cart persistence efficiently.",
  },
];

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
