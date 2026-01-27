import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable"; 
import ScrollToTop from "./ScrollToTop";
import "./App.css";

// ✅ Lazy loaded components
const Navbar = lazy(() => import("./components/Navbar"));
const Hero = lazy(() => import("./components/Hero"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

// ✅ Swipe Handler Component (Fixed Logic)
const SwipeWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pages ka fix order
  const routes = ["/", "/projects", "/skills", "/contact"];

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      // 🛑 Protection: Agar user input field ya textarea par hai to swipe mat karo
      const targetTag = eventData.event.target.tagName;
      if (targetTag === "INPUT" || targetTag === "TEXTAREA") return;

      // Swipe Left (<-) matlab agle page par jao
      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex !== -1 && currentIndex < routes.length - 1) {
        navigate(routes[currentIndex + 1]);
      }
    },
    onSwipedRight: (eventData) => {
      // 🛑 Protection: Agar user input field ya textarea par hai to swipe mat karo
      const targetTag = eventData.event.target.tagName;
      if (targetTag === "INPUT" || targetTag === "TEXTAREA") return;

      // Swipe Right (->) matlab pichle page par jao
      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex > 0) {
        navigate(routes[currentIndex - 1]);
      }
    },
    // ⚙️ SETTINGS UPDATED:
    delta: 70,              // Pehle 10 tha, ab 70px lamba swipe karna padega (Sensitivity kam ki)
    preventScrollOnSwipe: false, // Vertical scroll ko block nahi karega
    trackMouse: false,      // Desktop mouse disable
    swipeDuration: 2000,    // Slow swipes ko bhi allow karega (taaki control rahe)
  });

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

          {/* ✅ Page content wrapped in <main> */}
          <main style={{ minHeight: "calc(100vh - 140px)" }}>
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
  
