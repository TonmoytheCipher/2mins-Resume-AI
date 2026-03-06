import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(''); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', formData);
      
      localStorage.setItem('token', response.data.token);

      const nameToSave = response.data.user?.name || response.data.user?.fullName || response.data.name || 'User';
      localStorage.setItem('userName', nameToSave);
      
      navigate('/'); 
      
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 font-sans p-6">
      
      {/* --- Login Card --- */}
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl border border-slate-100 p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-500 font-medium">Sign in to access your AI resumes.</p>
        </div>

        {/* Error Message Display */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium animate-pulse">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input 
              id="email"
              type="email" 
              name="email" 
              placeholder="you@example.com" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 text-slate-800 placeholder-slate-400 font-medium"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-700" htmlFor="password">
                Password
              </label>
              <a href="#" className="text-sm font-bold text-blue-600 hover:text-indigo-600 transition-colors">
                Forgot password?
              </a>
            </div>
            <input 
              id="password"
              type="password" 
              name="password" 
              placeholder="••••••••" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 text-slate-800 placeholder-slate-400 font-medium"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-md transition-all duration-300 flex justify-center items-center ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-slate-500 font-medium">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-blue-600 font-bold hover:text-indigo-600 transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}