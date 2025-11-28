import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useIntersectionObserver } from '../../hooks';
import { GradientText, AnimatedCard } from '../ui/AdvancedComponents';

export const ProjectsSection: React.FC = () => {
  const { setActiveSection, setCursorVariant } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();
  const [activeFilter, setActiveFilter] = useState('all');

  React.useEffect(() => {
    if (isIntersecting) {
      setActiveSection('projects');
    }
  }, [isIntersecting, setActiveSection]);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include real-time inventory, payment processing, and admin dashboard.',
      image: '🛒',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      category: 'fullstack',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: '📋',
      technologies: ['React', 'TypeScript', 'Socket.io', 'MongoDB'],
      category: 'frontend',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description: 'A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      image: '🌤️',
      technologies: ['Vue.js', 'Chart.js', 'API Integration'],
      category: 'frontend',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'API Gateway Service',
      description: 'A microservices API gateway with rate limiting, authentication, and request routing for distributed systems.',
      image: '🔗',
      technologies: ['Node.js', 'Redis', 'Docker', 'Kubernetes'],
      category: 'backend',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Mobile Fitness App',
      description: 'Cross-platform mobile application for fitness tracking with workout plans, progress analytics, and social features.',
      image: '💪',
      technologies: ['React Native', 'Firebase', 'Redux'],
      category: 'mobile',
      liveUrl: '#',
      githubUrl: '#',
      featured: true
    },
    {
      id: 6,
      title: 'Data Visualization Tool',
      description: 'Interactive data visualization platform for business intelligence with real-time dashboards and reporting.',
      image: '📊',
      technologies: ['D3.js', 'React', 'Python', 'FastAPI'],
      category: 'fullstack',
      liveUrl: '#',
      githubUrl: '#',
      featured: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'mobile', label: 'Mobile' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" ref={ref} className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gray-900 dark:text-white">Featured </span>
            <GradientText>Projects</GradientText>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A collection of projects that showcase my skills in modern web development, 
            from concept to deployment with attention to detail and user experience.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary-500 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <AnimatedCard 
              key={project.id}
              delay={index * 150}
              className={`group cursor-pointer h-full flex flex-col ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Project Image/Icon */}
              <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Featured
                </div>
              )}

              {/* Project Content */}
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gradient transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300 text-center"
                >
                  Live Demo
                </button>
                <button
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-semibold hover:border-primary-500 transition-colors duration-300 text-center"
                >
                  Code
                </button>
              </div>
            </AnimatedCard>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Interested in working together? I'm always open to discussing new opportunities.
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            className="btn-primary text-lg px-8 py-4"
          >
            Let's Build Something Amazing
          </button>
        </div>
      </div>
    </section>
  );
};