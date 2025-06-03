import mongoose from "mongoose";

export async function openMongoConnection(
  uri: string
): Promise<void> {
  try {
    await mongoose.connect(uri);
    console.info("MongoDb connection established");
  } catch (err) {
    console.error(err, "MongoDb connection failed");
    throw err;
  }
}
