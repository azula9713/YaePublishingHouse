import { omit } from "lodash";
import { FilterQuery } from "mongoose";

import UserModel, {
  IModerator,
  IModeratorInput,
} from "../models/Moderators.model";
import logger from "../utils/Logger";

const createModerator = async (input: IModeratorInput) => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), ["password"]);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const validateModerator = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return false;
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return false;
    }
    return omit(user.toJSON(), ["password"]);
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

const findModerator = async (query: FilterQuery<IModerator>) => {
  return UserModel.findOne(query, { password: 0 }).lean();
};

export { createModerator, validateModerator, findModerator };
