"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { useSidebar } from "@/components/ui/sidebar";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Farm" },
  { href: "/dashboard/marketplace", icon: Store, label: "Marketplace" },
];

export function GameSidebar() {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-headline text-xl font-bold text-foreground">HarvestWeb</span>
        </div>
        {!isMobile && <SidebarTrigger className="absolute right-2 top-3" />}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label, side: "right", align: "center" }}
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="outline" asChild>
            <Link href="/">Log Out</Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
