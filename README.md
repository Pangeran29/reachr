# Reachr Landing Page

A modern landing page for Reachr, an AI-powered client acquisition platform.

## Prerequisites

- Node.js 18.x or later
- npm or yarn

## Getting Started

### 1. Clone the repository

\`\`\`bash
git clone <repository-url>
cd reachr-landing
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 3. Set up environment variables

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# Add any other required environment variables
\`\`\`

### 4. Run the development server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `public/` - Static assets like images
- `lib/` - Utility functions and helpers

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Customization

### Styling

This project uses Tailwind CSS for styling. You can customize the theme in `tailwind.config.ts`.

### Content

Update the content in the component files to match your requirements:

- Hero section: `components/sections/hero-section.tsx`
- Features: `components/sections/features-section.tsx`
- How it works: `components/sections/how-it-works-section.tsx`
- FAQ: `components/sections/faq-section.tsx`

## Deployment

This project can be easily deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Freachr-landing)

## License

[MIT](LICENSE)
\`\`\`

Let's also create a basic `package.json` file to ensure all dependencies are properly defined:
