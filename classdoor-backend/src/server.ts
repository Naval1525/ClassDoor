import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server as SocketIOServer } from "socket.io";
import cookieParser from "cookie-parser";
import connectCloudinary from "./config/cloudinary.js";
import authRouter from "./routes/auth.route.js";
import professorsRouter from "./routes/professor.route.js";
import collegeRouter from "./routes/college.route.js";
import coursesRouter from "./routes/course.route.js";
import reviewsRouter from "./routes/reviews.route.js";
import trendingRoutes from './routes/trending.routes.js';


// Load environment variables
dotenv.config();

//connect to cloudinary
connectCloudinary();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//API endpoints
app.use("/api/auth", authRouter);
app.use("/api/professor", professorsRouter);
app.use("/api/college", collegeRouter);
app.use("/api/course", coursesRouter);
app.use("/api/reviews", reviewsRouter);
app.use('/api/trending', trendingRoutes);

// Routes
app.get("/", (_req, res) => {
  res.send("🚀 Classdoor backend is up and running!");
});

// Socket.IO setup
io.on("connection", (socket) => {
  console.log(`🟢 New socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`🔴 Socket disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🌐 Server is listening on port ${PORT}`);
});
