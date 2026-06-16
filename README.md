# Premium Portfolio

A modern, premium portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Featuring a sleek hero section inspired by leading companies like Linear, Vercel, and Apple.

## Features

- **Premium Design**: Clean, minimal aesthetic with excellent typography and whitespace
- **Dark/Light Mode**: Seamless theme switching with persistent storage
- **Responsive**: Beautiful on all devices from mobile to desktop
- **Fast**: Built with Next.js for optimal performance
- **Tailwind CSS**: Modern utility-first styling
- **TypeScript**: Full type safety across the codebase
- **Subtle Animations**: Smooth, non-intrusive hover effects and transitions
- **Social Integration**: Easy links to GitHub, LinkedIn, and Email

## Project Structure

```
PORTFOLIO/
├── public/                 # Static assets
│   ├── images/            # Project, education, profile images
│   ├── doodle/            # Character animations (future)
│   ├── icons/             # Custom icons
│   └── resume/            # PDF resume
│
├── app/                   # Next.js App Router
│   ├── layout.tsx         # Root layout with navbar
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── favicon.ico
│
├── components/            # Reusable components
│   ├── layout/            # Layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── Contact.tsx
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── SectionHeading.tsx
│   ├── effects/           # Visual effects (future)
│   └── mascot/            # Mascot character (future)
│
├── data/                  # Data files
│   ├── projects.ts
│   ├── skills.ts
│   ├── education.ts
│   ├── achievements.ts
│   └── socials.ts
│
├── hooks/                 # Custom React hooks
│   ├── useTheme.ts
│   ├── useScroll.ts
│   ├── useCursor.ts
│   └── useIntersection.ts
│
├── lib/                   # Utility functions
│   ├── constants.ts
│   ├── animations.ts
│   ├── utils.ts
│   └── config.ts
│
├── types/                 # TypeScript types
│   ├── common.ts
│   ├── project.ts
│   ├── skill.ts
│   └── mascot.ts
│
├── styles/                # CSS animations
│   └── animations.css
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── .eslintrc.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Customization

### Update Personal Information

Edit the following files to customize your portfolio:

- **Hero Section**: `components/sections/Hero.tsx`
- **Navigation**: `components/layout/Navbar.tsx`
- **Data**: Update files in `data/` directory
- **Styling**: Modify `tailwind.config.ts` for theme changes

### Add Your Profile Image

Replace the placeholder profile image:
1. Place your image in `public/images/profile/`
2. Update the hero component to use your image instead of the placeholder

### Theme Customization

Edit `app/globals.css` to modify color scheme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.6%;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: 0 0% 3.6%;
    --foreground: 0 0% 98.2%;
  }
}
```

## Components Overview

### Hero Section
The main hero section includes:
- Large animated heading with your name and title
- Professional description
- Technology stack badges
- Call-to-action buttons (Resume, Get in Touch)
- Social media links
- Large profile image with decorative elements
- Scroll indicator

### Theme Toggle
Seamlessly switch between light and dark modes with localStorage persistence.

### Button Component
Versatile button component with multiple variants and sizes.

### Badge Component
Display technology skills and tags with customizable styling.

## Future Enhancements

- Mascot character animations
- Constellation background effect
- Scroll trail effects
- Cursor glow effect
- Additional sections (About, Projects, Skills, Contact)
- Blog section
- Project filtering

## Design Inspiration

This portfolio draws design inspiration from:
- **Linear**: Minimalist design with excellent typography
- **Vercel**: Clean layouts and smooth animations
- **Apple**: Premium aesthetics and whitespace

## Performance

- **Fast Load Times**: Optimized with Next.js
- **Code Splitting**: Automatic chunking of components
- **Image Optimization**: WebP and AVIF support
- **CSS**: Tailwind purges unused styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This portfolio template is open source and free to use.

## Contributing

Feel free to fork and customize this portfolio for your own use!

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
