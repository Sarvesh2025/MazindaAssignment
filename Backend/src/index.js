import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/index.js";

dotenv.config();

const app = express();



app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

app.use(router);

app.listen(3002, () => console.log("Server up and running."));
