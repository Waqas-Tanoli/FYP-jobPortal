"use client";

import GlobalApi from "@/_utils/GlobalApi";
import Image from "next/image";
import { useEffect, useState } from "react";

const Jobs = ({}) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getCompany();
  }, []);

  const getCompany = () => {
    GlobalApi.getCompany().then((res) => {
      console.log(res.data.data);
      setJobs(res.data.data);
    });
  };

  return (
    <div>
      {Array.isArray(jobs) && jobs.length > 0 ? (
        jobs.map((item, index) => (
          <div key={index}>
            <Image
              src={item.attributes?.logo?.data?.attributes?.url}
              alt="logo"
              width={40}
              height={40}
            />
            <p>Company Name: {item.attributes?.companyName}</p>
            <p>Location: {item.attributes?.City}</p>
          </div>
        ))
      ) : (
        <p>No companies available</p>
      )}
    </div>
  );
};

export default Jobs;
