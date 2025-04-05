import React from 'react'
import logo from '../assets/Logo2.png'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { SiLeetcode } from "react-icons/si";

const Navbar = () => {
  return (
    <nav className='mb-20 flex items-center justify-between py-6'>
      <div className="flex shrink-0 items-center">
        <img
          className='h-10'
          src={logo}
          alt="logo"
          style={{
            width: "60px",
            height: "2.4rem",
            objectFit: "cover",
            objectPosition: "55% 48%",
            opacity: 0.8
          }}
        />
      </div>

      <div className='m-8 flex items-center justify-center text-[1.7rem] gap-6'>
        <a
          href="https://www.linkedin.com/in/aditya-bhardwaj-b09bb531b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
          target="_blank"
          className="text-neutral-300 transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_6px_cyan]"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Aditya44860"
          target="_blank"
          className="text-neutral-300 transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_6px_cyan]"
        >
          <FaGithub />
        </a>
        <a
          href="https://leetcode.com/u/aditya44860/"
          target="_blank"
          className="text-neutral-300 transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_6px_cyan]"
        >
          <SiLeetcode />
        </a>
        <a
          href="https://www.instagram.com/bhardwaj_2006_/"
          target="_blank"
          className="text-neutral-300 transition duration-300 hover:text-cyan-400 hover:drop-shadow-[0_0_6px_cyan]"
        >
          <FaInstagram />
        </a>
      </div>
    </nav>
  )
}

export default Navbar
