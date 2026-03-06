import React from 'react';

const ElegantTemplate = ({ resume, themeColor }) => {
  const { personalInfo, summary, experience, education, skills } = resume || {};

  return (
    <div className="w-full bg-white font-sans text-slate-900 min-h-[1100px] border-l border-r border-slate-100 shadow-lg">
      
      {/* --- TOP BAR (Completely isolated) --- */}
      <div className="w-full bg-slate-800 text-slate-200 text-sm font-semibold py-4 px-10">
        <div className="flex justify-center items-center gap-6">
          {personalInfo?.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo?.location && <span className="text-slate-600">|</span>}
          {personalInfo?.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo?.phone && <span className="text-slate-600">|</span>}
          {personalInfo?.email && <span>✉️ {personalInfo.email}</span>}
        </div>
      </div>
      
      {/* Teal underline below the dark bar, replicating the image detail */}
      <div className="w-full h-2.5" style={{ backgroundColor: `${themeColor}20` }}></div>
      {/* End Teal Line */}

      {/* --- MAIN PAGE CONTENT --- */}
      <div className="p-10 md:p-14 space-y-10">
        
        {/* --- NAME SECTION --- */}
        <section className="border-b-2 pb-6 mb-10" style={{ borderColor: themeColor }}>
            <h1 className="text-5xl font-extralight tracking-widest uppercase mb-1 leading-tight" style={{ color: themeColor }}>
              {personalInfo?.fullName || 'Your Full Name'}
            </h1>
        </section>

        {/* --- PROFESSIONAL SUMMARY --- */}
        {summary && (
          <section className="relative">
            {/* The separation line replicated */}
            <div className="absolute top-0 left-0 right-0 h-px bg-slate-200" style={{ backgroundImage: `linear-gradient(to justified, ${themeColor} 0%, transparent 100%)` }}></div>
            {/* End of Line detail */}
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr,2.5fr] gap-x-12 pt-10">
              <h2 className="text-sm font-extrabold uppercase tracking-widest leading-normal" style={{ color: themeColor }}>
                Professional <br /> Summary
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 font-medium">
                {summary}
              </p>
            </div>
          </section>
        )}

        {/* --- WORK EXPERIENCE --- */}
        {experience && experience.length > 0 && (
          <section className="relative">
            {/* Line detail replicated */}
            <div className="absolute top-0 left-0 right-0 h-px bg-slate-200" style={{ backgroundImage: `linear-gradient(to right, ${themeColor} 0%, transparent 100%)` }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr,2.5fr] gap-x-12 pt-10">
              <h2 className="text-sm font-extrabold uppercase tracking-widest leading-normal" style={{ color: themeColor }}>
                Work <br /> Experience
              </h2>
              
              <div className="space-y-8">
                {experience.map((exp, idx) => (
                  <div key={idx} className="group">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-1">
                      <h3 className="font-extrabold text-slate-900 text-base">{exp.jobTitle}</h3>
                      <span className="text-xs font-bold uppercase tracking-wider shrink-0" style={{ color: themeColor }}>
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-600 mb-2">{exp.company} • {exp.location}</p>
                    <ul className="list-disc ml-5 text-sm text-slate-700 leading-relaxed space-y-1.5 whitespace-pre-line">
                      {exp.description.split('\n').map((line, idx) => (
                        <li key={idx} className="leading-relaxed">{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- SKILLS SECTION (replicated from the image) --- */}
        {skills && skills.length > 0 && (
          <section className="relative">
             {/* Line detail replicated */}
            <div className="absolute top-0 left-0 right-0 h-px bg-slate-200" style={{ backgroundImage: `linear-gradient(to right, ${themeColor} 0%, transparent 100%)` }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr,2.5fr] gap-x-12 pt-10">
              <h2 className="text-sm font-extrabold uppercase tracking-widest" style={{ color: themeColor }}>
                Expertise & Skills
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                {skills.map((skill, idx) => (
                  <p key={idx} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* --- EDUCATION --- */}
        {education && education.length > 0 && (
          <section className="relative">
             {/* Line detail replicated */}
            <div className="absolute top-0 left-0 right-0 h-px bg-slate-200" style={{ backgroundImage: `linear-gradient(to right, ${themeColor} 0%, transparent 100%)` }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-[1fr,2.5fr] gap-x-12 pt-10">
              <h2 className="text-sm font-extrabold uppercase tracking-widest" style={{ color: themeColor }}>
                Academic Background
              </h2>
              
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <div className="flex justify-between items-center text-sm font-medium text-slate-600 mt-1">
                      <span>{edu.institution}, {edu.city}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: themeColor }}>Graduated: {edu.graduationYear}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>
      
    </div>
  );
};

export default ElegantTemplate;