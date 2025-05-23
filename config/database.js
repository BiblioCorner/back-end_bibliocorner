import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        const uri = process.env.DB_URI;

        // Connexion à MongoDB
        await mongoose.connect(uri);
        console.log('Connexion réussie à MongoDB Atlas');
      
        // Gestion des événements de connexion
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connecté à la base de données');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Erreur de connexion Mongoose:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Connexion Mongoose interrompue');
        });

    } catch (error) {
        console.error('Erreur de connexion à MongoDB :', error);
        process.exit(1);
    }
};

// Gestion de la déconnexion
export const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('Déconnexion de MongoDB réussie');
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
};
