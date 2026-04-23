import { useState, useEffect } from "react";
import { HERO_CONTENT } from "../constants";
import ProfilePic from "../assets/Profile.jpeg";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaDownload, FaGraduationCap, FaLaptopCode, FaChartBar, FaServer, FaRobot } from "react-icons/fa";

const ROLES = [
  { text: "Full Stack Developer", tag: "Full Stack Dev", icon: FaLaptopCode, color: "text-cyan-400" },
  { text: "Data Analyst", tag: "Data Analyst", icon: FaChartBar, color: "text-emerald-400" },
  { text: "Data Engineer", tag: "Data Engineer", icon: FaServer, color: "text-orange-400" },
  { text: "AI / ML Engineer", tag: "AI / ML Engineer", icon: FaRobot, color: "text-purple-400" },
];

// Typewriter now receives roleIndex from parent
const Typewriter = ({ roleIndex }) => {
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [localRole, setLocalRole] = useState(roleIndex);

  // When parent role changes, start deleting
  useEffect(() => {
    if (roleIndex !== localRole && !deleting) {
      setDeleting(true);
    }
  }, [roleIndex]);

  useEffect(() => {
    const current = ROLES[localRole].text;
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1); }, 68);
    } else if (!deleting && charIndex === current.length) {
      // Hold for a beat — parent timer handles the switch
      return;
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }, 32);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setLocalRole(roleIndex);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, localRole, roleIndex]);

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-transparent">{displayed}</span>
      <span className="cursor-blink ml-0.5 text-purple-400 font-thin">|</span>
    </span>
  );
};

// Synced tag on the image — scrolls down when role changes
const RoleTag = ({ roleIndex }) => {
  const role = ROLES[roleIndex];
  const Icon = role.icon;

  return (
    <span className="img-tag" style={{ bottom: "-12px", right: "-36px" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={roleIndex}
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 14, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <Icon className={`text-sm ${role.color}`} />
          {role.tag}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const fadeInLeft = (delay = 0) => ({
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { delay, duration: 0.5, ease: "easeInOut" } },
});

const fadeInRight = {
  hidden: { x: 80, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { delay: 0.2, duration: 0.6, ease: "easeInOut" } },
};

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const scrollDown = () => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });

  // Cycle roles on a timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(r => (r + 1) % ROLES.length);
    }, 4000); // 4s per role (typing ~1.4s + hold ~2.2s + deleting ~0.4s)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-svh lg:h-screen flex flex-col border-b border-neutral-900 pt-20 overflow-x-clip">

      {/* ── Desktop — strict 50/50 ── */}
      <div className="flex-1 hidden lg:flex">

        {/* Left */}
        <div className="w-1/2 flex flex-col justify-center px-4">
          <div className="flex flex-col items-start">

            <motion.div variants={fadeInLeft(0)} initial="hidden" animate="visible"
              className="mb-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/70 text-xs text-neutral-400 w-fit select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for opportunities
            </motion.div>

            <motion.h1 variants={fadeInLeft(0.1)} initial="hidden" animate="visible"
              className="break-words text-6xl xl:text-7xl 2xl:text-8xl font-[150] text-white pb-5 lg:mt-2 mb-0 leading-tight">
              Aditya Bhardwaj
            </motion.h1>

            <motion.div variants={fadeInLeft(0.2)} initial="hidden" animate="visible"
              className="text-2xl xl:text-3xl tracking-tight min-h-[2.5rem] flex items-center mt-4">
              <Typewriter roleIndex={roleIndex} />
            </motion.div>

            <motion.p variants={fadeInLeft(0.3)} initial="hidden" animate="visible"
              className="mt-5 max-w-md font-light tracking-tighter text-neutral-400 leading-relaxed text-sm xl:text-[0.93rem]">
              {HERO_CONTENT}
            </motion.p>

            <motion.div variants={fadeInLeft(0.4)} initial="hidden" animate="visible"
              className="flex gap-3 mt-8">
              <motion.a
                href="https://drive.google.com/file/d/1HK2_l1Yf9RgXvt20JzENIDOZIff6sm7z/view?usp=sharing"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-[140px] py-2.5 rounded-lg text-sm font-medium bg-white text-neutral-900 hover:bg-neutral-100 transition-all duration-200"
              >
                <FaDownload className="text-xs" /> Resume
              </motion.a>
              <motion.a
                href="https://github.com/Aditya44860"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 w-[140px] py-2.5 rounded-lg text-sm font-medium border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-400 transition-all duration-200"
              >
                <FaGithub /> GitHub
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Right — image + synced tags */}
        <div className="w-1/2 flex items-center justify-center p-8 lg:p-12">
          <motion.div variants={fadeInRight} initial="hidden" animate="visible">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <img
                src={ProfilePic}
                alt="Aditya Bhardwaj"
                className="rounded-3xl object-cover brightness-90 max-h-[500px] w-auto shadow-2xl shadow-purple-500/10"
                style={{ boxShadow: "0 0 50px rgba(168, 85, 247, 0.15)" }}
              />

              {/* B.Tech DS — static, top-left */}
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="img-tag" style={{ top: "-12px", left: "-36px" }}>
                <FaGraduationCap className="text-purple-400 text-sm" /> B.Tech Data Science
              </motion.span>

              {/* Role tag — synced with typewriter, bottom-right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <RoleTag roleIndex={roleIndex} />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="flex-1 flex flex-col gap-10 lg:hidden">
        <div className="flex flex-col justify-center px-4 py-6 items-center">
          <motion.div variants={fadeInLeft(0)} initial="hidden" animate="visible"
            className="mb-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/70 text-xs text-neutral-400 w-fit select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for opportunities
          </motion.div>
          <motion.h1 variants={fadeInLeft(0.1)} initial="hidden" animate="visible"
            className="text-4xl font-thin text-white mb-0 leading-tight text-center">
            Aditya Bhardwaj
          </motion.h1>
          <motion.div variants={fadeInLeft(0.2)} initial="hidden" animate="visible"
            className="text-xl tracking-tight min-h-[2rem] flex items-center mt-3">
            <Typewriter roleIndex={roleIndex} />
          </motion.div>
          <motion.p variants={fadeInLeft(0.3)} initial="hidden" animate="visible"
            className="mt-4 max-w-sm font-light tracking-tighter text-neutral-400 leading-relaxed text-sm text-center">
            {HERO_CONTENT}
          </motion.p>
          <motion.div variants={fadeInLeft(0.4)} initial="hidden" animate="visible" className="flex gap-3 mt-6">
            <a href="https://drive.google.com/file/d/1HK2_l1Yf9RgXvt20JzENIDOZIff6sm7z/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-[130px] py-2.5 rounded-lg text-sm font-medium bg-white text-neutral-900">
              <FaDownload className="text-xs" /> Resume
            </a>
            <a href="https://github.com/Aditya44860" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-[130px] py-2.5 rounded-lg text-sm font-medium border border-neutral-700 text-neutral-300">
              <FaGithub /> GitHub
            </a>
          </motion.div>
        </div>

        <div className="flex justify-center pb-8">
          <div className="relative inline-block">
            <motion.img animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              src={ProfilePic} alt="Aditya Bhardwaj"
              className="rounded-2xl opacity-90 brightness-80 max-w-[240px] w-full object-cover"
              style={{ boxShadow: "0 0 60px rgba(34,211,238,0.12)" }} />
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="img-tag" style={{ top: "-14px", left: "-10px" }}>
              <FaGraduationCap className="text-purple-400 text-sm" /> B.Tech DS
            </motion.span>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <RoleTag roleIndex={roleIndex} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
        onClick={scrollDown}
        className="flex flex-col items-center gap-1.5 pb-6 cursor-pointer group select-none"
      >
        <div className="relative h-8 w-px bg-neutral-800 overflow-hidden rounded-full">
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white/60 to-transparent"
          />
        </div>
        <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-700 group-hover:text-neutral-500 transition-colors duration-200">
          scroll
        </span>
      </motion.div>

    </div>
  );
};

export default Hero;
