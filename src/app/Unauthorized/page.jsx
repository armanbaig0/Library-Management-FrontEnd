'use client'
import { useState } from "react";

export default function UnauthorizedPage() {
    const [state, setState] = useState();

    const handleChange = () =>{
      
    }
    
    return (
        <>
        <div>
          <input type="" onChange={handleChange} />
        </div>

    <div className="text-center mt-10 text-red-600 font-bold text-xl">
      ❌ Access Denied – You do not have permission to view this page.
    </div>

    <div>
        <input type="text"
         placeholder="Enter Text"/>
    </div>
    </>
  );
}


