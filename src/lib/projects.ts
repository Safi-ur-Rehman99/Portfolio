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
    slug: "arc",
    index: "01",
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
    slug: "inotes",
    index: "02",
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
];

export const projectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
