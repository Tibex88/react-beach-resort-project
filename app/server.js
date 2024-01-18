const mongoose = require("mongoose");
const app = require("./index");
const logger = require("./utils/logger.js")
require("./config/db_Connection")
require("dotenv").config({
  path: "./config.env"
});

logger.error("error") ;
logger.warn("warn") ;
logger.info("info") ;
logger.verbose("verbose") ;
logger.debug("debug") ;
logger.silly("silly") ;

const port = process.env.PORT;
app.listen(port, () => {
  logger.info(`The port is listening...at ${port}`);
});

process.on("unhandledRejection", (err) => {
  // console.log(err.name, err.message);
  console.log("..");
  // server.close(() => { ///shutdown the server first and then the processes
  //   process.exit(1);
  // });
});