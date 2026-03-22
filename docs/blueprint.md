# **App Name**: ProspectOS

## Core Features:

- Advanced Lead Search: A user-friendly interface to query the 'global_leads' database with robust filtering capabilities by Industry, Job Title, Company Size, and Location, displaying obfuscated contact details.
- Credit-Based Contact Unlocking: Users can view obfuscated lead contact information and choose to 'Unlock Contact' to reveal full details, consuming credits.
- Secure Transaction Engine: A Python Flask backend function that securely checks a user's credit balance, deducts credits upon unlocking, copies the cleartext lead data into 'unlocked_contacts', and serves it to the frontend.
- AI-Powered Outreach Assistant: A tool that generates personalized outreach suggestions and key talking points for unlocked leads, leveraging their company firmographics and role information.
- Lead List Management & Export: Users can organize their unlocked contacts into custom lists and export selected lists as a CSV file for integration with external CRM systems.
- Admin Dashboard: A portal for platform administrators to bulk-upload new lead data via CSV parsing into the 'global_leads' collection and manage user credit balances.

## Style Guidelines:

- Color scheme: Dark. Emphasizes focus, professionalism, and reduces eye strain for data-intensive work, aligning with the 'terminal' concept. Background color: A very dark, desaturated purplish-grey (#2B2429).
- Primary color: A sophisticated, slightly muted blue-violet (#C261E0). This hue conveys intelligence and strategic insight while providing good contrast against the dark background.
- Accent color: A soft yet clear light blue (#94CCED). This analogous color provides visual differentiation for interactive elements and highlights without overpowering the primary palette, enhancing data readability.
- Body and headline font: 'Inter' (sans-serif) for its modern, neutral, and highly readable qualities, ideal for presenting large amounts of structured data in tables and complex filtering interfaces.
- Use clean, minimalistic line icons that convey functionality without adding visual clutter. Icons should be easily decipherable within the dark theme.
- Implement a clear, multi-panel layout with a persistent filtering sidebar and a main content area optimized for data tables. Prioritize information density and logical grouping for search results and lead details.
- Incorporate subtle, functional animations for feedback during data loading, filtering updates, and credit transaction confirmations, ensuring a responsive user experience without distraction.