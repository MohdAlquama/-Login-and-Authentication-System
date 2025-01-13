import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import MongoDB from "./models/db.js";
import router from "./routes/userRouter.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
dotenv.config(); // Load environment variables from a .env file

const app = express();
const PORT = process.env.PORT || 5000;

// Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 10, // each IP can make up to 10 requests per `windowsMs`
  standardHeaders: true, // add the `RateLimit-*` headers to the response
  legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
});


// Middleware


app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS for cross-origin requests
app.use(limiter); // Apply rate limiting
app.use(helmet()); 
// Connect to MongoDB
MongoDB({
  url: process.env.MONGO_DB_URL,
});

// Sample Route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// User Router
app.use('/user', router);

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
