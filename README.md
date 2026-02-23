# xexr.com

Personal site and blog by Dane Poyzer. Built with Next.js, MDX, and Tailwind CSS.

## Architecture

- **Framework:** Next.js 16 with Turbopack
- **Content:** MDX files processed by Velite at build time
- **Styling:** Tailwind CSS 4 + shadcn/ui (Base UI React)
- **Hosting:** Vercel

All content is file-based — no database required.

## Content Structure

```
content/
  posts/
    hello-world/
      index.mdx         # Post with frontmatter
  projects/
    gas-town.yaml        # Project data
  bookshelf/
    .gitkeep
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3005](http://localhost:3005)

## Scripts

| Script           | Description              |
| ---------------- | ------------------------ |
| `pnpm dev`       | Start development server |
| `pnpm build`     | Build for production     |
| `pnpm typecheck` | Run TypeScript checks    |
| `pnpm lint`      | Run ESLint               |
| `pnpm test`      | Run all tests            |
