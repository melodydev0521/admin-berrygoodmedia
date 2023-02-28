"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
var mongoUrl = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
if (process.env.NODE_ENV === "development") {
    mongoUrl.replace(/<db_name>/i, dbName.concat('_dev'));
}
else if (process.env.NODE_ENV === "production") {
    mongoUrl.replace(/<db_name>/i, dbName);
}
exports.MONGO_URI = process.env.MONGO_URI;
