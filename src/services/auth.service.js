import bcrypt from 'bcrypt';
import User from '../models/User.model';

export const signUp = async (data) => {
  try {
    const hashedPw = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
      ...data,
      password: hashedPw,
    });
    return newUser;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};
