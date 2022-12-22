import Login from "pages/user/Login";
import { useAuth } from "contexts/AuthContext";
import Home from "pages/Home";

function App() {
  const { currentUser, loading } = useAuth();

  if (loading) return null;

  return currentUser ? <Home /> : <Login />;
}

export default App;
