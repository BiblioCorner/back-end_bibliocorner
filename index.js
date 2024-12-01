const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const uri = process.env.DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connecté à MongoDB Atlas"))
  .catch(err => console.error("Erreur de connexion :", err));

async function connectToDB() {
  try {
    // Créez une instance de client MongoDB
    const client = new MongoClient(uri);

    // Connexion au cluster
    await client.connect();
    console.log("Connecté à MongoDB Atlas");
    const db = client.db('Bibliocornerbd');  
    const collection = db.collection('users');  

    // close connexion 
    await client.close();
  } catch (err) {
    console.error("Erreur de connexion : ", err);
  }
}


connectToDB();

app.get('/', (req, res) => {
  res.send('Hello World!' + PORT);
});

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});


