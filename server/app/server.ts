import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import cors from 'cors';
import revenue from './routes/revenue';
import { MONGO_URI } from "./config/secret";
import mongoose from "mongoose";

dotenv.config();
const app: Application = express();

app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection open your heart 
const mongoUrl: string = MONGO_URI as string;
mongoose.set('strictQuery', false);
mongoose.connect(mongoUrl)
.then(() => {
  console.log("MongoDB Connected!");
})
.catch((err: any) => {
  console.error("MongoDB Connection Error!");
  process.exit();
});

// if (process.env.NODE_ENV === "production") {

// 	app.use(express.static('./client/'));
// 	app.get('/', (req:Request, res:Response) => {
// 		console.log('sending index.html');
// 		res.sendFile('/dist/index.html');
// 	});
// }
// Primary App Routers
app.use("/api/revenue", revenue);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});