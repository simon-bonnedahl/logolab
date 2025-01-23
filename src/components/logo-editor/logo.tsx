import { cn } from "@/lib/utils";
import { LogoSettings } from ".";
import { IconRenderer } from "../icon-picker";

interface LogoProps {
    settings: LogoSettings;
    className?: string;
  }
  export const Logo = ({ settings, className }: LogoProps) => {
  return (
    <div
          className={cn("relative flex items-center justify-center ", className)}
          style={{
            background: settings.background,
            borderRadius: settings.borderRadius * 100 + "%",
          }}
        >
          <div style={{ transform: `rotate(${settings.rotation}deg)`, width: `${settings.size * 100}%`, height: `${settings.size * 100}%`}} >
            <IconRenderer
              className="size-full"
              icon={settings.iconName}
              stroke={settings.strokeColor}
              strokeOpacity={settings.strokeOpacity}
              strokeWidth={settings.strokeWidth}
              fill={settings.fillColor}
              fillOpacity={settings.fillOpacity}
            />
          </div>
          </div>
  )
  };