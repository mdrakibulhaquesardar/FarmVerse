export interface Item {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

export interface Crop extends Item {
  growthTime: number; // in seconds
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface Product extends Item {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface Animal extends Item {
  product: string; // id of the product (e.g., 'egg')
  productionTime: number; // in seconds
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type Inventory = {
  [itemId: string]: number;
};

export type FarmPlot = {
  cropId: string | null;
  plantedAt: number | null;
  status: 'empty' | 'planted' | 'ready';
};

export type AnimalCoop = {
  animalId: string | null;
  lastCollectedAt: number | null;
  status: 'empty' | 'occupied' | 'ready';
};

export type Weather = 'Sunny' | 'Rainy' | 'Cloudy' | 'Stormy';

export type PlayerState = {
  coins: number;
  gems: number;
  inventory: Inventory;
  farm: FarmPlot[];
  coops: AnimalCoop[];
  weather: Weather;
};
