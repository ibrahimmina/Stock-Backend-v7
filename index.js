import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import  express from express;

const app = express();

//const __dirname = path.resolve();

// Deployment configuration
//configure env file in dev mode
//dotenv.config();

// configure env file in production
//if (process.env.NODE_ENV === undefined) {
//  dotenv.config({ path: "../.env" });
//}

// Connect to database
connectDB();



// Body parser
app.use(express.json());

// CORS
//app.use(
//  cors({
//    origin: "*",
//  })
//);

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// API routes
app.use("/api/user", userRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;