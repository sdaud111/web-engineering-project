import React, { useState, useEffect } from 'react';
import { FaUser, FaBriefcase, FaGraduationCap, FaLanguage, FaMapMarkerAlt, FaPhone, FaEnvelope, FaEdit, FaPlus, FaTrash, FaCamera, FaLinkedin, FaGithub, FaGlobe, FaTwitter } from 'react-icons/fa';
import axios from 'axios';

const ApplicantProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    specialization: '',
    skills: [],
    languages: [],
    education: [],
    workExperience: [],
    socialLinks: {
      linkedin: '',
      github: '',
      portfolio: '',
      twitter: ''
    }
  });
  const [newSkill, setNewSkill] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user')).user;
      const res = await axios.get(`http://localhost:5000/api/users/${userData._id}`);
      setUser(res.data);
      setFormData({
        name: res.data.name || '',
        email: res.data.email || '',
        phone: res.data.phone || '',
        location: res.data.location || '',
        bio: res.data.bio || '',
        specialization: res.data.specialization || '',
        skills: res.data.skills || [],
        languages: res.data.languages || [],
        education: res.data.education || [],
        workExperience: res.data.workExperience || [],
        socialLinks: res.data.socialLinks || {
          linkedin: '',
          github: '',
          portfolio: '',
          twitter: ''
        }
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        institution: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: ''
      }]
    }));
  };

  const updateEducation = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: ''
      }]
    }));
  };

  const updateWorkExperience = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeWorkExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user')).user;
      
      // If there's a photo to upload
      if (photoFile) {
        const photoFormData = new FormData();
        photoFormData.append('profilePhoto', photoFile);
        await axios.put(`http://localhost:5000/api/users/${userData._id}/photo`, photoFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      // Update other profile data
      await axios.put(`http://localhost:5000/api/users/${userData._id}`, formData);
      
      // Refresh profile data
      await fetchUserProfile();
      setEditMode(false);
      setPhotoFile(null);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl text-gray-500">Loading profile...</p>
    </div>;
  }

  return (
    <section className="bg-[#f5f7fa] min-h-screen py-4 md:py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with Edit Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a2f4e]">My Profile</h1>
          <button
            onClick={() => editMode ? handleSave() : setEditMode(true)}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-colors ${
              editMode 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-[#1a2f4e] hover:bg-[#4a5f7f] text-white'
            }`}
          >
            {editMode ? 'Save Changes' : <><FaEdit /> Edit Profile</>}
          </button>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#1a2f4e] bg-gray-200">
                {(photoFile || user?.profilePhoto) ? (
                  <img 
                    src={photoFile ? URL.createObjectURL(photoFile) : `http://localhost:5000/${user.profilePhoto}`}
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#d4a574]">
                    <FaUser className="text-6xl text-white" />
                  </div>
                )}
              </div>
              {editMode && (
                <label className="absolute bottom-0 right-0 bg-[#1a2f4e] p-3 rounded-full cursor-pointer hover:bg-[#4a5f7f] transition-colors">
                  <FaCamera className="text-white text-xl" />
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
              )}
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-2xl md:text-3xl font-bold text-[#1a2f4e] mb-2 border-b-2 border-[#1a2f4e] focus:outline-none w-full"
                  />
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="e.g., Full Stack Developer"
                    className="text-lg text-[#4a5f7f] mb-4 border-b border-[#4a5f7f] focus:outline-none w-full"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1a2f4e] mb-2">{formData.name}</h2>
                  <p className="text-lg text-[#4a5f7f] mb-4">{formData.specialization || 'Not specified'}</p>
                </>
              )}
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-[#1a2f4e]" />
                  <span>{formData.email}</span>
                </div>
                {editMode ? (
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-[#1a2f4e]" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="border-b border-[#4a5f7f] focus:outline-none"
                    />
                  </div>
                ) : formData.phone && (
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-[#1a2f4e]" />
                    <span>{formData.phone}</span>
                  </div>
                )}
                {editMode ? (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#1a2f4e]" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Location"
                      className="border-b border-[#4a5f7f] focus:outline-none"
                    />
                  </div>
                ) : formData.location && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#1a2f4e]" />
                    <span>{formData.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#1a2f4e] mb-4 flex items-center gap-2">
                <FaUser /> About Me
              </h3>
              {editMode ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Write something about yourself, your passion, and career goals..."
                  rows="6"
                  className="w-full border border-[#1a2f4e] rounded p-3 focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {formData.bio || 'No bio added yet.'}
                </p>
              )}
            </div>

            {/* Work Experience Section */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-[#1a2f4e] flex items-center gap-2">
                  <FaBriefcase /> Work Experience
                </h3>
                {editMode && (
                  <button onClick={addWorkExperience} className="text-[#1a2f4e] hover:text-[#d4a574]">
                    <FaPlus className="text-xl" />
                  </button>
                )}
              </div>
              
              {formData.workExperience.length === 0 ? (
                <p className="text-gray-500">No work experience added yet.</p>
              ) : (
                <div className="space-y-4">
                  {formData.workExperience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-[#d4a574] pl-4 relative">
                      {editMode && (
                        <button
                          onClick={() => removeWorkExperience(index)}
                          className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      )}
                      {editMode ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={exp.jobTitle}
                            onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
                            placeholder="Job Title"
                            className="w-full border-b border-[#4a5f7f] focus:outline-none font-bold"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                            placeholder="Company"
                            className="w-full border-b border-[#4a5f7f] focus:outline-none"
                          />
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => updateWorkExperience(index, 'location', e.target.value)}
                            placeholder="Location"
                            className="w-full border-b border-[#4a5f7f] focus:outline-none text-sm"
                          />
                          <div className="flex gap-2 items-center flex-wrap">
                            <input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                              className="border-b border-[#4a5f7f] focus:outline-none text-sm"
                            />
                            <span>to</span>
                            <input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                              disabled={exp.currentlyWorking}
                              className="border-b border-[#4a5f7f] focus:outline-none text-sm"
                            />
                            <label className="flex items-center gap-1 text-sm">
                              <input
                                type="checkbox"
                                checked={exp.currentlyWorking}
                                onChange={(e) => updateWorkExperience(index, 'currentlyWorking', e.target.checked)}
                              />
                              Currently Working
                            </label>
                          </div>
                          <textarea
                            value={exp.description}
                            onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                            placeholder="Description"
                            rows="3"
                            className="w-full border border-[#4a5f7f] rounded p-2 focus:outline-none text-sm"
                          />
                        </div>
                      ) : (
                        <>
                          <h4 className="font-bold text-[#1a2f4e]">{exp.jobTitle}</h4>
                          <p className="text-[#4a5f7f]">{exp.company} {exp.location && `• ${exp.location}`}</p>
                          <p className="text-sm text-gray-500">
                            {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                          </p>
                          <p className="text-gray-700 mt-2">{exp.description}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-[#1a2f4e] flex items-center gap-2">
                  <FaGraduationCap /> Education
                </h3>
                {editMode && (
                  <button onClick={addEducation} className="text-[#1a2f4e] hover:text-[#d4a574]">
                    <FaPlus className="text-xl" />
                  </button>
                )}
              </div>
              
              {formData.education.length === 0 ? (
                <p className="text-gray-500">No education added yet.</p>
              ) : (
                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-[#d4a574] pl-4 relative">
                      {editMode && (
                        <button
                          onClick={() => removeEducation(index)}
                          className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      )}
                      {editMode ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            placeholder="Degree (e.g., Bachelor of Science)"
                            className="w-full border-b border-[#4a5f7f] focus:outline-none font-bold"
                          />
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            placeholder="Institution"
                            className="w-full border-b border-[#4a5f7f] focus:outline-none"
                          />
                          <input
                            type="text"
                            value={edu.fieldOfStudy}
                            onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                            placeholder="Field of Study"
                            className="w-full border-b border-[#4a5f7f] focus:outline-none text-sm"
                          />
                          <div className="flex gap-2 items-center">
                            <input
                              type="month"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                              className="border-b border-[#4a5f7f] focus:outline-none text-sm"
                            />
                            <span>to</span>
                            <input
                              type="month"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                              className="border-b border-[#4a5f7f] focus:outline-none text-sm"
                            />
                          </div>
                          <textarea
                            value={edu.description}
                            onChange={(e) => updateEducation(index, 'description', e.target.value)}
                            placeholder="Description"
                            rows="2"
                            className="w-full border border-[#4a5f7f] rounded p-2 focus:outline-none text-sm"
                          />
                        </div>
                      ) : (
                        <>
                          <h4 className="font-bold text-[#1a2f4e]">{edu.degree}</h4>
                          <p className="text-[#4a5f7f]">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.fieldOfStudy}</p>
                          <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                          {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Skills Section */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h3 className="text-xl font-bold text-[#1a2f4e] mb-4">Skills</h3>
              {editMode && (
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add skill"
                    className="flex-1 border border-[#1a2f4e] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                  />
                  <button onClick={addSkill} className="bg-[#1a2f4e] text-white px-4 py-2 rounded hover:bg-[#4a5f7f]">
                    <FaPlus />
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {formData.skills.length === 0 ? (
                  <p className="text-gray-500 text-sm">No skills added yet.</p>
                ) : (
                  formData.skills.map((skill, index) => (
                    <div key={index} className="bg-[#d4a574] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {skill}
                      {editMode && (
                        <button onClick={() => removeSkill(skill)} className="hover:text-red-200">
                          <FaTrash className="text-xs" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Languages Section */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h3 className="text-xl font-bold text-[#1a2f4e] mb-4 flex items-center gap-2">
                <FaLanguage /> Languages
              </h3>
              {editMode && (
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                    placeholder="Add language"
                    className="flex-1 border border-[#1a2f4e] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4a574]"
                  />
                  <button onClick={addLanguage} className="bg-[#1a2f4e] text-white px-4 py-2 rounded hover:bg-[#4a5f7f]">
                    <FaPlus />
                  </button>
                </div>
              )}
              <div className="space-y-2">
                {formData.languages.length === 0 ? (
                  <p className="text-gray-500 text-sm">No languages added yet.</p>
                ) : (
                  formData.languages.map((language, index) => (
                    <div key={index} className="flex items-center justify-between bg-[#f5f7fa] px-3 py-2 rounded">
                      <span>{language}</span>
                      {editMode && (
                        <button onClick={() => removeLanguage(language)} className="text-red-500 hover:text-red-700">
                          <FaTrash className="text-sm" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Social Links Section */}
            <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
              <h3 className="text-xl font-bold text-[#1a2f4e] mb-4">Social Links</h3>
              <div className="space-y-3">
                {editMode ? (
                  <>
                    <div className="flex items-center gap-2">
                      <FaLinkedin className="text-[#0A66C2] text-xl" />
                      <input
                        type="url"
                        value={formData.socialLinks.linkedin}
                        onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                        placeholder="LinkedIn URL"
                        className="flex-1 border-b border-[#4a5f7f] focus:outline-none text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <FaGithub className="text-gray-800 text-xl" />
                      <input
                        type="url"
                        value={formData.socialLinks.github}
                        onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                        placeholder="GitHub URL"
                        className="flex-1 border-b border-[#4a5f7f] focus:outline-none text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <FaGlobe className="text-[#1a2f4e] text-xl" />
                      <input
                        type="url"
                        value={formData.socialLinks.portfolio}
                        onChange={(e) => handleSocialLinkChange('portfolio', e.target.value)}
                        placeholder="Portfolio URL"
                        className="flex-1 border-b border-[#4a5f7f] focus:outline-none text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTwitter className="text-[#1DA1F2] text-xl" />
                      <input
                        type="url"
                        value={formData.socialLinks.twitter}
                        onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                        placeholder="Twitter URL"
                        className="flex-1 border-b border-[#4a5f7f] focus:outline-none text-sm"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {formData.socialLinks.linkedin && (
                      <a href={formData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#0A66C2] hover:underline">
                        <FaLinkedin className="text-xl" /> LinkedIn
                      </a>
                    )}
                    {formData.socialLinks.github && (
                      <a href={formData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-800 hover:underline">
                        <FaGithub className="text-xl" /> GitHub
                      </a>
                    )}
                    {formData.socialLinks.portfolio && (
                      <a href={formData.socialLinks.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#1a2f4e] hover:underline">
                        <FaGlobe className="text-xl" /> Portfolio
                      </a>
                    )}
                    {formData.socialLinks.twitter && (
                      <a href={formData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#1DA1F2] hover:underline">
                        <FaTwitter className="text-xl" /> Twitter
                      </a>
                    )}
                    {!formData.socialLinks.linkedin && !formData.socialLinks.github && !formData.socialLinks.portfolio && !formData.socialLinks.twitter && (
                      <p className="text-gray-500 text-sm">No social links added yet.</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicantProfile;
