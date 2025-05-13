// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import ProtectedRoute from "./auth/ProtectedRoute";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Logout />} />

        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

\        <Route path="/post" element={<AddPost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
