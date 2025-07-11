import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import JobManagementInput from "./Input";
import JobManagementDropdown from "./Dropdown";
import JobManagementToggle from "./Toggle";
import JobManagementButton from "./Button";

const categories = ["Nursing", "Admin", "Tech"];
const contractTypes = ["Full-time", "Part-time", "Contract"];
const dateFormats = ["DD/MM/YYYY", "MM/DD/YYYY"];
const expLevels = ["Entry", "Mid", "Senior"];
const certs = ["None", "BLS", "ACLS"];
const facilities = ["Linked Employers", "Carewell", "MedGroup"];

const JobManagementAddJobForm = () => {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const enableApproval = watch("enableApproval", false);

  const onSubmit = (data) => {
    console.log(data);
    // stub: send to API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-16 pb-6 pt-0">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-lg font-semibold text-[#1D1D1D]">Job Details</h2>
        <JobManagementButton className={"!py-2.5 !px-5"} type="submit">Post Job</JobManagementButton>
      </div>
      <h3 className="text-[#1D1D1D] mb-3 font-semibold text-lg">Basic Information</h3>
      <JobManagementInput className={"mb-3"} label="Job title" placeholder={"Registered Nurse"} {...register("title")} />
      <JobManagementDropdown
        label="Job Category"
        options={categories}
        className={"mb-3"}
        value={watch("category")}
        onChange={(val) =>
          register("category").onChange({ target: { value: val } })
        }
      />
      <JobManagementDropdown
        label="Contract Type"
        options={contractTypes}
        className={"mb-3"}
        value={watch("contract")}
        onChange={(val) =>
          register("contract").onChange({ target: { value: val } })
        }
      />
      <JobManagementToggle
        label="Enable Profile Approval"
        checked={enableApproval}
        onChange={(val) =>
          register("enableApproval").onChange({ target: { checked: val } })
        }
      />
      <div className="flex flex-col mt-8 mb-8">
        <label className="text-base text-[#121417] font-medium mb-2">Description</label>
        <textarea
          {...register("description")}
          className="border rounded-xl border-[#DBE0E5] p-2 h-36 w-3/6"
        />
      </div>
      <JobManagementDropdown
        label="Facility"
        options={facilities}
        className={"mb-3"}
        value={watch("facility")}
        onChange={(val) =>
          register("facility").onChange({ target: { value: val } })
        }
      />
      <JobManagementInput
        label="Location"
        {...register("location")}
        placeholder="Enter Location"
        className={"mb-3"}
      />
      <JobManagementInput
        label="Salary Range"
        {...register("salary")}
        placeholder="e.g., $60,000 - $80,000"
        className={"mb-3"}
      />
      <JobManagementDropdown
        label="Date Format"
        options={dateFormats}
        className={"mb-3"}
        value={watch("dateFormat")}
        onChange={(val) =>
          register("dateFormat").onChange({ target: { value: val } })
        }
      />
      <JobManagementDropdown
        label="Required Experience Level"
        options={expLevels}
        className={"mb-3"}
        value={watch("experience")}
        onChange={(val) =>
          register("experience").onChange({ target: { value: val } })
        }
      />
      <JobManagementDropdown
        label="Required Certifications"
        options={certs}
        value={watch("certs")}
        onChange={(val) =>
          register("certs").onChange({ target: { value: val } })
        }
      />
      <div className="flex justify-end space-x-6 pt-8">
        <JobManagementButton className={"!py-2.5 !px-5"} variant="secondary" onClick={() => navigate(-1)}>
          Cancel
        </JobManagementButton>
        <JobManagementButton className={"!py-2.5 !px-5 border border-[#46007A] bg-[#F5F5F5] !text-[#46007A]"} onClick={() => console.log("save draft")}>
          Save as Draft
        </JobManagementButton>
      </div>
    </form>
  );
};

export default JobManagementAddJobForm;
