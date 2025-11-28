import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useApp } from '../../contexts/AppContext';
import { useIntersectionObserver } from '../../hooks';
import { GradientText, AnimatedCard, LoadingSpinner } from '../ui/AdvancedComponents';

export const ContactSection: React.FC = () => {
  const { setActiveSection, setCursorVariant } = useApp();
  const { ref, isIntersecting } = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  React.useEffect(() => {
    if (isIntersecting) {
      setActiveSection('contact');
    }
  }, [isIntersecting, setActiveSection]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      
      const result = await emailjs.send(
        'service_yzu0emm', 
        'template_8ay4wtn ', 
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'kibromabebe20@gmail.com', // Your email where you want to receive messages
          date: new Date().toLocaleString()
        },
        'nmq11R5g5mMcsqfOo' // Get from EmailJS dashboard
      );

      if (result.status === 200) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'hello@yourname.dev',
      link: 'mailto:hello@yourname.dev'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/yourname',
      link: 'https://linkedin.com/in/yourname'
    },
    {
      icon: '🐙',
      title: 'GitHub',
      value: 'github.com/yourname',
      link: 'https://github.com/yourname'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Your City, Country',
      link: '#'
    }
  ];

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-gray-900 dark:text-white">Let's </span>
            <GradientText>Connect</GradientText>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to start your next project? Let's discuss how we can work together 
            to bring your ideas to life with modern technology and creative solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <AnimatedCard delay={200}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Get In Touch
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                I'm always interested in hearing about new opportunities, 
                whether it's a potential project, collaboration, or just 
                to chat about technology and development.
              </p>

              {/* Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={method.title}
                    href={method.link}
                    target={method.link.startsWith('http') ? '_blank' : '_self'}
                    rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {method.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {method.title}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {method.value}
                      </div>
                    </div>
                    <div className="text-gray-400 group-hover:text-primary-500 transition-colors duration-300">
                      →
                    </div>
                  </a>
                ))}
              </div>
            </AnimatedCard>

            {/* Availability Status */}
            <AnimatedCard delay={400} className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-green-700 dark:text-green-400">
                  Available for new projects
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                I'm currently accepting new projects and would love to hear about your ideas. 
                Response time: within 24 hours.
              </p>
            </AnimatedCard>
          </div>

          {/* Contact Form */}
          <AnimatedCard delay={300} className="bg-white dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400">
                  ✅ Thank you! Your message has been sent successfully. I'll get back to you within 24 hours.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400">
                  ❌ There was an error sending your message. Please try again or contact me directly via email.
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 outline-none"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="Project Inquiry"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                className="w-full bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center space-x-3"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </>
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Your information is secure and will only be used to respond to your inquiry.
              </p>
            </form>
          </AnimatedCard>
        </div>

        {/* Social Proof */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-500 ${
          isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Trusted by teams and individuals worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {['TechCorp', 'InnovateLabs', 'StartUpHub', 'DigitalAgency', 'WebSolutions'].map((company) => (
              <div key={company} className="text-gray-400 dark:text-gray-500 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};