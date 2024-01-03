import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./vendors.scss";
import { useState } from "react";
import Add from "../../components/add/Add";
import { userRows } from "../../data";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "VendorName",
    type: "string",
    headerName: "VendorName",
    width: 150,
  },
  {
    field: "StoreName",
    type: "string",
    headerName: "Store Name",
    width: 150,
  },
  {
    field: "Address",
    type: "string",
    headerName: "Vendor Address",
    width: 200,
  },
  {
    field: "PhoneNumber",
    type: "string",
    headerName: "Vendor Phone Number",
    width: 200,
  },
  {
    field: "EmailID",
    type: "string",
    headerName: "Email id",
    width: 200,
  },
  {
    field: "IDProof",
    type: "file",
    headerName: "Identity proof",
    width: 200,
  },
  {
    field: "StoreDocument",
    type: "file",
    headerName: "Store Document ID",
    width: 300,
  },
  {
    field: "StorePhoto",
    type: "file",
    headerName: "Store photo",
  },
  {
    field: "LoginID",
    type: "string",
    headerName: "Vendor Login ID",
  },
  {
    field: "Password",
    type: "string",
    headerName: "Vendor Password",
  },
  {
    field: "vstatus",
    type: "string",
    headerName: "Vendor Status",
  },
  {
    field: "vcomment",
    type: "string",
    headerName: "comment",
  },
  {
    field: "roles",
    editable: false,
  },
];

const Vendors = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="users">
      <div className="info">
        <h1>Vendor</h1>
        <button onClick={() => setOpen(true)}>Add New Vendor</button>
      </div>
      <DataTable slug="vendors" columns={columns} rows={userRows} />
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

export default Vendors;
