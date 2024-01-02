import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./users.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../data";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "username",
    type: "string",
    headerName: "Agent User name",
    width: 150,
  },
  {
    field: "name",
    type: "string",
    headerName: "Agent full Name",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Agent Email",
    width: 200,
  },
  {
    field: "phonenumber",
    type: "string",
    headerName: "Agent Phone Number",
    width: 200,
  },
  {
    field: "password",
    type: "string",
    headerName: "Set Password",
    width: 200,
  },
  {
    field: "octaid",
    editable: false,
    headerName: "Agent ID",
    width: 300,
  },
  {
    field: "roles",
    editable: false,
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New Agent</button>
      </div>
      <DataTable slug="users" columns={columns} rows={userRows} />
      {/* TEST THE API */}

      {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )} */}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
