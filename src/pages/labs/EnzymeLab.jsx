import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, ContactShadows } from '@react-three/drei';
import { useControls } from 'leva';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Particle = ({ position, color, speed }) => {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.y += Math.sin(t * speed + position[0]) * 0.005;
  });
  return (
    <Sphere ref={ref} args={[0.2, 16, 16]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
    </Sphere>
  );
};

const Nucleus = ({ distort, speed, color }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[2.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial 
          color={color} 
          emissive="#0044ff"
          emissiveIntensity={0.3}
          distort={distort} 
          speed={speed} 
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

const EnzymeLab = () => {
  const navigate = useNavigate();
  const { coreColor, distortLevel, enzymeActivity, ionCount } = useControls('Môi Trường', {
    coreColor: { value: '#00f0ff', label: 'Tác nhân kích thích' },
    distortLevel: { value: 0.4, min: 0, max: 1, step: 0.1, label: 'Độ biến dạng' },
    enzymeActivity: { value: 2, min: 0, max: 10, step: 0.5, label: 'Hoạt tính Enzyme' },
    ionCount: { value: 30, min: 0, max: 100, step: 1, label: 'Nồng độ vật chất' },
  });

  const ions = useMemo(() => {
    return Array.from({ length: 100 }).map(() => ({
      position: [(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12],
      speed: Math.random() * 2 + 1,
    }));
  }, []);

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
          <h1 className="text-glow" style={{ margin: 0 }}>Hoạt tính Enzyme Học (Lớp 11)</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginTop: '8px' }}>
            Mô phỏng tốc độ biến dạng xúc tác theo các điều kiện môi trường vi mô (Nhiệt độ, Nồng độ chất).
          </p>
       </div>

       <div style={{ flex: 1, background: '#020617' }}>
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#00f0ff" />
          <pointLight position={[-10, -10, -5]} intensity={2} color="#8b5cf6" />
          
          <Nucleus distort={distortLevel} speed={enzymeActivity} color={coreColor} />
          
          {ions.slice(0, ionCount).map((ion, i) => (
            <Particle key={i} position={ion.position} speed={ion.speed} color={coreColor} />
          ))}

          <ContactShadows position={[0, -4, 0]} resolution={512} scale={20} blur={2} opacity={0.5} color="#00f0ff" />
          <OrbitControls maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 4} maxDistance={15} minDistance={4} />
        </Canvas>
      </div>
    </div>
  );
};
export default EnzymeLab;
