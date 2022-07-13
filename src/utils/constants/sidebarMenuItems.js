import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  AccountCircle,
  Category,
  BusinessCenter,
  SimCard,
  AddShoppingCart,
  SignalCellularAltRounded,
} from "@material-ui/icons";

export const seguridad = {
  title: "Seguridad",
  listItem: [
    { link: "/users", Icon: PermIdentity, sidebarItemName: "Usuarios" },
  ],
};
export const inventario = {
  title: "Inventario",
  listItem: [
    { link: "/categories", Icon: Category, sidebarItemName: "Categorías" },
    { link: "/products", Icon: Storefront, sidebarItemName: "Productos" },
  ],
};

export const dashboard = {
  title: "Dashboard",
  listItem: [
    { link: "/", Icon: LineStyle, sidebarItemName: "Home" },
    {
      link: "/salesmanagementlist",
      Icon: Timeline,
      sidebarItemName: "Gestion de facturación",
    },
    {
      link: "servicemanagement",
      Icon: TrendingUp,
      sidebarItemName: "Gestion de servicios",
    },
  ],
};
export const quickMenu = {
  title: "Quick Menu",
  listItem: [
    { link: "/customers", Icon: AccountCircle, sidebarItemName: "Clientes" },
    {
      link: "/categories",
      Icon: Category,
      sidebarItemName: "Categorías de productos",
    },
    { link: "/suppliers", Icon: BusinessCenter, sidebarItemName: "Suplidores" },
    { link: "/services", Icon: SimCard, sidebarItemName: "Servicios" },
    {
      link: "/servicesales",
      Icon: SignalCellularAltRounded,
      sidebarItemName: "Ventas de servicios",
    },
    { link: "/sales", Icon: AddShoppingCart, sidebarItemName: "Facturación" },
    { link: "/", Icon: BarChart, sidebarItemName: "Reports" },
  ],
};
export const notifications = {
  title: "Notifications",
  listItem: [
    { link: "/", Icon: MailOutline, sidebarItemName: "Mail" },
    { link: "/", Icon: DynamicFeed, sidebarItemName: "Feedback" },
    { link: "/", Icon: ChatBubbleOutline, sidebarItemName: "Messages" },
  ],
};
export const staff = {
  title: "Staff",
  listItem: [
    { link: "/", Icon: WorkOutline, sidebarItemName: "Manage" },
    { link: "/", Icon: Timeline, sidebarItemName: "Analytics" },
    { link: "/", Icon: Report, sidebarItemName: "Reports" },
  ],
};
