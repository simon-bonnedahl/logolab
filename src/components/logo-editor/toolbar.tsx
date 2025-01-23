import { LogoSettings } from ".";
import { GradientPicker } from "../gradient-picker";
import { IconPickerDialog } from "../icon-picker";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

interface ToolbarProps {
  settings: LogoSettings;
  update: (key: keyof LogoSettings, value: string | number) => void;
}

export const Toolbar = ({ settings, update }: ToolbarProps) => {
  return (
    <div className="w-1/4 p-6 space-y-10 shadow-sm border-r bg-background/50 backdrop-blur-sm">
      {/* Background Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Background</h2>
        <div className="space-y-6">
          <div>
            <Label htmlFor="background">Color & Gradient</Label>
            <GradientPicker
              background={settings.background}
              setBackground={(val) => update("background", val)}
            />
          </div>

          <div>
            <Label htmlFor="radius">Border Radius: {settings.radius}px</Label>
            <Slider
              id="radius"
              value={[settings.radius]}
              min={0}
              max={250}
              onValueChange={(val) => update("radius", val[0])}
            />
          </div>
        </div>
      </div>

      {/* Icon Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Icon</h2>
        <div className="space-y-6">
          <IconPickerDialog iconName={settings.iconName} update={update} />

          <div>
            <Label htmlFor="size">Size: {settings.size}px</Label>
            <Slider
              id="size"
              value={[settings.size]}
              min={50}
              max={400}
              onValueChange={(val) => update("size", val[0])}
            />
          </div>

          <div>
            <Label htmlFor="rotation">Rotation: {settings.rotation}°</Label>
            <Slider
              id="rotation"
              value={[settings.rotation]}
              min={0}
              max={360}
              step={1}
              onValueChange={(val) => update("rotation", val[0])}
            />
          </div>
        </div>
      </div>

      {/* Style Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Style</h2>
        <div className="space-y-6">
          <div>
            <Label htmlFor="strokeWidth">Stroke Width: {settings.strokeWidth.toFixed(2)}px</Label>
            <Slider
              id="strokeWidth"
              value={[settings.strokeWidth]}
              min={0.1}
              max={4}
              step={0.1}
              onValueChange={(val) => update("strokeWidth", val[0])}
            />
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2">
            <div>
              <Label htmlFor="strokeColor">Stroke Color</Label>
              <Input
                id="strokeColor"
                type="color"
                value={settings.strokeColor}
                onChange={(e) => update("strokeColor", e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <Label htmlFor="strokeOpacity">Stroke Opacity: {settings.strokeOpacity.toFixed(2)}</Label>
              <Slider
                id="strokeOpacity"
                value={[settings.strokeOpacity]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(val) => update("strokeOpacity", val[0])}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-2">
            <div>
              <Label htmlFor="fillColor">Fill Color</Label>
              <Input
                id="fillColor"
                type="color"
                value={settings.fillColor}
                onChange={(e) => update("fillColor", e.target.value)}
                className="h-10"
              />
            </div>
            <div>
              <Label htmlFor="fillOpacity">Fill Opacity: {settings.fillOpacity.toFixed(2)}</Label>
              <Slider
                id="fillOpacity"
                value={[settings.fillOpacity]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={(val) => update("fillOpacity", val[0])}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};