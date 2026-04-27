import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCcw, 
  ChevronRight, 
  Search,
  Trophy,
  Clock,
  BookOpen,
  Filter
} from 'lucide-react';
import { curriculumData } from '../data/curriculumData';
import { questionBank } from '../data/questionBank';

const Exercises = () => {
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);

  const startQuiz = (topic) => {
    const questions = questionBank[topic.id] || [];
    if (questions.length > 0) {
      const randomQ = questions[Math.floor(Math.random() * questions.length)];
      setActiveTopic(topic);
      setActiveQuestion(randomQ);
      setHasSubmitted(false);
      setSelectedOption(null);
    } else {
      alert("Chuyên đề này đang được cập nhật câu hỏi!");
    }
  };

  const handleSelect = (idx) => {
    if (!hasSubmitted) setSelectedOption(idx);
  };

  const handleNext = () => {
    const questions = questionBank[activeTopic.id] || [];
    const randomQ = questions[Math.floor(Math.random() * questions.length)];
    setActiveQuestion(randomQ);
    setHasSubmitted(false);
    setSelectedOption(null);
  };

  const finishQuiz = () => {
    setActiveTopic(null);
    setActiveQuestion(null);
    setHasSubmitted(false);
    setSelectedOption(null);
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    setTotalAttempted(prev => prev + 1);
    if (activeQuestion.options[selectedOption].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  if (!activeTopic) {
    return (
      <div style={{ padding: '40px', height: '100%', overflowY: 'auto', background: '#020617' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Header Stats */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div>
              <h1 className="text-glow" style={{ margin: '0 0 8px 0' }}>Trung Tâm Bài Tập</h1>
              <p style={{ color: '#64748b', margin: 0 }}>Rèn luyện tư duy và kiểm tra lỗ hổng kiến thức thông qua hệ thống MCQ chuyên sâu.</p>
            </div>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <div className="glass-panel" style={{ padding: '12px 24px', textAlign: 'center', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>ĐIỂM TỔNG</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>{score * 10}</div>
              </div>
              <div className="glass-panel" style={{ padding: '12px 24px', textAlign: 'center', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>ĐÃ LÀM</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{totalAttempted}</div>
              </div>
            </div>
          </div>

          {/* Filter & Search */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '12px 20px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Search size={18} color="#64748b" />
              <input placeholder="Tìm kiếm bài tập theo từ khóa..." style={{ background: 'none', border: 'none', color: '#fff', marginLeft: '12px', outline: 'none', width: '100%' }} />
            </div>
            <button className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 20px', borderRadius: '12px', color: '#fff', border: '1px solid rgba(255,255,255,0.05)' }}>
              <Filter size={18} /> Lọc theo khối
            </button>
          </div>

          {/* Topics Grid */}
          {curriculumData.map((gradeBlock, gIdx) => (
            <div key={gIdx} style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '1.1rem', color: gradeBlock.color, marginBottom: '20px', fontWeight: 700, letterSpacing: '1px' }}>
                {gradeBlock.grade.toUpperCase()} - {gradeBlock.title}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {gradeBlock.topics.map((topic, tIdx) => (
                  <div 
                    key={tIdx} 
                    className="glass-panel"
                    style={{ 
                      padding: '24px', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.3s ease',
                      border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden'
                    }}
                    onClick={() => startQuiz(topic)}
                    onMouseOver={(e) => { e.currentTarget.style.borderColor = gradeBlock.color; e.currentTarget.style.transform = 'translateY(-4px)' }}
                    onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${gradeBlock.color}11`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: gradeBlock.color }}>
                        <Target size={20} />
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <BookOpen size={12} /> {(questionBank[topic.id] || []).length} câu hỏi
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: '0 0 8px 0' }}>{topic.name}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.5 }}>Luyện tập các câu hỏi về {topic.name.toLowerCase()} và phân tích đáp án chuyên sâu.</p>
                    <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: gradeBlock.color, fontSize: '0.85rem', fontWeight: 600 }}>
                      Luyện tập ngay <ChevronRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }

  // --- QUIZ VIEW ---
  const currentOption = selectedOption !== null ? activeQuestion.options[selectedOption] : null;

  return (
    <div style={{ padding: '40px', height: '100%', overflowY: 'auto', background: '#020617' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <button 
          onClick={finishQuiz}
          style={{ 
            background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', 
            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '0.9rem'
          }}
        >
          <ArrowLeft size={16} /> Kết thúc luyện tập
        </button>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 700, letterSpacing: '1px', marginBottom: '8px' }}>
            CHUYÊN ĐỀ: {activeTopic.name.toUpperCase()}
          </div>
          <h1 style={{ fontSize: '2rem', color: '#fff', margin: 0 }}>Củng Cố Kiến Thức</h1>
        </div>

        <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', position: 'relative' }}>
          
          <h2 style={{ fontSize: '1.25rem', lineHeight: '1.6', marginBottom: '40px', color: '#fff' }}>
            {activeQuestion.text}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            {activeQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = hasSubmitted && opt.isCorrect;
              const isWrong = hasSubmitted && isSelected && !opt.isCorrect;

              return (
                <button 
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  style={{ 
                    padding: '20px 24px', textAlign: 'left', borderRadius: '16px',
                    border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.05)',
                    background: isSelected ? 'rgba(0, 240, 255, 0.05)' : 'rgba(255,255,255,0.02)',
                    color: '#fff', cursor: hasSubmitted ? 'default' : 'pointer',
                    fontSize: '1.05rem', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '16px',
                    borderColor: isCorrect ? 'var(--accent-green)' : isWrong ? '#ef4444' : (isSelected ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)')
                  }}
                >
                  <div style={{ 
                    width: '28px', height: '28px', borderRadius: '8px', 
                    background: isSelected ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.9rem', fontWeight: 700, color: isSelected ? '#000' : '#64748b'
                  }}>
                    {opt.id}
                  </div>
                  {opt.text}
                  {isCorrect && <CheckCircle size={20} color="var(--accent-green)" style={{ marginLeft: 'auto' }} />}
                  {isWrong && <AlertTriangle size={20} color="#ef4444" style={{ marginLeft: 'auto' }} />}
                </button>
              );
            })}
          </div>

          {!hasSubmitted ? (
            <button 
              className="btn-active"
              style={{ width: '100%', padding: '18px', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 700, cursor: selectedOption === null ? 'not-allowed' : 'pointer' }}
              disabled={selectedOption === null}
              onClick={handleSubmit}
            >
              Nộp Bài & Kiểm Tra
            </button>
          ) : (
            <div style={{ animation: 'slideUp 0.4s ease-out' }}>
              <div style={{ 
                padding: '24px', borderRadius: '20px', background: 'rgba(255,255,255,0.03)', 
                border: '1px solid rgba(255,255,255,0.05)', marginBottom: '32px' 
              }}>
                <h3 style={{ color: currentOption.isCorrect ? 'var(--accent-green)' : '#fca5a5', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {currentOption.isCorrect ? <CheckCircle /> : <AlertTriangle />}
                  {currentOption.isCorrect ? 'Câu trả lời chính xác!' : 'Đáp án chưa chính xác'}
                </h3>
                <p style={{ color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                  {currentOption.isCorrect ? currentOption.feedback : currentOption.scientificFact}
                </p>
                {!currentOption.isCorrect && (
                  <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                    <span style={{ color: '#fca5a5', fontSize: '0.85rem', fontWeight: 700 }}>PHÂN TÍCH SAI LẦM: </span>
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{currentOption.misconception}</span>
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={handleNext}
                  className="btn-primary"
                  style={{ flex: 1, padding: '16px', borderRadius: '12px', background: 'var(--accent-cyan)', color: '#000', fontWeight: 700 }}
                >
                  Câu hỏi tiếp theo
                </button>
                <button 
                  onClick={() => { setHasSubmitted(false); setSelectedOption(null); }}
                  style={{ padding: '16px 24px', borderRadius: '12px', background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
                  title="Thử lại câu này"
                >
                  <RefreshCcw size={18} />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
      
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const ArrowLeft = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
  </svg>
);

export default Exercises;
