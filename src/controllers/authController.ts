// src/controllers/authController.ts
import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Example user data (replace with your actual user lookup logic)
const user = {
  id: 1,
  username: 'testuser',
  // This is an example hashed password; in practice, this should come from your DB.
  //   password: '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  password: 'yourPassword',
};

export const login: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { username, password } = req.body;

  // Validate username
  if (username !== user.username) {
    res.status(401).json({ message: 'Invalid credentials' });
    return; // Do not return the res.json value
  }

  // Validate password using bcrypt
  //   const isMatch: boolean = await bcrypt.compare(password, user.password);
  const isMatch: boolean = (await password) && user.password;
  if (!isMatch) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  // Prepare payload for JWT
  const payload = {
    id: user.id,
    username: user.username,
  };

  // Sign the JWT token
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '1h',
  });

  // Send the response without returning its value
  res.json({ token });
};
