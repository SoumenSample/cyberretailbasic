import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    emailVerifiedAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date, default: null },
    lastLoginIp: { type: String, default: null },
    twoFactorEnabled: { type: Boolean, default: false },
    passwordChangedAt: { type: Date, default: null },
    globalRole: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "ADMIN",
    },
  },
  { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof UserSchema> & {
  _id: mongoose.Types.ObjectId;
};

const existingModel = (mongoose.models ?? {}).User as
  | Model<UserDocument>
  | undefined;

export const UserModel =
  existingModel ?? mongoose.model<UserDocument>("User", UserSchema);
