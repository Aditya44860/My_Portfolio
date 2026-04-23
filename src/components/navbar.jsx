import React, { useState, useEffect } from 'react';
import logo from '../assets/Logo2.png';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIAL_LINKS } from '../constants';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#tech' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY && y > 50);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitial(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      animate={{ y: hidden ? -90 : 0 }}
      initial={{ y: 0 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? 'liquid-glass' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <motion.div 
          layoutId={isInitial ? "navbar-logo" : undefined}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          animate={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))", opacity: 1 }}
          transition={{ layout: { duration: 0.8, ease: "easeInOut" } }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: '60px', height: '2.4rem', objectFit: 'cover', objectPosition: '55% 48%', opacity: 0.85 }}
          />
        </motion.div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.02 * i, duration: 0.25 }}
              className="relative text-sm text-neutral-400 hover:text-white transition-colors duration-250 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-pink-300 via-slate-400 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full" />
            </motion.a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-5 text-[1.5rem]">
          {[
            { href: SOCIAL_LINKS.linkedin, icon: <FaLinkedin />, label: 'LinkedIn' },
            { href: SOCIAL_LINKS.github, icon: <FaGithub />, label: 'GitHub' },
            { href: SOCIAL_LINKS.leetcode, icon: <SiLeetcode />, label: 'LeetCode' },
          ].map(({ href, icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
              className="text-neutral-400 hover:text-white transition-colors duration-250"
            >
              {icon}
            </motion.a>
          ))}

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] ml-1 text-neutral-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="md:hidden liquid-glass border-t border-white/5 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-5 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
