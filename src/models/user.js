import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_description: { type: String, default: '' },
  field: { type: String, enum: ['IT', 'x', 'y'], required: true },
  profile_type: {
    type: String,
    enum: ['Student', 'Employee', 'Freelancer', 'Entrepreneur', 'Unemployed', 'Retired', 'Other'],
    required: true,
  },
  profile_pic: { type: String, default: '' },
  role: { type: String, enum: ['Admin', 'User'], required: true },
  linkedin: { type: String, default: '' },
});

const User = mongoose.model('User',userSchema);
export default User;