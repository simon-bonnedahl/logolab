import { LogoSettings } from ".";
import { Logo } from "./logo";
import additionalPresets from "./additional-presets";
import { Button } from "../ui/button";
import { useState } from "react";

const CUSTOM_PRESETS_KEY = 'customPresets';

const getCustomPresets = (): LogoSettings[] => {
  const saved = localStorage.getItem(CUSTOM_PRESETS_KEY);
  return saved ? JSON.parse(saved) : [];
};

interface PresetPanelProps {
  update: (key: keyof LogoSettings, value: string | number) => void;
  currentSettings: LogoSettings;
}

export const PresetPanel = ({ update, currentSettings }: PresetPanelProps) => {
  const [customPresets, setCustomPresets] = useState<LogoSettings[]>(getCustomPresets);
  const allPresets = [...additionalPresets, ...customPresets];

  const applyPreset = (preset: LogoSettings) => {
    Object.entries(preset).forEach(([key, value]) => {
      update(key as keyof LogoSettings, value);
    });
  };

  const saveCurrentAsPreset = () => {
    const newPresets = [...customPresets, currentSettings];
    setCustomPresets(newPresets);
    localStorage.setItem(CUSTOM_PRESETS_KEY, JSON.stringify(newPresets));
  };

  return (
    <div className="w-1/4 p-6 border-l">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Presets</h2>
        <Button 
          onClick={saveCurrentAsPreset}
          variant="outline"
          size="sm"
        >
          Save Current
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {allPresets.map((preset, index) => (
          <div
            key={index}
            onClick={() => applyPreset(preset)}
            className="!p-0 relative size-fit hover:scale-105 transition-transform hover:cursor-pointer"
          >
            <Logo settings={{
              ...preset,
              size: Math.round(preset.size * (60 / preset.size)),
              radius: Math.round(preset.radius * (80 / preset.size))
            }} size={80} />
          </div>
        ))}
      </div>
    </div>
  );
};