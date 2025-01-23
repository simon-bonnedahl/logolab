import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseGradientAngle (direction: string) {
  let x1, y1, x2, y2;
  if (direction.includes("deg")) {
    const angle = parseFloat(direction.replace("deg", ""));

    // Convert CSS angles to SVG gradient coordinates
    const rad = ((angle - 90) * Math.PI) / 180;
    x1 = 0.5 - 0.5 * Math.cos(rad);
    y1 = 0.5 - 0.5 * Math.sin(rad);
    x2 = 0.5 + 0.5 * Math.cos(rad);
    y2 = 0.5 + 0.5 * Math.sin(rad);
  } else {
    // Handle directional keywords ("to bottom right", etc.)
    switch (direction.trim()) {
      case "to top":
        x1 = 0.5;
        y1 = 1;
        x2 = 0.5;
        y2 = 0;
        break;
      case "to bottom":
        x1 = 0.5;
        y1 = 0;
        x2 = 0.5;
        y2 = 1;
        break;
      case "to left":
        x1 = 1;
        y1 = 0.5;
        x2 = 0;
        y2 = 0.5;
        break;
      case "to right":
        x1 = 0;
        y1 = 0.5;
        x2 = 1;
        y2 = 0.5;
        break;
      case "to top left":
        x1 = 1;
        y1 = 1;
        x2 = 0;
        y2 = 0;
        break;
      case "to top right":
        x1 = 0;
        y1 = 1;
        x2 = 1;
        y2 = 0;
        break;
      case "to bottom left":
        x1 = 1;
        y1 = 0;
        x2 = 0;
        y2 = 1;
        break;
      case "to bottom right":
        x1 = 0;
        y1 = 0;
        x2 = 1;
        y2 = 1;
        break;
      default:
        // Default to top-bottom gradient if no match
        x1 = 0.5;
        y1 = 0;
        x2 = 0.5;
        y2 = 1;
    }
  }
  return { x1, y1, x2, y2 };
}