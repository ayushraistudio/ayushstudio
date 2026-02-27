import React, { useEffect, useRef } from 'react';
import './Projects.css';
import project1 from '../assets/images/project1.webp';
import project2 from '../assets/images/project2.webp';
import project3 from '../assets/images/project3.webp';
import project4 from '../assets/images/project4.webp';
import project5 from '../assets/images/project5.webp';

const projects = [
  {
    title: "React Behavior Guard (NPM Library) 🛡️",
    desc: "A production-ready NPM package to detect suspicious behavioral patterns like tab switching and copy-paste with real-time risk scoring.",
    img: project5,
    tags: ["React", "TypeScript", "NPM", "Security"],
    demo: "https://www.npmjs.com/package/react-behavior-guard",
    code: "https://github.com/ayushraistudio/react-behavior-guard",
  },
  {
    title: "Private Chat App",
    desc: "Secure PWA messaging app with Unique IDs, Global/Private chat, delete-for-everyone, and Glassmorphism UI.",
    img: project4,
    tags: ["JavaScript", "Firebase", "PWA", "CSS3"],
    demo: "https://ayushraistudio.github.io/Private-chat/",
    code: "https://github.com/ayushraistudio/private-chat",
  },
  {   
    title: "GitHub Trophy API",
    desc: "Dynamic serverless API to showcase GitHub stats with 6+ themes (Hacker, Neon, Matrix). Includes a dedicated landing page.",
    img: project1,
    tags: ["Node.js", "Vercel", "SVG Gen", "GitHub Actions"],
    demo: "https://personal-trophy.vercel.app/",
    code: "https://github.com/ayushraistudio/github-contribution-showcase",
  },
  {
    title: "Exam Portal",
    desc: "Secure online exam system with role-based access (Admin/Student) using React & Firebase Auth.",
    img: project2,
    tags: ["React", "Tailwind CSS", "Firebase", "Context API"],
    demo: "https://exam-porta.vercel.app",
    code: "https://github.com/ayushraistudio/exam-portal",
  },
  {
    title: "Love Letter Maker",
    desc: "Interactive tool to design and export minimalist love letters. Drag-and-drop customization.",
    img: project3,
    tags: ["HTML5", "CSS3", "Vanilla JS", "Firebase"],
    demo: "https://love-letter-service.netlify.app",
    code: "https://github.com/ayushraistudio/love-letter-service",
  },
];

const Projects = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" aria-label="Portfolio Projects">
      <h2>Selected Projects</h2>
      <div className="grid">
        {projects.map((p, i) => (
          <article 
            className="card" 
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="img-container">
                <img
                src={p.img}
                alt={`${p.title} project screenshot`}
                loading="lazy"
                decoding="async"
                width="400"
                height="260"
                />
            </div>
            
            <div className="card-content">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>

                <div className="tags">
                {p.tags.map((t, j) => (
                    <span className="tag" key={j}>
                    {t}
                    </span>
                ))}
                </div>

                <div className="project-links">
                <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-demo"
                >
                    Live Demo 🚀
                </a>
                <a
                    href={p.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-code"
                >
                    Source Code 💻
                </a>
                </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
