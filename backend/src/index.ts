import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import spinRouter from './routes/spin';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173'
  ]
}));

const PORT = process.env.PORT || 3000;

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/spin', spinRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});