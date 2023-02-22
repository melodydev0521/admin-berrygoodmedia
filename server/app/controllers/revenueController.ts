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
export const addRevenue: RequestHandler = (req: Request, res: Response) => {
    // Create new Revenues
    RevenueModel.insertMany(req.body.revenues.map((item: IRevenue) => ({
        name: item.name,
        offer: item.offer,
        adGroupId: item.adGroupId,
        bearerToken: item.bearerToken,
        advertiserId: item.advertiserId
    })));
    res.status(200).json({success: true});
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