import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate'; 
import ElegantTemplate from './templates/ElegantTemplate';

const ResumePreview = ({ resume, themeColor }) => {
  const navigate = useNavigate();

  //Default Templete
  const [activeTemplate, setActiveTemplate] = useState('classic'); 

  if (!resume) return null;

  const handleEdit = () => {
    navigate('/create-resume', { state: { previousResume: resume } });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center py-8">
      
      <div className="w-full max-w-[850px] flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 print:hidden">
        
        {/* Left Side: Template Switcher */}
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Template:</span>
          <select 
            value={activeTemplate}
            onChange={(e) => setActiveTemplate(e.target.value)}
            className="px-3 py-2 rounded-md border border-gray-300 bg-gray-50 font-medium text-gray-800 cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="classic">Classic Layout</option>
            <option value="modern">Modern Layout</option>
            <option value="minimal">Minimal Layout</option>
            <option value="elegant">Elegant / ATS Layout</option>
          </select>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleEdit}
            className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-700 transition shadow-sm font-medium"
          >
            ✏️ Edit
          </button>

          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition shadow-sm font-medium"
          >
            📄 Download PDF
          </button>
        </div>
      </div>

      {/* --- THE ACTUAL RESUME --- */}
      <div 
        id="resume-download-area" 
        className="w-full max-w-[850px] shadow-2xl bg-white"
      >
        {activeTemplate === 'classic' && <ClassicTemplate resume={resume} themeColor={themeColor} />}
        {activeTemplate === 'modern' && <ModernTemplate resume={resume} themeColor={themeColor} />}
        {activeTemplate === 'minimal' && <MinimalTemplate resume={resume} themeColor={themeColor} />} 
        {activeTemplate === 'elegant' && <ElegantTemplate resume={resume} themeColor={themeColor} />}
      </div>

    </div>
  );
};

export default ResumePreview;