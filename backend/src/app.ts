// Updated app.ts - NO raw-body package needed
import express from "express";
// import { toNodeHandler } from "better-auth/node";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";
// import api from "./api";
import MessageResponse from "./interfaces/MessageResponse";
// import { auth } from "./modules/auth/config/auth";

require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);


// General JSON middleware for all other routes
app.use(express.json());

app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "Health check 👋🌎🌍🌏",
  });
});

// app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
