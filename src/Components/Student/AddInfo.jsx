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
        const res = await axios.get('https://library-management-rqkq.onrender.com/student/get-Info', {
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
      const res = await axios.post('https://library-management-rqkq.onrender.com/student/add-Info', formData, {
        withCredentials: true
      });

      setMsg(res.data.msg);
    } catch (err) {
      setMsg(err?.response?.data?.msg || 'Error submitting info');
    }
  };

  if (loading) return <div> <span className="flex items-center justify-center">
                      <Loader />
                    </span></div>;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h2 className='font-bold text-center bg-white'>Your Personal Information</h2>
      {msg && <p style={{ color: 'green' }}>{msg}</p>}

      <form onSubmit={handleSubmit} className=' p-2 bg-white shadow-lg'>
        {/* Readonly fields */}
        {Object.entries(readonlyFields).map(([key, value]) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label className='font-bold capitalize' >{key}</label><br />
            <input type="text" value={value} disabled 
              className="w-full border border-gray-300 px-3 py-2 rounded bg-gray-100 cursor-not-allowed"/>
          </div>
        ))}

        {/* Editable fields */}
        <h4 className='font-bold'>Missing Information:</h4>
        {Object.entries(editableFields).map(([key]) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label className='font-bold capitalize'>{key}</label><br />
            <input
              type="text"
              name={key}
              value={formData[key] || ''}  
              onChange={handleChange}
              required
              className='w-full border border-gray-300 px-3 py-2 rounded '
            />
          </div>
        ))}

        {Object.keys(editableFields).length > 0 ? (
          <button type="submit" className='cursor-pointer font-bold text-white bg-blue-500'>Submit Info</button>
        ) : (
          <p>All your information is Up to Date.</p>
        )}
      </form>
    </div>
  );
};

export default AddInfo;
