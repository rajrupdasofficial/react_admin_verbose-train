import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import "./add.scss";

type Props = {
  slug: string;
  columns: GridColDef[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Add = (props: Props) => {
  const [generatedId, setGeneratedId] = React.useState("");

  const generateId = () => {
    const randomId = Math.random().toString(36).substr(2, 8).toUpperCase();
    setGeneratedId(randomId);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {} as Record<string, any>;
    props.columns
      .filter((item) => item.field !== "id" && item.field !== "img")
      .forEach((column) => {
        const input = e.currentTarget[column.field] as HTMLInputElement;
        formData[column.field] = input.value;
      });

    formData["identity"] = generatedId; // Assuming "identity" is the field for the 8-digit ID

    try {
      const response = await fetch(`http://localhost:3000/api/${props.slug}s`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        props.setOpen(false);
        // Perform additional actions upon successful API call
      } else {
        console.error("Failed to add item");
        // Handle errors based on response status or message
      }
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle any network errors or exceptions
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
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
          {/* Display the generated ID */}
          <div className="item" key="generatedId">
            <label>Generated ID</label>
            <input type="text" value={generatedId} disabled />
          </div>
          {/* Button to generate a new ID */}
          <button type="button" onClick={generateId}>
            Generate ID
          </button>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
