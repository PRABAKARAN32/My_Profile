import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaReddit,
  FaGitlab,
} from "react-icons/fa";
import { SiHashnode } from "react-icons/si"; // Hashnode icon

const Footer = () => {
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="text-white py-8 px-[12vw] md:px-[7vw] lg:px-[20vw]">
      <div className="container mx-auto text-center">
        {/* Name / Logo */}
        <h2 className="text-xl font-semibold text-purple-500">Prabakaran</h2>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4">
          {[
            { name: "About", id: "about" },
            { name: "Skills", id: "skills" },
            { name: "Certification", id: "certification" },
            { name: "Projects", id: "work" },
            { name: "Education", id: "education" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => handleScroll(item.id)}
              className="hover:text-purple-500 text-sm sm:text-base my-1"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex flex-wrap justify-center space-x-4 mt-6">
          {[
            {
              icon: <FaFacebook title="Facebook" />,
              link: "https://www.facebook.com/profile.php?id=100054960527874&sk=photos",
            },
            {
              icon: <FaTwitter title="Twitter" />,
              link: "https://x.com/Prabakaran87286",
            },
            {
              icon: <FaReddit title="Reddit" />,
              link: "https://www.reddit.com/user/ProfitNo9091",
            },
            {
              icon: <FaLinkedin title="LinkedIn" />,
              link: "https://www.linkedin.com/in/prabakaran32",
            },
            {
              icon: <FaGitlab title="GitLab" />,
              link: "https://gitlab.com/prabakaranabcabc/",
            },
            {
              icon: <SiHashnode title="Blog" />,
              link: "https://prabakaran.hashnode.dev/",
            },
          ].map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-purple-500 transition-transform transform hover:scale-110"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-400 mt-6">
          © 2026 Prabakaran. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
