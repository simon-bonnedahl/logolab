import React from "react";
import ReactDOMServer from "react-dom/server";
import { Preview } from "./preview";
import { IconRenderer } from "../icon-picker";
import { PresetPanel } from "./preset-panel";
import { parseGradientAngle } from "@/lib/utils";
import { Toolbar } from "./toolbar";
import additionalPresets from "./additional-presets";

export interface LogoSettings {
  background: string; // can be a color or gradient
  fillColor: string;
  fillOpacity: number;
  iconName: string;
  borderRadius: number;
  rotation: number;
  size: number;
  strokeWidth: number;
  strokeColor: string;
  strokeOpacity: number;
}

const defaultSettings: LogoSettings = additionalPresets[0];

export default function LogoEditor() {
  const [settings, setSettings] = React.useState<LogoSettings>(() => {
    const savedSettings = localStorage.getItem('logoSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  const update = (key: keyof LogoSettings, value: string | number) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('logoSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };
  async function handleDownload() {
    const size = 500;
    const iconSvg = ReactDOMServer.renderToStaticMarkup(
      <IconRenderer
        width={size * settings.size}
        height={size * settings.size}
        icon={settings.iconName}
        stroke={settings.strokeColor}
        strokeWidth={settings.strokeWidth}
        fill={settings.fillColor}
        fillOpacity={settings.fillOpacity}
      />
    );

    let defs = "";
    let backgroundFill = "";

    if (settings.background.startsWith("linear-gradient")) {
      const gradientMatch = settings.background.match(/linear-gradient\(([^)]+)\)/);
      if (gradientMatch) {
        const gradientContent = gradientMatch[1].split(",");
        const direction = gradientContent.shift()?.trim();
        const stops = gradientContent.map((stop, index) => {
          const [color, position] = stop.trim().split(/\s+/);
          return `<stop offset="${
            position || (index / (gradientContent.length - 1)) * 100
          }%" stop-color="${color}" />`;
        });
  
        const { x1, y1, x2, y2 } = parseGradientAngle(direction || "to bottom");
  
        defs += `
          <defs>
            <linearGradient id="grad" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" gradientUnits="objectBoundingBox">
              ${stops.join("\n")}
            </linearGradient>
          </defs>
        `;
        backgroundFill = "url(#grad)";
      }
    } else if (settings.background.startsWith("radial-gradient")) {
      const gradientMatch = settings.background.match(/radial-gradient\(([^)]+)\)/);
      if (gradientMatch) {
        const gradientContent = gradientMatch[1].split(",");
        const stops = gradientContent.map((stop, index) => {
          const [color, position] = stop.trim().split(/\s+/);
          const offset = position ? 
            position.endsWith('%') ? position : `${parseFloat(position) * 100}%` :
            `${(index / (gradientContent.length - 1)) * 100}%`;
          return `<stop offset="${offset}" stop-color="${color}" />`;
        });

        defs = `
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" spreadMethod="pad" gradientUnits="userSpaceOnUse">
              ${stops.join("\n")}
            </radialGradient>
          </defs>
        `;
        backgroundFill = `url(#grad)`;
      }
    } else {
      backgroundFill = settings.background;
    }

    const backgroundRect = `
      <rect
        x="0"
        y="0"
        width="${size}"
        height="${size}"
        rx="${settings.borderRadius * size}"
        fill="${backgroundFill}"
      />
    `;

    const fullSvg = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="${size}"
        height="${size}"
      >
        ${defs}
        ${backgroundRect}
        <g transform="translate(${size / 2}, ${size / 2}) rotate(${settings.rotation}) translate(${-(size * settings.size) / 2}, ${-(size * settings.size) / 2})">
          ${iconSvg}
        </g>
      </svg>
    `;

    const blob = new Blob([fullSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `logo.svg`;
    link.click();

    URL.revokeObjectURL(url);
  }
  
  

  return (
    <div className="w-full h-full flex "  >
      <Toolbar settings={settings} update={update} />
      <Preview settings={settings} handleDownload={handleDownload} />
      <PresetPanel update={update} currentSettings={settings} handleDownload={handleDownload} />
    </div>
  );
}
