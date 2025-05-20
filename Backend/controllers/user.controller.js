import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
    try {
        const { userId, fullName, email, password, role, age, phoneNumber, address } = req.body;

        // console.log(userId, fullName, email, password, role, age, phoneNumber, address);


        if (!userId || !fullName || !email || !password || !role || !age || !phoneNumber || !address) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            })
        }

        const existEmail = await User.findOne({ email });

        const existuserId = await User.findOne({ userId });

        if (existEmail || existuserId) {
            return res.status(400).json({
                message: "User alredy exist",
                success: false
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({
            userId,
            fullName,
            email,
            password: hashPassword,
            address,
            role,
            age,
            phoneNumber
        })

        return res.status(201).json({
            message: 'User registered successfully!',
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const login = async (req, res) => {
    try {

        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            })
        }

        const user = await User.findOne({ userId: { $regex: new RegExp(`^${userId}$`, "i") } });

        if (!user) {
            return res.status(400).json({
                message: "Invalid userId or Password.",
                success: false
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid userId or Password.",
                success: false
            })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        const userData = {
            _id: user.id,
            userId: user.userId,
            fullname: user.fullName,
            email: user.email,
            password: user.password,
            role: user.role,
            phoneNumber: user.phoneNumber,
            age: user.age,
            address: user.address,
            profilePicture: user.profilePicture
        }

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
        }).json({
            message: `Welcome back ${userData.fullname}`,
            user: userData,
            success: true,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}