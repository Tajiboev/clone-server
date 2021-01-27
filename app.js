import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import userRoutes from "./api/routes/users.js";

const app = express();

// connect to mongodb with mongoose
import "./connectDB.js";

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/users", userRoutes);

// Error handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  // may log error here
  res.status(error.statusCode || 500).json({ errorMessage: error.message });
});

export default app;
