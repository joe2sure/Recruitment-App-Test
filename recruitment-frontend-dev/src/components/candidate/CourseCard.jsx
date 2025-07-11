import React from "react";

const CourseCard = ({ course }) => {
  // Map category to corresponding color class
  const categoryColorMap = {
    "Technical & Digital Health": "bg-green-50 text-green-500",
    "Compliance & Safety": "bg-orange-50 text-orange-500",
  };

  const categoryColorClass =
    categoryColorMap[course.category] || "bg-blue-50 text-blue-500";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span
            className={`px-3 py-1 text-sm rounded-full ${categoryColorClass}`}
          >
            {course.category}
          </span>
          <span className="text-sm text-purple-800">
            {course.lessons} Lessons
          </span>
        </div>

        <h3 className="text-lg font-semibold text-black mb-3">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{course.description}</p>

        <button className="text-purple-700 border border-gray-300 rounded-2xl shadow-2xl px-3 py-2 text-sm font-medium transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
