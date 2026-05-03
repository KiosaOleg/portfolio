# Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and the GitHub API. Projects are automatically fetched from GitHub and updated hourly.

![Portfolio Preview](https://via.placeholder.com/800x400?text=Portfolio+Preview)

## Features

- **Automatic GitHub Integration** - Fetches your repositories automatically
- **Real-time Updates** - Projects refresh every hour (ISR)
- **Responsive Design** - Looks great on all devices
- **Modern UI** - Built with Tailwind CSS and Framer Motion animations
- **TypeScript** - Type-safe code throughout
- **Fast Performance** - Optimized with Next.js App Router

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons
- [GitHub API](https://docs.github.com/en/rest) - Repository data

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your GitHub credentials:
```
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=your_github_username
```

To get a GitHub token:
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select the `public_repo` scope
4. Copy the token to your `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and create a new project
3. Import your GitHub repository
4. Add the environment variables in Vercel dashboard:
   - `GITHUB_TOKEN`
   - `GITHUB_USERNAME`
5. Click Deploy

Your portfolio will be live at `your-project.vercel.app`!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [AWS Amplify](https://aws.amazon.com/amplify/)

## Customization

### Personal Information

Edit these files to customize your portfolio:

- `src/components/Hero.tsx` - Update your name and description
- `src/components/Navbar.tsx` - Update social links
- `src/app/page.tsx` - Modify About section and skills

### Styling

- `tailwind.config.ts` - Customize colors, fonts, etc.
- `src/app/globals.css` - Global styles

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Hero.tsx        # Hero section
│   │   └── ProjectCard.tsx # Project card component
│   └── lib/
│       └── github.ts       # GitHub API integration
├── public/                 # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## How It Works

1. **GitHub API Integration**: The app fetches your public repositories from GitHub's API
2. **ISR (Incremental Static Regeneration)**: Pages are regenerated every hour to keep data fresh
3. **Server Components**: Uses Next.js App Router for optimal performance
4. **Animations**: Framer Motion provides smooth, performant animations

## License

MIT License - feel free to use this template for your own portfolio!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with love and lots of coffee ☕
