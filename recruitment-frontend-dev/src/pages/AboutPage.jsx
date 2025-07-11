import doctorImg1 from '../assets/images/about/doctorImg1.png';
import doctorImg2 from '../assets/images/about/doctorImg2.png';
import doctorImg3 from '../assets/images/about/doctorImg3.png';

const images = [
  'https://images.unsplash.com/photo-1557053964-937650b63311?q=80&w=1994&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1562783912-21ad31ee2a83?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1625138644438-47f3b3c66880?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1577223597229-2a83f97def38?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1575395311793-ad870d50fbd1?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1688998366942-522bf43ebfef?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1562581870-5b61efe35190?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1605152277138-359efd4a6862?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1551150441-3f3828204ef0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1586867026567-b9b63ae58472?q=80&w=1982&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const AboutPage = () => {
  return (
    <div className="font-sans bg-[#EFF4FE]">
      <section className="relative">
        <img src={doctorImg1} alt="" className="w-full h-dvh object-cover" />
        <div className="absolute flex flex-col text-center justify-center top-0 bottom-0 left-0 right-0 text-white mx-auto w-full max-w-4/5 px-4 md:px-8">
          <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-bold leading-tight">
            40 Years Recruitment Industry Expertise
          </h3>
          <h4 className="text-lg md:text-xl lg:text-2xl text-[#EFEFEF] font-semibold mt-3.5 mx-auto max-w-4/5">
            We are professionals with primary experience in healthcare
            recruitment and business administration
          </h4>
        </div>
      </section>
      <section className="mt-10 md:mt-16 lg:mt-20 text-center">
        <h4 className="text-lg md:text-xl font-semibold">
          Helping to grow the next generation of healthcare talents
        </h4>
        <div className="relative overflow-hidden mt-12">
          {/* Left side fade gradient */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10"
            style={{
              background:
                'linear-gradient(90deg, rgba(239,250,254,1) 0%, rgba(239,250,254,0) 100%)',
            }}
          />

          {/* Right side fade gradient */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10"
            style={{
              background:
                //   "linear-gradient(270deg, rgba(239,250,254,0) 10.17%, #EFFAFE 57.58%)",
                'linear-gradient(270deg, rgba(239,250,254,1) 0%, rgba(239,250,254,0) 100%)',
            }}
          />

          {/* Marquee content - duplicated for seamless loop */}
          <div className="flex animate-marquee whitespace-nowrap will-change-transform">
            {/* First set of images */}
            {images.map((src, idx) => (
              <img
                key={`first-${idx}`}
                src={src}
                alt={`marquee-img-${idx}`}
                className="h-24 w-auto inline-block mr-6 rounded-lg shadow-sm flex-shrink-0"
              />
            ))}
            {/* Second set of images for seamless loop */}
            {images.map((src, idx) => (
              <img
                key={`second-${idx}`}
                src={src}
                alt={`marquee-img-${idx}-duplicate`}
                className="h-24 w-auto inline-block mr-6 rounded-lg shadow-sm flex-shrink-0"
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
      <section className="mt-16 md:mt-20 lg:mt-[6.25rem] max-w-4/5 mx-auto flex flex-col gap-12 md:gap-16 lg:gap-24">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <h2 className="w-full md:w-2/6 font-black text-2xl md:text-3xl lg:text-[2.5rem] font-darkerGrotesque leading-tight">
            Who We Are
          </h2>
          <p className="w-full md:w-4/6 text-[#676767] font-normal text-base md:text-lg lg:text-[1.375rem] text-justify">
            Diamond Viva Limited is led by a team of professionals with
            expertise in recruitment, healthcare management, and business
            administration. We specialize in sourcing highly skilled
            professionals across healthcare, IT, engineering, and business
            industries. Our services extend to international education
            consulting, foreign student placements, skilled worker migration,
            and global work placement opportunities.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <h2 className="w-full md:w-2/6 font-black text-2xl md:text-3xl lg:text-[2.5rem] font-darkerGrotesque leading-tight">
            Our Mission
          </h2>
          <p className="w-full md:w-4/6 text-[#676767] font-normal text-base md:text-lg lg:text-[1.375rem] text-justify">
            At Diamond Viva, our mission is to deliver flexible, creative, and
            client-focused recruitment solutions for both skilled and unskilled
            roles. We aim to match organizations with top-tier talent—locally
            and globally—while preparing candidates to meet the specific
            requirements of our clients. We prioritize local recruitment in line
            with national regulations, but also seek global talent from regions
            rich in skilled professionals, ensuring a smooth social and
            professional transition for all involved.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <h2 className="w-full md:w-2/6 font-black text-2xl md:text-3xl lg:text-[2.5rem] font-darkerGrotesque leading-tight">
            Philosophy
          </h2>
          <p className="w-full md:w-4/6 text-[#676767] font-normal text-base md:text-lg lg:text-[1.375rem] text-justify">
            Poor staffing is a significant problem. Our philosophy is to prepare
            candidates to meet the skill set requirements of our clients so as
            to serve our clients with excellent staff as quickly and effectively
            as possible.
          </p>
        </div>
      </section>

      <section className="min-h-screen md:h-dvh max-w-4/5 mx-auto flex items-center py-12 md:py-0">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 w-full">
          <img
            src={doctorImg2}
            alt=""
            className="rounded-tr-[60px] md:rounded-tr-[100px] lg:rounded-tr-[140px] w-full lg:w-[25rem] h-64 md:h-80 lg:h-[36rem] object-top lg:object-center object-cover"
          />
          <section className="w-full">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-anton leading-tight text-[#46007A]">
              OUR
              <br />
              CORE VALUES
            </h1>
            <ul className="mt-6 md:mt-8 flex flex-col gap-3 md:gap-4">
              <li className="text-base md:text-lg lg:text-[1.375rem] font-semibold text-[#1D1D1D]">
                Excellence
                <span className="text-[#676767] font-normal">
                  {' '}
                  - Striving for great outcomes through resourcefulness.
                </span>
              </li>
              <li className="text-base md:text-lg lg:text-[1.375rem] font-semibold text-[#1D1D1D]">
                Collaboration
                <span className="text-[#676767] font-normal">
                  {' '}
                  - Working together to achieve shared goals.
                </span>
              </li>
              <li className="text-base md:text-lg lg:text-[1.375rem] font-semibold text-[#1D1D1D]">
                Nobility
                <span className="text-[#676767] font-normal">
                  {' '}
                  - Acting with consistency and reliability.
                </span>
              </li>
              <li className="text-base md:text-lg lg:text-[1.375rem] font-semibold text-[#1D1D1D]">
                Integrity
                <span className="text-[#676767] font-normal">
                  {' '}
                  - Honoring the values of every individual and organization.
                </span>
              </li>
              <li className="text-base md:text-lg lg:text-[1.375rem] font-semibold text-[#1D1D1D]">
                Goodwill
                <span className="text-[#676767] font-normal">
                  {' '}
                  - Promoting compassion and harmony in every placement.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </section>

      <section className="max-w-4/5 mx-auto flex flex-col gap-16 md:gap-24 lg:gap-36 py-12">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <h2 className="w-full md:w-2/6 font-black text-2xl md:text-3xl lg:text-[2.5rem] font-darkerGrotesque leading-tight">
            Licensing & Compliance Information
          </h2>
          <section className="w-full md:w-4/6">
            <div className="">
              <h4 className="text-base md:text-lg lg:text-[1.375rem] text-black font-semibold">
                For Healthcare Professionals
              </h4>
              <ul className="mt-4 md:mt-5 list-disc space-y-4 md:space-y-6 text-base md:text-lg lg:text-[1.375rem] text-[#676767] marker:text-[#434343]">
                <li className="ml-5 break-words">
                  License validation with relevant medical or regulatory boards
                </li>
                <li className="ml-5 break-words">
                  Verification of education, certifications, and training
                </li>
                <li className="ml-5 break-words">
                  Assistance with registration board exams for regulated
                  professions
                </li>
                <li className="ml-5 break-words">
                  Guidance on maintaining compliance post-placement
                </li>
              </ul>
            </div>
            <div className="mt-10">
              <h4 className="text-base md:text-lg lg:text-[1.375rem] text-black font-semibold">
                For Employers & Educational Institutions
              </h4>
              <ul className="mt-4 md:mt-5 list-disc space-y-4 md:space-y-6 text-base md:text-lg lg:text-[1.375rem] text-[#676767] marker:text-[#434343]">
                <li className="ml-5 break-words">
                  Support lawful hiring of international professionals
                </li>
                <li className="ml-5 break-words">
                  Align with government recruitment frameworks and labor
                  policies
                </li>
                <li className="ml-5 break-words">
                  Ensure ethical standards in visa sponsorship and onboarding
                </li>
                <li className="ml-5 break-words">
                  Guidance on maintaining compliance post-placement
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <h2 className="w-full md:w-2/6 font-black text-2xl md:text-3xl lg:text-[2.5rem] font-darkerGrotesque leading-tight">
            Recruitment Process
          </h2>
          <section className="w-full md:w-4/6">
            <div className="">
              <ul className="list-decimal space-y-4 md:space-y-6 text-base md:text-lg lg:text-[1.375rem] text-[#676767] font-normal marker:font-sans">
                <li className="ml-5 pl-1 break-words">
                  CV review and candidate selection
                </li>
                <li className="ml-5 pl-1 break-words">
                  Scheduling of interviews (onsite, phone, or video)
                </li>
                <li className="ml-5 pl-1 break-words">
                  Offer issuance and acceptance
                </li>
                <li className="ml-5 pl-1 break-words">
                  Licensing exam prep (where applicable)
                </li>
                <li className="ml-5 pl-1 break-words">
                  Final placement and visa processing (for international hires
                  and students)
                </li>
                <li className="ml-5 pl-1 break-words">
                  Employer onboarding support and candidate orientation
                </li>
              </ul>
            </div>
            <h4 className="text-base md:text-lg lg:text-[1.375rem] pt-4 md:pt-6 text-[#1D1D1D] font-semibold">
              P.S: We begin our process after receiving a signed staffing
              agreement, valid for one year and open to unlimited role
              submissions during that time.
            </h4>
          </section>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <h2 className="w-full md:w-2/6 font-black text-2xl md:text-3xl lg:text-[2.5rem] font-darkerGrotesque leading-tight">
            Screening & Placement Commitment
          </h2>
          <section className="w-full md:w-4/6">
            <h4 className="text-base md:text-lg lg:text-[1.375rem] text-[#676767] font-normal">
              We perform in-depth screening and reference checks for all
              candidates. After interviews (telephonic or onsite), we guide both
              parties through final selection, contract signing, and onboarding.
              Our team supports employers with hiring strategy advice and can
              scale up to meet volume needs. <br /> <br /> We're committed to
              affordability and guarantee the most competitive rates in the
              industry. If you find a more cost-effective option, we'll match
              it.
            </h4>
          </section>
        </div>
      </section>

      <section className="mt-12 md:mt-16 lg:mt-[4.375rem] relative">
        {/* <img src={doctorImg3} alt="" className="w-full object-cover " /> */}
        <img
          src={doctorImg3}
          alt=""
          className="w-full h-[60vh] md:h-[70vh] lg:h-auto object-cover "
        />

        <div className="absolute flex flex-col top-0 bottom-0 left-0 right-0 justify-center max-w-4/5 mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-[5.625rem] text-[#E4650D] font-anton leading-none h-8 md:h-10 lg:h-12">
            ”
          </h1>
          <h2 className="font-darkerGrotesque text-3xl md:text-5xl lg:text-7xl font-semibold text-[#F5F5F5] w-full md:w-4/5 lg:w-3/5">
            I recommend them to every healthcare worker I know.
          </h2>

          <section className="mt-8 md:mt-10 lg:mt-12 flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1518882570151-157128e78fa1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-16 md:w-18 lg:w-20 h-16 md:h-18 lg:h-20 object-cover rounded-full"
            />

            <div className="text-white flex flex-col gap-1 md:gap-2">
              <h4 className="text-base md:text-lg lg:text-[1.375rem] leading-tight">
                Steven Oliver
              </h4>
              <h5 className="text-sm md:text-base">Physiotherapist</h5>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
