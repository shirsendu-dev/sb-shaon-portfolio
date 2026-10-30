# Shirsendu Biswas Shaon — Professional Portfolio

A Next.js App Router portfolio for **Shirsendu Biswas Shaon, Full Stack Developer & WordPress Expert**. Built with JavaScript, React, Tailwind CSS, React Icons, `next/image`, and `next/link`. Content is separated from presentation so the site can grow without changing its component structure. The SB favicon and monogram remain part of the visual identity.

The professional story distinguishes 7+ years of WordPress and web experience from current development in the modern JavaScript stack. No employers, clients, dates, outcomes, or contact details have been invented.

## Run locally

Use a Node.js version supported by the installed Next.js release and npm. From the repository root:

```bash
npm install
npm run dev
```

Open the local address printed by Next.js, normally [localhost:3000](http://localhost:3000).

```bash
npm run lint    # ESLint checks
npm run build   # Production build and route generation
npm run start   # Serve the completed production build
```

Run `npm run build` before `npm run start`. The committed package lock records the dependency versions; `npm ci` can be used for a clean, reproducible installation.

## Edit the content

| File | Content |
| --- | --- |
| `src/data/site.js` | Brand, hero copy, biography, navigation, statistics, contact details, portrait, résumé, education, production domain |
| `src/data/skills.js` | Core expertise and categorized technical skills |
| `src/data/experience.js` | Agency and freelance work; current professional development is separate from employment |
| `src/data/projects.js` | Project previews and complete case-study content |
| `src/data/services.js` | Services and the development journey |

Homepage sections are in `src/components/home/`, shared navigation and footer in `src/components/shared/`, and project components in `src/components/projects/`. Global visual styles are in `src/app/globals.css`.

Project detail pages are generated from the project data at `/projects/[slug]`:

- `/projects/cuba-tobacco-cigar-co`
- `/projects/fitlog`
- `/projects/book-vibe`

Add another project by copying a data entry and giving it a unique slug. Rebuild after adding or changing project routes.

The homepage presents Cuba Tobacco Cigar Co. first, followed by FitLog and Book Vibe. The professional business website and the two application projects share the portfolio's visual system while using case-study copy appropriate to their context.

| Project fields | Purpose |
| --- | --- |
| `slug`, `title`, `shortTitle`, `projectType` | Route, full case-study title, compact card title, and project context |
| `year`, `dateLabel`, `role`, `client` | Verified project metadata; unknown values remain empty |
| `heroImage` | Main image object: `{ src, alt, width, height }` |
| `gallery` | Supporting screenshot objects with accurate descriptions and dimensions |
| `shortDescription`, `overview`, `objective`, `approach` | Preview copy and the case-study narrative |
| `keyFeatures`, `techStack` | Confirmed functionality and technologies |
| `challenges` | Entries shaped as `{ title, description, solution }`, grounded in inspected implementation or visible site structure |
| `whatILearned`, `futureImprovements`, `outcome` | Verified lessons, actual planned improvements, and supported qualitative outcomes |
| `liveUrl`, `githubUrl` | Public project links; GitHub buttons stay hidden when the repository URL is empty |
| `featured`, `tone`, `sectionTitles` | Featured presentation, business/application emphasis, and optional section wording |
| `todos`, `sources` | Editable missing-information notes and evidence references |

Current live project links:

- [Cuba Tobacco Cigar Co.](https://www.cubatobaccocigarco.com/)
- [FitLog](https://fit-log-next-js-app-mu.vercel.app/)
- [Book Vibe](https://book-vibe-next-js-app-pied.vercel.app/)

## Supply the missing assets

### Portrait

The supplied professional portrait is configured at **`public/images/profile-photo.jpg`** with `site.portrait.available` set to `true` in `src/data/site.js`. To change the photo, replace that file or update `site.portrait.src`, and keep the alt text accurate.

The hero uses `next/image` to optimize the portrait and keeps the top of the photo visible when cropped. A labeled placeholder is available if `site.portrait.available` is set to `false`.

### Résumé

Place the actual résumé PDF at **`public/SB-Shaon-Resume.pdf`**. Then set `site.resume.available` to `true`. The public URL is `/SB-Shaon-Resume.pdf`. Until then, the download control remains inactive and does not link to a missing file.

### Project screenshots

The project system uses the nine real JPG assets supplied in these existing folders:

```text
public/projects/cigar/
  cover.jpg
  screenshot-1.jpg
  screenshot-2.jpg

public/projects/fitlog/
  cover.jpg
  screenshot-1.jpg
  screenshot-2.jpg

public/projects/bookvibe/
  cover.jpg
  screenshot-1.jpg
  screenshot-2.jpg
```

The main image is configured in `heroImage`; supporting images belong in `gallery`. Public paths begin with `/projects/`, not `/public/projects/`. Keep each image's `alt`, `width`, and `height` accurate when replacing a file. The original screenshot files remain in place rather than being renamed solely to match the public route slugs.

No core project images are missing. Optional additions would give the case studies more depth: Cuba Tobacco Cigar Co.'s Legacy page and a mobile view, Book Vibe's Pages to Read screen, and FitLog's saved-workouts screen. Add those files and gallery entries only when real screenshots are available; do not generate replacement interfaces.

Remaining project information is kept in editable `todos` instead of being invented:

- Confirm Cuba Tobacco Cigar Co.'s exact role, project year, and personal responsibilities.
- Confirm WooCommerce or any other implementation tools before adding them to the business website's stack. WordPress is confirmed; a working shop alone does not establish a specific ecommerce technology.
- Supply the FitLog and Book Vibe repository URLs if they may be shared. GitHub URLs remain empty until confirmed, and no repository button is shown for an empty URL.
- Add future improvements only when they reflect actual plans. Add business outcomes only when they can be supported.

The application case studies describe independent development work, not commercial client engagements. The business case study distinguishes visible website functionality from personal implementation ownership. The [Legacy](https://www.cubatobaccocigarco.com/legacy/) and [Shop](https://www.cubatobaccocigarco.com/shop/) pages support its business context and observable site structure; they do not establish the developer's exact responsibilities.

## Contact and education

The three contact channels are configured under `site.contact` and used throughout the website:

```js
EMAIL: "shirsendu.js.dev@gmail.com"
LINKEDIN_URL: "https://www.linkedin.com/in/shirsendu-biswas/"
GITHUB_URL: "https://github.com/shirsendu-dev"
```

The email address uses a `mailto:` link; social profiles use their full `https://` URLs. Update these shared values when contact details change.

The contact section also includes a form that submits to `POST /api/contact`. The server sends plain-text email through Resend using native `fetch`, with the recipient taken from `site.contact.EMAIL`. A visitor's address becomes `reply_to`, so replies go to the person who submitted the form.

Education stays hidden until verified entries are added to `site.education` using `{ degree, field, institution, year }`. `site.about.hobbies` is also left empty for real personal interests to be supplied later.

## Configure contact form delivery

The local contact-form submission flow has been verified in the browser and accepted by Resend for `shirsendu.js.dev@gmail.com`. The success message appears, fields clear, and the send button becomes available again. Inbox receipt has not been independently confirmed. Each deployment still needs the two server environment variables below; the form reports errors honestly when delivery is unavailable.

1. Create a Resend API key and verify a sending domain you own. See the official [Next.js sending guide](https://resend.com/docs/send-with-nextjs) and [verified domain guide](https://resend.com/docs/dashboard/domains/introduction).
2. Copy `.env.example` to `.env.local` in the repository root.
3. Set `RESEND_API_KEY` to your private API key and `CONTACT_FROM_EMAIL` to an address at your verified sending domain. The sender must not be the visitor's address or your Gmail inbox. Your Gmail address remains the recipient.
4. Restart the local Next.js server after saving the environment variables. For Vercel, add the same variables to the relevant project environments and redeploy.
5. Send a real test message from the form, check Resend's delivery status, and confirm that it arrives in your inbox. The website's success response means Resend accepted the message with an email ID; it does not prove inbox delivery.

Keep `.env.local` and API keys out of Git and chat. Only the blank `.env.example` is tracked. Do not prefix these variables with `NEXT_PUBLIC_`, which would expose them to the browser.

For development before a sending domain is verified, Resend permits `CONTACT_FROM_EMAIL="Shirsendu Biswas Shaon <onboarding@resend.dev>"`. This test sender can only send to the exact email registered on the Resend account that issued the API key. To test delivery to `shirsendu.js.dev@gmail.com`, use a key from a Resend account registered to that address. A Gmail inbox is a valid recipient, but cannot be used as the Resend sender. Use a verified domain sender before public launch. See [Resend's testing restriction](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

The server checks the request origin, validates all fields, rejects a filled honeypot, and caps request bodies at 40,000 bytes. Names allow 2–100 characters, subjects 3–150, and messages 20–5,000. The recipient and sender are controlled by the server, and identical retries use an idempotency key to avoid duplicate emails.

There is a best-effort limit of five delivery attempts per IP address per ten minutes on each server instance. This memory-based limit is not shared across Vercel instances and resets when an instance restarts. Use hosting-level rate controls for broader production protection.

Run the contact validation and provider-response tests without sending real email:

```bash
node --experimental-default-type=module --test tests/contact.test.mjs
```

The tests mock the provider at the test boundary. They do not verify live credentials, domain configuration, or actual inbox delivery.

## Deploy to Vercel

Deployment has not been performed by this implementation. No hosting account access or production URL is assumed.

1. Complete the content and asset checklist below, then commit the project to a Git repository available to your Vercel account.
2. In Vercel, import that repository as a new project.
3. Use the **Next.js** framework preset and the repository root as the root directory. Keep the default build command, **`npm run build`**, and the framework's default output settings. No custom static export is required.
4. Deploy and inspect the resulting preview. Check the homepage, each case study, mobile navigation, images, résumé, and contact links.
5. Configure the final domain if desired. Once its real URL is known, set `site.url` to the full production origin, including `https://`, and redeploy. Canonical URLs should only be published after that value is configured; do not use an invented domain.

The implementation does not require an external database or authentication provider. Contact form delivery requires the server-only Resend variables described above; configure them through the hosting platform rather than committing them.

Deployment guidance follows the documentation bundled with this installed Next.js version, including `node_modules/next/dist/docs/01-app/01-getting-started/17-deploying.md`.

## Before public launch

- Verify the supplied portrait, and add the real résumé before enabling its availability flag.
- Verify the configured email, LinkedIn, and GitHub details and test each link.
- Configure the contact delivery variables, send a real form submission, and confirm receipt in the inbox.
- Review the nine supplied project images, their captions, and their alt text; add optional screenshots only when available.
- Resolve the remaining project-data TODOs, including the business website's role/year and verified repository URLs where appropriate.
- Confirm that all claims and listed features match the actual work; add education only when verified.
- Review homepage and project metadata, favicon, and social share artwork; set the real `site.url` after the domain is known.
- Run `npm run lint` and `npm run build`, then inspect `npm run start`.
- Check mobile, tablet, and desktop layouts for horizontal overflow; test the mobile menu and keyboard focus, and inspect the browser console.
- Verify every project route and an unknown route, all navigation anchors, images, résumé viewing/download, contact form validation and feedback, and direct contact actions.
- Deploy, then repeat the key checks on the real hosted URL.

## Fonts and rendering

Geist and Space Grotesk are self-hosted with `next/font/local`. Their Latin font files and open-source licenses are in `src/fonts/`, so builds do not need to contact Google Fonts. The footer is a cached Server Component; its current-year value refreshes daily to support this project's enabled Cache Components configuration.
