import {
  Settings,
  LayoutGrid,
  LucideIcon,
  Music,
  ListMusic,
  Disc,
  Music4,
  Heart,
  Mic
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "/library",
          label: "Library",
          icon: Music,
          submenus: []
        },
        {
          href: "/playlists",
          label: "Playlists",
          icon: ListMusic,
          submenus: []
        },
        {
          href: "/artists",
          label: "Artists",
          icon: Mic,
          submenus: []
        },
        {
          href: "/albums",
          label: "Albums",
          icon: Disc,
          submenus: []
        },
        {
          href: "/genres",
          label: "Genres",
          icon: Music4,
          submenus: []
        },
        {
          href: "/favorites",
          label: "Favorites",
          icon: Heart,
          submenus: []
        },
        {
          href: "/settings",
          label: "Settings",
          icon: Settings,
          submenus: []
        }
      ]
    },
    
  ];
}
