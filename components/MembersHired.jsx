"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import GlobalApi from "@/_utils/GlobalApi";

const MembersHired = () => {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = () => {
    GlobalApi.getCompany().then((res) => {
      console.log(res.data.data);
      setCompany(res.data.data);
    });
  };

  return (
    <div className="flex justify-center mt-10 bg-[#8E3CCB] p-10 rounded-sm text-white shadow-md">
      <div className="flex flex-col items-center space-y-10">
        <h1 className="text-4xl font-bold">Our Members Have Been Hired By*</h1>
        <div className="flex flex-wrap justify-around w-full gap-14">
          {Array.isArray(company) && company.length > 0 ? (
            company.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-5">
                <Image
                  src={item.attributes?.logo?.data?.attributes?.url}
                  alt="logo"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <p className="text-lg font-medium">
                  {item.attributes?.companyName}
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
