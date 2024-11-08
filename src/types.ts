export interface Message {
  id: string;
  content: string;
  sender: string;
  recipient: string;
  timestamp: Date;
  type: 'text' | 'image' | 'video';
  status: 'sending' | 'sent' | 'error';
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
}