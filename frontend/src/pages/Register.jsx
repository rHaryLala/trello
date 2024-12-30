import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordView = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordView = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Rediriger vers la page de connexion après une inscription réussie
        navigate('/login');
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


  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-lg">
        <img src="/logo.webp" alt="logo" className="w-12 md:w-14 rounded-full" />
        <h1 className="text-lg md:text-xl font-semibold text-white">Créer un compte</h1>
        <p className="text-xs md:text-sm text-gray-500 text-center">
          Vous avez déjà un compte ?  
          <Link to="/login">
            <span className="text-white"> Connexion</span>
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl">
            <input
              type="text"
              placeholder="Nom"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl">
            <input
              type="text"
              placeholder="Prénom"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl">
            <input
              type="email"
              placeholder="Adresse e-mail"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <i className="absolute right-5 cursor-pointer text-white" onClick={togglePasswordView}>👁️</i>
            ) : (
              <i className="absolute right-5 cursor-pointer text-white" onClick={togglePasswordView}>👁️</i>
            )}
          </div>

          <div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmer le mot de passe"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showConfirmPassword ? (
              <i className="absolute right-5 cursor-pointer text-white" onClick={toggleConfirmPasswordView}>👁️</i>
            ) : (
              <i className="absolute right-5 cursor-pointer text-white" onClick={toggleConfirmPasswordView}>👁️</i>
            )}
          </div>

          <button className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:bg-blue-600 text-sm md:text-base text-white">
            S'inscrire
          </button>
        </form>

        <div className="relative w-full flex items-center justify-center py-3">
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
          <h3 className="font-lora text-xs md:text-sm px-4 text-gray-500">
            Ou
          </h3>
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
        </div>

        <div className="w-full flex items-center justify-evenly md:justify-between gap-2">
          <div className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800" onClick={handleGoogleSignUp}>
            <FcGoogle className="text-lg md:text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;