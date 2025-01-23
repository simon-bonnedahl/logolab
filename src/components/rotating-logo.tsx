import  { useEffect, useState } from "react";
import { Logo } from "./logo-editor/logo";
import additionalPresets from "./logo-editor/additional-presets";
import { LogoSettings } from "./logo-editor";

export const RotatingLogo = () => {
  const [currentPresetIndex, setCurrentPresetIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPresetIndex((prevIndex) => 
        (prevIndex + 1) % additionalPresets.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentPreset: LogoSettings = additionalPresets[currentPresetIndex];

  return (
      <Logo settings={currentPreset} className="size-7" />
  );
};