import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  RefreshCcw, 
  BookOpen, 
  ChevronRight, 
  ArrowLeft, 
  Target, 
  Beaker,
  Search,
  Bookmark,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { curriculumData } from '../data/curriculumData';
import { useNavigate } from 'react-router-dom';

const Theory = () => {
  const navigate = useNavigate();
  const [activeTopic, setActiveTopic] = useState(curriculumData[0].topics[0]); // Default to first topic
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [expandedGrades, setExpandedGrades] = useState({ 'Sinh Học 10': true, 'Sinh Học 11': true, 'Sinh Học 12': true });

  const toggleGrade = (grade) => {
    setExpandedGrades(prev => ({ ...prev, [grade]: !prev[grade] }));
  };

  const handleSelect = (idx) => {
    if (!hasSubmitted) setSelectedOption(idx);
  };

  const currentOption = selectedOption !== null ? activeTopic.question.options[selectedOption] : null;

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: '#020617' }}>
      
      {/* 1. Navigation Sidebar */}
      <aside style={{ 
        width: '320px', height: '100%', borderRight: '1px solid rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: 'column', background: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontSize: '1rem', color: '#fff', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} color="var(--accent-cyan)" /> THƯ VIỆN LÝ THUYẾT
          </h2>
          <div style={{ 
            position: 'relative', display: 'flex', alignItems: 'center', 
            background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '8px 12px' 
          }}>
            <Search size={14} color="#64748b" />
            <input 
              placeholder="Tìm kiếm chuyên đề..." 
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: '0.85rem', marginLeft: '8px', outline: 'none', width: '100%' }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {curriculumData.map((gradeBlock, gIdx) => (
            <div key={gIdx} style={{ marginBottom: '8px' }}>
              <button 
                onClick={() => toggleGrade(gradeBlock.grade)}
                style={{ 
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', background: 'none', border: 'none', color: '#94a3b8',
                  fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', textAlign: 'left'
                }}
              >
                {gradeBlock.grade.toUpperCase()}
                {expandedGrades[gradeBlock.grade] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              
              {expandedGrades[gradeBlock.grade] && (
                <div style={{ marginTop: '4px' }}>
                  {gradeBlock.topics.map((topic, tIdx) => (
                    <button 
                      key={tIdx}
                      onClick={() => {
                        setActiveTopic(topic);
                        setHasSubmitted(false);
                        setSelectedOption(null);
                      }}
                      style={{ 
                        width: '100%', padding: '10px 16px', textAlign: 'left', borderRadius: '8px',
                        background: activeTopic?.id === topic.id ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                        border: 'none', color: activeTopic?.id === topic.id ? 'var(--accent-cyan)' : '#94a3b8',
                        fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
                        display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px'
                      }}
                    >
                      <div style={{ 
                        minWidth: '6px', height: '6px', borderRadius: '50%', 
                        background: activeTopic?.id === topic.id ? 'var(--accent-cyan)' : 'transparent' 
                      }} />
                      {topic.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main style={{ flex: 1, height: '100%', overflowY: 'auto', padding: '40px 60px', position: 'relative' }}>
        
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.85rem', marginBottom: '24px' }}>
          <span>Chương trình</span> <ChevronRight size={12} />
          <span>Lý thuyết trọng tâm</span> <ChevronRight size={12} />
          <span style={{ color: 'var(--accent-cyan)' }}>{activeTopic.name}</span>
        </div>

        <div style={{ maxWidth: '850px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, color: '#fff' }}>{activeTopic.name}</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-primary" style={{ padding: '8px 16px' }} onClick={() => navigate('/virtual-lab')}>
                <Beaker size={18} /> Lab 3D
              </button>
              <button style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>
                <Bookmark size={18} />
              </button>
            </div>
          </div>

          {/* Theory Sections */}
          <article style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#cbd5e1' }}>
            {activeTopic.theory.map((section, idx) => (
              <div key={idx} style={{ marginBottom: '48px' }}>
                <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '20px', fontWeight: 700 }}>
                  {section.title}
                </h3>
                <p style={{ marginBottom: '24px' }}>{section.content}</p>
                
                {idx === 0 && (
                  <div style={{ 
                    padding: '24px', background: 'rgba(0, 240, 255, 0.03)', 
                    borderLeft: '4px solid var(--accent-cyan)', borderRadius: '0 12px 12px 0',
                    marginBottom: '32px' 
                  }}>
                    <h4 style={{ color: 'var(--accent-cyan)', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                      <Info size={18} /> CÓ THỂ BẠN CHƯA BIẾT?
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontStyle: 'italic', color: '#94a3b8' }}>
                      Cấu trúc khảm động giúp tế bào thích nghi cực nhanh với sự thay đổi của môi trường. 
                      Đây là chìa khóa để sự sống duy trì được tính ổn định (Homeostasis).
                    </p>
                  </div>
                )}
              </div>
            ))}
          </article>

        </div>
      </main>

    </div>
  );
};

export default Theory;
