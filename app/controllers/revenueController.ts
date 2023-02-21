import { RequestHandler, Request, Response, NextFunction } from "express";
import RevenueModel from '../models/Revenue';
import RevenueDocument, { Revenue } from '../models/Revenue.d';

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
    const newRevenue: any = new RevenueModel({
        data: req.body.revenues
    });
    // Save Revenue
    newRevenue.save().then((revenue: Revenue) => {
        res.status(200).json(revenue);
    });
}

export const removeRevenue: RequestHandler = (req: Request, res: Response) => {
    RevenueModel.findByIdAndDelete(req.params._id).then((devRev: any) => res.json(devRev));
}

export const removeAllRevenue: RequestHandler = (req: Request, res: Response) => {
    RevenueModel.deleteMany().then((deleted: any) => res.json({delete: 'success'}));
}