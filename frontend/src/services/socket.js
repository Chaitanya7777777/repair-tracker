import { io } from 'socket.io-client';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';

export const socket = io(SOCKET_URL, { autoConnect: false });

export function connectSocket() {
  if (!socket.connected) socket.connect();
}

export function joinTracking(trackingId) {
  if (!socket.connected) socket.connect();
  socket.emit('join_tracking', trackingId);
}
