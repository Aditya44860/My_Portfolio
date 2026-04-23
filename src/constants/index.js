import project1 from "../assets/projects/project-1.png";
import project2 from "../assets/projects/project-2.png";
import project3 from "../assets/projects/project-3.png";

export const HERO_CONTENT = `A curious and tech-driven Data Science student who enjoys building solutions to real-world problems. Focused on creating scalable, efficient systems, with a strong drive to learn and continuously improve. Approaches challenges with a builder's mindset, turning ideas into practical solutions through structured thinking and experimentation. Constantly exploring new domains to grow as a well-rounded developer and contribute to meaningful, real-world applications.`;

export const ABOUT_TEXT = `I'm a second-year B.Tech Data Science student passionate about building real-world products at the intersection of software engineering and data. On the full stack side, I build with React, Next.js, Node.js, Express, MongoDB and SQL. On the data and AI/ML side, I work with Python, Pandas, NumPy, Scikit-learn and have hands-on experience with classification, regression, decision trees, neural networks, and RAG pipelines. I've built interactive dashboards using Excel and Tableau, and I love using data to tell compelling stories. I believe in writing purposeful code that solves real problems.`;

export const GITHUB_USERNAME = "Aditya44860";

export const SOCIAL_LINKS = {
  github: "https://github.com/Aditya44860",
  linkedin: "https://www.linkedin.com/in/aditya-bhardwaj-b09bb531b/",
  leetcode: "https://leetcode.com/u/aditya44860/",
  resume: "https://drive.google.com/file/d/1HK2_l1Yf9RgXvt20JzENIDOZIff6sm7z/view?usp=sharing",
};

export const TIMELINE = [
  {
    year: "2023",
    title: "Started the Journey",
    description: "Picked up HTML & CSS, built first static websites, and caught the bug for building things on the web.",
  },
  {
    year: "2024",
    title: "Entered B.Tech Data Science",
    description: "Joined university, dived deep into Python, algorithms, and data structures while rapidly expanding frontend skills.",
  },
  {
    year: "2024",
    title: "Mastered React & Frontend",
    description: "Shipped multiple React projects — learned Tailwind CSS, Framer Motion, and deployed a Movie Collection App to production.",
  },
  {
    year: "2025",
    title: "Full Stack with Node & Databases",
    description: "Built many projecs including AuraStore — a complete e-commerce platform with Node.js, Express, MongoDB, SQL, admin portal, and an AI chatbot.",
  },
  {
    year: "2025",
    title: "Data Engineering & AI/ML",
    description: "Learned and applied ML models (classification, regression, decision trees, neural networks), built RAG pipelines, and created data dashboards with Pandas, NumPy, and Tableau.",
  },
];

export const STATS = [
  { label: "LeetCode Solved", value: 250, suffix: "+" },
  { label: "Datasets Analyzed", value: 20, suffix: "+" },
  { label: "APIs Developed", value: 35, suffix: "+" },
];

// Fallback if GitHub API fails
export const PROJECTS = [
  {
    title: "AuraStore",
    image: project1,
    description:
      "A premium full-stack e-commerce solution featuring a 'Cyber-Studio' aesthetic, integrated AI assistant, and a real-time admin command center.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Prisma"],
    link: "https://github.com/Aditya44860/AuraStore",
  },
  {
    title: "FocusLab",
    image: project2,
    description:
      "A high-performance productivity suite designed for deep work, featuring synchronized Pomodoro tracking, task prioritization, and habit analytics.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/Aditya44860/FocusLab",
  },
  {
    title: "Discord Bot",
    image: project3,
    description:
      "An advanced automation utility for Discord communities, implementing custom command architectures and automated moderation systems.",
    technologies: ["Node.js", "Discord.js", "REST API"],
    link: "https://github.com/Aditya44860/Discord-Bot",
  },
  {
    title: "Tic-Tac-Toe 2.o",
    image: null,
    description:
      "A modernized, minimalist take on the classic game, featuring advanced AI opponents and a fluid glassmorphic user interface.",
    technologies: ["React", "Framer Motion", "CSS3"],
    link: "https://github.com/Aditya44860/Tic-Tac-Toe-2.o",
  },
];

export const CONTACT = {
  email: "adityasir10@gmail.com",
};
