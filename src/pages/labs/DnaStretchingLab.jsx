import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DnaHelix = ({ pullForce }) => {
  const groupRef = useRef();
  const pointsCount = 100;
  
  useFrame(() => {
     groupRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef} position={[0, -5 - pullForce * 0.5, 0]}>
      {Array.from({ length: pointsCount }).map((_, i) => {
         const t = i / pointsCount;
         const angle = t * Math.PI * 12; // number of spiral loops
         const stretchFactor = 10 + pullForce; 
         
         const y = t * stretchFactor;
         const r = Math.max(0.2, 2 - pullForce * 0.12); 
         
         const x1 = Math.cos(angle) * r;
         const z1 = Math.sin(angle) * r;
         
         const x2 = Math.cos(angle + Math.PI) * r;
         const z2 = Math.sin(angle + Math.PI) * r;

         return (
           <group key={i}>
             {/* Đường xoắn 1 (Cyan) */}
             <mesh position={[x1, y, z1]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshStandardMaterial color="#00f0ff" />
             </mesh>
             {/* Đường xoắn 2 (Purple) */}
             <mesh position={[x2, y, z2]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshStandardMaterial color="#8b5cf6" />
             </mesh>
             {/* Liên kết Hydro / Base pair */}
             {i % 3 === 0 && (
                <mesh position={[(x1+x2)/2, y, (z1+z2)/2]} rotation={[Math.PI/2, 0, -angle]}>
                  {/* Trụ nối ngang */}
                  <cylinderGeometry args={[0.04, 0.04, r * 2]} />
                  <meshStandardMaterial color="#00ffa3" emissive="#00ffa3" emissiveIntensity={0.2} transparent opacity={Math.max(0, 1 - pullForce*0.1)} />
                </mesh>
             )}
           </group>
         )
      })}
    </group>
  );
};

const DnaStretchingLab = () => {
  const navigate = useNavigate();
  // Điều khiển lực kéo bằng kẹp quang học. Giới hạn 10 để tránh gãy cấu trúc mảng.
  const { pullForce } = useControls('Lò Xo Sinh Học', {
    pullForce: { value: 0, min: 0, max: 12, step: 0.1, label: 'Lực Kéo Giãn (pN)' },
  });

  return (
    <div style={{ height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
       {/* UI Lớp nổi */}
       <div style={{ position: 'absolute', top: 24, left: 32, zIndex: 10 }}>
          <button 
            onClick={() => navigate('/virtual-lab')}
            className="btn-primary" 
            style={{ marginBottom: '16px', border: 'none', background: 'rgba(0,0,0,0.5)' }}
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
          <h1 className="text-glow" style={{ margin: 0 }}>Vật lý Đại Phân Tử: Kéo Dãn DNA (Lớp 12)</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginTop: '8px' }}>
            Thiết lập này ứng dụng kẹp quang học (Optical Tweezers) để cô lập 1 chuỗi vòng DNA. Gia tăng lực kéo giãn thanh trượt để quan sát hệ quả đứt gãy cầu nối Hydro bổ sung.
          </p>
       </div>

       <div style={{ flex: 1, background: '#020617' }}>
         <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
            <pointLight position={[-10, 0, -10]} intensity={1} color="#8b5cf6" />
            
            <DnaHelix pullForce={pullForce} />

            <OrbitControls minDistance={5} maxDistance={30} />
         </Canvas>
       </div>
    </div>
  );
}
export default DnaStretchingLab;
