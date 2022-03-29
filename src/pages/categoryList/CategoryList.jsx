import { DataGrid } from "@mui/x-data-grid";
import { Add, DeleteOutline } from "@material-ui/icons";
import { categoryRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./categoryList.css";
import { Fab } from "@mui/material";
const fabStyle = {
  position: "absolute",
  bottom: 70,
  right: 30,
};
export default function CategoryList() {
  const [data, setData] = useState(categoryRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "product",
      headerName: "categoria",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="categoryListItem">
            <img className="categoryListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    {
      field: "status",
      headerName: "Estatus",
      width: 240,
    },
    {
      field: "descripcion",
      headerName: "Descripción",
      width:250,
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category/" + params.row.id}>
              <button className="categoryListEdit">Editar</button>
            </Link>
            <DeleteOutline
              className="categoryListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="categoryList">
      <Link to="/newcategory">
        <Fab sx={fabStyle} color="primary" aria-label="add">
          <Add />
        </Fab>
      </Link>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
      />
    </div>
  );
}
