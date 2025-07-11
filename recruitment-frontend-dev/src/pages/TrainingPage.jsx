import careerImg from '@/assets/career-img.png';
import boston from '@/assets/logos/boston_childrens_hospital_logo.svg.png';
import barcelona from '@/assets/logos/clnic_de_barcelona.png';
import hospatic from '@/assets/logos/hospatic.png';
import hospitable from '@/assets/logos/hospitable.png';
import oscar from '@/assets/logos/oscar-health.png';
import united from '@/assets/logos/unitedhealthcare.png';
import vancouver from '@/assets/logos/vancouver-hospital.png';
import training2 from '@/assets/training-2.png';
import training3 from '@/assets/training-3.png';
import training4 from '@/assets/training-4.png';
import hero from '@/assets/training-hero.png';
import Navbar from '@/components/Navbar';
import { Button, ButtonText, Faint, H1, H2, H3 } from '@/components/ui';

const images = [
  boston,
  vancouver,
  hospitable,
  barcelona,
  hospatic,
  oscar,
  united,
];

const trainingList = [
  'Basic Life Support (BLS) Refresher Course',
  'Workplace Readiness for International Nurses',
  'Telehealth Communication Skills',
  'CV & Interview Preparation for Healthcare Professionals',
  'Patient Safety & Infection Control',
];

const careerArray = [
  {
    image: careerImg,
    title: 'Licensing & Registration Guidance',
    description:
      'Step-by-step instructions for registering with NMC, GMC, HCPC, and more',
  },
  {
    image: careerImg,
    title: 'Work Abroad Resources',
    description:
      'Insights on working in the UK, US, Canada, and the Middle East including employer expectations and salary bands.',
  },
  {
    image: careerImg,
    title: 'Relocation & Migration Advice',
    description:
      'Moving abroad for work? We offer support on visa, licensing, and cultural readiness.',
  },
];

const TrainingPage = () => {
  return (
    <>
      <Navbar />
      <section
        className="w-full h-screen flex flex-col justify-end items-center gap-4 pb-28 sm:pb-32"
        style={{ background: `url(${hero}) no-repeat center center` }}
      >
        <H1 className="text-white text-[4rem] w-4/5 text-center font-sans">
          Start Learning, Start Growing
        </H1>
        <p className="text-white text-2xl w-4/5 text-center font-sans">
          Thousands of healthcare professionals have used our platform not just
          to find work but to prepare for it. Invest in your future with Diamond
          Viva.
        </p>
      </section>
      <section className="pt-10 md:pt-16 lg:pt-20 text-center bg-[#EFF4FE]">
        <h4 className="text-lg md:text-xl font-semibold">
          Helping to grow the next generation of healthcare talents
        </h4>
        <div className="relative overflow-hidden pt-6">
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
            style={{
              background:
                'linear-gradient(90deg, rgba(239,250,254,1) 50%, rgba(239,250,254,0.9) 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute -right-2 top-0 h-full w-24 z-10"
            style={{
              background:
                //   "linear-gradient(270deg, rgba(239,250,254,0) 10.17%, #EFFAFE 57.58%)",
                'linear-gradient(270deg, rgba(239,250,254,1) 50%, rgba(239,250,254,0.9) 100%)',
            }}
          />

          {/* Marquee content - duplicated for seamless loop */}
          <div className="flex gap-4 md:gap-7 items-center animate-marquee whitespace-nowrap will-change-transform">
            {/* First set of images */}
            {images.map((src, idx) => (
              <img
                key={`first-${idx}`}
                src={src}
                alt={`marquee-img-${idx}`}
                className="h-fit w-fit flex-shrink-0"
              />
            ))}
            {/* Second set of images for seamless loop */}
            {images.map((src, idx) => (
              <img
                key={`second-${idx}`}
                src={src}
                alt={`marquee-img-${idx}-duplicate`}
                className="h-fit w-fit flex-shrink-0"
              />
            ))}
          </div>

          <style jsx>{`
            @keyframes marquee {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-100% / 2));
              }
            }
            .animate-marquee {
              animation: marquee 20s linear infinite;
            }
          `}</style>
        </div>
      </section>
      <section className="py-16 lg:py-20 bg-[#EFF4FE]">
        <div className="w-5/6 sm:w-9/10 lg:w-5/6 mx-auto grid grid-cols-4 items-center gap-8">
          <div className=" xl:col-span-3 col-span-4 order-2 md:order-1 md:col-span-2 flex flex-col gap-5">
            <H2 className="text-[#46007A] font-bold text-2xl md:text-3xl tracking-tight">
              Boost Your Skills with Our Free Training Center
            </H2>
            <ul className="list-disc pl-4">
              {trainingList?.map((item, index) => (
                <li key={index} className="mb-3">
                  <Faint className="text-[#676767] text-lg md:text-xl">
                    {item}
                  </Faint>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                className="px-8 bg-white text-[#46007A] border border-[#46007A]"
              >
                <ButtonText>Browse Courses</ButtonText>
              </Button>
              <Button size="lg" className="px-8 text-white">
                <ButtonText>Check for Events</ButtonText>
              </Button>
            </div>
          </div>
          <img
            src={training2}
            alt="Medical training"
            className="xl:col-span-1 col-span-4 md:col-span-2 rounded-tl-[8rem] lg:h-[30rem] object-contain mx-auto"
            // width={400}
            // height={460}
          />
        </div>
      </section>
      <section
        className="h-[70vh] flex justify-center items-center"
        style={{ background: `url(${training3}) no-repeat center center` }}
      >
        <H1
          className={
            'text-5xl lg:text-6xl font-extrabold text-white w-2/3 text-center'
          }
        >
          Empowering Your Journey Every Step of the Way
        </H1>
      </section>
      <section className="pt-24 pb-10 bg-[#EFF4FE] ">
        <div className="w-11/12 mx-auto">
          <Faint className="font-bold text-4xl md:text-5xl text-[#676767] mb-5">
            Career Guidance
          </Faint>
          <div className="flex gap-4 overflow-scroll">
            {careerArray.map(({ description, image, title }) => (
              <article
                className="min-w-[70%] sm:min-w-[45%] md:min-w-[35%] flex flex-col gap-2"
                key={title}
              >
                <img src={image} className="w-full" />
                <H3 className="text-2xl md:text-3xl font-bold mt-2">{title}</H3>
                <Faint>{description}</Faint>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section
        className="h-[75vh] flex flex-col justify-center items-center gap-10"
        style={{ background: `url(${training4}) no-repeat center center` }}
      >
        <H1 className={'!text-4xl sm:!text-5xl !font-normal w-2/3 text-center'}>
          Let’s Build the Future of Healthcare Recruitment Together
        </H1>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="lg"
            className="px-8 bg-white text-[#46007A] border border-[#46007A]"
          >
            <ButtonText>Partner With Us</ButtonText>
          </Button>
          <Button size="lg" className="px-8 text-white">
            <ButtonText>Contact Our Team</ButtonText>
          </Button>
        </div>
      </section>
    </>
  );
};

export default TrainingPage;
