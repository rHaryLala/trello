import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';  
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const App = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>  } 
        />
      </Routes>
    </BrowserRouter>
  );   
};

export default App;   