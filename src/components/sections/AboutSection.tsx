import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useIntersectionObserver } from '../../hooks';
import { GradientText, AnimatedCard } from '../ui/AdvancedComponents';

export const AboutSection: React.FC = () => {
  const { setActiveSection, setCursorVariant } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();

  React.useEffect(() => {
    if (isIntersecting) {
      setActiveSection('about');
    }
  }, [isIntersecting, setActiveSection]);

  const skills = [
    {
      category: 'Frontend',
      items: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 82 },
        { name: 'PostgreSQL', level: 78 },
        { name: 'MongoDB', level: 75 },
      ]
    },
    {
      category: 'Tools',
      items: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'Figma', level: 85 },
      ]
    }
  ];

  const experiences = [
    {
      year: '2022 - Present',
      role: 'Senior Full Stack Engineer',
      company: 'Tech Innovators Inc.',
      description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.'
    },
    {
      year: '2020 - 2022',
      role: 'Frontend Developer',
      company: 'Digital Solutions LLC',
      description: 'Built responsive user interfaces and collaborated with design teams to implement pixel-perfect designs.'
    },
    {
      year: '2019 - 2020',
      role: 'Junior Developer',
      company: 'StartUp Ventures',
      description: 'Started my career building web applications and learning modern development practices.'
    }
  ];

  return (
    <section id="about" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-gray-800/50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gray-900 dark:text-white">About </span>
            <GradientText>Me</GradientText>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Passionate developer with 5+ years of experience creating digital solutions 
            that make a real impact. I believe in clean code, user-centered design, 
            and continuous learning.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column - Bio & Experience */}
          <div className="space-y-12">
            {/* Bio Card */}
            <AnimatedCard delay={200}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                My Journey
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  I started my coding journey in 2019 and have been passionate about 
                  creating digital experiences ever since. I specialize in building 
                  full-stack applications with modern technologies and best practices.
                </p>
                <p>
                  When I'm not coding, you can find me exploring new technologies, 
                  contributing to open-source projects, or sharing knowledge with 
                  the developer community through blogs and tutorials.
                </p>
                <p className="text-gradient font-semibold">
                  I'm always excited to take on new challenges and create something amazing.
                </p>
              </div>
            </AnimatedCard>

            {/* Experience Timeline */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Experience
              </h3>
              {experiences.map((exp, index) => (
                <AnimatedCard 
                  key={index} 
                  delay={300 + index * 100}
                  className="relative border-l-4 border-primary-500 pl-6"
                >
                  <div className="absolute -left-3 top-6 w-6 h-6 bg-primary-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                  <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold mb-2">
                    {exp.year}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {exp.role}
                  </h4>
                  <div className="text-gray-500 dark:text-gray-400 font-medium mb-3">
                    {exp.company}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                </AnimatedCard>
              ))}
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-12">
            {skills.map((skillCategory, categoryIndex) => (
              <AnimatedCard 
                key={skillCategory.category} 
                delay={400 + categoryIndex * 150}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {skillCategory.category}
                </h3>
                <div className="space-y-4">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <div 
                      key={skill.name}
                      className="group"
                      onMouseEnter={() => setCursorVariant('hover')}
                      onMouseLeave={() => setCursorVariant('default')}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out origin-left"
                          style={{ 
                            transform: isIntersecting ? `scaleX(${skill.level / 100})` : 'scaleX(0)',
                            transitionDelay: `${(categoryIndex * 200 + skillIndex * 50)}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            ))}

            {/* Call to Action Card */}
            <AnimatedCard delay={800} className="text-center bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-800 dark:to-purple-900/20 border-primary-200 dark:border-primary-800">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Build Something Amazing?
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let's discuss your project and bring your ideas to life with cutting-edge technology.
              </p>
              <button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="btn-primary"
              >
                Start a Project
              </button>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
};