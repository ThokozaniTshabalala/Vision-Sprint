import React, { useState } from 'react';
import { sendEmail } from '../../utils/emailService';
import './ProjectDiscussion.css';

const ProjectDiscussion = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Real-time validation
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (value) {
          const cleaned = value.replace(/\s/g, '').replace(/-/g, '');
          // Accept +27 followed by 9 digits, or 0 followed by 9 digits
          if (!/^(\+27\d{9}|0\d{9})$/.test(cleaned)) {
            error = 'Please enter a valid South African phone number (e.g., +27 64 421 0047)';
          }
        }
        break;
      case 'projectType':
        if (!value) {
          error = 'Please select a project type';
        }
        break;
      case 'message':
        if (!value.trim()) {
          error = 'Project details are required';
        } else if (value.trim().length < 20) {
          error = 'Please provide at least 20 characters of project details';
        }
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    setMessageType('');

    // Validate all fields
    const fieldsToValidate = ['name', 'email', 'projectType', 'message'];
    let isValid = true;

    fieldsToValidate.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    if (!isValid) {
      setMessageType('error');
      setSubmitMessage('Please fix the errors before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email automatically using EmailJS
      const result = await sendEmail(formData);
      
      if (result.success) {
        setMessageType('success');
        setSubmitMessage(result.message || '✅ Email sent successfully! We\'ll get back to you within 24 hours.');
        
        // Clear form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
        });
        setErrors({});
      } else {
        setMessageType('error');
        setSubmitMessage(result.error || '❌ Failed to send message. Please check your EmailJS configuration or try again.');
      }
    } catch (error) {
      setMessageType('error');
      setSubmitMessage('❌ An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
      
      // Clear message after 8 seconds
      setTimeout(() => {
        setSubmitMessage('');
        setMessageType('');
      }, 8000);
    }
  };

  const projectTypes = [
    'Business Analysis',
    'Mobile App Development',
    'Web App Development',
    'UI/UX Design',
    'UX/UI Audit & Redesign',
    'Low-/No-Code Development',
    'Other'
  ];

  const budgetOptions = [
    'R1 000 - R10 000',
    'R10 000 - R50 000',
    'R50 000 - R100 000',
    'R100 000 - R250 000',
    'R250 000 - R500 000',
    'R500 000 - R1 000 000',
    'R1 000 000+',
    'Not Sure Yet'
  ];

  const timelineOptions = [
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'More than 12 months',
    'Flexible'
  ];

  return (
    <section className="project-discussion bg-gradient-to-b from-white to-gray-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-orange-500 uppercase font-semibold text-sm mb-2 tracking-wider">
            Get Started
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discuss Your <span className="text-orange-500">Project</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Let's transform your vision into reality. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none ${
                    errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none ${
                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            {/* Phone and Company Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="+27 64 421 0047"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                  placeholder="Company Inc."
                />
              </div>
            </div>

            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mb-2">
                Project Type <span className="text-orange-500">*</span>
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-white ${
                  errors.projectType ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Select a project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>}
            </div>

            {/* Budget and Timeline Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-white"
                >
                  <option value="">Select budget range</option>
                  {budgetOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none bg-white"
                >
                  <option value="">Select timeline</option>
                  {timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Project Details <span className="text-orange-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                maxLength={2000}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none resize-none ${
                  errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
              <p className={`mt-1 text-xs ${
                formData.message.length > 1900 ? 'text-orange-600' : 'text-gray-500'
              }`}>
                {formData.message.length}/2000 characters (minimum 20 required)
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-12 py-4 sm:px-16 sm:py-5 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold text-lg rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Email...
                  </span>
                ) : (
                  '📧 Send Message'
                )}
              </button>
            </div>
            
            <p className="text-center text-xs text-gray-500 mt-3">
              Your message will be sent automatically to:<br/>
              <span className="font-semibold">lalelaninene@gmail.com</span> & <span className="font-semibold">thokozanierick02@gmail.com</span>
            </p>

            {/* Success/Error Message */}
            {submitMessage && (
              <div className={`text-center p-4 rounded-lg border ${
                messageType === 'success' 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <p className={`font-medium ${
                  messageType === 'success' ? 'text-green-700' : 'text-red-700'
                }`}>
                  {submitMessage}
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">Email Us</h3>
            <p className="text-gray-600 text-sm mb-1">lalelaninene@gmail.com</p>
            <p className="text-gray-600 text-sm">thokozanierick02@gmail.com</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">Call Us</h3>
            <p className="text-gray-600 text-sm mb-1">+27 64 421 0047</p>
            <p className="text-gray-600 text-sm">+27 69 806 1824</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-800 mb-2 text-lg">Remote Work</h3>
            <p className="text-gray-600 text-sm">Serving clients worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDiscussion;
