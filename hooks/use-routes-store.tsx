// store/useRoutesStore.ts
import { create } from "zustand";
import {
  LayoutDashboard,
  Baby,
  BookImage,
  Video,
  Drum,
  MessageCircleMore,
  Settings,
} from "lucide-react";

type Route = {
  label: string;
  href: string;
  icon: any;
  color: string;
};

type RoutesState = {
  routes: Route[];
};

export const useRoutesStore = create<RoutesState>(() => ({
  routes: [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      color: "text-sky-500",
    },
    {
      label: "Conversation",
      href: "/conversation",
      icon: Baby,
      color: "text-green-400",
    },
    {
      label: "Image generation",
      href: "/image",
      icon: BookImage,
      color: "text-yellow-300",
    },
    {
      label: "Video generation",
      href: "/video",
      icon: Video,
      color: "text-orange-600",
    },
    {
      label: "Music generation",
      href: "/music",
      icon: Drum,
      color: "text-rose-600",
    },
    {
      label: "Code generation",
      href: "/code",
      icon: MessageCircleMore,
      color: "text-fuchsia-700",
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      color: "text-zinc-400",
    },
  ],
}));
