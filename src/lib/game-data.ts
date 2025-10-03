import type { Crop, Product, PlayerState, FarmPlot, Animal, AnimalCoop } from './types';
import { WheatIcon } from '@/components/icons/wheat';
import { ChickenIcon } from '@/components/icons/chicken';
import { HardHat, Egg } from 'lucide-react';

export const CROPS: Record<string, Crop> = {
  wheat: {
    id: 'wheat',
    name: 'Wheat',
    description: 'A staple grain.',
    basePrice: 5,
    growthTime: 60, // 1 minute
    icon: WheatIcon,
  },
  corn: {
    id: 'corn',
    name: 'Corn',
    description: 'Sweet and golden.',
    basePrice: 10,
    growthTime: 180, // 3 minutes
    icon: HardHat, // Placeholder
  },
    tomato: {
    id: 'tomato',
    name: 'Tomato',
    description: 'Juicy and red.',
    basePrice: 20,
    growthTime: 600, // 10 minutes
    icon: HardHat, // Placeholder
    },
};

export const PRODUCTS: Record<string, Product> = {
  egg: {
    id: 'egg',
    name: 'Egg',
    description: 'A fresh egg from a happy chicken.',
    basePrice: 15,
    icon: Egg,
  },
};

export const ANIMALS: Record<string, Animal> = {
    chicken: {
        id: 'chicken',
        name: 'Chicken',
        description: 'A fluffy chicken that lays eggs.',
        basePrice: 50, // Price to buy a chicken
        product: 'egg',
        productionTime: 300, // 5 minutes
        icon: ChickenIcon,
    }
}

export const ALL_ITEMS = {...CROPS, ...PRODUCTS, ...ANIMALS};

const initialFarm: FarmPlot[] = Array(9).fill({
  cropId: null,
  plantedAt: null,
  status: 'empty',
});

const initialCoops: AnimalCoop[] = Array(4).fill({
    animalId: null,
    lastCollectedAt: null,
    status: 'empty'
});


export const INITIAL_GAME_STATE: PlayerState = {
  coins: 100,
  gems: 10,
  inventory: {
    wheat: 5,
  },
  farm: initialFarm,
  coops: initialCoops,
  weather: 'Sunny',
  level: 1,
  xp: 0,
};

export const getXpForNextLevel = (level: number) => {
    return Math.floor(level * 100 * 1.2);
}
