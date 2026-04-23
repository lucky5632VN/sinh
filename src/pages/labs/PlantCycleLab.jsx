import React, { useState } from 'react';
import { ArrowLeft, Sun, Droplets, ArrowRight, RefreshCcw, Sprout, Flower2, Cherry } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlantCycleLab = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0); // 0: Seed, 1: Germination, 2: Growth, 3: Flowering, 4: Fruit
  const [water, setWater] = useState(50);
  const [light, setLight] = useState(50);

  const stages = [
    { name: 'Giai đoạn: Hạt giống', icon: <div style={{ width: 10, height: 14, background: '#78350f', borderRadius: '50% 50% 40% 40%' }} />, description: 'Hạt đang ở trạng thái ngủ nghỉ, chờ điều kiện thuận lợi.' },
    { name: 'Giai đoạn: Nảy mầm', icon: <Sprout color="#4ade80" />, description: 'Rễ mầm đâm xuống đất và lá mầm vươn lên đón ánh sáng.' },
    { name: 'Giai đoạn: Cây non', icon: <Sprout color="#22c55e" size={32} />, description: 'Quang hợp mạnh mẽ, tích lũy sinh khối và phát triển thân lá.' },
    { name: 'Giai đoạn: Ra hoa', icon: <Flower2 color="#fb7185" size={40} />, description: 'Sự xuất hiện của cơ quan sinh sản, chuẩn bị cho quá trình thụ phấn.' },
    { name: 'Giai đoạn: Kết quả', icon: <Cherry color="#ef4444" size={48} />, description: 'Hợp tử phát triển thành hạt nằm trong quả, hoàn thành chu kỳ.' }
  ];

  const handleNextStage = () => {
    if (stage < 4 && water > 30 && light > 30) {
      setStage(stage + 1);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', color: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(15, 23, 42, 0.9)' }}>
        <button onClick={() => navigate('/virtual-lab')} className="btn-primary" style={{ border: 'none', background: 'rgba(255,255,255,0.1)' }}>
          <ArrowLeft size={16} /> Dashboard
        </button>
        <div>
          <h1 className="text-glow" style={{ margin: 0, color: '#fbbf24', fontSize: '1.4rem' }}>Chu Kỳ Đời Sống Thực Vật</h1>
          <p style={{ color: '#a7f3d0', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
            Khám phá các giai đoạn sinh trưởng và phát triển của cây hạt kín.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', padding: '24px', overflow: 'hidden' }}>
        
        {/* Environment Controls */}
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '24px', background: 'rgba(2, 44, 34, 0.8)' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sun size={18} /> Môi Trường Nuôi Cấy
          </h2>

          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', pb: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', mb: '8px' }}>
              <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Droplets size={14} color="#60a5fa" /> Độ ẩm đất</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{water}%</span>
            </div>
            <input type="range" value={water} onChange={e => setWater(e.target.value)} style={{ width: '100%', accentColor: '#60a5fa' }} />
          </div>

          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', pb: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', mb: '8px' }}>
              <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Sun size={14} color="#fbbf24" /> Cường độ sáng</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{light}%</span>
            </div>
            <input type="range" value={light} onChange={e => setLight(e.target.value)} style={{ width: '100%', accentColor: '#fbbf24' }} />
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <button 
                onClick={handleNextStage}
                disabled={stage === 4 || water < 30 || light < 30}
                style={{ 
                  width: '100%', padding: '14px', borderRadius: '12px', background: (water < 30 || light < 30) ? 'rgba(239, 68, 68, 0.2)' : 'var(--accent-cyan)', 
                  color: (water < 30 || light < 30) ? '#fff' : '#000', fontWeight: 'bold', border: 'none', cursor: (stage === 4 || water < 30 || light < 30) ? 'not-allowed' : 'pointer'
                }}
             >
                {(water < 30 || light < 30) ? 'Môi trường kém' : (stage === 4 ? 'Đã hoàn thành' : 'Kích hoạt sinh trưởng')}
             </button>

             <button onClick={() => setStage(0)} className="btn-primary" style={{ background: 'transparent', width: '100%' }}>
                <RefreshCcw size={16} /> Gieo lại hạt mới
             </button>
          </div>

          <div style={{ fontSize: '0.85rem', background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(251, 191, 36, 0.2)' }}>
             <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#fbbf24' }}>{stages[stage].name}</p>
             <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.4' }}>{stages[stage].description}</p>
          </div>
        </div>

        {/* Observation Box */}
        <div className="glass-panel" style={{ borderRadius: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'linear-gradient(to bottom, #064e3b, #022c22)' }}>
          {/* Sky / Environment Area */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
             
             {/* Sun Visualization */}
             <div style={{ position: 'absolute', top: '40px', right: '40px', opacity: light / 100 }}>
                <Sun size={80} color="#fbbf24" style={{ filter: 'drop-shadow(0 0 20px #fbbf24)' }} />
             </div>

             {/* Plant Growth Rendering */}
             <div style={{ position: 'relative', zIndex: 2, transition: 'all 0.5s ease' }}>
                {stage === 0 && (
                  <div style={{ width: 12, height: 16, background: '#78350f', borderRadius: '50% 50% 40% 40%', transform: 'translateY(10px)' }} />
                )}
                {stage === 1 && (
                  <svg width="60" height="80" viewBox="0 0 60 80">
                    <path d="M30,80 Q30,60 40,50" fill="none" stroke="#4ade80" strokeWidth="4" />
                    <path d="M40,50 Q45,45 50,55" fill="#4ade80" />
                  </svg>
                )}
                {stage === 2 && (
                  <svg width="100" height="150" viewBox="0 0 100 150">
                    <path d="M50,150 Q50,100 60,50" fill="none" stroke="#22c55e" strokeWidth="6" />
                    <path d="M60,50 Q40,40 30,50" fill="#22c55e" />
                    <path d="M60,80 Q80,70 90,80" fill="#22c55e" />
                  </svg>
                )}
                {stage === 3 && (
                   <div style={{ position: 'relative' }}>
                      <svg width="120" height="200" viewBox="0 0 120 200">
                        <path d="M60,200 Q60,100 70,20" fill="none" stroke="#22c55e" strokeWidth="8" />
                        <path d="M70,20 Q80,10 90,20" fill="#fb7185" />
                        <path d="M70,20 Q60,10 50,20" fill="#fb7185" />
                        <path d="M70,20 Q70,30 80,40" fill="#fb7185" />
                        <path d="M70,20 Q70,30 60,40" fill="#fb7185" />
                      </svg>
                   </div>
                )}
                {stage === 4 && (
                   <div style={{ position: 'relative' }}>
                      <svg width="120" height="200" viewBox="0 0 120 200">
                        <path d="M60,200 Q60,100 70,20" fill="none" stroke="#166534" strokeWidth="8" />
                        <circle cx="70" cy="30" r="15" fill="#ef4444" style={{ filter: 'drop-shadow(0 0 10px #ef4444)' }} />
                        <path d="M70,15 L70,5" fill="none" stroke="#166534" strokeWidth="4" />
                      </svg>
                   </div>
                )}
             </div>

             {/* Ground Layer */}
             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: '#3f2b1c', borderTop: '4px solid #1a0f08' }} />
          </div>

          {/* Timeline Footer */}
          <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', display: 'flex', justifyContent: 'center', gap: '12px' }}>
             {stages.map((st, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <div style={{ 
                      width: '40px', height: '40px', borderRadius: '50%', background: i <= stage ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255,255,255,0.05)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', border: i === stage ? '2px solid #fbbf24' : '1px solid transparent' 
                   }}>
                      {st.icon}
                   </div>
                   {i < 4 && <ArrowRight size={14} color="rgba(255,255,255,0.2)" />}
                </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlantCycleLab;
