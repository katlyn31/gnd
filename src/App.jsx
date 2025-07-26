 import { Routes, Route, Link, Links } from 'react-router-dom';
import Home from './Pages/Home';
import Auth from './Pages/Auth';
import Register from './Pages/Register';
import Logo from './assets/1_owhfFcQfGbn1vFAukGRw-removebg-preview.png'
  
import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import Footer from './Components/Footer';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      x: '100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    open: {
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 px-8 flex items-center justify-between w-full">
        {/* Logo */}
        <div>
          <a href="/">
           <img src={Logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 cursor-pointer object-contain hover:scale-105 transition-transform"/>
          </a>
         
        </div>

       <div className="flex flex-col items-center justify-center">
     <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] whitespace-nowrap">
        Girls Next Door
      </h2>
    </div>

        {/* Desktop Navigation */}
        
        {/* Desktop Sign-in/Register */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-white text-lg"><Link to="/login">Sign in</Link></span>
          <a href='/register'>
                <button className="border cursor-pointer py-2 px-4 rounded-md text-white border-amber-100 hover:bg-amber-100 hover:text-blue-600 transition">
            Register
          </button>
          </a>
    
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-blue-600 w-full absolute z-10"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <ul className="flex flex-col items-center gap-4 py-4">
             
              <li>
                <span className="text-white text-lg"><Link to="/login">Sign in</Link> </span>
              </li>
              <li>
                <button className="border py-2 px-4 rounded-md text-white border-amber-100 hover:bg-amber-100 hover:text-blue-600 transition">
                  <a href="/register">

                  Register
                  </a>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
         <div className="p-6">
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/login" element={<Auth />} />
             <Route path="/register" element={<Register />} />
           </Routes>
         </div>
      <Footer/>
       </div>
 
  )
}

export default App
