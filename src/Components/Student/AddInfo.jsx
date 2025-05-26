'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../Components/Loader/Loader'

const AddInfo = () => {
  const [readonlyFields, setReadonlyFields] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [formData, setFormData] = useState({});
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch user info from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/student/get-Info', {
          withCredentials: true 
        });

        setReadonlyFields(res.data.readonlyFields);
        setEditableFields(res.data.editableFields);
        setFormData(res.data.editableFields);
        setLoading(false);
      } catch (error) {
        setMsg(error?.response?.data?.msg || 'Error loading data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put('http://localhost:5000/student/add-Info', formData, {
        withCredentials: true
      });

      setMsg(res.data.msg);
    } catch (err) {
      setMsg(err?.response?.data?.msg || 'Error submitting info');
    }
  };

  if (loading) return <div><span className="flex items-center justify-center">
                      <Loader />
                    </span></div>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2>Please Add Your Personal Information</h2>
      {msg && <p style={{ color: 'green' }}>{msg}</p>}

      <form onSubmit={handleSubmit}>
        {/* Readonly fields */}
        <h4>Already Available:</h4>
        {Object.entries(readonlyFields).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label>{key}</label><br />
            <input type="text" value={value} disabled />
          </div>
        ))}

        {/* Editable fields */}
        <h4>Missing Information:</h4>
        {Object.entries(editableFields).map(([key]) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label>{key}</label><br />
            <input
              type="text"
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        {Object.keys(editableFields).length > 0 ? (
          <button type="submit">Submit Info</button>
        ) : (
          <p>All your information is already filled.</p>
        )}
      </form>
    </div>
  );
};

export default AddInfo;
