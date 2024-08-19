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
    <div className="flex justify-center mt-10 bg-[#8E3CCB] p-10 rounded-sm text-white shadow-md">
      <div className="flex flex-col items-center space-y-10">
        <h1 className="text-4xl font-bold">Our Members Have Been Hired By*</h1>
        <div className="flex flex-wrap justify-around w-full gap-14">
          {error ? (
            <p className="text-red-300">{error}</p>
          ) : Array.isArray(companies) && companies.length > 0 ? (
            companies.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-5">
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
                <p className="text-lg font-medium">
                  {item.attributes?.companyName || "Unknown Company"}
                </p>
              </div>
            ))
          ) : (
            <p>No companies available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembersHired;
