"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as LucideIcons from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { LogoSettings } from "./logo-editor";
import { Label } from "./ui/label";

type IconPickerDialogProps = {
  iconName: string;
  update: (key: keyof LogoSettings, value: string | number) => void;
};

export const IconPickerDialog = ({
  iconName,
  update,
}: IconPickerDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <div className="flex flex-col">
        <Label htmlFor="iconName" className="mb-1">Icon</Label>

      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          {iconName ? (
            <>
              <IconRenderer className="size-4 text-zinc-500" icon={iconName} />
            </>
          ) : (
            "Select"
          )}
        </Button>
      </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
          <DialogDescription>Choose the best suited icon</DialogDescription>
        </DialogHeader>
        <IconPicker
          onChange={(iconName) => {
            update("iconName", iconName);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
export const IconPicker = ({
  onChange,
}: {
  onChange: (icon: string) => void;
}) => {
  const { search, setSearch, icons } = useIconPicker();

  return (
    <div className="relative">
      <Input
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TooltipProvider delayDuration={50}>
        <div className="mt-2 flex h-full max-h-[400px] flex-wrap gap-2 overflow-y-scroll py-4 pb-12">
          {icons.splice(0, 1000).map(({ name, friendly_name }) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  key={name}
                  type="button"
                  role="button"
                  onClick={() => onChange(name)}
                  className="h-11"
                >
                  <IconRenderer icon={name} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{friendly_name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          {icons.length === 0 && (
            <div className="col-span-full flex grow flex-col items-center justify-center gap-2 text-center">
              <p>No icons found...</p>
              <Button onClick={() => setSearch("")} variant="ghost">
                Clear search
              </Button>
            </div>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
};


type Icons = {
  // the name of the component
  name: string;
  // a more human-friendly name
  friendly_name: string;
};

export const useIconPicker = (): {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  icons: Icons[];
} => {
  const icons: Icons[] = useMemo(
    () =>
      Object.entries(LucideIcons).map(([iconName]) => ({
        name: iconName,
        friendly_name: iconName.match(/[A-Z][a-z]+/g)?.join(" ") ?? iconName,
      })),
    []
  );

  const [search, setSearch] = useState("");
  //   memoize the search functionality
  const filteredIcons = useMemo(() => {
    return icons.filter((icon) => {
      if (search === "") {
        return true;
      } else if (icon.name.toLowerCase().includes(search.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
  }, [icons, search]);

  return { search, setSearch, icons: filteredIcons };
};

export const IconRenderer = ({
  icon,
  ...rest
}: {
  icon: string;
} & React.ComponentPropsWithoutRef<"svg">) => {
  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ElementType;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent data-slot="icon" {...rest} />;
};
