import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import Navbar from './components/navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Technologies from './components/Technologies';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Contact from './components/MyContact';
import Footer from './components/Footer';
import logo from './assets/Logo2.png';

const App = () => {
  const [showTop, setShowTop] = useState(false);
  const [phase, setPhase] = useState(() => {
    return sessionStorage.getItem("has_seen_intro") ? 4 : 0;
  });

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let t1, t2, t3, t4;
    if (phase === 0) {
      t1 = setTimeout(() => setPhase(1), 800);
    } else if (phase === 1) {
      t2 = setTimeout(() => setPhase(2), 1500);
    } else if (phase === 2) {
      t3 = setTimeout(() => setPhase(3), 800);
    } else if (phase === 3) {
      t4 = setTimeout(() => {
        setPhase(4);
        sessionStorage.setItem("has_seen_intro", "true");
      }, 1000);
    }
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [phase]);

  return (
    <div className='text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-950'>

      {/* ── Background (original) ── */}
      <div className='fixed top-0 -z-10 h-full w-full bg-black'>
        <motion.div 
          className="absolute top-0 left-0 z-[-2] h-full w-full bg-[radial-gradient(ellipse_90%_70%_at_80%_20%,rgba(95,88,240,0.08),transparent),radial-gradient(ellipse_90%_70%_at_80%_80%,rgba(0,255,255,0.08),transparent),radial-gradient(ellipse_90%_70%_at_0%_0%,rgba(0,255,40,0.05),transparent),radial-gradient(ellipse_90%_90%_at_100%_0%,rgba(255,0,0,0.05),transparent),radial-gradient(ellipse_60%_50%_at_30%_70%,rgba(255,0,255,0.05),transparent)]" 
          initial={{ opacity: phase === 3 ? 0 : 1 }}
          animate={{ opacity: phase >= 4 ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>

      <AnimatePresence>
        {phase < 3 && (
          <motion.div
            key="loading-screen"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            <motion.div
              layoutId="navbar-logo"
              initial={false}
              animate={
                phase === 0 ? { filter: "drop-shadow(0 0 0px rgba(255,255,255,0))", opacity: 0.3 } :
                phase === 1 ? {
                  filter: [
                    "drop-shadow(0 0 10px rgba(255,255,255,0.6))", 
                    "drop-shadow(0 0 0px rgba(255,255,255,0))", 
                    "drop-shadow(0 0 10px rgba(255,255,255,0.6))", 
                    "drop-shadow(0 0 0px rgba(255,255,255,0))", 
                    "drop-shadow(0 0 10px rgba(255,255,255,0.6))", 
                    "drop-shadow(0 0 10px rgba(255,255,255,0.6))", 
                    "drop-shadow(0 0 0px rgba(255,255,255,0))", 
                    "drop-shadow(0 0 10px rgba(255,255,255,0.6))"
                  ],
                  opacity: [0.8, 0.2, 0.8, 0.2, 0.8, 0.8, 0.2, 0.8]
                } :
                { filter: "drop-shadow(0 0 12px rgba(255,255,255,0.7))", opacity: 1 } // phase 2
              }
              transition={
                phase === 1 ? { duration: 1.5, times: [0, 0.05, 0.1, 0.15, 0.2, 0.6, 0.65, 1], ease: "linear" } : { duration: 0.3 }
              }
            >
              <img 
                src={logo} 
                alt="Loading..." 
                style={{ width: '180px', height: '7.2rem', objectFit: 'cover', objectPosition: '55% 48%' }} 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Content ── */}
      {phase >= 3 && (
        <>
          <Navbar />
          <motion.div
            initial={{ opacity: phase === 3 ? 0 : 1 }}
            animate={{ opacity: phase >= 4 ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className='container m-auto'>
            <Hero />
            <About />
            <Stats />
            <Technologies />
            <Projects />
            <Journey />
            <Contact />
          </div>

          <Footer />

          {/* ── Scroll to top ── */}
          <AnimatePresence>
            {showTop && (
              <motion.button
                initial={{ opacity: 0, y: 16, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                id="scroll-to-top"
                className="scroll-top-btn fixed bottom-8 right-6 z-50 w-10 h-10 rounded-full border border-neutral-700 bg-neutral-900/80 backdrop-blur-sm text-neutral-400 hover:text-white hover:border-purple-500/50 flex items-center justify-center transition-colors duration-250"
                aria-label="Scroll to top"
              >
                <FaArrowUp className="text-xs" />
              </motion.button>
            )}
          </AnimatePresence>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default App;
