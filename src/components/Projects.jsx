import React, { useEffect, useState } from "react";
import { PROJECTS, GITHUB_USERNAME } from "../constants";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const slideLeft = { hidden: { x: -60, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } } };
const slideRight = { hidden: { x: 60, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } } };
const fadeUp = { hidden: { y: 50, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } } };

const getScreenshotUrl = (homepage) => {
  if (!homepage) return null;
  return `https://api.microlink.io/?url=${encodeURIComponent(homepage)}&screenshot=true&meta=false&embed=screenshot.url`;
};

const SkeletonCard = () => (
  <div className="mb-12 flex flex-wrap lg:justify-center animate-pulse">
    <div className="w-full lg:w-1/4 flex justify-center">
      <div className="skeleton w-[200px] h-[150px] rounded-xl mb-6" />
    </div>
    <div className="w-full lg:w-3/4 px-4 space-y-3 py-2">
      <div className="skeleton h-5 w-1/3 rounded" />
      <div className="skeleton h-3 w-full rounded" />
      <div className="skeleton h-3 w-3/4 rounded" />
    </div>
  </div>
);

const ProjectCard = ({ title, image, screenshotUrl, description, link, repoUrl, index }) => {
  const displayImage = screenshotUrl || image;

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="mb-12 flex flex-wrap lg:justify-center group"
    >
      {/* Image */}
      <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="w-full lg:w-1/4 flex justify-center">
        <div className="relative mb-6 w-[200px] h-[150px] rounded-xl overflow-hidden border border-neutral-800 group-hover:border-neutral-600 transition-colors duration-400"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
          {displayImage ? (
            <img src={displayImage} alt={title}
              className="w-full h-full object-cover brightness-80 group-hover:brightness-100 transition-all duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
              <FaGithub className="text-4xl text-neutral-600" />
            </div>
          )}
          {/* White glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </motion.div>

      {/* Details */}
      <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="w-full max-w-xl lg:w-3/4 px-4">
        <div className="flex items-start gap-3 mb-2">
          <a href={link || repoUrl} target="_blank" rel="noopener noreferrer"
            className="text-lg font-semibold text-white hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.7)] transition-all duration-300 flex items-center gap-2 group/title">
            {title}
            <FaExternalLinkAlt className="text-xs opacity-0 group-hover/title:opacity-60 transition-opacity" />
          </a>
        </div>
        <p className="text-neutral-400 font-light leading-relaxed">{description}</p>
        {repoUrl && (
          <a href={repoUrl} target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-300 transition-colors duration-200">
            <FaGithub /> View on GitHub
          </a>
        )}
      </motion.div>
    </motion.div>
  );
};

// Cache repos in memory so it doesn't refetch on every component re-render,
// but perfectly fetches fresh data if the user hits the browser Refresh button.
let cachedPinnedRepos = null;

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cachedPinnedRepos) {
      setRepos(cachedPinnedRepos);
      setLoading(false);
      return;
    }
    //Pinned Repo list 
    const PINNED_REPOS = ["AuraStore", "FocusLab", "Discord-Bot", "Tic-Tac-Toe-2.o"];

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => {
        // Map over PINNED_REPOS to maintain exact order
        const pinned = PINNED_REPOS.map(name => data.find(r => r.name === name)).filter(Boolean);
        cachedPinnedRepos = pinned;
        setRepos(pinned);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const useFallback = error || (!loading && repos.length === 0);

  return (
    <div id="projects" className="border-b border-neutral-900 pb-4">
      <motion.h1
        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="my-20 text-center text-4xl"
      >
        My <span className="text-neutral-500">Projects</span>
      </motion.h1>

      <motion.p
        whileInView={{ opacity: 1 }} initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }} viewport={{ once: true }}
        className="text-center text-neutral-600 text-xs tracking-widest uppercase mb-10 -mt-10"
      >
        {useFallback ? "Featured Projects" : "✦ Auto-synced from GitHub — pinned repos"}
      </motion.p>

      <div>
        {loading && [0, 1, 2, 3].map((i) => <SkeletonCard key={i} />)}

        {useFallback && PROJECTS.slice(0, 4).map((project, index) => (
          <ProjectCard
            key={index}
            index={index}
            title={project.title}
            image={project.image}
            screenshotUrl={null}
            description={project.description}
            link={project.link}
            repoUrl={project.link}
          />
        ))}

        {!loading && !useFallback && repos.map((repo, index) => (
          <ProjectCard
            key={repo.id}
            index={index}
            title={repo.name.replace(/[-_]/g, " ")}
            image={null}
            screenshotUrl={repo.homepage ? getScreenshotUrl(repo.homepage) : null}
            description={repo.description || "No description provided."}
            link={repo.homepage || repo.html_url}
            repoUrl={repo.html_url}
          />
        ))}
      </div>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }} viewport={{ once: true }}
        className="flex justify-center mt-6 mb-4"
      >
        <motion.a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank" rel="noopener noreferrer"
          whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(255,255,255,0.08)" }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg border border-neutral-800 text-sm text-neutral-500 hover:text-white hover:border-neutral-500 transition-all duration-250"
        >
          <FaGithub /> View all on GitHub
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Projects;
