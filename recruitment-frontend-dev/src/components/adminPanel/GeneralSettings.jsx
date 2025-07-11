import React, { useState } from 'react';
import { Button, ButtonText } from '../ui';
import { Link } from 'react-router-dom';
import { Switch } from '@headlessui/react';

const initialData = {
  platformName: 'Diamondviva',
  logo: null,
  language: 'English',
  timezone: 'UTC+1 - WAT',
  dateFormat: 'DD/MM/YYYY',
  currency: 'NGN',
  defaultUserRole: 'Candidate',
  enableProfileApproval: true,
  requireEmailVerification: true,
  passwordStrengthRule: 'Medium',
};

const GeneralSettings = () => {
  const [settingsData, setSettingsData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value, isChecker } = e.target;
    if (isChecker) {
      setSettingsData((prev) => ({
        ...prev,
        [name]: !settingsData[name],
      }));
    } else {
      setSettingsData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(settingsData);
  };

  return (
    <form
      action=''
      className='grid grid-cols-1 md:grid-cols-4 md:gap-y-6 gap-10 lg:gap-x-16'
      onSubmit={handleSubmit}
    >
      <div className='md:col-span-3 flex flex-col gap-3 border-b border-b-gray-400 pb-6'>
        <h3 className='font-sans text-lg font-bold mb-1'>Platform Identity</h3>
        <div className='flex gap-10 sm:gap-14 md:gap-20 items-center'>
          <label className='text-[#3a3a3a] text-sm sm:text-base font-sans w-30'>
            Platform Name:
          </label>
          <input
            type='text'
            placeholder='Platform Name here'
            value={settingsData.platformName}
            name='platformName'
            onChange={handleChange}
            className='w-3/5 md:w-72 border border-black px-2.5 py-1.5 outline-none text-sm text-[#454648]'
          />
        </div>

        <div className='flex gap-10 sm:gap-14 md:gap-20 items-center'>
          <label className='text-[#3a3a3a] text-sm sm:text-base font-sans w-30 text-nowrap'>
            Logo Upload:
          </label>
          <button
            className={
              'border-[#46007A] border rounded-none bg-transparent w-3/5 md:w-fit md:px-6 py-1.5 cursor-pointer'
            }
          >
            <ButtonText className={'text-sm font-sans text-[#46007A]'}>
              Upload Image
            </ButtonText>
          </button>
        </div>

        <div className='flex justify-between sm:gap-12 md:justify-normal md:gap-20 items-center'>
          <label className='text-[#3a3a3a] text-sm sm:text-base font-sans w-30'>
            Support Email:
          </label>
          <Link to='mailto:help@diamondviva.com'>
            <Button
              asChild
              variant={'outline'}
              className={'border-[#000000] rounded-none px-3'}
            >
              <ButtonText
                className={
                  'text-sm font-sans text-[#454648] font-normal text-wrap '
                }
              >
                help@diamondviva.com
              </ButtonText>
            </Button>
          </Link>
        </div>
      </div>

      <div className='md:col-span-2 flex flex-col gap-3 lg:pr-8 border-b border-b-gray-400 pb-6 md:border-0 md:pb-0'>
        <h3 className='font-sans text-lg font-bold mb-1'>Localization</h3>

        <div className='flex justify-between items-center w-full'>
          <label className='text-[#3a3a3a] text-sm sm:text-base font-sans w-40'>
            Default Language:
          </label>
          <select
            name='language'
            value={settingsData.language}
            onChange={handleChange}
            className='w-36 border border-black px-2.5 py-1.5 outline-none text-sm text-[#454648]'
          >
            {['English', 'French', 'Spanish', 'Italian', 'Arabic'].map(
              (lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              )
            )}
          </select>
        </div>

        <div className='flex justify-between items-center w-full'>
          <label className='text-[#3a3a3a] text-sm sm:text-base font-sans w-40'>
            Timezone:
          </label>
          <select
            name='timezone'
            value={settingsData.timezone}
            onChange={handleChange}
            className='w-36 border border-black px-2.5 py-1.5 outline-none text-sm text-[#454648]'
          >
            {[
              'UTC+01 - WAT',
              'UTC+02 - WAT',
              'UTC+03 - WAT',
              'UTC-01 - WAT',
              'UTC-02 - WAT',
              'UTC-03 - WAT',
            ].map((zone) => (
              <option KEY={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>

        <div className='flex justify-between items-center w-full'>
          <label className='text-[#3a3a3a] text-sm sm:text-base font-sans w-40'>
            Date Format:
          </label>
          <select
            name='dateFormat'
            value={settingsData.dateFormat}
            onChange={handleChange}
            className='w-36 border border-black px-2.5 py-1.5 outline-none text-sm text-[#454648]'
          >
            {['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD'].map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>

        <div className='flex justify-between items-center w-full'>
          <label className='text-[#3a3a3a] text-sm sm:text-base font-sans w-36'>
            Currency Format:
          </label>
          <select
            name='currency'
            value={settingsData.currency}
            onChange={handleChange}
            className='w-36 border border-black px-2.5 py-1.5 outline-none text-sm text-[#454648]'
          >
            {['NGN', 'USD', 'GBP', 'EUR', 'CAD', 'JPY', 'CHF'].map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='md:col-span-2 flex flex-col gap-3 lg:pr-10'>
        <h3 className='font-sans text-lg font-bold mb-1'>User Preferences</h3>

        <div className='flex justify-between items-center w-full'>
          <label className='text-[#3a3a3a] sm:text-base text-sm font-sans w-52'>
            Default User Role:
          </label>
          <select
            name='defaultUserRole'
            value={settingsData.defaultUserRole}
            onChange={handleChange}
            className='w-32 md:w-28 lg:w-32 border border-black px-2.5 py-1.5 outline-none text-sm text-[#454648]'
          >
            {['Admin', 'Candidate', 'Employer'].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className='flex justify-between items-center w-full'>
          <label className='text-[#3a3a3a] sm:text-base text-sm font-sans w-52'>
            Enable Profile Approval:
          </label>
          <div className='w-32 md:w-28 lg:w-32'>
            <Switch
              checked={settingsData.enableProfileApproval}
              onChange={() =>
                handleChange({
                  target: {
                    name: 'enableProfileApproval',
                    isChecker: true,
                  },
                })
              }
              name='enableProfileApproval'
              className={`${
                settingsData.enableProfileApproval
                  ? 'bg-[#46007A]'
                  : 'bg-gray-300'
              } relative inline-flex h-6 w-14 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  settingsData.enableProfileApproval
                    ? 'translate-x-8'
                    : 'translate-x-1'
                } inline-block h-5 w-5 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>

        <div className='flex justify-between items-center w-full'>
          <label className='text-[#3a3a3a] sm:text-base text-sm font-sans w-52'>
            Require Email Verification:
          </label>
          <div className='w-32 md:w-28 lg:w-32'>
            <Switch
              name='requireEmailVerification'
              checked={settingsData.requireEmailVerification}
              onChange={() =>
                handleChange({
                  target: {
                    name: 'requireEmailVerification',
                    isChecker: true,
                  },
                })
              }
              className={`${
                settingsData.requireEmailVerification
                  ? 'bg-[#46007A]'
                  : 'bg-gray-300'
              } relative inline-flex h-6 w-14 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  settingsData.requireEmailVerification
                    ? 'translate-x-8'
                    : 'translate-x-1'
                } inline-block h-5 w-5 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>

        <div className='flex justify-between items-center w-full'>
          <label className='text-[#3a3a3a] sm:text-base text-sm font-sans w-52'>
            Password Strength Rule:
          </label>
          <select
            name='passwordStrengthRule'
            value={settingsData.passwordStrengthRule}
            onChange={handleChange}
            className='w-32 md:w-28 lg:w-32 border border-black px-2.5 py-1.5 outline-none text-sm text-[#454648]'
          >
            {['Medium', 'Strong', 'Weak'].map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='md:col-span-4 flex mt-12'>
        <Button
          type='submit'
          onClick={handleSubmit}
          className={'mx-auto bg-[#46007A] cursor-pointer rounded-none px-5'}
        >
          <ButtonText className={'text-white'}>Save Changes</ButtonText>
        </Button>
      </div>
    </form>
  );
};

export default GeneralSettings;
