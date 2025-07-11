import React, { useState } from "react";
import SocialInput from "@/components/employer/settings/SocialInput";
import CustomInput from "@/components/employer/settings/CustomInput";

const SocialLinksSection = () => {
  const [socialsFormData, setSocialsFormData] = useState({
    instagram: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  });
  const [socialsErrors, setSocialErrors] = useState({});

  // Update a single field and clear its error
  const handleChange = (key, value) => {
    setSocialsFormData((prev) => ({ ...prev, [key]: value }));
    setSocialErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // Validate that instagram/twitter/facebook do NOT contain "http://" or "https://"
  const validate = () => {
    const newErrors = {};
    ["instagram", "twitter", "facebook"].forEach((platform) => {
      if (/https?:\/\//i.test(socialsFormData[platform])) {
        newErrors[platform] = "Only enter your username, not the full link.";
      }
    });
    return newErrors;
  };

  const socialsHandleSubmit = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setSocialErrors(validationErrors);
    } else {
      console.log("Social links submitted:", socialsFormData);
      // (Replace with real API call or parent callback as needed)
    }
  };

  return (
    <div className="">
      <div className="mx-10 flex gap-16">
        <section className="w-1/4 pl-6">
          <h3 className="font-semibold mb-1">Basic Information</h3>
          <h4 className="text-[#7C8493]">
            Add elsewhere links to your company profile. You can add only
            username without full https links.
          </h4>
        </section>

        <div className="flex flex-col gap-6 w-3/4 relative">
          <SocialInput
            label="Instagram"
            prefix="https://www.instagram.com/"
            value={socialsFormData.instagram}
            onChange={(val) => handleChange("instagram", val)}
            placeholder="john"
            error={socialsErrors.instagram}
          />

          <SocialInput
            label="Twitter"
            prefix="https://twitter.com/"
            value={socialsFormData.twitter}
            onChange={(val) => handleChange("twitter", val)}
            placeholder="john"
            error={socialsErrors.twitter}
          />

          <SocialInput
            label="Facebook"
            prefix="https://web.facebook.com/"
            value={socialsFormData.facebook}
            onChange={(val) => handleChange("facebook", val)}
            placeholder="john"
            error={socialsErrors.facebook}
          />

          <CustomInput
            label="LinkedIn"
            value={socialsFormData.linkedin}
            onChange={(val) => handleChange("linkedin", val)}
            placeholder="Enter your LinkedIn address"
            error={socialsErrors.linkedin}
          />

          <CustomInput
            label="YouTube"
            value={socialsFormData.youtube}
            onChange={(val) => handleChange("youtube", val)}
            placeholder="Enter your YouTube address"
            error={socialsErrors.youtube}
          />
        </div>
      </div>

      <hr className="text-[#D6C3E9] my-6" />

      <div className="flex justify-end mx-10 pb-8">
        <button
          type="submit"
          className="px-8 py-3.5 bg-[#46007A] text-white text-lg font-bold rounded-[10px]"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SocialLinksSection;
