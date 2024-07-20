import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Components
import connect from "./database/connect.js";
import userRouter from "./routes/user-routes.js";
import postRouter from "./routes/post-routes.js";

// Initialization
const app = express();
dotenv.config();

app.use(cors({
  origin: 'https://blog-app-ft.onrender.com', // Correct origin without trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Middleware to parse JSON data
app.use(express.json());

// Connection
connect(process.env.MONGODB_URI || "");

// Health check route
app.get("/", (req, res) => {
  res.status(200).send("API is running.");
});

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[PASS] listening on port ${PORT}.`);
});
