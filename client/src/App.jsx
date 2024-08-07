import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signin from "./assets/pages/Signin";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Signup from "./assets/pages/Signup";
import Header from "./components/Header";
import Contact from "./assets/pages/Contact";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
