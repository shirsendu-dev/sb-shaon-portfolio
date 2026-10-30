// Project facts, screenshots, and case-study copy live here.
// Keep unknown facts in todos; empty links and optional sections stay hidden.
export const projects = [
  {
    slug: "cuba-tobacco-cigar-co",
    title: "Cuba Tobacco Cigar Co.",
    shortTitle: "Cuba Tobacco Cigar Co.",
    projectType: "Professional Business / E-commerce Website",
    year: null,
    heroImage: {
      src: "/projects/cigar/cover.jpg",
      alt: "Cuba Tobacco Cigar Co. homepage with its brand presentation and cigar collections",
      width: 1920,
      height: 919,
    },
    gallery: [
      {
        src: "/projects/cigar/screenshot-1.jpg",
        alt: "Cuba Tobacco Cigar Co. product detail page with product information and purchasing options",
        width: 1920,
        height: 919,
        caption: "Product detail — information and purchasing options in one view.",
      },
      {
        src: "/projects/cigar/screenshot-2.jpg",
        alt: "Cuba Tobacco Cigar Co. shop with product listings and catalog filters",
        width: 1920,
        height: 919,
        caption: "The shop — product browsing supported by catalog filters.",
      },
    ],
    shortDescription:
      "A professional WordPress website bringing a Little Havana family business, its cigar-making heritage, and an extensive online catalog together.",
    overview: [
      "Cuba Tobacco Cigar Co. is a family-run business in Little Havana, Miami. The Bello family's cigar-making tradition spans more than a century, with its Little Havana factory opening in 1994.",
      "The website gives that history a dedicated place alongside the shop. Visitors can explore the family legacy, discover branded collections, and browse cigars, accessories, and Panama hats within one connected business website.",
    ],
    objective:
      "Balance the company's heritage with a practical shopping experience: make the family story easy to explore while giving a substantial product catalog a clear, usable structure.",
    approach: [
      "The site gives the Bello family story its own Legacy section rather than reducing it to a short introduction on a sales page. This keeps the history available as a distinct part of the brand experience.",
      "Collection-focused navigation introduces Bello, La Sabana, and Bon Bon, while the shop provides product listings and filters such as blend, packaging, and quantity. Product pages, cart access, and customer account navigation connect discovery with shopping.",
    ],
    role: null,
    keyFeatures: [
      "Dedicated Legacy content covering the Bello family history",
      "Bello, La Sabana, and Bon Bon collection pages",
      "Ecommerce catalog covering cigars, accessories, and Panama hats",
      "Product organization and filtering by blend, packaging, and quantity",
      "Product detail pages with purchasing options",
      "Cart and customer account navigation",
      "Company and contact information",
    ],
    techStack: ["WordPress"],
    challenges: [
      {
        title: "Giving heritage room alongside commerce",
        description:
          "The family history is part of the business identity, but visitors also need a direct route to products.",
        solution:
          "A dedicated Legacy section carries the longer story, while collection and shop navigation keep the catalog accessible as a separate path.",
      },
      {
        title: "Making a substantial catalog easier to explore",
        description:
          "Multiple collections and product variations need more structure than a single undifferentiated product grid.",
        solution:
          "Collection pages introduce the ranges, and shop filters organize browsing around product characteristics such as blend, packaging, and quantity.",
      },
      {
        title: "Connecting discovery with the shopping flow",
        description:
          "Editorial brand content and product information serve different needs, but both belong within the same website.",
        solution:
          "The site's navigation connects brand pages with the shop, individual products, cart, and customer account area.",
      },
    ],
    whatILearned: [],
    futureImprovements: [],
    outcome:
      "The completed site provides a unified online presence where visitors can learn about the Bello family legacy, explore branded collections, and browse the company's online catalog.",
    liveUrl: "https://www.cubatobaccocigarco.com/",
    githubUrl: "",
    featured: true,
    tone: "business",
    client: "Cuba Tobacco Cigar Co.",
    sectionTitles: {
      objective: "Heritage meets commerce",
      approach: "The website approach",
      challenges: "Design considerations",
      outcome: "The online presence",
    },
    todos: {
      role: "TODO: Confirm your exact role and the work you personally delivered before publishing ownership or responsibility claims.",
      year: "TODO: Supply the verified project year or delivery date.",
      techStack: "TODO: Confirm the ecommerce platform and any other implementation technologies. WooCommerce is not yet verified.",
      whatILearned: "TODO: Add your own project lessons once your responsibilities are confirmed.",
      futureImprovements: "TODO: Add only improvements that are actually planned for the website.",
      screenshots: "TODO: Optional supporting screenshots still needed: Legacy page and mobile layout.",
    },
    sources: [
      { label: "Company history", url: "https://www.cubatobaccocigarco.com/legacy/" },
      { label: "Online catalog", url: "https://www.cubatobaccocigarco.com/shop/" },
    ],
  },
  {
    slug: "fitlog",
    title: "FitLog — Workout Library & Personal Training Planner",
    shortTitle: "FitLog",
    projectType: "Next.js Web Application",
    year: "2026",
    dateLabel: "October 2026",
    heroImage: {
      src: "/projects/fitlog/cover.jpg",
      alt: "FitLog homepage showing its workout library and application interface",
      width: 1920,
      height: 919,
    },
    gallery: [
      {
        src: "/projects/fitlog/screenshot-1.jpg",
        alt: "FitLog workout detail page with exercise information and plan actions",
        width: 1920,
        height: 1067,
        caption: "Workout details — exercise information beside plan and save actions.",
      },
      {
        src: "/projects/fitlog/screenshot-2.jpg",
        alt: "FitLog personal workout plan with selected exercises and sorting controls",
        width: 1920,
        height: 1097,
        caption: "My Plan — selected workouts, training totals, and sorting controls.",
      },
    ],
    shortDescription:
      "A responsive Next.js application for exploring workouts, organizing a personal training plan, and keeping saved exercises between visits.",
    overview: [
      "I built FitLog to bring workout discovery and everyday planning into one focused interface. Users can explore exercises, inspect the details, and keep a short plan alongside workouts saved for later.",
      "This is an independent application project in my progression from professional WordPress development into React and Next.js. The emphasis is on useful interactions, shared state, and persistence without adding an application backend.",
    ],
    objective:
      "Workout information can become scattered across separate sources and lists. I wanted a straightforward way to move from finding an exercise to organizing a manageable training plan.",
    approach: [
      "I separated API-driven browsing and workout details from the interactive planning controls. Async Server Components fetch the workout data, while Client Components handle selections, feedback, and plan changes through a shared Context provider.",
      "The provider keeps the plan and saved workouts together, checks for duplicates, and limits the active plan to five exercises. It loads existing localStorage data before writing state changes back, so a returning user's selections are retained.",
    ],
    role: "Next.js application development",
    keyFeatures: [
      "API-driven workout library covering major muscle groups",
      "Dynamic workout detail pages",
      "Personal plan with a five-workout limit and duplicate checks",
      "Saved workouts and removal controls",
      "Mark-as-done action for exercises in the active plan",
      "Sorting by duration, calories, and rating",
      "Plan and saved-workout persistence with localStorage",
      "Responsive cards and details, plus loading, empty, and 404 states",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "React Context API",
      "REST API",
      "localStorage",
    ],
    challenges: [
      {
        title: "Keeping plan and saved selections consistent",
        description:
          "Workout details and the planning view need to work with the same selections without introducing duplicate exercises.",
        solution:
          "I kept both lists in a shared Context provider and checked workout IDs before adding items. The same provider enforces the five-exercise plan limit, while the controls show whether an item is already selected or the plan is full.",
      },
      {
        title: "Restoring saved data before writing changes",
        description:
          "The initial empty React state should not overwrite a plan already stored in the browser.",
        solution:
          "I load the stored plan and saved list first, then use an initialization flag to allow subsequent state changes to update localStorage.",
      },
      {
        title: "Separating fetched data from interactive behavior",
        description:
          "The library and dynamic workout pages need fetched data, while planning actions require browser state.",
        solution:
          "I use async Server Components for the library and workout lookup, and focused Client Components for Context-driven actions and plan management. Missing workout records use the route's 404 handling.",
      },
    ],
    whatILearned: [
      "Working with the App Router, dynamic routes, and explicit Server/Client Component boundaries.",
      "Managing shared React state and using array operations for selection, removal, totals, and sorting.",
      "Coordinating localStorage persistence with the initial state-loading lifecycle.",
      "Building typed, reusable components that adapt from workout cards to detailed planning views.",
    ],
    futureImprovements: [],
    outcome:
      "FitLog brings exercise browsing, saved choices, and an active training plan into one application, with selections retained locally between visits.",
    liveUrl: "https://fit-log-next-js-app-mu.vercel.app/",
    githubUrl: "",
    featured: false,
    tone: "application",
    client: null,
    sectionTitles: {
      objective: "A more organized training plan",
      approach: "From browsing to a personal plan",
      challenges: "Implementation decisions",
      learning: "What I learned",
      outcome: "The application today",
    },
    todos: {
      githubUrl: "TODO: Confirm whether to publish the verified local repository URL: https://github.com/shirsendu-dev/Fit-Log-NextJs-App.",
      futureImprovements: "TODO: Add the next improvements you actually plan to build.",
    },
  },
  {
    slug: "book-vibe",
    title: "Book Vibe — Book Discovery & Reading Tracker",
    shortTitle: "Book Vibe",
    projectType: "Next.js Web Application",
    year: "2026",
    dateLabel: "September 2026",
    heroImage: {
      src: "/projects/bookvibe/cover.jpg",
      alt: "Book Vibe homepage introducing its book discovery interface",
      width: 1920,
      height: 919,
    },
    gallery: [
      {
        src: "/projects/bookvibe/screenshot-1.jpg",
        alt: "Book Vibe detail page for The Great Gatsby with reading and wishlist actions",
        width: 1920,
        height: 1004,
        caption: "Book details — a closer look before adding a title to a reading list.",
      },
      {
        src: "/projects/bookvibe/screenshot-2.jpg",
        alt: "Book Vibe Listed Books view with wishlist entries and sorting options",
        width: 1920,
        height: 1379,
        caption: "Listed Books — separate reading and wishlist views with shared sorting controls.",
      },
    ],
    shortDescription:
      "A Next.js application that connects book discovery with personal reading and wishlist selections through reusable UI and shared state.",
    overview: [
      "I built Book Vibe around a simple reader's task: find a book, understand what it offers, and keep track of titles to read or revisit. Book details, a Read List, and a Wishlist bring those choices into one interface.",
      "The project is part of my transition from professional WordPress work into modern React and Next.js development. It focuses on frontend architecture and application state rather than a commercial service or an account-based product.",
    ],
    objective:
      "Book discovery and reading choices can become disconnected. I wanted to connect a browsable collection with detailed book pages and clearly organized personal lists.",
    approach: [
      "I used structured JSON book data and reusable card components for the collection and list views. Dynamic book routes look up the selected record and present its details alongside focused client-side reading and wishlist actions.",
      "A shared Context provider supplies the Read List and Wishlist across the application. The listed-books view sorts copies of those arrays by rating, total pages, or publishing year, preserving the underlying shared list order.",
    ],
    role: "Next.js application development",
    keyFeatures: [
      "Browsable, JSON-driven book collection",
      "Dynamic book detail pages",
      "Personal Read List and Wishlist managed through React Context",
      "Sorting by rating, total pages, and publishing year",
      "Reusable book cards and list components",
      "Home, Listed Books, and Pages to Read navigation",
      "Responsive desktop, tablet, and mobile layouts",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "React Context API",
      "JSON data",
    ],
    challenges: [
      {
        title: "Sharing reading choices between pages",
        description:
          "Actions on a book's detail page need to feed the Read List and Wishlist views.",
        solution:
          "I placed the reading and wishlist arrays in a Context provider, letting the detail-page buttons and list pages work with the same state.",
      },
      {
        title: "Sorting lists without mutating their source",
        description:
          "Readers can change the displayed order by rating, page count, or publishing year without needing separate copies of each list in state.",
        solution:
          "I copy each list before applying the selected comparator. The view derives its sorted result from Context state rather than changing the shared arrays in place.",
      },
      {
        title: "Connecting dynamic detail pages with client actions",
        description:
          "A book page needs a record lookup, readable metadata, and buttons that update interactive application state.",
        solution:
          "I use an async Server Component to find the book for the route and handle missing records, then render small Client Components for the Read List and Wishlist actions.",
      },
    ],
    whatILearned: [
      "Connecting dynamic App Router pages with reusable, data-driven components.",
      "Sharing application state through Context while keeping page-specific sorting state local.",
      "Using array methods and conditional rendering to present different list states.",
      "Separating server-side record lookup from client-side state changes in a responsive frontend.",
    ],
    futureImprovements: [],
    outcome:
      "Book Vibe connects a structured book collection, detailed book pages, and reading or wishlist selections within one responsive frontend.",
    liveUrl: "https://book-vibe-next-js-app-pied.vercel.app/",
    githubUrl: "",
    featured: false,
    tone: "application",
    client: null,
    sectionTitles: {
      objective: "Keep discovery and reading choices together",
      approach: "One collection, reusable views",
      challenges: "State and interface decisions",
      learning: "What I learned",
      outcome: "The application today",
    },
    todos: {
      githubUrl: "TODO: Confirm whether to publish the verified local repository URL: https://github.com/shirsendu-dev/Book-Vibe-NextJs-App.",
      futureImprovements: "TODO: Add the next improvements you actually plan to build.",
    },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}
