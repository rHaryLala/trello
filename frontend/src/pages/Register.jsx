import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

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
      toast.error("Les mots de passe ne correspondent pas");
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
        toast.success("Inscription réussie !", {
          autoClose: 2000,
          onClose: () => navigate('/login')
        });
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = 'http://localhost:5000/api/users/auth/google';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <motion.div 
        className="w-[90%] max-w-sm md:max-w-md lg:max-w-md p-5 bg-gray-900 flex-col flex items-center gap-3 rounded-xl shadow-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img 
          src="/logo.webp" 
          alt="logo" 
          className="w-12 md:w-14 rounded-full"
          variants={itemVariants}
        />
        <motion.h1 
          className="text-lg md:text-xl font-semibold text-white"
          variants={itemVariants}
        >
          Créer un compte
        </motion.h1>
        
        <motion.form onSubmit={handleSubmit} className="w-full flex flex-col gap-3" variants={itemVariants}>
          <motion.div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl" variants={itemVariants}>
            <input
              type="text"
              placeholder="Nom"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </motion.div>

          <motion.div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl" variants={itemVariants}>
            <input
              type="text"
              placeholder="Prénom"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </motion.div>

          <motion.div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl" variants={itemVariants}>
            <input
              type="email"
              placeholder="Adresse e-mail"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          <motion.div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl relative" variants={itemVariants}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <motion.i 
              className="absolute right-5 cursor-pointer text-white" 
              onClick={togglePasswordView}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </motion.i>
          </motion.div>

          <motion.div className="w-full flex items-center gap-2 bg-gray-800 p-2 rounded-xl relative" variants={itemVariants}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmer le mot de passe"
              className="bg-transparent border-0 w-full outline-none text-sm md:text-base text-white placeholder-gray-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <motion.i 
              className="absolute right-5 cursor-pointer text-white" 
              onClick={toggleConfirmPasswordView}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </motion.i>
          </motion.div>

          <motion.button 
            className="w-full p-2 bg-blue-500 rounded-xl mt-3 hover:bg-blue-600 text-sm md:text-base text-white"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            S'inscrire
          </motion.button>
        </motion.form>

        <ToastContainer />
        <motion.div className="relative w-full flex items-center justify-center py-3" variants={itemVariants}>
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
          <h3 className="font-lora text-xs md:text-sm px-4 text-gray-500">
            Ou
          </h3>
          <div className="w-2/5 h-[2px] bg-gray-800"></div>
        </motion.div>

        <motion.p className="text-xs md:text-sm text-gray-500 text-center" variants={itemVariants}>
          Vous avez déjà un compte ?  
          <Link to="/login">
            <span className="text-white"> Connexion</span>
          </Link>
        </motion.p>

        <motion.div className="w-full flex items-center justify-evenly md:justify-between gap-2" variants={itemVariants}>
          <motion.div 
            className="p-2 md:px-6 lg:px-10 bg-slate-700 cursor-pointer rounded-xl hover:bg-slate-800" 
            onClick={handleGoogleSignUp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FcGoogle className="text-lg md:text-xl" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;

