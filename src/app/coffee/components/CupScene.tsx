"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 1.3, 4.4);
    camera.lookAt(0, -0.05, 0);
  }, [camera]);
  return null;
}

function CoffeeCup({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const liquid = useRef<THREE.Mesh>(null);
  const steamGroup = useRef<THREE.Group>(null);

  const steamCurves = useMemo(() => {
    return new Array(4).fill(0).map((_, i) => {
      const offsetX = (i - 1.5) * 0.16;
      const points = new Array(8).fill(0).map((_, j) => {
        const t = j / 7;
        return new THREE.Vector3(
          offsetX + Math.sin(t * Math.PI * 2 + i) * 0.12 * t,
          t * 1.6,
          Math.cos(t * Math.PI * 2 + i) * 0.1 * t
        );
      });
      return new THREE.CatmullRomCurve3(points);
    });
  }, []);

  useFrame((state) => {
    const p = progressRef.current;
    const t = state.clock.elapsedTime;

    if (group.current) {
      group.current.rotation.y = p * Math.PI * 3;
      group.current.rotation.x = Math.sin(p * Math.PI) * 0.12;
      const scale = 0.75 + Math.min(p, 0.55) * 0.7;
      group.current.scale.setScalar(scale);
      group.current.position.y = -0.2 + Math.sin(p * Math.PI) * 0.15;
    }

    if (liquid.current) {
      const fill = THREE.MathUtils.clamp(p / 0.3, 0, 1);
      liquid.current.scale.y = THREE.MathUtils.lerp(0.05, 1, fill);
      const mat = liquid.current.material as THREE.MeshStandardMaterial;
      mat.opacity = fill;
    }

    if (steamGroup.current) {
      const steamOpacity =
        THREE.MathUtils.smoothstep(p, 0.28, 0.55) *
        (1 - THREE.MathUtils.smoothstep(p, 0.85, 1));
      steamGroup.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshBasicMaterial;
        mat.opacity = steamOpacity * (0.35 + 0.25 * Math.sin(t * 1.3 + i * 2));
        mesh.position.y = 0.68 + Math.sin(t * 0.6 + i) * 0.03;
      });
    }
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      <mesh position={[0, -0.72, 0]} receiveShadow>
        <cylinderGeometry args={[1.35, 1.42, 0.07, 64]} />
        <meshPhysicalMaterial color="#fbf3e6" roughness={0.35} clearcoat={0.4} />
      </mesh>

      <mesh castShadow>
        <cylinderGeometry args={[0.92, 0.74, 1.3, 64, 1, true]} />
        <meshPhysicalMaterial
          color="#fdf7ec"
          roughness={0.18}
          clearcoat={0.7}
          clearcoatRoughness={0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.74, 64]} />
        <meshPhysicalMaterial color="#fdf7ec" roughness={0.2} clearcoat={0.6} />
      </mesh>

      <mesh position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.045, 20, 64]} />
        <meshPhysicalMaterial color="#fdf7ec" roughness={0.15} clearcoat={0.8} />
      </mesh>

      <mesh ref={liquid} position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.84, 0.84, 0.05, 64]} />
        <meshStandardMaterial
          color="#3b2114"
          roughness={0.22}
          metalness={0.15}
          transparent
        />
      </mesh>

      <mesh position={[1.0, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.4, 0.075, 16, 48, Math.PI * 1.5]} />
        <meshPhysicalMaterial color="#fdf7ec" roughness={0.2} clearcoat={0.6} />
      </mesh>

      <group ref={steamGroup} position={[0, 0.62, 0]}>
        {steamCurves.map((curve, i) => (
          <mesh key={i}>
            <tubeGeometry args={[curve, 20, 0.025, 8, false]} />
            <meshBasicMaterial
              color="#fff8ee"
              transparent
              opacity={0}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function BackgroundBeans() {
  const group = useRef<THREE.Group>(null);
  const beans = useMemo(
    () =>
      new Array(18).fill(0).map(() => ({
        position: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 5,
          -2 - Math.random() * 3,
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [
          number,
          number,
          number
        ],
        scale: 0.06 + Math.random() * 0.08,
      })),
    []
  );

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <group ref={group}>
      {beans.map((b, i) => (
        <mesh key={i} position={b.position} rotation={b.rotation} scale={b.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#3d2214" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function CupScene({
  progressRef,
}: {
  progressRef: MutableRefObject<number>;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.3, 4.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <CameraRig />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 2]} intensity={1.4} castShadow />
      <pointLight position={[-3, 1, -2]} intensity={0.6} color="#d9a94e" />
      <pointLight position={[2, -1, 2]} intensity={0.35} color="#ffffff" />
      <BackgroundBeans />
      <CoffeeCup progressRef={progressRef} />
    </Canvas>
  );
}
