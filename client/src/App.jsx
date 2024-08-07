import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signin from "./assets/pages/Signin";
import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import Signup from "./assets/pages/Signup";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
