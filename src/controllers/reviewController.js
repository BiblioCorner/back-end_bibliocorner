import Review from '../models/Review.js';
import Library from '../models/library.js';

export async function addComment(req, res) {
  try {
    const { libraryId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Le commentaire est requis" });
    }

    const library = await Library.findById(libraryId);
    if (!library) {
      return res.status(404).json({ message: "Bibliothèque non trouvée" });
    }

    const comment = new Review({
      user_id: userId,
      content,
      library_id: libraryId,
      created_at: new Date()
    });

    await comment.save();

    res.status(201).json({ message: "Commentaire ajouté avec succès", comment });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du commentaire", error: error.message });
  }
}
