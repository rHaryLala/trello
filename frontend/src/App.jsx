import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';  
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Profile from './pages/Profile';
import AddProject from './components/AddProject';
import DashboardTest from './pages/DashboardTest';
import { Provider } from 'react-redux';
import store from './redux/store'; // Adjust the path to your store
import Sidebar from './components/Sidebar';

const App = () => { 
  return (
    <BrowserRouter>
      <Routes>
        //route test
        <Route path="/test" element={  
          <Provider store={store}>
            <DashboardTest />
          </Provider>} 
        />

        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>  } 
        />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>  } 
        />
         <Route path="/add-project" element={
          <ProtectedRoute>
            <AddProject />
          </ProtectedRoute>  } 
        />
         <Route path="/sidebar" element={
          <ProtectedRoute>
            <Sidebar />
          </ProtectedRoute>  } 
        />
      </Routes>
    </BrowserRouter>
  );   
};

export default App;   