import mongoose, { Schema } from "mongoose";

const uesrSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  phoneNumber: { type: Number, default: null },
  profilePicture: { type: String, default: "" },
  shippingAddress: { type: String, default: "" },
  gender: { type: String, enum: ["male", "femail", "others", ""], default: "" },
  dateOfBirth: { type: Date },
  accountStatus: {
    type: String,
    enum: ["active", "non-active"],
    default: "active",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", uesrSchema);
export default UserModel;
