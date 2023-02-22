import mongoose, { Schema, Document } from 'mongoose';

export interface IRevenue extends Document {
    name: string,
    offer: string,
    adGroupId: string,
    advertiserId: string,
    bearerToken: string
}

const RevenueSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    offer: {
        type: String
    },
    adGroupId: {
        type: String,
        required: true
    },
    advertiserId: {
        type: String,
        required: true
    },
    bearerToken: {
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