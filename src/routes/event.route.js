import { Router } from 'express';
import eventController from '../controllers/eventController.js';

const router = Router();


router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/library/:libraryId', eventController.getEventsByLibrary);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;
