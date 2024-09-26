import User, { IUser } from '../models/user';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

class UserService {
  // Register a new user
  async registerUser(input: RegisterInput): Promise<IUser> {
    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const user = new User(input);
    return user.save();
  }

  // Authenticate user
  async authenticateUser(email: string, password: string): Promise<IUser | null> {
    const user = await User.findOne({ email });
    if (!user) return null;
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return null;
    return user;
  }

  // Get user by ID
  async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id).select('-password');
  }
}

export default new UserService();
