import { Body, ButtonText, H2 } from '@/components/ui/typography';
import { useAuth } from '@/hooks/useAuth';
import { validateEmail, validatePassword } from '@/utils/helpers';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sigupdoct from '../assets/images/about/doctors.png';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms & Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        userRole: formData.role,
      });

      // Redirect to dashboard or intended page
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the useAuth hook
      console.error('Registration failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Side */}
      <div className="w-full md:w-1/2 relative overflow-hidden">
        {/* Background Image */}
        <img
          src={sigupdoct}
          alt="Healthcare Worker"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#A3C1CB] opacity-70" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center text-white">
          <div className="w-24 h-24 rounded-full bg-white mb-6 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">RP</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Recruitment Platform</h1>
          <Link
            to="/"
            className="text-sm bg-white text-black px-4 py-2 rounded-full mt-2 hover:bg-gray-100 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Curve */}
        <div className="hidden md:block absolute right-0 top-0 h-full w-32 bg-white rounded-bl-full" />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-12 bg-[#F7FDFF]">
        <div className="max-w-md w-full px-6">
          <H2 className="mb-2 text-center text-gray-800">
            Create Your Account
          </H2>
          <Body className="text-gray-600 mb-6 text-center">
            Join as a talent or an employer to get started
          </Body>

          {/* Show global error */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <Body className="text-red-600 text-sm">{error}</Body>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${
                  errors.fullName
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300'
                }`}
              />
              {errors.fullName && (
                <Body className="text-red-600 text-sm mt-1">
                  {errors.fullName}
                </Body>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${
                  errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <Body className="text-red-600 text-sm mt-1">
                  {errors.email}
                </Body>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${
                  errors.password
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <Body className="text-red-600 text-sm mt-1">
                  {errors.password}
                </Body>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className={`w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 ${
                  errors.confirmPassword
                    ? 'border-red-300 bg-red-50'
                    : 'border-gray-300'
                }`}
              />
              {errors.confirmPassword && (
                <Body className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword}
                </Body>
              )}
            </div>

            {/* Radio Buttons */}
            <div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="candidate"
                    checked={formData.role === 'candidate'}
                    onChange={handleInputChange}
                    className="accent-blue-600"
                  />
                  <span>Candidate</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="employer"
                    checked={formData.role === 'employer'}
                    onChange={handleInputChange}
                    className="accent-blue-600"
                  />
                  <span>Employer</span>
                </label>
              </div>
              {errors.role && (
                <Body className="text-red-600 text-sm mt-1">{errors.role}</Body>
              )}
            </div>

            {/* Terms & Conditions */}
            <div>
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="accent-blue-600"
                />
                <span>
                  I agree to the <strong>Terms & Conditions</strong>
                </span>
              </label>
              {errors.agreeToTerms && (
                <Body className="text-red-600 text-sm mt-1">
                  {errors.agreeToTerms}
                </Body>
              )}
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="w-full bg-[#0C344B] text-white py-2 rounded-md hover:bg-[#0a2c3e] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ButtonText>
                  {isSubmitting || isLoading
                    ? 'Creating Account...'
                    : 'Register'}
                </ButtonText>
              </button>
            </div>
          </form>

          {/* Sign in link */}
          <div className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
