import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResumePreview = ({ resume, themeColor }) => {
  const navigate = useNavigate();

  if (!resume) return null;

  const handleEdit = () => {
    navigate('/create-resume', { state: { previousResume: resume } });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div 
      id="resume-download-area" 
      className="max-w-[850px] mx-auto bg-white shadow-2xl min-h-[1100px] text-gray-800 relative"
      style={{ fontFamily: '"Times New Roman", Times, serif' }}
    >


      {/* Header Section */}
      <div style={{ backgroundColor: themeColor }} className="text-white text-center py-16 px-6 transition-colors duration-500">
        <h1 className="text-6xl font-bold tracking-tight mb-2 uppercase">
          {resume.personalInfo.fullName}
        </h1>
      </div>

      {/* Contact Bar */}
      <div className="bg-slate-900 text-white py-3 flex justify-center gap-6 text-sm font-medium">
        <span>{resume.personalInfo.location}</span>
        <span>|</span>
        <span>{resume.personalInfo.phone}</span>
        <span>|</span>
        <span>{resume.personalInfo.email}</span>
      </div>

      {/* Main Content */}
      <div className="p-12 space-y-10">
        {/* Professional Summary */}
        <section>
          <h2 style={{ color: themeColor }} className="text-2xl font-bold border-b-2 border-gray-200 pb-1 mb-4 uppercase tracking-widest">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">{resume.summary}</p>
        </section>

        {/* Experience */}
        <section>
          <h2 style={{ color: themeColor }} className="text-2xl font-bold border-b-2 border-gray-200 pb-1 mb-6 uppercase tracking-widest">
            Experience
          </h2>
          {resume.experience.map((exp, i) => (
            <div key={i} className="mb-8">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-xl uppercase tracking-tight">{exp.role}</h3>
                <span className="text-gray-600 font-semibold">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>
              <p className="font-bold text-gray-900 mb-2">{exp.company}</p>
              <ul className="list-disc ml-5 text-gray-700 space-y-2">
                {exp.description.split('\n').map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills */}
        <section>
          <h2 style={{ color: themeColor }} className="text-2xl font-bold border-b-2 border-gray-200 pb-1 mb-4 uppercase tracking-widest">
            Skills
          </h2>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 list-disc ml-5 text-gray-700">
            {resume.skills.map((skill, i) => (
              <li key={i} className="text-lg">{skill}</li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section>
          <h2 style={{ color: themeColor }} className="text-2xl font-bold border-b-2 border-gray-200 pb-1 mb-4 uppercase tracking-widest">
            Education
          </h2>
          {resume.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <p className="font-bold text-lg uppercase">
                {edu.school} | {edu.degree}
              </p>
              <p className="text-gray-600 font-medium">
                {edu.fieldOfStudy}, {edu.graduationYear}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ResumePreview;