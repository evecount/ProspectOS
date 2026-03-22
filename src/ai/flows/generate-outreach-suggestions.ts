'use server';
/**
 * @fileOverview A Genkit flow for generating personalized outreach suggestions and key talking points for an unlocked lead.
 *
 * - generateOutreachSuggestions - A function that handles the generation of outreach suggestions.
 * - GenerateOutreachSuggestionsInput - The input type for the generateOutreachSuggestions function.
 * - GenerateOutreachSuggestionsOutput - The return type for the generateOutreachSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateOutreachSuggestionsInputSchema = z.object({
  firstName: z.string().describe("The first name of the lead."),
  lastName: z.string().describe("The last name of the lead."),
  jobTitle: z.string().describe("The job title of the lead."),
  companyName: z.string().describe("The name of the company the lead works for."),
  industry: z.string().describe("The industry of the company."),
  companySize: z.string().describe("The size of the company (e.g., '1-10 employees', '100-500 employees')."),
  location: z.string().describe("The geographical location of the company."),
  companyDescription: z.string().optional().describe("A brief description of the company."),
  jobDescription: z.string().optional().describe("A brief description of the lead's job responsibilities."),
});
export type GenerateOutreachSuggestionsInput = z.infer<typeof GenerateOutreachSuggestionsInputSchema>;

// Output Schema
const GenerateOutreachSuggestionsOutputSchema = z.object({
  outreachSuggestions: z.array(z.string()).describe("A list of personalized outreach suggestions."),
  keyTalkingPoints: z.array(z.string()).describe("A list of key talking points for the outreach."),
});
export type GenerateOutreachSuggestionsOutput = z.infer<typeof GenerateOutreachSuggestionsOutputSchema>;

// Wrapper function
export async function generateOutreachSuggestions(input: GenerateOutreachSuggestionsInput): Promise<GenerateOutreachSuggestionsOutput> {
  return generateOutreachSuggestionsFlow(input);
}

// Prompt definition
const prompt = ai.definePrompt({
  name: 'generateOutreachSuggestionsPrompt',
  input: {schema: GenerateOutreachSuggestionsInputSchema},
  output: {schema: GenerateOutreachSuggestionsOutputSchema},
  prompt: `You are an AI sales assistant specializing in crafting personalized outreach strategies.
Your goal is to generate highly effective outreach suggestions and key talking points for sales professionals.
Focus on personalization based on the provided lead and company information.

Here is the lead and company information:
Lead Name: {{{firstName}}} {{{lastName}}}
Job Title: {{{jobTitle}}}
Company Name: {{{companyName}}}
Industry: {{{industry}}}
Company Size: {{{companySize}}}
Location: {{{location}}}
{{#if companyDescription}}Company Description: {{{companyDescription}}}{{/if}}
{{#if jobDescription}}Job Description: {{{jobDescription}}}{{/if}}

Based on this information, generate:
1.  **Outreach Suggestions**: Provide 2-3 actionable and personalized suggestions for how a sales professional could initiate contact. Consider different channels (e.g., email, LinkedIn, cold call) and angles.
2.  **Key Talking Points**: Provide 3-5 specific talking points that highlight how our product/service (assume it's a B2B sales intelligence and lead enrichment platform) can benefit this specific lead and their company, aligning with their role, industry, and company size.

Ensure the suggestions and talking points are concise, relevant, and designed to grab attention and demonstrate value.
`,
});

// Flow definition
const generateOutreachSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateOutreachSuggestionsFlow',
    inputSchema: GenerateOutreachSuggestionsInputSchema,
    outputSchema: GenerateOutreachSuggestionsOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
