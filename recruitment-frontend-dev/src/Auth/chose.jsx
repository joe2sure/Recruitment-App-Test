import { Body, ButtonText, H1, H2 } from '@/components/ui/typography';
import { Link } from 'react-router-dom';
import docimage from '../assets/images/about/doctors.png';

const Chose = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="md:w-1/2 w-full relative bg-black text-white overflow-hidden h-64 md:h-auto">
        <img
          src={docimage}
          alt="Healthcare Worker"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white mb-4 md:mb-6 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">RP</span>
          </div>
          <H1 className="text-xl md:text-2xl mb-2">Recruitment Platform</H1>
          <Link
            to="/"
            className="text-xs md:text-sm bg-white text-black px-3 md:px-4 py-1.5 md:py-2 rounded-full mt-2 hover:bg-gray-100 transition-colors"
          >
            <ButtonText>Back to Home</ButtonText>
          </Link>
        </div>
        {/* Curve shape - only visible on md+ screens */}
        <div className="hidden md:block absolute right-0 top-0 h-full w-32 bg-white rounded-bl-full" />
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 w-full flex flex-col justify-center items-center p-6 md:p-10">
        <div className="max-w-sm w-full text-center">
          <H2 className="mb-4">How would you like to sign in?</H2>
          <Body className="text-gray-600 mb-6">
            Choose your role to access the right tools and features.
          </Body>
          <Link
            to="/auth/register"
            className="w-full border border-gray-400 rounded-full py-2 mb-4 hover:bg-gray-100 transition text-sm block"
          >
            <ButtonText>Continue as a talent</ButtonText>
          </Link>
          <Link
            to="/auth/register"
            className="w-full border border-gray-400 rounded-full py-2 hover:bg-gray-100 transition text-sm block"
          >
            <ButtonText>Continue as an employer</ButtonText>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Chose;
