import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, RefreshCcw, TrendingUp, BookOpen, ChevronRight, ArrowLeft, Target, Beaker } from 'lucide-react';
import { curriculumData } from '../data/curriculumData';
import { useNavigate } from 'react-router-dom';

const Theory = () => {
  const navigate = useNavigate();
  // Store the active topic object instead of just string ID
  const [activeTopic, setActiveTopic] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Màn hình 1: Danh sách Lý thuyết & Chương trình (Curriculum)
  if (!activeTopic) {
    return (
      <div style={{ padding: '32px', height: '100%', overflowY: 'auto' }}>
        <h1 className="text-glow" style={{ marginBottom: '8px' }}>Hệ Thống Lý Thuyết AI Trọng Tâm</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Tuyển chọn mục tiêu môn Sinh Học từ lớp 10 đến lớp 12. Hãy chọn một chuyên đề để học lý thuyết hoặc kiểm tra lỗ hổng kiến thức.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {curriculumData.map((gradeBlock, gIdx) => (
            <div key={gIdx} className="glass-panel" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <span style={{ 
                  background: 'rgba(0,0,0,0.3)', padding: '6px 12px', 
                  borderRadius: '16px', color: gradeBlock.color, fontWeight: 'bold' 
                }}>
                  {gradeBlock.grade}
                </span>
                <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{gradeBlock.title}</h2>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {gradeBlock.topics.map((topic, tIdx) => (
                  <button 
                    key={tIdx}
                    onClick={() => setActiveTopic(topic)}
                    className="glass-panel-heavy"
                    style={{ 
                      padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      border: 'var(--glass-border)', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                      textAlign: 'left', color: 'var(--text-primary)', transition: 'all 0.2s', background: 'transparent'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = gradeBlock.color; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.15)'; e.currentTarget.style.background = 'transparent' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <BookOpen size={18} color="var(--text-secondary)" />
                      <span style={{ fontSize: '0.95rem' }}>{topic.name}</span>
                    </div>
                    <ChevronRight size={18} color="var(--text-secondary)" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Màn hình 2: Hiển thị bài học cho chuyên đề đã chọn
  const handleSelect = (idx) => {
    if (!hasSubmitted) setSelectedOption(idx);
  };

  const currentOption = selectedOption !== null ? activeTopic.question.options[selectedOption] : null;

  return (
    <div style={{ padding: '32px', height: '100%', overflowY: 'auto' }}>
      <button 
        onClick={() => { setActiveTopic(null); setHasSubmitted(false); setSelectedOption(null); }}
        className="btn-primary" 
        style={{ marginBottom: '24px', padding: '6px 16px', border: 'none', background: 'rgba(0,0,0,0.3)' }}
      >
        <ArrowLeft size={16} /> Quay lại cấu trúc chương trình
      </button>

      <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 className="text-glow" style={{ margin: 0 }}>{activeTopic.name}</h1>
      </div>

      {/* TÓM TẮT LÝ THUYẾT SECTION - Rendern động từ data */}
      <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', background: 'rgba(9, 20, 28, 0.85)' }}>
        <h2 style={{ color: 'var(--accent-cyan)', marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <BookOpen size={24} /> Bách Khoa Toàn Thư (Lý thuyết cô đọng)
        </h2>
        
        <div style={{ color: 'var(--text-primary)', lineHeight: '1.7', fontSize: '1.05rem' }}>
          {activeTopic.theory.map((section, idx) => (
            <div key={idx} style={{ marginBottom: idx !== activeTopic.theory.length - 1 ? '24px' : 0 }}>
              <h3 style={{ color: 'var(--accent-green)', letterSpacing: '0.5px' }}>{section.title}</h3>
              <p>{section.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PHẦN KIỂM TRA ĐÁNH GIÁ MCQ SECTION */}
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <Target size={24} color="var(--accent-purple)" /> Bài Tập Củng Cố Mạch Mở
      </h2>

      <div className="glass-panel-heavy" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
        
        <h3 style={{ fontSize: '1.25rem', lineHeight: '1.6', margin: '0 0 32px 0' }}>
          {activeTopic.question.text}
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {activeTopic.question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectAnswer = hasSubmitted && opt.isCorrect;
            const isWrongSelection = hasSubmitted && isSelected && !opt.isCorrect;
            
            let btnStyle = {
              padding: '16px 20px', textAlign: 'left', border: 'var(--glass-border)', 
              background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)',
              borderRadius: 'var(--radius-md)', cursor: hasSubmitted ? 'default' : 'pointer', 
              fontSize: '1rem', transition: 'all 0.2s', position: 'relative', overflow: 'hidden'
            };

            if (isSelected) {
              btnStyle.borderColor = 'var(--accent-cyan)';
              btnStyle.background = 'rgba(0, 240, 255, 0.1)';
            }
            if (isCorrectAnswer) {
              btnStyle.borderColor = 'var(--accent-green)';
              btnStyle.background = 'rgba(0, 255, 163, 0.15)';
            }
            if (isWrongSelection) {
              btnStyle.borderColor = '#ef4444'; 
              btnStyle.background = 'rgba(239, 68, 68, 0.1)';
            }

            return (
              <button 
                key={idx} 
                style={btnStyle}
                onClick={() => handleSelect(idx)}
                onMouseOver={(e) => {
                  if (!hasSubmitted && !isSelected) {
                    e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                    e.currentTarget.style.background = 'var(--bg-hover)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!hasSubmitted && !isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.15)';
                    e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
                  }
                }}
              >
                <strong>{opt.id}.</strong> {opt.text}
                {isCorrectAnswer && <CheckCircle size={20} color="var(--accent-green)" style={{ position: 'absolute', right: '16px', top: '16px' }} />}
              </button>
            )
          })}
        </div>

        {!hasSubmitted ? (
          <button 
            className="btn-active"
            style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-md)', fontSize: '1.1rem', fontWeight: 600, display: 'flex', justifyContent: 'center', border: '1px solid transparent', cursor: selectedOption === null ? 'not-allowed' : 'pointer', opacity: selectedOption === null ? 0.6 : 1 }}
            disabled={selectedOption === null}
            onClick={() => setHasSubmitted(true)}
          >
            Nộp bài & Phân tích đáp án AI
          </button>
        ) : (
          <div style={{ marginTop: '24px', animation: 'fadeIn 0.5s ease-out' }}>
             {currentOption.isCorrect ? (
               <div style={{ padding: '24px', borderRadius: 'var(--radius-md)', background: 'rgba(0, 255, 163, 0.1)', border: '1px solid var(--accent-green)' }}>
                 <h3 style={{ color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' }}>
                   <CheckCircle size={24} /> Chính xác tuyệt đối!
                 </h3>
                 <p style={{ margin: 0, color: 'var(--text-primary)' }}>{currentOption.feedback}</p>
                 <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Mô hình Knowledge Tracing: Bản đồ nhận thức của bạn trong chuỗi chuyên đề này đã được cập nhật thành "Thông Hiểu".</p>
               </div>
             ) : (
               <div style={{ padding: '24px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444' }}>
                 <h3 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 16px 0' }}>
                   <AlertTriangle size={24} /> Phân Tích Phương Án Nhiễu (Misconception Detected)
                 </h3>
                 <div style={{ marginTop: '8px' }}>
                   <p style={{ color: '#fca5a5', fontWeight: 600, marginBottom: '8px' }}>Nguồn gốc của sự nhầm lẫn (Cơ Chế Gây Nhiễu):</p>
                   <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: '1.5' }}>{currentOption.misconception}</p>
                 </div>
                 <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-sm)' }}>
                   <p style={{ color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '8px' }}>Sự Thật Khoa Học Thực Nghiệm:</p>
                   <p style={{ margin: 0, color: '#e2e8f0', lineHeight: '1.5' }}>{currentOption.scientificFact}</p>
                 </div>
                 <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
                    <button className="btn-primary" onClick={() => { setHasSubmitted(false); setSelectedOption(null); }}>
                      <RefreshCcw size={16} /> Thử lại câu hỏi này
                    </button>
                    <button className="btn-primary" style={{ borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }} onClick={() => navigate('/virtual-lab')}>
                      <Beaker size={16} /> Định tuyến Virtual Lab 3D
                    </button>
                 </div>
               </div>
             )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Theory;
