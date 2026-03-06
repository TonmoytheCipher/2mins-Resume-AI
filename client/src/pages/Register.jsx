import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', formData);
      console.log('Server response:', response.data);
      // Send them to the login page so they can use their new account!
      navigate('/login'); 
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 font-sans p-6">
      
      {/* --- Registration Card --- */}
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-xl border border-slate-100 p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Create an Account</h2>
          <p className="text-slate-500 font-medium">Join us and start building your dream resume.</p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input 
              id="name"
              type="text" 
              name="name" 
              placeholder="e.g. Tonmoy Roy" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 text-slate-800 placeholder-slate-400 font-medium"
            />
          </div>

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
            <label className="block text-sm font-bold text-slate-700 mb-2" htmlFor="password">
              Password
            </label>
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
            disabled={loading}
            className={`w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-md transition-all duration-300 flex justify-center items-center ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:-translate-y-0.5'
            }`}
          >
            {loading ? (
              <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-slate-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:text-indigo-600 transition-colors">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}