import React from "react";
import CustomInput from "./CustomInput";
import MultiSelectDropdown from "./MultiSelectDropdown";
import SingleSelectDropdown from "./SingleSelectDropdown";
import DatePicker from "./DatePicker";

const locationOptions = [
  { value: "England", label: "England" },
  { value: "Japan", label: "Japan" },
  { value: "Australia", label: "Australia" },
  { value: "USA", label: "USA" },
  { value: "Switzerland", label: "Switzerland" },
];

const employeeOptions = [
  { value: "1-50", label: "1 - 50" },
  { value: "51-200", label: "51 - 200" },
  { value: "201-500", label: "201 - 500" },
  { value: "501-1000", label: "501 - 1000" },
];

const industryOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Finance", label: "Finance" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
];

const EmployerDetails = ({
  employerName,
  website,
  locations,
  employeeCount,
  industry,
  dateFounded,
  errors,
  onEmployerNameChange,
  onWebsiteChange,
  onLocationsChange,
  onEmployeeCountChange,
  onIndustryChange,
  onDateFoundedChange,
}) => {
  return (
    <div className="flex mx-10 gap-16">
      <section className="w-1/4">
        <h3 className="font-semibold mb-1 text-[#25324B]">Employer Details</h3>
        <h4 className="text-[#7C8493]">
          Introduce your company core info quickly to users by fill up
          company details
        </h4>
      </section>
      <section className="flex flex-col gap-6 w-3/4">
        <CustomInput
          label="Employer Name"
          type="text"
          value={employerName}
          onChange={onEmployerNameChange}
          placeholder="John Doe"
          error={errors.employerName}
        />

        <CustomInput
          label="Website"
          type="url"
          value={website}
          onChange={onWebsiteChange}
          placeholder="https://www.john.com"
          error={errors.website}
        />

        <MultiSelectDropdown
          label="Location"
          options={locationOptions}
          selectedValues={locations}
          onChange={onLocationsChange}
          placeholder="Select locations..."
        />

        <div className="grid grid-cols-2 gap-6">
          <SingleSelectDropdown
            label="Employee"
            options={employeeOptions}
            value={employeeCount}
            onChange={onEmployeeCountChange}
          />
          <SingleSelectDropdown
            label="Industry"
            options={industryOptions}
            value={industry}
            onChange={onIndustryChange}
          />
        </div>

        <DatePicker
          dateFounded={dateFounded}
          onDateChange={onDateFoundedChange}
        />
      </section>
    </div>
  );
};

export default EmployerDetails;