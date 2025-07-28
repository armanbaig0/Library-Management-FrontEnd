import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const studentName = Cookies.get('userFullname');  
      const response = await axios.get('https://library-management-rqkq.onrender.com/student/request-status', {
        params: { student_name: studentName }
      });
      if (response.data.success) {
        setNotifications(response.data.requests);
      } else {
        Swal.fire('Error', response.data.msg, 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <div className="px-4 py-6 rounded shadow-md bg-white max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center">No notifications available.</p>
      ) : (
        <div className="space-y-4">
          {notifications
            .filter(notification => notification.status === 'accepted' || notification.status === 'rejected')
            .map((notification, index) => (
              <div
                key={index}
                className={`p-4 rounded-md shadow-sm ${
                  notification.status === 'accepted' ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      {notification.book_name} by {notification.book_author}
                    </h4>
                    <p className={`text-sm ${
                      notification.status === 'accepted' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      Request {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                    </p>
                  </div>
                  {notification.status === 'accepted' && notification.is_available && (
                    <>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 hover:shadow-lg text-white cursor-pointer py-1 px-3 rounded-md text-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg> 
                    </button>
          
                    {/* Modal */}
                    {isModalOpen && (
                      <div className="fixed inset-0 bg-transparent  flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg shadow-lg relative w-xl max-w-2xl p-4">
                          
                          {/* Close Button */}
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 w-10 cursor-pointer right-2 bg-red-500 text-white hover:text-gray-500 text-xl font-bold"
                          >
                            &times;
                          </button>
          
                          {/* PDF Viewer */}
                          <iframe
                            src={`http://localhost:5000/files/${notification.book_path}`}
                            className="w-[90%] h-96 border z-0"
                            title="PDF Viewer"
                          ></iframe>
                        </div>
                      </div>
                    )}
                  </>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
