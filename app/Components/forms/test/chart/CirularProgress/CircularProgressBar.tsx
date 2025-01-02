import React from 'react';
import './CircularProgress.css';

type props = {
  progress: number;
  color?: string;
}

const CircularProgress = ({ progress, color = '#0BBB8A' }: props) => {
  const radius = 27.5; // Radius of the circle
  const strokeWidth = 10; // Stroke width
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDasharray = circumference; // Full circle length
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray; // Offset based on progress

  return (
    <div className="circle-container">
      <svg className="circle" width="60" height="60">
        <circle
          className="circle-background"
          cx="30"
          cy="30"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="circle-progress"
          cx="30"
          cy="30"
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          style={{ stroke: color }}
        />
      </svg>
      <div className="circle-text">{`${Math.round(progress)}%`}</div>
    </div>
  );
};

export default CircularProgress;