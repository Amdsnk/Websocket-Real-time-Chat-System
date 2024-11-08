import { create } from 'zustand';
import { Message, User } from './types';

interface ChatStore {
  messages: Message[];
  currentUser: User | null;
  addMessage: (message: Message) => void;
  setCurrentUser: (user: User) => void;
  initializeMessages: (messages: Message[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  currentUser: null,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setCurrentUser: (user) => set({ currentUser: user }),
  initializeMessages: (messages) => set({ messages }),
}));