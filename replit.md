# Little Man Comic

## Overview

Little Man Comic is a blockchain-based web application that provides token-gated access to digital comic content. The application integrates with the Sui blockchain to verify user ownership of $MNM tokens before unlocking an interactive comic book experience. Users can connect their Sui wallets, and if they hold sufficient $MNM tokens, they gain access to a flipbook-style comic viewer with page-turning animations. The project combines Web3 functionality with engaging digital storytelling, creating a premium experience for token holders.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom vintage beige/cream color palette matching the Little Man brand
- **State Management**: React Query (@tanstack/react-query) for server state and caching
- **Routing**: Wouter for lightweight client-side routing

### Blockchain Integration
- **Blockchain**: Sui network integration using @mysten/dapp-kit and @mysten/sui.js
- **Wallet Connection**: Built-in Sui wallet provider with auto-connect functionality
- **Token Verification**: Real-time balance checking for $MNM tokens (contract: 0xefde5ddb743bd93e68a75e410e985980457b5e8837c7f4afa36ecc12bb91022b::mnm::MNM)
- **Token Gating**: Configurable minimum token requirement (default: 0.1 MNM with 9 decimal places)

### Comic Viewer System
- **Interactive Reader**: HTMLFlipBook component for realistic page-turning animations
- **Content Management**: Static comic pages stored in public directory for optimal CDN delivery
- **Access Control**: Token balance verification determines content accessibility
- **Responsive Design**: Mobile-first approach with tablet and desktop optimizations

### Backend Architecture
- **Server**: Express.js with TypeScript in ESM format
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL for scalable cloud hosting
- **Session Management**: PostgreSQL-backed session storage using connect-pg-simple
- **Development**: Hot reload and development server integration with Vite

### Deployment Configuration
- **Platform**: Vercel with optimized build configuration
- **Static Assets**: Public directory serving for comic images and assets
- **Environment Variables**: Secure configuration for token contract addresses and thresholds
- **Build Process**: Vite build system with proper routing for single-page application

## External Dependencies

### Blockchain Services
- **Sui Network**: Mainnet and testnet RPC endpoints for blockchain interactions
- **$MNM Token Contract**: Custom token contract on Sui for access verification
- **Blast.fun**: Token trading platform integration for user token acquisition

### Database & Hosting
- **Neon Database**: Serverless PostgreSQL provider for data persistence
- **Vercel**: Deployment platform with CDN for static assets
- **Domain Services**: Custom domain configuration for production deployment

### Development Tools
- **Replit**: Development environment with integrated debugging and deployment
- **TypeScript**: Static typing across the entire application stack
- **ESBuild**: Fast bundling for server-side code compilation
- **PostCSS**: CSS processing with Tailwind CSS integration

### UI & UX Libraries
- **react-pageflip**: HTMLFlipBook component for comic page animations
- **Radix UI**: Headless UI components for accessibility and customization
- **Lucide React**: Icon library for consistent visual elements
- **Class Variance Authority**: Utility for component variant management