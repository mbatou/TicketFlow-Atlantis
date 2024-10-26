import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TicketProvider } from './context/TicketContext';
import { CommentProvider } from './context/CommentContext';
import { UserProvider } from './context/UserContext';
import { BrandProvider } from './context/BrandContext';
import { ResourceProvider } from './context/ResourceContext';
import { NotificationProvider } from './context/NotificationContext';
import { SubmissionProvider } from './context/SubmissionContext';
import Dashboard from './components/layout/Dashboard';
import LandingPage from './components/landing/LandingPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';

function AuthenticatedApp() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <NotificationProvider>
      <TicketProvider>
        <CommentProvider>
          <UserProvider>
            <BrandProvider>
              <ResourceProvider>
                <SubmissionProvider>
                  <Routes>
                    <Route path="/*" element={<Dashboard />} />
                  </Routes>
                </SubmissionProvider>
              </ResourceProvider>
            </BrandProvider>
          </UserProvider>
        </CommentProvider>
      </TicketProvider>
    </NotificationProvider>
  ) : (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AuthenticatedApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;