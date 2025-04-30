import { useAuth } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Ensure auth state is loaded before making decisions
    if (isLoaded) {
      setAuthChecked(true);
    }
  }, [isLoaded]);

  // If auth is still loading, show loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading authentication...</p>
        </div>
      </div>
    );
  }

  // If user is not signed in, redirect to sign-in and remember where they were trying to go
  if (authChecked && !isSignedIn) {
    // Use replace to prevent building up a redirect history
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }

  // If auth is loaded and user is signed in, render children
  return <>{children}</>;
};

export default ProtectedRoute; 