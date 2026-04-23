import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Info, RefreshCcw, Syringe, Trash2, Activity } from 'lucide-react';
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
    const duration = 1200; // 1.2s for the full pulse cycle
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
      <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)' }}>
        <button onClick={() => navigate('/virtual-lab')} className="action-btn" style={{ padding: '8px 16px', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.2)', color: 'var(--accent-cyan)' }}>
          <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Dashboard
        </button>
        <div>
          <h1 className="text-glow" style={{ margin: 0, color: 'var(--accent-green)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity size={24} /> Thí Nghiệm Cung Phản Xạ Ếch
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.95rem' }}>
            Phân tích mổ xẻ tủy sống và kiểm chứng cơ chế dẫn truyền thần kinh.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', padding: '24px', overflow: 'hidden' }}>
        
        {/* Controls */}
        <div className="glass-panel-heavy" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.15rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
            <Zap size={20} /> Bảng Điều Khiển
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Bước 1: Chuẩn bị tủy sống</p>
              <button 
                className="btn-primary" 
                onClick={() => setIsSpinalDestroyed(true)} 
                disabled={isSpinalDestroyed}
                style={{ width: '100%', padding: '12px', justifyContent: 'center', gap: '12px', background: isSpinalDestroyed ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.05)', color: isSpinalDestroyed ? '#fca5a5' : '#ef4444', border: `1px solid ${isSpinalDestroyed ? '#ef4444' : 'rgba(239, 68, 68, 0.3)'}` }}
              >
                <Trash2 size={18} /> {isSpinalDestroyed ? 'Tủy sống đã bị phá' : 'Tiến hành Hủy Tủy'}
              </button>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Bước 2: Kích thích mút thần kinh</p>
              <button 
                className="btn-active" 
                onClick={handleStimulate} 
                disabled={isStimulating}
                style={{ width: '100%', padding: '12px', justifyContent: 'center', gap: '12px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(0, 240, 255, 0.3)', boxShadow: '0 0 15px rgba(0, 240, 255, 0.1)' }}
              >
                <Syringe size={18} /> Nhỏ Acid 0.5% vào ngón chân
              </button>
            </div>
          </div>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
             <div style={{ background: 'rgba(0, 255, 163, 0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(0, 255, 163, 0.2)' }}>
                <div style={{ color: 'var(--accent-green)', fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <Info size={16} /> Báo cáo trạng thái:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Hệ thần kinh:</span>
                  <strong style={{ color: isSpinalDestroyed ? '#ef4444' : '#fff' }}>{isSpinalDestroyed ? 'Đứt đoạn' : 'Nguyên vẹn'}</strong>
                  <span style={{ color: 'var(--text-secondary)' }}>Phản xạ cơ:</span>
                  <strong style={{ color: reflexSuccess === null ? 'var(--text-muted)' : (reflexSuccess ? 'var(--accent-green)' : '#ef4444') }}>
                    {reflexSuccess === null ? 'Đang chờ...' : (reflexSuccess ? 'CÓ (Chân co)' : 'KHÔNG (Liệt)')}
                  </strong>
                </div>
             </div>
             <button onClick={resetExperiment} className="action-btn" style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                <RefreshCcw size={16} style={{ marginRight: '8px' }} /> Đưa ếch mới vào bàn
             </button>
          </div>
        </div>

        {/* Workspace - High-Tech Anatomy Viewer */}
        <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)', overflow: 'hidden' }}>
          
          {/* Background Grid Pattern */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

          <svg width="600" height="400" viewBox="0 0 600 400" style={{ zIndex: 1 }}>
            <defs>
              <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Anatomical Frog Outline (Top-Down view wireframe) */}
            <path d="M300,50 C260,50 250,80 250,110 C250,140 260,180 260,220 C260,260 270,300 280,300 C320,300 330,260 330,220 C330,180 340,140 340,110 C340,80 330,50 300,50 Z" fill="rgba(0, 240, 255, 0.03)" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="2" strokeDasharray="4 4" />
            {/* Front legs outline */}
            <path d="M250,120 Q200,100 180,140" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="8" strokeLinecap="round" />
            <path d="M340,120 Q390,100 410,140" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="8" strokeLinecap="round" />
            {/* Left hind leg outline (Static) */}
            <path d="M260,240 Q200,280 220,340 L190,360" fill="none" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

            {/* Spinal Cord (CNS) */}
            <g transform="translate(290, 80)">
              <rect x="0" y="0" width="20" height="180" rx="10" fill={isSpinalDestroyed ? "#1e293b" : "rgba(74, 222, 128, 0.2)"} stroke={isSpinalDestroyed ? "#475569" : "#4ade80"} strokeWidth="2" filter={isSpinalDestroyed ? "" : "url(#cyanGlow)"} />
              {/* Vertebrae segments */}
              {[...Array(8)].map((_, i) => (
                <line key={i} x1="0" y1={20 + i * 20} x2="20" y2={20 + i * 20} stroke={isSpinalDestroyed ? "#334155" : "#22c55e"} strokeWidth="2" />
              ))}
            </g>

            {/* Right hind leg (Interactive & Animated) */}
            {/* The leg consists of a thigh and a calf. We pivot the whole group at the hip (330, 240) */}
            <g transform={reflexSuccess && neuralPulsePos > 0.6 ? "rotate(-25, 330, 240)" : "rotate(0)"} style={{ transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
               {/* Thigh */}
               <path d="M330,240 Q380,270 400,220" fill="none" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="16" strokeLinecap="round" />
               {/* Calf */}
               <path d="M400,220 Q440,280 430,340" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="12" strokeLinecap="round" />
               {/* Foot */}
               <path d="M430,340 L450,370 L420,380 Z" fill="rgba(0, 240, 255, 0.2)" stroke="rgba(0, 240, 255, 0.4)" strokeLinejoin="round" />
               
               {/* Syringe Drop Animation targeting the foot */}
               {isStimulating && neuralPulsePos < 0.2 && (
                 <circle cx="440" cy="360" r={4 + neuralPulsePos * 20} fill="none" stroke="#ef4444" strokeWidth="2" opacity={1 - neuralPulsePos * 5} />
               )}
            </g>

            {/* Neural Pathways (Nerves) */}
            {/* Sensory Nerve (Blue) - From foot to spinal cord */}
            <path id="sensory-nerve" d="M440,360 Q480,280 400,220 Q360,180 310,200" fill="none" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="3" strokeDasharray="6 4" />
            
            {/* Motor Nerve (Red) - From spinal cord to thigh muscle */}
            <path id="motor-nerve" d="M310,180 Q350,180 370,240" fill="none" stroke="rgba(239, 68, 68, 0.2)" strokeWidth="3" strokeDasharray="6 4" />

            {/* Neural Pulse Animation (Sensory -> Spinal Cord) */}
            {isStimulating && neuralPulsePos <= 0.5 && (
               <circle r="6" fill="#00f0ff" filter="url(#cyanGlow)">
                  <animateMotion dur="0.6s" repeatCount="1" path="M440,360 Q480,280 400,220 Q360,180 310,200" />
               </circle>
            )}

            {/* Neural Pulse Animation (Spinal Cord -> Motor) */}
            {isStimulating && reflexSuccess && neuralPulsePos > 0.5 && (
               <circle r="6" fill="#ef4444" filter="url(#redGlow)">
                  <animateMotion dur="0.6s" begin="0s" repeatCount="1" path="M310,180 Q350,180 370,240" />
               </circle>
            )}

            {/* Labels pointing to anatomy */}
            <g transform="translate(100, 160)">
              <line x1="80" y1="0" x2="190" y2="40" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
              <text x="0" y="0" fill="var(--text-secondary)" fontSize="12" className="font-mono">TỦY SỐNG (CNS)</text>
              <rect x="-10" y="-15" width="100" height="20" fill="none" stroke="rgba(74,222,128,0.3)" rx="4" />
            </g>

            <g transform="translate(580, 180)">
              <line x1="-10" y1="-5" x2="-140" y2="40" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
              <text x="0" y="0" textAnchor="end" fill="var(--accent-cyan)" fontSize="12" className="font-mono">SỢI CẢM GIÁC (HƯỚNG TÂM)</text>
            </g>

            <g transform="translate(580, 240)">
              <line x1="-10" y1="0" x2="-200" y2="0" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
              <text x="0" y="5" textAnchor="end" fill="#ef4444" fontSize="12" className="font-mono">SỢI VẬN ĐỘNG (LY TÂM)</text>
            </g>

          </svg>

          {/* Holographic Overlays for Feedback */}
          {reflexSuccess === false && neuralPulsePos === 1 && (
            <div style={{ position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', padding: '16px 24px', borderRadius: '12px', animation: 'fadeIn 0.3s ease-out', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 30px rgba(239, 68, 68, 0.2)' }}>
               <h3 style={{ margin: '0 0 8px 0', color: '#ef4444', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} /> MẤT PHẢN XẠ CƠ</h3>
               <p style={{ margin: 0, fontSize: '0.9rem', color: '#fca5a5', textAlign: 'center' }}>Tín hiệu bị ngắt tại tủy sống.<br/>Cung phản xạ không hoàn chỉnh.</p>
            </div>
          )}
          {reflexSuccess === true && neuralPulsePos === 1 && (
            <div style={{ position: 'absolute', top: '30px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0, 255, 163, 0.1)', border: '1px solid var(--accent-green)', padding: '16px 24px', borderRadius: '12px', animation: 'fadeIn 0.3s ease-out', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 30px rgba(0, 255, 163, 0.2)' }}>
               <h3 style={{ margin: '0 0 8px 0', color: 'var(--accent-green)', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}><Activity size={18} /> PHẢN XẠ THÀNH CÔNG</h3>
               <p style={{ margin: 0, fontSize: '0.9rem', color: '#a7f3d0', textAlign: 'center' }}>Cung phản xạ hoàn chỉnh.<br/>Tín hiệu truyền từ cảm giác → tủy → cơ vận động.</p>
            </div>
          )}
        </div>

      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
      `}</style>
    </div>
  );
};

export default FrogReflexLab;
