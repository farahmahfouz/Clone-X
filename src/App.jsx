// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import Logout from "./pages/Logout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PostDetails from "./pages/PostDetails";
import ProtectedRoute from "./auth/ProtectedRoute";
import MainLayout from "./components/MainLayout";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black w-full">
      {children}
    </div>
  );
}

function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Logout />} />

          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Layout>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;