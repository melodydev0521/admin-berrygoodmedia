import mongoose, { Schema, Document } from 'mongoose';

enum accountType {
    plug = 'plug',
    tiktok = 'tiktok',
    snapchat = 'snapchat'
}

export interface IAccounts extends Document {
    accountType: accountType,
    name: string,
    token: string,
    accessToken?: string
}

const AccountSchema: Schema = new Schema({
    accountType: {
        type: String,
        enum: ['plug', 'tiktok', 'snapchat']
    },
    name: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    },
    accessToken: {
        type: String
    }
});

const AccountModel = mongoose.model<IAccounts>('accounts', AccountSchema);
export default AccountModel;