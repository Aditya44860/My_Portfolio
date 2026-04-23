import { useEffect, useState } from "react";
import aboutImg from "../assets/About.jpeg";
import { ABOUT_TEXT, GITHUB_USERNAME } from "../constants";
import { motion } from "framer-motion";
import CountUp from "./CountUp";

const ABOUT_STATS = [
  { val: 2, suffix: "nd Year", label: "B.Tech Data Science" },
  { val: 10, suffix: "+", label: "Projects Built" },
  { val: 15, suffix: "+", label: "Technologies" },
  { val: 5, suffix: "+", label: "ML Models built" },
];

const About = () => {
  const [totalContribs, setTotalContribs] = useState(null);

  useEffect(() => {
    const cached = sessionStorage.getItem("gh_total_contribs");
    if (cached) { setTotalContribs(Number(cached)); return; }

    // Public contributions API — sums all years
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=all`)
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        // data.total is an object like { "2023": 120, "2024": 340, "2025": 210 }
        const sum = Object.values(data.total || {}).reduce((acc, v) => acc + v, 0);
        sessionStorage.setItem("gh_total_contribs", String(sum));
        setTotalContribs(sum);
      })
      .catch(() => setTotalContribs(null));
  }, []);

  return (
    <div id="about" className="border-b border-neutral-900 pb-4">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -60 }}
        transition={{ duration: 0.5 }} viewport={{ once: true }}
        className="my-20 text-center text-4xl"
      >
        About <span className="text-neutral-500">Me</span>
      </motion.h1>

      <div className="flex flex-wrap">
        {/* Image */}
        <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.5, ease: "easeInOut" }} viewport={{ once: true }}
          className="w-full lg:w-1/2 lg:p-8">
          <div className="flex items-center justify-center">
            <motion.img whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}
              src={aboutImg} alt="about"
              className="rounded-2xl opacity-90 brightness-80 transition-all duration-500"
              style={{ boxShadow: "0 0 60px rgba(168,85,247,0.08)" }} />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }} viewport={{ once: true }}
          className="w-full lg:w-1/2">
          <div className="flex flex-col justify-center h-full gap-8 py-6 px-6 lg:px-0 max-w-xl">
            <p className="font-light tracking-tighter text-neutral-300 leading-relaxed">
              {ABOUT_TEXT}
            </p>

            {/* Stats — clean horizontal row, no boxes/grid */}
            <div className="flex flex-wrap gap-8 pt-5 border-t border-neutral-900">
              {ABOUT_STATS.map((item) => (
                <motion.div key={item.label}
                  whileHover={{ y: -2 }}
                  className="flex flex-col gap-0.5 cursor-default group">
                  <div className="text-xl font-medium text-white group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.4)] transition-all duration-300">
                    <CountUp target={item.val} suffix={item.suffix} />
                  </div>
                  <div className="text-xs text-neutral-500">{item.label}</div>
                </motion.div>
              ))}

              {/* Total GitHub Contributions */}
              <motion.div
                whileHover={{ y: -2 }}
                className="flex flex-col gap-0.5 cursor-default group"
              >
                <div className="flex items-center gap-1.5">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"
                  />
                  <span className="text-2xl font-semibold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)] group-hover:drop-shadow-[0_0_16px_rgba(52,211,153,0.7)] transition-all duration-300">
                    {totalContribs !== null ? <CountUp target={totalContribs} /> : "—"}
                  </span>
                </div>
                <div className="text-xs text-neutral-600">Total Contributions</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
