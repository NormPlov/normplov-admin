'use client';

import React from 'react';
import { useParams } from 'next/navigation';

// Import Components
import { QuizResultIntroContainer } from './ComponentTest/QuizResultIntrolContainer';
import { PersonalityResultComponent } from './resultType/PersonalityResultComponent';


// Import JSON data
import personalityJson from '@/app/json/personalityKh.json';
import skillJson from '@/app/json/skillKh.json';
import interestJson from '@/app/json/interestKh.json';
import valueJson from '@/app/json/valueKh.json';
import learningStyleJson from '@/app/json/learningStyleKh.json';
import allTestJson from '@/app/json/allTest.json';
import { LearningStyleResultComponent } from './resultType/LearningStyle';
import { SkillResultComponent } from './resultType/SkillResult';
import { InterestResultComponent } from './resultType/IntrestResult';
import { ValueResultComponent } from './resultType/ValueResult';

type IntroKh = {
    title: string;
    highlight: string;
    description: string;
};

type Recommendation = {
    jobTitle: string;
    jobdesc: string;
    majors: string[]; // Array of related majors
    unis: string[];   // Array of related universities
};

type QuizData = {
    introKh: IntroKh;              // Introductory data for the result
    Recommendation: Recommendation; // Career recommendations
};

const resultDataMap: Record<string, QuizData> = {
    'Personality': personalityJson,
    'Skills': skillJson,
    'Interests': interestJson,
    'Values': valueJson,
    'LearningStyle': learningStyleJson,
    'all': allTestJson
};

export default function ResultDynamicComponent() {
    const params = useParams();

    // Normalize the values
    const resultType = Array.isArray(params.type) ? params.type[0] : params.type;
    const uuid = Array.isArray(params.uuid) ? params.uuid[0] : params.uuid;

    console.log("uuid in dynamic component:", uuid)
    console.log("result type in dynamic component:", resultType)

    // Handle invalid or missing parameters
    if (!resultType || !uuid) {
        return <p>Loading...</p>;
    }

    // Ensure resultType is valid
    if (!resultType || Array.isArray(resultType)) {
        return <p>Invalid result type</p>;
    }

    const resultData = resultDataMap[resultType];
console.log("result data:", resultData)
    // Handle invalid result types
    if (!resultData) {
        return (
            <div className="w-full text-center py-10">
                <h1 className="text-2xl font-bold">Result Not Found</h1>
                <p>The test result you are looking for does not exist.</p>
            </div>
        );
    }

    const { introKh } = resultData;

    const renderResultContent = () => {
        switch (resultType) {
            case 'Personality':
                return (
                    <div>
                        <PersonalityResultComponent />
                    </div>
                );
            case 'Skills':
                return (
                    <div>
                        <SkillResultComponent />
                    </div>
                );
            case 'Interests':
                return (
                    <div>
                        <InterestResultComponent />
                    </div>
                );
            case 'Values':
                return (
                    <div>
                        <ValueResultComponent />
                    </div>
                );
            case 'LearningStyle':
                return (
                    <div>
                        <LearningStyleResultComponent />

                    </div>
                    // 
                );
            default:
                return <p>Unknown result type</p>;
        }
    };

    return (
        <div className='w-full '>

            {/* Introduction container */}
            <QuizResultIntroContainer
                title={introKh.title}
                highlight={introKh.highlight}
                description={introKh.description}
                size="md"
                type="result"
            />

            <div >
                {renderResultContent()}
            </div>

        </div>
    );

}
