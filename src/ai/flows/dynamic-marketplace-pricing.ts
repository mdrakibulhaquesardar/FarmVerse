'use server';

/**
 * @fileOverview This file implements the dynamic marketplace pricing flow.
 *
 * It uses AI to adjust prices of crops and goods based on supply and demand.
 *  - getDynamicPrice - A function that handles the dynamic pricing process.
 *  - DynamicPriceInput - The input type for the getDynamicPrice function.
 *  - DynamicPriceOutput - The return type for the getDynamicPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicPriceInputSchema = z.object({
  item: z.string().describe('The name of the item to price.'),
  supply: z.number().describe('The current supply of the item in the marketplace.'),
  demand: z.number().describe('The current demand for the item in the marketplace.'),
  basePrice: z.number().describe('The base price of the item.'),
});
export type DynamicPriceInput = z.infer<typeof DynamicPriceInputSchema>;

const DynamicPriceOutputSchema = z.object({
  suggestedPrice: z.number().describe('The AI-suggested price for the item, adjusted for supply and demand.'),
  reasoning: z.string().describe('The AI reasoning behind the suggested price.'),
});
export type DynamicPriceOutput = z.infer<typeof DynamicPriceOutputSchema>;

export async function getDynamicPrice(input: DynamicPriceInput): Promise<DynamicPriceOutput> {
  return dynamicMarketplacePricingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dynamicMarketplacePricingPrompt',
  input: {schema: DynamicPriceInputSchema},
  output: {schema: DynamicPriceOutputSchema},
  prompt: `You are an expert economist in a farming simulation game.

You are responsible for setting the price of items in the marketplace based on supply and demand.

Given the following information, determine a suitable price for the item and explain your reasoning.

Item: {{{item}}}
Supply: {{{supply}}}
Demand: {{{demand}}}
Base Price: {{{basePrice}}}

Consider the relationship between supply and demand to adjust the price accordingly.
If supply is high and demand is low, lower the price.
If supply is low and demand is high, raise the price.
If supply and demand are balanced, keep the price close to the base price.

Return the suggested price and a brief explanation of your reasoning. Be sure to return the suggested price as a number.
`,
});

const dynamicMarketplacePricingFlow = ai.defineFlow(
  {
    name: 'dynamicMarketplacePricingFlow',
    inputSchema: DynamicPriceInputSchema,
    outputSchema: DynamicPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
