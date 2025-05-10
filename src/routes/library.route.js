import { Router } from 'express';
import libraryController from '../controllers/libraryController.js';

const router = Router();


router.post('/', libraryController.createLibrary);
router.get('/', libraryController.getAllLibraries);
router.get('/:id', libraryController.getLibraryById);
router.put('/:id', libraryController.updateLibrary);
router.delete('/:id', libraryController.deleteLibrary);

export default router;
