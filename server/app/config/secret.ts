import dotenv from "dotenv";
dotenv.config({ path: ".env" });

var mongoUrl: string = process.env.MONGO_URI as string;
const dbName: string = process.env.DB_NAME as string;
if (process.env.NODE_ENV === "development") {
    mongoUrl = mongoUrl.replace(/<db_name>/i, dbName.concat('_dev'));
} else if (process.env.NODE_ENV === "production") {
    mongoUrl = mongoUrl.replace(/<db_name>/i, dbName);
}

export const MONGO_URI = mongoUrl;
export const PORT = process.env.PORT;