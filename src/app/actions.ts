'use server';

import { getDynamicPrice, type DynamicPriceInput, type DynamicPriceOutput } from '@/ai/flows/dynamic-marketplace-pricing';

export async function getDynamicPriceAction(input: DynamicPriceInput): Promise<DynamicPriceOutput> {
  try {
    const result = await getDynamicPrice(input);
    return result;
  } catch (error) {
    console.error('Error in getDynamicPriceAction:', error);
    throw new Error('Failed to get dynamic price from AI model.');
  }
}
