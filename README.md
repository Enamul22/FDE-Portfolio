# Enamul Haque — FDE Portfolio

[Visit the portfolio](https://fde-portfolio-eta.vercel.app)

A portfolio of enterprise data integration, Palantir Foundry applications, workflow automation and independent software projects. It connects Enamul’s professional experience as a Data Scientist with four practical case studies: FleetPulse, FleetCare, ServicePlan and Fatal Figures.

Built with Next.js App Router, TypeScript and React. The homepage and case studies are statically rendered; a small client component handles section navigation and the mobile menu.

## Run locally

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
```

Open http://localhost:3100. For a production build:

```sh
npm run lint
npm run build
npm run typecheck
npx playwright install chromium
npm test
npm start
```

Browser checks cover desktop, medium and phone layouts, section/project order, navigation, case-study refreshes, images and CV visibility. `node scripts/check-assets.mjs` checks the public asset set. Review screenshots are written outside the checkout by default; use `REVIEW_DIR` to change their destination.

## Update content

| File                     | Content                                                        |
| ------------------------ | -------------------------------------------------------------- |
| `content/profile.ts`     | Introduction, About me, contact links and CV settings          |
| `content/skills.ts`      | Six capability cards and evidence links                        |
| `content/experience.ts`  | Roles, responsibilities and impact                             |
| `content/projects.ts`    | Project cards, case studies, screenshots and demo/source links |
| `content/education.ts`   | Degrees and scholarship                                        |
| `content/credentials.ts` | Completed training and verification links                      |
| `content/site.ts`        | Production origin and site description                         |

Add optimized project images to `public/images` and update the corresponding entries. Application evidence and analytical scope are linked within the case studies. Fleet demonstrations use synthetic data; professional experience and independent projects are presented separately.

### Enable a future CV download

When your chosen public CV is ready, add it to `public/cv/enamul-haque.pdf`. In `content/profile.ts`, set:

```ts
showCvDownload: true,
cvUrl: '/cv/enamul-haque.pdf',
```

The button renders only when the flag is true and the URL is valid. Update the asset check to include that chosen public file when enabling the feature, and verify the download before publishing.

## Deployment

The project uses Vercel’s Next.js build support. Set the production origin in `content/site.ts` to the assigned public HTTPS hostname before the final production build. Canonicals, sitemap and social metadata use that origin. GitHub Actions runs lint, build, typecheck, asset checks and browser tests.

## Assets

Portrait and application screenshots: Enamul Haque. Screenshots are optimized copies from the four linked application repositories. Typography uses the system sans-serif stack. The favicon and social preview are original portfolio artwork.
