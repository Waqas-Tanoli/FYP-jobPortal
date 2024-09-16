"use client";

import { fetchAppliedJobs } from "@/app/api/jobs";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppliedJobs = async () => {
      try {
        const userId = Cookies.get("userId");
        if (!userId) {
          throw new Error("User ID is not available.");
        }
        const response = await fetchAppliedJobs(userId);
        console.log("Fetched Applied Jobs:", response);

        // Access the `data` array from the response
        const jobsData = response.data || [];
        const formattedJobs = jobsData.map((item) => {
          const jobDetails = item.attributes.jobs?.data?.[0]?.attributes || {}; // Get job details from the jobs array
          return {
            ...item.attributes, // Application attributes like applicationDate, Status
            job: jobDetails, // Extracted job details
          };
        });

        setAppliedJobs(formattedJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        toast.error("Failed to fetch applied jobs.");
        setLoading(false);
      }
    };

    loadAppliedJobs();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (appliedJobs.length === 0) {
    return (
      <div className="text-center text-lg">
        You haven't applied for any jobs yet.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Applied Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appliedJobs.map((application, index) => {
          const job = application.job || {};
          const jobTitle = job.title || "No Title Available";
          const companyName = job.Company || "No Company Name";
          const jobDescription = job.jobDescription
            ? job.jobDescription.slice(0, 200) + "..."
            : "No Description Available";
          const applicationStatus =
            application.Status?.charAt(0).toUpperCase() +
              application.Status?.slice(1) || "Unknown Status";

          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{jobTitle}</h2>
                <p className="text-gray-700 mb-2 text-lg font-medium">
                  {companyName}
                </p>
                <p className="text-gray-600 mb-4">{jobDescription}</p>
                <div className="mb-4">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.location || "Not Specified"}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="font-semibold">Salary:</span> $
                    {job.salary ? `${job.salary}K` : "Not Specified"}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="font-semibold">Education:</span>{" "}
                    {job.education || "Not Specified"}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="font-semibold">Experience Level:</span>{" "}
                    {job.experienceLevel || "Not Specified"}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>
                    Applied on:{" "}
                    {new Date(application.applicationDate).toLocaleDateString()}
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      application.Status === "accepted"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {applicationStatus}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppliedJobs;
