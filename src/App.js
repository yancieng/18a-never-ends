import Login from "pages/user/Login";
import { useAuth } from "contexts/AuthContext";
import Home from "pages/Home";
import Register from "pages/user/Register";

function App() {
  const { loading, fetchingUserList, currentUser, unRegisteredUser } =
    useAuth();

  if (loading || fetchingUserList) return null;

  if (unRegisteredUser) return <Register />;

  return currentUser ? <Home /> : <Login />;
}

export default App;
