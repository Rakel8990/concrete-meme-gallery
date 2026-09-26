import React, { useState, useRef } from 'react';
import { ShieldAlert, Sparkles, LogOut } from 'lucide-react';

interface HumanOrMoaiGateProps {
  onChooseMoai: () => void;
}

export const HumanOrMoaiGate: React.FC<HumanOrMoaiGateProps> = ({ onChooseMoai }) => {
  const [gateStatus, setGateStatus] = useState<'idle' | 'moai-success' | 'human-closed'>('idle');
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Sound effects via Web Audio API
  const getAudioContext = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  };

  const playMoaiSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      
      // Resonant harmonic chime (chord: F3, C4, A4)
      const freqs = [349.23, 523.25, 880];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        
        gain.gain.setValueAtTime(0.08, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 0.6);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.65);
      });
    } catch {
      // Audio fallback safe
    }
  };

  const playHumanRejectSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.35);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.45);
    } catch {
      // Audio fallback safe
    }
  };

  const handleChooseMoai = () => {
    playMoaiSound();
    setGateStatus('moai-success');
    setTimeout(() => {
      onChooseMoai();
    }, 450);
  };

  const handleChooseHuman = () => {
    playHumanRejectSound();
    setGateStatus('human-closed');

    // Attempt browser window close
    try {
      window.close();
    } catch {
      // Most browsers block scripts from closing windows not opened via script
    }
  };

  // If clicked Human: display closed screen
  if (gateStatus === 'human-closed') {
    return (
      <div className="fixed inset-0 z-50 bg-[#080a0f] text-[#f7f4ec] bg-grid-pattern flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden animate-gate-in">
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-purple pointer-events-none opacity-50 blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#f3d99b]/5 rounded-full pointer-events-none blur-[100px]" />

        {/* Floating Interactive Stage (No bounding box) */}
        <div className="relative z-10 max-w-xl w-full mx-auto text-center flex flex-col items-center">
          {/* Luminous Cyber Shield Badge */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="absolute -inset-2 rounded-full bg-purple-500/20 blur-xl animate-pulse" />
            <div className="relative inline-flex items-center justify-center w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-[#24173d]/90 to-[#0e0a1a]/95 border border-purple-400/50 shadow-[0_0_35px_rgba(168,85,247,0.4)] backdrop-blur-xl">
              <ShieldAlert className="w-8 h-8 sm:w-9 sm:h-9 text-purple-300 drop-shadow-[0_0_12px_rgba(192,132,252,0.6)]" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-display-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#f7f4ec] leading-tight mb-10 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] max-w-lg">
            Sorry, humans are not allowed.
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 w-full max-w-lg mx-auto">
            {/* BE A MOAI Button: Exact Brand Warm Sand (#f3d99b) Halo, fills fully on hover */}
            <button
              onClick={() => setGateStatus('idle')}
              className="w-full sm:w-auto min-w-[210px] h-14 group relative inline-flex items-center justify-center px-8 rounded-full font-mono-code text-xs sm:text-sm font-black tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer overflow-hidden border-2 border-[#f3d99b] hover:border-[#fbe2a8] bg-gradient-to-b from-[#16120b]/95 via-[#0e0a06]/98 to-[#080a0f] hover:from-[#f8e1a6] hover:via-[#f3d99b] hover:to-[#deb763] backdrop-blur-xl text-[#f3d99b] hover:text-[#080a0f] shadow-[0_0_35px_rgba(243,217,155,0.7),0_0_70px_rgba(243,217,155,0.45),0_0_100px_rgba(106,35,179,0.35),0_10px_30px_rgba(0,0,0,0.9)] hover:shadow-[0_0_55px_rgba(243,217,155,0.95),0_0_95px_rgba(243,217,155,0.75),0_0_130px_rgba(106,35,179,0.55),0_14px_40px_rgba(0,0,0,0.95)] hover:-translate-y-1 active:translate-y-0"
            >
              {/* Top specular reflection bevel in warm sand */}
              <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f3d99b]/90 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />
              <span>BE A MOAI</span>
            </button>

            {/* LEAVE Button: Exact Brand Rich Violet (#6a23b3) Halo, fills fully on hover */}
            <button
              onClick={() => {
                try {
                  window.close();
                } catch {
                  // Safe
                }
                try {
                  window.open('', '_self', '');
                  window.close();
                } catch {
                  // Safe
                }
                try {
                  window.location.href = 'about:blank';
                } catch {
                  // Safe
                }
              }}
              className="w-full sm:w-auto min-w-[210px] h-14 group relative inline-flex items-center justify-center gap-2 px-8 rounded-full border-2 border-[#6a23b3] hover:border-[#9d3fed] bg-gradient-to-b from-[#140b25]/95 via-[#0c0617]/98 to-[#080a0f] hover:from-[#7e29d6] hover:via-[#6a23b3] hover:to-[#53178c] backdrop-blur-xl text-[#f7f4ec] hover:text-white font-mono-code text-xs sm:text-sm font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_35px_rgba(106,35,179,0.75),0_0_70px_rgba(91,30,149,0.55),0_0_100px_rgba(91,30,149,0.4),0_10px_30px_rgba(0,0,0,0.9)] hover:shadow-[0_0_55px_rgba(126,34,206,0.95),0_0_95px_rgba(106,35,179,0.8),0_0_130px_rgba(91,30,149,0.65),0_14px_40px_rgba(0,0,0,0.95)] hover:-translate-y-1 active:translate-y-0 cursor-pointer overflow-hidden"
            >
              {/* Top specular hairline highlight in brand violet */}
              <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c084fc]/80 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />
              <LogOut className="w-4 h-4 text-[#c084fc] group-hover:text-white transition-colors" />
              <span>LEAVE</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080a0f] text-[#f7f4ec] bg-grid-pattern relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 selection:bg-[#5b1e95] selection:text-[#f3d99b] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-purple pointer-events-none opacity-50 blur-[100px]" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-[#f3d99b]/5 rounded-full pointer-events-none blur-[100px]" />

      {/* Floating Interactive Stage (No bounding box) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto text-center">
        {/* Core Question - Floating clean with crisp presence */}
        <h1 className="font-display-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#f7f4ec] leading-tight mb-10 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
          Are you a Human or Moai?
        </h1>

        {/* Action Buttons: Sleek continuous pill curvature with deep radiant halos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 w-full max-w-lg mx-auto">
          {/* HUMAN Button: Exact Brand Rich Violet (#6a23b3) Halo, fills fully on hover */}
          <button
            onClick={handleChooseHuman}
            disabled={gateStatus !== 'idle'}
            className="w-full sm:w-auto min-w-[210px] h-14 group relative inline-flex items-center justify-center px-8 rounded-full border-2 border-[#6a23b3] hover:border-[#9d3fed] bg-gradient-to-b from-[#140b25]/95 via-[#0c0617]/98 to-[#080a0f] hover:from-[#7e29d6] hover:via-[#6a23b3] hover:to-[#53178c] backdrop-blur-xl text-[#f7f4ec] hover:text-white font-mono-code text-xs sm:text-sm font-black tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_35px_rgba(106,35,179,0.75),0_0_70px_rgba(91,30,149,0.55),0_0_100px_rgba(91,30,149,0.4),0_10px_30px_rgba(0,0,0,0.9)] hover:shadow-[0_0_55px_rgba(126,34,206,0.95),0_0_95px_rgba(106,35,179,0.8),0_0_130px_rgba(91,30,149,0.65),0_14px_40px_rgba(0,0,0,0.95)] hover:-translate-y-1 active:translate-y-0 cursor-pointer overflow-hidden"
            title="Clicking Human closes access"
          >
            {/* Top specular hairline highlight in brand violet */}
            <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c084fc]/80 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />
            <span>HUMAN</span>
          </button>

          {/* MOAI Button: Exact Brand Warm Sand (#f3d99b) Halo, fills fully on hover */}
          <button
            onClick={handleChooseMoai}
            disabled={gateStatus !== 'idle'}
            className={`w-full sm:w-auto min-w-[210px] h-14 group relative inline-flex items-center justify-center px-8 rounded-full font-mono-code text-xs sm:text-sm font-black tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer overflow-hidden border-2 border-[#f3d99b] hover:border-[#fbe2a8] ${
              gateStatus === 'moai-success'
                ? 'bg-gradient-to-r from-emerald-950/90 to-teal-950/90 text-emerald-300 border-emerald-400 shadow-[0_0_50px_rgba(52,211,153,0.9),0_0_90px_rgba(16,185,129,0.5)] scale-105'
                : 'bg-gradient-to-b from-[#16120b]/95 via-[#0e0a06]/98 to-[#080a0f] hover:from-[#f8e1a6] hover:via-[#f3d99b] hover:to-[#deb763] backdrop-blur-xl text-[#f3d99b] hover:text-[#080a0f] shadow-[0_0_35px_rgba(243,217,155,0.7),0_0_70px_rgba(243,217,155,0.45),0_0_100px_rgba(106,35,179,0.35),0_10px_30px_rgba(0,0,0,0.9)] hover:shadow-[0_0_55px_rgba(243,217,155,0.95),0_0_95px_rgba(243,217,155,0.75),0_0_130px_rgba(106,35,179,0.55),0_14px_40px_rgba(0,0,0,0.95)] hover:-translate-y-1 active:translate-y-0'
            }`}
          >
            {/* Top specular reflection bevel in brand warm sand */}
            <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f3d99b]/90 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />

            {gateStatus === 'moai-success' ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-emerald-400" />
                <span>ENTERING...</span>
              </>
            ) : (
              <span>MOAI</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
