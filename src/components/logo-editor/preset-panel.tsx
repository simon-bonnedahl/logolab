import { LogoSettings } from ".";
import { Logo } from "./logo";
import additionalPresets from "./additional-presets";

const presets: LogoSettings[] = additionalPresets;

interface PresetPanelProps {
  update: (key: keyof LogoSettings, value: string | number) => void;
}


export const PresetPanel = ({ update }: PresetPanelProps) => {
  const applyPreset = (preset: LogoSettings) => {
    Object.entries(preset).forEach(([key, value]) => {
      update(key as keyof LogoSettings, value);
    });
  };

  return (
    <div className="w-1/4 p-6 border-l">
      <h2 className="text-lg font-semibold mb-4">Presets</h2>
      <div className="grid grid-cols-3 gap-4">
        {presets.map((preset, index) => {

          return (
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
          );
        })}
      </div>
    </div>
  );
};