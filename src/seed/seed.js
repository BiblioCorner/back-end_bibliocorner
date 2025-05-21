import { faker } from '@faker-js/faker';
import { connectDB, disconnectDB } from '../../config/database.js';
import Event from '../models/event.js';
import Review from '../models/review.js';
import Library from '../models/library.js';

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Connexion à la base de données réussie. Début du peuplement...');

    await Library.deleteMany();
    await Event.deleteMany();
    await Review.deleteMany();
    console.log('Collections effacées.');

    const libraries = [];

    for (let i = 0; i < 5; i++) {
      const imageUrl = `https://source.unsplash.com/random/600x400?sig=${i}&library`;

      const library = new Library({
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        postal_code: faker.location.zipCode(),
        location: {
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
        website: `https://${faker.internet.domainName()}`,
        image: imageUrl,
        opening_hours: [
          { day: 'Lundi', open_time: '08:00', close_time: '18:00', is_open: 'Ouvert' },
          { day: 'Mardi', open_time: '08:00', close_time: '18:00', is_open: 'Ouvert' },
          { day: 'Mercredi', open_time: '08:00', close_time: '18:00', is_open: 'Ouvert' },
          { day: 'Jeudi', open_time: '08:00', close_time: '18:00', is_open: 'Ouvert' },
          { day: 'Vendredi', open_time: '08:00', close_time: '18:00', is_open: 'Ouvert' },
          { day: 'Samedi', open_time: '10:00', close_time: '16:00', is_open: 'Ouvert' },
          { day: 'Dimanche', open_time: '00:00', close_time: '00:00', is_open: 'Fermé' },
        ],
        phone: faker.phone.number('+33 6 ## ## ## ##'),
        services: faker.helpers.arrayElement([
          'Livres', 'E-books', 'Salles d\'étude', 'Événements', 'Impression', 'Wi-Fi gratuit', 'Section pour enfants'
        ]),
        accessibility: faker.helpers.arrayElement([
          'Accessible en fauteuil roulant',
          'Pas d\'accès fauteuil roulant',
          'Ascenseur disponible',
          'Uniquement des escaliers',
        ]),
        rating: faker.number.int({ min: 0, max: 5 }),
      });

      libraries.push(await library.save());
    }

    console.log('Bibliothèques ajoutées avec succès.');

    for (let i = 0; i < 10; i++) {
      const imageUrl = `https://source.unsplash.com/random/600x400?sig=event${i}&event`;

      const event = new Event({
        name: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        date: faker.date.future(),
        start_time: faker.date.soon(),
        end_time: faker.date.soon(),
        library_id: faker.helpers.arrayElement(libraries)._id,
        address: faker.location.streetAddress(),
        register_link: faker.internet.url(),
        image: imageUrl,
      });
      await event.save();
    }

    console.log('Événements ajoutés avec succès.');

    for (let i = 0; i < 15; i++) {
      const review = new Review({
        user_id: faker.database.mongodbObjectId(),
        content: faker.lorem.paragraph(),
        rating: faker.number.int({ min: 1, max: 5 }),
        created_at: faker.date.recent(),
        likes_count: faker.number.int({ min: 0, max: 100 }),
        liked_by: [faker.database.mongodbObjectId(), faker.database.mongodbObjectId()],
        library_id: faker.helpers.arrayElement(libraries)._id,
      });
      await review.save();
    }

    console.log('Critiques ajoutées avec succès.');

    return { libraries };
  } catch (error) {
    console.error('Erreur lors du peuplement de la base de données :', error);
  } finally {
    await disconnectDB();
    console.log('Déconnexion de la base de données terminée.');
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}

export default seedDatabase;

