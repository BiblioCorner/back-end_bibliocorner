import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export async function signup(req, res) {
  try {
    //console.log("Process Env:", process.env);
    if (!SECRET_KEY) {
      throw new Error("JWT_SECRET is not defined.");
    }

    const {
      first_name,
      last_name,
      field,
      email,
      password,
      user_description,
      profile_type,
      role,
      linkedin} = req.body;
    const user_pic = req.file ? req.file.filename : '';
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      first_name,
      last_name,
      field,
      email,
      password : hashedPassword,
      user_description,
      profile_type,
      user_pic,
      role,
      linkedin
    });

    console.log("SECRET_KEY:", SECRET_KEY);
    const token = jwt.sign(
      { 
        id: newUser._id, 
        email: newUser.email
      }, 
      SECRET_KEY, 
      { expiresIn: '1h' }
    );
    await newUser.save();

    res.status(201).json({ 
      message: 'Utilisateur créé', 
      token,
      userId: newUser._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email
      }, 
      SECRET_KEY, 
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      userId: user._id 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur de connexion', error: error.message });
  }
}

export async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du profil', error: error.message });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const userId = req.user.id;
    const updatedData = req.body;

    // Si une nouvelle image est uploadée
    if (req.file) {
      updatedData.user_pic = req.file.filename;
    }

    // Ne pas laisser changer l'email ou le mot de passe ici (optionnel mais recommandé)
    delete updatedData.email;
    delete updatedData.password;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({ message: 'Profil mis à jour', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
}


export default { signup, login, getUserProfile, updateUserProfile };
