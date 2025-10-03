"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGameState } from "@/context/game-context"
import { CoinIcon } from "../icons/coin"
import { GemIcon } from "../icons/gem"
import { SidebarTrigger } from "../ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { WeatherDisplay } from "./weather-display"
import { getXpForNextLevel } from "@/lib/game-data"
import { Progress } from "../ui/progress"
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { Star } from "lucide-react"

export function GameHeader() {
  const state = useGameState()
  const isMobile = useIsMobile();

  const xpForNextLevel = getXpForNextLevel(state.level);
  const xpProgress = (state.xp / xpForNextLevel) * 100;

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
      {isMobile && <SidebarTrigger />}
      <WeatherDisplay />
      <div className="flex items-center gap-4 ml-auto">
        <TooltipProvider>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium w-36">
                  <Star className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  <div className="flex flex-col w-full gap-1">
                    <span className="text-xs text-left">Lvl {state.level}</span>
                    <Progress value={xpProgress} className="h-2" />
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                  <p>{state.xp} / {xpForNextLevel} XP</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium">
          <CoinIcon className="h-5 w-5 text-yellow-500" />
          <span>{state.coins.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium">
          <GemIcon className="h-5 w-5 text-blue-500" />
          <span>{state.gems.toLocaleString()}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://picsum.photos/seed/avatar/100/100" alt="Player Avatar" />
                <AvatarFallback>P</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Player</p>
                <p className="text-xs leading-none text-muted-foreground">
                  player@harvestweb.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
