import React, { useState } from 'react';  
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { Link } from "react-router-dom";

const Landing = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="min-h-screen flex flex-col">    
          <Navbar rounded className="bg-white shadow-lg">
            <Navbar.Brand href="#">
              <img
                src="/logo.webp"
                className="mr-3 h-8 sm:h-12 rounded-full"
                alt="Logo Gestion de Projet"
              />
              <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
                Gestion de Projet
              </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img="/hary.JPG"
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">Hary Lala Rabenamana</span>
                  <span className="block truncate text-sm font-medium">hary@gmail.com</span>
                </Dropdown.Header>
                <Dropdown.Item>Tableau de bord</Dropdown.Item>
                <Dropdown.Item>Paramètres</Dropdown.Item>
                <Dropdown.Item>Earnings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>Se deconnecter</Dropdown.Item>
              </Dropdown>
              <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
              <Navbar.Link href="#" active>
                Accueil
              </Navbar.Link>
              <Navbar.Link href="#" onClick={() => setOpenModal(true)}>
                À propos
              </Navbar.Link>
              <Navbar.Link href="#">Services</Navbar.Link>
              <Navbar.Link href="#">Tâches</Navbar.Link>
              <Navbar.Link href="#">Contact</Navbar.Link>
            </Navbar.Collapse>
    
            {/* Modal */}
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
              <Modal.Header>À propos</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Bienvenue sur notre plateforme de gestion de projet ! Nous sommes là pour
                    simplifier vos tâches.
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    Test Modal fotsiny ity e 😘
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setOpenModal(false)}>OK</Button> 
              </Modal.Footer>
            </Modal>
          </Navbar>
    
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex flex-col flex-grow w-full items-center justify-center text-center px-4 py-20">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 animate-fade-in">
              Bienvenue dans la <span className="text-yellow-300">Gestion de Projet</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl animate-fade-in">
              Optimisez vos processus de gestion de projet grâce à notre plateforme intuitive et
              moderne.
            </p>
            <div className="flex gap-4 animate-fade-in">
              <Button color="light" size="lg" className="font-semibold">
                Découvrir Plus
              </Button>
              <Link to="/login">
                <Button color="dark" size="lg" className="font-semibold">
                    Commencer Maintenant
                </Button>
              </Link>
            </div>
          </div>
    
          {/* Footer */}
          <footer className="bg-white text-black py-6">
            <div className="text-center">
              <p className="text-sm">&copy; 2024 Gestion de Projet. Tous droits réservés.</p>
            </div>  
          </footer>
        </div>  
      );
};

export default Landing