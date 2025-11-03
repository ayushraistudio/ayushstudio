import React from "react";
import "./Skills.css";

const skillsData = [
  {
    category: "💻 Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap"],
  },
  {
    category: "⚙️ Tools & Platforms",
    skills: ["Firebase", "GitHub", "VS Code", "Netlify", "Figma"],
  },
  {
    category: "🎨 Design & Branding",
    skills: ["UI/UX Design", "Wireframing", "Logo Design", "Prototyping"],
  },
  {
    category: "🚀 Currently Learning",
    skills: ["Next.js", "TypeScript", "Cloud (Firebase / Vercel)"],
  },
];

const Skills = () => {
  return (
    <section id="skills">
      <h2 className="skills-title">Skills & Proficiency</h2>
      <p className="skills-subtitle">Technologies and Tools I work with</p>

      {skillsData.map((group, index) => (
        <div key={index} className="skill-category">
          <h3>{group.category}</h3>
          <div className="skills-grid">
            {group.skills.map((skill, i) => (
              <div key={i} className="skill-card">
                <span className="skill-icon">⚡</span>
                <p>{skill}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skills;
