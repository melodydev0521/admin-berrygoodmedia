import mongoose, { Model, Schema } from 'mongoose';

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

const RevenueModel = mongoose.model('revenues', RevenueSchema);
export default RevenueModel;