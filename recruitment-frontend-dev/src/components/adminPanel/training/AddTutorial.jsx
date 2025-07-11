import React, { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import Dropzone from 'react-dropzone';
import { Button, ButtonText, Faint, H3 } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

const initialData = {
  title: {
    value: '',
    error: false,
    errorMessage: 'Title is required',
  },
  description: {
    value: '',
    error: false,
    errorMessage: 'Description is required',
  },
  tutorialFile: {
    value: null,
    error: false,
    errorMessage: 'Tutorial File is required',
  },
};

const AddTutorial = () => {
  const [formData, setFormData] = useState(initialData);
  const navigate = useNavigate();

  const handleLocationFilesDrop = (acceptedFiles, field) => {
    console.log({ acceptedFiles, field });

    setFormData((prevInfo) => ({
      ...prevInfo,
      ['tutorialFile']: {
        value: acceptedFiles[0],
        error: false,
        errorMessage: '',
      },
    }));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        value: value,
        error: false,
      },
    }));
  };

  const validateForm = () => {
    let isValid = true;

    // Validate required fields
    Object.keys(formData).forEach((key) => {
      const field = formData[key];
      if (!field.value) {
        setFormData((prevData) => ({
          ...prevData,
          [key]: {
            ...field,
            error: true,
            errorMessage: field.errorMessage || 'This field is required',
          },
        }));
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(validateForm());
    console.log(formData);
    // handleNextStep();
  };

  return (
    <div>
      {/* <h1>Add Tutorial</h1> */}
      <header className='flex gap-10 items-center mb-6'>
        <IoArrowBack
          size={32}
          className='cursor-pointer'
          onClick={() => navigate('/admin/training-center/overview')}
        />
        <h3 className='font-sans text-xl font-bold'>Upload Tutorial</h3>
      </header>

      <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='mb-3'>
          {/* {formData.resume.value ? (
                <DocumentBox
                  document={formData.resume.value}
                  handleDelete={() =>
                    setformData((prev) => ({
                      ...prev,
                      resume: {
                        value: null,
                        error: false,
                        errorMessage: '',
                      },
                    }))
                  }
                />
              ) : ( */}
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) =>
              handleLocationFilesDrop(acceptedFiles, 'tutorialFile')
            }
          >
            {({ getRootProps, getInputProps }) => (
              <section {...getRootProps()}>
                <input {...getInputProps()} />
                <div className='border border-gray-400 border-dashed rounded pt-10 flex flex-col items-center justify-center text-center gap-4'>
                  <H3 className='text-xl font-semibold font-sans'>
                    Add or drag file
                  </H3>
                  <Button
                    className={
                      'bg-[#E8EDF2] !py-0 px-5 h-8 rounded-xl cursor-pointer'
                    }
                  >
                    <ButtonText className={'text-sm leading-none'}>
                      Browse
                    </ButtonText>
                  </Button>
                  <Faint className={'font-sans text-[#637587] pb-2'}>
                    Note : can be a document or a video
                  </Faint>
                </div>
              </section>
            )}
          </Dropzone>
          {/* )} */}
        </div>

        <div className='min-w-1/2 max-w-[22rem]'>
          <label className='text-[#313131] font-semibold font-sans pb-2 inline-block'>
            Title{' '}
          </label>
          <input
            type='text'
            placeholder='Add a title'
            value={formData.title.value}
            name='title'
            onChange={handleChange}
            className='w-full border border-[#DBE0E5] px-4 py-3 rounded-xl outline-none text-base'
          />
        </div>

        <div className='min-w-1/2 max-w-[22rem]'>
          <label className='text-[#313131] font-semibold font-sans pb-2 inline-block'>
            Descrition{' '}
          </label>
          <textarea
            value={formData.description.value}
            rows={4}
            name='description'
            onChange={handleChange}
            className='w-full border border-[#DBE0E5] px-4 py-3 rounded-xl outline-none text-base'
          />
        </div>

        <Button
          type='submit'
          onClick={handleSubmit}
          className={
            'w-3/4 md:w-2/3 max-w-[22rem] mx-auto bg-[#46007A] cursor-pointer mt-12'
          }
        >
          <ButtonText className={'text-white'}>Upload</ButtonText>
        </Button>
      </form>
    </div>
  );
};

export default AddTutorial;
