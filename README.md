# Shirsendu Biswas Shaon — Professional Portfolio

A Next.js App Router portfolio for **Shirsendu Biswas Shaon, Full Stack Developer & WordPress Expert**. Built with JavaScript, React, Tailwind CSS, React Icons, `next/image`, and `next/link`. Content is separated from presentation so the site can grow without changing its component structure. The SB favicon and monogram remain part of the visual identity.

**Live website:** [sb-shaon-portfolio.vercel.app](https://sb-shaon-portfolio.vercel.app/)

The professional story distinguishes 7+ years of WordPress and web experience from current development in the modern JavaScript stack. No employers, clients, dates, outcomes, or contact details have been invented.

## Run locally

Use a Node.js version supported by the installed Next.js release and npm. From the repository root:

```bash
npm ci
npm run dev
```

Open the local address printed by Next.js, normally [localhost:3000](http://localhost:3000).

```bash
npm run lint    # ESLint checks
npm run build   # Production build and route generation
npm run start   # Serve the completed production build
```

Run `npm run build` before `npm run start`. Use `npm ci` with the committed `package-lock.json` for a clean, reproducible installation. Use `npm install` when intentionally changing dependencies and commit the resulting lockfile update.

## Edit the content

| File | Content |
| --- | --- |
| `src/data/site.js` | Brand, hero copy, biography, navigation, statistics, contact details, portrait, résumé, education, production domain |
| `src/data/skills.js` | Core expertise and categorized technical skills |
| `src/data/experience.js` | Agency and freelance work; current professional development is separate from employment |
| `src/data/projects.js` | Project previews and complete case-study content |
| `src/data/services.js` | Services and the development journey |
| `src/lib/site-origin.js` | Shared origin resolution for canonical URLs and social metadata |

Homepage sections are in `src/components/home/`, shared navigation and footer in `src/components/shared/`, and project components in `src/components/projects/`. Global visual styles are in `src/app/globals.css`.

Project detail pages are generated from the project data at `/projects/[slug]`:

- [Cuba Tobacco Cigar Co.](https://sb-shaon-portfolio.vercel.app/projects/cuba-tobacco-cigar-co)
- [FitLog](https://sb-shaon-portfolio.vercel.app/projects/fitlog)
- [Book Vibe](https://sb-shaon-portfolio.vercel.app/projects/book-vibe)

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

The supplied résumé PDF is **`public/shirsendu-biswas-resume.pdf`**, served at `/shirsendu-biswas-resume.pdf`. The hero has one **Download Resume** control, enabled through `site.resume.available` in `src/data/site.js`, which opens the PDF in a new browser tab without forcing a file download. To publish a new version, replace this PDF while keeping its filename, or update `site.resume.path` if the filename changes. Redeploy after replacing the file and verify that the control opens the current PDF.

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

These private content TODOs do not block the production build. Keep unverified fields empty and unavailable links hidden until the information is supplied.

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

Each deployment requires the two server environment variables below. The form reports errors when delivery is unavailable. Its success response confirms that Resend accepted a message with an email ID; inbox receipt must be checked separately.

1. Create a Resend API key and verify a sending domain you own. See the official [Next.js sending guide](https://resend.com/docs/send-with-nextjs) and [verified domain guide](https://resend.com/docs/dashboard/domains/introduction).
2. Copy `.env.example` to `.env.local` in the repository root.
3. Set `RESEND_API_KEY` to your private API key and `CONTACT_FROM_EMAIL` to an address at your verified sending domain. The sender must not be the visitor's address or your Gmail inbox. Your Gmail address remains the recipient.
4. Restart the local Next.js server after saving the environment variables. For Vercel, add both variables to every environment where the form must work, such as Production and Preview, then redeploy.
5. Send a real test message from the form, check Resend's delivery status, and confirm that it arrives in your inbox. The website's success response means Resend accepted the message with an email ID; it does not prove inbox delivery.

Keep `.env.local` and API keys out of Git and chat. Only the blank `.env.example` is tracked. Do not prefix these variables with `NEXT_PUBLIC_`, which would expose them to the browser.

For development before a sending domain is verified, Resend permits `CONTACT_FROM_EMAIL="Shirsendu Biswas Shaon <onboarding@resend.dev>"`. This test sender can only send to the exact email registered on the Resend account that issued the API key. To test delivery to `shirsendu.js.dev@gmail.com`, use a key from a Resend account registered to that address. A Gmail inbox is a valid recipient, but cannot be used as the Resend sender. Use a verified domain sender for production delivery. See [Resend's testing restriction](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

The server checks the request origin, validates all fields, rejects a filled honeypot, and caps request bodies at 40,000 bytes. Names allow 2–100 characters, subjects 3–150, and messages 20–5,000. The recipient and sender are controlled by the server, and identical retries use an idempotency key to avoid duplicate emails.

There is a best-effort limit of five delivery attempts per IP address per ten minutes on each server instance. This memory-based limit is not shared across Vercel instances and resets when an instance restarts. Use hosting-level rate controls for broader production protection.

Run the contact validation and provider-response tests without sending real email:

```bash
node --experimental-default-type=module --test tests/contact.test.mjs
```

The tests mock the provider at the test boundary. They do not verify live credentials, domain configuration, or actual inbox delivery.

## Vercel deployment

The portfolio is deployed on Vercel at [https://sb-shaon-portfolio.vercel.app/](https://sb-shaon-portfolio.vercel.app/). The steps below document the project setup and future deployments; contact delivery and environment settings still need to be verified in the Vercel project.

1. Review the release checklist below, then commit the project and `package-lock.json` to a Git repository available to your Vercel account.
2. In Vercel, import that repository as a new project.
3. Use the **Next.js** framework preset and the repository root as the root directory. Keep the default build command, **`npm run build`**, and the framework's default output settings. If overriding the install command, use **`npm ci`** with the committed lockfile. Do not use a static export: `POST /api/contact` requires the Next.js server runtime.
4. Add the required `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` values to the relevant Vercel environments. The contact recipient remains `site.contact.EMAIL`; no separate recipient variable is needed.
5. Enable Vercel's system environment variables as described below, or set the optional `SITE_URL` override to the real public origin. Configure a custom domain if desired.
6. Deploy and inspect the resulting URL. After any environment-variable or domain change, redeploy so the generated canonical URLs and social-image URLs use the current origin. Verify contact delivery on the deployed site as well as locally.

The implementation does not require an external database or authentication provider. Contact form delivery requires the server-only Resend variables described above; configure them through the hosting platform rather than committing them.

Deployment guidance follows the documentation bundled with this installed Next.js version, including `node_modules/next/dist/docs/01-app/01-getting-started/17-deploying.md`.

### Canonical URLs and social metadata

`src/lib/site-origin.js` resolves the public origin in this order:

1. The optional `SITE_URL` environment variable.
2. `site.url` in `src/data/site.js`.
3. `https://` plus Vercel's `VERCEL_PROJECT_PRODUCTION_URL`.
4. `https://` plus Vercel's `VERCEL_URL`.

Set `SITE_URL` or `site.url` to an absolute origin, including `https://`, only when an explicit override is needed. Otherwise, Vercel supplies the hostname; the resolver adds the protocol. The production URL takes precedence even for preview deployments. When no origin is available, local development uses the localhost fallback; a public deployment must have a real origin from one of the sources above.

To use Vercel's automatic URL values, open the project's **Environment Variables** settings and enable **Enable access to System Environment Variables**. See the official [Vercel system environment variables reference](https://vercel.com/docs/environment-variables/system-environment-variables). Redeploy after changing that setting, `SITE_URL`, `site.url`, or the production domain, and check the rendered canonical and Open Graph image URLs.

## Release checklist

- Review the supplied portrait and nine project images, including captions and alt text. Verify that **Download Resume** opens the current `/shirsendu-biswas-resume.pdf` in a new tab.
- Review private project TODOs for Cuba Tobacco Cigar Co.'s role, year, responsibilities, and tools; the application repository URLs; and actual future plans. These gaps do not block a build and must not be filled with invented claims.
- Configure both Resend variables in the deployment environment, test the form, and confirm inbox receipt. Check the email, LinkedIn, and GitHub links.
- Ensure origin resolution supplies the real public URL, then inspect canonical and social-image metadata after deployment or domain changes.
- Run `npm ci`, `npm run lint`, `npm test`, and `npm run build`; inspect `npm run start`.
- Check responsive layouts, keyboard focus, navigation, project routes, an unknown route, and form validation and feedback. Repeat the key checks on the hosted URL.

## Fonts and rendering

Geist and Space Grotesk are self-hosted with `next/font/local`. Their Latin font files and open-source licenses are in `src/fonts/`, so builds do not need to contact Google Fonts. The footer is a cached Server Component; its current-year value refreshes daily to support this project's enabled Cache Components configuration.
