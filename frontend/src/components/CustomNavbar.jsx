import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Dropdown, Avatar, Modal, Button } from 'flowbite-react';

const CustomNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear user session, tokens, etc.)
    localStorage.removeItem('token');
    console.log('User logged out');
    closeModal();
    navigate('/login');
  };

  return (
    <div>
      <Navbar>
        <Navbar.Brand>
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-800">
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
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item onClick={openModal}>Logout</Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>

      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>Logout</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Cancel</Button>
          <Button color="failure" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomNavbar;