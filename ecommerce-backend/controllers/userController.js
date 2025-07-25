import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import User from "../models/User.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'  // 👈 role request se le rahe hai, warna 'user' default
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      newUser,
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
//     if (!isPasswordMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: existingUser._id, role: existingUser.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }

//     );

//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Login error", error: error.message });
//   }
// };

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email, password } = req.body;
  try {

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });

    }
    if (req.body.name) {
      user.name = req.body.name;
    }

    // ✅ Update password if provided

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });

  }
}


export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");
    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching users",
      error: error.message,

    });
  }
}

export const getMe = async(req,res)=>{
  res.status(200).json({
    email: res.user.email,
    name:req.user.name,
  });
};