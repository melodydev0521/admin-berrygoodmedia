"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const secret_1 = require("./config/secret");
const mongoose_1 = __importDefault(require("mongoose"));
// Router
const revenue_1 = __importDefault(require("./routes/revenue"));
const external_1 = __importDefault(require("./routes/external"));
const account_1 = __importDefault(require("./routes/account"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// MongoDB Connection open your heart 
const mongoUrl = secret_1.MONGO_URI;
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(mongoUrl)
    .then(() => {
    console.log("MongoDB Connected!");
})
    .catch((err) => {
    console.error("MongoDB Connection Error!");
    process.exit();
});
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static('../../client/'));
    app.get('/', (req, res) => {
        res.sendFile('/build/index.html');
    });
}
// Primary App Routers
app.use("/api/revenue", revenue_1.default);
app.use("/api/external-api", external_1.default);
app.use("/api/account", account_1.default);
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
