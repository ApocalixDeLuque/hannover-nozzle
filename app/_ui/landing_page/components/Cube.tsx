import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Text } from '@react-three/drei';
import { Group, MathUtils } from 'three';

useGLTF.preload('./models/cube.gltf');

interface CubeProps {
  scale?: number;
}

const Cube: React.FC<CubeProps> = ({ scale = 1 }) => {
  const groupRef = useRef<Group>(null);
  const [modelError, setModelError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { scene } = useGLTF('./models/cube.gltf', undefined, undefined, (error) => {
    console.error('An error happened while loading the model:', error);
    setModelError(`Failed to load the 3D model: ${error}`);
    setIsLoading(false);
  }) as unknown as { scene: Group };

  useEffect(() => {
    if (scene) {
      setIsLoading(false);
    }
    if (groupRef.current) {
      groupRef.current.rotation.x = MathUtils.degToRad(-20);
      groupRef.current.rotation.z = MathUtils.degToRad(-10);
    }
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  if (isLoading) {
    return <Text>Loading 3D model...</Text>;
  }

  if (modelError) {
    return <Text>Error: {modelError}</Text>;
  }

  return <primitive object={scene} scale={scale} ref={groupRef} />;
};

export default Cube;
