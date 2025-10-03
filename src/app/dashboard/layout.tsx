import { GameProvider } from "@/context/game-context";
import { SidebarProvider } from "@/components/ui/sidebar";
import { GameHeader } from "@/components/game/game-header";
import { GameSidebar } from "@/components/game/game-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameProvider>
      <SidebarProvider>
        <GameSidebar />
        <div className="flex flex-col w-full">
          <GameHeader />
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-background">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </GameProvider>
  );
}
