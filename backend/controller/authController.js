import { users } from "../database/Models.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const Register = async (req, res) => {
  const { name, email, password } = req.body;
  if (name === '' || email === '' || password === '') {
    res.status(400).json({ message: "All fields are required" })
  }
  else {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new users(
      {
        name, email, password: hash
      }
    )

    user.save();
  }
}
export const Login = async (req, res) => {
  const { email, password } = req.body;
  if (email === '' || password === '') {
    res.status(400).json({ message: "All fields are required" })
  }
  else {
    const user = await users
      .findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...other } = user._doc;
      res.cookie('token', token, { httpOnly: true })
      res.status(200).json({ message: "Login successful", user: other})
    } else {
      res.status(400).json({ message: "Invalid credentials" })
    }
  }
}
export const Logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logged out" })
}