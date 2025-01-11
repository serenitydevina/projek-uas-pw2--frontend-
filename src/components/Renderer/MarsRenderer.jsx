import React, { Suspense } from 'react';
import { Canvas  } from "react-three-fiber";
import CameraControls from "./CameraControls";
import Sphere from "./Sphere";

function MarsRenderer() {
  return (
    <>
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
      <CameraControls />
      <directionalLight
        intensity={0.8}
        position={[1, 1, 1]}
        castShadow
      />
      <ambientLight intensity={0.6} />

        <Suspense fallback="loading">
          <Sphere />
        </Suspense>
        </Canvas>
    </>
  );
}

/*
<Canvas className="canvas">
        
        
        
        
        <SkyBox />
      </Canvas>
*/

export default MarsRenderer;
