"use client";

import { useState } from "react";
import { formfield } from "../../app/utils/fields";
import Swal from "sweetalert2";

const StudentForm = () => {
  const [selected, setSelected] = useState([]);

  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    setSelected((prev) =>
      checked ? [...prev, name] : prev.filter((field) => field !== name)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      label: "Student Form",
      selectedFields: selected, // send selected field names as array
    };

    try {
      const res = await fetch("http://localhost:5000/admin/make-Form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save form");

      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Form Saved Successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      setSelected([]);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <h2 className="font-bold mb-2 text-center">
          Select Fields For Students
        </h2>
      </div>

      <form className="bg-white" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {formfield.map((field) => (
            <div key={field.name} className="mb-1 flex items-center space-x-2">
              <label>
                <input
                  type="checkbox"
                  name={field.name}
                  checked={selected.includes(field.name)}
                  onChange={handleCheckBox}
                  className="mr-2 cursor-pointer"
                />
                {field.label}
              </label>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-blue-600 cursor-pointer hover:scale-105 text-white px-4 py-2 rounded mt-3 "
        >
          Send to Students
        </button>
        </div>

      </form>
    </div>
  );
};

export default StudentForm;
