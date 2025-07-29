'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

const ArtistList = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState({ success: false, error: null });
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const messageEndRef = useRef(null);

  // Load current user using token
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const res = await fetch("https://poize-music-backend-kn0u.onrender.com/api/user-info", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if response is JSON
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error(`Expected JSON but got ${contentType}`);
        }

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch user");
        }

        const user = await res.json();
        setCurrentUser(user);
      } catch (err) {
        console.error("Error fetching user info", err);
      }
    };

    fetchUserInfo();
  }, []);

  // Connect to socket
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;

    const newSocket = io("https://poize-music-backend-kn0u.onrender.com", {
      auth: { token },
      reconnection: true,
    });

    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (!socket || !currentUser) return;

    const connectHandler = () => setIsConnected(true);
    const disconnectHandler = () => setIsConnected(false);
    const errorHandler = (e) => console.error("Socket error:", e);
    const onlineUsersHandler = (users) => setOnlineUsers(users || {});

    const newMessageHandler = (msg) => {
      // Only add message if it's not from the current user
      if (msg.sender_id !== currentUser.id) {
        if (selectedArtist &&
          (msg.sender_id === selectedArtist.id ||
            msg.receiver_id === selectedArtist.id)) {
          setMessages((prev) => [...prev, msg]);
        }
      }
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
    socket.on("error", errorHandler);
    socket.on("online_users", onlineUsersHandler);
    socket.on("new_message", newMessageHandler);
    socket.on("message_read", messageReadHandler);

    return () => {
      socket.off("connect", connectHandler);
      socket.off("disconnect", disconnectHandler);
      socket.off("error", errorHandler);
      socket.off("online_users", onlineUsersHandler);
      socket.off("new_message", newMessageHandler);
      socket.off("message_read", messageReadHandler);
    };
  }, [socket, selectedArtist, currentUser]);

  // Fetch artists
  useEffect(() => {
    const fetchArtists = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token available for artist fetch");
        return;
      }

      try {
        const res = await fetch("https://poize-music-backend-kn0u.onrender.com/api/artists", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check response content type
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error(`Expected JSON but got ${contentType}`);
        }

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch artists");
        }

        const data = await res.json();
        setArtists(data.artists || []);
      } catch (err) {
        console.error("Failed to fetch artists", err);
        setSendStatus({
          success: false,
          error: "Failed to load artists. Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedArtist) return;

      try {
        const token = Cookies.get("token");
        console.log("token", token)
        if (!token) {
          console.error("No token available for messages fetch");
          return;
        }

        // Fixed URL pattern to match server route
        const res = await fetch(
          `https://poize-music-backend-kn0u.onrender.com/api/messages/conversation/${selectedArtist.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("res", res)

        // Check response content type
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error(`Expected JSON but got ${contentType}`);
        }

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch messages");
        }

        const json = await res.json();
        setMessages(json || []);

        // Mark as read
        if (
          socket &&
          json.some(
            (msg) => msg.sender_id === selectedArtist.id && !msg.is_read
          )
        ) {
          socket.emit("mark_read", selectedArtist.id);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
        setSendStatus({
          success: false,
          error: "Failed to load messages. Please try again later."
        });
      }
    };

    fetchMessages();
  }, [selectedArtist, socket]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !currentUser || !selectedArtist) return;

    const token = Cookies.get("token");
    const tempId = Date.now();
    const tempMessage = {
      id: tempId,
      content: message,
      sender_id: currentUser.id,
      receiver_id: selectedArtist.id,
      createdAt: new Date(),
      is_read: false,
    };

    setMessage("");
    setIsSending(true);

    try {
      if (socket) {
        socket.emit("send_message", {
          receiver_id: selectedArtist.id,
          content: message,
        });
      }


    } catch (err) {
      console.error("Send error", err);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      setSendStatus({
        success: false,
        error: err.message || "Failed to send message"
      });
    } finally {
      setIsSending(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading artists...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Artists</h2>
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-sm">{isConnected ? "Online" : "Offline"}</span>
        </div>
      </div>

      {selectedArtist ? (
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">{selectedArtist.name}</h3>
            <button
              onClick={() => setSelectedArtist(null)}
              className="text-gray-400 text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="border p-3 rounded h-80 overflow-y-auto bg-gray-50 mb-3">
            {messages.map((msg) => {
              const isSent = msg.sender_id === currentUser?.id;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`p-2 my-1 rounded max-w-xs text-sm flex flex-col shadow-sm
          ${isSent
                        ? "bg-blue-600 text-white rounded-br-none"  // Sent message (right)
                        : "bg-gray-200 text-gray-800 rounded-bl-none" // Received message (left)
                      }`}
                  >
                    <p>{msg.content}</p>
                    <div className={`text-xs mt-1 opacity-70 ${isSent ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.createdAt).toLocaleTimeString()}
                      {isSent && (msg.is_read ? " ✓✓" : " ✓")}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef}></div>
          </div>

          {sendStatus.error && (
            <div className="mb-3 p-2 bg-red-100 text-red-700 rounded text-sm">
              {sendStatus.error}
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={2}
              className="flex-1 border p-2 rounded"
              placeholder={`Message ${selectedArtist.name}...`}
              disabled={isSending}
            />
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded ${isSending ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
              disabled={isSending || !message.trim()}
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-6">Select an artist to chat</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="bg-white p-4 rounded shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{artist.name}</h3>
            <p className="text-sm text-gray-500">{artist.email}</p>
            <p className="text-sm">
              Status:{" "}
              <span className={onlineUsers[artist.id] ? "text-green-600" : "text-gray-400"}>
                {onlineUsers[artist.id] ? "Online" : "Offline"}
              </span>
            </p>
            <p className="text-sm">
              Profile: {artist.is_profile_complete ? "✅ Complete" : "❌ Incomplete"}
            </p>
            <button
              onClick={() => setSelectedArtist(artist)}
              className="mt-3 w-full py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;