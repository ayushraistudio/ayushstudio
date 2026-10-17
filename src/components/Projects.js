import React, { useEffect, useRef, useState } from "react";
import "./Projects.css";

import project1 from "../assets/images/project1.webp";
import portfolio from "../assets/images/portfolio.jpg";
import project2 from "../assets/images/project2.webp";
import project3 from "../assets/images/project3.webp";
import project4 from "../assets/images/project4.webp";
import project5 from "../assets/images/project5.webp";

const projects = [
  {
    title: "Ayush OS — AI-Powered Portfolio",
    desc: "An interactive macOS-inspired portfolio featuring modern UI/UX, dynamic desktop-style interactions, AI integrations, and innovative web experiences. Built to showcase projects, skills, and digital creativity.",
    img: portfolio,
    tags: ["React", "Next.js", "AI Integration", "UI/UX", "Web Development"],
    demo: "https://ayushos.vercel.app/",
    code: "https://github.com/ayushraistudio",
  },
  {
    title: "Love Letter Maker",
    desc: "An interactive digital love letter platform for creating personalized letters with custom designs, creative themes, photo support, and engaging visual experiences.",
    img: project3,
    tags: ["HTML5", "CSS3", "JavaScript", "Firebase", "AI Integration"],
    demo: "https://love-letter-service.netlify.app/",
    code: "https://github.com/ayushraistudio/Love-Letter-Service",
  },
  {
    title: "React Behavior Guard (NPM Library) 🛡️",
    desc: "A production-ready NPM package designed to track suspicious behavioral patterns, including tab switching and copy-paste activity, with real-time risk scoring for web sessions.",
    img: project5,
    tags: ["React", "TypeScript", "NPM", "Security"],
    demo: "https://www.npmjs.com/package/react-behavior-guard",
    code: "https://github.com/ayushraistudio/react-behavior-guard",
  },
  {
    title: "Private Chat App",
    desc: "A progressive web messaging application featuring unique user IDs, global and private chat, message deletion, and a modern glassmorphism interface.",
    img: project4,
    tags: ["JavaScript", "Firebase", "PWA", "CSS3"],
    demo: "https://ayushraistudio.github.io/Private-chat/",
    code: "https://github.com/ayushraistudio/private-chat",
  },
  {
    title: "GitHub Contribution Showcase API",
    desc: "A GitHub GraphQL-powered API that displays contribution streaks, active days, total contributions, and user activity through customizable SVG widgets and visual themes.",
    img: project1,
    tags: ["Next.js", "TypeScript", "GitHub GraphQL", "SVG", "Vercel"],
    demo: "https://personal-trophy.vercel.app/",
    code: "https://github.com/ayushraistudio/github-contribution-showcase",
  },
  {
    title: "Exam Portal",
    desc: "A secure online examination platform featuring MCQ tests, student authentication, administrative controls, and Firebase-powered data management.",
    img: project2,
    tags: ["React", "Firebase", "Authentication", "Tailwind CSS"],
    demo: "https://exam-porta.vercel.app/",
    code: "https://github.com/ayushraistudio/exam-portal",
  },
  {
    title: "AI Krishi Advisor",
    desc: "An AI-powered agriculture application designed to help users explore crop and plant-related information through machine-learning concepts and image-based plant disease identification workflows.",
    type: "iframe",
    img: project2,
    tags: ["React", "Python", "Machine Learning", "AI/ML"],
    demo: "https://kisan-saaathi.vercel.app/",
    code: "https://github.com/ayushraistudio/kisan",
  },
  {
    title: "AIML-Based Nowcasting",
    desc: "A weather-risk prediction system that combines atmospheric observations and radar-image sequences to estimate thunderstorm and lightning risk using machine-learning models.",
    type: "iframe",
    img: project4,
    tags: ["Next.js", "FastAPI", "XGBoost", "ConvLSTM", "AI/ML"],
    demo: "https://nowcastai.vercel.app/",
    code: "https://github.com/ayushraistudio/nowcast",
  },
];

/* Live website preview */
const WebsitePreview = ({ url, title }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="website-preview">
      {loading && (
        <div className="preview-loader">
          <div className="preview-spinner" />
          <span>Loading live website...</span>
        </div>
      )}

      <iframe
        src={url}
        title={`${title} live website preview`}
        loading="lazy"
        onLoad={() => setLoading(false)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

const Projects = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
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
        {projects.map((project, index) => (
          <article
            className="card"
            key={project.title}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
          >
            <div className="img-container">
              {project.type === "iframe" ? (
                <WebsitePreview
                  url={project.demo}
                  title={project.title}
                />
              ) : (
                <img
                  src={project.img}
                  alt={`${project.title} project screenshot`}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="260"
                />
              )}
            </div>

            <div className="card-content">
              <h3>{project.title}</h3>

              <p>{project.desc}</p>

              <div className="tags">
                {project.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-demo"
                  aria-label={`View ${project.title} live demo`}
                >
                  Live Demo 🚀
                </a>

                <a
                  href={project.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-code"
                  aria-label={`View ${project.title} source code`}
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
