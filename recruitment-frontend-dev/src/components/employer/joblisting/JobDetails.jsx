// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Separator } from "@/components/ui/separator";
// import { Progress } from "@/components/ui/progress";
// import { ArrowLeft, MoreHorizontal } from "lucide-react";

// export default function JobDetails() {
//   return (
//     <div className="mt-2 mb-2">
//       <div className="flex gap-6">
//         {/* Left Section */}
//         <div className="flex flex-col flex-1 bg-white">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-xl font-semibold">Social Media Assistant</h2>
//             <Button variant="outline" size="sm">
//               Edit Job Details
//             </Button>
//           </div>

//           <div className="space-y-4">
//             <Section title="Responsibilities" itemsCount={6} />

//             {/* Who You Are and About this role side by side */}
//             <div className="flex gap-6">
//               <div className="flex-1">
//                 <Section title="Who You Are" itemsCount={4} />
//               </div>
//               <div className="w-80">
//                 <Card>
//                   <CardContent className="pt-6 pb-4 space-y-4">
//                     <div>
//                       <div className="text-sm font-medium mb-1">
//                         About this role
//                       </div>
//                       <Progress value={50} className="h-2" />
//                       <p className="text-sm mt-1">5 applied of 10 capacity</p>
//                     </div>
//                     <Separator />
//                     <div className="text-sm space-y-1">
//                       <p>
//                         <strong>Apply Before:</strong> July 31, 2021
//                       </p>
//                       <p>
//                         <strong>Job Posted On:</strong> July 1, 2021
//                       </p>
//                       <p>
//                         <strong>Job Type:</strong> Full-Time
//                       </p>
//                       <p>
//                         <strong>Salary:</strong> $75,000 - $85,000 USD
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>

//             {/* Nice-to-Haves and Categories side by side */}
//             <div className="flex gap-6">
//               <div className="flex-1">
//                 <div>
//                   <h3 className="font-semibold text-lg mb-2">Nice-To-Haves</h3>
//                   <ul className="space-y-2 pl-1">
//                     <li className="flex items-center gap-2 text-sm">
//                       <Checkbox id="fluent" />
//                       <label htmlFor="fluent">Fluent in English</label>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <Checkbox id="pm" />
//                       <label htmlFor="pm">Project management skills</label>
//                     </li>
//                     <li className="flex items-center gap-2 text-sm">
//                       <Checkbox id="editing" />
//                       <label htmlFor="editing">Copy editing skills</label>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="w-80 space-y-6">
//                 <div>
//                   <h4 className="font-medium mb-2">Categories</h4>
//                   <div className="flex gap-2 flex-wrap">
//                     <Badge variant="secondary">Marketing</Badge>
//                     <Badge variant="secondary">Design</Badge>
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-medium mb-2">Required Skills</h4>
//                   <div className="flex gap-2 flex-wrap">
//                     {[
//                       "Project Management",
//                       "Copywriting",
//                       "English",
//                       "Social Media Marketing",
//                       "Copy Editing",
//                     ].map((skill, i) => (
//                       <Badge key={i} variant="outline">
//                         {skill}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="pt-4">
//             <h3 className="font-semibold text-lg mb-4">Perks & Benefits</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {[
//                 "Full Healthcare",
//                 "Unlimited Vacation",
//                 "Skill Development",
//                 "Commuter Benefits",
//                 "We give back",
//                 "Team Summits",
//                 "Remote Working",
//               ].map((perk, index) => (
//                 <Card key={index} className="h-full">
//                   <CardContent className="pt-4 space-y-2">
//                     <h4 className="font-medium text-base">{perk}</h4>
//                     <p className="text-sm text-muted-foreground">
//                       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                       Nam scelerisque nec.
//                     </p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Section({ title, itemsCount }) {
//   return (
//     <div>
//       <h3 className="font-semibold text-lg mb-2">{title}</h3>
//       <ul className="space-y-2 pl-1">
//         {Array.from({ length: itemsCount }).map((_, i) => (
//           <li key={i} className="flex items-center gap-2 text-sm">
//             <Checkbox id={`${title}-${i}`} />
//             <label htmlFor={`${title}-${i}`}>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
