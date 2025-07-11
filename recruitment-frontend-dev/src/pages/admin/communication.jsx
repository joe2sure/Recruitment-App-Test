// import { useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Plus, Edit3, Send } from "lucide-react";
// import { cn } from "@/lib/utils";

// /**
//  * @typedef {Object} Conversation
//  * @property {string} id
//  * @property {string} name
//  * @property {string} role
//  * @property {string} lastMessage
//  * @property {string} time
//  * @property {'interview' | 'offer' | 'rejected' | 'active'} status
//  * @property {string} avatar
//  */

// /**
//  * @typedef {Object} Message
//  * @property {string} id
//  * @property {string} sender
//  * @property {string} content
//  * @property {string} time
//  * @property {boolean} isSent
//  */

// const conversations = [
//   {
//     id: "1",
//     name: "Eleanor Pena",
//     role: "(Candidate)",
//     lastMessage: "Message him/hengweisun...",
//     time: "Now",
//     status: "interview",
//     avatar:
//       "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
//   },
//   {
//     id: "2",
//     name: "Jane Cooper",
//     role: "(Candidate)",
//     lastMessage: "Message him/hengweisun...",
//     time: "Now",
//     status: "rejected",
//     avatar:
//       "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
//   },
//   {
//     id: "3",
//     name: "Eleanor Pena",
//     role: "(Candidate)",
//     lastMessage: "Message him/hengweisun...",
//     time: "Now",
//     status: "interview",
//     avatar:
//       "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
//   },
//   {
//     id: "4",
//     name: "Jacob Jones",
//     role: "(Candidate)",
//     lastMessage: "Message him/hengweisun...",
//     time: "Now",
//     status: "active",
//     avatar:
//       "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
//   },
//   {
//     id: "5",
//     name: "Eleanor Pena",
//     role: "(Candidate)",
//     lastMessage: "Message him/hengweisun...",
//     time: "Now",
//     status: "interview",
//     avatar:
//       "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
//   },
//   {
//     id: "6",
//     name: "Kristin Watson",
//     role: "(Candidate)",
//     lastMessage: "Message him/hengweisun...",
//     time: "Now",
//     status: "offer",
//     avatar:
//       "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
//   },
//   {
//     id: "7",
//     name: "Wade Warren",
//     role: "(Candidate)",
//     lastMessage: "Message him/hengweisun...",
//     time: "Now",
//     status: "interview",
//     avatar:
//       "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
//   },
// ];

// const messages = [
//   {
//     id: "1",
//     sender: "Eleanor Pena",
//     content: "Can arefhsanghiyux.vxjvxjmanscsgegjodgj",
//     time: "10:30",
//     isSent: false,
//   },
//   {
//     id: "2",
//     sender: "You",
//     content: "arefhsanghiyux.vxjvxjmanscsgegjodgj",
//     time: "10:30",
//     isSent: true,
//   },
//   {
//     id: "3",
//     sender: "Eleanor Pena",
//     content:
//       "arefhsanghiyux.vxjvxjmanscsgegjodgj gfeyfefchqnx.vxjvxjmanscsgegjodgj. arefhsanghiyux.vxjvxjmanscsgegjodgj",
//     time: "10:30",
//     isSent: false,
//   },
// ];

// export default function CommunicationHub() {
//   const [selectedConversation, setSelectedConversation] = useState(
//     conversations[0]
//   );
//   const [messageInput, setMessageInput] = useState("");

//   const getStatusBadge = (status) => {
//     const statusStyles = {
//       interview: "bg-purple-100 text-purple-700 border-purple-200",
//       offer: "bg-yellow-100 text-yellow-700 border-yellow-200",
//       rejected: "bg-red-100 text-red-700 border-red-200",
//       active: "bg-green-100 text-green-700 border-green-200",
//     };

//     return (
//       <Badge
//         variant="outline"
//         className={cn("text-xs px-2 py-1", statusStyles[status] || "")}
//       >
//         {status}
//       </Badge>
//     );
//   };

//   return (
//     <div className="flex h-full bg-gray-50">
//       {/* Left Panel - Conversations */}
//       <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
//         </div>

//         <div className="p-4 border-b border-gray-200">
//           <div className="relative">
//             <Input
//               placeholder="Search candidate..."
//               className="w-full bg-gray-50 border-gray-200 text-sm"
//             />
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {conversations.map((conversation) => (
//             <div
//               key={conversation.id}
//               onClick={() => setSelectedConversation(conversation)}
//               className={cn(
//                 "flex items-start space-x-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors",
//                 selectedConversation.id === conversation.id &&
//                   "bg-purple-50 border-purple-100"
//               )}
//             >
//               <Avatar className="h-10 w-10 mt-1">
//                 <AvatarImage src={conversation.avatar} />
//                 <AvatarFallback>
//                   {conversation.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center justify-between mb-1">
//                   <p className="text-sm font-medium text-gray-900 truncate">
//                     {conversation.name}
//                   </p>
//                   <span className="text-xs text-gray-500">
//                     {conversation.time}
//                   </span>
//                 </div>
//                 <p className="text-xs text-gray-500 mb-1">
//                   {conversation.role}
//                 </p>
//                 <p className="text-xs text-gray-400 truncate mb-2">
//                   {conversation.lastMessage}
//                 </p>
//                 {getStatusBadge(conversation.status)}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Middle Panel - Conversation */}
//       <div className="flex-1 bg-white flex flex-col">
//         <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//           <div className="flex items-center space-x-3">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src={selectedConversation.avatar} />
//               <AvatarFallback>
//                 {selectedConversation.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")}
//               </AvatarFallback>
//             </Avatar>
//             <div>
//               <h3 className="font-medium text-gray-900">
//                 {selectedConversation.name}
//               </h3>
//               <p className="text-sm text-gray-500">Online</p>
//             </div>
//           </div>
//           <Edit3 className="h-5 w-5 text-gray-400" />
//         </div>

//         <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={cn(
//                 "flex items-start space-x-3",
//                 message.isSent && "flex-row-reverse space-x-reverse"
//               )}
//             >
//               <Avatar className="h-8 w-8">
//                 <AvatarImage
//                   src={
//                     message.isSent
//                       ? "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
//                       : selectedConversation.avatar
//                   }
//                 />
//                 <AvatarFallback>
//                   {message.isSent
//                     ? "You"
//                     : selectedConversation.name
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex flex-col max-w-xs">
//                 <div className="flex items-center space-x-2 mb-1">
//                   <span className="text-xs font-medium text-gray-700">
//                     {message.sender}
//                   </span>
//                   <span className="text-xs text-gray-500">{message.time}</span>
//                 </div>
//                 <div
//                   className={cn(
//                     "px-3 py-2 rounded-lg text-sm",
//                     message.isSent
//                       ? "bg-purple-500 text-white rounded-br-sm"
//                       : "bg-purple-100 text-purple-800 rounded-bl-sm"
//                   )}
//                 >
//                   {message.content}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="p-4 border-t border-gray-200 bg-white">
//           <div className="flex flex-wrap gap-2 mb-4">
//             <Badge
//               variant="outline"
//               className="text-xs bg-blue-50 text-blue-700 border-blue-200"
//             >
//               Interview scheduled
//             </Badge>
//             <Badge
//               variant="outline"
//               className="text-xs bg-red-50 text-red-700 border-red-200"
//             >
//               Application rejected
//             </Badge>
//             <Badge
//               variant="outline"
//               className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200"
//             >
//               Offer extended
//             </Badge>
//             <Badge
//               variant="outline"
//               className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200"
//             >
//               Offer extended
//             </Badge>
//           </div>
//           <div className="flex space-x-2">
//             <Input
//               value={messageInput}
//               onChange={(e) => setMessageInput(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1"
//             />
//             <Button
//               size="sm"
//               className="bg-purple-600 hover:bg-purple-700 text-white px-4"
//             >
//               <Send className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Right Panel - User Info */}
//       <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
//         <div className="p-6 text-center border-b border-gray-200">
//           <Avatar className="h-20 w-20 mx-auto mb-4">
//             <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" />
//             <AvatarFallback>UN</AvatarFallback>
//           </Avatar>
//           <h3 className="font-semibold text-gray-900 mb-1">username</h3>
//           <p className="text-sm text-gray-500 mb-3">Candidate</p>
//           <Badge className="bg-green-100 text-green-800 border-green-200">
//             Active Applicant
//           </Badge>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           <div className="p-6">
//             <h4 className="font-medium text-gray-900 mb-4">
//               Contact Information
//             </h4>
//             <div className="space-y-3">
//               <div className="flex items-center text-sm text-gray-600">
//                 <Plus className="h-4 w-4 mr-3 text-gray-400" />
//                 example@gmail.com
//               </div>
//               <div className="flex items-center text-sm text-gray-600">
//                 <Plus className="h-4 w-4 mr-3 text-gray-400" />
//                 (phone number)
//               </div>
//               <div className="flex items-center text-sm text-gray-600">
//                 <Plus className="h-4 w-4 mr-3 text-gray-400" />
//                 Location
//               </div>
//             </div>
//           </div>

//           <div className="p-6 border-t border-gray-200">
//             <h4 className="font-medium text-gray-900 mb-4">
//               Job Application status
//             </h4>
//             <div className="text-sm text-gray-600 mb-2">
//               Application ID: #JobFrontend-0004
//             </div>
//             <div className="text-sm text-gray-600 mb-4">Jobs.pdf</div>
//             <div className="text-sm text-gray-600 mb-4">Status</div>
//             <div className="text-sm text-gray-500 mb-6">
//               Applied on June 15, 2023
//             </div>

//             <h4 className="font-medium text-gray-900 mb-4">Key skills</h4>
//             <div className="flex flex-wrap gap-2">
//               <Badge
//                 variant="outline"
//                 className="text-xs bg-gray-50 text-gray-700 border-gray-200"
//               >
//                 Offer extended
//               </Badge>
//               <Badge
//                 variant="outline"
//                 className="text-xs bg-gray-50 text-gray-700 border-gray-200"
//               >
//                 Offer extended
//               </Badge>
//               <Badge
//                 variant="outline"
//                 className="text-xs bg-gray-50 text-gray-700 border-gray-200"
//               >
//                 Offer extended
//               </Badge>
//               <Badge
//                 variant="outline"
//                 className="text-xs bg-gray-50 text-gray-700 border-gray-200"
//               >
//                 Offer extended
//               </Badge>
//               <Badge
//                 variant="outline"
//                 className="text-xs bg-gray-50 text-gray-700 border-gray-200"
//               >
//                 Offer extended
//               </Badge>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit3, Send } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * @typedef {Object} Conversation
 * @property {string} id
 * @property {string} name
 * @property {string} role
 * @property {string} lastMessage
 * @property {string} time
 * @property {'interview' | 'offer' | 'rejected' | 'active'} status
 * @property {string} avatar
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} sender
 * @property {string} content
 * @property {string} time
 * @property {boolean} isSent
 */

const conversations = [
  {
    id: "1",
    name: "Eleanor Pena",
    role: "(Candidate)",
    lastMessage: "Message him/her...",
    time: "Now",
    status: "interview",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "2",
    name: "Jane Cooper",
    role: "(Candidate)",
    lastMessage: "Message him/her...",
    time: "Now",
    status: "rejected",
    avatar:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "3",
    name: "Jacob Jones",
    role: "(Candidate)",
    lastMessage: "Message him/her...",
    time: "Now",
    status: "active",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "4",
    name: "Kristin Watson",
    role: "(Candidate)",
    lastMessage: "Message him/her...",
    time: "Now",
    status: "offer",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    id: "5",
    name: "Wade Warren",
    role: "(Candidate)",
    lastMessage: "Message him/her...",
    time: "Now",
    status: "interview",
    avatar:
      "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

const messages = [
  {
    id: "1",
    sender: "Eleanor Pena",
    content: "Can erefhsanghiyux.vxjvxjmanscsgegjodgj",
    time: "10:30 am",
    isSent: false,
  },
  {
    id: "2",
    sender: "Annette Black",
    content: "Can erefhsanghiyux.vxjvxjmanscsgegjodgj",
    time: "10:30 am",
    isSent: true,
  },
  {
    id: "3",
    sender: "Eleanor Pena",
    content:
      "erefhsanghiyux.vxjvxjmanscsgegjodgj gfeyfefchqnx.vxjvxjmanscsgegjodgj erefhsanghiyux.vxjvxjmanscsgegjodgj",
    time: "10:30 am",
    isSent: false,
  },
  {
    id: "4",
    sender: "Annette Black",
    content: "Can erefhsanghiyux.vxjvxjmanscsgegjodgj",
    time: "10:30 am",
    isSent: true,
  },
];

export default function CommunicationHub() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [messageInput, setMessageInput] = useState("");

  const getStatusBadge = (status) => {
    const statusStyles = {
      interview: "bg-purple-100 text-purple-700 border-purple-200",
      offer: "bg-yellow-100 text-yellow-700 border-yellow-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
      active: "bg-green-100 text-green-700 border-green-200",
    };

    return (
      <Badge
        variant="outline"
        className={cn("text-xs px-2 py-1", statusStyles[status] || "")}
      >
        {status}
      </Badge>
    );
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Left Panel - Conversations */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Conversation</h2>
        </div>
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Input
              placeholder="Search Candidate..."
              className="w-full bg-gray-50 border-gray-200 text-sm"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={cn(
                "flex items-start space-x-3 p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors",
                selectedConversation.id === conversation.id &&
                  "bg-purple-50 border-purple-100"
              )}
            >
              <Avatar className="h-10 w-10 mt-1">
                <AvatarImage src={conversation.avatar} />
                <AvatarFallback>
                  {conversation.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {conversation.name}
                  </p>
                  <span className="text-xs text-gray-500">
                    {conversation.time}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-1">
                  {conversation.role}
                </p>
                <p className="text-xs text-gray-400 truncate mb-2">
                  {conversation.lastMessage}
                </p>
                {getStatusBadge(conversation.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel - Conversation */}
      <div className="flex-1 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedConversation.avatar} />
              <AvatarFallback>
                {selectedConversation.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-900">
                {selectedConversation.name}
              </h3>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <Edit3 className="h-5 w-5 text-gray-400" />
        </div>
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-3",
                message.isSent && "flex-row-reverse space-x-reverse"
              )}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    message.isSent
                      ? "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                      : selectedConversation.avatar
                  }
                />
                <AvatarFallback>
                  {message.isSent
                    ? "You"
                    : selectedConversation.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-xs">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-medium text-gray-700">
                    {message.sender}
                  </span>
                  <span className="text-xs text-gray-500">{message.time}</span>
                </div>
                <div
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm",
                    message.isSent
                      ? "bg-purple-500 text-white rounded-br-sm"
                      : "bg-purple-100 text-purple-800 rounded-bl-sm"
                  )}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="outline"
              className="text-xs bg-purple-50 text-purple-700 border-purple-200"
            >
              Interview scheduled
            </Badge>
            <Badge
              variant="outline"
              className="text-xs bg-red-50 text-red-700 border-red-200"
            >
              Application rejected
            </Badge>
            <Badge
              variant="outline"
              className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200"
            >
              Offer extended
            </Badge>
            <Badge
              variant="outline"
              className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200"
            >
              Offer extended
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button
              size="sm"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - User Info */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-6 text-center border-b border-gray-200">
          <Avatar className="h-20 w-20 mx-auto mb-4">
            <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-gray-900 mb-1">username</h3>
          <p className="text-sm text-gray-500 mb-3">Candidate</p>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Active Applicant
          </Badge>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <h4 className="font-medium text-gray-900 mb-4">
              Contact Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Plus className="h-4 w-4 mr-3 text-gray-400" />
                example@gmail.com
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Plus className="h-4 w-4 mr-3 text-gray-400" />
                (phone number)
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Plus className="h-4 w-4 mr-3 text-gray-400" />
                Location
              </div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200">
            <h4 className="font-medium text-gray-900 mb-4">
              Job Application status
            </h4>
            <div className="text-sm text-gray-600 mb-2">
              Applied for: #JobFrontend-0004
            </div>
            <div className="text-sm text-gray-600 mb-4">Jobs.pdf</div>
            <div className="text-sm text-gray-600 mb-4">Status</div>
            <div className="text-sm text-gray-500 mb-6">
              Applied on: June 15, 2023
            </div>
            <h4 className="font-medium text-gray-900 mb-4">Key skills</h4>
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="text-xs bg-gray-50 text-gray-700 border-gray-200"
              >
                Offer extended
              </Badge>
              <Badge
                variant="outline"
                className="text-xs bg-gray-50 text-gray-700 border-gray-200"
              >
                Offer extended
              </Badge>
              <Badge
                variant="outline"
                className="text-xs bg-gray-50 text-gray-700 border-gray-200"
              >
                Offer extended
              </Badge>
              <Badge
                variant="outline"
                className="text-xs bg-gray-50 text-gray-700 border-gray-200"
              >
                Offer extended
              </Badge>
              <Badge
                variant="outline"
                className="text-xs bg-gray-50 text-gray-700 border-gray-200"
              >
                Offer extended
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
