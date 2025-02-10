// src/app.ts
import express, { Application, Request, Response } from 'express';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Basic test route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the API!');
});

// Use authentication routes
app.use('/api/auth', authRoutes);

export default app;
