import axios from 'axios';
import { extractBaseUrl } from '../utils/url.utils';

export const bubbleService = {
  async validateUrl(url: string, apiKey: string) {
    if (!url || !apiKey) {
      throw new Error('URL and API key are required');
    }

    const baseUrl = extractBaseUrl(url);
    if (!baseUrl) {
      throw new Error('Invalid URL format');
    }

    const apiEndpoint = `https://${baseUrl}/version-test/api/1.1/obj`;
    
    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        },
        validateStatus: (status) => status < 500 // Accept any status < 500
      });

      if (response.status === 401) {
        throw new Error('Invalid API key');
      }

      return { valid: true, baseUrl };
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      }
      throw new Error('Invalid Bubble.io URL or API key');
    }
  },

  async scanDataTypes(baseUrl: string, apiKey: string) {
    if (!baseUrl || !apiKey) {
      throw new Error('Base URL and API key are required');
    }

    const apiEndpoint = `https://${baseUrl}/version-test/api/1.1/obj`;
    
    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to scan data types');
    }
  },

  async fetchMetadata(baseUrl: string, apiKey: string) {
    if (!baseUrl || !apiKey) {
      throw new Error('Base URL and API key are required');
    }

    const apiEndpoint = `https://${baseUrl}/version-test/api/1.1/meta`;
    
    try {
      const response = await axios.get(apiEndpoint, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (!response.data.get || !Array.isArray(response.data.get)) {
        throw new Error('Invalid metadata format');
      }

      return response.data.get;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      }
      throw new Error('Failed to fetch metadata');
    }
  }
};