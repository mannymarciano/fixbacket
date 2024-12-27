import { z } from 'zod';

// Schema for Bubble.io URL validation
const bubbleUrlSchema = z.string()
  .min(1, 'Bubble.io URL is required')
  .url('Please enter a valid URL')
  .refine(
    (url) => url.includes('bubble.io') || url.includes('bubbleapps.io'),
    'URL must be a valid Bubble.io application URL'
  );

// Schema for API key validation
const bubbleApiKeySchema = z.string()
  .min(1, 'API key is required')
  .min(32, 'API key must be at least 32 characters long')
  .regex(/^[a-zA-Z0-9_-]+$/, 'API key contains invalid characters');

export function validateBubbleCredentials(url: string | null | undefined, apiKey: string | null | undefined) {
  if (!url || !apiKey) {
    return { 
      isValid: false, 
      error: 'Both Bubble.io URL and API key are required' 
    };
  }

  try {
    bubbleUrlSchema.parse(url);
    bubbleApiKeySchema.parse(apiKey);
    return { isValid: true, error: null };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { 
        isValid: false, 
        error: err.errors[0].message 
      };
    }
    return {
      isValid: false,
      error: 'Invalid credentials'
    };
  }
}