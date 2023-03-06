import mongoose, { Schema, Document } from 'mongoose';

export interface ISnapSet extends Document {
    name: string,
    campaignId: string
}

const SnapSetSchema: Schema = new Schema({
    name: {
        type: String,
        require: true
    },
    campaignId: {
        type: String,
        require: true
    }
});

const SnapSetModel = mongoose.model<ISnapSet>('snapsets', SnapSetSchema);
export default SnapSetModel;