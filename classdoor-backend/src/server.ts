import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import cookieParser from 'cookie-parser';
import connectCloudinary from './config/cloudinary.js';
import authRouter from './routes/auth.route.js';
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
app.use(cors());
app.use(express.json());
app.use(cookieParser());


//API endpoints
app.use("/api/auth",authRouter);

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
