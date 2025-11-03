import React from "react";
import "./Skills.css";
import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaBootstrap,
  FaGitAlt,
  FaFigma,
  FaCloud,
  FaTools,
} from "react-icons/fa";
import { SiFirebase, SiVercel, SiTailwindcss, SiVisualstudiocode, SiNetlify } from "react-icons/si";

const skillCategories = [
  {
    title: "💻 Frontend",
    items: [
      { name: "HTML", icon: <FaHtml5 color="#E44D26" /> },
      { name: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
      { name: "JavaScript", icon: <FaJsSquare color="#F7DF1E" /> },
      { name: "React", icon: <FaReact color="#61DBFB" /> },
      { name: "Tailwind  CSS", icon: <SiTailwindcss color="#38BDF8" /> },
      { name: "Bootstrap", icon: <FaBootstrap color="#7952B3" /> },
    ],
  },
  {
    title: "⚙️ Tools & Platforms",
    items: [
      { name: "Firebase", icon: <SiFirebase color="#FFCA28" /> },
      { name: "GitHub", icon: <FaGitAlt color="#F1502F" /> },
      { name: "VS Code", icon: <SiVisualstudiocode color="#007ACC" /> },
      { name: "Netlify", icon: <SiNetlify color="#00C7B7" /> },
      { name: "Figma", icon: <FaFigma color="#F24E1E" /> },
    ],
  },
  {
    title: "🎨 Design & Branding",
    items: [
      { name: "UI/UX Design", icon: <FaFigma color="#A259FF" /> },
      { name: "Wireframing", icon: <FaTools color="#6C63FF" /> },
      { name: "Logo Design", icon: <FaTools color="#F4B400" /> },
      { name: "Prototyping", icon: <FaTools color="#34A853" /> },
    ],
  },
  {
    title: "🚀 Currently Learning",
    items: [
      { name: "Next.js", icon: <SiVercel color="#000000" /> },
      { name: "TypeScript", icon: <FaJsSquare color="#3178C6" /> },
      { name: "Cloud (Firebase / Vercel)", icon: <FaCloud color="#00BFFF" /> },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h2>Skills & Proficiency</h2>
      <p className="subheading">Technologies and Tools I work with</p>

      <div className="skills-container">
        {skillCategories.map((cat, index) => (
          <div key={index} className="skill-category">
            <h3>{cat.title}</h3>
            <div className="skill-grid">
              {cat.items.map((skill, i) => (
                <div key={i} className="skill-card">
                  <div className="icon">{skill.icon}</div>
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
