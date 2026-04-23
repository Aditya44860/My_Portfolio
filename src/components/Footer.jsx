import { SOCIAL_LINKS, GITHUB_USERNAME } from "../constants";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.footer
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="border-t border-neutral-900 py-12"
    >
      <div className="container mx-auto px-6 flex flex-col items-center gap-7">
        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="text-xs text-neutral-600 hover:text-neutral-300 transition-colors duration-250"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex gap-5 text-lg">
          {[
            { href: SOCIAL_LINKS.linkedin, icon: <FaLinkedin />, label: "LinkedIn" },
            { href: SOCIAL_LINKS.github, icon: <FaGithub />, label: "GitHub" },
            { href: SOCIAL_LINKS.leetcode, icon: <SiLeetcode />, label: "LeetCode" },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank" rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.2, y: -2 }}
              className="text-neutral-700 hover:text-neutral-300 transition-colors duration-250"
            >
              {icon}
            </motion.a>
          ))}
        </div>

        <div className="w-12 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-neutral-700 text-xs flex items-center gap-1.5">
            Built with <FaHeart className="text-neutral-600 text-[9px]" /> using React & Framer Motion
          </p>
          <p className="text-neutral-800 text-xs">© {new Date().getFullYear()} Aditya Bhardwaj</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
