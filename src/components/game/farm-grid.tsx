"use client"

import { useGameState, useGameDispatch } from "@/context/game-context";
import { CROPS } from "@/lib/game-data";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { cn } from "@/lib/utils";

export function FarmGrid() {
    const state = useGameState();
    const dispatch = useGameDispatch();

    const handlePlant = (plotIndex: number, cropId: string) => {
        dispatch({ type: 'PLANT', plotIndex, cropId });
    };

    const handleHarvest = (plotIndex: number) => {
        dispatch({ type: 'HARVEST', plotIndex });
    };

    const getGrowthProgress = (plantedAt: number, growthTime: number) => {
        const elapsed = Date.now() - plantedAt;
        const progress = Math.min((elapsed / (growthTime * 1000)) * 100, 100);
        return progress;
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            {state.farm.map((plot, index) => {
                const crop = plot.cropId ? CROPS[plot.cropId] : null;

                return (
                    <Card key={index} className={cn("aspect-square flex items-center justify-center transition-colors",
                        plot.status === 'ready' && 'border-accent bg-accent/20',
                        plot.status === 'planted' && 'border-primary/50',
                    )}>
                        <CardContent className="p-2 flex flex-col items-center justify-center h-full w-full">
                            {plot.status === 'empty' && (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="h-full w-full flex-col gap-1">
                                            <span className="text-3xl">+</span>
                                            <span>Plant</span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-2">
                                        <div className="flex flex-col gap-2">
                                            {Object.values(CROPS).map(c => (
                                                <Button key={c.id} variant="ghost" onClick={() => handlePlant(index, c.id)}>
                                                    Plant {c.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}

                            {plot.status === 'planted' && crop && plot.plantedAt && (
                                <div className="flex flex-col items-center gap-2 w-full text-center">
                                    <crop.icon className="w-1/2 h-1/2 text-primary" />
                                    <span className="text-sm font-medium">{crop.name}</span>
                                    <Progress value={getGrowthProgress(plot.plantedAt, crop.growthTime)} className="h-2" />
                                </div>
                            )}

                            {plot.status === 'ready' && crop && (
                                <Button variant="secondary" className="h-full w-full flex-col gap-1" onClick={() => handleHarvest(index)}>
                                    <crop.icon className="w-1/2 h-1/2 text-accent-foreground" />
                                    <span className="font-bold">Harvest {crop.name}</span>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
}
