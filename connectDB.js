import mongoose from "mongoose";
const { connect } = mongoose;
import { pwd, dbname } from "./config.js";
import chalk from "chalk";
const { greenBright, redBright } = chalk;
const log = console.log;

export default connect(
  `mongodb+srv://Mukhammadjon:${pwd}@restart.9oliw.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
  .then(() => {
    log(greenBright("Successfully connected to DB\n"));
  })
  .catch((error) => {
    log(redBright("Failed to connect to DB\n", error));
  });
