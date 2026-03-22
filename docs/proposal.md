# Project Proposal: ProspectOS

## Overview
ProspectOS is an advanced B2B lead enrichment platform designed to bridge the gap between cold data and warm outreach. It provides sales professionals with a "Command Center" for discovering and engaging with potential clients.

## Original Prompt & Goals
"Create a sales intelligence platform called ProspectOS. It should feature a sleek, dark-themed 'Terminal' aesthetic. Users should be able to search for leads from a mock database, use a credit system to 'unlock' verified emails and phone numbers, and save leads to custom lists. Integrate an AI assistant that can look at a lead's company description and role to generate a personalized cold email script or talking points."

## Key Functional Requirements

### 1. Lead Search Engine
- Search by keyword, industry, and location.
- Obfuscated contact data for locked leads.
- Real-time filtering of results.

### 2. Credit Economy
- Start users with 50 credits.
- Deduct 1 credit for every lead unlocked.
- Provide a toast notification for successes and failures.

### 3. AI Outreach (Genkit Integration)
- Utilize Gemini 2.5 Flash.
- Input: Lead name, role, company description.
- Output: 2-3 outreach angles and 3-5 talking points.

### 4. Admin Portal
- Simulate bulk data uploads.
- Ability to grant credits to the current session.
- System status audit logs.

## Design Aesthetic
- **Colors**: Deep dark backgrounds (`#1a1a1a`), vibrant primary accents (`#c261e0`), and secondary highlights (`#89d3f1`).
- **Feel**: Professional, high-tech, precise, and fast.
- **Components**: Heavy use of glassmorphism, subtle glows, and monospace fonts for status readouts.
