 import mongoose from 'mongoose';
 const librarySchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postal_code: {
        type: String,
        required: true,
      },
      location: {
        type: {
          latitude: {
            type: mongoose.Types.Decimal128,  
            required: true,
          },
          longitude: {
            type: mongoose.Types.Decimal128,  
            required: true,
          },
        },
        required: true,
      },
      website: {
        type: String,
        required: false,
        //match: [/^https?:\/\/[^\s/$.?#].[^\s]*$/, 'Veuillez fournir une URL valide.'],
      },
      opening_hours: [{
        day: {
          type: String,
          required: true,
          enum: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],  
        },
        open_time: {
          type: String,
          required: true,
        },
        close_time: {
          type: String,
          required: true,  
        },
        is_open: {
          type: String,
          required: true,
          enum: ['Ouvert', 'Fermé'],  
        },
      }],
      phone: {
        type: String,
        required: false,
        //match: [/^\+?[1-9]\d{1,14}$/, 'Veuillez fournir un numéro de téléphone valide.'],  
      },
      services: {
        type: String,
        enum: ['Livres', 'E-books', 'Salles d\'étude', 'Événements', 'Impression', 'Wi-Fi gratuit', 'Section pour enfants'],
        required: true,
      },
      accessibility: {
        type: String,
        enum: ['Accessible en fauteuil roulant', 'Pas d\'accès fauteuil roulant', 'Ascenseur disponible', 'Uniquement des escaliers'],
        required: true,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        required: false,
        default: 0, 
      },
    });
    
    const Library = mongoose.model('Library', librarySchema);
    export default Library;
