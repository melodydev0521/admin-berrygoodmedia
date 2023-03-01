import { RequestHandler } from "express";
import RevenueModel, { IRevenue } from '../models/Revenue';

export const getRevenueList: RequestHandler = (req, res) => {
    RevenueModel.find().select('_id, date').then((list: any) => res.json(list));
}

export const getRevenues: RequestHandler = (req, res) => {
    RevenueModel.find().then((revenues: any) => {
        res.status(200).json(revenues);
    });
}

export const removeRevenue: RequestHandler = (req, res) => {
    RevenueModel
        .findByIdAndDelete(req.params._id)
        .then((devRev: any) => res.json(devRev._id));
}

export const removeAllRevenue: RequestHandler = async (req, res) => {
    await RevenueModel.deleteMany();
    res.json({delete: 'success'})
}