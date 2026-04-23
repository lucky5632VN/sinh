import React, { useState } from 'react';
import { ArrowLeft, RefreshCcw, FlaskConical, Beaker, Info, Dna } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MendelLab = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  
  // Genotype: AA (Yellow), aa (Green), BB (Smooth), bb (Wrinkled)
  const [p1, setP1] = useState('AA');
  const [p2, setP2] = useState('aa');

  const solvePunnett = (g1, g2) => {
    if (!g1 || !g2 || g1.length !== 2 || g2.length !== 2) return ['??', '??', '??', '??'];
    const results = [];
    for (let char1 of g1) {
      for (let char2 of g2) {
        // Sort uppercase first, lowercase second
        let genotype = [char1, char2].sort((a, b) => {
          if (a.toLowerCase() === b.toLowerCase()) return a < b ? -1 : 1;
          return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
        }).join('');
        results.push(genotype);
      }
    }
    return results;
  };

  const getPhenotype = (genotype) => {
    if (!genotype || genotype.length < 2) return { name: 'Lỗi', color1: '#475569', color2: '#1e293b', border: '#94a3b8' };
    const hasDominant = /[A-Z]/.test(genotype);
    if (genotype.toLowerCase().includes('b')) {
      return hasDominant 
        ? { name: 'Trơn', color1: '#f8fafc', color2: '#cbd5e1', border: '#e2e8f0' } 
        : { name: 'Nhăn', color1: '#94a3b8', color2: '#475569', border: '#cbd5e1' };
    }
    // Default to A (Yellow/Green)
    return hasDominant 
      ? { name: 'Vàng', color1: '#fde047', color2: '#eab308', border: '#facc15' } 
      : { name: 'Xanh', color1: '#4ade80', color2: '#16a34a', border: '#22c55e' };
  };

  const PeaRender = ({ genotype, size = 60 }) => {
    const p = getPhenotype(genotype);
    const isWrinkled = genotype.toLowerCase().includes('b') && !/[A-Z]/.test(genotype);
    
    return (
      <div style={{
        width: size,
        height: size,
        borderRadius: isWrinkled ? '40% 60% 70% 30% / 40% 50% 60% 50%' : '50%',
        background: `radial-gradient(circle at 30% 30%, ${p.color1}, ${p.color2})`,
        border: `2px solid ${p.border}`,
        boxShadow: `inset -5px -5px 15px rgba(0,0,0,0.3), 0 0 20px ${p.border}66`,
        margin: '0 auto 12px',
        transition: 'all 0.3s ease'
      }} />
    );
  };

  const f1Generation = solvePunnett(p1, p2);
  const f1Genotype = f1Generation[0];
  const f2Generation = solvePunnett(f1Genotype, f1Genotype);

  // Calculate F2 Stats
  const f2GenotypeCounts = {};
  f2Generation.forEach(g => {
    f2GenotypeCounts[g] = (f2GenotypeCounts[g] || 0) + 1;
  });
  
  const f2PhenotypeCounts = {};
  f2Generation.forEach(g => {
    const pheno = getPhenotype(g).name;
    f2PhenotypeCounts[pheno] = (f2PhenotypeCounts[pheno] || 0) + 1;
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', color: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid var(--border-color)', background: 'var(--glass-bg)', backdropFilter: 'blur(10px)' }}>
        <button onClick={() => navigate('/virtual-lab')} className="action-btn" style={{ padding: '8px 16px', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '8px', border: '1px solid rgba(0, 240, 255, 0.2)', color: 'var(--accent-cyan)' }}>
          <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Dashboard
        </button>
        <div>
          <h1 className="text-glow" style={{ margin: 0, color: 'var(--accent-green)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
             <Dna size={24} /> Phân Tích Di Truyền Mendel
          </h1>
          <p style={{ color: 'var(--text-secondary)', margin: '6px 0 0 0', fontSize: '0.95rem' }}>
            Khám phá quy luật Phân ly. Nhập kiểu gen dòng thuần hoặc dị hợp tử để quan sát kết quả di truyền.
          </p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', padding: '24px', overflow: 'hidden' }}>
        
        {/* Sidebar Controls */}
        <div className="glass-panel-heavy" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.15rem', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '10px', margin: 0 }}>
            <FlaskConical size={20} /> Cấu hình Lai (Thế hệ P)
          </h2>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
             <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '12px', fontWeight: 500 }}>Nhập kiểu gen (VD: Aa, BB, bb)</label>
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <input 
                  type="text" 
                  maxLength={2}
                  value={p1} 
                  onChange={e => setP1(e.target.value.replace(/[^a-zA-Z]/g, ''))} 
                  style={{ width: '80px', height: '45px', background: 'rgba(0, 255, 163, 0.05)', border: '2px solid var(--accent-green)', borderRadius: '8px', color: '#fff', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px', outline: 'none', transition: 'all 0.2s', boxShadow: '0 0 10px rgba(0, 255, 163, 0.1)' }} 
                />
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>X</span>
                <input 
                  type="text" 
                  maxLength={2}
                  value={p2} 
                  onChange={e => setP2(e.target.value.replace(/[^a-zA-Z]/g, ''))} 
                  style={{ width: '80px', height: '45px', background: 'rgba(0, 255, 163, 0.05)', border: '2px solid var(--accent-green)', borderRadius: '8px', color: '#fff', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px', outline: 'none', transition: 'all 0.2s', boxShadow: '0 0 10px rgba(0, 255, 163, 0.1)' }} 
                />
             </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ background: 'rgba(0, 240, 255, 0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(0, 240, 255, 0.2)'}}>
               <p style={{ margin: '0 0 12px 0', fontWeight: '600', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <Info size={16} /> Ghi chú phân tích:
               </p>
               <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 <li><strong style={{color:'#fff'}}>A/a</strong>: Quy định màu sắc (Vàng trội, Xanh lặn)</li>
                 <li><strong style={{color:'#fff'}}>B/b</strong>: Quy định vỏ hạt (Trơn trội, Nhăn lặn)</li>
                 <li>Chỉ lai các alen cùng locus gen (Vd: Aa x aa) để đảm bảo mô hình phân ly đơn tính.</li>
               </ul>
            </div>
          </div>

          <button 
             onClick={() => { setP1('AA'); setP2('aa'); }}
             className="btn-primary" 
             style={{ width: '100%', padding: '14px', fontSize: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
             onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
             onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          >
             <RefreshCcw size={16} style={{ marginRight: '8px' }} /> Đặt lại thông số
          </button>
        </div>

        {/* Lab Workspace */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto', paddingRight: '8px' }}>
          
          {/* STEP 1: P to F1 */}
          <section className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ margin: '0 0 32px 0', color: 'var(--accent-cyan)', fontSize: '1.2rem', letterSpacing: '1px' }}>BƯỚC 1: LAI THẾ HỆ P → TẠO F1</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '20px', flexWrap: 'wrap' }}>
               <div style={{ textAlign: 'center' }}>
                 <PeaRender genotype={p1} size={80} />
                 <strong style={{ fontSize: '1.2rem' }}>P1: <span style={{ color: 'var(--accent-green)' }}>{p1}</span></strong>
                 <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{getPhenotype(p1).name}</div>
               </div>
               <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.2)' }}>X</div>
               <div style={{ textAlign: 'center' }}>
                 <PeaRender genotype={p2} size={80} />
                 <strong style={{ fontSize: '1.2rem' }}>P2: <span style={{ color: 'var(--accent-green)' }}>{p2}</span></strong>
                 <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{getPhenotype(p2).name}</div>
               </div>
               
               <div style={{ fontSize: '2.5rem', color: 'rgba(0, 240, 255, 0.5)' }}>➔</div>
               
               <div style={{ textAlign: 'center', background: 'rgba(0, 240, 255, 0.05)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(0, 240, 255, 0.3)', boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)' }}>
                 <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    {f1Generation.slice(0, 1).map((g, i) => (
                      <PeaRender key={i} genotype={g} size={80} />
                    ))}
                 </div>
                 <div style={{ marginTop: '16px' }}>
                   <strong style={{ fontSize: '1.3rem', color: '#fff' }}>F1: {f1Genotype}</strong>
                   <div style={{ fontSize: '0.95rem', color: 'var(--accent-cyan)', fontWeight: 'bold', marginTop: '4px' }}>100% {getPhenotype(f1Genotype).name}</div>
                 </div>
               </div>
            </div>
          </section>

          {/* STEP 2: F1 to F2 (Punnett Square) */}
          <section className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
             <h3 style={{ margin: '0 0 32px 0', color: 'var(--accent-purple)', fontSize: '1.2rem', letterSpacing: '1px' }}>
               BƯỚC 2: TỰ THỤ PHẤN F1 ({f1Genotype} x {f1Genotype}) → PHÂN LY F2
             </h3>
             <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.5fr) 1fr', gap: '32px' }}>
                
                {/* Punnett Table */}
                <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                   <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                      <thead>
                        <tr>
                          <th style={{ borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: '20px', background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                              <span style={{ color: 'var(--accent-cyan)' }}>♂</span> \ <span style={{ color: 'var(--accent-purple)' }}>♀</span>
                            </div>
                          </th>
                          <th style={{ borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: '20px', fontSize: '1.3rem', color: 'var(--accent-green)' }}>{f1Genotype[0]}</th>
                          <th style={{ borderBottom: '1px solid var(--border-color)', padding: '20px', fontSize: '1.3rem', color: 'var(--accent-cyan)' }}>{f1Genotype[1]}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: '20px', fontWeight: 'bold', fontSize: '1.3rem', color: 'var(--accent-green)' }}>{f1Genotype[0]}</td>
                          <td style={{ borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', padding: '24px', background: 'rgba(255,255,255,0.02)' }}>
                             <PeaRender genotype={f2Generation[0]} size={50} />
                             <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '1px' }}>{f2Generation[0]}</span>
                          </td>
                          <td style={{ borderBottom: '1px solid var(--border-color)', padding: '24px' }}>
                             <PeaRender genotype={f2Generation[1]} size={50} />
                             <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '1px' }}>{f2Generation[1]}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ borderRight: '1px solid var(--border-color)', padding: '20px', fontWeight: 'bold', fontSize: '1.3rem', color: 'var(--accent-cyan)' }}>{f1Genotype[1]}</td>
                          <td style={{ borderRight: '1px solid var(--border-color)', padding: '24px' }}>
                             <PeaRender genotype={f2Generation[2]} size={50} />
                             <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '1px' }}>{f2Generation[2]}</span>
                          </td>
                          <td style={{ padding: '24px', background: 'rgba(255,255,255,0.02)' }}>
                             <PeaRender genotype={f2Generation[3]} size={50} />
                             <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '1px' }}>{f2Generation[3]}</span>
                          </td>
                        </tr>
                      </tbody>
                   </table>
                </div>

                {/* Stats Panels */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                   <div style={{ background: 'rgba(0, 255, 163, 0.05)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 255, 163, 0.2)' }}>
                      <h4 style={{ margin: '0 0 16px 0', color: 'var(--accent-green)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Tỉ lệ Kiểu Gen F2
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {Object.entries(f2GenotypeCounts).map(([geno, count]) => (
                          <div key={geno} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '10px 16px', borderRadius: '8px' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '1px' }}>{count} {geno}</span> 
                            <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>{count * 25}%</span>
                          </div>
                        ))}
                      </div>
                   </div>

                   <div style={{ background: 'rgba(0, 240, 255, 0.05)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                      <h4 style={{ margin: '0 0 16px 0', color: 'var(--accent-cyan)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Tỉ lệ Kiểu Hình F2
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {Object.entries(f2PhenotypeCounts).map(([pheno, count]) => (
                          <div key={pheno} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '10px 16px', borderRadius: '8px' }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{count} {pheno}</span> 
                            <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{count * 25}%</span>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
             </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default MendelLab;

