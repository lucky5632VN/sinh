import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copyright, Apple, Pizza, Coffee, Croissant, Drumstick, Activity, Bike, HeartPulse, Dumbbell, XCircle, Salad, Wheat, Fish } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Đồ ăn không healthy - nhiều Calo, ít Protein
const junkFoodItems = [
  { name: 'Burger', calories: 500, protein: 15, icon: <Pizza size={20} color="#f59e0b" /> },
  { name: 'Gà rán', calories: 400, protein: 20, icon: <Drumstick size={20} color="#d97706" /> },
  { name: 'Bánh Ngọt', calories: 350, protein: 4, icon: <Croissant size={20} color="#fcd34d" /> },
  { name: 'Cà phê', calories: 150, protein: 2, icon: <Coffee size={20} color="#a16207" /> }
];

// Đồ ăn healthy - ít Calo, nhiều Protein
const healthyFoodItems = [
  { name: 'Ức Gà Nướng', calories: 165, protein: 35, icon: <Fish size={20} color="#06b6d4" /> },
  { name: 'Salad Rau', calories: 80, protein: 5, icon: <Salad size={20} color="#22c55e" /> },
  { name: 'Táo Tươi', calories: 95, protein: 1, icon: <Apple size={20} color="#ef4444" /> },
  { name: 'Yến Mạch', calories: 150, protein: 6, icon: <Wheat size={20} color="#a3e635" /> },
];

// Bài tập - Cardio đốt Calo, Strength xây Cơ
const exerciseItems = [
  { name: 'Chạy bộ', calBurn: 400, muscleBuild: 0, icon: <Activity size={20} color="#06b6d4" /> },
  { name: 'Đạp xe', calBurn: 500, muscleBuild: 0, icon: <Bike size={20} color="#3b82f6" /> },
  { name: 'Cử tạ', calBurn: 200, muscleBuild: 1.5, icon: <Dumbbell size={20} color="#8b5cf6" /> }, // xây cơ
  { name: 'Yoga', calBurn: 150, muscleBuild: 0.3, icon: <HeartPulse size={20} color="#ec4899" /> }
];

const EatingLab = () => {
  const navigate = useNavigate();
  const [weight, setWeight] = useState(60.0);
  const [muscle, setMuscle] = useState(0); // Điểm cơ bắp 0 -> 100
  const [simRunning, setSimRunning] = useState(false);
  const [daysPassed, setDaysPassed] = useState(0);
  
  const [plate, setPlate] = useState([]);
  const [routine, setRoutine] = useState([]);

  const dailyCalIn = plate.reduce((sum, item) => sum + item.calories, 0);
  const dailyProteinIn = plate.reduce((sum, item) => sum + item.protein, 0);
  const dailyCalOut = routine.reduce((sum, item) => sum + item.calBurn, 0);
  const dailyMuscleBuild = routine.reduce((sum, item) => sum + item.muscleBuild, 0);
  const BMR = 1500;

  useEffect(() => {
    let interval;
    if (simRunning) {
      interval = setInterval(() => {
        // Cập nhật cân nặng
        setWeight(prevWeight => {
           const netCalo = dailyCalIn - (BMR + dailyCalOut);
           const weightChange = netCalo / 7700;
           return Math.max(30, Math.min(200, prevWeight + weightChange));
        });

        // Cập nhật cơ bắp: tăng nếu tập cử tạ + ăn đủ protein, giảm dần nếu không tập
        setMuscle(prevMuscle => {
          const proteinBonus = dailyProteinIn >= 50 ? 1 : 0; // Đủ protein mới xây đc cơ
          const muscleGain = dailyMuscleBuild * proteinBonus;
          const muscleDecay = simRunning ? 0.05 : 0; // Cơ teo dần nếu không tập
          const net = muscleGain - muscleDecay;
          return Math.max(0, Math.min(100, prevMuscle + net));
        });

        setDaysPassed(d => d + 1);
      }, 150); // 1 ngày = 150ms (~7 ngày/giây)
    }
    return () => clearInterval(interval);
  }, [simRunning, dailyCalIn, dailyCalOut, dailyProteinIn, dailyMuscleBuild]);

  const handleAddFood = (food) => setPlate(prev => [...prev, { ...food, id: Math.random() }]);
  const handleRemoveFood = (id) => setPlate(prev => prev.filter(item => item.id !== id));
  const handleAddExercise = (exercise) => setRoutine(prev => [...prev, { ...exercise, id: Math.random() }]);
  const handleRemoveExercise = (id) => setRoutine(prev => prev.filter(item => item.id !== id));

  const bmi = (weight / (1.7 * 1.7)).toFixed(1);
  const bmiColor = bmi > 25 ? '#ef4444' : bmi < 18.5 ? '#eab308' : '#10b981';

  // SVG tính toán
  const belly_rx = Math.min(28, 14 + Math.max(0, (weight - 60) * 0.3));
  const belly_ry = Math.min(22, 10 + Math.max(0, (weight - 60) * 0.2));
  const armWidth = 3 + (muscle / 100) * 6; // Tay dày thêm khi có cơ 
  const shoulderWidth = 28 + (muscle / 100) * 14; // Vai rộng thêm
  const chestColor = muscle > 30 ? `rgba(59, 130, 246, ${muscle / 100})` : 'none'; // Màu xanh cơ bắp khi tập

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)', position: 'relative' }}>
       <div style={{ padding: '12px 32px', display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid var(--glass-border)', zIndex: 10, background: 'rgba(15,23,42,0.8)' }}>
          <button onClick={() => navigate('/virtual-lab')} className="btn-primary" style={{ border: 'none', background: 'rgba(255,255,255,0.1)' }}>
            <ArrowLeft size={16} /> Dashboard
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
            <div>
              <h1 className="text-glow" style={{ margin: 0, color: '#f59e0b', fontSize: '1.2rem' }}>Động Lực Dinh Dưỡng: Tiêu Hao Thượng Tầng</h1>
              <p style={{ color: 'var(--text-secondary)', margin: '2px 0 0 0', fontSize: '0.85rem' }}>
                 Kết hợp Protein + Cử tạ để phát triển cơ bắp. Ăn Junk food để tích mỡ.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.75rem', background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <Copyright size={12} /> 2026 BioSTEM AI Education
              </div>
              <div style={{ background: '#020617', padding: '6px 20px', borderRadius: '20px', border: '1px solid var(--accent-cyan)', display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ngày: </span>
                <strong style={{ color: '#00e5ff', fontSize: '1.2rem', marginLeft: '8px', minWidth: '40px' }}>{daysPassed}</strong>
              </div>
            </div>
          </div>
       </div>

       <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 1fr minmax(250px, 1fr)', gap: '16px', padding: '16px 24px', overflow: 'hidden' }}>
         
         {/* Khu Food */}
         <div className="glass-panel" style={{ padding: '16px', borderRadius: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
            <h2 style={{ margin: '0 0 12px 0', color: '#10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem' }}>
               Thực Đơn
               <span style={{ color: '#fff', fontSize: '0.8rem', background: '#047857', padding: '3px 10px', borderRadius: '12px' }}>IN: {dailyCalIn} kcal | P: {dailyProteinIn}g</span>
            </h2>

            {/* Junk Food */}
            <p style={{ color: '#f87171', fontSize: '0.78rem', fontWeight: 'bold', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>🍔 Junk Food</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
               {junkFoodItems.map((food, i) => (
                 <button key={i} onClick={() => handleAddFood(food)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '5px 8px', cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', color: '#fff' }}>
                   {food.icon} <strong style={{ fontSize: '0.72rem' }}>+{food.calories}</strong>
                 </button>
               ))}
            </div>

            {/* Healthy Food */}
            <p style={{ color: '#4ade80', fontSize: '0.78rem', fontWeight: 'bold', margin: '0 0 6px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>🥦 Healthy & Protein</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '12px' }}>
               {healthyFoodItems.map((food, i) => (
                 <button key={i} onClick={() => handleAddFood(food)} style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', padding: '5px 8px', cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', color: '#fff' }}>
                   {food.icon} <strong style={{ fontSize: '0.72rem' }}>+{food.calories}</strong>
                 </button>
               ))}
            </div>

            <div style={{ flex: 1, minHeight: 0, background: 'rgba(0,0,0,0.5)', borderRadius: '12px', padding: '12px', border: '1px dashed #10b981', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
               <h3 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#6ee7b7' }}>Khẩu phần CỐ ĐỊNH mỗi ngày:</h3>
               <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {plate.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>( Đang nhịn đói )</span>}
                  {plate.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>{item.icon} <span>{item.name}</span></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '0.8rem' }}>{item.calories}cal</span>
                        <span style={{ color: '#34d399', fontSize: '0.8rem' }}>P:{item.protein}g</span>
                        <XCircle size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleRemoveFood(item.id)} />
                      </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Khu Nhân Vật */}
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: '10px', overflowY: 'auto', minHeight: 0, paddingTop: '8px', paddingBottom: '8px' }}>
            <button 
              onClick={() => setSimRunning(!simRunning)}
              style={{ padding: '10px 24px', fontSize: '1rem', fontWeight: 'bold', background: simRunning ? '#ef4444' : '#10b981', color: '#fff', border: 'none', borderRadius: '24px', cursor: 'pointer' }}
            >
              {simRunning ? 'DỪNG THỜI GIAN' : 'BẮT ĐẦU VÒNG ĐỜI'}
            </button>

            {/* Thanh cơ bắp */}
            <div style={{ width: '220px', background: 'rgba(0,0,0,0.5)', padding: '8px 12px', borderRadius: '12px', border: '1px solid rgba(59,130,246,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                <span style={{ color: '#93c5fd' }}>💪 Chỉ số cơ bắp</span>
                <strong style={{ color: '#60a5fa' }}>{muscle.toFixed(1)} / 100</strong>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${muscle}%`, background: 'linear-gradient(to right, #3b82f6, #06b6d4)', borderRadius: '4px', transition: 'width 0.1s linear' }} />
              </div>
              <p style={{ margin: '6px 0 0 0', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {dailyProteinIn < 50 ? '⚠ Cần ≥ 50g Protein/ngày để xây cơ' : '✅ Protein đủ để hấp thụ cơ'}
              </p>
            </div>

            {/* Nhân vật SVG - nhỏ lại để vừa màn hình */}
            <div style={{ position: 'relative', width: '140px', height: '210px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
               <svg viewBox="0 0 120 260" width="140" height="210">
                 {/* Đầu */}
                 <circle cx="60" cy="28" r="20" fill="none" stroke={weight > 90 ? '#fca5a5' : '#cbd5e1'} strokeWidth="3" />
                 {weight > 85 ? (
                   <path d="M 52 33 Q 60 27 68 33" fill="none" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round" />
                 ) : muscle > 30 ? (
                   <path d="M 52 29 Q 60 35 68 29" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" />
                 ) : (
                   <path d="M 52 30 Q 60 35 68 30" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
                 )}
                 <circle cx="53" cy="26" r="2.5" fill="#cbd5e1" />
                 <circle cx="67" cy="26" r="2.5" fill="#cbd5e1" />

                 {/* Cổ */}
                 <line x1="60" y1="48" x2="60" y2="58" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

                 {/* Vai + Thân trên: rộng hơn khi có cơ */}
                 <rect 
                   x={60 - shoulderWidth/2} y="58" 
                   width={shoulderWidth} height="22" 
                   rx="8" 
                   fill={chestColor}
                   stroke={muscle > 50 ? '#3b82f6' : '#94a3b8'} 
                   strokeWidth={muscle > 50 ? 3.5 : 3} 
                 />

                 {/* Bụng */}
                 <ellipse cx="60" cy="93" rx={belly_rx} ry={belly_ry} fill="none" stroke={weight > 85 ? '#ef4444' : '#94a3b8'} strokeWidth="3" />

                 {/* Tim đập ở ngực (chỉ hiển thị khi đang chạy mô phỏng) */}
                 {simRunning && (
                   <foreignObject x="45" y="60" width="30" height="30">
                     <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                       <HeartPulse size={18} color="#ef4444" style={{ animation: 'pulse 0.8s infinite' }} />
                     </div>
                   </foreignObject>
                 )}

                 {/* Tay trái - dày hơn khi có cơ */}
                 <line x1={60 - shoulderWidth/2} y1="65" x2={Math.max(10, 30 - Math.max(0, (weight-60)*0.1))} y2="108" stroke={muscle > 30 ? '#3b82f6' : '#94a3b8'} strokeWidth={armWidth} strokeLinecap="round" />
                 {/* Bắp tay trái (ellipse bắp) */}
                 {muscle > 20 && <ellipse cx={60 - shoulderWidth/2 - 5} cy="78" rx={2 + muscle/20} ry={4 + muscle/15} fill="none" stroke="#60a5fa" strokeWidth="2" transform={`rotate(-30 ${60 - shoulderWidth/2 - 5} 78)`} />}
                 
                 {/* Tay phải */}
                 <line x1={60 + shoulderWidth/2} y1="65" x2={Math.min(110, 90 + Math.max(0, (weight-60)*0.1))} y2="108" stroke={muscle > 30 ? '#3b82f6' : '#94a3b8'} strokeWidth={armWidth} strokeLinecap="round" />
                 {muscle > 20 && <ellipse cx={60 + shoulderWidth/2 + 5} cy="78" rx={2 + muscle/20} ry={4 + muscle/15} fill="none" stroke="#60a5fa" strokeWidth="2" transform={`rotate(30 ${60 + shoulderWidth/2 + 5} 78)`} />}

                 {/* Chân trái */}
                 <line x1={60 - 10} y1="113" x2="40" y2="210" stroke="#94a3b8" strokeWidth={3 + muscle/40} strokeLinecap="round" />
                 {/* Chân phải */}
                 <line x1={60 + 10} y1="113" x2="80" y2="210" stroke="#94a3b8" strokeWidth={3 + muscle/40} strokeLinecap="round" />
                 
                 {/* Bàn chân */}
                 <line x1="40" y1="210" x2="26" y2="218" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
                 <line x1="80" y1="210" x2="94" y2="218" stroke="#94a3b8" strokeWidth="3.5" strokeLinecap="round" />
               </svg>
            </div>

            {/* Bàn cân + BMI gộp 1 dòng */}
            <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
               <div className="glass-panel" style={{ minWidth: '130px', height: '50px', borderRadius: '14px', background: 'linear-gradient(to bottom, #1e293b, #0f172a)', border: '2px solid #475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 'bold', color: weight > 85 ? '#ef4444' : weight < 50 ? '#eab308' : '#10b981', textShadow: '0 0 10px currentColor' }}>
                    {weight.toFixed(1)} <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>kg</span>
                  </span>
               </div>
               <div style={{ background: 'rgba(0,0,0,0.5)', padding: '8px 12px', borderRadius: '12px', border: `1px solid ${bmiColor}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>BMI</div>
                  <div style={{ fontWeight: 'bold', color: bmiColor, fontSize: '1.2rem' }}>{bmi}</div>
               </div>
            </div>
         </div>

         {/* Khu Thể Dục */}
         <div className="glass-panel" style={{ padding: '16px', borderRadius: '20px', display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0 }}>
            <h2 style={{ margin: '0 0 12px 0', color: '#3b82f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem' }}>
               Vận Động
               <span style={{ color: '#fff', fontSize: '0.8rem', background: '#1d4ed8', padding: '3px 10px', borderRadius: '12px' }}>OUT: {dailyCalOut}</span>
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
               {exerciseItems.map((ex, i) => (
                 <button 
                   key={i} 
                   onClick={() => handleAddExercise(ex)}
                   style={{ background: ex.muscleBuild > 0 ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${ex.muscleBuild > 0 ? 'rgba(59,130,246,0.4)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '8px', padding: '5px 8px', cursor: 'pointer', display: 'flex', gap: '5px', alignItems: 'center', color: '#fff' }}
                 >
                   {ex.icon} 
                   <div style={{ fontSize: '0.72rem', textAlign: 'left' }}>
                     <div>-{ex.calBurn}cal</div>
                     {ex.muscleBuild > 0 && <div style={{ color: '#60a5fa' }}>💪+{ex.muscleBuild}</div>}
                   </div>
                 </button>
               ))}
            </div>

            <div style={{ flex: 1, minHeight: 0, background: 'rgba(0,0,0,0.5)', borderRadius: '12px', padding: '12px', border: '1px dashed #3b82f6', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
               <h3 style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#93c5fd' }}>Lịch CỐ ĐỊNH mỗi ngày:</h3>
               <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {routine.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>( Lười biếng )</span>}
                  {routine.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>{item.icon} <span>{item.name}</span></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#60a5fa', fontSize: '0.8rem' }}>-{item.calBurn}</span>
                        {item.muscleBuild > 0 && <span style={{ color: '#34d399', fontSize: '0.8rem' }}>💪</span>}
                        <XCircle size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => handleRemoveExercise(item.id)} />
                      </div>
                    </div>
                  ))}
               </div>
               
               <div style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>BMR sinh lý cơ bản</span>
                  <span style={{ color: '#60a5fa', fontWeight: 'bold' }}>1500 kcal</span>
               </div>
            </div>
         </div>

       </div>
    </div>
  );
};

export default EatingLab;
