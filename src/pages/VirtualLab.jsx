import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Beaker, Dna, Activity, Zap, Eye, Utensils, User, Fingerprint, Layers, Brain, Droplets } from 'lucide-react';

const labs = [
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
  },
  {
    id: 'urinary-system',
    name: 'Hệ Tiết Niệu',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    isNew: true,
    icon: <Droplets color="#0ea5e9" size={24} />,
    bg: 'rgba(14, 165, 233, 0.2)',
    description: 'Khám phá cấu trúc thận, niệu quản, bàng quang và cơ chế lọc máu ở đơn vị thận (nephron).',
    path: '/virtual-lab/urinary-system'
  },
  {
    id: 'digestive-tract',
    name: 'Bộ Máy Tiêu Hóa',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    isNew: true,
    icon: <Utensils color="#f59e0b" size={24} />,
    bg: 'rgba(245, 158, 11, 0.2)',
    description: 'Khám phá quá trình tiêu hóa thức ăn, cấu tạo các cơ quan trong ống tiêu hóa và tuyến tiêu hóa.',
    path: '/virtual-lab/digestive-tract'
  },
  {
    id: 'muscle-contraction',
    name: 'Co cơ - Đốt cơ',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    isNew: true,
    icon: <Zap color="#f59e0b" size={24} />,
    bg: 'rgba(245, 158, 11, 0.2)',
    description: 'Quan sát cơ chế trượt của các sợi myosin và actin trong đơn vị co cơ (sarcomere).',
    path: '/virtual-lab/muscle-contraction'
  },
  {
    id: 'respiratory-system',
    name: 'Hệ Hô Hấp',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    isNew: true,
    icon: <Activity color="#06b6d4" size={24} />,
    bg: 'rgba(6, 182, 212, 0.2)',
    description: 'Khám phá cơ chế trao đổi khí qua phế nang, chu kỳ hít thở và tuần hoàn oxy trong cơ thể.',
    path: '/virtual-lab/respiratory-system'
  },
  {
    id: 'male-reproductive',
    name: 'Hệ Sinh Sản Nam',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    isNew: true,
    icon: <User color="#0ea5e9" size={24} />,
    bg: 'rgba(14, 165, 233, 0.2)',
    description: 'Khám phá cấu trúc giải phẫu cơ quan sinh sản nam và cơ chế sản sinh tinh trùng.',
    path: '/virtual-lab/male-reproductive'
  },
  {
    id: 'female-reproductive',
    name: 'Hệ Sinh Sản Nữ',
    category: 'Cơ thể & Giải phẫu',
    grade: 'Lớp 11',
    isNew: true,
    icon: <User color="#ec4899" size={24} />,
    bg: 'rgba(236, 72, 153, 0.2)',
    description: 'Khám phá cấu trúc giải phẫu cơ quan sinh sản nữ, chu kỳ kinh nguyệt và sự thụ tinh.',
    path: '/virtual-lab/female-reproductive'
  },
];

const VirtualLab = () => {
  const navigate = useNavigate();
  const categories = [...new Set(labs.map(l => l.category))];
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const savedScroll = sessionStorage.getItem('virtual-lab-scroll');
    if (savedScroll && containerRef.current) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = parseInt(savedScroll, 10);
        }
      }, 100);
    }
  }, []);

  const handleScroll = (e) => {
    sessionStorage.setItem('virtual-lab-scroll', e.target.scrollTop);
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      style={{ padding: '32px', height: '100%', overflowY: 'auto' }}
    >
      <h1 className="text-glow" style={{ marginBottom: '8px' }}>Trung Tâm Thực Hành Ảo BioSTEM (Đã Cập Nhật)</h1>
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
