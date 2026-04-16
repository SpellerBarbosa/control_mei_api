import mongoose, { Schema } from "mongoose";
import { Roles } from "../common/constants.js";
import bcrypt from "bcrypt";

interface UserMethods{
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface UserDocument {
  username: string,
  password: string,
  role: "admin" | "user"
}

const userModel = new Schema<UserDocument, mongoose.Model<UserDocument, {}, UserMethods>,UserMethods>(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
      minlength: [3, "Minimo 3 caracateres"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Minimo 6 caracteres"],
      select: false
    },
    role: {
      type: String,
      default: "user",
      enum: Roles,
    },
  },
  {
    timestamps: true,
  },
);

userModel.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userModel.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userModel);
export default User;
