import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import cloudinary from "cloudinary";

// MongoDB Database
connectDB();

// Cloudinar Congif
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
