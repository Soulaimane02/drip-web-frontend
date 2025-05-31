import React from "react";
import "./MessageContainer.css";
import { User } from "../../Models/User";
import Message from "../../Models/Message";
import { formatDate } from "../../utils/date";

interface MessageContainerProps {
  lastMessage: Message;
  otherUser: User;
  isRead: boolean;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ lastMessage, otherUser, isRead }) => {
  const formattedDate = formatDate(new Date(lastMessage.createdAt));

  return (
    <div className={`message-container ${isRead ? "" : "unread"}`}>
      <img src={otherUser.profilePicture} alt={`${otherUser.firstName} ${otherUser.lastName} profile`} className="message-profile-picture" />
      <div className="message-info">
        <div className="message-top-row">
          <span className="message-username">{`${otherUser.firstName} ${otherUser.lastName}`}</span>
          <span className="message-date">{formattedDate}</span>
        </div>
        <div className="message-bottom-row">
          <span className="last-message">{lastMessage.content}</span>
          {!isRead && <span className="unread-dot" />}
        </div>
      </div>
    </div>
  );
};

export default MessageContainer;
