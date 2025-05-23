"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const FormByAdmin = () => {
  const [formFields, setFormFields] = useState([]);
  const [extraFields, setExtraFields] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileLabel, setFileLabel] = useState("");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch("http://localhost:5000/student/get-Form", {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch form");
        }
        const data = await res.json();
        setFormFields(data.fields || []);
      } catch (err) {
        console.error("Error fetching form:", err);
        Swal.fire({
          icon: "error",
          title: "Failed to load form",
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    };

    fetchForm();
  }, []);

  const newExtraField = (e) => {
    e.preventDefault();

    if (!newLabel.trim() || !newValue.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Please enter both label and value",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const newField = {
      label: newLabel.trim(),
      value: newValue.trim(),
    };

    setExtraFields((prev) => [...prev, newField]);
    setNewLabel("");
    setNewValue("");

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Field Added",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const deleteExtraField = (indexToRemove) => {
    setExtraFields((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  // File input change handler
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  // New function: Add selected file name to extraFields
  const addFileToFields = (e) => {
    e.preventDefault();

    const fileField = {
      label: `${fileLabel} `,
      value: selectedFile.name,
    };

    setExtraFields((prev) => [...prev, fileField]);
    setSelectedFile(null);

    // Reset file input manually (controlled input workaround)
    document.getElementById("fileInput").value = "";
    setFileLabel("");

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: `File "${fileField.value}" added`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormFields = formFields.map((field) => ({
      label: field.label,
      value:
        field.value && field.value.trim() !== "" ? field.value.trim() : "N/A",
    }));

    const updatedExtraFields = extraFields.map((field) => ({
      label: field.label,
      value:
        field.value && field.value.trim() !== "" ? field.value.trim() : "N/A",
    }));

    const allFields = [...updatedFormFields, ...updatedExtraFields];

    // Sending JSON assuming only names, no actual file upload
    try {
      const res = await fetch("http://localhost:5000/student/submit-Form", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: allFields }),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Form Submitted Successfully",
          toast: true,
          position: "top-end",
          timer: 2000,
          showConfirmButton: false,
        });

        setExtraFields([]);
      } else {
        throw new Error(result.message || "Form submission failed");
      }
    } catch (error) {
      console.error("Submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to submit form",
        text: error.message,
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <h2 className="font-bold mb-2 text-center">Please Confirm Your Form</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white">
        {/* Original fields */}
        <div className="p-2 grid grid-cols-2 mb-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {formFields.map((field, index) => (
            <div key={`form-${index}`} className="mb-4 border p-2">
              <label className="block font-bold text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                value={field.value}
                readOnly
                className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
          ))}
        </div>

        {/* Extra fields */}
        <div className="grid p-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {extraFields.map((field, index) => (
            <div key={`extra-${index}`} className="mb-4 relative border p-2">
              <label className="block font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                value={field.value}
                readOnly
                className="w-full border border-blue-300 px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => deleteExtraField(index)}
                className="absolute cursor-pointer top-0 right-0 mt-1 mr-1 text-red-500 hover:text-red-700 font-bold"
                title="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-3"
                  viewBox="0 0 448 512"
                >
                  <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Input for new extra field */}
        <div className="mt-4 p-2 mb-4 flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Enter New Label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded flex-grow min-w-[120px]"
          />
          <input
            type="text"
            placeholder="Enter New Value"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded flex-grow min-w-[120px]"
          />
          <button
            onClick={newExtraField}
            className=" text-white bg-gradient-to-r from-blue-500 to-green-500 px-4 py-2 rounded hover:scale-105"
          >
            Add Field
          </button>
        </div>

        {/* File Upload + Add File Button */}
        <div className="mb-4 flex items-center gap-4 p-2 flex-wrap">
          <input
            type="text"
            placeholder="Enter File Label"
            value={fileLabel}
            onChange={(e) => setFileLabel(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded flex-grow min-w-[120px]"
          />
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="border border-gray-300 px-3 py-2 rounded "
          />
          <button
            onClick={addFileToFields}
            className=" bg-gradient-to-r from-blue-500 to-green-500 font-bold text-white px-4 py-2 rounded hover:scale-105"
          >
            Add File
          </button>
        </div>

        {/* Submit button */}
        <div className="p-2 ">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded hover:scale-105"
        >
          Submit Form
        </button>
        </div>

      </form>
    </div>
  );
};

export default FormByAdmin;
