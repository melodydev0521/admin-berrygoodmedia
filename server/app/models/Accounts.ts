import mongoose, { Schema, Document } from 'mongoose';

enum accountType {
    plug = 'plug',
    tiktok = 'tiktok'
}

export interface IAccounts extends Document {
    accountType: accountType,
    name: string,
    token: string
}

const AccountSchema: Schema = new Schema({
    accountType: {
        type: String,
        enum: ['plug', 'tiktok']
    },
    name: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    }
});

const AccountModel = mongoose.model<IAccounts>('accounts', AccountSchema);
export default AccountModel;