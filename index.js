dotenv.config();
import express from 'express';
import dotenv from 'dotenv';
import  {connectDB} from './config/database.js';
import authRoutes from './src/routes/authRoutes.js';

const app= express();
const PORT = process.env.PORT || 4000;


app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});


