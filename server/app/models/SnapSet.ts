import mongoose, { Schema, Document } from 'mongoose';

enum accountType {
    plug = 'tiktok',
    snapchat = 'snapchat'
}
export interface ISnapSet extends Document {
    accountType: accountType,
    name: string,
    token: string
}

const SnapSetSchema: Schema = new Schema({
    accountType: {
        type: String,
        enum: ['tiktok', 'snapchat'],
        require: true
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

const SnapSetModel = mongoose.model<ISnapSet>('snapsets', SnapSetSchema);
export default SnapSetModel;