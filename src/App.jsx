import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logout from "./pages/Logout";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddPost from "./components/AddPost";
import ProtectedRoute from "./auth/ProtectedRoute";
import EditPost from "./components/EditPost";
// import Porfile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<Logout />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="home" element={ <ProtectedRoute> <Home /> </ProtectedRoute>}/>
        {/* <Route path="profile" element={<Porfile/>}/> */}
       
        <Route path="/post" element={<AddPost />} />
        <Route path="/edit-post/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
