import { RiReactjsLine, RiTailwindCssFill, RiNextjsLine } from "react-icons/ri";
import { FaPython, FaNode } from "react-icons/fa";
import { TbBrandJavascript } from "react-icons/tb";
import { SiExpress, SiMongodb, SiMysql, SiPandas, SiScikitlearn, SiTableau, SiNumpy } from "react-icons/si";
import { motion } from "framer-motion";

const jumping = (delay = 0) => ({
  initial: { y: 0 },
  animate: { y: [6, -6, 6], transition: { duration: 2.5, ease: "easeInOut", repeat: Infinity, delay } },
});

// Single unified flat list — clean, no messy categories
const ALL_TECHS = [
  { icon: <RiReactjsLine />, label: "React", color: "#22d3ee" },
  { icon: <RiNextjsLine />, label: "Next.js", color: "#ffffff" },
  { icon: <TbBrandJavascript />, label: "JavaScript", color: "#facc15" },
  { icon: <RiTailwindCssFill />, label: "Tailwind", color: "#60a5fa" },
  { icon: <FaNode />, label: "Node.js", color: "#4ade80" },
  { icon: <SiExpress />, label: "Express", color: "#d4d4d8" },
  { icon: <SiMongodb />, label: "MongoDB", color: "#4ade80" },
  { icon: <SiMysql />, label: "MySQL", color: "#60a5fa" },
  { icon: <FaPython />, label: "Python", color: "#fde68a" },
  { icon: <SiPandas />, label: "Pandas", color: "#818cf8" },
  { icon: <SiNumpy />, label: "NumPy", color: "#93c5fd" },
  { icon: <SiScikitlearn />, label: "Scikit-learn", color: "#fb923c" },
  { icon: <SiTableau />, label: "Tableau", color: "#38bdf8" },
];

const ML_CONCEPTS = [
  "Classification", "Regression", "Decision Trees",
  "Neural Networks", "RAG Pipelines", "NLP",
  "Feature Engineering", "Dashboards",
];

const Technologies = () => (
  <div id="tech" className="border-b border-neutral-900 pb-20">
    <motion.h1
      whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -60 }}
      transition={{ duration: 1 }} viewport={{ once: true }}
      className="my-20 text-center text-4xl"
    >
      Tech <span className="text-neutral-500">Stack</span>
    </motion.h1>

    {/* Single compact grid of icons */}
    <motion.div
      whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}
      transition={{ duration: 0.8 }} viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
    >
      {ALL_TECHS.map(({ icon, label, color }, i) => (
        <motion.div
          key={label}
          variants={jumping(i * 0.15)}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.12, boxShadow: `0 0 22px ${color}30` }}
          className="rounded-2xl border-2 border-neutral-800 bg-neutral-900/50 p-3.5 flex flex-col items-center gap-1.5 cursor-default w-[82px] transition-colors duration-200 hover:border-neutral-600"
          style={{ "--tech-color": color }}
        >
          <span style={{ color, fontSize: "2.25rem", lineHeight: 1 }}>{icon}</span>
          <span className="text-[10px] text-neutral-500 font-medium text-center leading-tight">{label}</span>
        </motion.div>
      ))}
    </motion.div>

    {/* ML Concepts — compact chip row */}
    <motion.div
      whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }} viewport={{ once: true }}
      className="mt-10"
    >
      <p className="text-center text-[10px] tracking-[0.3em] uppercase text-neutral-700 mb-5">
        AI / ML Concepts
      </p>
      <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
        {ML_CONCEPTS.map((concept, i) => {
          const colors = ["#22d3ee", "#facc15", "#4ade80", "#fde68a", "#818cf8", "#93c5fd", "#fb923c", "#38bdf8", "#a78bfa"];
          const color = colors[i % colors.length];
          return (
            <motion.span
              key={concept}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [3, -3, 3] }}
              transition={{ 
                opacity: { duration: 0.4, delay: i * 0.04 },
                scale: { type: "spring", stiffness: 200, duration: 0.4, delay: i * 0.04 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 } 
              }}
              whileHover={{ 
                scale: 1.15, 
                boxShadow: `0 0 20px ${color}50`,
                borderColor: color,
                color: "#fff",
                backgroundColor: `${color}15`
              }}
              className="text-[12px] px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 transition-colors duration-200 cursor-default inline-block"
            >
              {concept}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  </div>
);

export default Technologies;
