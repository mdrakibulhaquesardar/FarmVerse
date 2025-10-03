"use client";

import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import type { PlayerState, Weather } from '@/lib/types';
import { INITIAL_GAME_STATE, CROPS } from '@/lib/game-data';

type GameAction =
  | { type: 'PLANT'; plotIndex: number; cropId: string }
  | { type: 'HARVEST'; plotIndex: number }
  | { type: 'SELL_ITEM'; itemId: string; quantity: number; price: number }
  | { type: 'UPDATE_PLOT'; plotIndex: number; status: 'ready' }
  | { type: 'CHANGE_WEATHER'; weather: Weather };

const GameStateContext = createContext<PlayerState | undefined>(undefined);
const GameDispatchContext = createContext<React.Dispatch<GameAction> | undefined>(undefined);

const gameReducer = (state: PlayerState, action: GameAction): PlayerState => {
  switch (action.type) {
    case 'PLANT': {
      if (state.farm[action.plotIndex].status !== 'empty') return state;
      const newFarm = [...state.farm];
      newFarm[action.plotIndex] = {
        cropId: action.cropId,
        plantedAt: Date.now(),
        status: 'planted',
      };
      return { ...state, farm: newFarm };
    }
    case 'HARVEST': {
      const plot = state.farm[action.plotIndex];
      if (plot.status !== 'ready' || !plot.cropId) return state;

      const newFarm = [...state.farm];
      newFarm[action.plotIndex] = { cropId: null, plantedAt: null, status: 'empty' };

      const newInventory = { ...state.inventory };
      const currentAmount = newInventory[plot.cropId] || 0;
      newInventory[plot.cropId] = currentAmount + 1; // Harvest yield is 1 for now

      return { ...state, farm: newFarm, inventory: newInventory };
    }
    case 'SELL_ITEM': {
      const currentAmount = state.inventory[action.itemId] || 0;
      if (currentAmount < action.quantity) return state; // Not enough to sell

      const newInventory = { ...state.inventory };
      newInventory[action.itemId] = currentAmount - action.quantity;
      
      const earnings = action.quantity * action.price;

      return { ...state, inventory: newInventory, coins: state.coins + earnings };
    }
    case 'UPDATE_PLOT': {
        const newFarm = [...state.farm];
        newFarm[action.plotIndex] = { ...newFarm[action.plotIndex], status: action.status };
        return { ...state, farm: newFarm };
    }
    case 'CHANGE_WEATHER': {
        return { ...state, weather: action.weather };
    }
    default:
      return state;
  }
};

const WEATHER_TYPES: Weather[] = ['Sunny', 'Rainy', 'Cloudy', 'Stormy'];
const WEATHER_CHANGE_INTERVAL = 60000; // 1 minute

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_GAME_STATE);

  useEffect(() => {
    // Crop growth logic
    const growthInterval = setInterval(() => {
        state.farm.forEach((plot, index) => {
            if (plot.status === 'planted' && plot.cropId && plot.plantedAt) {
                const crop = CROPS[plot.cropId];
                let growthTime = crop.growthTime * 1000;
                
                // Weather effect
                if (state.weather === 'Rainy') {
                    growthTime *= 0.8; // 20% faster growth
                }
                if (state.weather === 'Stormy') {
                    growthTime *= 1.5; // 50% slower growth
                }

                if (Date.now() > plot.plantedAt + growthTime) {
                    dispatch({ type: 'UPDATE_PLOT', plotIndex: index, status: 'ready' });
                }
            }
        });
    }, 1000);

    // Weather change logic
    const weatherInterval = setInterval(() => {
        const newWeather = WEATHER_TYPES[Math.floor(Math.random() * WEATHER_TYPES.length)];
        dispatch({ type: 'CHANGE_WEATHER', weather: newWeather });
    }, WEATHER_CHANGE_INTERVAL);

    return () => {
        clearInterval(growthInterval);
        clearInterval(weatherInterval);
    };
  }, [state.farm, state.weather]);

  return (
    <GameStateContext.Provider value={state}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameProvider');
  }
  return context;
};

export const useGameDispatch = () => {
  const context = useContext(GameDispatchContext);
  if (context === undefined) {
    throw new Error('useGameDispatch must be used within a GameProvider');
  }
  return context;
};
