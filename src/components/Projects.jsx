import React from 'react';
import { PROJECTS } from '../constants';
import { motion } from 'framer-motion';

// Animation presets
const fadeUp = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } }
};

const slideLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } }
};

const slideRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeInOut' } }
};

const Projects = () => {
  return (
    <div className='border-b border-neutral-500 pb-4'>
      {/* Heading */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className='my-20 text-center text-4xl'
      >
        My <span className="text-neutral-500">Projects</span>
      </motion.h1>

      {/* Projects Loop */}
      <div>
        {PROJECTS.map((project, index) => (
          <div key={index} className='mb-12 flex flex-wrap lg:justify-center'>

            {/* Project Image */}
            <motion.div
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full lg:w-1/4 flex justify-center"
            >
              <img
                src={project.image}
                alt={project.title}
                width={200}
                height={200}
                className='mb-6 rounded-xl shadow-md shadow-neutral-800'
              />
            </motion.div>

            {/* Project Details */}
            <motion.div
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full max-w-xl lg:w-3/4 px-4"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-2 inline-block text-lg font-semibold text-white transition duration-300 ease-in-out hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(38,198,218,0.9)]"
              >
                {project.title}
              </a>
              <p className='mb-4 text-neutral-400'>{project.description}</p>

              {/* Tech stack */}
              <div className="flex flex-wrap items-center">
                {project.technologies.map((tech, i) => (
                  <div
                    key={i}
                    className="mr-2 mb-2 rounded bg-neutral-900 px-2 py-1"
                  >
                    <span className="bg-gradient-to-t from-red-200 via-green-300 to-blue-400 bg-clip-text text-transparent text-sm font-medium">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default Projects;
