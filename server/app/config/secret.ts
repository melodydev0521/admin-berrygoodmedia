import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const MONGO_URI = process.env.MONGO_URI;
export const NODE_ENV = process.env.NODE_ENV;