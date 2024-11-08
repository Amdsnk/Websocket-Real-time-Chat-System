import React, { useEffect, useState } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { MessageBubble } from './components/MessageBubble';
import { MessageInput } from './components/MessageInput';
import { UserList } from './components/UserList';
import { MainHeader } from './components/MainHeader';
import { useChatStore } from './store';
import { Message, User } from './types';

// Demo users
const DEMO_USERS: User[] = [
  {
    id: '2',
    name: 'Alice',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=faces',
    online: true
  },
  {
    id: '3',
    name: 'Bob',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=faces',
    online: true
  },
  {
    id: '4',
    name: 'Carol',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=faces',
    online: false
  }
];

const CURRENT_USER: User = {
  id: '1',
  name: 'You',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces',
  online: true
};

// Demo messages
const DEMO_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hey there! 👋',
    sender: '2',
    recipient: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: 'text',
    status: 'sent'
  },
  {
    id: '2',
    content: 'Check out this amazing view!',
    sender: '2',
    recipient: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 14),
    type: 'text',
    status: 'sent'
  },
  {
    id: '3',
    content: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=400&fit=crop',
    sender: '2',
    recipient: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 14),
    type: 'image',
    status: 'sent'
  },
  {
    id: '4',
    content: 'Wow, that looks incredible! Where is this?',
    sender: '1',
    recipient: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    type: 'text',
    status: 'sent'
  }
];

function App() {
  const { messages, currentUser, setCurrentUser, initializeMessages } = useChatStore();
  const [selectedUserId, setSelectedUserId] = useState(DEMO_USERS[0].id);

  useEffect(() => {
    setCurrentUser(CURRENT_USER);
    initializeMessages(DEMO_MESSAGES);
  }, [setCurrentUser, initializeMessages]);

  const selectedUser = DEMO_USERS.find(user => user.id === selectedUserId);

  const filteredMessages = messages.filter(
    message => 
      (message.sender === currentUser?.id && message.recipient === selectedUserId) ||
      (message.sender === selectedUserId && message.recipient === currentUser?.id)
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <MainHeader currentUser={currentUser} />
      <div className="flex flex-1 overflow-hidden">
        <UserList
          users={DEMO_USERS}
          selectedUserId={selectedUserId}
          onSelectUser={setSelectedUserId}
        />
        
        <div className="flex-1 flex flex-col">
          {selectedUser && <ChatHeader otherUser={selectedUser} />}
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {filteredMessages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.sender === currentUser?.id}
                senderName={message.sender === selectedUserId ? selectedUser?.name : 'You'}
              />
            ))}
          </div>

          <MessageInput selectedUserId={selectedUserId} />
        </div>
      </div>
    </div>
  );
}

export default App;