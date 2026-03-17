import React, { useEffect, useRef, useState } from 'react';

export type Emotion = 'neutral' | 'happy' | 'sad' | 'angry' | 'surprised' | 'love' | 'sleepy' | 'confused';

interface SarahFaceProps {
  emotion: Emotion;
  isTalking: boolean;
}

const SarahFace: React.FC<SarahFaceProps> = ({ emotion, isTalking }) => {
  const [mouthD, setMouthD] = useState('M 130 220 Q 150 230 170 220');
  const [leftEyebrowD, setLeftEyebrowD] = useState('M 80 110 Q 100 100 120 110');
  const [rightEyebrowD, setRightEyebrowD] = useState('M 180 110 Q 200 100 220 110');
  const [eyeScaleY, setEyeScaleY] = useState(1);
  const [pupilY, setPupilY] = useState(140);
  const [pupilXOffset, setPupilXOffset] = useState(0);
  const [pupilYOffset, setPupilYOffset] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [teethOpacity, setTeethOpacity] = useState(0);
  const [blushOpacity, setBlushOpacity] = useState(0);
  const [tearOpacity, setTearOpacity] = useState(0);
  const [angerOpacity, setAngerOpacity] = useState(0);
  const [animationClass, setAnimationClass] = useState('floating');
  const [isAsymmetric, setIsAsymmetric] = useState(false);
  const [isHeartEyes, setIsHeartEyes] = useState(false);

  const emotions: Record<Emotion, any> = {
    neutral: {
      mouth: 'M 130 220 Q 150 230 170 220',
      leftEyebrow: 'M 80 110 Q 100 105 120 110',
      rightEyebrow: 'M 180 110 Q 200 105 220 110',
      eyeScaleY: 1,
      pupilY: 140,
      teethOpacity: 0,
      blushOpacity: 0.1,
      tearOpacity: 0,
      angerOpacity: 0,
      animation: 'floating'
    },
    happy: {
      mouth: 'M 120 215 Q 150 250 180 215',
      leftEyebrow: 'M 80 105 Q 100 95 120 105',
      rightEyebrow: 'M 180 105 Q 200 95 220 105',
      eyeScaleY: 0.8,
      pupilY: 142,
      teethOpacity: 0.8,
      blushOpacity: 0.6,
      tearOpacity: 0,
      angerOpacity: 0,
      animation: 'happy-bounce'
    },
    sad: {
      mouth: 'M 130 235 Q 150 215 170 235',
      leftEyebrow: 'M 85 100 Q 105 115 125 105',
      rightEyebrow: 'M 175 105 Q 195 115 215 100',
      eyeScaleY: 0.7,
      pupilY: 145,
      teethOpacity: 0,
      blushOpacity: 0.1,
      tearOpacity: 0.8,
      angerOpacity: 0,
      animation: 'floating'
    },
    angry: {
      mouth: 'M 130 230 Q 150 220 170 230',
      leftEyebrow: 'M 80 120 Q 100 100 125 115',
      rightEyebrow: 'M 175 115 Q 200 100 220 120',
      eyeScaleY: 0.7,
      pupilY: 140,
      teethOpacity: 0,
      blushOpacity: 0,
      tearOpacity: 0,
      angerOpacity: 1,
      animation: 'angry-shake'
    },
    surprised: {
      mouth: 'M 140 220 Q 150 250 160 220 Q 150 250 140 220',
      leftEyebrow: 'M 80 90 Q 100 80 120 90',
      rightEyebrow: 'M 180 90 Q 200 80 220 90',
      eyeScaleY: 1.3,
      pupilY: 138,
      teethOpacity: 0,
      blushOpacity: 0.2,
      tearOpacity: 0,
      angerOpacity: 0,
      animation: 'floating'
    },
    love: {
      mouth: 'M 125 215 Q 150 245 175 215',
      leftEyebrow: 'M 80 105 Q 100 98 120 105',
      rightEyebrow: 'M 180 105 Q 200 98 220 105',
      eyeScaleY: 0.9,
      pupilY: 140,
      teethOpacity: 0.6,
      blushOpacity: 0.8,
      tearOpacity: 0,
      angerOpacity: 0,
      animation: 'happy-bounce',
      heartEyes: true
    },
    sleepy: {
      mouth: 'M 140 225 Q 150 235 160 225',
      leftEyebrow: 'M 80 115 Q 100 120 120 115',
      rightEyebrow: 'M 180 115 Q 200 120 220 115',
      eyeScaleY: 0.2,
      pupilY: 145,
      teethOpacity: 0,
      blushOpacity: 0.3,
      tearOpacity: 0,
      angerOpacity: 0,
      animation: 'floating'
    },
    confused: {
      mouth: 'M 135 225 Q 150 230 165 220',
      leftEyebrow: 'M 80 115 Q 100 100 120 110',
      rightEyebrow: 'M 180 100 Q 200 115 220 105',
      eyeScaleY: 1,
      pupilY: 138,
      teethOpacity: 0,
      blushOpacity: 0.1,
      tearOpacity: 0,
      angerOpacity: 0,
      animation: 'floating',
      asymmetricEyes: true
    }
  };

  useEffect(() => {
    const preset = emotions[emotion] || emotions.neutral;
    setMouthD(preset.mouth);
    setLeftEyebrowD(preset.leftEyebrow);
    setRightEyebrowD(preset.rightEyebrow);
    setEyeScaleY(preset.eyeScaleY);
    setPupilY(preset.pupilY);
    setTeethOpacity(preset.teethOpacity);
    setBlushOpacity(preset.blushOpacity);
    setTearOpacity(preset.tearOpacity);
    setAngerOpacity(preset.angerOpacity);
    setAnimationClass(preset.animation);
    setIsAsymmetric(!!preset.asymmetricEyes);
    setIsHeartEyes(!!preset.heartEyes);
  }, [emotion]);

  // Blinking logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (emotion !== 'sleepy') {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 4000 + Math.random() * 3000);

    return () => clearInterval(blinkInterval);
  }, [emotion]);

  // Eye movement logic when talking
  useEffect(() => {
    let movementInterval: NodeJS.Timeout;
    if (isTalking) {
      movementInterval = setInterval(() => {
        setPupilXOffset((Math.random() - 0.5) * 6);
        setPupilYOffset((Math.random() - 0.5) * 4);
      }, 800);
    } else {
      setPupilXOffset(0);
      setPupilYOffset(0);
    }
    return () => clearInterval(movementInterval);
  }, [isTalking]);

  return (
    <div className={`face-container ${animationClass} transition-all duration-500`}>
      <svg width="200" height="200" viewBox="0 0 300 300">
        <defs>
          <radialGradient id="faceGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FFE4D1" />
            <stop offset="100%" stopColor="#FFD1B3" />
          </radialGradient>
          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#634133" />
            <stop offset="100%" stopColor="#4A3127" />
          </linearGradient>
        </defs>

        {/* Back Hair */}
        <path d="M 50 150 Q 50 50 150 50 Q 250 50 250 150 L 250 250 Q 150 270 50 250 Z" fill="url(#hairGradient)" />

        {/* Face shape */}
        <path d="M 70 150 Q 70 80 150 80 Q 230 80 230 150 Q 230 240 150 240 Q 70 240 70 150" fill="url(#faceGradient)" />
        
        {/* Front Hair / Bangs */}
        <path d="M 70 120 Q 100 80 150 90 Q 200 80 230 120 Q 210 100 150 110 Q 90 100 70 120" fill="#4A3127" />

        {/* Eyebrows */}
        <path d={leftEyebrowD} fill="none" stroke="#4A3127" strokeWidth="3" strokeLinecap="round" className="transition-all duration-300" />
        <path d={rightEyebrowD} fill="none" stroke="#4A3127" strokeWidth="3" strokeLinecap="round" className="transition-all duration-300" />
        
        {/* Eyes */}
        <g transform={`scale(1, ${isBlinking ? 0.1 : (isAsymmetric ? eyeScaleY * 1.1 : eyeScaleY)})`} style={{ transformOrigin: '105px 140px' }} className="transition-all duration-150">
          <ellipse cx="105" cy="140" rx="22" ry="20" fill="white" />
          {/* Eyelashes */}
          <path d="M 85 130 L 80 125 M 95 125 L 92 120 M 110 125 L 115 120" stroke="#4A3127" strokeWidth="2" strokeLinecap="round" />
          <circle cx={105 + pupilXOffset} cy={pupilY + pupilYOffset} r="10" fill={isHeartEyes ? "#FF6B9D" : "#333"} className="transition-all duration-300" />
          <circle cx={108 + pupilXOffset} cy={pupilY - 4 + pupilYOffset} r="3" fill="white" opacity="0.8" />
        </g>
        
        <g transform={`scale(1, ${isBlinking ? 0.1 : (isAsymmetric ? eyeScaleY * 0.9 : eyeScaleY)})`} style={{ transformOrigin: '195px 140px' }} className="transition-all duration-150">
          <ellipse cx="195" cy="140" rx="22" ry="20" fill="white" />
          {/* Eyelashes */}
          <path d="M 215 130 L 220 125 M 205 125 L 208 120 M 190 125 L 185 120" stroke="#4A3127" strokeWidth="2" strokeLinecap="round" />
          <circle cx={195 + pupilXOffset} cy={pupilY + pupilYOffset} r="10" fill={isHeartEyes ? "#FF6B9D" : "#333"} className="transition-all duration-300" />
          <circle cx={198 + pupilXOffset} cy={pupilY - 4 + pupilYOffset} r="3" fill="white" opacity="0.8" />
        </g>
        
        {/* Nose */}
        <path d="M 145 170 Q 150 175 155 170" fill="none" stroke="#D1A68A" strokeWidth="2" strokeLinecap="round" />
        
        {/* Mouth */}
        <g 
          className={isTalking ? 'talking' : ''} 
          style={{ transformOrigin: '150px 225px' }}
        >
          {/* Inner Mouth Fill - only visible when talking or wide open */}
          <path 
            d={mouthD} 
            fill="#8B3A3A" 
            style={{ opacity: isTalking || emotion === 'surprised' || emotion === 'happy' ? 0.2 : 0 }}
            className="transition-all duration-300"
          />
          <path 
            d={mouthD} 
            fill="none" 
            stroke="#A64D4D" 
            strokeWidth="4" 
            strokeLinecap="round" 
            className="transition-all duration-300" 
          />
        </g>

        {/* Charming Dimples */}
        <g style={{ opacity: (emotion === 'happy' || emotion === 'love') ? 0.5 : 0 }} className="transition-all duration-500">
          <path d="M 115 215 Q 112 218 115 221" fill="none" stroke="#A64D4D" strokeWidth="2" strokeLinecap="round" />
          <path d="M 185 215 Q 188 218 185 221" fill="none" stroke="#A64D4D" strokeWidth="2" strokeLinecap="round" />
        </g>
        
        {/* Teeth */}
        <rect x="140" y="220" width="20" height="6" rx="2" fill="white" style={{ opacity: teethOpacity }} className="transition-all duration-300" />
        
        {/* Blush */}
        <circle cx="90" cy="180" r="12" fill={`rgba(255,100,100,${blushOpacity})`} className="transition-all duration-300" />
        <circle cx="210" cy="180" r="12" fill={`rgba(255,100,100,${blushOpacity})`} className="transition-all duration-300" />
        
        {/* Tears */}
        <path d="M 105 160 Q 100 180 105 190 Q 110 180 105 160" fill={`rgba(100,200,255,${tearOpacity})`} className="transition-all duration-300" />
        <path d="M 195 160 Q 190 180 195 190 Q 200 180 195 160" fill={`rgba(100,200,255,${tearOpacity})`} className="transition-all duration-300" />
        
        {/* Anger veins */}
        <g style={{ opacity: angerOpacity }} className="transition-all duration-300">
          <path d="M 240 100 L 250 110 M 245 105 L 255 115" stroke="#FF4444" strokeWidth="2" fill="none" />
        </g>
      </svg>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(1deg); }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes talkScale {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          50% { transform: scaleY(1.6) scaleX(1.05) translateY(-1px); }
        }
        .talking {
          animation: talkScale 0.12s infinite;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-3px) rotate(-1deg); }
          75% { transform: translateX(3px) rotate(1deg); }
        }
        .angry-shake {
          animation: shake 0.1s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
        }
        .happy-bounce {
          animation: bounce 0.5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default SarahFace;
