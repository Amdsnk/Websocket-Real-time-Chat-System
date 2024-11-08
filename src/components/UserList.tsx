import React from 'react';
import { User } from '../types';

interface Props {
  users: User[];
  selectedUserId: string;
  onSelectUser: (userId: string) => void;
}

export const UserList: React.FC<Props> = ({ users, selectedUserId, onSelectUser }) => {
  return (
    <div className="w-80 bg-white border-r overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Chats</h2>
      </div>
      <div className="divide-y">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
              selectedUserId === user.id ? 'bg-blue-50' : ''
            }`}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900 truncate">{user.name}</p>
                <span className="text-xs text-gray-500">12:34</span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {user.online ? (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Online
                  </span>
                ) : (
                  'Offline'
                )}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};