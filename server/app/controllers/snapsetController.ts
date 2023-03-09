import { RequestHandler } from "express";
import SnapSetModel, { ISnapSet } from "../models/SnapSet";
import snapsetValidate from "../validations/snapsetValidate";

/**
 * @param req {*}
 * @param res {Array of Account}
 */
export const getData: RequestHandler = (req, res) => {
    SnapSetModel
        .find()
        .then((accounts: Array<ISnapSet>) => res.json(accounts.reverse()));
}

/**
 * @param req {ISnapSet}
 * @param res {ISnapSet}
 */
export const addData: RequestHandler = (req, res) => {
    const { isValid, errors } = snapsetValidate(req.body);
    
    if (!isValid) {
        throw res.status(400).json(errors);
    }

    const newSnapset: ISnapSet = new SnapSetModel({
        accountType: req.body.accountType,
        name: req.body.name,
        token: req.body.token
    });

    newSnapset
        .save()
        .then((account: ISnapSet) => res.json(account));
}

/**
 * @param req {params: _id, body: ISnapSet}
 * @param res {ISnapSet}
 */
export const editData: RequestHandler = (req, res) => {
    SnapSetModel
        .findByIdAndUpdate(req.params._id, {$set: req.body}, {new: true})
        .then(item => res.json(item));
}

/**
 * @param req {params: _id}
 * @param res 
 */
export const deleteData: RequestHandler = (req, res) => {
    SnapSetModel
        .findByIdAndDelete(req.params._id)
        .then((item) => res.json(item));
}

/**
 * @param req 
 * @param res 
 */
export const deleteMany: RequestHandler = (req, res) => {
    SnapSetModel
        .deleteMany(req.body)
        .then(deletes => res.json(deletes));
}