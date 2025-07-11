import { Button, ButtonText } from '@/components/ui';
import { Plus } from 'lucide-react';
import React from 'react';
import { demoTutorialsArray } from './Tutorials';
import { useNavigate } from 'react-router-dom';

const Overview = () => {
  const navigate = useNavigate();

  return (
    <div className='md:w-5/6'>
      <h3 className='font-sans text-lg font-bold mb-5'>Tutorials</h3>
      <Button
        onClick={() => navigate('add-tutorial')}
        className={
          'w-2/3 sm:w-3/4 md:w-2/3 max-w-[30rem] bg-[#46007A] cursor-pointer'
        }
      >
        <Plus color='white' size={22} />
        <ButtonText className={'text-white'}>Upload Tutorial</ButtonText>
      </Button>
      <section className='flex flex-col gap-5 mt-6'>
        {demoTutorialsArray.map(({ title, views }) => (
          <article className='grid grid-cols-5 items-center gap-4'>
            <div className='col-span-1'>
              <div className='w-24 max-w-full min-h-14 rounded-lg bg-[#D9D9D9] ' />
            </div>
            <div className='mr- col-span-3'>
              <h4 className='text-[#121417] font-sans font-medium pr-3'>
                {title}
              </h4>
              <p className='text-[#121417] font-sans text-sm'>{views} views</p>
            </div>
            <Button
              className={
                'bg-[#E8EDF2] !py-0 px-5 h-8 rounded-xl col-span-1 cursor-pointer'
              }
            >
              <ButtonText className={'text-sm leading-none'}>Delete</ButtonText>
            </Button>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Overview;
