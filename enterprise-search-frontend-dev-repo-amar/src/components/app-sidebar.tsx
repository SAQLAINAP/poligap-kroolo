"use client";

import * as React from "react";
import {
  // LayoutDashboard,
  // MessageCircle,
  // History,
  BookOpen,
  Users,
  // Settings,
  // Plus,
  ChevronLeft,
  Home,
  User,
  Brain,
  Settings,
  LayoutDashboard,
  // Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import useGlobalChatStore from "@/app/(app)/chat/store/global-chat-store";
import { useCompanyStore } from "@/stores/company-store";

// Define page types for type safety
type PageType =
  | "dashboard"
  | "search"
  | "chat"
  | "history"
  | "knowledge"
  | "users"
  | "ai-policy-analyzer"
  | "profile";

const navigationItems = [
  {
    title: "Home",
    icon: Home,
    page: "/search" as PageType,
  },
  // {
  //   title: "Chat",
  //   icon: MessageCircle,
  //   page: "/chat" as PageType,
  // },
  // {
  //   title: "Chat History",
  //   icon: History,
  //   page: "/chat-history" as PageType,
  // },
  {
    title: "Knowledge",
    icon: BookOpen,
    page: "/knowledge" as PageType,
  },
  // {
  //   title: "Knowledge Base",
  //   icon: Brain,
  //   page: "/knowledge-base" as PageType,
  // },
  // {
  //   title: "Database",
  //   icon: Brain,
  //   page: "/database" as PageType,
  // },
  {
    title: "Users",
    icon: Users,
    page: "/users" as PageType,
  },
  {
    title: "AI Policy Analyzer",
    icon: Brain,
    page: "/ai-policy-analyzer" as PageType,
  },
  
];

const bottomNavigationItems = [
  // {
  //   title: "Profile",
  //   icon: User,
  //   page: "/profile" as PageType,
  // },
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    page: "/dashboard" as PageType,
  },
];

// Main component that renders the appropriate page based on the active page state
export function AppSidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const pathname = usePathname();
  const currentPage = `/${pathname.split("/")[1]}`;

  // Get selected company role from the store
  const selectedCompany = useCompanyStore((s) => s.selectedCompany);
  const userRole = selectedCompany ? selectedCompany.role : "User";

  console.log("userRole =>", userRole);

  // show these if the userRole is not Owner
  const visibleNavigationItems = navigationItems.filter((item) =>
    userRole === "Owner" || userRole === "Admin"
      ? true
      : ["Home", "Users", "AI Policy Analyzer"].includes(item.title)
  );

  // show these if the userRole is not Owner or Admin
  const visibleBottomNavigationItems = bottomNavigationItems.filter((item) =>
    userRole === "Owner" || userRole === "Admin"
      ? true
      : [""].includes(item.title)
  );

  // console.log("visibleBottomNavigationItems =>", visibleBottomNavigationItems);

  // const setMessages = useGlobalChatStore((state) => state.setMessages);

  const MenuItemWithTooltip = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => {
    if (sidebarCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent side="right" align="start" className="font-normal">
            {title}
          </TooltipContent>
        </Tooltip>
      );
    }
    return children;
  };

  return (
    <div className="flex h-[calc(100vh-2.5rem)] overflow-hidden">
      <TooltipProvider delayDuration={300}>
        <SidebarProvider>
          {/* Sidebar */}
          <div
            className={`border-r border-border ${
              sidebarCollapsed ? "w-[60px]" : "w-[240px]"
            } transition-all duration-300 flex flex-col h-[calc(100vh-2.5rem)] overflow-hidden relative group`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Collapse Button - Always takes up space but only visible on hover */}
            <div className="flex justify-end p-2 h-10">
              {" "}
              {/* Fixed height to prevent layout shift */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className={`h-6 w-6 absolute top-0 right-0 cursor-pointer hover:bg-filter-menu rounded-bl-md rounded-tr-none rounded-tl-none rounded-br-none transition-opacity duration-200 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <ChevronLeft
                      className={`h-4 w-4 transition-transform ${
                        sidebarCollapsed ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  align="start"
                  className="font-normal"
                >
                  {sidebarCollapsed ? "Expand" : "Collapse"}
                </TooltipContent>
              </Tooltip>
            </div>

            {/* New Chat Button */}
            {/* <div className="px-2">
              <MenuItemWithTooltip title="New Chat">
                <Button
                  className={`bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer flex items-center justify-center px-3 py-2 w-full ${
                    !sidebarCollapsed ? "gap-3" : ""
                  }`}
                  onClick={() => {
                    useGlobalChatStore.setState({
                      selectedConversation: {
                        _id: "",
                        chatName: "",
                        createdAt: new Date().toISOString(),
                      },
                      messages: [],
                    });
                  }}
                >
                  <div className="flex items-center justify-center w-4 h-4 flex-shrink-0">
                    <Plus className="h-4 w-4" />
                  </div>
                  {!sidebarCollapsed && (
                    <span className="text-13 transition-opacity duration-300">
                      <Link href={"/chat"}>New Chat</Link>
                    </span>
                  )}
                </Button>
              </MenuItemWithTooltip>
            </div> */}

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <SidebarMenu className="px-2" style={{ gap: "1px" }}>
                {visibleNavigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <MenuItemWithTooltip title={item.title}>
                      <Link href={item.page}>
                        <SidebarMenuButton
                          className={`text-card-foreground hover:bg-filter-menu hover:text-accent-foreground ${
                            currentPage === item.page
                              ? "bg-filter-menu text-accent-foreground"
                              : ""
                          } cursor-pointer flex items-center gap-1.5 px-3 py-2 w-full`}
                          isActive={currentPage === item.page}
                        >
                          <div className="flex items-center justify-center w-4 h-4 flex-shrink-0">
                            <item.icon className="h-5 w-5" />
                          </div>
                          <span
                            className={`font-medium text-13 transition-opacity duration-300 ${
                              sidebarCollapsed
                                ? "opacity-0 w-0 overflow-hidden"
                                : "opacity-100"
                            }`}
                          >
                            {item.title}
                          </span>
                        </SidebarMenuButton>
                      </Link>
                    </MenuItemWithTooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>

            {/* Bottom Navigation Items */}
            {userRole !== "User" && (
              <div className="mt-auto py-4 border-t border-border">
                <SidebarMenu className="px-2" style={{ gap: "1px" }}>
                  {visibleBottomNavigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <MenuItemWithTooltip title={item.title}>
                        <Link href={item.page}>
                          <SidebarMenuButton
                            className={`text-card-foreground hover:bg-filter-menu hover:text-accent-foreground ${
                              currentPage === item.page
                                ? "bg-filter-menu text-accent-foreground"
                                : ""
                            } cursor-pointer flex items-center gap-1.5 px-3 py-2 w-full`}
                            isActive={currentPage === item.page}
                          >
                            <div className="flex items-center justify-center w-4 h-4 flex-shrink-0">
                              <item.icon className="h-5 w-5" />
                            </div>
                            <span
                              className={`text-13 transition-opacity duration-300 ${
                                sidebarCollapsed
                                  ? "opacity-0 w-0 overflow-hidden"
                                  : "opacity-100"
                              }`}
                            >
                              {item.title}
                            </span>
                          </SidebarMenuButton>
                        </Link>
                      </MenuItemWithTooltip>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </div>
            )}
          </div>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
}
