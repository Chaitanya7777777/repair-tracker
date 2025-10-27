// backend/src/services/notifier.js
let ioInstance = null;

function init(io) {
  ioInstance = io;
}

function emitStatusUpdate(trackingId, payload) {
  if (!ioInstance) return;
  const room = `tracking:${trackingId}`;
  ioInstance.to(room).emit('status_update', payload);
}

module.exports = { init, emitStatusUpdate };
