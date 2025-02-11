import { Request, RequestHandler, Response } from 'express';
import { User } from '../models/User.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Example user data (replace with your actual user lookup logic)
const user = {
  id: 1,
  username: 'testuser',
  // This is an example hashed password; in practice, this should come from your DB.
  //   password: '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  password: 'yourPassword',
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user and Save it to DB
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
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
