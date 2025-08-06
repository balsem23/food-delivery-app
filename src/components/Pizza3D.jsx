import React from "react";
import { useFrame } from "@react-three/fiber";

export default function Pizza3D() {
  const ref = React.useRef();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });

  return (
    <group ref={ref}>
      {/* Crust (outer) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[3, 3, 0.2, 64]} />
        <meshStandardMaterial color="#c97b36" />
      </mesh>

      {/* Cheese (inner) */}
      <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.8, 64]} />
        <meshStandardMaterial color="#ffcc66" />
      </mesh>

      {/* Pepperoni */}
      {[
        [1, 1],
        [-1, -1],
        [0.8, -1.2],
        [-1.5, 1],
        [0, 1.8],
        [-2, 0.2],
        [1.5, -0.5],
        [-1.3, -1.5],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]}>
          <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
          <meshStandardMaterial color="#a80000" />
        </mesh>
      ))}
    </group>
  );
}
