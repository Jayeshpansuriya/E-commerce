import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;

    try{
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({message:"User registered successfully", newUser});

    }catch(err){
        res.status(500).json({message:"something went wrong", error:err.message});
    }

};

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
      { expiresIn: "1d" } // ✅ typo fix from "id" to "1d"
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error", error: error.message });
  }
};
