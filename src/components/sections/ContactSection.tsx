import React, { useState } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useIntersectionObserver } from '../../hooks';
import { GradientText, AnimatedCard } from '../ui/AdvancedComponents';

export const ContactSection: React.FC = () => {
  const { setActiveSection } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  React.useEffect(() => {
    if (isIntersecting) {
      setActiveSection('contact');
    }
  }, [isIntersecting, setActiveSection]);

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'kibromabebe20@gmail.com',
      link: 'mailto:kibromabebe20@gmail.com',
      description: 'Direct email for project inquiries',
      isPrimary: true
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: '/in/Kibrom Abebe',
      link: 'https://www.linkedin.com/in/kibrom-abebe-a99a63384?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      description: 'Professional network and updates',
      isPrimary: true
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: '@kibrom-bit',
      link: 'https://github.com/kibrom-bit',
      description: 'Open source projects and code',
      isPrimary: false
    },
    {
      icon: '✈️',
      title: 'Telegram',
      value: '@mylordjesus3',
      link: 'https://t.me/mylordjesus3',
      description: 'Tech insights and updates',
      isPrimary: false
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Initial Contact',
      description: 'Reach out via your preferred method'
    },
    {
      step: '02',
      title: 'Discovery Call',
      description: 'Discuss your project goals and requirements'
    },
    {
      step: '03',
      title: 'Proposal & Planning',
      description: 'Detailed project roadmap and timeline'
    },
    {
      step: '04',
      title: 'Collaboration',
      description: 'Work together to bring your vision to life'
    }
  ];

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Modern Geometric Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/10 dark:from-gray-900 dark:via-blue-900/5 dark:to-purple-900/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            Let's Build Something Amazing
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gray-900 dark:text-white">Get In </span>
            <GradientText>Touch</GradientText>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your ideas into exceptional digital experiences? 
            Choose your preferred method to start the conversation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          
          {/* Primary Contact Methods */}
          <div className="space-y-8">
            <AnimatedCard delay={200} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Preferred Contact Methods
              </h3>
              
              <div className="grid gap-4">
                {contactMethods.filter(method => method.isPrimary).map((method) => (
                  <a
                    key={method.title}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : '_self'}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="group p-6 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/10 dark:to-blue-800/10 border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        {method.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="font-semibold text-gray-900 dark:text-white text-lg">
                          {method.title}
                        </div>
                        <div className="text-blue-600 dark:text-blue-400 font-medium text-base">
                          {method.value}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {method.description}
                        </div>
                      </div>
                      <div className="text-blue-500 group-hover:text-blue-600 transition-colors duration-300 flex-shrink-0 text-xl">
                        →
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </AnimatedCard>

            {/* Additional Contact Methods */}
            <AnimatedCard delay={300} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Other Platforms
              </h3>
              
              <div className="grid gap-3">
                {contactMethods.filter(method => !method.isPrimary).map((method) => (
                  <a
                    key={method.title}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : '_self'}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="group p-4 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        {method.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {method.title}
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-sm">
                          {method.value}
                        </div>
                      </div>
                      <div className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300 flex-shrink-0">
                        →
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </AnimatedCard>
          </div>

          {/* Workflow & Process */}
          <div className="space-y-8">
            <AnimatedCard delay={400} className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 border border-blue-200/50 dark:border-blue-800/50">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                How We'll Work Together
              </h3>
              
              <div className="space-y-6">
                {workflowSteps.map((step, index) => (
                  <div key={step.step} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* Availability & Response Time */}
            <AnimatedCard delay={500} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border border-green-200/50 dark:border-green-800/50">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-green-700 dark:text-green-400 text-lg">
                  Available for New Projects
                </span>
              </div>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between items-center">
                  <span>Response Time:</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Within 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Availability:</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Remote Worldwide</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Project Types:</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-200">Web & Mobile Apps</span>
                </div>
              </div>
            </AnimatedCard>

            {/* Quick Info Card */}
            <AnimatedCard delay={600} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Why Work With Me?
              </h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>5+ Years Full Stack Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Modern Tech Stack (React, Node.js, TypeScript)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Agile Development Methodology</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>Clear Communication & Regular Updates</span>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-500 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm uppercase tracking-wider">
            Trusted Technologies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL', 'Tailwind', 'Next.js', 'MongoDB'].map((tech) => (
              <div key={tech} className="text-gray-400 dark:text-gray-500 font-semibold text-lg">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};