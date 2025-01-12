// import React from 'react'
// import CircularProgress from '../../CircularProgressBar/CircularProgress'

// type props = {
//   title: string;
//   progress: number;
//   color?: string;
// }

// export const PersonalitiesCircularProgress = ({title, progress, color}: props) => {
//   return (
//     <div className='flex items-center gap-4  p-3 rounded-[8px]'>
//         <CircularProgress progress={progress} color={color} />
//         <div>
//           <p className='text-lg md:text-xl lg:text-2xl text-textprimary '>{title}</p>
          
//         </div>
//       </div>
//   )
// }

// import React from "react";
// import CircularProgress from "../../CircularProgressBar/CircularProgress";

// type Props = {
//   title: string;
//   progress: number;
//   color?: string;
//   bgColor?: string; // Add a prop for background color
// };

// export const PersonalitiesCircularProgress = ({
//   title,
//   progress,
//   color,
//   bgColor,
// }: Props) => {
//   return (
//     <div
//       className={`flex items-center gap-4 p-4 rounded-[8px]`}
//       style={{ backgroundColor: bgColor }} // Apply dynamic background color
//     >
//       <CircularProgress progress={progress} color={color} />
//       <div>
//         <p className="text-lg md:text-xl lg:text-2xl text-textprimary">
//           {title}
//         </p>
//       </div>
//     </div>
//   );
// };


import React from "react";
import CircularProgress from "../chart/CirularProgress/CircularProgressBar";

type Props = {
  title: string;
  progress: number;
  color?: string;
  bgColor?: string; // Add a prop for background color
};

const khmerTranslations: Record<string, string> = {
  "Work-Life Balance": "ការធ្វើអោយជីវិតមានលំនឹង",
  "Financial Stability": "ការធ្វើអោយមានស្ថិរភាពហិរញ្ញវត្ថុ",
  "Creativity and Innovation": "ការច្នៃប្រឌិត",
  "Helping Others": "ការជួយអ្នកដទៃ",
  "Personal Growth": "ការរីកចម្រើនផ្ទាល់ខ្លួន",
  "Recognition and Achievement": "ការទទួលស្គាល់និងសមិទ្ធិផល",
  "Social Impact": "ការចូលចតិ្តការងារសង្គម",
  "Independence and Flexibility": "ឯករាជ្យភាពនិមានភាពបត់បែន",
  "Stability and Security": "ស្ថិរភាព និងសន្តិសុខ",
  "Teamwork and Collaboration": "ការងារជាក្រុម និងកិច្ចសហការ",
  "Leadership and Influence": "ភាពជាអ្នកដឹកនាំ និងឥទ្ធិពល",
};

export const PersonalitiesCircularProgress = ({
  title,
  progress,
  color,
  bgColor,
}: Props) => {
  const khmerDescription = khmerTranslations[title] || ""; // Get Khmer description or empty string

  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-[8px]  border border-slate-50`}
      style={{ backgroundColor: bgColor }} // Apply dynamic background color
    >
      <CircularProgress progress={progress} color={color} />
      <div>
      <p className="text-lg md:text-2xl  text-textprimary">{khmerDescription}</p>
      <p className="text-sm md:text-md font-medium text-secondary">{title}</p>
      </div>
    </div>
  );
};