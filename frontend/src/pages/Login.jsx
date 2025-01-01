
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Stocker le token dans le localStorage ou gérer l'authentification comme vous le souhaitez
        localStorage.setItem('token', data.token);
        navigate('/dashboard'); // Rediriger vers le tableau de bord ou une autre page
      } else {
        alert(data.message); // Afficher un message d'erreur
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:5000/api/users/auth/google';
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative bg-gradient-to-b from-purple-800 to-purple-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('/background.jpg')` }}
      ></div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white bg-opacity-10 rounded-xl shadow-xl p-4 max-w-xs w-full backdrop-blur-lg border border-white border-opacity-20">
        <h2 className="text-center text-2xl font-bold text-white mb-4">Connexion</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <input
              className="w-full p-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              type="email"
              id="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="absolute right-3 top-2 text-white font-normal not-italic">📧</i>
          </div>
          <div className="mb-4 relative">
            <input
              className="w-full p-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className="absolute right-4 top-3 text-gray-700 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
          </div>
          <button className="w-full p-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400">
            Se connecter
          </button>
        </form>
        <div className="relative w-full flex items-center justify-center py-3">
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
          <h3 className="font-lora text-xs md:text-sm px-4 text-white">
            Ou
          </h3>
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <FcGoogle className="text-2xl cursor-pointer" onClick={handleGoogleSignUp}/>
        </div>
        <div className="mt-4 text-center">
          <span className="text-white">Pas de compte ? </span>
          <Link to="/register" className="text-purple-400 hover:underline">
            S'inscrire
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;