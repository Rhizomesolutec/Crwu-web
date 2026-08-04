import mongoose from "mongoose";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env.local");
const env = readFileSync(envPath, "utf8");

for (const line of env.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const idx = trimmed.indexOf("=");
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  const value = trimmed.slice(idx + 1).trim();
  if (!process.env[key]) process.env[key] = value;
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI missing");
  process.exit(1);
}

try {
  await mongoose.connect(uri);
  const result = await mongoose.connection.db.admin().ping();
  console.log("MongoDB Atlas connection OK:", result);
  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1);
}
