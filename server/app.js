import express from "express";
import dotenv from "dotenv";
import Post from "./routes/postRoute.js";
import User from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "server/config/config.env" });
}

// middlewares
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
// importing routes
app.use("/api/v1", Post);
app.use("/api/v1", User);


// Deploy to Server
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

export { app };
