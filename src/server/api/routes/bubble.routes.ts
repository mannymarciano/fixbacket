import express from 'express';
import { bubbleController } from '../controllers/bubble.controller';

const router = express.Router();

router.post('/validate', bubbleController.validateUrl);
router.post('/metadata', bubbleController.fetchMetadata);

export default router;