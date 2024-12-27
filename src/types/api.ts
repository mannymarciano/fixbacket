export interface BubbleApiConfig {
  baseUrl: string;
  apiKey: string;
  dataType?: string;
}

export interface BubbleApiResponse {
  response: {
    results: any[];
    count: number;
    remaining: number;
  };
}

export interface BubbleMetaResponse {
  get: string[];
}