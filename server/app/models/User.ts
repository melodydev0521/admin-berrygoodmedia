import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string
    name: string,
    passwords: string
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const UserModel = mongoose.model<IUser>('accounts', UserSchema);
export default UserModel;