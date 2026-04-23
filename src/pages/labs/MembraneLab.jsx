import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Instances, Instance, Cylinder } from '@react-three/drei';
import { useControls } from 'leva';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PhospholipidBilayer = () => {
  const count = 400; // 20x20
  return (
    <group>
      <Instances limit={count} range={count}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#00f0ff" roughness={0.5} metalness={0.5} />
        {Array.from({ length: 20 }).map((_, x) => 
          Array.from({ length: 20 }).map((_, z) => {
             // Leave a hole essentially at 0,0
             if(Math.abs(x - 10) < 2 && Math.abs(z - 10) < 2) return null;
             return <Instance key={`top-${x}-${z}`} position={[x - 10, 0.5, z - 10]} />
          })
        )}
      </Instances>
      <Instances limit={count} range={count}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.5} metalness={0.5} />
        {Array.from({ length: 20 }).map((_, x) => 
          Array.from({ length: 20 }).map((_, z) => {
             if(Math.abs(x - 10) < 2 && Math.abs(z - 10) < 2) return null;
             return <Instance key={`bot-${x}-${z}`} position={[x - 10, -0.5, z - 10]} />
          })
        )}
      </Instances>
    </group>
  );
};

const IonCluster = ({ concentration, isOpen }) => {
  const groupRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, idx) => {
        if (idx < concentration) {
          child.visible = true;
          const dist = Math.sqrt(child.position.x ** 2 + child.position.z ** 2);
          
          if (isOpen && dist < 1.5 && child.position.y > -4) {
             child.position.y -= 0.05; // fall through
             if (child.position.y < -4) child.position.y = 4; // respawn at top to simulate infinite continuous flow
          } else {
             // Jiggle mechanism
             child.position.x += Math.sin(time * 2 + idx) * 0.02;
             child.position.z += Math.cos(time * 3 + idx) * 0.02;
             
             // Keep strictly bouncing on top
             if(child.position.y > 0.6) {
                child.position.y += Math.sin(time * 5 + idx) * 0.01;
             }
          }
        } else {
          child.visible = false;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 150 }).map((_, i) => (
        <mesh key={i} position={[(Math.random()-0.5)*18, 1+Math.random()*4, (Math.random()-0.5)*18]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshStandardMaterial color="#00ffa3" emissive="#00ffa3" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  )
};

const MembraneLab = () => {
  const navigate = useNavigate();
  const { concentration, openChannel } = useControls('Chỉ số Màng', {
    concentration: { value: 50, min: 0, max: 150, step: 1, label: 'Nồng độ Ion(+)' },
    openChannel: { value: false, label: 'Mở Kênh Protein' }
  });

  return (
    <div style={{ height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
       <div style={{ position: 'absolute', top: 24, left: 32, zIndex: 10 }}>
          <button 
            onClick={() => navigate('/virtual-lab')}
            className="btn-primary" 
            style={{ marginBottom: '16px', border: 'none', background: 'rgba(0,0,0,0.5)' }}
          >
            <ArrowLeft size={16} /> Dashboard
          </button>
          <h1 className="text-glow" style={{ margin: 0 }}>Động Lực Thẩm Thấu Màng (Khối 10)</h1>
       </div>

       <div style={{ flex: 1, background: '#020617' }}>
         <Canvas camera={{ position: [0, 5, 12], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
            
            <PhospholipidBilayer />
            
            <Cylinder args={[1.2, 1.2, 2.5, 32]} position={[0, 0, 0]}>
               <meshStandardMaterial color={openChannel ? "#22c55e" : "#ef4444"} transparent opacity={0.6} side={2} />
            </Cylinder>

            <IonCluster concentration={concentration} isOpen={openChannel} />

            <OrbitControls minDistance={2} maxDistance={20} />
         </Canvas>
       </div>
    </div>
  );
}
export default MembraneLab;
