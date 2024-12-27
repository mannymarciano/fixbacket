import axios, { AxiosInstance } from 'axios';
import { API_CONFIG } from '../config/api-config';

class ApiClient {
  private client: AxiosInstance;
  private controller: AbortController;

  constructor() {
    this.controller = new AbortController();
    this.client = axios.create({
      baseURL: API_CONFIG.baseUrl,
      timeout: API_CONFIG.timeout,
      signal: this.controller.signal
    });
  }

  async validateBubbleUrl(url: string, apiKey: string) {
    return this.client.post(API_CONFIG.endpoints.bubble.validate, {
      url,
      apiKey
    });
  }

  async fetchMetadata(baseUrl: string, apiKey: string) {
    return this.client.post(API_CONFIG.endpoints.bubble.metadata, {
      baseUrl,
      apiKey
    });
  }

  cancelRequests() {
    this.controller.abort();
    this.controller = new AbortController();
    this.client.defaults.signal = this.controller.signal;
  }
}

export const apiClient = new ApiClient();