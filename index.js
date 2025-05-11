dotenv.config();
import express from 'express';
import dotenv from 'dotenv';
import  {connectDB} from './config/database.js';
import authRoutes from './src/routes/auth.route.js';
import seedDatabase from './src/seed/seed.js';
import router from './src/routes/index.js'; 
import cors from 'cors';


const app= express();

const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());
app.post('/api/seed', async (req, res) => {
  try {
    await seedDatabase(); 
    res.status(200).send('Base de données peuplée avec succès !');
  } catch (error) {
    console.error('Erreur lors du peuplement de la base de données :', error);
    res.status(500).send('Erreur lors du peuplement de la base de données.');
  }
});

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api', router);

//app.use('/api/auth', authRoutes);

// app.listen(PORT, () => {
//   console.log(`Le serveur écoute sur le port ${PORT}`);
// });

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:4000');
});


