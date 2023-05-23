import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AddBlog, BlogPage, Home, Login, Signup, UserProfile } from "./pages/";
import { Navbar } from "./components";
import { useUserContext } from "./hooks/useUserContext";

const App = () => {
  const { user } = useUserContext();
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          {user && <Route path="/create" element={<AddBlog />} />}
          {user && <Route path="/blog/:id" element={<BlogPage />} />}
          {user && <Route path="/user/:username" element={<UserProfile />} />}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
