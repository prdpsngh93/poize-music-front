"use client";

import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";
import { authAPI } from "../../../lib/api";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtistState] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Wrapper setter to also persist selectedArtist to localStorage
  const setSelectedArtist = (artist) => {
    setSelectedArtistState(artist);
    try {
      if (artist) {
        localStorage.setItem("selectedArtist", JSON.stringify(artist));
      } else {
        localStorage.removeItem("selectedArtist");
      }
    } catch (e) {
      // ignore localStorage errors
    }
  };

  // Restore selectedArtist from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("selectedArtist");
      if (saved) {
        setSelectedArtistState(JSON.parse(saved));
      }
    } catch (e) {
      // ignore errors
    }
  }, []);

  // Fetch current user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-info`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setCurrentUser(data);
      } catch (e) {
        console.error("Error fetching user:", e);
      }
    };
    fetchUserInfo();
  }, []);

  // Connect socket
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    const newSocket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
      auth: { token },
      reconnection: true,
    });
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  // Handle socket events
  useEffect(() => {
    if (!socket || !currentUser) return;

    const connectHandler = () => setIsConnected(true);
    const disconnectHandler = () => setIsConnected(false);
    const onlineUsersHandler = (users) => setOnlineUsers(users || {});
    
    const newMessageHandler = (msg) => {
      setMessages((prevMessages) => {
        // Robust duplicate check using multiple properties
        const isDuplicate = prevMessages.some(
          m => m.id === msg.id || 
               (m.sender_id === msg.sender_id && 
                m.receiver_id === msg.receiver_id && 
                m.content === msg.content && 
                Math.abs(new Date(m.createdAt) - new Date(msg.createdAt)) < 1000)
        );
        
        return isDuplicate ? prevMessages : [...prevMessages, msg];
      });
    };

    const messageReadHandler = ({ senderId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.sender_id === senderId && !msg.is_read ? { ...msg, is_read: true } : msg
        )
      );
    };

    socket.on("connect", connectHandler);
    socket.on("disconnect", disconnectHandler);
    socket.on("online_users", onlineUsersHandler);
    socket.on("new_message", newMessageHandler);
    socket.on("message_read", messageReadHandler);

    return () => {
      socket.off("connect", connectHandler);
      socket.off("disconnect", disconnectHandler);
      socket.off("online_users", onlineUsersHandler);
      socket.off("new_message", newMessageHandler);
      socket.off("message_read", messageReadHandler);
    };
  }, [socket, currentUser, selectedArtist]);

  // Fetch artists
// Fetch artists
useEffect(() => {
  const fetchArtists = async () => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const res = await authAPI.getArtist();  // ✅ use your new API wrapper
      setArtists(res?.artists || []);
    } catch (error) {
      console.error("Failed to load artists:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchArtists();
}, []);

  // Fetch messages on selectedArtist change
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedArtist) {
        setMessages([]);
        return;
      }

      try {
        const token = Cookies.get("token");
        if (!token) return;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/messages/conversation/${selectedArtist.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        setMessages(data || []);

        // Mark messages as read
        if (
          socket &&
          data.some((msg) => msg.sender_id === selectedArtist.id && !msg.is_read)
        ) {
          socket.emit("mark_read", selectedArtist.id);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedArtist, socket]);

  // Send message function
  const sendMessage = (content) => {
    if (!socket || !currentUser || !selectedArtist) return;
    
    // Only emit the message - no local state update
    socket.emit("send_message", {
      receiver_id: selectedArtist.user_id,
      content,
    });
  };

  return (
    <ChatContext.Provider
      value={{
        artists,
        selectedArtist,
        setSelectedArtist,
        messages,
        sendMessage,
        currentUser,
        isConnected,
        onlineUsers,
        loading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
