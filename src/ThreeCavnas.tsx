import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Avatar from './Avatar'
import { OrbitControls } from '@react-three/drei';


export default function TreeCanvas() {
    return (<Canvas
        camera={{ position: [2, 0, 12.25], fov: 30 }}
        style={{
            backgroundColor: '#111a21',
        }}
    >
        <ambientLight intensity={1.25} />
        <ambientLight intensity={0.1} />
        <directionalLight intensity={0.4} />
        <Suspense fallback={null}>
            <Avatar position={[0.025, -0.9, 0]} />
        </Suspense>
        <OrbitControls />
    </Canvas>);
}