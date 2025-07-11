import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { IoImageOutline } from "react-icons/io5";

const BasicInformation = ({ logoFile, onLogoUpload, description, icon, onBasicInfoEdit }) => {
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    onLogoUpload(file);
  };

  return (
    <>
      <section className="mx-10">
        <h3 className="text-lg font-semibold text-black mb-[3px]">
          Basic Information
        </h3>
        <button onClick={onBasicInfoEdit} className="text-[#7C8493] flex items-center gap-3">
          {description} {icon}
        </button>
      </section>

      <hr className="text-[#D6C3E9] my-6" />

      <div className="mx-10 flex gap-6">
        <section className="w-1/4">
          <h3 className="font-semibold mb-1">Employer Logo</h3>
          <h4 className="text-[#7C8493]">
            This image will be shown publicly as company logo.
          </h4>
        </section>
        <div className="flex items-center space-x-4 w-3/4 justify-end">
          {logoFile ? (
            <img
              src={URL.createObjectURL(logoFile)}
              alt="Logo"
              className="w-20 h-20 object-cover rounded"
            />
          ) : (
            <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded">
              <FiEdit2 className="text-gray-400 w-8 h-8" />
            </div>
          )}
          <label className="cursor-pointer px-10 py-5 border-2 border-dashed bg-[#D6C3E9] border-[#9865EE] rounded-lg">
            <div className="text-center flex flex-col items-center">
              <IoImageOutline className="text-3xl text-[#9865EE] mb-2" />
              <h4 className="font-medium text-[#515B6F] text-base mb-1">
                <span className="text-[#9865EE]">Click to replace</span> or
                drag and drop
              </h4>
              <h5 className="font-normal text-[#7C8493] text-base">
                SVG, PNG, JPG or GIF (max. 400 x 400px)
              </h5>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default BasicInformation;