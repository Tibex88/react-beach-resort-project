const mongoose = require("mongoose");
const app = require("./index");

require("./config/db_Connection")
require("dotenv").config({
  path: "./config.env"
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The port is listening...at ${port}`);
});

process.on("unhandledRejection", (err) => {
  // console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION Shuting down");
  // server.close(() => { ///shutdown the server first and then the processes
  //   process.exit(1);
  // });
});