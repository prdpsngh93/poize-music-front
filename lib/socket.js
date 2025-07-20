// lib/socket.js
import { io } from "socket.io-client";
import Cookies from "js-cookie";

let socket;

export const initSocket = () => {
  const token = Cookies.get("token");

  if (!token) {
    console.warn("No token found in cookies");
    return;
  }

  socket = io("http://localhost:5000", {
    auth: {
      token: `Bearer ${token}`,
    },
  });

  return socket;
};

export const getSocket = () => socket;

