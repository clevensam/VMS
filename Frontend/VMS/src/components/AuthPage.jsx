import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/auth';

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signup');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right');
  const [isAnimating, setIsAnimating] = useState(false);

  const [formData, setFormData] = useState({
    username: '',   
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const onboardingSlides = [
    {
      title: "Welcome to VMS",
      description: "Venue Management System (VMS) simplifies how lecturers reserve halls or classrooms, ensuring a smooth and transparent booking process across departments.",
      image: "/slide.svg"
    },
    {
      title: "Instant Booking Access",
      description: "Lecturers can view real-time venue availability and instantly request or confirm bookings without manual paperwork or delays.",
      image: "/slide2.svg"
    },
    {
      title: "Smart Scheduling & Conflict Alerts",
      description: "VMS automatically detects and prevents scheduling conflicts, providing alerts when two bookings overlap or clash with important events.",
      image: "/slide3.svg"
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (activeTab === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const url = activeTab === 'signup' ? '/api/auth/signup' : '/api/auth/login';
        const response = await axios.post(`http://localhost:5000${url}`, formData);
        alert(response.data.message);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          alert('Login successful!');
          navigate('/Dashboard'); 
        }
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else {
          alert('An error occurred. Please try again.');
        }
      }
    }
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('right');
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % onboardingSlides.length);
      setIsAnimating(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('left');
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + onboardingSlides.length) % onboardingSlides.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setSlideDirection(index > currentSlide ? 'right' : 'left');
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 300);
  };

  // Animation classes based on direction
  const getSlideAnimationClass = () => {
    return slideDirection === 'right' 
      ? 'animate-slideInRight' 
      : 'animate-slideInLeft';
  };

  const getTextAnimationClass = () => {
    return slideDirection === 'right'
      ? 'animate-fadeInRight'
      : 'animate-fadeInLeft';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      <aside className="lg:w-1/2 bg-gradient-to-br from-blue-700 to-blue-900 text-white px-8 py-12 lg:px-16 flex flex-col justify-center relative overflow-hidden">
        <div className="text-center max-w-xl mx-auto">
          {/* Animated Image */}
          <div className={`transition-transform duration-300 ${getSlideAnimationClass()}`}>
            <img
              src={onboardingSlides[currentSlide].image}
              alt={onboardingSlides[currentSlide].title}
              className="w-full max-h-65 object-contain mx-auto mb-8"
            />
          </div>
          
          {/* Animated Title */}
          <div className={`transition-transform duration-300 ${getTextAnimationClass()}`}>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight tracking-wide">
              {onboardingSlides[currentSlide].title}
            </h1>
          </div>
          
          {/* Animated Description */}
          <div className={`transition-transform duration-300 delay-100 ${getTextAnimationClass()}`}>
            <p className="text-lg lg:text-xl font-light text-white/90">
              {onboardingSlides[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {onboardingSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white bg-opacity-30 w-3'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </aside>

      {/* Rest of your existing form code remains exactly the same */}
      <main className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">VMS</h2>
            <p className="text-gray-600">Venue Management System</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => {
                setActiveTab('signup');
                setErrors({});
              }}
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'signup' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
           Create Account
            </button>
            <button
              onClick={() => {
                setActiveTab('signin');
                setErrors({});
              }}
              className={`py-2 px-4 font-medium text-sm focus:outline-none ${activeTab === 'signin' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Login
            </button>
          </div>

          {/* Signup Form */}
          {activeTab === 'signup' && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
<label htmlFor="username"className="block text-sm font-medium text-gray-700 mb-1 " >Username:</label>
                 <input
                  type="text"
                   id="username" 
                   placeholder="Mr.Doe"
                   name="username"
                   value={formData.username}          // add value binding
                   onChange={handleChange} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required></input>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password again"
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Signin Form */}
          {activeTab === 'signin' && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">Remember me</label>
                </div>

                <div className="text-sm">
                  <a href="#" className="text-blue-600 hover:text-blue-500">Forgot password?</a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default AuthPage;