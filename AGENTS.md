# Repository Guidelines

This guide keeps contributions to the Inovatek web app consistent, fast to review, and ready for release.

## Project Structure & Module Organization
- `src/pages/`: Next.js routes and API handlers; keep `pages` components light and delegate UI to feature folders.
- `src/components/`: Reusable UI broken down by feature (`Homepage/`, `reusable/`); colocate component-specific assets here.
- `src/lib/`: Shared services (Apollo client, REST helpers); expose typed functions and reuse them across pages.
- `src/constants/` & `src/utils/`: App-wide configuration and pure helpers. Avoid side effects in utilities.
- `public/`: Static assets and sitemap output. Reference files with `/asset-name.ext` paths in components.

## Build, Test, and Development Commands
- `npm run dev` — Start the dev server on http://localhost:3000 with hot reload.
- `npm run lint` — Run ESLint (`next lint`); fix reported issues before committing.
- `npm run build` — Create the production bundle and run TypeScript checks.
- `npm run start` — Serve the production build locally for smoke testing.
- `npm run postbuild` — Generate updated sitemap files via `next-sitemap`.

## Coding Style & Naming Conventions
Follow Next.js ESLint defaults: 2-space indentation, semicolons, and double quotes. Use TypeScript for new modules and respect the `@/*` path alias defined in `tsconfig.json`. Name React components with PascalCase (`HomeIntroBox.tsx`), utilities with camelCase (`consentCookie.ts`), and exported constants in SCREAMING_SNAKE_CASE. Prefer MUI components and Emotion styling for layout and theme consistency. Keep data fetching inside `src/lib` and pass typed props into UI layers.

## Environment & Configuration Tips
Create a `.env.local` for local secrets. Set `SITE_URL` when you need accurate sitemap output. Restart the dev server after changing env values. Avoid committing `.env*` files; document required keys in your PR description.

## Testing Guidelines
Formal automated tests are not yet configured. When you add them, colocate Jest + Testing Library files as `ComponentName.test.tsx` next to the source or under `src/__tests__/`. Until then, gate every change with `npm run lint`, verify Apollo-driven lists and forms in the browser, and outline manual checks in the PR.

## Commit & Pull Request Guidelines
Keep commit summaries short, present-tense, and focused on intent (`added carousel and distributor text`). Use additional lines for context and include references like `Refs #123`. Before opening a PR, ensure `npm run lint` and `npm run build` succeed, link the related issue, attach UI screenshots for visible changes, and highlight configuration updates or follow-up work.
