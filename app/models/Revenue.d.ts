import mongoose from "mongoose"

interface revenueType {
    name: string,
    roas: number,
    profit: number,
    revenue: number,
    spend: number,
    offer: string
}

export interface Revenue {  
    data: []
}

export default interface RevenueDocument extends Revenue, mongoose.Document {}