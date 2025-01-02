import React from 'react';
import Image from 'next/image';

type props = {
  instructionLabel: string;
  howItWorksTitle: string;
  howItWorksSteps: string[];
  representedImageTitle: string;
  emojiLabels: string[];
};

export const QuizInstructContainer = ({
  instructionLabel,
  howItWorksTitle,
  howItWorksSteps,
  representedImageTitle,
  emojiLabels,
}: props) => {
  return (

    <div className='grid grid-cols-1 lg:grid-cols-6 lg:gap-4'>
      <div className="grid col-span-4 rounded-xl bg-[#FDFDFB] w-full h-auto mt-10 relative text-textprimary">
        {/* Instruction Label */}
        <span className="absolute left-4 -top-4 inline-flex items-center bg-secondary px-4 py-1 text-md md:text-xl font-semibold text-white rounded-xl">
          {instructionLabel}
        </span>

        {/* How it Works Section */}
        <div className="px-6 pt-8 pb-6 rounded-b-lg">
          <p className="text-xl md:text-2xl font-semibold pb-2">{howItWorksTitle}</p>
          <ul className="space-y-2 text-lg list-disc px-4">
            {howItWorksSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>

      </div>

      <div className="grid col-span-2 rounded-xl bg-[#FDFDFB] w-full h-auto mt-10 relative text-textprimary">
        {/* Instruction Label */}
        <span className="absolute left-4 -top-4 inline-flex items-center bg-secondary px-4 py-1 text-md md:text-xl font-semibold text-white rounded-xl">
          {representedImageTitle}
        </span>

        <div className="px-6 pt-8 pb-6 space-y-2">
          {/* Map Over Static Images with Dynamic Labels */}
          {[
            { src: '/Quiz/emoji/veryDisagree.png', alt: 'Very Disagree' },
            { src: '/Quiz/emoji/disagree.png', alt: 'Disagree' },
            { src: '/Quiz/emoji/neutral.png', alt: 'Neutral' },
            { src: '/Quiz/emoji/agree.png', alt: 'Agree' },
            { src: '/Quiz/emoji/veryAgree.png', alt: 'Very Agree' },
          ].map((emoji, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <Image src={emoji.src} alt={emoji.alt} width={36} height={36} />
              </div>
              <p className="text-md md:text-lg">{emojiLabels[index]}</p>
            </div>
          ))}
        </div>


      </div>
    </div>


  );
};
