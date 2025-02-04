// var zip = require('node-zip')();
// const archiver = require('archiver');
const zipUnzipper = require('zip-and-unzip');;
const JSZip = require("jszip");
const archiver = require('archiver');
var Minizip = require('minizip-asm.js');
// const zipUnzipper = require('../index.js');
const path = require('path');
const fs = require('fs');
const Room = require("../models/roomModel.js")
const User = require("../models/userModel.js")
const APIError = require("../utils/apiError");
const APIFeatures = require("./apiFeatures.js");
const catchAsync = require('../utils/catchAsync.js');
const logger = require('./logger');


exports.zip = async (req,res,next) =>  {

    logger.info("Backing up...")

    const {password} = req.query
    const path = './backups'
    const filename = "archive.zip"
    const model = req.baseUrl.split("/")[1]
    let data;

    if (model === "rooms"){

      let query = new APIFeatures(Room.find({}), req.query)
      data = await query.query;
    }
    else if (model === "users"){
      let query = new APIFeatures(User.find({}), req.query)
      data = await query.query;
    }

    var mz = new Minizip();
    mz.append(`${model}-backup.json`,JSON.stringify(data), {password});


    fs.writeFileSync(path + "/" + filename, new Buffer(mz.zip()))

    res.download(path+"/"+filename);

  }
