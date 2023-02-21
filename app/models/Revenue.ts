import mongoose, { Model, Schema, Document } from 'mongoose';

interface IRevenueItem {
    name?: string,
    roas: number,
    profit: number,
    revenue: number,
    spend: number,
    offer: string
}
export interface IRevenue extends Document {
    data: Array<IRevenueItem>,
    date: Date
}

const RevenueSchema: Schema = new Schema({
    data: [{
        name: String,
        roas: Number,
        profit: Number,
        revenue: Number,
        spend: Number,
        offer: String
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const RevenueModel = mongoose.model<IRevenue>('revenues', RevenueSchema);
export default RevenueModel;