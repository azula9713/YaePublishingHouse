import mongoose from "mongoose";

import logger from "./Logger";

const dbConnect = async () => {
  const dbUser = "yaemiko";
  const dbPassword = "yaemikoxshogun";
  const dbName = "genshinaio";
  const dbHost = "localhost";

  //   const dbUri = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
  const localUri = `mongodb://${dbHost}:27017/${dbName}`;
  try {
    await mongoose.connect(localUri);
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

export default dbConnect;
