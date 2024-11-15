"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getCompany } from "@/app/api/company";

const MembersHired = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompany();
        setCompanies(data?.data || []);
      } catch (error) {
        setError("Failed to load companies. Please try again later.");
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="flex justify-center mt-10 bg-[#8E3CCB] p-8 md:p-10 rounded-sm text-white shadow-md">
      <div className="flex flex-col items-center w-full space-y-6 md:space-y-10">
        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-bold text-center">
          Our Members Have Been Hired By*
        </h1>

        {/* Companies Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
          {error ? (
            <p className="col-span-full text-center text-red-300">{error}</p>
          ) : Array.isArray(companies) && companies.length > 0 ? (
            companies.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 text-center"
              >
                <Image
                  src={
                    item.attributes?.logo?.data?.attributes?.url ||
                    "/default-logo.png"
                  }
                  alt="Company Logo"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <p className="text-sm md:text-lg font-medium">
                  {item.attributes?.name || "Unknown Company"}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center">No companies available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembersHired;
