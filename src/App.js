import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable"; // ✅ Import Swipe Library
import ScrollToTop from "./ScrollToTop";
import "./App.css";

// ✅ Lazy loaded components
const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// ✅ Swipe Handler Component
// Yeh component tumhare pages ke order ko handle karega
const SwipeWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pages ka fix order
  const routes = ["/", "/projects", "/skills", "/contact"];

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      // Swipe Left (<-) matlab agle page par jao
      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex !== -1 && currentIndex < routes.length - 1) {
        navigate(routes[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      // Swipe Right (->) matlab pichle page par jao
      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex > 0) {
        navigate(routes[currentIndex - 1]);
      }
    },
    preventScrollOnSwipe: true, // Jab swipe kar rahe ho to scroll na ho
    trackMouse: false, // Desktop pe mouse se swipe disable (sirf touch ke liye)
  });

  // Swipe area poori screen height lega taaki user kahin bhi swipe kar sake
  return (
    <div {...handlers} style={{ minHeight: "100%", width: "100%" }}>
      {children}
    </div>
  );
};

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // ✅ Custom loader
  const Loader = () => (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading Portfolio...</p>
    </div>
  );

  return (
    <div className={`App ${theme}`}>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<Loader />}>
          <Navbar theme={theme} toggleTheme={toggleTheme} />

          {/* ✅ Page content wrapped in <main> to push footer bottom */}
          <main style={{ minHeight: "calc(100vh - 140px)" }}>
            {/* Routes ko SwipeWrapper ke andar daal diya */}
            <SwipeWrapper>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </SwipeWrapper>
          </main>

          <Footer />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
                         
