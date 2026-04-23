import { STATS } from "../constants";
import { motion } from "framer-motion";
import CountUp from "./CountUp";

const Stats = () => (
  <div className="border-b border-neutral-900 py-16">
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(255,255,255,0.07)" }}
          className="flex flex-col items-center gap-1 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-600 transition-all duration-300 cursor-default"
        >
          <div className="text-3xl font-thin text-white">
            <CountUp target={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-xs text-neutral-500 text-center">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Stats;
