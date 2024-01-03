import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: Record<string, any> = {};
    const form = e.currentTarget;
    const slug = window.location.pathname;
    console.log(slug);

    props.columns
      .filter((column) => column.field !== "octaid") // Exclude 'octaid' field
      .forEach((column) => {
        const input = form.elements.namedItem(
          column.field
        ) as HTMLInputElement | null;
        if (input) {
          formData[column.field] = input.value;
        }
      });

    try {
      const response = await fetch(`http://localhost:3000/api${slug}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        props.setOpen(false);
        // Additional actions upon successful API call
      } else {
        console.log("Failed to add item");
        // Handle errors based on response status or message
      }
    } catch (error) {
      console.log("Error adding item:", error);
      // Handle any network errors or exceptions
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter(
              (item) =>
                item.field !== "id" &&
                item.field !== "img" &&
                item.field !== "roles" &&
                item.field !== "octaid" // Exclude 'octaid' field from rendering
            )
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input
                  type={column.type || "text"}
                  name={column.field}
                  placeholder={column.field}
                />
              </div>
            ))}


          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
