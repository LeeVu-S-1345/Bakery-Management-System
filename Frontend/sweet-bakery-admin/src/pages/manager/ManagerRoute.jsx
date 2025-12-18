import { Navigate } from "react-router-dom";

// Mock auth context for demo - in real app, use your AuthContext
const useAuth = () => {
  // For demo purposes, always return manager role
  return {
    isAuthed: true,
    user: { role: 3 }, // Manager role
  };
};

export default function ManagerRoute({ children }) {
  const auth = useAuth();

  // Not logged in → redirect to login
  if (!auth.isAuthed) return <Navigate to="/" replace />;

  // If not manager (role !== 3) → redirect based on role
  if (auth.user.role !== 3) {
    if (auth.user.role === 1) return <Navigate to="/employee" replace />;
    return <Navigate to="/" replace />;
  }

  // Manager → allow access
  return <>{children}</>;
}
