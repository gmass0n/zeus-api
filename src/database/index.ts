import * as mongoose from "mongoose";

export function startDatabase(): void {
  console.log("🛸 Starting database...");

  mongoose.connect(process.env.MONGODB_URI, (error) => {
    if (!!error) {
      console.log("🚫 Database not started successfully.", error);
    } else {
      console.log("📦 Database started successfully.");
    }
  });
}
