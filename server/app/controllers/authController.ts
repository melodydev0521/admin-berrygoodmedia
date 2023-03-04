import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserModel, { IUserRequest } from "../models/User";
import generateToken from "../utils/getnerateToken";

export const loadUser = asyncHandler(async (req: IUserRequest, res: Response) => {
    console.log(req.user);
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @Desc Register user
// @Route /api/users/register
// @Method POST
export const register = asyncHandler(async (req: Request, res: Response) => {
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
export const login = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;
    
    const user = await UserModel.findOne({ email: email })

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