import Contact from "@/assets/allApplicants/contact.png"
import Twitter from "@/assets/allApplicants/twitter.png"
import Instagram from "@/assets/allApplicants/instagram.png"
import Website from "@/assets/allApplicants/website.png"
import Phone from "@/assets/allApplicants/phone.png"

const experiences = [
    {
        id: 1,
        title: "Senior UI/UX Product Designer",
        companyname: "Netflix",
        duration: "Aug 2018 - Present - 1 year, Paris",
        jobdesc: "Directly collaborated with CEO and Product team to prototype, design and deliver the UI and UX experience with a lean design process: research, design, test, and iterate.",
    },
    {
        id: 2,
        title: "UI/UX Product Designer",
        companyname: "Google",
        duration: "Aug 2013 - Aug 2018 - 5 years, Paris",
        jobdesc: "Lead the UI design with the accountability of the design system, collaborated with product and development teams on core projects to improve product interfaces and experiences",
    },
    {
        id: 3,
        title: "UI Designer",
        companyname: "Diamondiva",
        duration: "Aug 2012 - jul 2013 - 1 year, Paris",
        jobdesc: "Designed mobile UI applications for Orange R&D departement, BNP Paribas, La Poste, Le Cned.",
    },
    {
        id: 4,
        title: "Senior UI/UX Product Designer",
        companyname: "ABC Group",
        duration: "Sept 2010 - jul 2012 - 2 years, Paris",
        jobdesc: "Designed print and web applications for Pau Brasil, Renault, Le théatre du Mantois, La mairie de Mantes la Ville.",
    },

]


const education = [
    {
        id:1,
        certificate: "Bachelor European in Graphic Design",
        institution: "Yales University",
        duration: "2001 - 2010, Bagnolet"
    },
    {
        id:1,
        certificate: "BTS Communication Visuelle option Multimédia",
        institution: "Unilag",
        duration: "2007 - 2009, Bagnolet"
    },
]

const info = [
    "johndoe@gmail.com", "+44 123 456 7890", "Vernouillet"
]

const industryKnowledge = [
  { name: "Product Design" },
  { name: "User Interface" },
  { name: "User Experience" },
  { name: "Interaction Design" },
  { name: "Wireframing" },
  { name: "Rapid Prototyping" },
  { name: "Design Research" }
];


const tools = [
  { name: "Figma" },
  { name: "Sketch" },
  { name: "Protopie" },
  { name: "Framer" },
  { name: "Invision" },
  { name: "Abstract" },
  { name: "Zeplin" },
  { name: "Google Analytics" },
  { name: "Amplitude" },
  { name: "Fullstory" }
];


const otherSkills = [
    {name:"HTML" },
    {name:"CSS" },
    {name:"jQuery" }
]

const languages = [
    {name: "French", level: "native"},
    {name: "English", level: "professional"}
]

const social = [
    {name: "yoursite.com"},
    {name: "linkedin.com/in/yourname"},
    {name: "dribbble.com/yourname"},
]

const socials = [
    {
        name: "instagram",
        url: "https://instagram.com",
        icon: Instagram,
    },
    {
        name: "contact",
        url: "johndoe@gmail.com",
        icon: Contact,
    },
    {
        name: "Twitter",
        url: "twitter.com/johndoe",
        icon: Twitter,
    },
    {
        name: "Phone",
        url: "+44 123 456 7890",
        icon: Phone,
    },
    {
        name: "Website",
        url: "www.johndoe.com",
        icon: Website,
    },
]

export {socials}
export {experiences, education, info, industryKnowledge, tools, otherSkills, languages, social}
