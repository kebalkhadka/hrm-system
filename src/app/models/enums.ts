import mongoose, { Schema, Document } from 'mongoose';

const roleEnum = ['manager', 'hr', 'employee']; // These are the allowed roles

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true, // Ensure the name is required
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: roleEnum, // Ensure role is one of the allowed values
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
