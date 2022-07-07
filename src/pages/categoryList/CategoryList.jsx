import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./categoryList.css";
import MyFab from "../../components/fab/MyFab";
import { getServiceApp } from "../../services/serviceApp";
import { endpoints } from "../../utils/constants/endpoints";

export default function CategoryList() {
  const [data, setData] = useState([]);
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const { categorias } = await getServiceApp(endpoints.categories);
    setData(categorias);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "uid", headerName: "ID", flex: 1, hide: true },
    {
      field: "nombre",
      headerName: "categoria",
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
      field: "action",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category/" + params.row.uid}>
              <button className="categoryListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="categoryListDelete"
              onClick={() => handleDelete(params.row.uid)}
            />
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
          filterMode="client"
        />
      </div>
    </div>
  );
}
