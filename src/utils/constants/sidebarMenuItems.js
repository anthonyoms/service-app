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
  LaptopTwoTone,
  PeopleAltOutlined,
  Router,
  Laptop,
  NoteAdd,
} from "@material-ui/icons";
import { Add, SellTwoTone, TaskAlt } from "@mui/icons-material";

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
    {
      link: "/requestservice",
      Icon: Add,
      sidebarItemName: "Solicitar Servicio",
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
    {
      link: "/desktop-manager",
      Icon: LaptopTwoTone,
      sidebarItemName: "Estaciones de trabajo",
    },
  ],
};

export const request = {
  title: "Solicitudes",
  listItem: [
    {
      link: "/request-manager",
      Icon: PostAdd,
      sidebarItemName: "Crear Solicitudes",
    },
    {
      link: "/request-list",
      Icon: TaskAlt,
      sidebarItemName: "Trabajar Solicitudes",
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
export const reportes = {
  title: "Reportes",
  listItem: [
    {
      link: "/ventas-productos",
      Icon: SellTwoTone,
      sidebarItemName: "Ventas por Productos",
    },
    {
      link: "/reporte-clientes",
      Icon: PeopleAltOutlined,
      sidebarItemName: "Clientes",
    },
    {
      link: "/reporte-servicios",
      Icon: Router,
      sidebarItemName: "Ventas Por Servicios",
    },
    {
      link: "/reporte-estacion",
      Icon: Laptop,
      sidebarItemName: "Estación de Trabajo",
    },
    {
      link: "/reporte-solicitudes",
      Icon: TaskAlt,
      sidebarItemName: "Solicitudes",
    },
    {
      link: "/reporte-tickets",
      Icon: ListAlt,
      sidebarItemName: "Tickets",
    },
  ],
};
