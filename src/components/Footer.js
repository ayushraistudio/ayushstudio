import React, { useEffect } from 'react';
import './Footer.css';

const Footer = () => {

  useEffect(() => {
    // ✅ Add JSON-LD structured data for Google
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "ayush rai",
      "url": "https://ayushraistudio.netlify.app/",
      "image": "https://ayushraistudio.netlify.app/portfolio-preview.png",
      "jobTitle": "b.tech student ,Web Developer & Designer",
      "sameAs": [
        "https://github.com/ayushraistudio",
        "https://linkedin.com/in/ayushraistudio",
        "mailto:ayushraistudio@gmail.com"
      ],
      "description": "ayush rai (ayushraistudio) b.tech student Creative web developer skilled in React, Firebase, and UI/UX design."
    });
    document.head.appendChild(script);
  }, []);

  return (
    <footer>
      <p>© {new Date().getFullYear()} <strong>Ayush Rai</strong> • Built with ❤️ using React</p>

      <div className="footer-links">
        <a href="https://github.com/ayushraistudio" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/ayushraistudio" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:info@ayushraistudio.com">Email</a>
      </div>
    </footer>
  );
};

export default Footer;
