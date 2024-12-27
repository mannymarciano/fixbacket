import express from 'express';
import cors from 'cors';
import bubbleRoutes from './api/routes/bubble.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Basic CORS setup
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/bubble', bubbleRoutes);

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});