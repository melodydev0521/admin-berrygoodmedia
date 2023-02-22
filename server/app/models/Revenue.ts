import mongoose, { Schema, Document } from 'mongoose';

export interface IRevenue extends Document {
    name: string,
    offer: string,
    adGroupId: string
}

const RevenueSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    offer: {
        type: String,
        required: true
    },
    adGroupId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const RevenueModel = mongoose.model<IRevenue>('revenues', RevenueSchema);
export default RevenueModel;