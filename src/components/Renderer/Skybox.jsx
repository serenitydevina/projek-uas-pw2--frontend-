import { useThree } from "react-three-fiber";
import { CubeTextureLoader } from "three";

// Loads the skybox texture and applies it to the scene.
const SkyBox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "/images/front.jpg",
    "/images/back.jpg",
    "/images/top.jpg",
    "/images/bottom.jpg",
    "/images/left.jpg",
    "/images/right.jpg",
  ]);

  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
};

export default SkyBox;