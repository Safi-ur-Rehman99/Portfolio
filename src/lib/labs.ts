export type Lab = {
  slug: string;
  title: string;
  body: string;
  status: "Shipped" | "Live" | "Drafting";
  tags: string[];
  link: string | null;

};

export const labs: Lab[] = [
  {
    slug: "discord-scheduler",
    title: "Discord Meeting Scheduler",
    body: "Node bot that spins up a Google Meet via the Calendar API and drops it into a Discord channel — one slash command, no calendar tabs.",
    status: "Shipped",
    tags: ["Node", "Discord.js", "Google Calendar API"],
    link: null,

  },
  {
    slug: "api-test-suite",
    title: "API Testing Suite",
    body: "Jest + Supertest coverage on a Node/Express API, wired into GitHub Actions. Every push is a small interview question I already answered.",
    status: "Shipped",
    tags: ["Jest", "Supertest", "GitHub Actions"],
    link: "https://github.com/Safi-ur-Rehman99",

  },
  {
    slug: "currently-exploring",
    title: "Currently exploring",
    body: "Docker, tRPC, n8n. Things I'm reading, breaking, and putting back together this month — notes more than products.",
    status: "Live",
    tags: ["Docker", "tRPC", "n8n"],
    link: null,

  },
];
