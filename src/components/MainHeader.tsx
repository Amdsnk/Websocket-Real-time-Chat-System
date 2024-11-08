import React from 'react';
import { MessageCircle } from 'lucide-react';
import { User } from '../types';

interface Props {
  currentUser: User | null;
}

export const MainHeader: React.FC<Props> = ({ currentUser }) => {
  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Chat App</h1>
        </div>
        
        {currentUser && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Welcome,</span>
            <div className="flex items-center gap-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{currentUser.name}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};