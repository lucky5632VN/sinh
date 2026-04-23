import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Beaker, Dna, Activity, Zap, Eye, Utensils, User, Fingerprint, Layers, Brain } from 'lucide-react';

const labs = [
  {
    id: 'membrane',
    name: 'Động Lực Kênh Màng',
    category: 'Tế bào & Phân tử',
    grade: 'Lớp 10',
    icon: <Activity color="var(--accent-cyan)" size={24} />,
    bg: 'rgba(0, 240, 255, 0.2)',
    description: 'Mô phỏng lớp kép Thẩm thấu Kênh protein với tương tác Nồng độ Ion trực quan.',
    path: '/virtual-lab/membrane'
  },
  {
    id: 'enzyme',
    name: 'Hoạt tính Enzyme',
    category: 'Tế bào & Phân tử',
    grade: 'Lớp 11',
    icon: <Zap color="var(--accent-green)" size={24} />,
    bg: 'rgba(0, 255, 163, 0.2)',
    description: 'Kiểm chứng sự biến dạng màng xúc tác Enzyme và tốc độ dao động Ion vi mô nội bào.',
    path: '/virtual-lab/enzyme'
  },
  {
    id: 'dna',
    name: 'Kéo Dãn Vi Mô DNA',
    category: 'Tế bào & Phân tử',
    grade: 'Lớp 12',
    icon: <Dna color="var(--accent-purple)" size={24} />,
    bg: 'rgba(139, 92, 246, 0.2)',
    description: 'Thực hành Kẹp quang học để biến dạng cấu trúc Lò xo phân tử của chuỗi xoắn kép.',
    path: '/virtual-lab/dna'
  },
  {
    id: 'ct-scan',
    name: 'Chụp Cắt Lớp Vi Tính',
    category: 'Y sinh',
    grade: 'Lớp 12',
    icon: <Activity color="#06b6d4" size={24} />,
    bg: 'rgba(6, 182, 212, 0.2)',
    description: 'Khám phá cấu trúc não bộ qua các lớp cắt TDM (Tomodensitometry) thực tế.',
    path: '/virtual-lab/ct-scan'
  },
  {
    id: 'brain-sections',
    name: 'Giải Phẫu Cắt Lớp Não',
    category: 'Y sinh',
    grade: 'Lớp 11',
    icon: <Layers color="#a855f7" size={24} />,
    bg: 'rgba(168, 85, 247, 0.2)',
    description: 'Nghiên cứu cấu trúc não người thông qua các mặt cắt Ngang, Đứng Dọc và Đứng Ngang.',
    path: '/virtual-lab/brain-sections'
  },
  {
    id: 'bone-scintigraphy',
    name: 'Xạ Hình Xương',
    category: 'Y sinh',
    grade: 'Lớp 12',
    icon: <Activity color="#06b6d4" size={24} />,
    bg: 'rgba(6, 182, 212, 0.2)',
    description: 'Theo dõi sự phân bố các nguyên tố phóng xạ trong xương để phát hiện di căn và tổn thương.',
    path: '/virtual-lab/bone-scintigraphy'
  },
  {
    id: 'anatomy',
    name: 'Giải Phẫu Cơ Thể Người',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    icon: <User color="#f43f5e" size={24} />,
    bg: 'rgba(244, 63, 94, 0.2)',
    description: 'Mô phỏng bóc tách lớp cơ quan nội tạng theo dạng hình vẽ giải phẫu chuyên sâu.',
    path: '/virtual-lab/anatomy'
  },
  {
    id: 'eating',
    name: 'Chế Độ Ăn & Tập Luyện',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    icon: <Utensils color="#ffa500" size={24} />,
    bg: 'rgba(255, 165, 0, 0.1)',
    description: 'Khám phá cơ chế lưu trữ vi chất học và tiêu hao Calories (Proprietary Engine).',
    path: '/virtual-lab/eating'
  },
  {
    id: 'vision',
    name: 'Thị Giác Màu Sắc',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    icon: <Eye color="#ff69b4" size={24} />,
    bg: 'rgba(255, 105, 180, 0.1)',
    description: 'Giải phẫu hệ thần kinh tiếp nhận và xử lý quang phổ (Neural Perception Model).',
    path: '/virtual-lab/vision'
  },
  {
    id: 'frog',
    name: 'Cung Phản Xạ Ếch',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    icon: <Activity color="#4ade80" size={24} />,
    bg: 'rgba(74, 222, 128, 0.2)',
    description: 'Thí nghiệm chứng minh phản xạ không điều kiện và vai trò của Tủy sống.',
    path: '/virtual-lab/frog'
  },
  {
    id: 'mendel',
    name: 'Di Truyền Mendel',
    category: 'Di truyền & Tiến hóa',
    grade: 'Lớp 12',
    icon: <Fingerprint color="#a3e635" size={24} />,
    bg: 'rgba(163, 230, 53, 0.2)',
    description: 'Thực nghiệm quy luật phân ly và phân ly độc lập trên các dòng đậu Hà Lan thuần chủng.',
    path: '/virtual-lab/mendel'
  },
  {
    id: 'immune-system',
    name: 'Hệ Miễn Dịch',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    icon: <Activity color="#ef4444" size={24} />,
    bg: 'rgba(239, 68, 68, 0.2)',
    description: 'Khám phá các cấp độ bảo vệ cơ thể: từ cơ quan miễn dịch đến hệ bạch huyết và tim mạch.',
    path: '/virtual-lab/immune-system'
  },
  {
    id: 'spinal-cord',
    name: 'Tủy Sống',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    icon: <Activity color="#06b6d4" size={24} />,
    bg: 'rgba(6, 182, 212, 0.2)',
    description: 'Nghiên cứu cấu trúc vĩ mô và vi mô của tủy sống, trung khu của các phản xạ không điều kiện.',
    path: '/virtual-lab/spinal-cord'
  },
  {
    id: 'plant-cycle',
    name: 'Chu Kỳ Đời Sống Thực Vật',
    category: 'Di truyền & Tiến hóa',
    grade: 'Lớp 10',
    icon: <Zap color="#fbbf24" size={24} />,
    bg: 'rgba(251, 191, 36, 0.2)',
    description: 'Quan sát chu kỳ sinh trưởng từ Hạt → Cây trưởng thành → Hoa → Quả.',
    path: '/virtual-lab/plant-cycle'
  },
  {
    id: 'human-brain',
    name: 'Bộ Não Người',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    isNew: true,
    icon: <Brain color="#d946ef" size={24} />,
    bg: 'rgba(217, 70, 239, 0.2)',
    description: 'Nghiên cứu giải phẫu chi tiết bộ não người theo thùy não, các vùng chức năng và mặt cắt dọc.',
    path: '/virtual-lab/human-brain'
  },
  {
    id: 'taste',
    name: 'Vị Giác',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    isNew: true,
    icon: <Activity color="#ec4899" size={24} />,
    bg: 'rgba(236, 72, 153, 0.2)',
    description: 'Khám phá cấu trúc lưỡi, các nhú vị giác và cơ chế truyền xung thần kinh vị giác lên não bộ.',
    path: '/virtual-lab/taste'
  }
];

const VirtualLab = () => {
  const navigate = useNavigate();
  const categories = [...new Set(labs.map(l => l.category))];

  return (
    <div style={{ padding: '32px', height: '100%', overflowY: 'auto' }}>
      <h1 className="text-glow" style={{ marginBottom: '8px' }}>Trung Tâm Thực Hành Ảo BioSTEM</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Hệ sinh thái mô phỏng Sinh học độc quyền chuẩn GDPT 2018 (Native WebGL & React Engine).
      </p>

      {categories.map((cat, idx) => (
        <div key={idx} style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', 
            color: 'var(--accent-cyan)', borderLeft: '4px solid var(--accent-cyan)', paddingLeft: '12px' 
          }}>
            {cat === 'Tế bào & Phân tử' && <Layers size={20} />}
            {cat === 'Cơ thể & Giải phẫu' && <User size={20} />}
            {cat === 'Di truyền & Tiến hóa' && <Dna size={20} />}
            {cat}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
            {labs.filter(l => l.category === cat).map((lab) => (
              <div 
                key={lab.id}
                className="glass-panel" 
                style={{ padding: '24px', cursor: 'pointer', transition: 'all 0.2s', borderRadius: 'var(--radius-lg)', position: 'relative' }}
                onClick={() => navigate(lab.path)}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--accent-cyan)' }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--glass-border)' }}
              >
                {lab.isNew && (
                  <span style={{ position: 'absolute', top: '12px', right: '12px', background: '#f43f5e', color: '#fff', fontSize: '0.65rem', padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold' }}>MỚI</span>
                )}
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '12px', background: lab.bg, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' 
                }}>
                  {lab.icon}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                   <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>{lab.name}</h3>
                   <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.3)', padding: '2px 8px', borderRadius: '6px' }}>{lab.grade}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>{lab.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VirtualLab;
