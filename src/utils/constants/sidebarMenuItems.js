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
  MonetizationOn,
  Refresh,
  PostAdd,
  SearchOutlined,
  FindInPageOutlined,
  Payment,
} from "@material-ui/icons";

export const home = {
  title: "Dashboard",
  listItem: [{ link: "/", Icon: Timeline, sidebarItemName: "Estadísticas" }],
};

export const customer = {
  title: "Servicios",
  listItem: [
    {
      link: "/paymentservice",
      Icon: Payment,
      sidebarItemName: "Pago de Servicio",
    },
  ],
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
  ],
};

export const ventas = {
  title: "Ventas",
  listItem: [
    {
      link: "/customers",
      Icon: PeopleAlt,
      sidebarItemName: "Clientes",
    },
    {
      link: "/sell",
      Icon: MonetizationOn,
      sidebarItemName: "Facturación",
    },
    {
      link: "/refunds",
      Icon: Refresh,
      sidebarItemName: "Devolución",
    },
    {
      link: "/addservice",
      Icon: PostAdd,
      sidebarItemName: "Contrato de servicio",
    },
  ],
};

export const Tickets = {
  title: "Tickets",
  listItem: [
    {
      link: "/service-manager",
      Icon: ListAlt,
      sidebarItemName: "Atender Tickets",
    },
  ],
};

export const consultas = {
  title: "Consultas",
  listItem: [
    {
      link: "/searchcontract",
      Icon: SearchOutlined,
      sidebarItemName: "Buscar Contratos",
    },
    {
      link: "/buscarfactura",
      Icon: FindInPageOutlined,
      sidebarItemName: "Buscar Facturas",
    },
  ],
};
