import Review from '../models/review.js';
import Library from '../models/library.js';

// export async function addComment(req, res) {
//   try {
//     const { libraryId } = req.params;
//     const { content } = req.body;
//     const userId = req.user.id;

//     if (!content || content.trim() === "") {
//       return res.status(400).json({ message: "Le commentaire est requis" });
//     }

//     const library = await Library.findById(libraryId);
//     if (!library) {
//       return res.status(404).json({ message: "Bibliothèque non trouvée" });
//     }

//     const comment = new Review({
//       user_id: userId,
//       content,
//       library_id: libraryId,
//       created_at: new Date(),
//     });

//     await comment.save();

//     res.status(201).json({ message: "Commentaire ajouté avec succès", comment });
//   } catch (error) {
//     res.status(500).json({ message: "Erreur lors de l'ajout du commentaire", error: error.message });
//   }
// }

// export const addComment = async (req, res) => {
//   const { content } = req.body;
//   const { libraryId } = req.params;
//   const userId = req.user._id; // supposé ajouté par authMiddleware

//   if (!content || !libraryId) {
//     return res.status(400).json({ message: 'Contenu ou ID manquant' });
//   }

//   try {
//     const newComment = await Comment.create({
//       content,
//       library_id: libraryId,
//       user_id: userId,
//     });

//     res.status(201).json({
//       message: 'Commentaire ajouté avec succès',
//       comment: newComment,
//     });
//   } catch (err) {
//     console.error('Erreur lors de l\'ajout du commentaire :', err);
//     res.status(500).json({ message: 'Erreur serveur' });
//   }
// };

export const addComment = async (req, res) => {
  try {
    const { name } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ message: 'Contenu manquant' });
    }

    const library = await Library.findOne({ name });

    if (!library) {
      return res.status(404).json({ message: 'Bibliothèque non trouvée' });
    }

    const newComment = new Review({
      user_id: userId,
      content,
      library_id: library._id,
      created_at: new Date(),
    });

    await newComment.save();

    res.status(201).json({
      message: 'Commentaire ajouté avec succès',
      comment: newComment,
    });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire par nom :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

export async function getReviewsByLibrary(req, res) {
  try {
    const { libraryId } = req.params;

    const reviews = await Review.find({ library_id: libraryId })
      .populate('user_id', 'first_name last_name') 
      .sort({ created_at: -1 });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "Aucun commentaire trouvé pour cette bibliothèque" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des commentaires", error: error.message });
  }
}


export async function deleteReview(req, res) {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Commentaire non trouvé" });

    if (review.user_id.toString() !== userId) {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du commentaire", error: error.message });
  }
}


export async function updateReview(req, res) {
  try {
    const { reviewId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: "Commentaire non trouvé" });

    if (review.user_id.toString() !== userId) {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    review.content = content || review.content;
    await review.save();

    res.status(200).json({ message: "Commentaire mis à jour", review });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du commentaire", error: error.message });
  }
}
