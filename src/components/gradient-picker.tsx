'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Paintbrush } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'


export function GradientPicker({
    background,
    setBackground,
    className,
  }: {
    background: string;
    setBackground: (background: string) => void;
    className?: string;
  }) {
    const [gradientType, setGradientType] = useState<'linear' | 'radial'>(
      background.includes('radial') ? 'radial' : 'linear'
    );
    const [gradientDirection, setGradientDirection] = useState<string>(
      background.includes('radial') ? 'circle' : 'to top left'
    );
    const [gradientColors, setGradientColors] = useState<string[]>(
        background
            .match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g) || []
    );
    console.log(gradientColors)

  
    const solids = [
        '#E2E2E2', '#ff75c3', '#ffa647', '#ffe83f', '#9fff5b', '#70e2ff', '#cd93ff', '#09203f',
        '#1abc9c', '#3498db', '#9b59b6', '#34495e', '#f39c12', '#e74c3c', '#95a5a6', '#2ecc71',
      ];

  const gradients = [
    ['#accbee', '#e7f0fd'],
    ['#d5d4d0', '#d5d4d0', '#eeeeec'],
    ['#000000', '#434343'],
    ['#09203f', '#537895'],
    ['#AC32E4', '#7918F2', '#4801FF'],
    ['#f953c6', '#b91d73'],
    ['#ee0979', '#ff6a00'],
    ['#F00000', '#DC281E'],
    ['#00c6ff', '#0072ff'],
    ['#4facfe', '#00f2fe'],
    ['#0ba360', '#3cba92'],
    ['#FDFC47', '#24FE41'],
    ['#40E0D0', '#FF8C00', '#FF0080'],
    ['#fcc5e4', '#fda34b', '#ff7882', '#c8699e', '#7046aa', '#0c1db8', '#020f75'],
    ['#ff75c3', '#ffa647', '#ffe83f', '#9fff5b', '#70e2ff', '#cd93ff'],
    ['#03001e', '#7303c0', '#ec38bc', '#fdeff9'],
    ['#8EC5FC', '#E0C3FC'],
    ['#4158D0', '#C850C0', '#FFCC70'],
    ['#0093E9', '#80D0C7'],
    ['#8BC6EC', '#9599E2'],
    ['#A9C9FF', '#FFBBEC'],
    ['#21D4FD', '#B721FF'],
    ['#3EECAC', '#EE74E1'],
    ['#FAD961', '#F76B1C'],
    ['#FEE140', '#FA709A'],
    ['#FF9A8B', '#FF6A88', '#FF99AC'],
    ['#FBDA61', '#FF5ACD'],
    ['#85FFBD', '#FFFB7D'],
    ['#FF3CAC', '#784BA0', '#2B86C5'],
    ['#FA8BFF', '#2BD2FF', '#2BFF88']
  ]


  const gradientDirections = [
    'to right', 'to left', 'to top', 'to bottom',
    'to top left', 'to top right', 'to bottom left', 'to bottom right',
  ];

 
  const defaultTab = useMemo(() => {
    if (background.includes('url')) return 'image';
    if (background.includes('gradient')) return 'gradient';
    return 'solid';
  }, [background]);

  useEffect(() => {
    setBackground(getBackgroundString(gradientColors, gradientType, gradientDirection));

    }
    , [gradientColors, gradientType, gradientDirection]);
        



  const getBackgroundString = (colors: string[], gradientType: "radial" | "linear", gradientDirection: string   ) => {

    const direction = gradientType === 'linear' ? gradientDirection : 'circle';
    
    const result = `${gradientType}-gradient(${direction}, ${colors.join(', ')
    })`;
    return result;
    }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !background && 'text-muted-foreground',
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {background ? background : 'Pick a color'}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>

          <TabsContent value="gradient" className="mt-0">
          <div className="mb-2">
              <Select value={gradientType} onValueChange={(value) => setGradientType(value as 'linear' | 'radial')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gradient Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear Gradient</SelectItem>
                  <SelectItem value="radial">Radial Gradient</SelectItem>
                </SelectContent>
              </Select>

              {gradientType === 'linear' && (
                <Select value={gradientDirection} onValueChange={setGradientDirection}>
                  <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select Gradient Direction" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientDirections.map((dir) => (
                      <SelectItem key={dir} value={dir}>{dir}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {gradients.map((colors, i) => (
                <div
                  key={i}
                  style={{ background:  getBackgroundString(colors, gradientType, gradientDirection) }}
                  className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                  onClick={() =>   setGradientColors(colors)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={background}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}