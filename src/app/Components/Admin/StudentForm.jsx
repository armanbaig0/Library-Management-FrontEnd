'use client'

import { useState } from "react";
import { formfield } from "../../utils/fields";

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

    // Create payload to send to backend
    const payload = {
      label: 'Student Form', // ya admin form ka koi label dynamically bhejo
      fields: selected.map(fieldName => ({ label: fieldName }))
    };

    try {
      const res = await fetch('http://localhost:5000/admin/make-Form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to save form');

      alert('Form saved successfully!');
      setSelected([]); // clear selection if you want
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <form className="bg-white" onSubmit={handleSubmit}>
      <h2 className="font-bold">Select Fields For Students</h2>
      {formfield.map((field) => (
        <div key={field.name}>
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
        className="bg-blue-600 cursor-pointer hover:scale-105 text-white px-4 py-2 rounded"
      >
        Send to Students
      </button>
    </form>
  );
};

export default StudentForm;
