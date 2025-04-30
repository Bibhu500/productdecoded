import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Add a fallback for development to prevent crashes
const publishableKey = PUBLISHABLE_KEY || 'pk_test_placeholder';

// Log warning if key is missing but don't crash
if (!PUBLISHABLE_KEY) {
  console.error("Warning: Missing Clerk Publishable Key in .env file")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={publishableKey}
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      appearance={{
        variables: { colorPrimary: '#3B82F6' } // Match the blue color used in the UI
      }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)