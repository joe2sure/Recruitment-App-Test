import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#EFF4FE] text-black py-12 font-sans px-4 sm:px-6 lg:px-12">
      <div className="container bg-white p-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-[#738FA7]">
              {[
                "Browse Jobs",
                "Post a Job",
                "Job Sender Resources",
                "Employer Resources",
                "About Our Mission",
                "Testimonials",
                "Privacy Policy",
                "Terms of Service",
              ].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Job Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Job Categories</h3>
            <ul className="space-y-2 text-[#738FA7]">
              {[
                "Nursing Jobs",
                "Physician & Surgeon Jobs",
                "Allied Health Jobs",
                "Healthcare Admin Jobs",
                "Mental Health Jobs",
              ].map((category) => (
                <li key={category}>
                  <a href="#" className="hover:text-white transition-colors">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-[#738FA7]">
              {[
                "Blog",
                "Training Center",
                "Interview Guide",
                "Certification Directory",
                "Resume Tips",
              ].map((resource) => (
                <li key={resource}>
                  <a href="#" className="hover:text-white transition-colors">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-[#738FA7]">
              {[
                "Recruitment Solutions",
                "Pricing Plans",
                "Advertise with Us",
                "Employer Dashboard",
                "Hiring Tips",
              ].map((employer) => (
                <li key={employer}>
                  <a href="#" className="hover:text-white transition-colors">
                    {employer}
                  </a>
                </li>
              ))}
            </ul>
          </div>

         
          <div className="md:col-span-4 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <section className="mb-3 flex items-center gap-4">
              <div className="text-white bg-[#00000057] rounded-full text-center flex justify-center items-center w-6 h-6 "><FaInstagram className="text-base" /></div>
              <div className="text-white bg-[#00000057] rounded-full text-center flex justify-center items-end w-6 h-6 pb-0"><FaFacebookF className="text-xl" /></div>
              <div className="text-[#00000057] bg-[#0000] rounded-full text-center flex justify-center items-center w-6 h-6 "><FaTwitter className="text-2xl" /></div>
              <div className="text-white bg-[#00000057] rounded-full text-center flex justify-center items-center w-6 h-6 "><FaLinkedinIn className="text-base" /></div>
            </section>
            <div className="flex flex-col w-full">
              <div className="flex flex-col space-y-2 mb-2">
                <p className="text-black text-xs font-semibold">Subscribe to our Newsletter</p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-md text-gray-800 ring-2 ring-[#00000038] focus:outline-none focus:ring-2 focus:ring-[#46007A]"
                />
              </div>
              <button className="bg-[#DE7125] text-white px-4 py-2 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <section className="text-[#738FA7] flex text-xs gap-4 mt-8 justify-end">
          <a href="" className="">Terms of Use</a>
          <a href="" className="">Privacy Policy</a>
        </section>
      </div>
    </footer>
  );
};

export default Footer;