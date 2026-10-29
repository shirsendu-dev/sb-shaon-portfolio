// Add a project by copying an entry below. Empty values are intentionally not
// published as links or claims. Replace preview artwork with real screenshots.
export const projects = [
  {
    slug: "fitlog",
    title: "FitLog — Workout Library",
    shortTitle: "FitLog",
    type: "Next.js application",
    category: "Application development",
    client: "",
    role: "", // TODO: Add your exact role and ownership.
    screenshot: "/projects/fitlog-preview.svg",
    screenshotAlt: "Illustrative FitLog project artwork; actual screenshot pending",
    screenshotIsPlaceholder: true,
    isPlaceholder: false,
    summary:
      "An API-driven workout library with exercise details, saved workouts, and a personal workout plan that stays with you between visits.",
    objective:
      "Bring workout discovery and personal planning into one responsive interface, with dedicated exercise pages and a way to keep selected workouts.",
    solution:
      "A Next.js application using dynamic routes for workout details, Context API for shared state, and local storage for a persistent personal plan.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Context API",
      "REST API",
      "Local Storage",
      "React Toastify",
      "Vercel",
    ],
    features: [
      "API-driven workout library",
      "Workout detail pages with dynamic routes",
      "Personal workout plan and saved workouts",
      "Workout sorting",
      "Responsive application interface",
      "Local persistence with shared Context API state",
    ],
    responsibilities: [], // TODO: Add your verified responsibilities.
    // TODO: Add real challenges as { challenge: "…", resolution: "…" }.
    challenges: [],
    learnings: [], // TODO: Add your own development takeaways.
    futureImprovements: [], // TODO: Add actual planned improvements.
    outcome: "", // TODO: Add a verified qualitative outcome; no invented metrics.
    liveUrl: "", // TODO: Add the deployed project URL.
    githubUrl: "", // TODO: Add the client repository URL.
    verificationNote: "",
  },
  {
    slug: "bazardor",
    title: "BazarDor",
    shortTitle: "BazarDor",
    type: "Next.js web application",
    category: "Modern web development",
    client: "",
    role: "", // TODO: Add your exact role and ownership.
    screenshot: "/projects/bazardor-preview.svg",
    screenshotAlt: "Illustrative BazarDor project artwork; actual screenshot pending",
    screenshotIsPlaceholder: true,
    isPlaceholder: false,
    summary:
      "A Next.js web application exploring authenticated experiences, API-driven product categories, and a responsive interface.",
    objective: "", // TODO: Describe the actual problem and target users.
    solution: "", // TODO: Describe the final implemented solution.
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Better Auth",
      "REST API",
    ],
    // Supplied project concepts; confirm this list against the completed app.
    features: [
      "Authentication with Better Auth",
      "Protected routes",
      "REST API integration",
      "Dynamic routes and product categories",
      "Responsive user interface",
    ],
    responsibilities: [],
    challenges: [],
    learnings: [],
    futureImprovements: [],
    outcome: "",
    liveUrl: "",
    githubUrl: "",
    verificationNote:
      "Project details are being prepared. The scope below reflects the supplied project brief and needs a final check against the completed application.",
  },
  {
    slug: "wordpress-business-website",
    title: "Professional WordPress Business Website",
    shortTitle: "WordPress business website",
    type: "Professional WordPress project",
    category: "WordPress development",
    client: "", // TODO: Add a client/company only when it can be shared.
    role: "",
    screenshot: "/projects/wordpress-preview.svg",
    screenshotAlt: "WordPress case study placeholder; real project screenshot pending",
    screenshotIsPlaceholder: true,
    isPlaceholder: true,
    summary:
      "A place for a real business website from my professional WordPress work. Project details and a verified screenshot will be added here.",
    objective: "",
    solution: "",
    technologies: [], // TODO: Add the technologies used on the real project.
    features: [],
    responsibilities: [],
    challenges: [],
    learnings: [],
    futureImprovements: [],
    outcome: "",
    liveUrl: "",
    githubUrl: "",
    verificationNote:
      "Case study placeholder. Client, project scope, responsibilities, and outcomes have not yet been supplied.",
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
