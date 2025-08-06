import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

function RollingPizza({ modelPath, position }) {
  const ref = useRef();
  const { scene } = useGLTF(modelPath);

  // Rotate forward along the Z-axis (like a tire)
  useEffect(() => {
    let frame;
    const animate = () => {
      if (ref.current) {
        ref.current.rotation.y += 0.01;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  // Apply a base rotation so it's facing forward
  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.9}
      position={position}
      rotation={[Math.PI / 2, 0, 0]} // Rotate pizza to face forward
    />
  );
}

export default function PizzaScrollShowcase() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative w-full h-[80vh] bg-[#0c0c0c] overflow-hidden"
    >
      <Canvas camera={{ position: [0, 0, 12], fov: 40 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        {inView && (
          <>
            <RollingPizza modelPath="/models/pizza1.glb" position={[-8, 0, 0]} />
            <RollingPizza modelPath="/models/pizza2.glb" position={[0, 0, 0]} />
            <RollingPizza modelPath="/models/pizza3.gltf" position={[8, 0, 0]} />
            <OrbitControls enableZoom={false} />
          </>
        )}
      </Canvas>
    </section>
  );
}
