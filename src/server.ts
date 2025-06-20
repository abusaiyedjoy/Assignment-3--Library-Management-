import mongoose from "mongoose";
import app from "./app";
import { Server } from "http";

let server: Server;

const PORT = process.env.PORT || 3000;

 async function main() {
  try {
    await mongoose.connect("mongodb+srv://Note-App:noteapp@cluster0.dgixmli.mongodb.net/Note-App?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB connected");
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
main()