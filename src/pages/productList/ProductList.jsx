import { DataGrid, esES, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import MyFab from "../../components/fab/MyFab";
import "./productList.css";
import { useEffect } from "react";
import { deleteServiceApp, getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";

export default function ProductList() {
  const [{ loading, productData }, setProductData] = useState({
    loading: true,
    productData: [],
  });
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const { productos } = await getServiceApp(endpoints.products);
    setProductData({
      loading: false,
      productData: productos,
    });
  };
  const handleDelete = async (id) => {
    const dataResponse = await deleteServiceApp(id, endpoints.products);
    const validData = dataValidation(dataResponse);
    if (validData.ok) {
      loadProduct();
    }
  };
  const columns = [
    { field: "uid", headerName: "ID", hide: true, flex: 1 },
    { field: "codigo", headerName: "codigo", flex: 1 },
    {
      field: "product",
      headerName: "Producto",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.nombre}
          </div>
        );
      },
    },
    { field: "cantidad", headerName: "Existencia", flex: 1, type: "number" },
    {
      field: "estado",
      headerName: "Estado",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="categoryListItem">
            {params.row.estado ? "Activo" : "Inactivo"}
          </div>
        );
      },
    },
    {
      field: "disponible",
      headerName: "Disponible",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="categoryListItem">
            {params.row.disponible ? "SI" : "NO"}
          </div>
        );
      },
    },
    {
      field: "precio_venta",
      headerName: "Precio de venta",
      flex: 1,
      type: "number",
    },
    {
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.uid}>
              <button className="productListEdit">Editar</button>
            </Link>
            {params.row.estado && (
              <DeleteOutline
                className="categoryListDelete"
                onClick={() => handleDelete(params.row.uid)}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <MyFab route="/newproduct" />
      <div className="dataGrid">
        <DataGrid
          rows={productData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(e) => e.uid}
          loading={loading}
          filterMode="client"
          density="comfortable"
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </div>
    </div>
  );
}
