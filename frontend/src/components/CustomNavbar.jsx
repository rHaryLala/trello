import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar, Dropdown, Avatar, Modal, Button } from 'flowbite-react';
import axios from 'axios';

const CustomNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', profilePhoto: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, user is not logged in');
        return;
      }

      try {
        const response = await axios.get('/api/users/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          profilePhoto: response.data.profilePhoto
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (error.response && error.response.status === 401) {
          console.error('Unauthorized access, redirecting to login');
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Utilisateur déconnecté');
    closeModal();
    navigate('/login');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const goToAddProject = () => {
    navigate('/add-project');
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <div>
      <Navbar>
        <Navbar.Brand>
        <Link to="/dashboard">
            <img
              src="/logo.webp"
              className="mr-3 h-8 sm:h-12 rounded-full"
              alt="Logo Gestion de Projet"
            />
        </Link>
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-800">
            Gestion de Projet
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              user.profilePhoto ? (
                <Avatar
                  alt="User settings"
                  img={user.profilePhoto}
                  rounded
                />
              ) : (
                <div className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full text-white">
                  {getInitials(user.firstName, user.lastName)}
                </div>
              )
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{`${user.firstName} ${user.lastName}`}</span>
              <span className="block truncate text-sm font-medium">{user.email}</span>
            </Dropdown.Header>
            <Dropdown.Item >Nouveau projet</Dropdown.Item>
            <Dropdown.Item onClick={goToProfile}>Profil</Dropdown.Item>
            <Dropdown.Item>Paramètres</Dropdown.Item>
            <Dropdown.Item onClick={openModal}>Déconnexion</Dropdown.Item>
          </Dropdown>
        </div>
      </Navbar>

      <Modal show={isModalOpen} onClose={closeModal} className=''>
        <Modal.Header>Se Deconnecter ?</Modal.Header>
        <Modal.Body>
          <p>Voulez-vous vraiment quitter la session ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>Annuler</Button>
          <Button color="failure" onClick={handleLogout}>Déconnexion</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomNavbar;