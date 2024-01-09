const express = require("express");

const {
    getAllRooms,
    getRoom,
    createRoom,
    updateRoom,
    filterRoomUpdateFields,
    deleteRoom
} = require("./../controller/roomController");

const {
    restrictTo,
    protect,
} = require("./../controller/authController");

const { validationRules, checkId } = require("../lib/validation");

const router = express.Router();

router
    .route("/")
    .get(protect,restrictTo("manager", "receptionist","user"),getAllRooms)
    .post(protect,restrictTo("manager", "receptionist"), createRoom)   

router
  .route("/:id")
  .get(protect, restrictTo("manager", "receptionist", "user"), getRoom) //get room
  .patch(protect,restrictTo("manager","receptionist"),
//   filterRoomUpdateFields("reservation"),
  updateRoom) //edit room
  .delete(protect, restrictTo("manager","receptionist"),deleteRoom)

module.exports = router;
