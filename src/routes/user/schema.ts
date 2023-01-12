import mongoose, { Document } from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
  refreshTokens: { token: string }[];
}

const UserSchema = new Schema(
  {
    name: { type: String, required: [true, "Please tell us your name!"] },
    surname: { type: String },
    email: {
      type: String,
      required: [true, "Please tell us your email!"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Please tell us your password!"],
      minlength: [8, "Password is too short!"],
    },
    role: { type: String, default: "User", enum: ["Admin", "User"] },
    refreshTokens: [{ token: { type: String } }],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (this: User, next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  if (user.isModified("password")) {
    user.password = hash;
  }
  next();
});

UserSchema.statics.findByCredentials = async function (email: string, password: string): Promise<User | null> {
  const user = await this.findOne({ email });

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return user;
    else return null;
  } else {
    return null;
  }
};

UserSchema.methods.toJSON = function (this: User) {
  const user = this;
  const userObject = user.toObject();
  delete userObject.__v;
  delete userObject.refreshTokens;
  delete userObject.createdAt;
  return userObject;
};

export default mongoose.model<User>("User", UserSchema);