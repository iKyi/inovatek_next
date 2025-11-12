# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 13 corporate website for Inovatek, a Romanian company. The site features product catalog, services, blog, portfolio, and calculator functionality. Data is managed through a Strapi CMS backend at https://cms.inovatek.ro.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# The sitemap is automatically generated after build via postbuild script
```

## Architecture

### Tech Stack
- **Next.js 13.2.4** with TypeScript 5.0.3
- **Material-UI (MUI) 5.12.0** for UI components
- **Apollo Client 3.7.1** for GraphQL data fetching
- **Emotion** for CSS-in-JS styling
- **React Hook Form** with Yup for form handling

### Data Flow
- All content is fetched from Strapi CMS via GraphQL
- Server-side data fetching in pages using `getServerSideProps` or `getStaticProps`
- Apollo Client configured with network-only fetch policy
- API endpoint: `https://cms.inovatek.ro/graphql/`

### Key Directories
- `src/pages/` - Next.js pages with routing
- `src/components/` - React components organized by feature (Blog, Products, Services, etc.)
- `src/components/reusable/` - Shared components (Layout, SEO, navigation)
- `src/lib/` - Core utilities including Apollo Client setup and API helpers
- `src/lib/theme/` - MUI theme configuration with brand colors

### TypeScript Configuration
- Strict mode enabled
- Path alias: `@/*` maps to `./src/*`
- Use absolute imports: `import { Component } from '@/components/reusable/Component'`

### Styling Approach
- Use MUI components and theme wherever possible
- Custom styles via Emotion's `styled` API
- Theme breakpoints: `xs`, `sm`, `md`, `lg`, `xl`
- Brand colors available in theme

### Form Handling
Forms use `react-hook-form` with `yup` validation. Example pattern:
```typescript
const schema = yup.object().shape({
  fieldName: yup.string().required()
});
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: yupResolver(schema)
});
```

### SEO & Analytics
- Sitemap automatically generated on build
- Google Tag Manager and Facebook Pixel integrated
- Use the `Seo` component for page metadata

## Important Notes

- No testing framework is currently configured
- Images must be configured in `next.config.js` for external domains
- The site uses Romanian language throughout
- PDF generation uses `jspdf` and `pdfmake` libraries
- Cookie consent is managed via custom implementation