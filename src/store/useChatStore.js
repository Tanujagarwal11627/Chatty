import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],

  sendMessage: (messageText) => {
    const socket = useAuthStore.getState().socket;
    if (!socket) {
      toast.error("WebSocket connection not established");
      return;
    }

    const messageData = {
      text: messageText,
      userId: useAuthStore.getState().authUser?._id,
    };

    socket.emit("message", messageData);
  },

  listenForMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("message", (newMessage) => {
      set({ messages: [...get().messages, newMessage] });
    });
  },

  stopListeningForMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("message");
  },
}));
