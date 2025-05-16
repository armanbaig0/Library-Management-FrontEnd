import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const RequestPagination = ({ bookReq, onRequestsUpdate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ReqPerPage = 10;

  const safeBookReq = Array.isArray(bookReq) ? bookReq : [];
  const totalPages = Math.ceil(safeBookReq.length / ReqPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const indexOfLastReq = currentPage * ReqPerPage;
  const indexOfFirstReq = indexOfLastReq - ReqPerPage;
  const currentRequests = safeBookReq.slice(indexOfFirstReq, indexOfLastReq);

  const handleRequestAction = async (request_id, action) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/handle-request",
        {
          request_id,
          action,
        }
      );

      if (response.data.success) {
        await Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: `Request ${action}ed successfully`,
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        // Refresh requests
        if (onRequestsUpdate) {
          const updatedRequests = await axios.get(
            "http://localhost:5000/admin/get-req"
          );
          if (updatedRequests.data.success) {
            onRequestsUpdate(updatedRequests.data.request);
          }
        }
      } else {
        await Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: response.data.msg,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="px-2 rounded shadow">
      <div className="flex space-x-4">
        <table className="w-[45%] table-auto shadow-md justify items-center">
          <thead>
            <tr>
              <td className="justify-center items-center w-[15%]">
                <h3 className="text-md text-center font-bold mb-2">
                  Student Name
                </h3>
              </td>
              <td className="justify-center items-center w-[15%]">
                <h3 className="text-md text-center font-bold mb-2">
                  Book Title
                </h3>
              </td>
              <td className="justify-center items-center w-[15%]">
                <h3 className="text-md text-center font-bold mb-2">Author</h3>
              </td>
            </tr>
          </thead>
        </table>
      </div>

      <div className="">
        {currentRequests.length === 0 ? (
          <p className="text-gray-500">No Requests available.</p>
        ) : (
          currentRequests.map((book_request, index) => (
            <div key={index} className="flex space-x-8 mb-4">
              <table className="w-[100%] table-auto">
                <thead>
                  <tr className="shadow-md flex">
                    <td className="w-[15%] px-4 py-2">
                      <h4 className="text-gray-800 text-center text-md">
                        {book_request.student_name}
                      </h4>
                    </td>
                    <td className="w-[15%] px-4 py-2">
                      <h4 className="text-gray-800 text-center text-md">
                        {book_request.book_name}
                      </h4>
                    </td>
                    <td className="w-[15%] px-4 py-2">
                      <h4 className="text-gray-800 text-center text-md">
                        {book_request.book_author}
                      </h4>
                    </td>
                    <td className="w-[55%] justify-end flex px-2 py-2">
                      {book_request.status === "pending" ? (
                        <>
                          <button
                            onClick={() =>
                              handleRequestAction(
                                book_request.request_id,
                                "accept"
                              )
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md mr-2 cursor-pointer"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleRequestAction(
                                book_request.request_id,
                                "reject"
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md mr-2 cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span
                          className={`text-md ${
                            book_request.status === "accepted"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {book_request.status.charAt(0).toUpperCase() +
                            book_request.status.slice(1)}
                        </span>
                      )}
                    </td>
                  </tr>
                </thead>
              </table>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-lg font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RequestPagination;
