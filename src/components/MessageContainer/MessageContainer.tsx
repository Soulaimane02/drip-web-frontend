import React from "react";
import "./MessageContainer.css";

interface MessageContainerProps {
  profilePicture: string;
  name: string;
  lastMessage: string;
  date: string;
  isRead: boolean;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ profilePicture, name, lastMessage, date, isRead }) => {
  return (
    <div className={`message-container ${isRead ? "" : "unread"}`}>
      <img src={profilePicture} alt={`${name} profile`} className="message-profile-picture" />
      <div className="message-info">
        <div className="message-top-row">
          <span className="message-username">{name}</span>
          <span className="message-date">{date}</span>
        </div>
        <div className="message-bottom-row">
          <span className="last-message">{lastMessage}</span>
          {!isRead && <span className="unread-dot" />}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
