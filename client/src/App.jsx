import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signin from "./assets/pages/Signin";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Signup from "./assets/pages/Signup";
import Header from "./components/Header";
import Contact from "./assets/pages/Contact";
import Profile from "./assets/pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import DashBoard from "./assets/pages/DashBoard";
import Blog from "./assets/pages/Blog";
import IsAdminPagePrivate from "./components/IsAdminPagePrivate";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route element={<IsAdminPagePrivate />}>
            <Route path="/blog" element={<Blog />}></Route>
          </Route>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
