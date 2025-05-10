import Library from '../models/library.js';

const libraryController = {
  async createLibrary(req, res) {
    try {
      const newLibrary = new Library(req.body);
      const savedLibrary = await newLibrary.save();
      res.status(201).json(savedLibrary);
    } catch (error) {
      res.status(400).json({ message: 'Erreur lors de la création de la bibliothèque', error: error.message });
    }
  },

  async getAllLibraries(req, res) {
    try {
      const libraries = await Library.find();
      res.status(200).json(libraries);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des bibliothèques', error: error.message });
    }
  },

  async getLibraryById(req, res) {
    try {
      const library = await Library.findById(req.params.id);
      if (!library) return res.status(404).json({ message: 'Bibliothèque non trouvée' });
      res.status(200).json(library);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération', error: error.message });
    }
  },

  async updateLibrary(req, res) {
    try {
      const updatedLibrary = await Library.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedLibrary) return res.status(404).json({ message: 'Bibliothèque non trouvée' });
      res.status(200).json(updatedLibrary);
    } catch (error) {
      res.status(400).json({ message: 'Erreur lors de la mise à jour', error: error.message });
    }
  },

  async deleteLibrary(req, res) {
    try {
      const deletedLibrary = await Library.findByIdAndDelete(req.params.id);
      if (!deletedLibrary) return res.status(404).json({ message: 'Bibliothèque non trouvée' });
      res.status(200).json({ message: 'Bibliothèque supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
    }
  },
};

export default libraryController;
