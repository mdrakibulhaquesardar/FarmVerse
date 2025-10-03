"use client"

import { useGameState } from "@/context/game-context";
import { Sun, Cloud, CloudRain, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

export function WeatherDisplay() {
    const state = useGameState();
    const { weather } = state;

    const weatherInfo = {
        Sunny: { icon: Sun, label: "Sunny", description: "Crops grow at a normal rate." },
        Rainy: { icon: CloudRain, label: "Rainy", description: "Crops grow 20% faster!" },
        Cloudy: { icon: Cloud, label: "Cloudy", description: "Crops grow at a normal rate." },
        Stormy: { icon: Zap, label: "Stormy", description: "Crops grow 50% slower." },
    };

    const CurrentWeatherIcon = weatherInfo[weather].icon;
    const description = weatherInfo[weather].description;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium">
                        <CurrentWeatherIcon className="h-5 w-5 text-blue-500" />
                        <span className="hidden sm:inline">{weather}</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="font-bold">{weatherInfo[weather].label}</p>
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
