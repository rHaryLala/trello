import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from '../components/CustomNavbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    profilePhoto: null
  });
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

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
        if (response.data.profilePhoto) {
          setPreviewUrl(response.data.profilePhoto);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data');
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUser((prevUser) => ({ ...prevUser, profilePhoto: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, user is not logged in');
      toast.error('You are not logged in');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    if (user.profilePhoto instanceof File) {
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
      toast.success('Votre profil a été mis à jour avec succès');
      if (response.data.profilePhoto) {
        setPreviewUrl(response.data.profilePhoto);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomNavbar />
      <div className="relative min-h-screen bg-gray-100 flex items-center justify-center">
        //background
        <div className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center z-0" style={{ backgroundImage: `url('/background.jpg')` }}></div>

          <div className="flex flex-col lg:flex-row justify-center items-start space-y-8 lg:space-y-0 lg:space-x-8 mt-6">
            <div className="flex flex-col bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/2 z-10">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                  <img 
                    src={previewUrl || '/logo.webp'} 
                    alt="Profile" 
                    className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-md cursor-pointer"
                    onClick={() => document.getElementById('profilePhotoInput').click()}
                  />
                  <input 
                    type="file" 
                    name="profilePhoto" 
                    id="profilePhotoInput" 
                    onChange={handleFileChange} 
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer" 
                    style={{ display: 'none' }}
                  />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">{user.firstName}</h2>
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">{user.lastName}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-col bg-white shadow-lg rounded-lg p-8 w-full lg:w-1/2 z-10">
              <form onSubmit={handleSubmit} className="mt-6">
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
                <button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={loading}
                >
                  {loading ? 'Mise à jour en cours' : 'Mettre à jour'}
                </button>
              </form>
            </div>
          </div>  

      </div>

      <ToastContainer />
    </>
  );
};

export default Profile;

