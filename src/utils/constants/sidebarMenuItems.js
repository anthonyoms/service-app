import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  AccountCircle,
  Category,
  BusinessCenter,
} from "@material-ui/icons";

export const dashboard = {
  title: "Dashboard",
  listItem: [
    { link: "/", Icon: LineStyle, sidebarItemName: "Home" },
    { link: "/", Icon: Timeline, sidebarItemName: "Analytics" },
    { link: "/", Icon: TrendingUp, sidebarItemName: "Sales" },
  ],
};
export const quickMenu = {
  title: "Quick Menu",
  listItem: [
    { link: "/users", Icon: PermIdentity, sidebarItemName: "Usuarios" },
    { link: "/products", Icon: Storefront, sidebarItemName: "Productos" },
    { link: "/customers", Icon: AccountCircle, sidebarItemName: "Clientes" },
    {
      link: "/categories",
      Icon: Category,
      sidebarItemName: "Categorias de productos",
    },
    { link: "/suppliers", Icon: BusinessCenter, sidebarItemName: "Suplidores" },
    { link: "/", Icon: AttachMoney, sidebarItemName: "Transactions" },
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
