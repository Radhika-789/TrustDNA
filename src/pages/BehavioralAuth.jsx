import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Activity, MousePointer2 } from 'lucide-react';

export default function BehavioralAuth() {
  const [trustScore, setTrustScore] = useState(99);
  const [typingData, setTypingData] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const simulateRAT = () => {
    setIsSimulating(true);
    let currentScore = 99;
    
    const interval = setInterval(() => {
      currentScore -= Math.random() * 8 + 2;
      if (currentScore <= 30) {
        currentScore = 30;
        clearInterval(interval);
        setTimeout(() => setIsSimulating(false), 2000);
      }
      setTrustScore(Math.max(30, Math.floor(currentScore)));
      
      setTypingData(prev => [...prev.slice(-15), {
        time: new Date().toLocaleTimeString().split(' ')[0],
        dwell: Math.random() * 10 > 8 ? 50 : 200 + Math.random() * 50, // RAT often has zero dwell or weird latency
        anomaly: currentScore < 70
      }]);
    }, 400);
  };

  const reset = () => {
    setTrustScore(99);
    setTypingData([]);
    setIsSimulating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Layer 4: Behavioral Authentication</h1>
          <p className="text-slate-400 text-sm mt-1">Continuous post-install monitoring for RATs and device compromise.</p>
        </div>
        <div className="space-x-3">
          <button onClick={reset} className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">Reset</button>
          <button 
            onClick={simulateRAT}
            disabled={isSimulating}
            className="px-4 py-2 bg-danger/20 hover:bg-danger/30 text-danger border border-danger/50 text-sm font-medium rounded-lg transition-colors"
          >
            Simulate Remote Access Trojan (RAT)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Ring */}
        <div className="glass-panel-light p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
          {trustScore < 50 && <div className="absolute inset-0 bg-danger/10 animate-pulse pointer-events-none"></div>}
          
          <h3 className="text-sm font-medium text-slate-400 mb-6 absolute top-6 left-6">Continuous Trust Score</h3>
          
          <div className="relative w-48 h-48 flex items-center justify-center mt-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <motion.circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke={trustScore > 70 ? 'var(--color-success)' : trustScore > 50 ? 'var(--color-warning)' : 'var(--color-danger)'} 
                strokeWidth="8" 
                strokeDasharray="251.2"
                animate={{ strokeDashoffset: 251.2 - (251.2 * trustScore) / 100 }}
                transition={{ duration: 0.5 }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-4xl font-bold font-mono ${trustScore > 70 ? 'text-success' : trustScore > 50 ? 'text-warning' : 'text-danger'}`}>
                {trustScore}
              </span>
              <span className="text-xs text-slate-400 mt-1">/ 100</span>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            {trustScore > 70 ? (
              <span className="px-3 py-1 bg-success/20 text-success text-xs font-bold rounded-full border border-success/30">USER AUTHENTICATED</span>
            ) : trustScore > 50 ? (
              <span className="px-3 py-1 bg-warning/20 text-warning text-xs font-bold rounded-full border border-warning/30">ELEVATED RISK</span>
            ) : (
              <span className="px-3 py-1 bg-danger/20 text-danger text-xs font-bold rounded-full border border-danger/30 animate-pulse">TRANSACTION FROZEN</span>
            )}
          </div>
        </div>

        {/* Telemetry Stream */}
        <div className="md:col-span-2 glass-panel-light p-6 rounded-xl border border-white/10 flex flex-col">
          <h3 className="text-sm font-medium text-slate-400 mb-4 flex items-center">
            <Activity className="w-4 h-4 mr-2" /> Live Interaction Telemetry
          </h3>
          
          <div className="flex-1 bg-background/50 rounded-lg border border-white/5 p-4 font-mono text-xs overflow-hidden relative">
            <div className="scanlines absolute inset-0 opacity-50"></div>
            {trustScore < 50 && <div className="absolute inset-0 bg-danger/5 z-10 pointer-events-none"></div>}
            
            <div className="space-y-2 relative z-20 flex flex-col justify-end h-full">
              {typingData.length === 0 ? (
                <div className="text-slate-500 italic">Waiting for interaction data...</div>
              ) : (
                typingData.map((data, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={`flex items-center space-x-4 border-b border-white/5 pb-1 ${data.anomaly ? 'text-danger' : 'text-slate-300'}`}
                  >
                    <span className="text-slate-500">[{data.time}]</span>
                    <span className="w-24">Evt: {Math.random() > 0.5 ? 'TOUCH_UP' : 'TOUCH_DOWN'}</span>
                    <span>Dwell: <span className={data.anomaly ? 'font-bold' : ''}>{data.dwell.toFixed(1)}ms</span></span>
                    {data.anomaly && <span className="ml-auto bg-danger/20 px-2 py-0.5 rounded text-[10px]">ANOMALY: NON-HUMAN RHYTHM</span>}
                  </motion.div>
                ))
              )}
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="bg-white/5 p-2 rounded">
              <span className="block text-slate-400">Baseline Match</span>
              <span className={`font-medium ${trustScore < 60 ? 'text-danger' : 'text-success'}`}>{trustScore}%</span>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <span className="block text-slate-400">Touch Velocity</span>
              <span className="font-medium text-slate-200">{trustScore < 50 ? 'ERRATIC' : 'NORMAL'}</span>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <span className="block text-slate-400">Jump Sequences</span>
              <span className={`font-medium ${trustScore < 50 ? 'text-danger' : 'text-slate-200'}`}>{trustScore < 50 ? 'UNNATURAL' : 'LOGICAL'}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
