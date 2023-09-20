import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface IModeratorInput {
  discordId: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isBanned: boolean;
  isDeleted: boolean;
  profilePicture: string;
}

export interface IModerator extends IModeratorInput, mongoose.Document {
  comparePassword: (password: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const ModeratorSchema = new mongoose.Schema(
  {
    discordId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    isBanned: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

ModeratorSchema.pre<IModerator>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

ModeratorSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const moderator = this as IModerator;

  return bcrypt
    .compare(candidatePassword, moderator.password)
    .catch((e) => false);
};

const ModeratorModel = mongoose.model<IModerator>("Moderator", ModeratorSchema);

export default ModeratorModel;
