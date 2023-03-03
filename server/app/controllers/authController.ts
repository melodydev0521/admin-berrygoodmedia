import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "../models/User";
import generateToken from "../utils/getnerateToken";

// @Desc Register user
// @Route /api/users/register
// @Method POST
export const registerController = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password, avatar } = req.body;

    const user = new UserModel({
        name,
        email,
        password,
        avatar
    });

    await user.save();

    res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    });
});

// @Desc Login user
// @Route /api/users/login
// @Method POST
export const loginController = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;
    
    const user = await UserModel.findOne({ email })

    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    if(await user.comparePassword(password)) {

        res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
        });

    } else {
        res.status(401);
        throw new Error("Email or password incorrect");
    }

});