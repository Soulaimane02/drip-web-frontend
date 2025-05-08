import React, { useEffect, useState } from "react";
import MessageContainer from "../MessageContainer/MessageContainer";
import "./MessagePanel.css";

const messages = [
  {
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Test",
    lastMessage: "test",
    date: "Today",
    isRead: false,
  },
];

interface MessagePanelProps {
  isVisible: boolean;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ isVisible }) => {
  return (
    <div className={`message-panel ${isVisible ? "slide-in" : "slide-out"}`}>
      {messages.map((msg, index) => (
        <MessageContainer key={index} {...msg} />
      ))}
    </div>
  );
};

export default MessagePanel;
