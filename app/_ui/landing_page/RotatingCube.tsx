'use client';

import { OrbitControls } from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import dynamic from 'next/dynamic';

function ForceUpdate() {
  const { scene } = useThree();
  scene.updateMatrixWorld();
  return null;
}

const Cube = dynamic(() => import('./components/Cube'), { ssr: false });

export function RotatingCube(): JSX.Element {
  return (
    <div className="flex flex-col min-h-[80vh] w-full bg-light text-dark items-center justify-center relative cross-dot-pattern">
      <div className="w-full h-[80vh] relative">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ForceUpdate />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <directionalLight position={[-5, 2, -5]} intensity={5} castShadow />
          <Cube scale={0.012} />
          <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
        </Canvas>
        <p className="absolute top-20 left-10 text-[96px] font-extrabold tracking-tight leading-none">
          Tus
          <br />
          <span className="pl-10">ideas</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/red_dash.png"
            alt="Red dash"
            className="absolute -bottom-6 right-0 w-64 h-auto"
            style={{ mixBlendMode: 'multiply' }}
          />
        </p>
        <p className="absolute bottom-20 right-10 text-[96px] font-extrabold tracking-tight leading-none">
          en tus
          <br />
          manos
        </p>
      </div>
    </div>
  );
}
