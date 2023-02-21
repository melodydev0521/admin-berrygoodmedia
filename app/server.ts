import express, { Application, Request, Response } from "express";
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

// MongoDB Connection
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

// Primary App Routers
app.use("/api/revenue", revenue);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});