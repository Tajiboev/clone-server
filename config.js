import dotenv from "dotenv";
dotenv.config();

export const pwd = process.env.MONGO_PASSWORD;
export const dbname = process.env.MONGO_DBNAME;
export const jwt_key = process.env.JWT_KEY;
