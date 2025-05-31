import React, { useEffect, useState } from "react";
import MessageContainer from "../MessageContainer/MessageContainer";
import ConversationModal from "../ConversationModal/ConversationModal";
import "./MessagePanel.css";
import { toast } from "sonner";
import { User } from "../../Models/User";
import { fetchUser } from "../../services/UserService";
import { fetchConversationLastMessage, fetchConversations, getConversationOtherUser } from "../../services/ConversationService";
import Conversation from "../../Models/Conversation";
import Message from "../../Models/Message";

interface MessagePanelProps {
  isVisible: boolean;
}

const MessagePanel: React.FC<MessagePanelProps> = ({ isVisible }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationsUserDatas, setConversationsUserDatas] = useState<{ conversation: Conversation, lastMessage: Message, otherUser: User }[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [user, setUser] = useState<User>();
  const token = localStorage.getItem("token");

  const handleConversationClick = (conversationId: string) => {
    setSelectedConversation(conversationId);
  };

  const handleCloseModal = () => {
    setSelectedConversation(null);
  };

  useEffect(() => {
    const fetchAllConversations = async () => {
      try {
        const user = await fetchUser(token!) as User;
        const conversations = await fetchConversations(user.id, token!);
        setConversations(conversations);

        const conversationMessages = await Promise.all(
          conversations.map(async (conversation) => {
            const lastMessage = await fetchConversationLastMessage(conversation.id, token!);
            const otherUser = await getConversationOtherUser(conversation, user?.id!, token!);
            return { conversation, lastMessage, otherUser };
          })
        );
        setConversationsUserDatas(conversationMessages);
      }
      catch (error) {
        toast.error("Error fetching conversations. Please try again later.");
      }
    };

    fetchAllConversations();
  }, []);

  return (
    <div className="MessagePanel">
      <div className={`message-panel ${isVisible ? "slide-in" : "slide-out"}`}>
        {conversations.length === 0 ? (
          <div className="no-conversation">
            <div className="no-conversation-icon">💬</div>
            <p>Aucune conversation trouvée</p>
          </div>
        ) : (
          conversationsUserDatas.map((conversationUserData, index) => (
            <div key={index} onClick={() => handleConversationClick(conversationUserData.conversation.id)}>
              <MessageContainer
                lastMessage={conversationUserData.lastMessage}
                otherUser={conversationUserData.otherUser}
                isRead={true}
              />
            </div>
          ))
        )}
      </div>

      {selectedConversation && (
        <ConversationModal
          isOpen={!!selectedConversation}
          onClose={handleCloseModal}
          conversationId={selectedConversation}
        />
      )}
    </div>
  );
};

export default MessagePanel;
