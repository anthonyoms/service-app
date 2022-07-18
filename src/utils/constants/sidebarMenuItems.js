import {
  PermIdentity,
  Storefront,
  Category,
  LocalShipping,
  ListAlt,
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
    { link: "/suppliers", Icon: LocalShipping, sidebarItemName: "Suplidores" },
    {
      link: "/orders",
      Icon: ListAlt,
      sidebarItemName: "Ordenes de compra",
    },
  ],
};
