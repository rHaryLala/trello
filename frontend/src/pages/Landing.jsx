import React, { useState } from 'react';
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Landing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const controls = useAnimation();
    const [ref, inView] = useInView();

    React.useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.6 } }
    };

    const slideIn = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };


  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

    return (
        <motion.div 
            className="min-h-screen flex flex-col"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >    
          <motion.nav variants={slideIn}>
            <Navbar rounded className="bg-white shadow-lg">
              {/* ... Navbar content ... */}
            </Navbar>
          </motion.nav>
    
          {/* Hero Section */}
          <motion.div 
            className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex flex-col flex-grow w-full items-center justify-center text-center px-4 py-20"
            variants={staggerChildren}
            initial="hidden"
            animate={controls}
            ref={ref}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl font-extrabold text-white mb-6"
              variants={slideIn}
            >
              Bienvenue dans la <motion.span 
                className="text-yellow-300"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              >
                Gestion de Projet
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl"
              variants={slideIn}
            >
              Optimisez vos processus de gestion de projet grâce à notre plateforme intuitive et
              moderne.
            </motion.p>
            <motion.div 
              className="flex gap-4"
              variants={slideIn}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button color="light" size="lg" className="font-semibold" onClick={openModal}>
                  Découvrir Plus  
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/login">
                  <Button color="dark" size="lg" className="font-semibold">
                      Commencer Maintenant
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
    

          <Modal show={isModalOpen} onClose={closeModal}>
            <Modal.Header>Gestion de projet</Modal.Header>
            <Modal.Body>
              <p>Notre plateforme vous permet de gérer vos projets de manière efficace et collaborative en un seul endroit.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={closeModal}>J'ai compris</Button>
            </Modal.Footer>
          </Modal>


          {/* Footer */}
          <motion.footer 
            className="bg-white text-black py-6"
            variants={slideIn}
            initial="hidden"
            animate={controls}
          >
            <div className="text-center">
              <p className="text-sm">&copy; 2024 Gestion de Projet. Tous droits réservés.</p>
            </div>  
          </motion.footer>
        </motion.div>  
    );
};

export default Landing;

