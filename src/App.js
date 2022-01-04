import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import ForgetPassword from "./pages/auth/ForgetPassword";
import Signup from "./pages/auth/Signup";
import { PostsProvider } from "./context/PostsContext";
import MyGist from "./pages/MyGist";
import LikedGist from "./pages/LikedGist";


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
      <PostsProvider>
      <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />
                <Route path="/my-gist" element={<MyGist />} />
                <Route path="/liked-gist" element={<LikedGist />} />
            </Routes>
        </Router>
      </PostsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
