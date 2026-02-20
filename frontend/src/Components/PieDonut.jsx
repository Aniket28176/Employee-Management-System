import React from 'react';

// Simple donut chart using SVG circle stroke dasharray
const PieDonut = ({ present = 0, absent = 0, size = 120, stroke = 24 }) => {
  const total = present + absent || 1;
  const presentRatio = present / total;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const presentLength = circumference * presentRatio;
  const absentLength = circumference - presentLength;

  const center = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`rotate(-90 ${center} ${center})`}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="#10b981"
          strokeWidth={stroke}
          strokeDasharray={`${presentLength} ${absentLength}`}
          strokeLinecap="round"
        />
      </g>
      <text x={center} y={center} textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="600">
        {Math.round((present / total) * 100)}%
      </text>
    </svg>
  );
};

export default PieDonut;
