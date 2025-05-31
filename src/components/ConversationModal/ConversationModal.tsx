import React, { useState, useEffect } from 'react';
import './ConversationModal.css';

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    profilePicture: string;
  };
  timestamp: string;
  isRead: boolean;
}

interface ConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
}

const ConversationModal: React.FC<ConversationModalProps> = ({
  isOpen,
  onClose,
  conversationId
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: '1',
          content: 'Bonjour, je suis intéressé par votre article.',
          sender: {
            id: '1',
            name: 'Jean Dupont',
            profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          timestamp: '2024-03-09T10:00:00',
          isRead: true
        },
        {
          id: '2',
          content: 'Bonjour ! Oui, l\'article est toujours disponible.',
          sender: {
            id: '2',
            name: 'Vous',
            profilePicture: 'https://randomuser.me/api/portraits/men/33.jpg'
          },
          timestamp: '2024-03-09T10:05:00',
          isRead: true
        }
      ]);
    }
  }, [isOpen, conversationId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: '2',
        name: 'Vous',
        profilePicture: 'https://randomuser.me/api/portraits/men/33.jpg'
      },
      timestamp: new Date().toISOString(),
      isRead: false
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>

        <div className="conversation-header">
          <div className="conversation-user-info">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Profile" 
              className="conversation-profile-picture"
            />
            <div className="conversation-user-details">
              <h2>Jean Dupont</h2>
              <span className="conversation-status">En ligne</span>
            </div>
          </div>
        </div>

        <div className="messages-container">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender.id === '2' ? 'message-sent' : 'message-received'}`}
            >
              <div className="message-content">
                <p>{message.content}</p>
                <span className="message-timestamp">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="message-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="message-input"
          />
          <button type="submit" className="send-button">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConversationModal; 