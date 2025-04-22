import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

// Pages & Components
import SuiviPage from './Pages/SuiviPage';
import MessageriePage from './Pages/MessageriePage';
import HomePage from './Pages/HomePage'; 
import LoginPage from './Pages/LoginPage';
import ProposerPage from './Pages/ProposerPage';
import ChoixPage from './Pages/ChoixPage';
import GestionPage from './Pages/GestionPage';
import MonProjetPage from './Pages/MonProjetPage';
import Navbar from './components/Navbar';
import MainFooter from './components/MainFooter';
import ProfilEtudPage from './Pages/ProfileEtudPage';
// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <MainFooter />
  </>
);

const AuthLayout = () => {
  return <Outlet />; // No navbar/footer for auth pages
};

const ProtectedLayout = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/home" replace />;
  
  return children || <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes with layout */}
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
          </Route>

          {/* Auth routes without layout */}
          <Route element={<AuthLayout />}>
            <Route
              path="login"
              element={
                <AuthWrapper>
                  <LoginPage />
                </AuthWrapper>
              }
            />
          </Route>

          {/* Student routes */}
          <Route element={<ProtectedLayout allowedRoles={['student']} />}>
            <Route element={<MainLayout />}>
              <Route path="student/choix" element={<ChoixPage />} />
              <Route path="student/mon-projet" element={ <MonProjetPage />} />
              <Route path="student/messagerie" element={<MessageriePage />} />
              <Route path="student/profil" element={<ProfilEtudPage />} />
            </Route>
          </Route>

          {/* Teacher routes */}
          <Route element={<ProtectedLayout allowedRoles={['teacher']} />}>
            <Route element={<MainLayout />}>
              <Route path="teacher/proposer" element={<ProposerPage />} />
              <Route path="teacher/messagerie" element={<MessageriePage />} />
              <Route path="teacher/suivi" element={<SuiviPage />} /> 
            </Route>
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedLayout allowedRoles={['admin']} />}>
            <Route element={<MainLayout />}>
              <Route path="admin/gestion-etudiants" element={<GestionPage />} />
              <Route path="admin/statistiques" element={<div>Statistiques</div>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Wrapper to redirect logged-in users away from /login
const AuthWrapper = ({ children }) => {
  const { user } = useAuth();
  if (user) return <Navigate to="/home" replace />;
  return children;
};

export default App;