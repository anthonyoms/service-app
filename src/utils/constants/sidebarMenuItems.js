import {
  PermIdentity,
  People,
  Storefront,
  Category,
  LocalShipping,
  ListAlt,
  AddShoppingCart,
  RssFeed,
  Timeline,
  PeopleAlt,
} from "@material-ui/icons";

export const home = {
  title: "Dashboard",
  listItem: [{ link: "/", Icon: Timeline, sidebarItemName:"Estadísticas" }],
};

export const seguridad = {
  title: "Seguridad",
  listItem: [
    { link: "/users", Icon: People, sidebarItemName: "Usuarios" },
    {
      link: "/myuser",
      Icon: PermIdentity,
      sidebarItemName: "Mi perfil",
    },
  ],
};
export const inventario = {
  title: "Inventario",
  listItem: [
    { link: "/categories", Icon: Category, sidebarItemName: "Categorías" },
    { link: "/products", Icon: Storefront, sidebarItemName: "Productos" },
    { link: "/suppliers", Icon: LocalShipping, sidebarItemName: "Suplidores" },
    {
      link: "/orders",
      Icon: ListAlt,
      sidebarItemName: "Ordenes de compra",
    },
    {
      link: "/entries",
      Icon: AddShoppingCart,
      sidebarItemName: "Entrada de inventario",
    },
    {
      link: "/services",
      Icon: RssFeed,
      sidebarItemName: "Servicios",
    },
    {
      link: "/customers",
      Icon: PeopleAlt,
      sidebarItemName: "Clientes",
    },
  ],
};
