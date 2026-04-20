import React, { useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import img1 from '../assets/avatar.svg';
import img2 from '../../assest/companylogo.png'
import { useLoginMutation } from '@/Rtk/authApi';
// import doctor from '../assets/Apron.jpg'
// import { handleLogin } from '../redux/slices/dynamicSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loginAdd] = useLoginMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: email,
      password: password
    }

    const response = await loginAdd(data)
    setLoading(false)

    if (response?.data) {
      navigate("/dashboard/home")
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the visibility of the password
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* SVG Background - Positioned absolutely */}
      <div className="absolute inset-0 z-0">
        <svg 
          viewBox="0 0 1000 1200" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <path d="M0,0 L0,1200 L1000,1200 L1000,600 C800,800 600,700 400,500 C200,300 100,100 0,0 Z" fill="#FFDE59" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-10 px-4 z-10 relative">
        {/* Company Logo */}
        <div className="hidden md:flex justify-end items-center">
          <img src={img2} alt="Company logo" className="w-96" />
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-10 w-full max-w-sm mx-auto text-center border-l-4 border-yellow-400">
          <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 uppercase">Welcome Back</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="relative flex items-center border-b-2 border-yellow-200 pb-2 transition-colors duration-300 focus-within:border-yellow-400 group">
              <FaUser className="text-yellow-500 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-gray-700 pl-2 pt-2"
                placeholder="Enter Your Email"
              />
            </div>
            
            <div className="relative flex items-center border-b-2 border-yellow-200 pb-2 transition-colors duration-300 focus-within:border-yellow-400 group">
              <FaLock className="text-yellow-500 mr-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-gray-700 pl-2"
                placeholder="Enter Password"
              />
              {/* Toggle the eye icon */}
              <div
                className="absolute right-2 top-1/4 text-yellow-400 cursor-pointer hover:text-yellow-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* <div className="flex justify-end">
              <a href="#" className="text-sm text-gray-800 ">Forgot Password?</a>
            </div> */}

            <button
              type="submit"
              className={`w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-800 rounded-full font-semibold uppercase transition-all duration-500 hover:from-yellow-500 hover:to-yellow-400 flex items-center justify-center shadow-md ${loading && 'opacity-50'}`}
              disabled={loading}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12c0 1.57.39 3.04 1.07 4.29l2.66-2.66A6.978 6.978 0 0 1 4 12zm16 0c0-1.57-.39-3.04-1.07-4.29l-2.66 2.66A6.978 6.978 0 0 0 20 12zm-8-8c-1.57 0-3.04.39-4.29 1.07l2.66 2.66A6.978 6.978 0 0 1 12 4z" />
                </svg>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;