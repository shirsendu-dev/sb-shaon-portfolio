export const site = {
  name: "Shirsendu Biswas Shaon",
  role: "Full Stack Developer & WordPress Expert",
  description:
    "Full Stack Developer and WordPress Expert with 7+ years of professional web experience, building modern applications, high-performing business websites and scalable digital solutions.",
  // Optional production origin. SITE_URL or Vercel's system URL can supply it instead.
  url: "",
  hero: {
    eyebrow: "Full Stack Developer · WordPress Expert",
    title: "The Developer Who",
    accent: "Understands Your Business",
    description:
      "I turn business problems into working products — websites that convert, full-stack web applications that scale.",
  },
  about: {
    intro: "An established web career. An expanding perspective.",
    paragraphs: [
      "I started in web design and WordPress development. Over more than seven years, I have built and maintained business websites, working across responsive design, ecommerce, performance, accessibility, hosting, and the practical details that keep a website running.",
      "Approximately five of those years were spent working remotely with a U.S.-based digital marketing agency. Contributing to production websites and ongoing client work taught me to connect technical decisions with usability, business goals, and the people relying on the site every day.",
      "Wanting deeper control over the applications I build led me into JavaScript, React, Next.js, Node.js, Express, and MongoDB. Today, I am bringing that modern development skill set together with the judgment that comes from years of real website work.",
    ],
    principles: [
      "Business context before technical decisions",
      "Thoughtful design and dependable implementation",
      "Care for the website beyond launch day",
    ],
    // TODO: Add verified personal interests or hobbies when ready.
    hobbies: null,
  },
  contact: {
    EMAIL: "shirsendu.js.dev@gmail.com",
    LINKEDIN_URL: "https://www.linkedin.com/in/shirsendu-biswas/",
    GITHUB_URL: "https://github.com/shirsendu-dev",
  },
  portrait: {
    src: "/images/profile-photo.jpg",
    alt: "Portrait of Shirsendu Biswas Shaon",
    // Replace this image or update the path to change the hero portrait.
    available: true,
  },
  resume: {
    path: "/shirsendu-biswas-resume.pdf",
    available: true,
  },
  // TODO: Add verified entries using { degree, field, institution, year }.
  // The education section stays hidden while this array is empty.
  education: [],
};

export const navigation = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

export const stats = [
  { value: "7+", label: "Years of professional web experience" },
  { value: "~5", label: "Years with a remote U.S. agency" },
  { value: "End to end", label: "WordPress expertise" },
  { value: "Modern stack", label: "React · Next.js · MERN" },
];
