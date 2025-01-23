import { LogoSettings } from ".";
import { Logo } from "./logo";
import { paperPattern } from "@/lib/consts";


interface PreviewProps {
  settings: LogoSettings;
  handleDownload: () => void;
}
export const Preview = ({ settings }: PreviewProps) => {

  return (
    <div
      className="flex w-3/5 h-full items-center justify-center relative"
      style={{ backgroundImage: `url("${paperPattern}")` }}
    >
        <div className="outline-2 outline-dashed outline-[#9C92AC20] hover:outline-[#9C92AC50] bg-[#9C92AC15] hover:bg-[#9C92AC25] duration-100">

      <Logo settings={settings} className="size-96 xl:size-[500px] shadow-xl"/>

      </div>
    </div>
  );
};


