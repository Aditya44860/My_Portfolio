import { useState } from "react";
import { CONTACT, SOCIAL_LINKS } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaCopy, FaCheck, FaArrowRight } from "react-icons/fa";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="contact" className="border-b border-neutral-500 pb-20 mt-20 mb-10">
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="my-10 text-center text-4xl text-neutral-300 heading-line"
      >
        Get In Touch
      </motion.h1>

      <motion.p
        whileInView={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-center text-neutral-500 text-sm mb-12 max-w-sm mx-auto font-light"
      >
        Whether you have an opportunity, a project idea, or just want to connect — I'm always happy to hear from you.
      </motion.p>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="max-w-md mx-auto"
      >
        <div className="gradient-border-wrap">
          <div className="gradient-border-inner p-8">
            {/* Email row */}
            <div className="flex items-center justify-between border border-neutral-800 rounded-xl px-4 py-3 mb-5 bg-neutral-900/60 hover:border-neutral-700 transition-colors duration-200">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-neutral-500 text-sm" />
                <span className="text-neutral-300 text-sm font-mono tracking-tighter">{CONTACT.email}</span>
              </div>
              <motion.button
                onClick={handleCopy}
                whileTap={{ scale: 0.92 }}
                id="copy-email-btn"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs border border-neutral-700 text-neutral-400 hover:text-neutral-200 hover:border-neutral-500 transition-all duration-200"
              >
                <AnimatePresence mode="wait">
                  {copied
                    ? <motion.span key="check" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1 text-emerald-400"><FaCheck className="text-[10px]" /> Copied</motion.span>
                    : <motion.span key="copy" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1"><FaCopy className="text-[10px]" /> Copy</motion.span>
                  }
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Primary CTA */}
            <motion.a
              href={`mailto:${CONTACT.email}`}
              id="contact-email-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-100 transition-colors duration-200 mb-3"
            >
              <FaEnvelope className="text-xs" />
              Send an Email
              <FaArrowRight className="text-xs ml-auto" />
            </motion.a>

            {/* Secondary CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <motion.a
                href={SOCIAL_LINKS.linkedin}
                target="_blank" rel="noopener noreferrer"
                id="contact-linkedin-btn"
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-700 text-sm text-neutral-400 hover:text-white hover:border-neutral-500 transition-all duration-200"
              >
                <FaLinkedin /> LinkedIn
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.github}
                target="_blank" rel="noopener noreferrer"
                id="contact-github-btn"
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-700 text-sm text-neutral-400 hover:text-white hover:border-neutral-500 transition-all duration-200"
              >
                <FaGithub /> GitHub
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
