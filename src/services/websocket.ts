import { io, Socket } from "socket.io-client";
import { store } from "../store";
import {
  updateStreamingMessage,
  startStreaming,
} from "../store/slices/chatSlice";
import { v4 as uuidv4 } from "uuid";

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private sessionId: string | null = null;

  connect(sessionId: string) {
    const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL as string;
    this.sessionId = sessionId;
    // sessionId = localStorage.getItem('sessionId') as string;

    if (!sessionId) {
      console.warn("No auth token found, cannot connect to WebSocket");
      return;
    }

    this.socket = io(WEBSOCKET_URL, {
      transports: ["websocket", "polling"],
      query: {
        sessionId,
      },
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Connected to WebSocket server",this.socket?.id);
      this.reconnectAttempts = 0;
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected from WebSocket server:", reason);
      if (reason === "io server disconnect") {
        // Server disconnected, try to reconnect
        this.reconnect();
      }
    });

    this.socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
      this.reconnect();
    });

 // Listen for AI response from backend
    this.socket.on("chat:message:received", (data: { aiText: string; sources?: string }) => {
      const messageId = uuidv4();
      store.dispatch(startStreaming(messageId));
      store.dispatch(updateStreamingMessage({
        id: messageId,
        content: data.aiText,
        isComplete: true,
      }));
    });

     this.socket.on("chat:error", (error: any) => {
      console.error("⚠️ WebSocket error:", error);
    });
  }

  private reconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000; 

      setTimeout(() => {
        console.log(
          `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
        );
        this?.connect(this?.sessionId as string);
      }, delay);
    } else {
      console.error("Max reconnection attempts reached");
    }
  }
  sendMessage(content: string) {
      if (this.socket?.connected && this.sessionId) {
      
        this.socket.emit("chat:send:message", content);
      }
    }

    disconnect() {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
    }
  
    isConnected(): boolean {
      return this.socket?.connected || false;
    }
  joinSession(sessionId: string) {
    if (this.socket?.connected) {
      this.socket.emit("join:session", { sessionId });
    }
  }

  leaveSession(sessionId: string) {
    if (this.socket?.connected) {
      this.socket.emit("leave:session", { sessionId });
    }
  }

}

export const websocketService = new WebSocketService();
