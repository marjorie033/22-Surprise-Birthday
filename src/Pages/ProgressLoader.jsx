import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export function ProgressLoader({ onLoaded }) {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setTimeout(onLoaded, 500);
    }
  }, [progress, onLoaded]);

  return null;
}