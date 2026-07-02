import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/'); // Redirect to home on successful login
    }
  };

  return (
    <div className="pt-24 min-h-screen flex justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white dark:bg-grayd p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">Sign In</h2>
        <div className="space-y-4">
          <input 
            type="email" 
            placeholder="Email (test@test.com)" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary"
          />
          <input 
            type="password" 
            placeholder="Password (123)" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-md border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary"
          />
          <button 
            type="submit" 
            className="w-full bg-primary text-white py-3 rounded-md font-bold hover:bg-red-700 transition"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;