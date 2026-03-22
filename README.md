# ProspectOS Terminal

ProspectOS is a high-performance B2B sales intelligence and lead enrichment platform built for modern outreach teams. It provides a terminal-like interface for searching, filtering, and unlocking high-quality leads using an integrated credit system.

## 🚀 Core Features

- **Global Lead Index**: Search through millions of verified B2B leads with advanced filtering (Industry, Company Size, Role, Location).
- **Credit-Based Enrichment**: Unlock verified contact details (Email, Phone) using account credits.
- **AI Outreach Assistant**: Leverages Genkit and Google Gemini to generate personalized outreach suggestions and talking points based on company and job data.
- **Lead Management**: Organize unlocked contacts into custom folders and export them as CSV for CRM integration.
- **Admin Portal**: Internal dashboard for bulk data indexing and credit management.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI Engine**: [Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks & Local Storage (Mock Persistence)

## 📁 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components and feature-specific modules.
- `src/ai`: Genkit flows and AI configurations.
- `src/lib`: Mock data, utility functions, and store logic.
- `docs/`: Project documentation and original proposal.

## 🚦 Getting Started

1. **Install dependencies**: `npm install`
2. **Run the development server**: `npm run dev`
3. **Explore the AI features**: Use the "Outreach Assistant" on any unlocked lead profile.

## 📜 Documentation

For more detailed information about the original product vision and technical requirements, see [docs/proposal.md](./docs/proposal.md).
