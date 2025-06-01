'use client';
import { useState } from 'react';
import { Grid, List, Circle, Search, Edit2, Palette, Image, Check, X } from 'lucide-react';

export default function Home() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(null);

  // Sample projects with background type
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project Alpha', active: true, backgroundType: 'gradient', background: 'from-blue-500 to-purple-600' },
    { id: 2, name: 'Beta Dashboard', active: false, backgroundType: 'gradient', background: 'from-green-500 to-teal-600' },
    { id: 3, name: 'Gamma Analytics', active: false, backgroundType: 'gradient', background: 'from-orange-500 to-red-600' },
    { id: 4, name: 'Delta Commerce', active: false, backgroundType: 'gradient', background: 'from-pink-500 to-rose-600' },
    { id: 5, name: 'Epsilon Tools', active: false, backgroundType: 'gradient', background: 'from-indigo-500 to-blue-600' },
  ]);

  // Predefined gradients
  const gradientOptions = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600',
    'from-yellow-500 to-orange-600',
    'from-purple-500 to-pink-600',
    'from-gray-700 to-gray-900',
    'from-cyan-500 to-blue-600',
    'from-red-500 to-yellow-600',
  ];

  // Sample images (in real app, these would be uploaded)
  const imageOptions = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1569163139394-de4798907684?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=300&fit=crop',
  ];

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (project) => {
    if (project.active && !editingId && !showColorPicker) {
      console.log(`Navigating to ${project.name}`);
    }
  };

  const startEditing = (project, e) => {
    e.stopPropagation();
    setEditingId(project.id);
    setEditingName(project.name);
  };

  const saveEdit = () => {
    setProjects(projects.map(p => 
      p.id === editingId ? { ...p, name: editingName } : p
    ));
    setEditingId(null);
    setEditingName('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  const openColorPicker = (projectId, e) => {
    e.stopPropagation();
    setShowColorPicker(projectId);
  };

  const selectBackground = (projectId, backgroundType, background) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, backgroundType, background } : p
    ));
    setShowColorPicker(null);
  };

  const ProjectButton = ({ project }) => {
    const baseClasses = "relative overflow-hidden transition-all duration-300 transform hover:scale-105 group";
    const activeClasses = project.active 
      ? "cursor-pointer shadow-lg hover:shadow-2xl" 
      : "cursor-not-allowed opacity-50 grayscale";

    const backgroundStyle = project.backgroundType === 'image' 
      ? { backgroundImage: `url(${project.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }
      : {};

    const backgroundClass = project.backgroundType === 'gradient' 
      ? `bg-gradient-to-br ${project.background}` 
      : '';

    if (viewMode === 'grid') {
      return (
        <div className="relative">
          <button
            onClick={() => handleProjectClick(project)}
            disabled={!project.active}
            className={`${baseClasses} ${activeClasses} ${backgroundClass} text-white rounded-xl p-6 h-32 flex items-center justify-center`}
            style={backgroundStyle}
          >
            {/* Edit controls */}
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => startEditing(project, e)}
                className="p-1 bg-black/50 rounded hover:bg-black/70 transition-colors"
                title="Rename"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => openColorPicker(project.id, e)}
                className="p-1 bg-black/50 rounded hover:bg-black/70 transition-colors"
                title="Change background"
              >
                <Palette className="w-3 h-3" />
              </button>
            </div>

            {/* Project name or edit input */}
            {editingId === project.id ? (
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="bg-white/20 backdrop-blur text-white px-2 py-1 rounded text-sm w-32"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit();
                    if (e.key === 'Escape') cancelEdit();
                  }}
                />
                <button onClick={saveEdit} className="p-1 hover:bg-white/20 rounded">
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={cancelEdit} className="p-1 hover:bg-white/20 rounded">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <span className="font-semibold text-lg">{project.name}</span>
            )}

            {project.active && !editingId && (
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </button>

          {/* Color/Image Picker */}
          {showColorPicker === project.id && (
            <div className="absolute top-full mt-2 z-10 bg-gray-800 rounded-lg shadow-xl p-4 w-64">
              <div className="mb-3">
                <h4 className="text-white text-sm font-semibold mb-2">Gradients</h4>
                <div className="grid grid-cols-5 gap-2">
                  {gradientOptions.map((gradient, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectBackground(project.id, 'gradient', gradient)}
                      className={`w-10 h-10 rounded bg-gradient-to-br ${gradient} hover:scale-110 transition-transform`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold mb-2">Images</h4>
                <div className="grid grid-cols-3 gap-2">
                  {imageOptions.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectBackground(project.id, 'image', image)}
                      className="w-full h-16 rounded overflow-hidden hover:scale-105 transition-transform"
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (viewMode === 'list') {
      return (
        <div className="relative">
          <button
            onClick={() => handleProjectClick(project)}
            disabled={!project.active}
            className={`${baseClasses} ${activeClasses} ${backgroundClass} text-white rounded-lg p-4 w-full flex items-center justify-between`}
            style={backgroundStyle}
          >
            <div className="flex items-center gap-3">
              {editingId === project.id ? (
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="bg-white/20 backdrop-blur text-white px-2 py-1 rounded text-sm"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit();
                      if (e.key === 'Escape') cancelEdit();
                    }}
                  />
                  <button onClick={saveEdit} className="p-1 hover:bg-white/20 rounded">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={cancelEdit} className="p-1 hover:bg-white/20 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <span className="font-semibold">{project.name}</span>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {project.active && <span className="text-sm bg-white/20 px-2 py-1 rounded">Active</span>}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => startEditing(project, e)}
                  className="p-1 bg-black/50 rounded hover:bg-black/70 transition-colors"
                  title="Rename"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => openColorPicker(project.id, e)}
                  className="p-1 bg-black/50 rounded hover:bg-black/70 transition-colors"
                  title="Change background"
                >
                  <Palette className="w-3 h-3" />
                </button>
              </div>
            </div>
          </button>

          {/* Color/Image Picker for List View */}
          {showColorPicker === project.id && (
            <div className="absolute top-full mt-2 right-0 z-10 bg-gray-800 rounded-lg shadow-xl p-4 w-64">
              <div className="mb-3">
                <h4 className="text-white text-sm font-semibold mb-2">Gradients</h4>
                <div className="grid grid-cols-5 gap-2">
                  {gradientOptions.map((gradient, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectBackground(project.id, 'gradient', gradient)}
                      className={`w-10 h-10 rounded bg-gradient-to-br ${gradient} hover:scale-110 transition-transform`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold mb-2">Images</h4>
                <div className="grid grid-cols-3 gap-2">
                  {imageOptions.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectBackground(project.id, 'image', image)}
                      className="w-full h-16 rounded overflow-hidden hover:scale-105 transition-transform"
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    if (viewMode === 'bubble') {
      return (
        <div className="relative">
          <button
            onClick={() => handleProjectClick(project)}
            disabled={!project.active}
            className={`${baseClasses} ${activeClasses} ${backgroundClass} text-white rounded-full w-32 h-32 flex items-center justify-center relative`}
            style={backgroundStyle}
          >
            {/* Edit controls for bubble */}
            <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => startEditing(project, e)}
                className="p-1 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
                title="Rename"
              >
                <Edit2 className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => openColorPicker(project.id, e)}
                className="p-1 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
                title="Change background"
              >
                <Palette className="w-3 h-3" />
              </button>
            </div>

            {editingId === project.id ? (
              <div className="absolute inset-0 flex items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="bg-white/20 backdrop-blur text-white px-2 py-1 rounded text-xs w-24 text-center"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit();
                    if (e.key === 'Escape') cancelEdit();
                  }}
                />
              </div>
            ) : (
              <span className="font-semibold text-sm text-center px-2">{project.name}</span>
            )}

            {project.active && !editingId && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            )}
          </button>

          {/* Color/Image Picker for Bubble View */}
          {showColorPicker === project.id && (
            <div className="absolute top-full mt-2 z-10 bg-gray-800 rounded-lg shadow-xl p-4 w-64">
              <div className="mb-3">
                <h4 className="text-white text-sm font-semibold mb-2">Gradients</h4>
                <div className="grid grid-cols-5 gap-2">
                  {gradientOptions.map((gradient, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectBackground(project.id, 'gradient', gradient)}
                      className={`w-10 h-10 rounded bg-gradient-to-br ${gradient} hover:scale-110 transition-transform`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white text-sm font-semibold mb-2">Images</h4>
                <div className="grid grid-cols-3 gap-2">
                  {imageOptions.map((image, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectBackground(project.id, 'image', image)}
                      className="w-full h-16 rounded overflow-hidden hover:scale-105 transition-transform"
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  // Close color picker when clicking outside
  const handleOutsideClick = () => {
    if (showColorPicker) setShowColorPicker(null);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8"
      onClick={handleOutsideClick}
    >
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
              <Grid className="w-5 h-5" />
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