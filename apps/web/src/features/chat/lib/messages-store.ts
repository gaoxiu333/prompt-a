import { create } from 'zustand';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  createdAt: Date;
  status?: 'pending' | 'done' | 'error';
}

interface MessagesState {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
  updateMessageStatus: (id: string, status: Message['status']) => void;
  clearMessages: () => void;
}
// mock data
const _messages: Message[] = [
  {
    id: crypto.randomUUID(),
    role: 'system',
    content: '你是一只可爱的小猫咪',
    createdAt: new Date(),
  },
];

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: _messages,

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        },
      ],
    })),

  updateMessageStatus: (id, status) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, status } : msg,
      ),
    })),

  clearMessages: () => set({ messages: [] }),
}));
