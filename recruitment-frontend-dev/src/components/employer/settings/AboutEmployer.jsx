import React from "react";
import TextEditor from "./TextEditor";

const AboutEmployer = ({ description, onDescriptionChange, errors }) => {
  return (
    <div className="flex mx-10 gap-16">
      <section className="w-1/4">
        <h3 className="font-semibold mb-1">About Employer</h3>
        <h4 className="text-[#7C8493]">
          Brief description for your company. URLs are hyperlinked.
        </h4>
      </section>
      <section className="w-3/4">
        <TextEditor
          content={description}
          onChange={onDescriptionChange}
          maxLength={500}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </section>
    </div>
  );
};

export default AboutEmployer;