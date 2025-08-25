import {
  PAGE_OTHERS,
  PAGE_OUTLET_ADMIN_DASHBOARD,
  PAGE_SUPER_ADMIN_DASHBOARD,
} from "@/routes/paths";
import {
  BarChart3,
  Store,
  PackageSearch,
  Layers,
  Boxes,
  Inbox,
  UserSquare,
  Settings,
  HelpCircle,
} from "lucide-react";

export const superAdminSidebarConfig = [
  {
    sectionGroupLabel: "Dashboard",
    sections: [
      {
        name: "Analytics",
        url: PAGE_SUPER_ADMIN_DASHBOARD.analytics.absolutePath,
        icon: BarChart3,
      },
    ],
  },
  {
    sectionGroupLabel: "Management",
    sections: [
      {
        name: "Admins",
        url: PAGE_SUPER_ADMIN_DASHBOARD.admins.absolutePath,
        icon: UserSquare,
      },
      {
        name: "Outlets",
        url: PAGE_SUPER_ADMIN_DASHBOARD.outlets.absolutePath,
        icon: Store,
      },
      {
        name: "Inventories",
        url: PAGE_SUPER_ADMIN_DASHBOARD.inventories.absolutePath,
        icon: Boxes,
      },
    ],
  },
  {
    sectionGroupLabel: "Catalog",
    sections: [
      {
        name: "Products",
        url: PAGE_SUPER_ADMIN_DASHBOARD.products.absolutePath,
        icon: PackageSearch,
      },
      {
        name: "Categories",
        url: PAGE_SUPER_ADMIN_DASHBOARD.categories.absolutePath,
        icon: Layers,
      },
      {
        name: "Product Requests",
        url: PAGE_SUPER_ADMIN_DASHBOARD.productRequests.absolutePath,
        icon: Inbox,
      },
    ],
  },
];

export const outletAdminSidebarConfig = [
  {
    sectionGroupLabel: "Dashboard",
    sections: [
      {
        name: "Analytics",
        url: PAGE_OUTLET_ADMIN_DASHBOARD.analytics.absolutePath,
        icon: BarChart3,
      },
    ],
  },
];

export const sidebarOthersConfig = [
  {
    sectionGroupLabel: "OTHERS",
    sections: [
      {
        name: "Settings",
        url: PAGE_OTHERS.settings.absolutePath,
        icon: Settings,
      },
      {
        name: "Help & Support",
        url: PAGE_OTHERS.helpAndSupport.absolutePath,
        icon: HelpCircle,
      },
    ],
  },
];
