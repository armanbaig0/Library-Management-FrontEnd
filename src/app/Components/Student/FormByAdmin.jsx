'use client'

import React, { useEffect, useState } from 'react';

const FormByAdmin = () => {
  const [formFields, setFormFields] = useState([]);
  const [extraField, setExtraField] = useState('');

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch('http://localhost:5000/student/get-Form');
        const data = await res.json();
        setFormFields(data.fields);
      } catch (err) {
        console.error('Error fetching form:', err);
      }
    };

    fetchForm();
  }, []);

  return (
    <form className="bg-white p-4 rounded shadow-md max-w-md mx-auto">
      <h2 className="font-semibold text-lg mb-4">Please Check your Form</h2>

      {formFields.map((field, index) => (
        <div key={index} className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">{field.label}</label>
          <input
            type="text"
            value={field.value}
            readOnly
            className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>
      ))}

      {/* Extra Input for Optional Message */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-1">Any Additional Info (Optional)</label>
        <input
          type="text"
          value={extraField}
          onChange={(e) => setExtraField(e.target.value)}
          placeholder="Write something extra if you want"
          className="w-full border border-blue-300 px-3 py-2 rounded bg-white"
        />
      </div>
    </form>
  );
};

export default FormByAdmin;
