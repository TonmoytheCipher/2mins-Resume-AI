import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ResumeForm() {
  const navigate = useNavigate();
  const location = useLocation(); // Catch the state from Dashboard!
  
  const [generatingIndex, setGeneratingIndex] = useState(null); 
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const [resumeData, setResumeData] = useState({
    personalInfo: { fullName: '', email: '', phone: '', location: '' },
    summary: '',
    experience: [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
    education: [{ school: '', degree: '', fieldOfStudy: '', graduationYear: '' }],
    skills: ''
  });

  // THE MAGIC LISTENER: Run this when the page loads
  useEffect(() => {
    if (location.state && location.state.previousResume) {
      // 1. Destructure out the DB fields we DO NOT want to duplicate
      const { _id, __v, createdAt, updatedAt, user, ...oldData } = location.state.previousResume;
      
      // 2. Format skills (Database stores array, Form input expects string)
      let formattedSkills = oldData.skills || '';
      if (Array.isArray(formattedSkills)) {
        formattedSkills = formattedSkills.join(', ');
      }

      // 3. Populate form, ensuring empty arrays don't break our .map() functions
      setResumeData({
        ...oldData,
        skills: formattedSkills,
        experience: oldData.experience?.length ? oldData.experience : [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
        education: oldData.education?.length ? oldData.education : [{ school: '', degree: '', fieldOfStudy: '', graduationYear: '' }],
        personalInfo: oldData.personalInfo || { fullName: '', email: '', phone: '', location: '' },
        summary: oldData.summary || ''
      });
    }
  }, [location]);

  const handleExperienceChange = (index, e) => {
    const newExperience = [...resumeData.experience];
    newExperience[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, experience: newExperience });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, { company: '', role: '', startDate: '', endDate: '', description: '' }]
    });
  };

  const handleGenerateSummary = async () => {
    if (!resumeData.experience[0].role && !resumeData.skills) {
      alert("Please add at least one Job Role or some Skills first so the AI knows what to write about!");
      return;
    }

    setIsGeneratingSummary(true);

    try {
      const res = await axios.post('http://localhost:5001/api/ai/generate-summary', {
        experience: resumeData.experience,
        skills: resumeData.skills
      });
      setResumeData({ ...resumeData, summary: res.data.summary });
    } catch (err) {
      alert("AI summary generation failed. Check console.");
      console.error(err);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleAIGenerate = async (index) => {
    const { role, company } = resumeData.experience[index];
    
    if (!role || !company) {
      alert("Please enter a Role and Company first!");
      return;
    }

    setGeneratingIndex(index); 

    try {
      const res = await axios.post('http://localhost:5001/api/ai/generate', { role, company });
      
      const newExperience = [...resumeData.experience];
      newExperience[index].description = res.data.description;
      setResumeData({ ...resumeData, experience: newExperience });
    } catch (err) {
      alert("AI generation failed. Check console.");
      console.error(err);
    } finally {
      setGeneratingIndex(null); 
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const skillsArray = typeof resumeData.skills === 'string' 
        ? resumeData.skills.split(',').map(s => s.trim()) 
        : resumeData.skills;
        
      const dataToSend = { ...resumeData, skills: skillsArray };
      
      // Because we stripped the _id in useEffect, this creates a BRAND NEW resume!
      const res = await axios.post('http://localhost:5001/api/resumes', dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      navigate(`/resume/${res.data._id}`);
      
    } catch (error) {
      alert('Error saving: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
          {location.state?.previousResume ? 'Edit & Duplicate Resume' : 'Create Your Professional Resume'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
         {/* Personal Info */}
          <section>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Full Name" 
                value={resumeData.personalInfo.fullName}
                onChange={(e) => setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, fullName: e.target.value}})} 
              />
              <input 
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Location (e.g. Dhaka, BD)" 
                value={resumeData.personalInfo.location}
                onChange={(e) => setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, location: e.target.value}})} 
              />
              <input 
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Email Address" 
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, email: e.target.value}})} 
              />
              <input 
                className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Contact Number" 
                type="tel"
                value={resumeData.personalInfo.phone}
                onChange={(e) => setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, phone: e.target.value}})} 
              />
            </div>
          </section>
          
        {/* Education */}
          <section>
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Education</h3>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    placeholder="School / University" 
                    value={edu.school}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[index].school = e.target.value;
                      setResumeData({...resumeData, education: newEdu});
                    }} 
                    className="p-2 border rounded" 
                  />
                  <input 
                    placeholder="Degree (e.g. B.S. Computer Science)" 
                    value={edu.degree}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[index].degree = e.target.value;
                      setResumeData({...resumeData, education: newEdu});
                    }} 
                    className="p-2 border rounded" 
                  />
                  <input 
                    placeholder="Graduation Year" 
                    value={edu.graduationYear}
                    onChange={(e) => {
                      const newEdu = [...resumeData.education];
                      newEdu[index].graduationYear = e.target.value;
                      setResumeData({...resumeData, education: newEdu});
                    }} 
                    className="p-2 border rounded" 
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Skills</h3>
            <p className="text-xs text-gray-500 mb-2">Separate with commas (e.g. React, Python, Leadership)</p>
            <input 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your top skills..." 
              value={resumeData.skills}
              onChange={(e) => setResumeData({...resumeData, skills: e.target.value})} 
            />
          </section>

           {/* Experience */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600">Work Experience</h3>
              <button type="button" onClick={addExperience} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200 transition">
                + Add Role
              </button>
            </div>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg mb-4 space-y-3 border border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  <input name="company" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} className="p-2 border rounded" />
                  <input name="role" placeholder="Role" value={exp.role} onChange={(e) => handleExperienceChange(index, e)} className="p-2 border rounded" />
                  
                  <input name="startDate" placeholder="Start Date (e.g. Jan 2023)" value={exp.startDate} onChange={(e) => handleExperienceChange(index, e)} className="p-2 border rounded" />
                  <input name="endDate" placeholder="End Date (e.g. Present)" value={exp.endDate} onChange={(e) => handleExperienceChange(index, e)} className="p-2 border rounded" />
                </div>
                
                <button 
                  type="button" 
                  onClick={() => handleAIGenerate(index)}
                  disabled={generatingIndex === index}
                  className={`w-full font-bold py-2.5 rounded-lg transition-all duration-300 flex justify-center items-center gap-2 ${
                    generatingIndex === index 
                      ? "bg-purple-100 text-purple-400 cursor-not-allowed animate-pulse" 
                      : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:-translate-y-1"
                  }`}
                >
                  {generatingIndex === index ? "🔮 Summoning AI Magic..." : "✨ Auto-Generate Description with AI"}
                </button>

                <textarea name="description" placeholder="Key responsibilities..." value={exp.description} onChange={(e) => handleExperienceChange(index, e)} className="w-full p-2 border rounded h-32" />
              </div>
            ))}
          </section>

             {/* Summary */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-blue-600">Professional Summary</h3>
              
              <button 
                type="button" 
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary}
                className={`text-sm font-bold py-1.5 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  isGeneratingSummary 
                    ? "bg-purple-100 text-purple-400 cursor-not-allowed animate-pulse" 
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:-translate-y-0.5"
                }`}
              >
                {isGeneratingSummary ? "🔮 Writing..." : "✨ Auto-Write Summary"}
              </button>
            </div>

            <textarea 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32"
              placeholder="A brief overview of your professional background and goals..." 
              value={resumeData.summary}
              onChange={(e) => setResumeData({...resumeData, summary: e.target.value})} 
            />
          </section>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition shadow-md">
            Save & Sync Resume
          </button>
        </form>
      </div>
    </div>
  );
}