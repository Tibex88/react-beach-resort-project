// var zip = require('node-zip')();
// const archiver = require('archiver');
const zipUnzipper = require('zip-and-unzip');;
const JSZip = require("jszip");
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
    const path = './backups'
    const filename = "archive.zip"
    // console.log(req.baseUrl.split("/")[1])
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


    const zip = new JSZip();

    // zip.setPassword(1234);

    zip.file(`${model}.json`,JSON.stringify(data))
    // zip.file("rooms.json",JSON.stringify(rooms))

    const content = await zip.generateAsync({type:"nodeBuffer"})

    fs.writeFileSync(path + "/" + filename, content)

    res.download(path+"/"+filename);

  }
