import {
  Body,
  Button,
  ButtonText,
  Emphasis,
  H1,
  H2,
  H3,
} from "@/components/ui";
import { useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiShield,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const HomePage = () => {
  // State for explore categories
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Categories data
  const categories = [
    {
      id: 1,
      name: "Clinical & Patient Care",
      jobs: 234,
      color: "bg-purple-100",
    },
    {
      id: 2,
      name: "Allied Health Professionals",
      jobs: 156,
      color: "bg-blue-100",
    },
    {
      id: 3,
      name: "Healthcare Administration",
      jobs: 89,
      color: "bg-green-100",
    },
    {
      id: 4,
      name: "Mental & Behavioral Health",
      jobs: 67,
      color: "bg-orange-100",
    },
    { id: 5, name: "Public Health", jobs: 45, color: "bg-pink-100" },
    { id: 6, name: "Emergency Medicine", jobs: 78, color: "bg-red-100" },
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      id: 1,
      title: "Create Profile",
      description:
        "Set up your professional profile with credentials and experience",
      icon: FiUsers,
    },
    {
      id: 2,
      title: "Get Matched",
      description: "Our AI matches you with relevant opportunities",
      icon: FiHeart,
    },
    {
      id: 3,
      title: "Apply & Connect",
      description: "Apply to positions and connect with healthcare teams",
      icon: FiArrowRight,
    },
    {
      id: 4,
      title: "Start Working",
      description: "Begin your new role with trusted healthcare providers",
      icon: FiCheck,
    },
  ];

  // Why choose us features
  const features = [
    {
      id: 1,
      title: "Healthcare-Specific Matching",
      description:
        "Our platform specializes in healthcare roles, ensuring perfect matches between professionals and facilities.",
      icon: FiHeart,
    },
    {
      id: 2,
      title: "Screened & Verified Candidates",
      description:
        "Every profile is carefully reviewed to ensure quality and authenticity for both employers and candidates.",
      icon: FiShield,
    },
    {
      id: 3,
      title: "Streamlined Hiring",
      description:
        "With automated screening and smart recommendations, we help reduce hiring timelines significantly.",
      icon: FiTrendingUp,
    },
    {
      id: 4,
      title: "Built-In Training Access",
      description:
        "Candidates can access relevant training and certification tools directly from our platform.",
      icon: FiUsers,
    },
  ];

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Nursing: Predictions for the Next Decade",
      image: "/blog-1.png",
      category: "Nursing",
    },
    {
      id: 2,
      title:
        "Diversity in Healthcare Hiring: Why It Matters and How to Improve",
      image: "/blog-2.png",
      category: "Hiring",
    },
    {
      id: 3,
      title: "Top 10 In-Demand Healthcare Jobs in 2024 (And How to Land One!)",
      image: "/blog-3.png",
      category: "Career",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote:
        "This platform transformed our hiring process. We found qualified healthcare professionals faster than ever before.",
      author: "Dr. Ellis Rose",
      title: "MD, Healthcare Inc",
    },
    {
      id: 2,
      quote:
        "The quality of candidates is exceptional. Every professional we've hired through this platform has exceeded our expectations.",
      author: "Sarah Johnson",
      title: "RN, City Hospital",
    },
    {
      id: 3,
      quote:
        "As a medical professional, I can confidently say this platform connects you with the best opportunities in healthcare.",
      author: "Dr. Michael Chen",
      title: "Cardiologist, Heart Center",
    },
  ];

  // Job listings data
  const jobListings = [
    {
      company: "Diamondviva LTD",
      location: "Dallas, Texas",
      title: "Medical Assistant",
      type: "Full Time",
      time: "Remote 2 hours ago",
      description:
        "Lorem ipsum dolor sit amet consectetur. Phasellus cursus sed cursus turpis justo in. Consectetur sapien aliquam mauris eget vitae non.",
      tags: ["Resilience", "Patient", "In-house"],
      rate: "$60/hr",
    },
    {
      company: "Diamondviva LTD",
      location: "Dallas, Texas",
      title: "Clinical Psychologist",
      type: "Full Time",
      time: "Remote 2 hours ago",
      description:
        "Lorem ipsum dolor sit amet consectetur. Phasellus cursus sed cursus turpis justo in. Consectetur sapien aliquam mauris eget vitae non.",
      tags: ["Resilience", "Patient", "In-house"],
      rate: "$120/hr",
    },
    // Add more job listings as needed
  ];

  // Duplicate the listings to fill the grid (or fetch real data)
  const displayedJobs = [...jobListings, ...jobListings, ...jobListings].slice(
    0,
    6
  );

  // Handler for category selection
  const handleCategoryClick = (id) => {
    setSelectedCategory(selectedCategory === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-32">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            {/* Text Content (Left) */}
            <div className="space-y-6">
              <H1 className="text-[#46007a] mb-4">
                Where Top <span className="text-[#9865EE]">Talent</span>
                <br />
                Meets Trusted
                <br />
                Healthcare Teams
              </H1>

              <Body className="text-gray-600 max-w-lg mb-4">
                Connecting healthcare professionals with the right roles and
                facilities with the right people in one seamless platform
              </Body>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="bg-[#46007a] hover:bg-[#63347E] text-white px-6 py-3 rounded-lg transition-colors cursor-pointer duration-300">
                  <ButtonText>Find Your Next Role</ButtonText>
                </button>
                <button className="border-2 border-[#46007A] text-[#46007a] px-6 py-3 rounded-lg hover:bg-[#46007a] hover:text-white transition-colors cursor-pointer duration-300">
                  <ButtonText>Hire Top Talent</ButtonText>
                </button>
              </div>
            </div>

            {/* Image (Right) */}
            <div className="mt-12 lg:mt-0">
              <div className="relative flex justify-center p-4">
                <div className="aspect-square rounded-full bg-linear-to-b from-white from-40% to-[#9865EE]">
                  <img
                    src="/header.png"
                    alt="Healthcare professionals"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = "/placeHolder.png";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Find a job section */}
        <section className="py-20 bg-gray-100">
          <H3 className="text-center">Find a job That Counts</H3>
          <form className="w-full lg:max-w-4/6 grid lg:grid-cols-3 gap-4 sm:gap-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <input
              type="search"
              className="w-full bg-white p-2 sm:p-3 rounded-lg font-sans outline-none placeholder:text-[#ADADAD] font-semibold border border-[#c5c5c5]"
              placeholder="Job Title"
            />
            <input
              type="search"
              className="w-full bg-white p-2 sm:p-3 rounded-lg font-sans outline-none placeholder:text-[#ADADAD] font-semibold border border-[#c5c5c5]"
              placeholder="Location"
            />
            <Button className="h-full bg-purple-900 border border-[#c5c5c5] cursor-pointer col-span-2 md:col-span-1">
              <ButtonText className={"text-white"}>Search</ButtonText>
            </Button>
          </form>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <H2 className="mb-4">
                How It <span className="text-[#9865EE]">Works</span>
              </H2>
            </div>
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#9865EE] hidden md:block"></div>
              <div className="space-y-12">
                {howItWorksSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isEven = index % 2 === 0;
                  return (
                    <div key={step.id} className="relative">
                      <div
                        className={`hidden md:flex md:items-center ${
                          isEven ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        <div
                          className={`md:w-5/12 ${
                            isEven ? "md:pr-8" : "md:pl-8"
                          }`}
                        >
                          <div className="bg-white p-6 rounded-xl shadow-lg">
                            <div className="flex items-center mb-4">
                              <div className="w-10 h-10 bg-[#9865EE] rounded-full flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-sm">
                                  {step.id}
                                </span>
                              </div>
                              <H3 className="">{step.title}</H3>
                            </div>
                            <Body className="">{step.description}</Body>
                          </div>
                        </div>
                        <div className="md:w-2/12 flex justify-center">
                          <div className="w-16 h-16 bg-[#46007A] rounded-full flex items-center justify-center relative z-10">
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="md:w-5/12"></div>
                      </div>
                      <div className="md:hidden flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#46007A] rounded-full flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 bg-[#9865EE] rounded-full flex items-center justify-center mr-2">
                              <span className="text-white font-bold text-xs">
                                {step.id}
                              </span>
                            </div>
                            <H3 className="">{step.title}</H3>
                          </div>
                          <Body className="">{step.description}</Body>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <H2 className="text-black mb-4">
                Why Choose <span className="text-[#9865EE]">Us</span>
              </H2>
              <div className="flex justify-between gap-8 mt-6">
                <span className="font-bold text-xl flex gap-2 items-center text-[#9865EE]">
                  <img src="/checkmark.svg" className="w-7" alt="Checkmark" />
                  Verified Talent
                </span>
                <span className="font-bold text-xl flex gap-2 items-center text-[#9865EE]">
                  <img src="/checkmark.svg" className="w-7" alt="Checkmark" />
                  Trusted Employers
                </span>
                <span className="font-bold text-xl flex gap-2 items-center text-[#9865EE]">
                  <img src="/checkmark.svg" className="w-7" alt="Checkmark" />
                  Real Results
                </span>
              </div>
            </div>
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center mt-12">
              <div className="grid grid-cols-1 gap-6">
                {features.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={feature.id}
                      className="bg-white rounded-xl p-6 flex items-start gap-4"
                    >
                      <div className="w-12 h-12 aspect-square bg-secondary-400/40 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <H3 className="text-[#46007a] mb-2">{feature.title}</H3>
                        <Body className="text-secondary-400">
                          {feature.description}
                        </Body>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-end">
                <img
                  src="/why_choose.png"
                  alt="Healthcare professional"
                  className="aspect-square lg:aspect-auto object-cover w-full lg:w-4/5 rounded-tl-[100px] rounded-br-[100px] mt-16 lg:mt-0"
                  onError={(e) => {
                    e.target.src = "/placeHolder.png";
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Explore Categories Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <H2 className="mb-4">
                Explore <span className="text-[#9865EE]">Categories</span>
              </H2>
            </div>
            {/* Horizontal scrollable pill selector */}
            <div className="flex flex-nowrap overflow-x-auto gap-3 mb-12 pb-2 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`px-6 py-2 rounded-full font-semibold text-base whitespace-nowrap transition-colors border border-[#9865EE] ${
                    selectedCategory === category.id
                      ? "bg-[#9865EE] text-white"
                      : "bg-white/10 text-[#9865EE] hover:bg-[#9865EE] hover:text-white"
                  }`}
                >
                  {/* Example: add an icon for each category */}
                  {category.id === 1 && (
                    <img
                      src="/Applications-icon.png"
                      alt="Profile"
                      className="inline-block w-5 h-5 mr-2 align-middle"
                    />
                  )}
                  {category.id === 2 && (
                    <img
                      src="/Interviews-icon.png"
                      alt="Allied Health"
                      className="inline-block w-5 h-5 mr-2 align-middle"
                    />
                  )}
                  {category.id === 3 && (
                    <img
                      src="/Lessons-icon.png"
                      alt="Admin"
                      className="inline-block w-5 h-5 mr-2 align-middle"
                    />
                  )}
                  {category.id === 4 && (
                    <img
                      src="/Offers-icon.png"
                      alt="Mental Health"
                      className="inline-block w-5 h-5 mr-2 align-middle"
                    />
                  )}
                  {category.id === 5 && (
                    <img
                      src="/candidate-pic.png"
                      alt="Public Health"
                      className="inline-block w-5 h-5 mr-2 align-middle rounded-full"
                    />
                  )}
                  {category.id === 6 && (
                    <img
                      src="/Applications-icon.png"
                      alt="Emergency"
                      className="inline-block w-5 h-5 mr-2 align-middle"
                    />
                  )}
                  {category.name}
                </button>
              ))}
            </div>
            {/* Job cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedJobs.map((job, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8F6FF] rounded-2xl p-6 shadow-lg flex flex-col justify-between min-h-[220px] border border-[#E5E0F6]"
                >
                  <div>
                    <div className="flex items-center mb-4 gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
                      <div className="flex flex-col items-start justify-center">
                        <span className="text-[#46007A] font-semibold text-base">
                          {job.company || "Company Name"}
                        </span>
                        <span className="flex items-center gap-1 text-gray-300 text-xs font-medium mt-1">
                          <img src="/Location.svg" className="w-5" alt="" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <H3 className="text-[#46007A] mb-1 text-lg">{job.title}</H3>
                    <div className="flex gap-2 mb-2">
                      <span className="bg-[#9865EE] text-white text-xs px-2 py-1 rounded">
                        {job.type}
                      </span>
                      <span className="bg-[#E5E0F6] text-[#9865EE] text-xs px-2 py-1 rounded">
                        {job.time}
                      </span>
                    </div>
                    <Body className="text-[#46007A] text-sm mb-2 line-clamp-2">
                      {job.description}
                    </Body>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[#9865EE] font-bold text-lg">
                      {job.rate}
                    </span>
                    <Button className="bg-[#9865EE] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md">
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Inspired Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <H2 className="mb-4">
                Get <span className="text-[#9865EE]">Inspired</span>
              </H2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="h-48 bg-gray-200 relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "/placeHolder.png";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <H3 className="mb-4 line-clamp-2">{post.title}</H3>
                    <Button className="bg-[#9865EE] text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Read More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <H2 className="mb-4">
                What Our Clients Are{" "}
                <span className="text-[#9865EE]">Saying</span>
              </H2>
            </div>
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
                    <div className="text-center">
                      <div className="text-[#9865EE] text-6xl font-bold mb-6">
                        “
                      </div>
                      <Body className="text-white mb-8 leading-relaxed font-normal text-h3">
                        {testimonial.quote}
                      </Body>
                      <div className="border-t border-gray-700 pt-6">
                        <Emphasis className="text-white">
                          {testimonial.author}
                        </Emphasis>
                        <Body className="text-gray-400">
                          {testimonial.title}
                        </Body>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* Footer CTA Section */}
        <section className="relative py-20 overflow-hidden bg-[#46007A]">
          <div className="absolute inset-0 bg-[url('/cta.png')] bg-cover bg-center bg-no-repeat opacity-30"></div>
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <H1 className="text-white mb-6 leading-tight lg:text-5xl">
              Get Expert Medical Services at
              <br />
              <span className="text-white">Your Fingertips</span>
            </H1>
            <Body className="text-white/90 mb-8 max-w-2xl mx-auto">
              Access top doctors and healthcare service providers anytime,
              anywhere. Search available jobs and connect with top talents
              today!
            </Body>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-white text-[#46007A] py-4 px-8 rounded-full font-semibold flex items-center justify-center">
                <FiArrowRight className="mr-2 w-5 h-5" />
                Get Started
              </Button>
              <Button className="border-2 border-white text-white py-4 px-8 rounded-full font-semibold flex items-center justify-center bg-transparent hover:bg-white hover:text-[#46007A]">
                <FiUsers className="mr-2 w-5 h-5" />
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
