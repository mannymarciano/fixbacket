import { Request, Response } from 'express';
import { bubbleService } from '../services/bubble.service';

export const bubbleController = {
  async validateUrl(req: Request, res: Response) {
    try {
      const { url, apiKey } = req.body;
      const result = await bubbleService.validateUrl(url, apiKey);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async fetchMetadata(req: Request, res: Response) {
    try {
      const { baseUrl, apiKey } = req.body;
      const metadata = await bubbleService.fetchMetadata(baseUrl, apiKey);
      res.json(metadata);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
};