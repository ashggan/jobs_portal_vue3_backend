import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET, JWT_EXPIRE } = process.env;

// Function to hash users password
const hash = async (password: string): Promise<string> => {
  // Generate salt
  const salt = await bcrypt.genSalt(10);

  // Hash the password
  password = await bcrypt.hash(password, salt);
  return password;
};

// Function to compare hashed password's
const compare = async (
  hashedPassword: string,
  pass: string
): Promise<boolean> => {
  return bcrypt.compare(pass, hashedPassword);
};

// Function to generate tokens
// const generateToken = (id: string) => {
//   return jwt.sign({ id }, <string>JWT_SECRET, {
//     expiresIn: JWT_EXPIRE,
//   });
// };

export { hash, compare };
