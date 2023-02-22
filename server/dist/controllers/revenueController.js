"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllRevenue = exports.removeRevenue = exports.addRevenue = exports.getRevenues = exports.getRevenueList = void 0;
const Revenue_1 = __importDefault(require("../models/Revenue"));
const getRevenueList = (req, res) => {
    Revenue_1.default.find().select('_id, date').then((list) => res.json(list));
};
exports.getRevenueList = getRevenueList;
const getRevenues = (req, res) => {
    Revenue_1.default.find().then((revenues) => {
        res.status(200).json(revenues);
    });
};
exports.getRevenues = getRevenues;
/**
 * @param req {revenues}
 * @param res
 * @param next
 * @desc Add new Revenue data
 */
const addRevenue = (req, res) => {
    // Create new Revenues
    Revenue_1.default.insertMany(req.body.revenues.map((item) => ({
        name: item.name,
        offer: item.offer,
        adGroupId: item.adGroupId
    })));
    res.status(200).json({ success: true });
};
exports.addRevenue = addRevenue;
const removeRevenue = (req, res) => {
    Revenue_1.default
        .findByIdAndDelete(req.params._id)
        .then((devRev) => res.json(devRev));
};
exports.removeRevenue = removeRevenue;
const removeAllRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Revenue_1.default.deleteMany();
    res.json({ delete: 'success' });
});
exports.removeAllRevenue = removeAllRevenue;
