// backend/src/index.js
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

// In-memory store
const jobs = {}; // trackingId -> job

// simple utils
const { generateTrackingId } = require('./utils/trackingId');
const notifier = require('./services/notifier');

// Routes (mount)
const jobsRouter = require('./routes/jobs')(jobs, notifier);
app.use('/api/jobs', jobsRouter);

// Create HTTP server & Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

// Attach io to notifier so controllers can emit
notifier.init(io);

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join_tracking', (trackingId) => {
    const room = `tracking:${trackingId}`;
    socket.join(room);
    console.log(`Socket ${socket.id} joined ${room}`);
  });

  socket.on('disconnect', () => {
    // console.log('Socket disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
