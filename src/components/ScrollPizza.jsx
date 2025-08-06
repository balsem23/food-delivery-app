import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ScrollPizza({ active, type = "pepperoni", delay = 0 }) {
  const mesh = useRef();

  useFrame(() => {
    if (!active || !mesh.current) return;

    // Scroll-based animation: move right and roll
    mesh.current.position.x += 0.05;
    mesh.current.rotation.z += 0.1;

    // Reset if out of frame (loop effect, optional)
    if (mesh.current.position.x > 6) {
      mesh.current.position.x = -6;
    }
  });

  const color =
    type === "vegetable" ? "#88c057" :
    type === "seafood" ? "#91d6d6" :
    "#d2691e";

  return (
    <mesh ref={mesh} position={[-6, 0, delay]}>
      <cylinderGeometry args={[2, 2, 0.3, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
