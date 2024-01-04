const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// const { stringify } = require("querystring");

const user = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      validate: [
        validator.isAlpha,
        "Only characters are allowed as Name,{VALUE}",
      ],
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
      type: Double,
      default: null,
      trim: true,
      required: [true, "Please provide a Price"],
    },
    size: {
      type: Integer,
      default: null,
      trim: true,
      required: [true, "Please provide a Size"],
    },
    capacity: {
      type: Integer,
      default: 1,
      trim: true,
      validate: [
        validator.isAlphanumeric,
        "Only letters and numbers are allowed as password",
      ],
      required: [true, "Please provide a Capacity"],
    },
    available:{
        type:Boolean,
        default:true,
    },
    reservation:{
        by:{
            name:{
                type:String,
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
    },
    checkIn:{
        type:Date,
        default:Date.now()
    },
    checkOut:{
        type:Date,
        default:Date.now()
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
    images: {
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
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    active: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      default: null,
    },
    extras:[ {
        type: String,
        default: null,
    }],
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
      default: undefined,
    },
    passwordResetExpires: {
      type: Date,
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

user.pre("save", function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      // user.passwordConfirm = hash;
      next();
    });
  });
});

user.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

user.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(this.passwordChangedAt, JWTTimestamp);

    return JWTTimestamp < changedTimeStamp;
  }
  return false;
};

user.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // console.log({
  //   resetToken
  // }, this.passwordResetToken)

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// user.toggleMessage = function (id) {
//   this.unreadMessage.shift(id);
//   this.save();
//   return this;
// };

// user.methods.toggleMessageCount = function (unreadCount) {
//   this.messageCount = unreadCount;
//   this.save();
//   return this;
// }; //to be reviewed

user.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

// user.virtual("unreadCount").get(function () {
//   return this.unreadMessage.length;
// });

const User = new mongoose.model("user", user);

module.exports = User;