import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { useInView } from "react-intersection-observer";
import ScrollPizza from "./ScrollPizza";

export default function Categories() {
  const [ref1, inView1] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5 });
  const [ref3, inView3] = useInView({ threshold: 0.5 });

  return (
    <section className="relative w-full text-white bg-black min-h-[300vh]">
      <div className="sticky top-0 h-screen w-full z-10">
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1} />
          <Suspense fallback={null}>
            <ScrollPizza visible={inView1} type="pepperoni" offset={-5} />
            <ScrollPizza visible={inView2} type="vegetable" offset={-15} />
            <ScrollPizza visible={inView3} type="seafood" offset={-25} />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll-trigger zones */}
      <div ref={ref1} className="h-screen" />
      <div ref={ref2} className="h-screen" />
      <div ref={ref3} className="h-screen" />
    </section>
  );
}
