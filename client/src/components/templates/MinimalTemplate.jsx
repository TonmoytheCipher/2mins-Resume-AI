import React from 'react';

const MinimalTemplate = ({ resume, themeColor }) => {
  const { personalInfo, summary, experience, education, skills, projects } = resume || {};

  return (
    <div className="w-full bg-white p-10 sm:p-14 font-sans text-slate-800">
      
      {/* --- HEADER --- */}
      <header className="border-b-2 pb-6 mb-8" style={{ borderColor: themeColor }}>
        <h1 className="text-4xl sm:text-5xl font-light tracking-widest uppercase mb-3" style={{ color: themeColor }}>
          {personalInfo?.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500 font-medium">
          {personalInfo?.email && <span className="flex items-center gap-1">✉️ {personalInfo.email}</span>}
          {personalInfo?.phone && <span className="flex items-center gap-1">📞 {personalInfo.phone}</span>}
          {personalInfo?.location && <span className="flex items-center gap-1">📍 {personalInfo.location}</span>}
          {personalInfo?.linkedin && <span className="flex items-center gap-1">🔗 {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* --- BODY (2-Column Grid) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN (Wider - Experience & Projects) */}
        <div className="md:col-span-2 space-y-8">
          
          {summary && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: themeColor }}>Professional Profile</h2>
              <p className="text-sm leading-relaxed text-slate-600">{summary}</p>
            </section>
          )}

          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2" style={{ color: themeColor, borderColor: `${themeColor}30` }}>
                Work Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-slate-800 text-base">{exp.jobTitle}</h3>
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: themeColor }}>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-500 mb-2">{exp.company}</p>
                    {/* Using whitespace-pre-line to respect line breaks in the description */}
                    <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2" style={{ color: themeColor, borderColor: `${themeColor}30` }}>
                Key Projects
              </h2>
              <div className="space-y-5">
                {projects.map((proj, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-slate-800 text-base mb-1">{proj.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* RIGHT COLUMN (Narrower - Skills & Education) */}
        <div className="space-y-8">
          
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2" style={{ color: themeColor, borderColor: `${themeColor}30` }}>
                Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-semibold rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education && education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-widest mb-4 border-b pb-2" style={{ color: themeColor, borderColor: `${themeColor}30` }}>
                Education
              </h2>
              <div className="space-y-5">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-slate-800 text-sm">{edu.degree}</h3>
                    <p className="text-sm text-slate-500 mt-1">{edu.institution}</p>
                    <p className="text-xs font-semibold mt-1" style={{ color: themeColor }}>{edu.graduationYear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
      
    </div>
  );
};

export default MinimalTemplate;