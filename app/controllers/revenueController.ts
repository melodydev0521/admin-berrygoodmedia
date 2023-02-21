import { RequestHandler, Request, Response, NextFunction } from "express";
import RevenueModel, { IRevenue } from '../models/Revenue';

export const getRevenueList: RequestHandler = (req: Request, res: Response) => {
    RevenueModel.find().select('_id, date').then((list: any) => res.json(list));
}

export const getRevenues: RequestHandler = (req: Request, res: Response) => {
    RevenueModel.find().then((revenues: any) => {
        res.status(200).json(revenues);
    });
}

/**
 * @param req {revenues}
 * @param res 
 * @param next 
 * @desc Add new Revenue data
 */
export const addRevenue: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    // Create new Revenue
    const newRevenue: IRevenue = new RevenueModel({
        data: req.body.revenues
    });
    // Save Revenue
    newRevenue
        .save()
        .then((revenue: IRevenue) => {
            res.status(200).json(revenue);
        });
}

export const removeRevenue: RequestHandler = (req: Request, res: Response) => {
    RevenueModel
        .findByIdAndDelete(req.params._id)
        .then((devRev: any) => res.json(devRev));
}

export const removeAllRevenue: RequestHandler = async (req: Request, res: Response) => {
    await RevenueModel.deleteMany();
    res.json({delete: 'success'})
}