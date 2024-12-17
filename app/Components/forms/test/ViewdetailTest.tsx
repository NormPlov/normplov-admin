'use client';

import React from 'react';
import Image from 'next/image';

// Sample data based on your image
const cognitiveSkills = [
  {
    title: "Complex Problem Solving",
    description: "Developed capacities used to solve novel, ill-defined problems in complex, real-world settings.",
  },
  {
    title: "Critical Thinking",
    description: "Using logic and reasoning to identify the strengths and weaknesses of solutions.",
  },
  {
    title: "Mathematics",
    description: "Using mathematics to solve problems.",
  },
  {
    title: "Science",
    description: "Using scientific rules and methods to solve problems.",
  },
  {
    title: "Learning Strategy",
    description: "Selecting and using methods appropriate for learning or teaching.",
  },
  {
    title: "Monitoring",
    description: "Assessing performance of yourself, individuals, or organizations to improve actions.",
  },
];

const generalFocus = [
  {
    title: "Active Listening",
    description: "Giving full attention to others, taking time to understand points being made.",
  },
  {
    title: "Social Perceptiveness",
    description: "Being aware of others' reactions and understanding why they react as they do.",
  },
  {
    title: "Judgement and Decision Making",
    description: "Considering the relative costs and benefits of actions.",
  },
  {
    title: "Time Management",
    description: "Managing one's own time and the time of others effectively.",
  },
];

const weaknesses = [
  { title: "Writing", description: "Communicating effectively in writing for the needs of the audience." },
  { title: "Speaking", description: "Talking to others to convey information effectively." },
  { title: "Reading Comprehension", description: "Understanding written sentences and work documents." },
];

const careers = [
  {
    title: "Teacher/Trainer",
    description: "Educate individuals and foster critical thinking and personal growth.",
  },
  {
    title: "Social Engineer/Composer",
    description: "Combine technical skills and artistry to deliver impactful solutions.",
  },
];

const ViewTestDetail = () => {
  return (
    <div className="p-8 bg-[#F9FDFD] text-gray-800 font-sans leading-relaxed">
      {/* Title Section */}
      <div className="flex justify-between">
        <div className="mb-8 text-left w-2/3">
          <h2 className="text-3xl text-primary font-bold">Congratulation</h2>
          <p className="mt-4 text-gray-600">
            Complete an analysis of your knowledge and abilities.
            These areas will help you manage your work and daily life.
            This option is the first step in developing a life with an education that is likely to be appropriate.
          </p>
        </div>
        <Image
          width={1000}
          height={1000}
          src={"/assets/result.png"}
          alt={"Result Image"}
          className='w-56 mr-10'
        />
      </div>

      {/* Skills Section */}
      <div>
        <h3 className="text-xl font-semibold text-primary my-4">Cognitive Skills
          <span className='text-textprimary font-normal text-md'> is your domain skill refer to the mental abilities that individuals use to acquire knowledge, understand concepts, reason, and solve problems. These skills are essential for processing information, thinking critically, and making informed decisions. They involve the application of logic, creativity, and critical thinking to various tasks and situations.</span>
        </h3>
        <div className="grid grid-cols-2 gap-6">
          {cognitiveSkills.map((skill, index) => (
            <div key={index} className="p-4 bg-white rounded-md shadow-sm">
              <h4 className="font-semibold text-lg text-primary mb-2">{skill.title}</h4>
              <p className="text-gray-600 text-sm">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* General Focus */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-yellow-500 mb-4">General Focus</h3>
        <div className="grid grid-cols-2 gap-6">
          {generalFocus.map((focus, index) => (
            <div key={index} className="p-4 bg-white rounded-md shadow-sm">
              <h4 className="font-semibold text-lg text-yellow-500 mb-2">{focus.title}</h4>
              <p className="text-gray-600 text-sm">{focus.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weaknesses */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-red-500 mb-4">Weaknesses</h3>
        <div className="space-y-4">
          {weaknesses.map((weakness, index) => (
            <div key={index} className="p-4 bg-red-50 rounded-md border-l-4 border-red-500">
              <h4 className="font-semibold text-lg text-red-600">{weakness.title}</h4>
              <p className="text-gray-600 text-sm">{weakness.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Careers */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-green-500 mb-4">Recommended Careers</h3>
        <div className="grid grid-cols-2 gap-6">
          {careers.map((career, index) => (
            <div key={index} className="p-4 bg-white rounded-md shadow-sm">
              <h4 className="font-semibold text-lg text-green-500 mb-2">{career.title}</h4>
              <p className="text-gray-600 text-sm">{career.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTestDetail;
