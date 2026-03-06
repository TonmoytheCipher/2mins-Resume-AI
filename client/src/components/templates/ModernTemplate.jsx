import React from 'react';

const ModernTemplate = ({ resume, themeColor }) => {
  return (
    <div className="bg-white text-gray-800 min-h-[1100px] flex font-sans">
      
      {/* Left Sidebar */}
      <div style={{ backgroundColor: themeColor }} className="w-1/3 text-white p-8 transition-colors duration-500">
        <h1 className="text-4xl font-bold mb-6 uppercase leading-tight">
          {resume.personalInfo.fullName}
        </h1>
        
        <div className="space-y-4 text-sm mb-12 opacity-90">
          <p>📍 {resume.personalInfo.location}</p>
          <p>📞 {resume.personalInfo.phone}</p>
          <p>✉️ {resume.personalInfo.email}</p>
        </div>

        <h2 className="text-xl font-bold border-b border-white/30 pb-1 mb-4 uppercase tracking-wider">Skills</h2>
        <ul className="space-y-2 opacity-90">
          {resume.skills.map((skill, i) => (
            <li key={i}>• {skill}</li>
          ))}
        </ul>
      </div>

      {/* Right Content Area */}
      <div className="w-2/3 p-10 space-y-8">
        <section>
          <h2 style={{ color: themeColor }} className="text-2xl font-bold border-b-2 border-gray-200 pb-1 mb-4 uppercase tracking-widest">Profile</h2>
          <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
        </section>

        <section>
          <h2 style={{ color: themeColor }} className="text-2xl font-bold border-b-2 border-gray-200 pb-1 mb-6 uppercase tracking-widest">Experience</h2>
          {resume.experience.map((exp, i) => (
            <div key={i} className="mb-6">
              <h3 className="font-bold text-lg text-gray-900">{exp.role}</h3>
              <div className="flex justify-between text-sm text-gray-500 font-semibold mb-2">
                <span>{exp.company}</span>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
              <ul className="list-disc ml-4 text-gray-600 space-y-1 text-sm">
                {exp.description.split('\n').map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ color: themeColor }} className="text-2xl font-bold border-b-2 border-gray-200 pb-1 mb-4 uppercase tracking-widest">Education</h2>
          {resume.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <h3 className="font-bold text-gray-900">{edu.degree}</h3>
              <p className="text-sm text-gray-600">{edu.school} • {edu.fieldOfStudy} • {edu.graduationYear}</p>
            </div>
          ))}
        </section>
      </div>

    </div>
  );
};

export default ModernTemplate;