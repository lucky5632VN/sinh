import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Info, RefreshCcw, Syringe, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FrogReflexLab = () => {
  const navigate = useNavigate();
  const [isSpinalDestroyed, setIsSpinalDestroyed] = useState(false);
  const [isStimulating, setIsStimulating] = useState(false);
  const [reflexSuccess, setReflexSuccess] = useState(null);
  const [neuralPulsePos, setNeuralPulsePos] = useState(0);

  const handleStimulate = () => {
    setIsStimulating(true);
    setNeuralPulsePos(0);
    
    // Logic: Nếu tủy sống còn nguyên -> Phản xạ thành công. Nếu tủy hỏng -> Không phản xạ.
    const success = !isSpinalDestroyed;
    setReflexSuccess(success);

    // Animation neural pulse
    let start = Date.now();
    const duration = 1000;
    const interval = setInterval(() => {
      let elapsed = Date.now() - start;
      let progress = elapsed / duration;
      if (progress >= 1) {
        clearInterval(interval);
        setNeuralPulsePos(1);
        setIsStimulating(false);
      } else {
        setNeuralPulsePos(progress);
      }
    }, 16);
  };

  const resetExperiment = () => {
    setIsSpinalDestroyed(false);
    setIsStimulating(false);
    setReflexSuccess(null);
    setNeuralPulsePos(0);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', color: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15,23,42,0.9)' }}>
        <button onClick={() => navigate('/virtual-lab')} className="btn-primary" style={{ border: 'none', background: 'rgba(255,255,255,0.1)' }}>
          <ArrowLeft size={16} /> Dashboard
        </button>
        <div>
          <h1 className="text-glow" style={{ margin: 0, color: '#4ade80', fontSize: '1.4rem' }}>Thí Nghiệm Cung Phản Xạ Ếch</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
            Khảo sát cơ chế dẫn truyền thần kinh qua tủy sống.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', padding: '24px', overflow: 'hidden' }}>
        
        {/* Controls */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} /> Bàn Thí Nghiệm
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              className="btn-primary" 
              onClick={() => setIsSpinalDestroyed(true)} 
              disabled={isSpinalDestroyed}
              style={{ width: '100%', justifyContent: 'flex-start', gap: '12px', background: isSpinalDestroyed ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)', borderColor: isSpinalDestroyed ? '#ef4444' : 'rgba(255,255,255,0.1)' }}
            >
              <Trash2 size={16} /> {isSpinalDestroyed ? 'Đã phá tủy sống' : 'Phá tủy sống ếch'}
            </button>
            <button 
              className="btn-active" 
              onClick={handleStimulate} 
              disabled={isStimulating}
              style={{ width: '100%', justifyContent: 'flex-start', gap: '12px' }}
            >
              <Syringe size={16} /> Kích thích Acid (0.5%)
            </button>
          </div>

          <div style={{ marginTop: 'auto' }}>
             <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', fontSize: '0.85rem', lineHeight: '1.6' }}>
                <div style={{ color: '#4ade80', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                   <Info size={14} /> Trạng thái ếch:
                </div>
                <p style={{ margin: 0 }}>- {isSpinalDestroyed ? 'Ếch tủy (Mất trung ương thần kinh)' : 'Ếch nguyên vẹn'}</p>
                <p style={{ margin: 0 }}>- PX đầu gối: {reflexSuccess === null ? 'Đợi kích thích' : (reflexSuccess ? 'CÓ PHẢN XẠ' : 'KHÔNG PHẢN XẠ')}</p>
             </div>
             <button onClick={resetExperiment} style={{ width: '100%', marginTop: '16px', padding: '10px', background: 'transparent', border: '1px solid #475569', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <RefreshCcw size={14} /> Reset ếch mới
             </button>
          </div>
        </div>

        {/* Workspace */}
        <div className="glass-panel" style={{ borderRadius: '20px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)' }}>
          
          <svg width="600" height="400" viewBox="0 0 600 400">
            {/* Tủy sống (Central Nervous System) */}
            <rect x="280" y="50" width="40" height="150" rx="20" fill={isSpinalDestroyed ? "#475569" : "#4ade80"} opacity="0.2" stroke={isSpinalDestroyed ? "#94a3b8" : "#4ade80"} strokeWidth="2" />
            <text x="300" y="40" textAnchor="middle" fill="#94a3b8" fontSize="12">TỦY SỐNG</text>
            
            {/* Frog Body Placeholder (Conceptual) */}
            <path d="M200,200 Q300,150 400,200 T500,300" fill="none" stroke="#334155" strokeWidth="20" strokeLinecap="round" />
            
            {/* Chân ếch (Interactive) */}
            <g transform={reflexSuccess && neuralPulsePos > 0.6 ? "rotate(-15, 300, 200)" : "rotate(0)"} style={{ transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
               <path d="M300,200 C350,250 400,300 450,320" fill="none" stroke="#4ade80" strokeWidth="12" strokeLinecap="round" opacity="0.8" />
               <circle cx="450" cy="320" r="10" fill="#4ade80" />
            </g>

            {/* Neural Pathway Arc */}
            <path id="nerve-path" d="M450,320 Q400,250 300,125" fill="none" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="2" strokeDasharray="5,5" />
            
            {/* Neural Pulse Animation */}
            {isStimulating && (
               <circle r="6" fill="#00f0ff">
                  <animateMotion dur="1s" repeatCount="1" path="M450,320 Q400,250 300,125" />
                  <filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
               </circle>
            )}

            {/* Thần kinh vận động (Phản hồi) */}
            {isStimulating && reflexSuccess && neuralPulsePos > 0.5 && (
               <circle r="6" fill="#f43f5e">
                  <animateMotion dur="0.5s" begin="0.5s" repeatCount="1" path="M300,125 Q400,250 450,320" />
               </circle>
            )}

            {/* Labels */}
            <text x="470" y="340" fill="var(--text-secondary)" fontSize="12">Kích thích</text>
            <text x="250" y="100" fill="var(--text-secondary)" fontSize="12" textAnchor="end">Nơ-ron cảm giác</text>
            <text x="350" y="150" fill="var(--text-secondary)" fontSize="12">Nơ-ron vận động</text>
          </svg>

          {/* Feedback Overlay */}
          {reflexSuccess === false && neuralPulsePos === 1 && (
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '12px 20px', borderRadius: '12px', animation: 'fadeIn 0.3s ease-out' }}>
               <p style={{ margin: 0, fontWeight: 'bold', color: '#ef4444' }}>KẾT QUẢ: KHÔNG PHẢN XẠ</p>
               <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem' }}>Tủy sống đã bị phá hủy, cung phản xạ bị ngắt quãng.</p>
            </div>
          )}
          {reflexSuccess === true && neuralPulsePos === 1 && (
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid #4ade80', padding: '12px 20px', borderRadius: '12px', animation: 'fadeIn 0.3s ease-out' }}>
               <p style={{ margin: 0, fontWeight: 'bold', color: '#4ade80' }}>KẾT QUẢ: CO CƠ CHÂN</p>
               <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem' }}>Cung phản xạ (Cảm giác → Tủy → Vận động) hoạt động tốt.</p>
            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default FrogReflexLab;
