import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./categoryList.css";
import MyFab from "../../components/fab/MyFab";
import { deleteServiceApp, getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";
import { dataValidation } from "../../utils/helpers/messages";

export default function CategoryList() {
  const [{ data, loading }, setData] = useState({ data: [], loading: true });
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const dataResponse = await getServiceApp(endpoints.categories);
    const validData = dataValidation(dataResponse, false);
    if (validData.ok) {
      setData({ data: validData.categorias, loading: false });
    }
  };

  const handleDelete = async (id) => {
    const dataResponse = await deleteServiceApp(id, endpoints.categories);
    const validData = dataValidation(dataResponse);
    if (validData.ok) {
      loadCategories();
    }
  };

  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    {
      field: "nombre",
      headerName: "Categoría",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="categoryListItem">
            <img className="categoryListImg" src={params.row.img} alt="" />
            {params.row.nombre}
          </div>
        );
      },
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      flex: 1,
    },
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
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category/" + params.row.uid}>
              <button className="categoryListEdit">Editar</button>
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
    <div className="categoryList">
      <MyFab route="/newcategory" />
      <div className="dataGrid">
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(e) => e.uid}
          loading={loading}
          filterMode="client"
        />
      </div>
    </div>
  );
}
