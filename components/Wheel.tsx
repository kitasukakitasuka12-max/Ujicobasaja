
import React from 'react';
import { PRIZES, COLORS } from '../constants';

interface WheelProps {
  rotation: number;
}

const Wheel: React.FC<WheelProps> = ({ rotation }) => {
  const prizeCount = PRIZES.length;
  const segmentDegrees = 360 / prizeCount;
  const rivetCount = 8;

  const conicGradient = COLORS.map((color, index) => {
    const startAngle = index * segmentDegrees;
    const endAngle = (index + 1) * segmentDegrees;
    return `${color} ${startAngle}deg ${endAngle}deg`;
  }).join(', ');

  return (
    <div className="flex flex-col items-center select-none">
      {/* Container for wheel and stand for correct layering */}
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* The Stand (drawn first to be in the back) */}
        <div className="absolute bottom-[-55px] left-1/2 -translate-x-1/2 w-48 md:w-60 h-24 z-0" style={{ perspective: '300px' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-red-600 to-red-800 rounded-t-lg shadow-lg" style={{ transform: 'rotateX(30deg)' }}>
            <div className="w-full h-4 bg-gradient-to-t from-red-900 to-transparent absolute bottom-0"></div>
          </div>
        </div>

        {/* Wheel Frame and Spinning Part */}
        <div className="relative w-full h-full rounded-full bg-red-600 shadow-[inset_0_0_20px_rgba(0,0,0,0.5),0_10px_15px_rgba(0,0,0,0.3)] border-8 border-red-700 p-3 z-10">
            
            {/* Inner white border */}
            <div className="absolute inset-2 md:inset-3 rounded-full border-4 border-slate-200"></div>

            {/* Rivets */}
            {Array.from({ length: rivetCount }).map((_, index) => {
              const angle = (360 / rivetCount) * index;
              return (
                <div key={index} className="absolute w-full h-full" style={{ transform: `rotate(${angle}deg)` }}>
                    <div className="absolute top-[0px] md:top-[2px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-radial from-amber-300 to-yellow-600 rounded-full shadow-inner"></div>
                </div>
              );
            })}

            {/* Spinning Wheel */}
            <div
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{ transition: 'transform 5000ms cubic-bezier(0.25, 0.1, 0.25, 1)', transform: `rotate(${rotation}deg)` }}
            >
                <div 
                    className="absolute inset-0"
                    style={{ background: `conic-gradient(${conicGradient})` }}
                >
                </div>
                
                {/* Segment Lines */}
                {PRIZES.map((_, index) => {
                    const angle = segmentDegrees * index;
                    return (
                        <div
                            key={`line-${index}`}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1/2 bg-slate-500/50 origin-bottom"
                            style={{ transform: `rotate(${angle}deg)` }}
                        />
                    )
                })}

                {/* Prize Text */}
                {PRIZES.map((prize, index) => {
                  const angle = segmentDegrees * index + segmentDegrees / 2;
                  const textColor = COLORS[index] === '#f5f5f5' ? 'text-gray-800' : 'text-white';
                  return (
                    <div
                      key={index}
                      className="absolute w-full h-full"
                      style={{ transform: `rotate(${angle}deg)` }}
                    >
                      <div className="absolute top-[10%] w-full flex justify-center">
                        <span
                          className={`${textColor} font-bold text-sm md:text-base`}
                          style={{
                            transform: 'rotate(90deg)',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                          }}
                        >
                          {prize}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Center Hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-radial from-yellow-200 via-amber-400 to-yellow-600 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6),0_2px_4px_rgba(255,255,255,0.5)] border-4 border-yellow-700 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-radial from-amber-400 to-yellow-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"></div>
            </div>

        </div>

        {/* Pointer */}
        <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 z-20" style={{ filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.4))' }}>
           <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-amber-400"></div>
           <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[24px] border-t-yellow-300"></div>
        </div>
      </div>
    </div>
  );
};

export default Wheel;
