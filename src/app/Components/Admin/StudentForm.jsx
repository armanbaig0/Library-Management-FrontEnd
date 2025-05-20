'use client'

import { useState } from "react";
import { formfield } from "../../utils/fields";
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
      label: 'Student Form',
      selectedFields: selected, // send selected field names as array
    };

    try {
      const res = await fetch('http://localhost:5000/admin/make-Form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save form');

      await Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Form Saved Successfully',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      setSelected([]);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <form className="bg-white" onSubmit={handleSubmit}>
      <h2 className="font-bold mb-2">Select Fields For Students</h2>
      {formfield.map((field) => (
        <div key={field.name} className="mb-1">
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
      <button
        type="submit"
        className="bg-blue-600 cursor-pointer hover:scale-105 text-white px-4 py-2 rounded mt-3"
      >
        Send to Students
      </button>
    </form>
  );
};

export default StudentForm;
