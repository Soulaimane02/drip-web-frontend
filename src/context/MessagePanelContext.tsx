import React, { createContext, useContext, useState, ReactNode } from 'react';
import MessagePanel from '../components/MessagePanel/MessagePanel';

interface MessagePanelContextType {
  isMessagePanelOpen: boolean;
  toggleMessagePanel: () => void;
}

const MessagePanelContext = createContext<MessagePanelContextType | undefined>(undefined);

export const MessagePanelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMessagePanelOpen, setIsMessagePanelOpen] = useState(false);

  const toggleMessagePanel = () => {
    setIsMessagePanelOpen(prev => !prev);
  };

  return (
    <MessagePanelContext.Provider value={{ isMessagePanelOpen, toggleMessagePanel }}>
      {children}
      {isMessagePanelOpen && (
        <div className="message-panel-wrapper">
          <MessagePanel isVisible={isMessagePanelOpen} />
        </div>
      )}
    </MessagePanelContext.Provider>
  );
};

export const useMessagePanel = () => {
  const context = useContext(MessagePanelContext);
  if (context === undefined) {
    throw new Error('useMessagePanel must be used within a MessagePanelProvider');
  }
  return context;
};
