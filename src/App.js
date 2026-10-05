import React, { useState, useEffect, Suspense, lazy } from "react";
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

// ✅ New Portfolio Redirect Modal Component
const PortfolioRedirectModal = () => {
  const [countdown, setCountdown] = useState(7);
  const newPortfolioUrl = "https://ayushos.vercel.app/";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          window.location.href = newPortfolioUrl;
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleManualRedirect = () => {
    window.location.href = newPortfolioUrl;
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    backdropFilter: "blur(5px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const modalStyle = {
    backgroundColor: "#ffffff",
    color: "#333333",
    padding: "40px",
    borderRadius: "16px",
    maxWidth: "450px",
    width: "90%",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const titleStyle = {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1a1a1a",
  };

  const textStyle = {
    margin: 0,
    fontSize: "16px",
    color: "#555555",
    lineHeight: "1.5",
  };

  const buttonStyle = {
    marginTop: "15px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ffffff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    boxShadow: "0 4px 10px rgba(0, 123, 255, 0.3)",
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={titleStyle}>Welcome to My Old Portfolio!</h2>
        <p style={textStyle}>
          I have moved to a new and improved space. You will be automatically redirected to my new portfolio in <strong>{countdown}</strong> seconds.
        </p>
        <button 
          style={buttonStyle} 
          onClick={handleManualRedirect}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Go to New Portfolio Now
        </button>
      </div>
    </div>
  );
};

// ✅ Swipe Handler Component (Fixed Logic)
const SwipeWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pages order list
  const routes = ["/", "/projects", "/skills", "/contact"];

  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      // Protection: Do not swipe if user is interacting with an input field
      const targetTag = eventData.event.target.tagName;
      if (targetTag === "INPUT" || targetTag === "TEXTAREA") return;

      // Swipe Left (<-) navigates to the next page
      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex !== -1 && currentIndex < routes.length - 1) {
        navigate(routes[currentIndex + 1]);
      }
    },
    onSwipedRight: (eventData) => {
      // Protection: Do not swipe if user is interacting with an input field
      const targetTag = eventData.event.target.tagName;
      if (targetTag === "INPUT" || targetTag === "TEXTAREA") return;

      // Swipe Right (->) navigates to the previous page
      const currentIndex = routes.indexOf(location.pathname);
      if (currentIndex > 0) {
        navigate(routes[currentIndex - 1]);
      }
    },
    // SETTINGS:
    delta: 70,              
    preventScrollOnSwipe: false, 
    trackMouse: false,      
    swipeDuration: 2000,    
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
      {/* 🚀 New Portfolio Redirect Modal rendering on top of everything */}
      <PortfolioRedirectModal />
      
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
                         
