# Little Man Comic

A blockchain-based comic viewer that unlocks content based on $MNM token holdings on the Sui network.

## Features

- Interactive comic book with page-flipping animation
- Token-gated content using $MNM tokens
- Responsive design with Tailwind CSS
- Sui wallet integration

## Deployment on Vercel

### Prerequisites

1. A Vercel account
2. Environment variables configured in Vercel dashboard

### Environment Variables

Set these environment variables in your Vercel project settings:

```
VITE_MNM_COIN_TYPE=0xefde5ddb743bd93e68a75e410e985980457b5e8837c7f4afa36ecc12bb91022b::mnm::MNM
VITE_MNM_MIN=100000000
NODE_ENV=production
```

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your project in Vercel
3. Vercel will automatically detect the configuration from `vercel.json`
4. Set the environment variables in the Vercel dashboard
5. Deploy!

### Build Configuration

The project includes a `vercel.json` configuration file that:
- Sets the framework to Vite
- Configures proper routing for the SPA
- Sets up serverless functions for the API

### Local Development

```bash
npm install
npm run dev
```

### Tech Stack

- React + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Sui blockchain integration
- react-pageflip for comic animation