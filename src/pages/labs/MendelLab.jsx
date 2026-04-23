import React, { useState } from 'react';
import { ArrowLeft, RefreshCcw, FlaskConical, Beaker, Info, CheckCircle, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MendelLab = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Select Parents, 2: F1 result, 3: F2 Punnett
  
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
    if (!genotype || genotype.length < 2) return { name: 'Lỗi', color: '#475569' };
    const hasDominant = /[A-Z]/.test(genotype);
    if (genotype.toLowerCase().includes('b')) {
      return hasDominant ? { name: 'Trơn', color: '#e2e8f0' } : { name: 'Nhăn', color: '#64748b' };
    }
    // Default to A (Yellow/Green)
    return hasDominant ? { name: 'Vàng', color: '#fbbf24' } : { name: 'Xanh', color: '#22c55e' };
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
      <div style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid var(--glass-border)', background: 'rgba(15,23,42,0.8)' }}>
        <button onClick={() => navigate('/virtual-lab')} className="btn-primary" style={{ border: 'none', background: 'rgba(255,255,255,0.1)' }}>
          <ArrowLeft size={16} /> Dashboard
        </button>
        <div>
          <h1 className="text-glow" style={{ margin: 0, color: '#a3e635', fontSize: '1.4rem' }}>Thí Nghiệm Di Truyền Mendel</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>
            Khám phá quy luật Phân ly trên giống đậu Hà Lan. Nhập kiểu gen tùy ý (VD: Aa, BB, bb).
          </p>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', padding: '24px', overflow: 'hidden' }}>
        
        {/* Sidebar Controls */}
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '1.1rem', color: '#a3e635', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FlaskConical size={18} /> Cấu hình Thí nghiệm
          </h2>

          <div>
             <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Thế hệ P (Nhập 2 ký tự: A/a hoặc B/b)</label>
             <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  maxLength={2}
                  value={p1} 
                  onChange={e => setP1(e.target.value.replace(/[^a-zA-Z]/g, ''))} 
                  style={{ flex: 1, padding: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff', textAlign: 'center', fontSize: '1.1rem', letterSpacing: '2px' }} 
                />
                <span style={{ alignSelf: 'center' }}>X</span>
                <input 
                  type="text" 
                  maxLength={2}
                  value={p2} 
                  onChange={e => setP2(e.target.value.replace(/[^a-zA-Z]/g, ''))} 
                  style={{ flex: 1, padding: '8px', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: '#fff', textAlign: 'center', fontSize: '1.1rem', letterSpacing: '2px' }} 
                />
             </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ background: 'rgba(163, 230, 53, 0.1)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(163, 230, 53, 0.3)' , fontSize: '0.85rem'}}>
               <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#a3e635' }}>Ghi chú khoa học:</p>
               <ul style={{ margin: 0, paddingLeft: '16px', color: 'var(--text-secondary)' }}>
                 <li>Aa / aA: Tính trạng màu hạt (Vàng/Xanh)</li>
                 <li>Bb / bB: Tính trạng vỏ hạt (Trơn/Nhăn)</li>
                 <li>Viết hoa là gen trội. Khuyến cáo lai cùng 1 loại gen (A lai với A).</li>
               </ul>
            </div>
          </div>

          <button 
             onClick={() => { setStep(1); setP1('AA'); setP2('aa'); }}
             className="btn-primary" style={{ width: '100%', background: 'rgba(255,255,255,0.05)' }}
          >
             <RefreshCcw size={16} /> Tái lập Thí nghiệm
          </button>
        </div>

        {/* Lab Workspace */}
        <div className="glass-panel" style={{ padding: '32px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '40px', overflowY: 'auto' }}>
          
          {/* STEP 1: P to F1 */}
          <section>
            <h3 style={{ marginBottom: '24px', color: 'var(--accent-cyan)' }}>BƯỚC 1: LAI THẾ HỆ P → TẠO F1</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px' }}>
               <div style={{ textAlign: 'center' }}>
                 <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: getPhenotype(p1).color, margin: '0 auto 12px', boxShadow: `0 0 20px ${getPhenotype(p1).color}66` }} />
                 <strong>P1: {p1}</strong>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{getPhenotype(p1).name}</div>
               </div>
               <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>X</div>
               <div style={{ textAlign: 'center' }}>
                 <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: getPhenotype(p2).color, margin: '0 auto 12px', boxShadow: `0 0 20px ${getPhenotype(p2).color}66` }} />
                 <strong>P2: {p2}</strong>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{getPhenotype(p2).name}</div>
               </div>
               <div style={{ fontSize: '2rem' }}>➞</div>
               <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', border: '1px solid var(--accent-cyan)' }}>
                 <div style={{ display: 'flex', gap: '10px' }}>
                    {f1Generation.slice(0, 1).map((g, i) => (
                      <div key={i} style={{ width: '50px', height: '50px', borderRadius: '50%', background: getPhenotype(g).color, boxShadow: `0 0 15px ${getPhenotype(g).color}99` }} />
                    ))}
                 </div>
                 <div style={{ marginTop: '12px' }}>
                   <strong>F1: {f1Genotype}</strong>
                   <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{getPhenotype(f1Genotype).name}</div>
                 </div>
               </div>
            </div>
          </section>

          {/* STEP 2: F1 to F2 (Punnett Square) */}
          <section>
             <h3 style={{ marginBottom: '24px', color: '#fbbf24' }}>BƯỚC 2: TỰ THỤ PHẤN F1 ({f1Genotype} x {f1Genotype}) → PHÂN LY F2</h3>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px' }}>
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '24px', borderRadius: '16px' }}>
                   <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid rgba(255,255,255,0.1)' }}>
                      <thead>
                        <tr>
                          <th style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '15px', background: 'rgba(255,255,255,0.05)' }}>♂ \ ♀</th>
                          <th style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '15px', color: '#fbbf24' }}>{f1Genotype[0]}</th>
                          <th style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '15px', color: '#22c55e' }}>{f1Genotype[1]}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '20px', textAlign: 'center', fontWeight: 'bold', color: '#fbbf24' }}>{f1Genotype[0]}</td>
                          <td style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '20px', textAlign: 'center' }}>
                             <div style={{ width: '30px', height: '30px', background: getPhenotype(f2Generation[0]).color, borderRadius: '50%', margin: '0 auto 8px' }} />
                             <span style={{ fontWeight: '900', fontSize: '1.2rem' }}>{f2Generation[0]}</span>
                          </td>
                          <td style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '20px', textAlign: 'center' }}>
                             <div style={{ width: '30px', height: '30px', background: getPhenotype(f2Generation[1]).color, borderRadius: '50%', margin: '0 auto 8px' }} />
                             <span style={{ fontWeight: '900', fontSize: '1.2rem' }}>{f2Generation[1]}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '20px', textAlign: 'center', fontWeight: 'bold', color: '#22c55e' }}>{f1Genotype[1]}</td>
                          <td style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '20px', textAlign: 'center' }}>
                             <div style={{ width: '30px', height: '30px', background: getPhenotype(f2Generation[2]).color, borderRadius: '50%', margin: '0 auto 8px' }} />
                             <span style={{ fontWeight: '900', fontSize: '1.2rem' }}>{f2Generation[2]}</span>
                          </td>
                          <td style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '20px', textAlign: 'center' }}>
                             <div style={{ width: '30px', height: '30px', background: getPhenotype(f2Generation[3]).color, borderRadius: '50%', margin: '0 auto 8px' }} />
                             <span style={{ fontWeight: '900', fontSize: '1.2rem' }}>{f2Generation[3]}</span>
                          </td>
                        </tr>
                      </tbody>
                   </table>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                   <div style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#fbbf24' }}>Tỉ lệ Kiểu Gen F2:</h4>
                      {Object.entries(f2GenotypeCounts).map(([geno, count]) => (
                        <p key={geno} style={{ margin: '4px 0', display: 'flex', justifyContent: 'space-between' }}>
                          <span>{count} {geno}</span> 
                          <span style={{ color: 'var(--text-muted)' }}>{count * 25}%</span>
                        </p>
                      ))}
                   </div>

                   <div style={{ background: 'rgba(0,0,0,0.5)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                      <h4 style={{ margin: '0 0 12px 0', color: '#22c55e' }}>Tỉ lệ Kiểu Hình F2:</h4>
                      {Object.entries(f2PhenotypeCounts).map(([pheno, count]) => (
                        <p key={pheno} style={{ margin: '4px 0', display: 'flex', justifyContent: 'space-between' }}>
                          <span>{count} {pheno}</span> 
                          <span style={{ color: 'var(--text-muted)' }}>{count * 25}%</span>
                        </p>
                      ))}
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
