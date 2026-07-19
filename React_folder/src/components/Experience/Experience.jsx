import React from "react";
import { experiences } from "../../constants"; // Import your data

// Shared card body so the single-card and timeline layouts stay consistent
const ExperienceCardBody = ({ experience }) => (
  <>
    {/* Logo + Role/Company/Date */}
    <div className="flex items-center gap-4 mb-4">
      {/* Company Logo */}
      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
        <img
          src={experience.img}
          alt={experience.company}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Role & Company */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-white leading-tight">
          {experience.role}
        </h3>
        <h4 className="text-sm text-gray-300 mt-1">{experience.company}</h4>
        <p className="text-xs text-gray-500 mt-1">{experience.date}</p>
      </div>
    </div>

    {/* Description */}
    <p className="text-sm text-gray-400 leading-relaxed">{experience.desc}</p>

    {/* Skills */}
    <div className="mt-4">
      <h5 className="text-sm font-medium text-white mb-2">Skills:</h5>
      <div className="flex flex-wrap gap-2">
        {experience.skills.map((skill, i) => (
          <span
            key={`${experience.id}-${i}`}
            className="bg-[#251f38] text-purple-400 px-3 py-1 text-xs font-semibold rounded-full"
          >
            {skill.trim()}
          </span>
        ))}
      </div>
    </div>
  </>
);

const Experience = () => {
  const isTimeline = experiences.length > 1;

  return (
    <section
      id="experience"
      className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-2"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">EXPERIENCE</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A collection of my work experience and the roles I have taken in
          various organizations
        </p>
      </div>

      {isTimeline ? (
        /* ---------- Timeline layout (more than one experience) ---------- */
        <div className="relative">
          {/* Vertical center line — desktop only */}
          <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-1 bg-white h-full"></div>

          {/* Mobile left line */}
          <div className="block sm:hidden absolute left-4 top-0 w-1 bg-white h-full"></div>

          {experiences.map((experience, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={experience.id}
                className={`relative flex items-start mb-16
                  sm:flex-row sm:items-center
                  ${isEven ? "sm:flex-row" : "sm:flex-row-reverse"}
                `}
              >
                {/* Timeline Circle — centered on the line */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 z-10
                                w-12 h-12 sm:w-14 sm:h-14
                                rounded-full border-4 border-[#8245ec] bg-gray-800
                                flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img
                    src={experience.img}
                    alt={experience.company}
                    className="w-full h-full object-contain p-1 rounded-full"
                  />
                </div>

                {/* Card — left or right on desktop, indented on mobile */}
                <div
                  className={`
                    ml-14 sm:ml-0 w-full sm:w-[45%]
                    ${isEven ? "sm:mr-auto sm:pr-10" : "sm:ml-auto sm:pl-10"}
                    bg-gray-900 border border-white rounded-2xl p-5 sm:p-6
                    shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]
                    backdrop-blur-md
                    transition-transform duration-300 hover:scale-105
                  `}
                >
                  <ExperienceCardBody experience={experience} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ---------- Single centered card (only one experience) ---------- */
        <div className="flex justify-center">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="w-full max-w-2xl
                bg-gray-900 border border-white rounded-2xl p-6 sm:p-8
                shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]
                backdrop-blur-md
                transition-transform duration-300 hover:scale-105"
            >
              <ExperienceCardBody experience={experience} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Experience;
