import React, { useState, useRef } from 'react';
import { Image, Send, Video } from 'lucide-react';
import { useChatStore } from '../store';

interface Props {
  selectedUserId: string;
}

export const MessageInput: React.FC<Props> = ({ selectedUserId }) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const addMessage = useChatStore((state) => state.addMessage);
  const currentUser = useChatStore((state) => state.currentUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentUser) return;

    addMessage({
      id: Date.now().toString(),
      content: message,
      sender: currentUser.id,
      recipient: selectedUserId,
      timestamp: new Date(),
      type: 'text',
      status: 'sent'
    });

    setMessage('');
  };

  const handleFileUpload = (type: 'image' | 'video') => {
    const input = type === 'image' ? fileInputRef.current : videoInputRef.current;
    input?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    // In a real app, you'd upload to a server and get a URL back
    const fakeUrl = URL.createObjectURL(file);
    
    addMessage({
      id: Date.now().toString(),
      content: fakeUrl,
      sender: currentUser.id,
      recipient: selectedUserId,
      timestamp: new Date(),
      type,
      status: 'sent'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e, 'image')}
          className="hidden"
        />
        <input
          type="file"
          accept="video/*"
          ref={videoInputRef}
          onChange={(e) => handleFileChange(e, 'video')}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => handleFileUpload('image')}
          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <Image className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => handleFileUpload('video')}
          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
        >
          <Video className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-2 text-blue-600 hover:text-blue-800 transition-colors disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};