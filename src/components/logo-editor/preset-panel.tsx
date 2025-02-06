import { LogoSettings } from ".";import additionalPresets from "./additional-presets";import { Button } from "../ui/button";import { useState } from "react";import { Logo } from "./logo";import { Download, Save } from "lucide-react";

const CUSTOM_PRESETS_KEY = 'customPresets';

const getCustomPresets = (): LogoSettings[] => {
  const saved = localStorage.getItem(CUSTOM_PRESETS_KEY);
  return saved ? JSON.parse(saved) : [];
};

interface PresetPanelProps {
  update: (key: keyof LogoSettings, value: string | number) => void;
  currentSettings: LogoSettings;
  handleDownload: () => void;
}

export const PresetPanel = ({ update, currentSettings, handleDownload }: PresetPanelProps) => {
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
    <div className="w-1/5 border-l bg-background/50 backdrop-blur-sm flex flex-col max-h-full overflow-hidden">
      <div className="p-6 border-b sticky top-0 bg-background/50 backdrop-blur-sm z-10">
        <h2 className="text-xl font-semibold tracking-tight">Presets</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-6 pt-4 max-h-[800px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4 auto-rows-max  ">
          {allPresets.map((preset, index) => (
            <div
              key={index}
              onClick={() => applyPreset(preset)}
              className="!p-0 relative flex items-center justify-center hover:scale-105 transition-all duration-200 hover:cursor-pointer hover:shadow-lg rounded-lg overflow-hidden bg-transparent"
            >
              <Logo settings={preset} className="w-full aspect-square" />
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 border-t sticky bottom-0 bg-background/50 backdrop-blur-sm z-10  gap-3 justify-end flex flex-col">
        <Button 
          onClick={saveCurrentAsPreset}
          variant="outline"
          size="default"
          className="flex items-center gap-2 w-full"
        >
          <Save className="size-4" />
          Save as preset
        </Button>
        <Button
          onClick={handleDownload}
          variant="default"
          size="default"
          className="flex items-center gap-2 w-full"
        >
          <Download className="size-4" />
          Download as SVG
        </Button> 
      </div>
    </div>
  );
};