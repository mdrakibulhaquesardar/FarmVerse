"use client"

import { useGameState, useGameDispatch } from "@/context/game-context";
import { ANIMALS, PRODUCTS } from "@/lib/game-data";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function AnimalCoops() {
    const state = useGameState();
    const dispatch = useGameDispatch();
    const { toast } = useToast();

    const handleBuyAnimal = (coopIndex: number, animalId: string) => {
        const animal = ANIMALS[animalId];
        if (state.coins < animal.basePrice) {
            toast({
                variant: "destructive",
                title: "Not enough coins!",
                description: `You need ${animal.basePrice} coins to buy a ${animal.name}.`
            });
            return;
        }
        dispatch({ type: 'BUY_ANIMAL', coopIndex, animalId });
        toast({
            title: "Animal Purchased!",
            description: `You bought a ${animal.name}!`
        })
    };

    const handleCollect = (coopIndex: number) => {
        dispatch({ type: 'COLLECT_PRODUCT', coopIndex });
    };

    const getProductionProgress = (lastCollectedAt: number, productionTime: number) => {
        const elapsed = Date.now() - lastCollectedAt;
        const progress = Math.min((elapsed / (productionTime * 1000)) * 100, 100);
        return progress;
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {state.coops.map((coop, index) => {
                const animal = coop.animalId ? ANIMALS[coop.animalId] : null;
                const product = animal ? PRODUCTS[animal.product] : null;

                return (
                    <Card key={index} className={cn("aspect-square flex items-center justify-center transition-colors",
                        coop.status === 'ready' && 'border-accent bg-accent/20',
                        coop.status === 'occupied' && 'border-primary/50',
                    )}>
                        <CardContent className="p-2 flex flex-col items-center justify-center h-full w-full">
                            {coop.status === 'empty' && (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="h-full w-full flex-col gap-1">
                                            <span className="text-3xl">+</span>
                                            <span>Buy Animal</span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-2">
                                        <div className="flex flex-col gap-2">
                                            {Object.values(ANIMALS).map(a => (
                                                <Button key={a.id} variant="ghost" onClick={() => handleBuyAnimal(index, a.id)}>
                                                    Buy {a.name} ({a.basePrice} coins)
                                                </Button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}

                            {coop.status === 'occupied' && animal && coop.lastCollectedAt && (
                                <div className="flex flex-col items-center gap-2 w-full text-center">
                                    <animal.icon className="w-1/2 h-1/2 text-primary" />
                                    <span className="text-sm font-medium">{animal.name}</span>
                                    <Progress value={getProductionProgress(coop.lastCollectedAt, animal.productionTime)} className="h-2" />
                                </div>
                            )}

                            {coop.status === 'ready' && animal && product && (
                                <Button variant="secondary" className="h-full w-full flex-col gap-1" onClick={() => handleCollect(index)}>
                                    <product.icon className="w-1/2 h-1/2 text-accent-foreground" />
                                    <span className="font-bold">Collect {product.name}</span>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
}
