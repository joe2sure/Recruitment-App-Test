import TextEditor from '@/components/employer/settings/TextEditor';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Body, H3 } from '@/components/ui/typography';
import { DollarSign, Stethoscope, Video, Waves, X } from 'lucide-react';
import { useState } from 'react';

// Job Description tab
export const JobDescription = ({ setCurrentStep }) => {
  return (
    <div className="pt-4 ">
      <H3 className={'mb-2'}>Details</H3>
      <Body className="text-gray-500 text-sm mb-6">
        Add the description of the job, responsibilities, who you are, and
        nice-to-haves.
      </Body>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <H3 className={'mb-2'}>Job Descriptions</H3>
            <Body className="text-sm text-gray-500">
              Job titles must be describe one position
            </Body>
          </div>
          <TextEditor placeHolder={'Enter job description'} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <H3 className={'mb-2'}>Responsibilities</H3>
            <Body className="text-sm text-gray-500">
              Outline the core responsibilities of the position
            </Body>
          </div>
          <TextEditor placeHolder={'Enter job responsibilities'} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <H3 className={'mb-2'}>Preferred Qualifications</H3>
            <Body className="text-sm text-gray-500">
              Add your preferred candidates qualifications
            </Body>
          </div>
          <TextEditor placeHolder={'Enter qualifications'} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <H3 className={'mb-2'}>Nice-To-Haves</H3>
            <Body className="text-sm text-gray-500">
              Add nice-to-have skills and qualifications for the role to
              encourage a more diverse set of candidates to apply
            </Body>
          </div>
          <TextEditor placeHolder={'Enter nice-to-haves'} />
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <Button
          onClick={() => setCurrentStep('perks-benifit')}
          className="cursor-pointer text-white"
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

// job Information tab
export const JobInfo = ({ setCurrentStep }) => {
  const [salaryRange, setSalaryRange] = useState([5000, 22000]);
  const [skills, setSkills] = useState([
    'Graphic Design',
    'Communication',
    'Illustrator',
  ]); // can't set yet
  const [jobCategory, setJobCategory] = useState('');
  const [value, setValue] = useState('option1');

  const removeSkill = (index) => {
    const newList = skills.filter((skill, idx) => index != idx);
    setSkills(newList);
  };

  return (
    // p-6 md:p-10, mx-auto
    <div className="pb-6 max-w-4xl ">
      <div className="space-y-6">
        <div className="border-b-1 border-gray-500 py-2">
          <H3 className="text-sm font-semibold">Basic Information</H3>
          <Body className="text-sm text-muted-foreground">
            This information will be displayed publicly
          </Body>
        </div>

        <div>
          <H3>Job Title</H3>
          <Input
            placeholder="e.g. Software Engineer"
            className="mt-1 text-purple-600 border-purple-300"
          />
        </div>

        <RadioGroup
          className="grid  grid-cols-3 md:grid-cols-6 gap-3"
          value={value}
          onValueChange={setValue}
        >
          {['Full-Time', 'Part-Time', 'Remote', 'Internship', 'Contract'].map(
            (option) => (
              <Label key={option} className="flex items-center gap-2">
                <RadioGroupItem value={option} />
                <span className="text-sm">{option}</span>
              </Label>
            )
          )}
        </RadioGroup>

        <div>
          <H3>Salary</H3>
          <div className="flex items-center gap-12 ml-5 mt-6 ">
            <div className="flex items-center border p-2">
              <span className="text-muted-foreground pr-2 border-r">
                <DollarSign size={15} />
              </span>
              <Input
                type="number"
                className="border-0 pl-2 w-20"
                value={salaryRange[0]}
                readOnly
              />
            </div>
            <span>to</span>
            <div className="flex items-center border p-2">
              <span className="text-muted-foreground pr-2 border-r">
                <DollarSign size={15} />
              </span>
              <Input
                type="number"
                className="border-0 pl-2 w-20"
                value={salaryRange[1]}
                readOnly
              />
            </div>
          </div>

          <div className=" mt-7 bg-purple-300">
            <Slider
              defaultValue={salaryRange}
              min={1000}
              max={30000}
              step={1000}
              onValueChange={setSalaryRange}
              className="text-purple-900"
            />
          </div>
        </div>

        <div className="mt-10">
          <Label className="mb-5">Categories</Label>
          <Select onValueChange={(value) => setJobCategory(value)}>
            <SelectTrigger className="mt-1 pr-10">
              <SelectValue placeholder="Select Job Categories" />
            </SelectTrigger>

            <SelectContent className="bg-white text-black border border-gray-300 shadow-lg">
              <SelectItem value="Radiologist">Radiologist </SelectItem>
              <SelectItem value="Surgeon">Surgeon </SelectItem>
              <SelectItem value="Pharmacist">Pharmacist </SelectItem>
              <SelectItem value="Nurse">Nurse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-10">
          <div className="flex gap-3">
            <H3>Required skills</H3>

            <Select
              onValueChange={(value) => {
                if (skills.includes(value)) return;
                setSkills([...skills, value]);
              }}
            >
              <SelectTrigger className="text-purple-600 rounded-none border-purple-300 cursor-pointer">
                <SelectValue placeholder="+ Add Skills" />
              </SelectTrigger>
              <SelectContent className="bg-white text-black border border-gray-300 shadow-lg">
                <SelectItem value="patient-care">Patient Care</SelectItem>
                <SelectItem value="clinical-knowledge">
                  Clinical Knowledge
                </SelectItem>
                <SelectItem value="problem-solving">Problem Solving</SelectItem>
                <SelectItem value="teamwork">Teamwork</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2 mt-7">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-purple-300 text-purple-700 text-sm px-3 py-1 flex items-center gap-1"
              >
                {skill}{' '}
                <button
                  onClick={() => removeSkill(index)}
                  className="ml-1 cursor-pointer"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="text-right">
          <Button
            onClick={() => setCurrentStep('job-desc')}
            className="cursor-pointer text-white"
          >
            Next Step
          </Button>
        </div>
      </div>
    </div>
  );
};

const BenefitCard = ({ icon, title, desc, benefits, onRemove, id }) => {
  const removeBenefit = (index) => {
    const newBenefits = benefits.filter((item, idx) => idx != index);
    onRemove(newBenefits);
  };

  return (
    <Card className="p-6 relative border border-gray-200 hover:shadow-sm transition-shadow">
      <button
        onClick={() => removeBenefit(id)}
        className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded"
      >
        <X className="w-4 h-4 text-gray-400 cursor-pointer" />
      </button>
      <div className="space-y-4">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">{title}</h4>
          <Body className="text-sm text-gray-600 leading-relaxed">{desc}</Body>
        </div>
      </div>
    </Card>
  );
};

// Basic information card
export const BasicInformation = () => {
  const listOfBenifits = [
    {
      id: 'full-healthcare',
      icon: <Stethoscope className="w-6 h-6 text-purple-600" />,
      title: 'Full Healthcare',
      description:
        'We believe in thriving communities and that starts with our team being happy and healthy.',
    },
    {
      id: 'unlimited-vacation',
      icon: <Waves className="w-6 h-6 text-purple-600" />,
      title: 'Unlimited Vacation',
      description:
        'We believe you should have a flexible schedule that makes space for family, wellness, and fun.',
    },
    {
      id: 'skill-development',
      icon: <Video className="w-6 h-6 text-purple-600" />,
      title: 'Skill Development',
      description:
        "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
    },
  ];

  const [benefits, setBenefits] = useState(listOfBenifits);
  const addBenefit = (id) => {
    let newBenefit = listOfBenifits.find((item) => item.id === id);
    if (benefits.some((b) => b.id === newBenefit.id)) return;

    const newBenefitsList = [...benefits, newBenefit];
    setBenefits(newBenefitsList);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-2 border-b pb-3">
        <H3>Basic Information</H3>
        <Body className="text-gray-600">
          List out your top perks and benefits.
        </Body>
      </div>

      <div className="space-y-6 ">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
          <div className="space-y-2">
            <H3 className="text-lg font-medium text-gray-900">
              Perks and Benefits
            </H3>
            <Body className="text-gray-600 max-w-xs">
              Encourage more people to apply by sharing the attractive rewards
              and benefits you offer your employees
            </Body>
          </div>

          <div>
            <div className="mb-5">
              <Select onValueChange={addBenefit}>
                <SelectTrigger className="text-purple-600 rounded-none border-purple-300 cursor-pointer">
                  <SelectValue placeholder="+ Add Benefit" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black border border-gray-300 shadow-lg">
                  <SelectItem value="full-healthcare">
                    Full Healthcare
                  </SelectItem>
                  <SelectItem value="unlimited-vacation">
                    Unlimited Vacation
                  </SelectItem>
                  <SelectItem value="skill-development">
                    Skill Development
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  icon={benefit.icon}
                  title={benefit.title}
                  desc={benefit.description}
                  benefits={benefits}
                  onRemove={setBenefits}
                  id={index}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button className="text-white cursor-pointer">Do a Review</Button>
        </div>
      </div>
    </div>
  );
};
