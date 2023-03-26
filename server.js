import path from "path";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const __dirname = path.resolve();

// Deployment configuration
//configure env file in dev mode
dotenv.config();

// configure env file in production
//if (process.env.NODE_ENV === undefined) {
//  dotenv.config({ path: "../.env" });
//}

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// CORS
app.use(
  cors({
    origin: "*",
  })
);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// API routes
app.use("/api/user", userRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in mode on port http://localhost:${PORT}`
      .yellow.bold
  )
);
