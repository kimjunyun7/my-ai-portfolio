'use client';
import { useState } from 'react';
import { Grid3x3, List, Circle, Search } from 'lucide-react';

export default function Home() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample projects - in future this could be loaded from a database
  const projects = [
    { id: 1, name: 'Project Alpha', active: true, color: 'from-blue-500 to-purple-600' },
    { id: 2, name: 'Beta Dashboard', active: false, color: 'from-green-500 to-teal-600' },
    { id: 3, name: 'Gamma Analytics', active: false, color: 'from-orange-500 to-red-600' },
    { id: 4, name: 'Delta Commerce', active: false, color: 'from-pink-500 to-rose-600' },
    { id: 5, name: 'Epsilon Tools', active: false, color: 'from-indigo-500 to-blue-600' },
  ];

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (project) => {
    if (project.active) {
      console.log(`Navigating to ${project.name}`);
    }
  };

  const ProjectButton = ({ project }) => {
    const baseClasses = "relative overflow-hidden transition-all duration-300 transform hover:scale-105";
    const activeClasses = project.active 
      ? "cursor-pointer shadow-lg hover:shadow-2xl" 
      : "cursor-not-allowed opacity-50 grayscale";

    if (viewMode === 'grid') {
      return (
        <button
          onClick={() => handleProjectClick(project)}
          disabled={!project.active}
          className={`${baseClasses} ${activeClasses} bg-gradient-to-br ${project.color} text-white rounded-xl p-6 h-32 flex items-center justify-center`}
        >
          <span className="font-semibold text-lg">{project.name}</span>
          {project.active && (
            <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          )}
        </button>
      );
    }

    if (viewMode === 'list') {
      return (
        <button
          onClick={() => handleProjectClick(project)}
          disabled={!project.active}
          className={`${baseClasses} ${activeClasses} bg-gradient-to-r ${project.color} text-white rounded-lg p-4 w-full flex items-center justify-between`}
        >
          <span className="font-semibold">{project.name}</span>
          {project.active && <span className="text-sm bg-white/20 px-2 py-1 rounded">Active</span>}
        </button>
      );
    }

    if (viewMode === 'bubble') {
      return (
        <button
          onClick={() => handleProjectClick(project)}
          disabled={!project.active}
          className={`${baseClasses} ${activeClasses} bg-gradient-to-br ${project.color} text-white rounded-full w-32 h-32 flex items-center justify-center relative`}
        >
          <span className="font-semibold text-sm text-center px-2">{project.name}</span>
          {project.active && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          )}
        </button>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            AI-Crafted Web Portfolio
          </h1>
          <p className="text-xl text-gray-300">
            A dynamic showcase of web applications built through AI-powered development collaborations.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* View Mode Selector */}
          <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-all ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-all ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('bubble')}
              className={`p-2 rounded transition-all ${
                viewMode === 'bubble' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
              title="Bubble View"
            >
              <Circle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Projects Display */}
        <div className={`
          ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : ''}
          ${viewMode === 'list' ? 'flex flex-col gap-4' : ''}
          ${viewMode === 'bubble' ? 'flex flex-wrap gap-6 justify-center' : ''}
        `}>
          {filteredProjects.map((project) => (
            <ProjectButton key={project.id} project={project} />
          ))}
        </div>

        {/* Status Message */}
        <div className="mt-12 text-center text-gray-400">
          <p className="text-sm">
            {projects.filter(p => p.active).length} of {projects.length} projects currently active
          </p>
        </div>
      </div>
    </div>
  );
}