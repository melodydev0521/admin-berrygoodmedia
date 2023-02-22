"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const revenueController_1 = require("../controllers/revenueController");
const router = express_1.default.Router();
router.get('/list', revenueController_1.getRevenueList);
router.get('/', revenueController_1.getRevenues);
router.post('/', revenueController_1.addRevenue);
router.delete('/all', revenueController_1.removeAllRevenue);
router.delete('/:_id', revenueController_1.removeRevenue);
exports.default = router;
