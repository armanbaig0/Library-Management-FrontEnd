"use client";

import { useRouter } from "next/navigation";
import Loader from "../Components/Loader/Loader";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const handleAdminClick = () => {
    router.push("/Admin");
    setIsLoading(true);
  };
  const handleStudentClick = () => {
    router.push("/Student");
    setIsLoad(true);
  };

  return (
    <>
      <div className="">
        <div className="bg-blue-700">
          <p> .. </p>
        </div>
        <div className="bg-blue-700">
          <p> .. </p>
        </div>
        <div className="bg-blue-700">
          <p> .. </p>
        </div>
        <div className="bg-blue-700">
          <p> .. </p>
        </div>
      </div>

      <div className="flex  justify-center items-center space-x-8">
        <div className="">
          <button
            type="submit"
            disabled={isLoading}
            onClick={handleAdminClick}
            className="border font-bold hover:scale-105 bg-blue-700 text-white cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="flex items-center justify-center">
                  <Loader />
                </span>
              </>
            ) : (
              "Admin"
            )}
          </button>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoad}
            onClick={handleStudentClick}
            className="border font-bold hover:scale-105 bg-blue-700 text-white cursor-pointer"
          >
            {isLoad ? (
              <>
                <span className="flex items-center justify-center">
                  <Loader />
                </span>
              </>
            ) : (
              "Student"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
