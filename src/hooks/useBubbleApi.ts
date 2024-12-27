import { useState } from 'react';
import { apiClient } from '../services/api-client';
import { formatBubbleUrl } from '../utils/url';
import { validateBubbleCredentials } from '../utils/validation/bubbleValidation';

export function useBubbleApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateUrl = async (url: string, apiKey: string) => {
    const validation = validateBubbleCredentials(url, apiKey);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Invalid credentials');
    }

    setLoading(true);
    setError(null);
    
    try {
      const normalizedUrl = formatBubbleUrl(url);
      const response = await apiClient.validateBubbleUrl(normalizedUrl, apiKey);
      return { baseUrl: normalizedUrl, ...response.data };
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to validate URL';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetadata = async (baseUrl: string, apiKey: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.fetchMetadata(baseUrl, apiKey);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to fetch metadata';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    validateUrl,
    fetchMetadata
  };
}