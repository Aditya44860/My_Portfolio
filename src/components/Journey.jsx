import { TIMELINE } from "../constants";
import { motion } from "framer-motion";

const Journey = () => {
  const colors = [
    { text: "text-cyan-400", bg: "bg-cyan-500", glow: "rgba(34, 211, 238, 0.2)" },
    { text: "text-purple-400", bg: "bg-purple-500", glow: "rgba(167, 139, 250, 0.2)" },
    { text: "text-emerald-400", bg: "bg-emerald-500", glow: "rgba(52, 211, 153, 0.2)" },
    { text: "text-amber-400", bg: "bg-amber-500", glow: "rgba(251, 191, 36, 0.2)" },
    { text: "text-pink-400", bg: "bg-pink-500", glow: "rgba(244, 114, 182, 0.2)" },
  ];

  return (
    <div id="journey" className="border-b border-neutral-900 py-24">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }} viewport={{ once: true }}
        className="my-0 mb-16 text-center text-4xl"
      >
        My <span className="text-neutral-500 font-light">Journey</span>
      </motion.h1>

      <div className="relative max-w-2xl mx-auto px-4">
        {/* Main Vertical Timeline Line */}
        <div className="absolute left-[30px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-800" />

        <div className="flex flex-col gap-10">
          {TIMELINE.map((item, i) => {
            const color = colors[i % colors.length];
            return (
              <motion.div
                key={i}
                whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex pl-16 relative group"
              >
                {/* Timeline Connector Dot - Perfectly Centered */}
                <div 
                  className="absolute left-[30px] top-[24px] -translate-x-1/2 z-20 flex items-center justify-center"
                >
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                    className={`w-3 h-3 rounded-full ${color.bg} border-2 border-black z-10 shadow-[0_0_8px_rgba(255,255,255,0.1)]`}
                  />
                  {/* Subtle Glow Ring */}
                  <div className={`absolute inset-0 w-6 h-6 -m-1.5 rounded-full ${color.bg} opacity-[0.08] group-hover:opacity-20 transition-opacity duration-300`} />
                </div>

                {/* Content Card */}
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="relative p-6 rounded-xl border border-neutral-800/60 bg-neutral-900/20 backdrop-blur-sm transition-all duration-300 hover:border-neutral-700 group-hover:bg-neutral-900/40 w-full overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-bold tracking-wider ${color.text} opacity-80 uppercase`}>
                      {item.year}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-neutral-700" />
                    <h3 className="text-base font-medium text-neutral-200 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                  
                  {/* Subtle Gradient Accent */}
                  <div 
                    className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 opacity-50"
                    style={{ background: `linear-gradient(90deg, transparent, ${color.glow.replace('0.2', '0.6')}, transparent)` }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Journey;
