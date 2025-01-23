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
  const scaledPreset = {
    ...currentPreset,
    size: Math.round(currentPreset.size * (20 / currentPreset.size)),
    radius: Math.round(currentPreset.radius * (30 / currentPreset.size))
  };

  return (
    <div className="mr-2">
      <Logo settings={scaledPreset} size={25} />
    </div>
  );
};