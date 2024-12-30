import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    profilePhoto: ''
  });

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
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUser((prevState) => ({
      ...prevState,
      profilePhoto: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, user is not logged in');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    if (user.profilePhoto) {
      formData.append('profilePhoto', user.profilePhoto);
    }

    try {
      const response = await axios.put('/api/users/user', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
        <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/background.jpg')` }}
      ></div>
        <div className="bg-opacity-40 relative bg-white shadow-lg rounded-lg p-8 max-w-lg w-full z-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profil</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                Nom
              </label>
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Prénom
              </label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Téléphone
              </label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePhoto">
                Photo de profil
              </label>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {user.profilePhoto && (
              <div className="mb-4">
                <img src={URL.createObjectURL(user.profilePhoto)} alt="Profile Preview" className="rounded-full w-32 h-32 object-cover mx-auto" />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Modifier
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;