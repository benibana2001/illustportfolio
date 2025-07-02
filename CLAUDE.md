# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
zsh:1: command not found: s

## Development Commands
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4.x with custom configurations
- **TypeScript**: Strict mode enabled with path aliases (`@/*` → `./src/*`)
- **Font**: Inter font loaded via next/font/google

## Key Directories
- `src/app/`: Next.js App Router pages and layouts
  - Root layout includes Navigation component and Japanese language settings
  - Routes: `/`, `/about`, `/gallery`, `/gallery/[id]`, `/gallery/video/[id]`
- `src/components/`: Reusable React components (Navigation, Slideshow, VideoThumbnail)
- `src/data/`: Data management and JSON imports
- `src/types/`: TypeScript type definitions for gallery items
- `public/images/`: Static image assets (avatar.png, dummy-*.jpg files)
- `scripts/`: Utility scripts for generating images and avatars

## Data Structure
Gallery content uses a unified type system supporting both images and videos:
- `GalleryImage`: Static images with dimensions
- `GalleryVideo`: Videos with thumbnails and duration
- Data loaded from JSON files and enhanced with TypeScript types

## Canvas Integration
Project includes canvas library for image processing and generation tasks.

## Type System
Strict TypeScript configuration with comprehensive type definitions for gallery items. Uses discriminated unions for different content types (image vs. video).
