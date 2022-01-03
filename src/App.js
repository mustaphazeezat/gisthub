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


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />
            </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
