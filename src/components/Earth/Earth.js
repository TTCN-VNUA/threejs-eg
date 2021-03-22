import React, { useRef } from "react";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";
import {
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./Earth.css";

extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  // Tham khảo các điều khiển để chúng tôi có thể cập nhật chúng trên mọi khung hình bằng useFrame
  const controls = useRef();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      autoRotate={true}
      enableZoom={false}
    />
  );
};

// Loads the skybox texture and applies it to the scene.
// Tải kết cấu skybox và áp dụng nó vào cảnh.
function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  // Phương thức tải CubeTextureLoader lấy một mảng các url đại diện cho tất cả 6 cạnh của khối lập phương.
  const texture = loader.load([
    "/1.png",
    "/2.png",
    "/3.png",
    "/4.png",
    "/5.png",
    "/6.png",

  ]);

  // Set the scene background property to the resulting texture.
  // Đặt thuộc tính nền cảnh thành kết cấu kết quả.
  scene.background = texture;
  return null;
}

// Geometry
function Sphere() {
  const { scene, gl } = useThree();
  // The cubeRenderTarget is used to generate a texture for the reflective sphere.
    // CubeRenderTarget được sử dụng để tạo kết cấu cho hình cầu phản chiếu.
  // It must be updated on each frame in order to track camera movement and other changes.
    // Nó phải được cập nhật trên mỗi khung hình để theo dõi chuyển động của máy ảnh và các thay đổi khác.
  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter
  });
  const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
  cubeCamera.position.set(0, 0, 0);
  scene.add(cubeCamera);

  // Update the cubeCamera with current renderer and scene.
  // Cập nhật cubeCamera với trình kết xuất và cảnh hiện tại.
  useFrame(() => cubeCamera.update(gl, scene));

  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]} castShadow>
      <directionalLight intensity={0.5} />
      <sphereGeometry attach="geometry" args={[2, 32, 32]} />
      <meshBasicMaterial
        attach="material"
        envMap={cubeCamera.renderTarget.texture}
        color="white"
        roughness={0.1}
        metalness={1}
      />
    </mesh>
  );
}

// Lights
function Earth() {
  return (
    <Canvas className="canvas">
      <CameraControls />
      <Sphere />
      <SkyBox />
    </Canvas>
  );
}

export default Earth;
