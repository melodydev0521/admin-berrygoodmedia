import mongoose, { Schema, Document } from 'mongoose';
import { Request } from 'express';
import bcrypt from 'bcrypt';
export interface IUserRequest extends Request {
    user?: any
}
export interface IUser extends Document {
    email: string
    name: string,
    password: string,
    token?: string,
    avatar?: string,
    isAdmin: boolean,
    comparePassword(entredPassword: string): Promise<Boolean>
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    name: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

UserSchema.pre("save", async function(next) {

    const user = this as IUser;

    if(!user.isModified("password")) return next();

    const salt = bcrypt.genSaltSync(10);
    
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;

    next();

})

UserSchema.methods.comparePassword = function(entredPassword: string) {
    const user = this as IUser;
    return bcrypt.compareSync(entredPassword, user.password);
}

const UserModel = mongoose.model<IUser>("users", UserSchema);

export default UserModel;