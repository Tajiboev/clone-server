import { createServer } from "http";
import app from "./app.js";
import chalk from "chalk";

const { greenBright } = chalk;
const port = process.env.PORT || 3001;
const log = console.log;

const server = createServer(app);

server.listen(port, () => {
  log(greenBright(`\nServer listening on port ${port}`));
});
