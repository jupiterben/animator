import { createRoot } from "react-dom/client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Avatar from './Avatar'
import { OrbitControls } from '@react-three/drei';

export class AnimatorView {
    constructor() { }
    render() {
        const container = document.getElementById("root");
        const root = createRoot(container!);
        root.render(
            <Canvas
                camera={{ position: [2, 0, 12.25], fov: 15 }}
                style={{
                    backgroundColor: '#111a21',
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <ambientLight intensity={1.25} />
                <ambientLight intensity={0.1} />
                <directionalLight intensity={0.4} />
                <Suspense fallback={null}>
                    <Avatar position={[0.025, -0.9, 0]} /> 
                </Suspense>
                <OrbitControls />
            </Canvas>
        );
    }
}
