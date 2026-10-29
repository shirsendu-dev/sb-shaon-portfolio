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

- `/projects/fitlog`
- `/projects/bazardor`
- `/projects/wordpress-business-website`

Add another project by copying a data entry and giving it a unique slug. Rebuild after adding or changing project routes.

## Supply the missing assets

### Portrait

The supplied professional portrait is configured at **`public/images/profile-photo.jpg`** with `site.portrait.available` set to `true` in `src/data/site.js`. To change the photo, replace that file or update `site.portrait.src`, and keep the alt text accurate.

The hero uses `next/image` to optimize the portrait and keeps the top of the photo visible when cropped. A labeled placeholder is available if `site.portrait.available` is set to `false`.

### Résumé

Place the actual résumé PDF at **`public/SB-Shaon-Resume.pdf`**. Then set `site.resume.available` to `true`. The public URL is `/SB-Shaon-Resume.pdf`. Until then, the download control remains inactive and does not link to a missing file.

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
- Replace illustrative previews with real screenshots and update their placeholder flags.
- Finish all three case studies, including verified challenges, future plans, live URLs, and repository URLs where appropriate.
- Replace the professional WordPress project placeholder with a real, shareable project.
- Confirm that all claims and listed features match the actual work; add education only when verified.
- Review homepage and project metadata, favicon, and social share artwork; set the real `site.url` after the domain is known.
- Run `npm run lint` and `npm run build`, then inspect `npm run start`.
- Check mobile, tablet, and desktop layouts for horizontal overflow; test the mobile menu and keyboard focus, and inspect the browser console.
- Verify every project route and an unknown route, all navigation anchors, images, résumé viewing/download, contact form validation and feedback, and direct contact actions.
- Deploy, then repeat the key checks on the real hosted URL.

## Fonts and rendering

Geist and Space Grotesk are self-hosted with `next/font/local`. Their Latin font files and open-source licenses are in `src/fonts/`, so builds do not need to contact Google Fonts. The footer is a cached Server Component; its current-year value refreshes daily to support this project's enabled Cache Components configuration.
