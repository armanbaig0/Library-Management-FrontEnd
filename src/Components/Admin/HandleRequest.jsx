import { useState, useEffect } from "react"
import RequestPagination from "./RequestPagination"
import axios from "axios"
import Swal from "sweetalert2"

  const HandleRequest = () =>{
      
   const [bookReq, setBookReq] = useState([]);

   // Fetch API for showing Requests from the database
  useEffect(() => {
   const fetchRequests = async () => {
     try {
       const response = await axios.get('https://library-management-rqkq.onrender.com/admin/get-req');
       if (response.data.success) {
         setBookReq(response.data.request);
       } else {
        await Swal.fire({
          toast: false,
          position: 'top-end',    // top-right corner
          icon: 'success',
          title: 'Filed to Fetch Requests',
          showConfirmButton: false,
          timer: 2000,            // 5 seconds
          timerProgressBar: true, // green line animation
        });
       }
     } catch (error) {
      
        console.log("error fetching requests")
     }
   };
   fetchRequests();
 }, []);

 const handleRequestsUpdate = (updatedRequests) => {
  setBookReq(updatedRequests);
};

   return(
        <>
           <div className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-bold mb-2">Requests</h3>
                <RequestPagination bookReq = {bookReq} onRequestsUpdate={handleRequestsUpdate} />
            </div>
        </>
     )
  }

  export default HandleRequest