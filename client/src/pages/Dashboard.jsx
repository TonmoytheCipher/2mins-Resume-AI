import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaYoutube, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('User');
  
  // State to control the delete confirmation modal
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, resume: null });
  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedName = localStorage.getItem('userName') || localStorage.getItem('name');
    const storedUser = localStorage.getItem('user');
    
    if (storedName) {
      setUserName(storedName);
    } else if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.name || parsedUser.fullName || 'User');
      } catch (e) {
        console.error("Could not parse user data");
      }
    }

    const fetchResumes = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://localhost:5001/api/resumes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (Array.isArray(res.data)) {
          setResumes(res.data);
        } else if (res.data && res.data._id) {
          setResumes([res.data]);
        } else if (res.data && Array.isArray(res.data.data)) {
          setResumes(res.data.data);
        } else if (res.data && Array.isArray(res.data.resumes)) {
          setResumes(res.data.resumes);
        } else {
          setResumes([]); 
        }
      } catch (error) {
        console.error("Failed to fetch resumes:", error);
        setResumes([]); 
      } finally {
        setLoading(false);
      }
    };
    
    fetchResumes();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('user');
    navigate('/'); 
  };

  // Function to handle the actual deletion after user clicks "Yes"
  const confirmDelete = async () => {
    if (!deleteModal.resume) return;

    try {
      await axios.delete(`http://localhost:5001/api/resumes/${deleteModal.resume._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update local state to remove the card immediately
      setResumes(prev => prev.filter(r => r._id !== deleteModal.resume._id));
      setDeleteModal({ isOpen: false, resume: null });
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Backend error: Make sure you added the DELETE route to your server!");
    }
  };

  const userInitial = userName ? userName.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans relative">
      
      {/* --- DELETE CONFIRMATION MODAL --- */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Resume?</h3>
              <p className="text-gray-500 text-sm">
                Do you want to delete the resume <strong>"{deleteModal.resume?.personalInfo?.fullName || 'Untitled'}"</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteModal({ isOpen: false, resume: null })}
                className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                No, Keep it
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-colors shadow-md shadow-red-200"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* --- Main Dashboard Area --- */}
      <div className="flex-grow w-full max-w-7xl mx-auto p-6 md:p-12">
        
        {/* --- Top Navigation & Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            {token && (
              <div className="flex items-center pr-8 border-r-2 border-slate-100 hidden md:flex">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 flex items-center justify-center font-bold text-2xl border border-blue-200 shadow-sm mr-4">
                  {userInitial}
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Welcome Back,</span>
                  <span className="text-2xl font-extrabold text-slate-800">
                    {userName}! 👋
                  </span>
                </div>
              </div>
            )}
            
            <div>
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">
                {token ? 'My Dashboard 🚀' : 'AI Resume Builder 🚀'}
              </h1>
              <p className="text-gray-500 font-medium text-lg hidden sm:block">
                {token ? 'Manage and download your AI-generated resumes.' : 'Create a professional, ATS-friendly resume in minutes.'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            {token ? (
              <button 
                onClick={handleLogout} 
                className="bg-white border border-red-200 text-red-600 px-8 py-3 rounded-full font-bold hover:bg-red-50 hover:border-red-300 transition shadow-sm"
              >
                Log Out
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/login')} 
                  className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 transition shadow-sm"
                >
                  Log In
                </button>
                <button 
                  onClick={() => navigate('/register')} 
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition shadow-sm"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>

        {/* --- Main Content Area --- */}
        {!token ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm mt-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to land your dream job?</h2>
            <p className="text-slate-500 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals using our AI to build resumes that stand out. Log in or create an account to get started.
            </p>
            <button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Start Building for Free
            </button>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <div className="text-slate-500 text-lg font-medium animate-pulse">
              Loading your workspace...
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
            
            <div 
              onClick={() => navigate('/create-resume')} 
              className="bg-white border-2 border-dashed border-blue-200 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50/50 hover:border-blue-400 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 min-h-[300px] group"
            >
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-[1.5rem] w-16 h-16 flex items-center justify-center text-4xl mb-5 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300 shadow-md">
                +
              </div>
              <h3 className="font-bold text-xl text-slate-800">Create New Resume</h3>
              <p className="text-sm text-slate-500 mt-2 px-4 leading-relaxed">
                Start a fresh, AI-powered template tailored to your next job.
              </p>
            </div>
            
            {Array.isArray(resumes) && resumes.map((resume) => (
              <div 
                key={resume._id || Math.random()} 
                className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[300px] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 w-full"></div>
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-2xl text-slate-800 pr-2 line-clamp-1">
                        {resume?.personalInfo?.fullName || 'Untitled Resume'}
                      </h3>
                      <span className="bg-green-100 text-green-700 text-xs font-extrabold px-3 py-1.5 rounded-lg tracking-wide shrink-0">
                        Saved
                      </span>
                    </div>
                    <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed">
                      {resume?.summary || 'No professional summary provided for this template yet.'}
                    </p>
                  </div>
                  
                  {/* THREE BUTTONS: Open, Edit, Delete */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                    <button 
                      onClick={() => navigate(`/resume/${resume._id}`)}
                      className="flex-1 bg-slate-50 text-blue-700 font-bold py-2.5 rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-300 border border-slate-200 hover:border-transparent shadow-sm text-sm"
                    >
                      Open
                    </button>
                    <button 
                      onClick={() => navigate('/create-resume', { state: { previousResume: resume } })}
                      className="flex-1 bg-indigo-50 text-indigo-700 font-bold py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors duration-300 border border-indigo-200 hover:border-transparent shadow-sm text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => setDeleteModal({ isOpen: true, resume })}
                      className="flex-1 bg-red-50 text-red-600 font-bold py-2.5 rounded-xl hover:bg-red-600 hover:text-white transition-colors duration-300 border border-red-200 hover:border-transparent shadow-sm text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- Footer --- */}
      <footer className="bg-[#0f141e] text-slate-300 pt-16 pb-8 border-t-[6px] border-blue-600 mt-auto w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
            
            {/* Brand Section */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-black text-white mb-4 tracking-tight flex items-center gap-2">
                <span className="text-blue-500">2mins</span> Resume
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Empowering job seekers with AI-driven tools to create standout, ATS-optimized resumes in minutes.
              </p>
              
              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <FaLinkedin size={18} />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-400 hover:text-white transition-all duration-300">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all duration-300">
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h3 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">Resume Templates</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">Cover Letters</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">AI Resume Review</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">Career Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">Interview Prep</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">ATS Guide</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">Help Center</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-5 uppercase tracking-wider text-sm">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">About Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">Contact</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400 transition text-sm">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 mt-8">
            <p>© {new Date().getFullYear()} 2mins Resume. All rights reserved.</p>
            <p>Built with ❤️ for job seekers.</p>
          </div>
          
        </div>
      </footer>
    </div>
  );
}