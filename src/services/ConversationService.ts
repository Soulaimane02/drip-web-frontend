import Conversation from "../Models/Conversation";
import Message from "../Models/Message";
import { User } from "../Models/User";
import { api } from "../utils/base_url_api";
import { fetchUser, fetchUserOrSellerById } from "./UserService";

export const fetchConversations = async (userId: string, token: string): Promise<Conversation[]> => {
  try {
    const response = await fetch(`${api}/conversations/user/${userId}` ,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error("Internal server error");
    }

    const conversations: Conversation[] = await response.json();
    return conversations;
  }
  catch (error) {
    throw new Error("Internal server error");
  }
}

export const fetchConversationLastMessage = async (conversationId: string, token: string): Promise<Message> => {
  try {
    const response = await fetch(`${api}/messages/conversation/${conversationId}/last`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error("Internal server error");
    }

    const lastMessage: Message = await response.json();
    return lastMessage;
  }
  catch (error) {
    throw new Error("Internal server error");
  }
}

export const getConversationOtherUser = async (conversation: Conversation, userId: string, token: string): Promise<User> => {
  const firstUserId = conversation.firstUserId;
  const secondUserId = conversation.secondUserId;
  let otherUser: User;

  if (firstUserId === userId) {
    otherUser = await fetchUserOrSellerById(conversation.secondUserId, token) as User;
  }
  else if (secondUserId === userId) {
    otherUser = await fetchUserOrSellerById(conversation.firstUserId, token) as User;
  }
  else {
    throw new Error("User not found in conversation");
  }
  return otherUser;
}
