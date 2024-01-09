/* Load mongoose module - allow to manipulate the database */
const mongoose = require("mongoose");
require("dotenv").config({
  path: "./config.env"
});

/* get database authentication keys */
const {
  dbAuth
} = require("./db_Authentication");

mongoose
  .connect("mongodb://localhost:27017/beach-resort?retryWrites=true", { //create connection
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, //To use the new Server Discover and Monitoring engine
  })
// mongoose.set('strict', false)
const dbConn = mongoose.connection

dbConn.on('error', () => {
  console.error.bind(console, 'connection error')
})
dbConn.once('open', () => {
  console.log("DBconnection succcessful")
})
module.exports = dbConn;