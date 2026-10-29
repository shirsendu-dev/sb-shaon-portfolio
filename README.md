# SB Shaon — Professional Portfolio

A Next.js App Router portfolio for **SB Shaon, Full Stack Developer & WordPress Expert**. Built with JavaScript, React, Tailwind CSS, React Icons, `next/image`, and `next/link`. Content is separated from presentation so the site can grow without changing its component structure.

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

- `/projects/fitlog`
- `/projects/bazardor`
- `/projects/wordpress-business-website`

Add another project by copying a data entry and giving it a unique slug. Rebuild after adding or changing project routes.

## Supply the missing assets

### Portrait

Place the real professional portrait at **`public/images/profile.jpg`**. Then set `site.portrait.available` to `true` in `src/data/site.js`. The public URL is `/images/profile.jpg`; keep `site.portrait.src` in sync if the filename changes, and write appropriate alt text.

The initial design uses a visibly labeled portrait placeholder. It does not depict an invented person.

### Résumé

Place the actual résumé PDF at **`public/SB-Shaon-Resume.pdf`**. Then set `site.resume.available` to `true`. The public URL is `/SB-Shaon-Resume.pdf`. Until then, the résumé control remains clearly marked as pending rather than linking to a missing file.

### Project screenshots

The supplied preview artwork is **illustrative, not a screenshot or evidence of a completed interface**. For each real project:

1. Add an optimized screenshot to `public/projects/`.
2. Update `screenshot` in its project entry to the public path, such as `/projects/your-project.webp`.
3. Replace `screenshotAlt` with an accurate description.
4. Set `screenshotIsPlaceholder` to `false` only after the image is replaced.

Replace the WordPress project placeholder with a verified professional project, and set its `isPlaceholder` to `false` when its content is ready. Supply client/company information only if it may be shared publicly.

For every case study, verify the description, technologies, features, role, responsibilities, objective, solution, challenges and resolutions, lessons, future improvements, and outcome. Missing details deliberately remain empty or visibly marked as pending. BazarDor's supplied concepts need checking against the completed application. Use actual outcomes rather than invented metrics.

Add real URLs in `liveUrl` and `githubUrl`; the latter supports the client repository required by the assignment. Empty URL fields do not create live links.

## Contact and education

Fill in the named fields under `site.contact`:

```js
EMAIL
PHONE
WHATSAPP
LINKEDIN_URL
GITHUB_URL
FACEBOOK_URL
X_URL
```

Use full `https://` URLs for social profiles and an international phone number for WhatsApp. The contact component builds email, telephone, and WhatsApp links from these values. Empty values stay inactive and visibly pending.

The site uses direct contact links. There is no contact form backend and no simulated message submission. If a form is added later, connect it to a real delivery service or server handler, validate input, and show success only after delivery is accepted.

Education stays hidden until verified entries are added to `site.education` using `{ degree, field, institution, year }`. `site.about.hobbies` is also left empty for real personal interests to be supplied later.

## Deploy to Vercel

Deployment has not been performed by this implementation. No hosting account access or production URL is assumed.

1. Complete the content and asset checklist below, then commit the project to a Git repository available to your Vercel account.
2. In Vercel, import that repository as a new project.
3. Use the **Next.js** framework preset and the repository root as the root directory. Keep the default build command, **`npm run build`**, and the framework's default output settings. No custom static export is required.
4. Deploy and inspect the resulting preview. Check the homepage, each case study, mobile navigation, images, résumé, and contact links.
5. Configure the final domain if desired. Once its real URL is known, set `site.url` to the full production origin, including `https://`, and redeploy. Canonical URLs should only be published after that value is configured; do not use an invented domain.

The implementation does not require an external database, authentication provider, or contact delivery credentials. If those capabilities are added later, configure their secrets through the hosting platform rather than committing them.

Deployment guidance follows the documentation bundled with this installed Next.js version, including `node_modules/next/dist/docs/01-app/01-getting-started/17-deploying.md`.

## Before public launch

- Supply the real portrait and résumé, then enable their availability flags.
- Fill in contact and social details and test each configured link.
- Replace illustrative previews with real screenshots and update their placeholder flags.
- Finish all three case studies, including verified challenges, future plans, live URLs, and repository URLs where appropriate.
- Replace the professional WordPress project placeholder with a real, shareable project.
- Confirm that all claims and listed features match the actual work; add education only when verified.
- Review homepage and project metadata, favicon, and social share artwork; set the real `site.url` after the domain is known.
- Run `npm run lint` and `npm run build`, then inspect `npm run start`.
- Check mobile, tablet, and desktop layouts for horizontal overflow; test the mobile menu and keyboard focus, and inspect the browser console.
- Verify every project route and an unknown route, all navigation anchors, images, résumé viewing/download, and direct contact actions.
- Deploy, then repeat the key checks on the real hosted URL.

## Fonts and rendering

Geist and Space Grotesk are self-hosted with `next/font/local`. Their Latin font files and open-source licenses are in `src/fonts/`, so builds do not need to contact Google Fonts. The footer is a cached Server Component; its current-year value refreshes daily to support this project's enabled Cache Components configuration.
