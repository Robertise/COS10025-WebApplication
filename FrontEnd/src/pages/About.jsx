import React from 'react';
import { Search, Mail, Github, Linkedin, User } from 'lucide-react';
import minhAvatar from '../assets/Minh.jpg';
import huyAvatar from '../assets/Huy.jpg';


const AboutPage = () => {
  const teamMembers = [
    {
      name: "Do Gia Huy",
      role: "Project Manager",
      specialty: "Developer",
      bio: "Huy is the man behind the development of this website, he is responsible for both the frontend and backend of the project.",
      avatar: huyAvatar,
      email: "mailto:huydo170705@gmail.com"
    },
    {
      name: "Huynh Doan Hoang Minh",
      role: "Researcher",
      specialty: "Data Preparation",
      bio: "Hoang Minh contributed the most to the context behind the project implementation, including preparing the data for both the AR/VR and Smart Sensors pages.",
      avatar: minhAvatar,
      email: "mailto:minhhuynhdoanhoang@gmail.com"
    }
  ];

  const projectTasks = [
    { task: "Project Management", alice: "✓", bob: "" },
    { task: "UI/UX Design & Wireframing", alice: "✓", bob: "" },
    { task: "Frontend Development", alice: "✓", bob: "" },
    { task: "Backend Architecture", alice: "✓", bob: "" },
    { task: "Database Setup", alice: "", bob: "✓" },
    { task: "User Testing & Feedback", alice: "✓", bob: "✓" },
    { task: "Code Review & Quality Assurance", alice: "✓", bob: "✓" },
    { task: "Documentation", alice: "", bob: "✓" },
    { task: "Data Researching", alice: "", bob: "✓" },
    { task: "AR/VR Recorder", alice: "", bob: "✓" },
    { task: "Deployment & DevOps", alice: "✓", bob: "" }
  ];

  return (
    <div>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet the Team</h1>
          <p className="text-lg text-gray-600 mb-8">Learn about the key contributors to this project.</p>
        </div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img 
                className="w-30 h-30 rounded-full mb-6 object-cover" 
                src={member.avatar} 
                alt={`${member.name} avatar`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
              <div className="flex space-x-2 text-sm text-gray-600 mb-4">
                <span>{member.role}</span>
                <span>•</span>
                <span>{member.specialty}</span>
              </div>
              <p className="text-gray-600 mb-6 max-w-sm">{member.bio}</p>
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <a href={member.email}>Send email</a>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Contributions Table */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Website Application Contributions</h2>
          <p className="text-gray-600 text-center mb-8">Here's what each team member has accomplished for this project.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Task</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Gia Huy</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Hoang Minh</th>
                </tr>
              </thead>
              <tbody>
                {projectTasks.map((task, index) => (
                  <tr key={index} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                    <td className="py-4 px-6 text-gray-900">{task.task}</td>
                    <td className="py-4 px-6 text-center">
                      {task.alice && (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {task.bob && (
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full text-sm font-semibold">
                          ✓
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  className="w-12 h-12 rounded-full object-cover" 
                  alt='Huy avatar'
                  src={huyAvatar}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Do Gia Huy</h3>
                  <p className="text-sm text-gray-600">Project Manager</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Led the design team, created wireframes, and developing the main website application.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-xs font-medium">Team Leadership</span>
                <span className="px-3 py-1 bg-purple-200 text-purple-700 rounded-full text-xs font-medium">Developer</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  className="w-12 h-12 rounded-full object-cover" 
                  alt='Minh avatar'
                  src={minhAvatar}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">Huynh Doan Hoang Minh</h3>
                  <p className="text-sm text-gray-600">Researcher</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                Document and research all the important information needed for creating the website.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-200 text-green-700 rounded-full text-xs font-medium">Data Researching</span>
                <span className="px-3 py-1 bg-yellow-200 text-yellow-700 rounded-full text-xs font-medium">Testing</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AboutPage;