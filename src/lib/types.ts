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

export type Inventory = {
  [itemId: string]: number;
};

export type FarmPlot = {
  cropId: string | null;
  plantedAt: number | null;
  status: 'empty' | 'planted' | 'ready';
};

export type PlayerState = {
  coins: number;
  gems: number;
  inventory: Inventory;
  farm: FarmPlot[];
};
