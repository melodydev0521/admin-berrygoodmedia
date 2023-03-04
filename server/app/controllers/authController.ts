import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import isEmpty from "is-empty";
import UserModel, { IUserRequest } from "../models/User";
import generateToken from "../utils/getnerateToken";

export const loadUser = asyncHandler(async (req: IUserRequest, res: Response) => {
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

    const loggedUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
    }

    res.status(201).json({
        user: loggedUser,
        token: generateToken({user: loggedUser})
    });
});

// @Desc Login user
// @Route /api/users/login
// @Method POST
export const login = asyncHandler(async (req: Request, res: Response) => {

    const { email, password } = req.body;

    if (isEmpty(email)) {
        throw res.status(400).json({email: 'email is required'});
        // throw new Error("Email is required")
    }

    if (isEmpty(password)) {
        throw res.status(400).json({password: 'password is required'});
        // throw new Error("Password is required")
    }
    
    const user = await UserModel.findOne({ email: email });

    if(!user) {
        throw res.status(400).json({email: 'User not exists'});
        // throw new Error("User not found");
    }

    if(await user.comparePassword(password)) {

        const loggedUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
        }

        res.status(201).json({
            user: loggedUser,
            token: generateToken({user: loggedUser})
        });

    } else {
        throw res.status(400).json({password: 'password is incorrect'});
    }

});