import mongoose from "mongoose";
import { IModerator } from "./Moderators.model";

export interface ISession extends mongoose.Document {
  user: IModerator["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Moderator" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<ISession>("Session", sessionSchema);

export default SessionModel;
