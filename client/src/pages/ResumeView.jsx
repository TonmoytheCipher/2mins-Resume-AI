import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ResumePreview from '../components/ResumePreview';
import { FaFacebook, FaWhatsapp, FaLinkedin, FaEnvelope, FaInstagram } from 'react-icons/fa';

export default function ResumeView() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [themeColor, setThemeColor] = useState('#1e3a8a'); 

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5001/api/resumes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResume(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResume();
  }, [id]);

  const downloadPDF = () => {
    window.print();
  };

  const shareUrl = window.location.href;

  if (!resume) return <div className="text-center mt-20">Loading Resume...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      
      {/* TOOLBAR with the new toolbar-container class */}
      <div className="toolbar-container max-w-[850px] mx-auto mb-6 bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-700">Theme:</span>
          {['#1e3a8a', '#334155', '#065f46', '#7e22ce', '#be123c', '#d97706'].map(color => (
            <button 
              key={color} 
              onClick={() => setThemeColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${themeColor === color ? 'border-black' : 'border-transparent'}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex items-center gap-6">
          {/* <button onClick={downloadPDF} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-lg transition">
            Download PDF
          </button> */}
          
          <div className="flex gap-4 text-2xl items-center border-l pl-6 border-gray-200">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:scale-110 transition"><FaFacebook /></a>
            <a href={`https://api.whatsapp.com/send?text=Check out my resume: ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:scale-110 transition"><FaWhatsapp /></a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:scale-110 transition"><FaLinkedin /></a>
            <a href={`mailto:?subject=Professional Resume&body=You can view my resume here: ${shareUrl}`} className="text-gray-600 hover:scale-110 transition"><FaEnvelope /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:scale-110 transition"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <ResumePreview resume={resume} themeColor={themeColor} />
    </div>
  );
}