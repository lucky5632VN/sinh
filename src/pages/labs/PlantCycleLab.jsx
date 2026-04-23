import React, { useState } from 'react';
import { ArrowLeft, Sun, Droplets, ArrowRight, RefreshCcw, Sprout, Flower2, Cherry, Info } from 'lucide-react';
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
    if (stage < 4 && water > 20 && light > 20) {
      setStage(stage + 1);
    }
  };

  // Dynamic Plant Health based on Environment
  const getPlantHealth = () => {
    let color = '#22c55e'; // Optimal Green
    let droop = 0; // Degrees of rotation/wilting
    let scale = 1;
    let stemWidth = 6;
    let leafColor = '#4ade80';

    // Water Effects
    if (water < 20) {
      color = '#a16207'; // Yellow/Brown (Drying)
      leafColor = '#ca8a04';
      droop = 60; // Severe wilt
      scale = 0.8;
    } else if (water < 40) {
      color = '#65a30d'; // Olive
      leafColor = '#84cc16';
      droop = 30; // Mild wilt
      scale = 0.9;
    } else if (water > 80) {
      color = '#15803d'; // Dark lush green
      leafColor = '#16a34a';
    }

    // Light Effects
    if (light < 20) {
      color = '#a3e635'; // Pale etiolated green
      leafColor = '#bef264';
      stemWidth = 3; // Thin, weak stem
      droop += 15;
    } else if (light < 40) {
      color = '#4ade80';
      stemWidth = 4;
    } else if (light > 80 && water > 40) {
      scale *= 1.1; // Vigorous growth
      stemWidth = 8;
    }
    
    // Death state
    if (water < 5 || light < 5) {
      color = '#78350f'; // Dead brown
      leafColor = '#451a03';
      droop = 85;
      scale = 0.7;
    }

    return { color, leafColor, droop, scale, stemWidth };
  };

  const health = getPlantHealth();
  const isHealthy = water > 20 && light > 20;

  // Environment Rendering
  const soilColor = water > 80 ? '#27190d' : water > 40 ? '#3f2b1c' : '#78553d'; // Darkens with water
  const skyBrightness = light / 100;

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

          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Droplets size={14} color="#60a5fa" /> Độ ẩm đất</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{water}%</span>
            </div>
            <input type="range" value={water} onChange={e => setWater(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#60a5fa' }} />
          </div>

          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Sun size={14} color="#fbbf24" /> Cường độ sáng</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{light}%</span>
            </div>
            <input type="range" value={light} onChange={e => setLight(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#fbbf24' }} />
          </div>

          {!isHealthy && stage > 0 && (
             <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#fca5a5' }}>
               <Info size={16} /> Cây đang héo mòn do thiếu nước hoặc thiếu sáng!
             </div>
          )}

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <button 
                onClick={handleNextStage}
                disabled={stage === 4 || !isHealthy}
                className="hover-glow"
                style={{ 
                  width: '100%', padding: '14px', borderRadius: '12px', background: !isHealthy ? 'rgba(239, 68, 68, 0.2)' : 'var(--accent-cyan)', 
                  color: !isHealthy ? '#fff' : '#000', fontWeight: 'bold', border: 'none', cursor: (stage === 4 || !isHealthy) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s'
                }}
             >
                {!isHealthy ? 'Môi trường quá kém' : (stage === 4 ? 'Đã hoàn thành chu kỳ' : 'Phát triển Giai đoạn tiếp')}
             </button>

             <button onClick={() => { setStage(0); setWater(50); setLight(50); }} className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--glass-border)', width: '100%' }}>
                <RefreshCcw size={16} /> Gieo lại hạt mới
             </button>
          </div>

          <div style={{ fontSize: '0.85rem', background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
             <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#fbbf24', fontSize: '1rem' }}>{stages[stage].name}</p>
             <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: '1.5' }}>{stages[stage].description}</p>
          </div>
        </div>

        {/* Observation Box */}
        <div className="glass-panel" style={{ borderRadius: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: `linear-gradient(to bottom, rgba(6, 78, 59, ${skyBrightness}), #022c22)` }}>
          {/* Sky / Environment Area */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
             
             {/* Dynamic Sun Visualization */}
             <div style={{ position: 'absolute', top: '40px', right: '40px', opacity: Math.max(0.2, skyBrightness), transform: `scale(${0.5 + skyBrightness * 0.5})`, transition: 'all 0.5s ease' }}>
                <Sun size={80} color="#fbbf24" style={{ filter: `drop-shadow(0 0 ${light}px #fbbf24)` }} />
             </div>

             {/* Plant Growth Rendering */}
             <div style={{ position: 'relative', zIndex: 2, transformOrigin: 'bottom center', transform: `scale(${health.scale}) rotate(${health.droop}deg)`, transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                {stage === 0 && (
                  <svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: 'translateY(20px)' }}>
                     <ellipse cx="20" cy="20" rx="8" ry="12" fill={health.color} stroke="#451a03" strokeWidth="2" />
                     <path d="M20,8 Q24,20 20,32" fill="none" stroke="#451a03" strokeWidth="1" opacity="0.5" />
                  </svg>
                )}
                {stage === 1 && (
                  <svg width="100" height="120" viewBox="0 0 100 120" style={{ overflow: 'visible' }}>
                    {/* Stem */}
                    <path d="M50,120 Q50,90 50,60" fill="none" stroke={health.color} strokeWidth={health.stemWidth} strokeLinecap="round" />
                    {/* Cotyledon Leaves */}
                    <path d="M50,60 Q30,50 20,40 Q40,40 50,60" fill={health.leafColor} />
                    <path d="M50,60 Q70,50 80,40 Q60,40 50,60" fill={health.leafColor} />
                  </svg>
                )}
                {stage === 2 && (
                  <svg width="150" height="250" viewBox="0 0 150 250" style={{ overflow: 'visible' }}>
                    {/* Main Stem */}
                    <path d="M75,250 Q70,150 75,50" fill="none" stroke={health.color} strokeWidth={health.stemWidth} strokeLinecap="round" />
                    {/* True Leaves */}
                    <g transform="translate(73, 180) rotate(-30)"><path d="M0,0 Q-30,-20 -50,0 Q-30,20 0,0" fill={health.leafColor} /></g>
                    <g transform="translate(77, 140) rotate(30)"><path d="M0,0 Q30,-20 50,0 Q30,20 0,0" fill={health.leafColor} /></g>
                    <g transform="translate(73, 100) rotate(-40)"><path d="M0,0 Q-25,-15 -40,0 Q-25,15 0,0" fill={health.leafColor} /></g>
                    <g transform="translate(77, 70) rotate(40)"><path d="M0,0 Q25,-15 40,0 Q25,15 0,0" fill={health.leafColor} /></g>
                    {/* Top Leaf */}
                    <path d="M75,50 Q65,30 75,20 Q85,30 75,50" fill={health.leafColor} />
                  </svg>
                )}
                {stage === 3 && (
                   <svg width="200" height="350" viewBox="0 0 200 350" style={{ overflow: 'visible' }}>
                    {/* Main Stem */}
                    <path d="M100,350 Q90,200 100,50" fill="none" stroke={health.color} strokeWidth={health.stemWidth} strokeLinecap="round" />
                    {/* True Leaves */}
                    <g transform="translate(97, 280) rotate(-20)"><path d="M0,0 Q-40,-20 -70,0 Q-40,20 0,0" fill={health.leafColor} /></g>
                    <g transform="translate(103, 220) rotate(20)"><path d="M0,0 Q40,-20 70,0 Q40,20 0,0" fill={health.leafColor} /></g>
                    <g transform="translate(97, 160) rotate(-30)"><path d="M0,0 Q-30,-15 -50,0 Q-30,15 0,0" fill={health.leafColor} /></g>
                    <g transform="translate(103, 100) rotate(30)"><path d="M0,0 Q30,-15 50,0 Q30,15 0,0" fill={health.leafColor} /></g>
                    {/* Flowers */}
                    <g transform="translate(100, 50)">
                       <circle cx="0" cy="0" r="10" fill="#fef08a" />
                       {[0, 72, 144, 216, 288].map(deg => (
                         <circle key={deg} cx={15 * Math.cos(deg * Math.PI / 180)} cy={15 * Math.sin(deg * Math.PI / 180)} r="12" fill={water > 20 ? '#f43f5e' : '#fda4af'} opacity="0.9" />
                       ))}
                    </g>
                    <g transform="translate(60, 160) scale(0.7)">
                       <circle cx="0" cy="0" r="10" fill="#fef08a" />
                       {[0, 72, 144, 216, 288].map(deg => (
                         <circle key={deg} cx={15 * Math.cos(deg * Math.PI / 180)} cy={15 * Math.sin(deg * Math.PI / 180)} r="12" fill={water > 20 ? '#f43f5e' : '#fda4af'} opacity="0.9" />
                       ))}
                    </g>
                  </svg>
                )}
                {stage === 4 && (
                   <svg width="200" height="350" viewBox="0 0 200 350" style={{ overflow: 'visible' }}>
                    {/* Main Stem */}
                    <path d="M100,350 Q90,200 100,50" fill="none" stroke={health.color} strokeWidth={health.stemWidth} strokeLinecap="round" />
                    {/* Leaves */}
                    <g transform="translate(97, 280) rotate(-20)"><path d="M0,0 Q-40,-20 -70,0 Q-40,20 0,0" fill={health.leafColor} /></g>
                    <g transform="translate(103, 220) rotate(20)"><path d="M0,0 Q40,-20 70,0 Q40,20 0,0" fill={health.leafColor} /></g>
                    {/* Aging leaves */}
                    <g transform="translate(97, 160) rotate(-40)"><path d="M0,0 Q-30,-15 -50,0 Q-30,15 0,0" fill={health.water < 50 ? '#ca8a04' : health.leafColor} /></g>
                    
                    {/* Fruits (Tomatoes) */}
                    <g transform="translate(100, 50)">
                       <path d="M0,0 Q-10,-10 -5,-20 Q10,-25 15,-10 Q20,5 0,0" fill="#166534" />
                       <circle cx="5" cy="-5" r="25" fill={water > 20 ? '#ef4444' : '#f87171'} style={{ filter: 'drop-shadow(0 5px 15px rgba(239,68,68,0.4))' }} />
                       <path d="M0,-30 L5,-5" fill="none" stroke={health.color} strokeWidth="3" />
                       <circle cx="-5" cy="-15" r="5" fill="#fca5a5" opacity="0.5" /> {/* Highlight */}
                    </g>
                    <g transform="translate(60, 160) scale(0.8)">
                       <circle cx="5" cy="-5" r="25" fill={water > 20 ? '#ef4444' : '#f87171'} style={{ filter: 'drop-shadow(0 5px 15px rgba(239,68,68,0.4))' }} />
                       <path d="M0,-30 L5,-5" fill="none" stroke={health.color} strokeWidth="3" />
                    </g>
                    <g transform="translate(130, 220) scale(0.6)">
                       <circle cx="5" cy="-5" r="25" fill={water > 20 ? '#f97316' : '#fdba74'} /> {/* Unripe fruit */}
                       <path d="M0,-30 L5,-5" fill="none" stroke={health.color} strokeWidth="3" />
                    </g>
                  </svg>
                )}
             </div>

             {/* Dynamic Ground Layer */}
             <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: soilColor, borderTop: `4px solid ${water > 60 ? '#1a0f08' : '#3f2b1c'}`, transition: 'all 0.5s' }}>
                {/* Soil texture / drops */}
                {water > 60 && (
                  <div style={{ position: 'absolute', top: '10px', left: '20%', width: '10px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px' }} />
                )}
                {water > 80 && (
                  <div style={{ position: 'absolute', top: '30px', left: '70%', width: '15px', height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px' }} />
                )}
             </div>
          </div>

          {/* Timeline Footer */}
          <div style={{ padding: '24px', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
             {stages.map((st, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <div style={{ 
                      width: '45px', height: '45px', borderRadius: '50%', background: i <= stage ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255,255,255,0.05)', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', border: i === stage ? '2px solid #fbbf24' : '1px solid transparent',
                      boxShadow: i === stage ? '0 0 15px rgba(251, 191, 36, 0.3)' : 'none', transition: 'all 0.3s'
                   }}>
                      {st.icon}
                   </div>
                   {i < 4 && <ArrowRight size={16} color="rgba(255,255,255,0.2)" />}
                </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlantCycleLab;
