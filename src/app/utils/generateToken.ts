import jwt, { SignOptions } from 'jsonwebtoken';

const generateToken = (userId: string, role: string) => {
  const payload = { userId, role };
  const secret = process.env.JWT_SECRET_KEY as string;

  // Explicitly define options as SignOptions
  const options: SignOptions = { expiresIn: '1d' }; 

  return jwt.sign(payload, secret, options);
};

export default generateToken;
