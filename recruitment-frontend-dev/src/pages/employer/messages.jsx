import React, { useState, useEffect } from "react";
import MessageList from "@/components/MessageList";
import ChatArea from "@/components/ChatArea";

const SAMPLE_MESSAGES = [
  "Hey, thanks for your interview...",
  "We want to invite you for a quick interview.",
  "Hi, sure I would love to. Thanks for taking the time to see my work!",
  "Looking forward to our meeting.",
  "Can you share your portfolio?",
  "Thank you for your time!",
];

function getRandomMessage(isSelf = false) {
  const text =
    SAMPLE_MESSAGES[Math.floor(Math.random() * SAMPLE_MESSAGES.length)];
  return {
    text,
    time: "3:40 PM",
    isSelf,
  };
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch users from randomuser.me
  useEffect(() => {
    setLoading(true);
    fetch("https://randomuser.me/api/?results=8")
      .then((res) => res.json())
      .then((data) => {
        const users = data.results.map((user, idx) => ({
          id: user.login.uuid,
          avatar: user.picture.medium,
          name: `${user.name.first} ${user.name.last}`,
          preview: getRandomMessage().text,
          time: "3:40 PM",
          unread: idx === 0, // First user is unread
          role: idx % 2 === 0 ? "Designer Candidate" : "Developer",
          messages: [
            getRandomMessage(false),
            getRandomMessage(false),
            getRandomMessage(true),
          ],
        }));
        setConversations(users);
        setSelectedId(users[0]?.id);
        setLoading(false);
      });
  }, []);

  // Filter conversations by search (name or preview)
  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.preview.toLowerCase().includes(search.toLowerCase())
  );

  const selectedConv =
    filteredConversations.find((c) => c.id === selectedId) ||
    filteredConversations[0];

  // Message sending logic
  const handleSend = () => {
    if (!input.trim() || !selectedConv) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConv.id
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  text: input,
                  time: timeString,
                  isSelf: true,
                },
              ],
              preview: input,
              time: timeString,
              unread: false,
            }
          : conv
      )
    );
    setInput("");
  };

  // When selecting a chat, mark as read
  const handleSelect = (id) => {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, unread: false } : conv))
    );
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="flex h-full">
      <MessageList
        conversations={filteredConversations}
        selectedId={selectedConv?.id}
        onSelect={handleSelect}
        search={search}
        onSearch={(e) => setSearch(e.target.value)}
      />
      {selectedConv && (
        <ChatArea
          user={selectedConv}
          messages={selectedConv.messages}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onSend={handleSend}
          onProfile={() => {}}
        />
      )}
    </div>
  );
}
