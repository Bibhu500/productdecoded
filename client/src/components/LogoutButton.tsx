import React from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { LogOut, User } from 'lucide-react';

const LogoutButton: React.FC = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await signOut();
      // Optionally redirect to home page
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      {/* User info display */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <User className="h-4 w-4" />
        <span>{user.firstName || user.fullName || 'User'}</span>
      </div>
      
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors duration-200"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );
};

export default LogoutButton; 