const express = require("express");

const {
    getAllRooms,
    getRoom,
    createRoom,
    updateRoom,
    filterRoomUpdateFields,
    deleteRoom
} = require("./../controller/roomController");

const {zip} = require("./../utils/zip")

const {
    restrictTo,
    protect,
} = require("./../controller/authController");

const { validationRules, checkId } = require("../lib/validation");

const router = express.Router();

// const Room = require("../models/roomModel.js")
// const User = require("../models/userModel.js")

router
    .route("/")
    .get(protect,restrictTo("manager", "receptionist","user"),getAllRooms)
    .post(protect,restrictTo("manager", "receptionist"), createRoom)   

router
    .route("/backup")
    .get(zip)

router
  .route("/:id")
  .get(protect, restrictTo("manager", "receptionist", "user"), getRoom) //get room
  .patch(protect,restrictTo("manager","receptionist"),
//   filterRoomUpdateFields("reservation"),
  updateRoom) //edit room
  .delete(protect, restrictTo("manager","receptionist"),deleteRoom)

module.exports = router;