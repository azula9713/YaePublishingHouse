import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import config from "config";

import SessionModel, { ISession } from "../models/Session.model";
import { signJWT, verifyJWT } from "../utils/Jwt.utils";
import { findModerator } from "./Moderator.service";

const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
};

const findSessionsByUser = async (query: FilterQuery<ISession>) => {
  return SessionModel.find(query).lean();
};

const updateSession = async (
  query: FilterQuery<ISession>,
  update: UpdateQuery<ISession>
) => {
  return SessionModel.updateOne(query, update);
};

const reIssueAccessToken = async (refreshToken: string) => {
  const { decoded } = verifyJWT(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session?.valid) return false;

  const user = await findModerator({ _id: session.user });

  if (!user) return false;

  return signJWT(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTTL") } // 15 minutes
  );
};

export { createSession, findSessionsByUser, updateSession, reIssueAccessToken };
