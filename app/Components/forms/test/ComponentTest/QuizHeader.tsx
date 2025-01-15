import React from 'react'

type props = {
    title: string;
    highlight?: string;
    description?: string; 
    size?: 'md' | 'sm';
    type?: 'quiz' | 'result';
    titleColor?: string;
  };

const QuizHeader = ({ title, highlight, description, size, type = 'quiz' , titleColor = 'text-primary'}: props) => {
  return (
    <div className={` 
        ${size === 'md' ? 'space-y-4 md:space-y-6' : 'space-y-[4px] md:space-y-2' }`}>
        <h1 className={`font-semibold ${type === 'result' ? titleColor : 'text-white'} ${size === 'md' ? 'text-4xl md:text-6xl ' : 'text-xl md:text-2xl'}`}>
        {size === 'md' ? (
        <>
          <span >{title}</span>
          <span className="text-secondary">{highlight}</span>
        </>
      ) : (
        <>{title}</>
      )}
        </h1>
        <p  className={`
          ${type === 'result' ? 'text-textprimary' : 'text-white' 
        } ${size === 'md' ? 'text-xl md:text-2xl' : 'text-based md:text-xl'}`} >{description}</p>
    </div>
  )
}

export default QuizHeader