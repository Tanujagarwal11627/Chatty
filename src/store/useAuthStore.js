import { create } from "zustand";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:7000"; // WebSocket server URL

export const useAuthStore = create((set, get) => ({
  authUser: { _id: "12345", name: "Guest User" }, // Temporary user
  isCheckingAuth: false,
  socket: null,

  checkAuth: () => {
    console.log("Auth check completed");
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || (socket && socket.connected)) return;

    const newSocket = io(SOCKET_URL);
    newSocket.connect();

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
