const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");
// const { stringify } = require("querystring");

const room = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      // validate: [
      //   validator.isAlpha,
      //   "Only characters are allowed as Name,recieved {VALUE}",
      // ],
      default: null,
      required: [true, "Please provide a Name"],
    },
    type: {
      type: String,
      trim: true,
      validate: [validator.isAlpha, "Only characters are allowed as Last Name"],
      default: null,
      required: [true, "Please provide a  type"],
    },
    price: {
      type: Number,
      default: null,
      trim: true,
      required: [true, "Please provide a Price"],
    },
    size: {
      type: Number,
      default: null,
      trim: true,
      required: [true, "Please provide a Size"],
    },
    capacity: {
      type: Number,
      default: 1,
      // trim: true,
      // validate: [
      //   validator.isNumeric,
      //   "Only letters and numbers are allowed as password",
      // ],
    },
    pets: {
      type: Boolean,
      trim: true,
      default: false,
    },
    breakfast: {
      type: Boolean,
      trim: true,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    featured:{
      type:Boolean,
      default:true,
  },
    description: {
      type: String,
      default: null,
    },
    extras:[ {
        type: String,
        default: null,
    }],
    images: [{
      url: {
        type: {
          String,
        },
        default: null,
        trim: true,
      },
      caption: {
        type: {
          String,
        },
        default: null,
        trim: true,
      },
    }],
    active: {
      type: Boolean,
      default: true,
    },
    reservation:{
          name:{
              type:String,
          },
          checkIn:{
              type:Date,
              // default:Date.now()
          },
          checkOut:{
              type:Date,
              // default:Date.now()
          },
  },
    available:{
    type:Boolean,
    default:true,
},
  checkIn:{
      type:Date,
      default:Date.now()
  },
  checkOut:{
      type:Date,
      default:Date.now()
  },

  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// user.pre("save", function (next) {
//   var user = this;
//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified("password")) return next();

//   // generate a salt
//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) return next(err);

//     // hash the password using our new salt
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err);

//       // override the cleartext password with the hashed one
//       user.password = hash;
//       // user.passwordConfirm = hash;
//       next();
//     });
//   });
// });

// user.methods.correctPassword = async function (
//   candidatePassword,
//   userPassword
// ) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// user.methods.changedPasswordAfter = function (JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimeStamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );
//     console.log(this.passwordChangedAt, JWTTimestamp);

//     return JWTTimestamp < changedTimeStamp;
//   }
//   return false;
// };

// user.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");

//   this.passwordResetToken = crypto
//     .createHash("sha256")
//     .update(resetToken)
//     .digest("hex");

//   // console.log({
//   //   resetToken
//   // }, this.passwordResetToken)

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

//   return resetToken;
// };

// // user.toggleMessage = function (id) {
// //   this.unreadMessage.shift(id);
// //   this.save();
// //   return this;
// // };

// // user.methods.toggleMessageCount = function (unreadCount) {
// //   this.messageCount = unreadCount;
// //   this.save();
// //   return this;
// // }; //to be reviewed

// user.virtual("fullName").get(function () {
//   return this.firstName + " " + this.lastName;
// });

// user.virtual("unreadCount").get(function () {
//   return this.unreadMessage.length;
// });

const Room = new mongoose.model("room", room);

module.exports = Room;