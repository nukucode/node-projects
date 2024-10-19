import bcrypt from "bcrypt";
import { UserModal as User } from "../models/User.js";

// register
export const signup = async (req, res) => {
  try {
    const { name, email, password, profilePic } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      profilePic
    });
    await user.save();

    res.status(201).json({ message: "User Register Succesfull!" });
  } catch (error) {
    res.status(500).json({ message: error.message || "User Regiser Failed!" });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication Failed!" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication Failed" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update user
export const updateUser = async (req, res) => {
  try {
    const { _id, name, email, password, profilePic } = req.body;

    if ((!name, !email, !password, !profilePic)) {
      return res.status(401).jons({ error: "Feild are required!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(
      _id,
      {
        name,
        email,
        password: hashedPassword,
        profilePic
      },
      {
        new: true,
        returnDocument: "after"
      }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user
export const getUser = async(req, res) => {
  try {
      const {_id} = req.query;
      const user = await User.findById(_id);
      res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
