import React, { useState } from 'react';
import { ArrowLeft, Copyright, Eye, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const ColorVisionLab = () => {
  const navigate = useNavigate();
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(255);
  const [blue, setBlue] = useState(0);

  const mixedColor = `rgb(${red}, ${green}, ${blue})`;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', position: 'relative' }}>


       <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid var(--glass-border)', zIndex: 10, background: 'rgba(15,23,42,0.8)' }}>
          <button onClick={() => navigate('/virtual-lab')} className="btn-primary" style={{ border: 'none', background: 'rgba(255,255,255,0.1)' }}>
            <ArrowLeft size={16} /> Dashboard
          </button>
          <div>
            <h1 className="text-glow" style={{ margin: 0, color: '#ec4899', fontSize: '1.5rem' }}>Thị Giác Màu Sắc (Native 2D)</h1>
            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
               Khảo sát nguyên lý hòa trộn quang phổ của 3 thụ thể Tế bào hình nón trong mắt người mà không cần Iframe.
            </p>
          </div>
       </div>

       <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'stretch', padding: '40px', gap: '80px', overflow: 'hidden' }}>
          
          {/* Hệ Thống Đèn Pin Laser (Nguồn phát tín hiệu chuẩn RGB) */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '60px', maxWidth: '350px' }}>
             
             {/* Đèn Đỏ */}
             <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '24px', border: '1px solid rgba(239,68,68,0.2)' }}>
                <div style={{ width: '64px', height: '64px', background: '#7f1d1d', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 0 20px rgba(239,68,68,${red/255})`, zIndex: 2 }}>
                   <Lightbulb color="#ef4444" size={32} />
                </div>
                <div style={{ flex: 1, zIndex: 2 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444', marginBottom: '12px', fontWeight: 'bold' }}><span>Sóng Đỏ (Red)</span><span>{Math.round((red/255)*100)}%</span></div>
                   <input type="range" min="0" max="255" value={red} onChange={e => setRed(e.target.value)} style={{ width: '100%', accentColor: '#ef4444', height: '8px', cursor: 'grab' }} />
                </div>
                {/* Tia Laser Phóng 2D bằng Gradient - Đâm xuyên qua phải */}
                <div style={{ position: 'absolute', left: '80px', width: '200vw', height: '100%', background: `linear-gradient(to right, rgba(${red},0,0,0.8) 0%, rgba(${red},0,0,0) 80%)`, pointerEvents: 'none', zIndex: 1, mixBlendMode: 'screen', borderRadius: '0 50vw 50vw 0', transformOrigin: 'left center' }} />
             </div>

             {/* Đèn Lục */}
             <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '24px', border: '1px solid rgba(34,197,94,0.2)' }}>
                <div style={{ width: '64px', height: '64px', background: '#14532d', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 0 20px rgba(34,197,94,${green/255})`, zIndex: 2 }}>
                   <Lightbulb color="#22c55e" size={32} />
                </div>
                <div style={{ flex: 1, zIndex: 2 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', color: '#22c55e', marginBottom: '12px', fontWeight: 'bold' }}><span>Sóng Lục (Green)</span><span>{Math.round((green/255)*100)}%</span></div>
                   <input type="range" min="0" max="255" value={green} onChange={e => setGreen(e.target.value)} style={{ width: '100%', accentColor: '#22c55e', height: '8px', cursor: 'grab' }} />
                </div>
                <div style={{ position: 'absolute', left: '80px', width: '200vw', height: '100%', background: `linear-gradient(to right, rgba(0,${green},0,0.8) 0%, rgba(0,${green},0,0) 80%)`, pointerEvents: 'none', zIndex: 1, mixBlendMode: 'screen', borderRadius: '0 50vw 50vw 0', transformOrigin: 'left center' }} />
             </div>

             {/* Đèn Lam */}
             <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '24px', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div style={{ width: '64px', height: '64px', background: '#1e3a8a', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: `0 0 20px rgba(59,130,246,${blue/255})`, zIndex: 2 }}>
                   <Lightbulb color="#3b82f6" size={32} />
                </div>
                <div style={{ flex: 1, zIndex: 2 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', color: '#3b82f6', marginBottom: '12px', fontWeight: 'bold' }}><span>Sóng Lam (Blue)</span><span>{Math.round((blue/255)*100)}%</span></div>
                   <input type="range" min="0" max="255" value={blue} onChange={e => setBlue(e.target.value)} style={{ width: '100%', accentColor: '#3b82f6', height: '8px', cursor: 'grab' }} />
                </div>
                <div style={{ position: 'absolute', left: '80px', width: '200vw', height: '100%', background: `linear-gradient(to right, rgba(0,0,${blue},0.8) 0%, rgba(0,0,${blue},0) 80%)`, pointerEvents: 'none', zIndex: 1, mixBlendMode: 'screen', borderRadius: '0 50vw 50vw 0', transformOrigin: 'left center' }} />
             </div>

          </div>

          {/* Vùng Võng Mạc Kết Hợp và Não Cảm Thụ */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', position: 'relative', zIndex: 10 }}>
             {/* Bộ phận não bộ nhận thức */}
             <div className="glass-panel" style={{ 
                 width: '360px', height: '360px', borderRadius: '50%', 
                 display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                 background: 'rgba(15,23,42,0.95)', border: `8px solid ${mixedColor}`, 
                 boxShadow: `0 0 80px ${mixedColor}, inset 0 0 60px ${mixedColor}`, 
                 transition: 'all 0.1s linear', gap: '20px' 
             }}>
                <Eye size={80} color="#fff" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>Võng mạc Ghi nhận</span>
                  <span style={{ fontSize: '2.5rem', fontWeight: '900', color: mixedColor, textShadow: '0 0 20px currentColor', textTransform: 'uppercase', letterSpacing: '2px' }}>
                    {new THREE.Color(mixedColor).getHexString()}
                  </span>
                </div>
                
                {/* Visualizer Block */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `rgb(${red},0,0)`, border: '1px solid #fff' }} />
                  <span style={{ fontWeight: 'bold' }}>+</span>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `rgb(0,${green},0)`, border: '1px solid #fff' }} />
                  <span style={{ fontWeight: 'bold' }}>+</span>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `rgb(0,0,${blue})`, border: '1px solid #fff' }} />
                  <span style={{ fontWeight: 'bold' }}>=</span>
                  <div style={{ width: '80px', height: '40px', borderRadius: '20px', background: mixedColor, border: '2px solid #fff' }} />
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};
export default ColorVisionLab;
