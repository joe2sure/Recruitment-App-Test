// import React, { useRef, useState } from "react";
// import * as Select from "@radix-ui/react-select";
// import {
//   FiEdit2,
//   FiBold,
//   FiItalic,
//   FiLink,
//   FiChevronDown,
//   FiCheck,
// } from "react-icons/fi";

// const locationOptions = [
//   { value: "England", label: "England" },
//   { value: "Japan", label: "Japan" },
//   { value: "Australia", label: "Australia" },
//   { value: "USA", label: "USA" },
//   { value: "Switzerland", label: "Switzerland" },
// ];

// const employeeOptions = [
//   { value: "1-50", label: "1 - 50" },
//   { value: "51-200", label: "51 - 200" },
//   { value: "201-500", label: "201 - 500" },
//   { value: "501-1000", label: "501 - 1000" },
// ];

// const industryOptions = [
//   { value: "Technology", label: "Technology" },
//   { value: "Finance", label: "Finance" },
//   { value: "Healthcare", label: "Healthcare" },
//   { value: "Education", label: "Education" },
// ];

// const EmployerSettings = () => {
//   const [logoFile, setLogoFile] = useState(null);
//   const [employerName, setEmployerName] = useState("John");
//   const [website, setWebsite] = useState("https://www.john.com");
//   const [locations, setLocations] = useState([
//     { value: "England", label: "England" },
//     { value: "Japan", label: "Japan" },
//     { value: "Australia", label: "Australia" },
//   ]);
//   const [employeeCount, setEmployeeCount] = useState(employeeOptions[0]);
//   const [industry, setIndustry] = useState(industryOptions[0]);
//   const [dateFounded, setDateFounded] = useState({
//     day: "31",
//     month: "July",
//     year: "2021",
//   });
//   const [description, setDescription] = useState(
//     "Lorem ipsum dolor sit amet..."
//   );
//   const [errors, setErrors] = useState({});
//   const descRef = useRef(null);

//   const handleLogoUpload = (e) => {
//     const file = e.target.files[0];
//     setLogoFile(file);
//     // TODO: upload stub
//   };

//   const handleDateChange = (field, value) => {
//     setDateFounded((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleDescInput = () => {
//     const text = descRef.current.innerText;
//     if (text.length <= 500) setDescription(text);
//   };

//   const applyFormat = (command) => {
//     document.execCommand(
//       command,
//       false,
//       command === "createLink" ? prompt("Enter URL:") : null
//     );
//     handleDescInput();
//   };

//   const handleSubmit = (e) => {
//     // e.preventDefault();
//     // // Simple validation
//     // const newErrors = {};
//     // if (!employerName.trim()) newErrors.employerName = 'Required';
//     // if (!website.trim()) newErrors.website = 'Required';
//     // if (description.length > 500) newErrors.description = 'Max 500 characters';
//     // setErrors(newErrors);
//     // if (Object.keys(newErrors).length === 0) {
//     //   // TODO: submit stub
//     //   console.log('Form submitted');
//     // }
//   };

//   const toggleLocation = (value) => {
//     setLocations((prev) => {
//       const exists = prev.find((o) => o.value === value);
//       if (exists) return prev.filter((o) => o.value !== value);
//       return [...prev, locationOptions.find((o) => o.value === value)];
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
//       <h1 className="text-3xl font-bold">Settings</h1>
//       <div className="border-b flex space-x-8">
//         <button
//           type="button"
//           className="pb-2 border-b-2 border-purple-600 font-medium"
//         >
//           Overview
//         </button>
//         <button type="button" className="pb-2 text-gray-500">
//           Social Links
//         </button>
//       </div>

//       {/* Logo Upload */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Employer Logo</label>
//         <div className="flex items-center space-x-4">
//           {logoFile ? (
//             <img
//               src={URL.createObjectURL(logoFile)}
//               alt="Logo"
//               className="w-16 h-16 object-cover rounded"
//             />
//           ) : (
//             <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded">
//               <FiEdit2 className="text-gray-400 w-6 h-6" />
//             </div>
//           )}
//           <label className="cursor-pointer px-4 py-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500">
//             Click to replace or drag and drop
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleLogoUpload}
//               className="hidden"
//             />
//           </label>
//         </div>
//       </div>

//       {/* Employer Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <label className="block text-sm font-medium">Employer Name</label>
//           <input
//             type="text"
//             value={employerName}
//             onChange={(e) => setEmployerName(e.target.value)}
//             className="mt-1 block w-full border rounded p-2"
//           />
//           {errors.employerName && (
//             <p className="text-red-500 text-xs">{errors.employerName}</p>
//           )}
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Website</label>
//           <input
//             type="url"
//             value={website}
//             onChange={(e) => setWebsite(e.target.value)}
//             className="mt-1 block w-full border rounded p-2"
//           />
//           {errors.website && (
//             <p className="text-red-500 text-xs">{errors.website}</p>
//           )}
//         </div>

// {/* Locations Multi-select */}
// <div className="md:col-span-2">
//   <label className="block text-sm font-medium mb-1">Location</label>
//   <Select.Root onValueChange={toggleLocation}>
//     <Select.Trigger className="w-full border rounded p-2 flex justify-between items-center">
//       <div className="flex flex-wrap gap-1">
//         {locations.length ? (
//           locations.map((loc) => (
//             <span
//               key={loc.value}
//               className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
//             >
//               {loc.label}
//             </span>
//           ))
//         ) : (
//           <span className="text-gray-500">Select locations...</span>
//         )}
//       </div>
//       <Select.Icon>
//         <FiChevronDown />
//       </Select.Icon>
//     </Select.Trigger>
//     <Select.Content className="mt-1 w-full bg-white border rounded">
//       <Select.Viewport>
//         {locationOptions.map((opt) => (
//           <Select.Item
//             key={opt.value}
//             value={opt.value}
//             className="flex items-center px-3 py-2 hover:bg-gray-100"
//           >
//             <Select.ItemText>{opt.label}</Select.ItemText>
//             <Select.ItemIndicator className="ml-auto">
//               {locations.find((l) => l.value === opt.value) && (
//                 <FiCheck />
//               )}
//             </Select.ItemIndicator>
//           </Select.Item>
//         ))}
//       </Select.Viewport>
//     </Select.Content>
//   </Select.Root>
// </div>
// {/* Employee Count */}
// <div>
//   <label className="block text-sm font-medium mb-1">Employee</label>
//   <Select.Root
//     value={employeeCount.value}
//     onValueChange={(val) =>
//       setEmployeeCount(employeeOptions.find((o) => o.value === val))
//     }
//   >
//     <Select.Trigger className="w-full border rounded p-2 flex justify-between items-center">
//       <Select.Value placeholder="Select..." />
//       <Select.Icon>
//         <FiChevronDown />
//       </Select.Icon>
//     </Select.Trigger>
//     <Select.Content className="mt-1 w-full bg-white border rounded">
//       <Select.Viewport>
//         {employeeOptions.map((opt) => (
//           <Select.Item
//             key={opt.value}
//             value={opt.value}
//             className="px-3 py-2 hover:bg-gray-100"
//           >
//             <Select.ItemText>{opt.label}</Select.ItemText>
//           </Select.Item>
//         ))}
//       </Select.Viewport>
//     </Select.Content>
//   </Select.Root>
// </div>
// {/* Industry */}
// <div>
//   <label className="block text-sm font-medium mb-1">Industry</label>
//   <Select.Root
//     value={industry.value}
//     onValueChange={(val) =>
//       setIndustry(industryOptions.find((o) => o.value === val))
//     }
//   >
//     <Select.Trigger className="w-full border rounded p-2 flex justify-between items-center">
//       <Select.Value placeholder="Select..." />
//       <Select.Icon>
//         <FiChevronDown />
//       </Select.Icon>
//     </Select.Trigger>
//     <Select.Content className="mt-1 w-full bg-white border rounded">
//       <Select.Viewport>
//         {industryOptions.map((opt) => (
//           <Select.Item
//             key={opt.value}
//             value={opt.value}
//             className="px-3 py-2 hover:bg-gray-100"
//           >
//             <Select.ItemText>{opt.label}</Select.ItemText>
//           </Select.Item>
//         ))}
//       </Select.Viewport>
//     </Select.Content>
//   </Select.Root>
// </div>
//       </div>

//       {/* Date Founded */}
//       <div className="grid grid-cols-3 gap-4">
//         <div>
//           <label className="block text-sm font-medium">Day</label>
//           <select
//             value={dateFounded.day}
//             onChange={(e) => handleDateChange("day", e.target.value)}
//             className="mt-1 block w-full border rounded p-2"
//           >
//             {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
//               <option key={day} value={day}>
//                 {day}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Month</label>
//           <select
//             value={dateFounded.month}
//             onChange={(e) => handleDateChange("month", e.target.value)}
//             className="mt-1 block w-full border rounded p-2"
//           >
//             {[
//               "January",
//               "February",
//               "March",
//               "April",
//               "May",
//               "June",
//               "July",
//               "August",
//               "September",
//               "October",
//               "November",
//               "December",
//             ].map((m) => (
//               <option key={m} value={m}>
//                 {m}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Year</label>
//           <select
//             value={dateFounded.year}
//             onChange={(e) => handleDateChange("year", e.target.value)}
//             className="mt-1 block w-full border rounded p-2"
//           >
//             {Array.from({ length: 30 }, (_, i) => 1995 + i).map((y) => (
//               <option key={y} value={y}>
//                 {y}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* About Employer */}
//       <div>
//         <label className="block text-sm font-medium mb-1">Description</label>
//         <div className="flex space-x-2 mb-1">
//           <button type="button" onClick={() => applyFormat("bold")}>
//             <FiBold />
//           </button>
//           <button type="button" onClick={() => applyFormat("italic")}>
//             <FiItalic />
//           </button>
//           <button type="button" onClick={() => applyFormat("createLink")}>
//             <FiLink />
//           </button>
//         </div>
//         <div
//           ref={descRef}
//           contentEditable
//           onInput={handleDescInput}
//           className="border rounded p-3 min-h-[120px]"
//         >
//           {description}
//         </div>
//         <div className="text-right text-xs text-gray-500">
//           {description.length} / 500
//         </div>
//         {errors.description && (
//           <p className="text-red-500 text-xs">{errors.description}</p>
//         )}
//       </div>

//       <button
//         type="submit"
//         className="mt-4 px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//       >
//         Save Changes
//       </button>
//     </form>
//   );
// };

// export default EmployerSettings;

import React, { useState } from "react";
import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui";
import BasicInformation from "@/components/employer/settings/BasicInformation";
import { AiFillEdit } from "react-icons/ai";
import EmployerDetails from "@/components/employer/settings/EmployerDetails";
import AboutEmployer from "@/components/employer/settings/AboutEmployer";
import CustomInput from "@/components/employer/settings/CustomInput";
import SocialInput from "@/components/employer/settings/SocialInput";
import SocialLinksSection from "@/components/employer/settings/SocialLinksSection";

const EmployerSettings = () => {
  // FOR OVERVIEW
  const [page, setPage] = useState("overview");
  const [formData, setFormData] = useState({
    logoFile: null,
    employerName: "",
    website: "",
    locations: [],
    employeeCount: { value: "1-50", label: "1 - 50" },
    industry: { value: "Technology", label: "Technology" },
    dateFounded: {
      day: "31",
      month: "July",
      year: "2021",
    },
    description: "Lorem ipsum dolor sit amet...",
  });
  const [errors] = useState({});

   const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Overview form submitted", formData);
  };

 
  return (
    <div className="flex flex-col w-full">
      <section className="mx-10">
        <h1 className="text-[2rem] font-semibold mb-6 text-black">Settings</h1>
        <div className="flex border-b border-[#D6DDEB] mb-6">
          <button
            type="button"
            onClick={() => setPage("overview")}
            className={`py-2 -mb-px font-semibold border-b-4 cursor-pointer ${
              page === "overview"
                ? "border-[#9865EE] text-black"
                : "border-transparent text-[#7C8493]"
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setPage("social")}
            className={`ml-6 py-2 -mb-px font-semibold border-b-4 cursor-pointer ${
              page === "social"
                ? "border-[#9865EE] text-black"
                : "border-transparent text-[#7C8493]"
            }`}
          >
            Social Links
          </button>
        </div>
      </section>

      {page === "overview" && (
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <BasicInformation
            logoFile={formData.logoFile}
            onLogoUpload={(file) => updateFormData({ logoFile: file })}
            description="This is company information that you can update anytime."
            icon={<AiFillEdit className="text-black text-lg" />}
            onBasicInfoEdit={() => setPage("social")}
          />

          <hr className="text-[#D6C3E9] my-6" />

          <EmployerDetails
            employerName={formData.employerName}
            website={formData.website}
            locations={formData.locations}
            employeeCount={formData.employeeCount}
            industry={formData.industry}
            dateFounded={formData.dateFounded}
            errors={errors}
            onEmployerNameChange={(value) =>
              updateFormData({ employerName: value })
            }
            onWebsiteChange={(value) => updateFormData({ website: value })}
            onLocationsChange={(value) => updateFormData({ locations: value })}
            onEmployeeCountChange={(value) =>
              updateFormData({ employeeCount: value })
            }
            onIndustryChange={(value) => updateFormData({ industry: value })}
            onDateFoundedChange={(value) =>
              updateFormData({ dateFounded: value })
            }
          />

          <hr className="text-[#D6C3E9] mt-28 mb-6" />

          <AboutEmployer
            description={formData.description}
            onDescriptionChange={(value) =>
              updateFormData({ description: value })
            }
            errors={errors}
          />

          <hr className="text-[#D6C3E9] my-6" />

          <div className="flex justify-end mx-10 pb-8">
            <button
              type="submit"
              className="px-8 py-3.5 bg-[#46007A] text-white text-lg font-bold rounded-[10px]"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {page === "social" && (
       <SocialLinksSection />
      )}
    </div>
  );
};

export default EmployerSettings;
