import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface TrashPageProps {
  onBackToMap: () => void;
}

export const TrashPage: React.FC<TrashPageProps> = ({ onBackToMap }) => {
  const fullText = "Do you really think I'd make trash memes...?";
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio context for mechanical key sound
  const playKeySound = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Mechanical keystroke click tone
      osc.type = 'triangle';
      const baseFreq = 750 + Math.random() * 350;
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, ctx.currentTime + 0.035);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400 + Math.random() * 400, ctx.currentTime);
      filter.Q.setValueAtTime(4, ctx.currentTime);

      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // Audio safety fallback
    }
  };

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsDone(false);

    const interval = setInterval(() => {
      index++;
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        playKeySound();
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 75);

    return () => {
      clearInterval(interval);
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="trash-standalone-page" onClick={playKeySound}>
      {/* Background ambient lighting */}
      <div className="trash-ambient-glow" aria-hidden="true" />

      {/* Floating minimalistic return action */}
      <button 
        className="trash-nav-back"
        onClick={(e) => {
          e.stopPropagation();
          onBackToMap();
        }}
        aria-label="Return to route map"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>RETURN TO MAP</span>
      </button>

      {/* Center typing experience */}
      <div className="trash-content-wrap">
        <h1 className="trash-typing-headline">
          {displayedText}
          <span className={`trash-cursor ${isDone ? 'trash-cursor--blink' : ''}`}>|</span>
        </h1>
      </div>
    </div>
  );
};
