const mongoose = require("mongoose");
// const Grid = require("gridfs-stream");
const APIError = require("../utils/apiError");
const catchAsync = require("../utils/catchAsync");
// const transaction = require("../utils/transaction");
const APIFeatures = require("../utils/apiFeatures");
const dbConn = require("../config/db_Connection");
// const dbAuth = require("../config/db_Authentication");
require("events").EventEmitter.prototype._maxListeners = 70;
require("events").defaultMaxListeners = 70;
// let gfs;
// let gridfs;
// const conn = mongoose.connections[0];

// conn.once("open", () => {
//   gridfsMedia = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "media",
//   });
// });

// conn.once("open", () => {
//   gridfsProfile = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "userProfile",
//   });
// });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = new APIFeatures(Model.findById(req.params.id), req.query)
      .filter()
      .field()
      .populate();

    const doc = await query.query;

    if (!doc) {
      return next(new APIError(`No document found with ${req.params.id}`, 404));
    }

    res.status(200).json({
      status: "succcess",
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.query);
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 9;
    let count = new APIFeatures(Model.find({}), req.query).filter().count();
    let total = await count.query;

    let query = new APIFeatures(Model.find({}), req.query)
      .filter()
      .field()
      .sort()
      .paginate()
      .populate();

    const doc = await query.query;
    // console.log(doc);

    if (!doc) {
      return next(
        new APIError(`No document found with id = ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "succcess",
      data: {
        data: doc,
        results: doc.length,
        paginationData: {
          total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          showingFrom: limit * (page - 1) + 1,
          showingUntil: limit * page > total ? total : limit * page,
        },
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {

    console.log(req.params)
    let doc = await Model.updateOne(
      {
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!doc) {
      return next(
        new APIError(`No document found with id = ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(
        new APIError(`No document found with id = ${req.params.id}`, 404)
      );
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.deleteMany = (Model, delArr) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.deleteMany({
      _id: {
        $in: delArr,
      },
    });

    if (!doc) {
      return next(
        new APIError(`No document found with id = ${req.params.id}`, 404)
      );
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    if (!doc) {
      return next(
        new APIError(`An error occured while creating the document`, 404)
      );
    }
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

// exports.getOneMedia = (collectionName) =>
//   catchAsync(async (req, res, next) => {
//     console.log(req.params.filename);
//     if (collectionName == "userProfile") gridfs = gridfsProfile;
//     else if (collectionName == "media") gridfs = gridfsMedia;

//     const result = await gridfs.find({
//       filename: req.params.filename,
//     });
//     var filename = "";
//     await result.forEach((doc) => {
//       filename = doc.filename;
//       return;
//     });
//     const readstream = await gridfs.openDownloadStreamByName(filename);

//     readstream
//       .on("data", async (chunk) => {
//         string = await chunk.toString("base64");

//         return res.status(200).json({
//           status: "success",
//           data: string,
//         });
//       })
//       .on("end", function () {
//         console.log("end");
//       })
//       .on("error", (err) => {
//         console.log(err, "the error");
//       });
//   });

// exports.updateOneMedia = (collectionName) =>
//   catchAsync(async (req, res, next) => {
//     gfs.collection(collectionName);
//     // gfs.remove({_id:})
//   });

// exports.deleteOneMedia = (collectionName) =>
//   catchAsync(async (req, res, next) => {
//     if (collectionName == "userProfile") gridfs = gridfsProfile;
//     else if (collectionName == "media") gridfs = gridfsMedia;

//     await gridfs.delete(new mongoose.Types.ObjectId(req.params.id));
//     res.status(204).json({
//       status: "success",
//     });
//   });

// exports.deleteManyMedia = (collectionName) =>
//   catchAsync(async (req, res, next) => {
//     if (collectionName == "userProfile") gridfs = gridfsProfile;
//     else if (collectionName == "media") gridfs = gridfsMedia;

//     // gfs.collection(collectionName + '.chunks');
//     console.log(req.body.delete);
//     // gridfs.delete(`ObjectId("${req.body.delete[0]}")`)
//     await gridfs.delete(new mongoose.Types.ObjectId(req.body.delete[0]));

//     res.status(200).json({
//       status: "success",
//     });
//   });