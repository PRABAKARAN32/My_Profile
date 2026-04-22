import React from "react";
import { education } from "../../constants";

const Education = () => {
  return (
    <section
      id="education"
      className="py-24 pb-24 px-[7vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-3"
    >
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">EDUCATION</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          My education has been a journey of learning and development. Here are
          the details of my academic background
        </p>
      </div>

      {/* Education Timeline */}
      <div className="relative">

        {/* Vertical center line — desktop only */}
        <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-1 bg-white h-full"></div>

        {/* Mobile left line */}
        <div className="block sm:hidden absolute left-4 top-0 w-1 bg-white h-full"></div>

        {education.map((edu, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={edu.id}
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
                  src={edu.img}
                  alt={edu.school}
                  className="w-full h-full object-contain p-1 rounded-full"
                />
              </div>

              {/* Card — left or right on desktop, indented on mobile */}
              <div
                className={`
                  ml-14 sm:ml-0 w-full
                  sm:w-[45%]
                  ${isEven ? "sm:mr-auto sm:pr-10" : "sm:ml-auto sm:pl-10"}
                  bg-gray-900 border border-white rounded-2xl p-5 sm:p-6
                  shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]
                  backdrop-blur-md
                  transition-transform duration-300 hover:scale-105
                `}
              >
                {/* Logo + School Info */}
                <div className="flex items-center gap-4 mb-4">
                  {/* School Logo */}
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                    <img
                      src={edu.img}
                      alt={edu.school}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Degree & School */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
                      {edu.degree}
                    </h3>
                    <h4 className="text-sm text-gray-300 mt-1">{edu.school}</h4>
                    <p className="text-xs text-gray-500 mt-1">{edu.date}</p>
                  </div>
                </div>

                {/* Grade */}
                <p className="text-sm text-purple-400 font-bold mb-2">
                  Grade: {edu.grade}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">{edu.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Education;