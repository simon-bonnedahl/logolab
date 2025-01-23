import { LogoSettings } from ".";
import { IconRenderer } from "../icon-picker";

interface LogoProps {
    settings: LogoSettings;
    size: number;
  }
  export const Logo = ({ settings, size }: LogoProps) => {
    // Pattern behind everything
  return (
    <div
          className={"relative flex items-center justify-center shadow-xl"}
          style={{
            width: size,
            height: size,
            background: settings.background,
            borderRadius: settings.radius,
            padding: Math.max(0, (size - settings.size) / 2)
          }}
        >
          <div style={{ transform: `rotate(${settings.rotation}deg)` }}>
            <IconRenderer
              icon={settings.iconName}
              width={settings.size}
              height={settings.size}
              stroke={settings.strokeColor}
              strokeOpacity={settings.strokeOpacity}
              strokeWidth={settings.strokeWidth }
              fill={settings.fillColor}
              fillOpacity={settings.fillOpacity}
            />
          </div>
          </div>
  )
  };