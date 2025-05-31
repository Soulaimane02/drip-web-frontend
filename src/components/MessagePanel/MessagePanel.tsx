import React, { useState } from "react";
import MessageContainer from "../MessageContainer/MessageContainer";
import ConversationModal from "../ConversationModal/ConversationModal";
import "./MessagePanel.css";

const messages = [
  {
    id: "1",
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
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  const handleConversationClick = (conversationId: string) => {
    setSelectedConversation(conversationId);
  };

  const handleCloseModal = () => {
    setSelectedConversation(null);
  };

  return (
    <>
      <div className={`message-panel ${isVisible ? "slide-in" : "slide-out"}`}>
        {messages.map((msg, index) => (
          <div key={index} onClick={() => handleConversationClick(msg.id)}>
            <MessageContainer {...msg} />
          </div>
        ))}
      </div>

      {selectedConversation && (
        <ConversationModal
          isOpen={!!selectedConversation}
          onClose={handleCloseModal}
          conversationId={selectedConversation}
        />
      )}
    </>
  );
};

export default MessagePanel;
