import React, { useEffect } from 'react';
import './Projects.css';
import project1 from '../assets/images/project1.webp';
import project2 from '../assets/images/project2.webp';
import project3 from '../assets/images/project3.webp';

const projects = [
  {
    title: "Portfolio Website",
    desc: "Responsive portfolio with dark mode, animations and accessibility-first design.",
    img: project1,
    tags: ["HTML", "CSS", "JS"],
    demo: "https://ayushstudio.netlify.app",
    code: "https://github.com/ayushraistudio/portfolio-2",
  },
  {
    title: "Exam Portal",
    desc: "Secure exam system using JS + Firebase Auth — simple UI & robust flow.",
    img: project2,
    tags: ["React", "tailwind css", "JS", "Firebase"],
    demo: "https://exam-porta.vercel.app",
    code: "https://github.com/ayushraistudio/exam-portal",
  },
  {
    title: "Love Letter Maker",
    desc: "Lightweight JS tool to create minimalist posters — drag, edit, export.",
    img: project3,
    tags: ["HTML", "CSS", "JS", "Firebase"],
    demo: "https://143-letter.netlify.app",
    code: "https://github.com/ayushraistudio/love-letter",
  },
];

const Projects = () => {
  useEffect(() => {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" aria-label="Portfolio Projects">
      <h2>Selected Projects</h2>
      <div className="grid">
        {projects.map((p, i) => (
          <article className="card" key={i}>
            {/* ✅ Lazy load + width/height for better LCP & CLS */}
            <img
              src={p.img}
              alt={`${p.title} project screenshot`}
              loading="lazy"
              decoding="async"
              width="400"
              height="260"
            />
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
                aria-label={`View live demo of ${p.title}`}
              >
                Live Demo
              </a>
              <a
                href={p.code}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${p.title}`}
              >
                Source Code
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
