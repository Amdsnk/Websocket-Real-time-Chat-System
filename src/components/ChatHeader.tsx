import React from 'react';
import { MessageSquare } from 'lucide-react';
import { User } from '../types';

interface Props {
  otherUser: User;
}

export const ChatHeader: React.FC<Props> = ({ otherUser }) => {
  return (
    <div className="flex items-center gap-3 p-4 border-b bg-white">
      <MessageSquare className="w-6 h-6 text-blue-600" />
      <div className="flex items-center gap-3">
        <img
          src={otherUser.avatar}
          alt={otherUser.name}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <h1 className="text-xl font-semibold">{otherUser.name}</h1>
          <span className="text-sm text-green-600 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
            Online
          </span>
        </div>
      </div>
    </div>
  );
};