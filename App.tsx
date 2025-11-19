
import React, { useState } from 'react';
import Wheel from './components/Wheel';
import PrizeModal from './components/PrizeModal';
import { PRIZES } from './constants';

const App: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<string | null>(null);

  const handleSpinClick = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWonPrize(null);

    const prizeCount = PRIZES.length;
    const winningPrizeIndex = Math.floor(Math.random() * prizeCount);
    const segmentDegrees = 360 / prizeCount;
    const spinDuration = 5000; // Harus cocok dengan durasi transisi CSS

    // Hitung sudut yang tepat agar roda mendarat di hadiah
    const prizeAngle = (winningPrizeIndex * segmentDegrees) + (segmentDegrees / 2);
    const randomOffset = (Math.random() - 0.5) * (segmentDegrees * 0.8);
    const targetAngle = prizeAngle + randomOffset;
    
    // Sudut akhir roda harus sedemikian rupa sehingga targetAngle pada roda
    // berada di atas (0 derajat). Ini berarti rotasi roda harus `360 - targetAngle`.
    const destinationAngle = 360 - targetAngle;

    // Hitung rotasi tambahan yang diperlukan dari posisi saat ini.
    // Ini memastikan roda melanjutkan dari tempat terakhir berhenti.
    const currentAngle = rotation % 360;
    const rotationNeeded = (destinationAngle - currentAngle + 360) % 360;
    
    // Tambahkan beberapa putaran penuh untuk efek visual.
    const fullSpins = 5 * 360;
    
    const totalRotation = rotation + rotationNeeded + fullSpins;
    
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(PRIZES[winningPrizeIndex]);
    }, spinDuration);
  };

  const handleCloseModal = () => {
    setWonPrize(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-900 text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      <div className="text-center mb-8 animate-fade-in-down">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2 text-yellow-300" style={{ textShadow: '0 0 15px rgba(253, 224, 71, 0.7)' }}>
          LUCKY SPIN
        </h1>
        <p className="text-lg md:text-xl text-indigo-200">Putar roda dan menangkan hadiahnya!</p>
      </div>
      
      <div className="mb-10">
        <Wheel rotation={rotation} />
      </div>

      <button
        onClick={handleSpinClick}
        disabled={isSpinning}
        className="px-12 py-4 bg-yellow-400 text-gray-900 font-bold text-2xl rounded-full shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isSpinning ? 'MEMUTAR...' : 'PUTAR!'}
      </button>
      
      {wonPrize && <PrizeModal prize={wonPrize} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
