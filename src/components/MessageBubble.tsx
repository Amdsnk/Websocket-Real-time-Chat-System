import React from 'react';
import { format } from 'date-fns';
import { CheckCheck } from 'lucide-react';
import { Message } from '../types';

interface Props {
  message: Message;
  isOwn: boolean;
  senderName: string;
}

export const MessageBubble: React.FC<Props> = ({ message, isOwn, senderName }) => {
  const bubbleClass = isOwn
    ? 'bg-blue-600 text-white ml-auto'
    : 'bg-gray-200 text-gray-900';

  return (
    <div className={`max-w-[70%] ${isOwn ? 'ml-auto' : 'mr-auto'}`}>
      {!isOwn && (
        <span className="text-sm text-gray-600 ml-2 mb-1 block">
          {senderName}
        </span>
      )}
      <div className={`rounded-lg p-3 ${bubbleClass}`}>
        {message.type === 'image' && (
          <img
            src={message.content}
            alt="Shared image"
            className="rounded-lg max-w-full mb-2"
          />
        )}
        {message.type === 'video' && (
          <video
            src={message.content}
            controls
            className="rounded-lg max-w-full mb-2"
          />
        )}
        {message.type === 'text' && <p className="break-words">{message.content}</p>}
        <div className="flex items-center justify-end gap-1 mt-1 text-xs opacity-70">
          <span>{format(new Date(message.timestamp), 'HH:mm')}</span>
          {isOwn && message.status === 'sent' && (
            <CheckCheck className="w-4 h-4" />
          )}
        </div>
      </div>
    </div>
  );
};