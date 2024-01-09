const catchAsync = require("./../utils/catchAsync");
const APIError = require("./../utils/apiError");
const bcrypt = require("bcryptjs");
const Room = require("../models/roomModel");
const APIFeatures = require("./../utils/apiFeatures");
const factory = require("../Controller/handlerFactory");


const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
  };

//retrieves all 
// restricted to admin
exports.getAllRooms = factory.getAll(Room);

exports.getRoom = factory.getOne(Room);

exports.createRoom = factory.createOne(Room);

exports.updateRoom = factory.updateOne(Room);

exports.filterRoomUpdateFields = (...fields) => {
    return (req, res, next) => {
  
      // Filtered out unwanted fields names that are not allowed to be updated
    //   const filteredBody = (, ...allowedFields) => {
        let obj  = req.body;
        const newObj = {};
        const filteredBody = Object.keys(obj).forEach((el) => {
          if (fields.includes(el)) newObj[el] = obj[el];
        });
        // return newObj;
    //   };

    //    = filterObj(req.body, ...allowedFields, );
      console.log("fields ",...fields)
      req.body = filteredBody
      next()
    }
  }

//retrieves editor profile
// restricted to the user himself
// exports.getMe = catchAsync(async (req, res, next) => {
//   req.params.id = req.user.id;
//   next();
// });

exports.deleteRoom = factory.deleteOne(Room);
