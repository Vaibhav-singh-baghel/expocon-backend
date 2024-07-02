import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import badgeRouter from "./routes/badge.routes.js";
import certificateRouter from "./routes/certificate.routes.js";
import scanRouter from "./routes/scan.routes.js";
import stateRouter from "./routes/state.routes.js";
import countryRouter from "./routes/country.routes.js";
import howUsRouter from "./routes/howUs.routes.js";
import eventRouter from "./routes/event.routes.js";
import notAllowedRouter from "./routes/notAllowed.routes.js";
import attendeeRouter from "./routes/attendee.routes.js";
import colors from "colors";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/badge", badgeRouter);
app.use("/api/v1/certificate", certificateRouter);
app.use("/api/v1/scan", scanRouter);
app.use("/api/v1/state", stateRouter);
app.use("/api/v1/country", countryRouter);
app.use("/api/v1/howUs", howUsRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/notAllowed", notAllowedRouter);
app.use("/api/v1/attendee", attendeeRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`<h1>Server is running</h1>`);
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests".bgGreen);
  });
});
