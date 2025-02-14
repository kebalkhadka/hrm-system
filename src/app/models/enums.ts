import mongoose, { Schema, Document } from 'mongoose';

const roleEnum = ['manager', 'hr', 'employee']; 

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: roleEnum, 
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
