'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavLinks } from '@/constants/Navbar';
import { LightLogo, Logo } from '@/constants/Icons';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

function NavBar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  const [showSwitchMode, setShowSwitchMode] = useState(false);

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Delay 
    const delayTimer = setTimeout(() => {
      setShowSwitchMode(true);

      // Delay for text appearance
      const textTimer = setTimeout(() => {
        setShowText(true);
      }, 800);

      // Hide both after 10 seconds
      const hideTimer = setTimeout(() => {
        setShowSwitchMode(false);
        setShowText(false);
      }, 8000);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(textTimer);
      };
    }, 1000);

    return () => clearTimeout(delayTimer);
  }, []);

  // Toggle dark mode in localStorage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  //  animation SWI
  const arrowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.5 } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } }
  };

  return (
    <div className="h-20 lg:h-fit fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-8 lg:pt-0 ">
      <div className="w-full px-4 lg:p-4 ">
        <div className={`w-full rounded-lg h-fit shadow-[0px_4px_16px_rgba(0,0,0,0.1)] dark:shadow-none backdrop-blur-[16px] dark:backdrop-blur-0 ${isOpen && 'mt-60'} lg:mt-0`}>
          <div
            className={`dark:text-white text-black dark:rounded-lg rounded-lg sm:px-8 min-h-16 lg:h-20 w-full p-2 pt-3 dark:bg-[#282828] bg-white
            ${!isOpen ? 'flex items-center' : ''}`}
          >
            <div className="flex items-center justify-between xl:px-5 w-full relative">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="h-fit w-fit hidden lg:flex element z-20 -ml-5 px-5 py-4">
                  <Logo className="h-9 lg:h-fit dark:block hidden" />
                  <LightLogo className="h-9 lg:h-fit dark:hidden block" />
                </div>
                <div className="font-semibold text-lg hidden lg:flex flex-col absolute z-10 group-hover:opacity-100 opacity-0 duration-300 group-hover:left-20 left-0">
                  <span>Anonymous</span>
                  <span>Squirrels</span>
                </div>
                <div className="h-fit w-fit flex lg:hidden element z-20 -ml-5 px-5 ">
                  <Logo className="h-8 dark:block hidden" />
                  <LightLogo className="h-8 dark:hidden block" />
                </div>
                <div className="font-semibold text-base flex flex-col lg:hidden absolute z-10 left-14">
                  <span>Anonymous</span>
                  <span>Squirrels</span>
                </div>
              </Link>
              <div className="hidden lg:flex items-center gap-5">
                <ul className="flex items-center gap-9 group text-lg">
                  {NavLinks.map((item) => (
                    <Link
                      href={item.path}
                      key={item.tag}
                      className={`${item.tag === 'Contact' && path === item.path ? 'text-black dark:text-white hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white border border-black dark:border-white px-4 py-1 rounded-sm' :
                          item.tag === 'Contact' ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white border border-black dark:border-white px-4 py-1 rounded-sm' :
                          (path === item.path ? 'text-sq-violet group-hover:text-black dark:group-hover:text-white' : '') + ' hover:text-sq-violet transition-all duration-300'
                        }`}
                    >
                      {item.tag}
                    </Link>
                  ))}
                </ul>
                <div className="relative">
                  {showSwitchMode && (
                    <motion.div
                      className="absolute right-[70px] mt-1 whitespace-nowrap text-sm dark:text-white text-black flex items-center"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.div
                        className="mt-4 font-bold mr-1 text-base flex flex-col"
                        style={{ top: '43px', position: 'relative' }}
                        variants={textVariants}
                      >
                        <span>Switch</span><span>Mode</span>
                      </motion.div>
                      <motion.img
                        src="/assets/arrowTogglenew.png"
                        alt="switch mode"
                        width={60}
                        height={60}
                        className='inline-block top-8 relative'
                        variants={arrowVariants}
                      />
                    </motion.div>
                  )}
                  <button
                    title='toggle'
                    onClick={toggleDarkMode}
                    className="p-1 rounded-full transition-all duration-1000"
                  >
                    <div className="relative h-8 w-8">
                      <HiOutlineSun
                        className={`absolute h-full w-full transition-transform duration-1000 ${darkMode ? 'rotate-180 scale-0' : 'scale-100'
                          }`}
                      />
                      <HiOutlineMoon
                        className={`absolute h-full w-full text-gray-300 transition-transform duration-1000 ${darkMode ? 'scale-100' : 'scale-0 rotate-180'
                          }`}
                      />
                    </div>
                  </button>
                </div>
              </div>
              <div className='flex items-center space-x-4 lg:hidden'>
                <div className="relative">
                  {/* we can implement the text and arrow here also  */}
                  <button
                    title='toggle'
                    onClick={toggleDarkMode}
                    className="rounded-full transition-all duration-1000"
                  >
                    <div className="relative h-8 mt-1.5 w-8">
                      <HiOutlineSun
                        className={`absolute h-full w-full transition-transform duration-1000 ${darkMode ? 'rotate-180 scale-0' : 'scale-100'
                          }`}
                      />
                      <HiOutlineMoon
                        className={`absolute h-full w-full text-gray-300 transition-transform duration-1000 ${darkMode ? 'scale-100' : 'scale-0 rotate-180'
                          }`}
                      />
                    </div>
                  </button>
                </div>
                <div onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
                  {!isOpen ? (
                    <FiMenu className="h-8 w-8" />
                  ) : (
                    <IoMdClose className="h-8 w-8" />
                  )}
                </div>
              </div>
            </div>
            {isOpen && (
              <div className="rounded-lg mt-6 mb-2 lg:hidden">
                {NavLinks.map((item) => (
                  <Link
                    href={item.path}
                    key={item.tag}
                    className="block text-center font-medium text-lg my-4"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
