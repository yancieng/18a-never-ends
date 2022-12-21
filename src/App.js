import Login from "pages/user/Login";
import { useAuth } from "contexts/AuthContext";
import Home from "pages/Home";
import Register from "pages/user/Register";

function App() {
  const { loading, fetchingUserList, user, unRegisteredUser } = useAuth();

  if (loading || fetchingUserList) return null;

  if (unRegisteredUser) return <Register />;

  return user ? <Home /> : <Login />;
}

export default App;
