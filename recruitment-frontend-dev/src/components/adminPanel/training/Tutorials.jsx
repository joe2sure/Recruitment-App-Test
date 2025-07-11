import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export const demoTutorialsArray = [
  {
    title: 'How to write a job description',
    duration: '5 min',
    views: '1.2k',
    type: 'Video',
    watched: 40,
  },
  {
    title: 'How to conduct an interview',
    duration: '6 min',
    views: '1.8k',
    type: 'Video',
    watched: 60,
  },
  {
    title: 'How to onboard a new employee',
    duration: '4 min',
    views: '1.1k',
    type: 'Document',
    watched: 30,
  },
  {
    title: 'How to use Talent Hub',
    duration: '10 min',
    views: '2.3k',
    type: 'Video',
    watched: 80,
  },
  {
    title: 'How to use Google Docs',
    duration: '3 min',
    views: '0.7k',
    type: 'Document',
    watched: 20,
  },
];

const Tutorials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTutorials, setFilteredTutorials] = useState([
    ...demoTutorialsArray,
    ...demoTutorialsArray,
  ]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredTutorials([...demoTutorialsArray, ...demoTutorialsArray]);
    } else {
      const filtered = [...demoTutorialsArray, ...demoTutorialsArray].filter(
        (tut) => tut.title.includes(searchTerm.toLowerCase())
      );
      setFilteredTutorials(filtered);
    }
  }, [searchTerm]);

  return (
    <div>
      <div className='relative mb-12'>
        <Search
          className='absolute left-3 top-1/2 -translate-y-1/2 text-[#D6C3E9]'
          size={18}
        />
        <Input
          className='bg-white pl-10 pr-3 placeholder:text-sm !outline-none'
          placeholder={'Search for a Tutorial'}
          type={'search'}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-5 mb-7'>
        {filteredTutorials.map(({ duration, title, views }, i) => (
          <article key={title + i}>
            <div className='w-full min-h-40 rounded-lg bg-[#D9D9D9] mb-2.5' />
            <h4 className='text-[#0D141C] font-sans font-medium'>{title}</h4>
            <p className='text-[#000000] text-sm'>
              {duration} min • {views} views
            </p>
          </article>
        ))}
      </div>
      <section>
        <h3 className='font-sans text-lg font-bold mb-3'>Tutorials</h3>
        <div className='border border-gray-400 rounded-xl overflow-hidden mb-6'>
          <Table className='bg-[#E5E8EB]/70 md:table-fixed'>
            <TableHeader>
              <TableRow>
                <TableHead className='md:pl-4 '>Title</TableHead>
                <TableHead className='text-center'>Type</TableHead>
                <TableHead className='md:pl-[3%]'>Length</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Watched</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoTutorialsArray.map(
                ({ duration, title, type, views, watched }, index) => (
                  <TableRow key={index} className={'overflow-scroll'}>
                    <TableCell
                      className={
                        'whitespace-break-spaces md:pr-6 py-2.5 md:pl-4 w-3/9 md:w-1/5'
                      }
                    >
                      {title}
                    </TableCell>
                    <TableCell className='text-center w-2/9 md:w-1/5'>
                      {type}
                    </TableCell>
                    <TableCell className='md:pl-[3%] w-1/9 md:w-1/5'>
                      {duration}
                    </TableCell>
                    <TableCell className='w-1/9 md:w-1/5'>{views}</TableCell>
                    <TableCell className='w-2/9 md:w-1/5 py-2.5'>
                      <div className='flex items-center sm:flex-row flex-col-reverse gap-2 sm:gap-3'>
                        <div className='relative w-full min-w-20 max-w-24 h-1 bg-[#D1DBE5] rounded'>
                          <div
                            className='absolute left-0 top-0 h-1 bg-[#46007A] rounded'
                            style={{ width: `${watched}%` }}
                          />
                        </div>
                        <span className='text-sm'>{watched}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
};

export default Tutorials;
