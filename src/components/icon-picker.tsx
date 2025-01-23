"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as LucideIcons from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { LogoSettings } from "./logo-editor";

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
    

      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="size-10 p-0">
          {iconName ? (
            <>
              <IconRenderer  icon={iconName} />
            </>
          ) : (
            "Select"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
        
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
  const [displayCount, setDisplayCount] = useState(100);
  const displayedIcons = useMemo(() => icons.slice(0, displayCount), [icons, displayCount]);

  return (
    <div className="relative">
      <Input
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />
      <TooltipProvider delayDuration={50}>
        <div className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] gap-4 h-full max-h-[400px] overflow-y-auto px-2 py-3 pb-16">
          {displayedIcons.map(({ name, friendly_name }) => (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  role="button"
                  onClick={() => onChange(name)}
                  className="h-14 w-14 p-0 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                  variant="outline"
                >
                  <IconRenderer icon={name} className="h-7 w-7" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{friendly_name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          {displayedIcons.length === 0 && (
            <div className="col-span-full flex grow flex-col items-center justify-center gap-3 text-center py-8">
              <p className="text-muted-foreground">No icons found...</p>
              <Button onClick={() => setSearch("")} variant="secondary" size="sm">
                Clear search
              </Button>
            </div>
          )}
        </div>
        {displayedIcons.length > 0 && displayedIcons.length < icons.length && (
          <div className="sticky bottom-0 w-full pt-3 pb-3 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border-t shadow-sm">
            <Button 
              onClick={() => setDisplayCount(prev => prev + 100)} 
              variant="secondary"
              className="w-full"
              size="sm"
            >
              Load More Icons
            </Button>
          </div>
        )}
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
  className,
  ...rest
}: {
  icon: string;
  className?: string;
} & React.ComponentPropsWithoutRef<"svg">) => {
  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ElementType;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent data-slot="icon" {...rest}  className={className}/>;
};
