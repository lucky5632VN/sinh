import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Microscope, 
  Brain, 
  Dna, 
  Activity, 
  ArrowRight, 
  Sparkles,
  FlaskConical,
  TestTube2
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      id: 'cell',
      title: 'Sinh học Tế bào',
      desc: 'Mô phỏng động lực học màng tế bào, hoạt động của enzyme và các phân tử vi mô.',
      icon: <Microscope size={28} color="#00f0ff" />,
      color: '#00f0ff',
      bg: 'rgba(0, 240, 255, 0.1)',
      path: '/virtual-lab'
    },
    {
      id: 'anatomy',
      title: 'Sinh lý & Giải phẫu',
      desc: 'Khám phá các hệ cơ quan, phản xạ thần kinh và hoạt động của não bộ.',
      icon: <Brain size={28} color="#8b5cf6" />,
      color: '#8b5cf6',
      bg: 'rgba(139, 92, 246, 0.1)',
      path: '/virtual-lab'
    },
    {
      id: 'genetics',
      title: 'Di truyền học',
      desc: 'Thực nghiệm quy luật Mendel, chu kỳ thực vật và sao chép ADN.',
      icon: <Dna size={28} color="#00ffa3" />,
      color: '#00ffa3',
      bg: 'rgba(0, 255, 163, 0.1)',
      path: '/virtual-lab'
    }
  ];

  return (
    <div style={{ padding: '40px', height: '100%', overflowY: 'auto', position: 'relative' }}>
      
      {/* Background Decorative Elements */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
        filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', left: '-50px', width: '250px', height: '250px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Hero Section */}
        <div className="animate-slide-up" style={{ marginBottom: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '8px', background: 'rgba(0, 240, 255, 0.1)', borderRadius: '12px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
                <FlaskConical color="#00f0ff" size={24} />
              </div>
              <h2 style={{ color: '#00f0ff', margin: 0, fontSize: '1.2rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
                VIRTUAL LABORATORY
              </h2>
            </div>
            <h1 className="text-glow" style={{ fontSize: '3rem', margin: '0 0 16px 0', fontWeight: 800, lineHeight: 1.2 }}>
              Trung tâm Điều khiển <br/>
              <span className="text-gradient">BioSTEM AI</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.6, margin: 0 }}>
              Khám phá thế giới vi mô thông qua các bài thực hành mô phỏng 3D tương tác cao. Chọn một phân hệ để bắt đầu thí nghiệm.
            </p>
          </div>
        </div>

        {/* Featured Experiment */}
        <div 
          className="glass-panel-heavy animate-slide-up hover-glow" 
          style={{ 
            padding: '32px', borderRadius: '24px', marginBottom: '48px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(4, 13, 18, 0.9) 0%, rgba(14, 30, 42, 0.8) 100%)',
            borderLeft: '4px solid #8b5cf6',
            cursor: 'pointer', transition: 'all 0.3s ease',
            animationDelay: '0.1s'
          }}
          onClick={() => navigate('/virtual-lab/taste')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '20px', 
              background: 'rgba(139, 92, 246, 0.15)', display: 'flex', 
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
            }}>
              <Activity color="#8b5cf6" size={40} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Sparkles size={16} color="#f59e0b" />
                <span style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Thí nghiệm nổi bật</span>
              </div>
              <h2 style={{ margin: '0 0 8px 0', fontSize: '1.8rem', color: '#fff' }}>Khám Phá Vị Giác</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1rem' }}>
                Mô phỏng chi tiết các nhú vị giác, sự truyền xung thần kinh và cơ chế nhận biết mùi vị của lưỡi người.
              </p>
            </div>
          </div>
          <div style={{ 
            padding: '16px 32px', background: 'rgba(139, 92, 246, 0.2)', 
            borderRadius: '12px', color: '#fff', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '8px',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.4)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            Vào Lab <ArrowRight size={20} />
          </div>
        </div>

        {/* Categories Grid */}
        <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <TestTube2 color="#00ffa3" /> Phân Hệ Thí Nghiệm
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', animationDelay: '0.2s' }} className="animate-slide-up">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className="glass-panel" 
              style={{ 
                padding: '32px', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
                borderRadius: '24px', position: 'relative', overflow: 'hidden',
                transform: hoveredCard === cat.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: hoveredCard === cat.id ? `0 15px 30px rgba(0,0,0,0.4), 0 0 15px ${cat.bg}` : 'var(--shadow-panel)',
                border: hoveredCard === cat.id ? `1px solid ${cat.color}` : 'var(--glass-border)'
              }}
              onMouseEnter={() => setHoveredCard(cat.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(cat.path)}
            >
              {/* Card Hover Gradient Background */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                background: `radial-gradient(circle at top right, ${cat.bg} 0%, transparent 60%)`,
                opacity: hoveredCard === cat.id ? 1 : 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div style={{ 
                    width: '64px', height: '64px', borderRadius: '16px', 
                    background: cat.bg, display: 'flex', 
                    alignItems: 'center', justifyContent: 'center',
                    border: `1px solid rgba(255,255,255,0.1)`,
                    animation: hoveredCard === cat.id ? 'float 3s ease-in-out infinite' : 'none'
                  }}>
                    {cat.icon}
                  </div>
                  
                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    transform: hoveredCard === cat.id ? 'translateX(0) rotate(0deg)' : 'translateX(-10px) rotate(-45deg)',
                    opacity: hoveredCard === cat.id ? 1 : 0,
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}>
                    <ArrowRight color={cat.color} size={20} />
                  </div>
                </div>
                
                <h2 style={{ marginBottom: '12px', fontSize: '1.5rem', color: '#fff' }}>{cat.title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;
