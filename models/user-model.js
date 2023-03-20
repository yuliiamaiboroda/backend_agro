const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    surname: {
      type: String,
      required: [true, "surname is required"],
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Set password for user"],
    },

    role: {
      type: String,
      enum: ["admin", "applyManager", "servicesManager", "productsManager"],
      default: "starter",
    },

    sessionKey: {
      type: String,
      default: null,
      trim: true,
    },
  },

  {
    versionKey: false,
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

userSchema.index({ email: 1 });

const UserModel = mongoose.model("users", userSchema);

module.exports = {
  UserModel,
};
