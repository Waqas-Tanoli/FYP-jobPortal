// FilteredJobsPage.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getFilteredJobs } from "@/app/api/jobs";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const FilteredJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("title") || "";
  const location = searchParams.get("location") || "";
  const jobType = searchParams.get("jobType") || "";
  const education = searchParams.get("education") || "";
  const experienceLevel = searchParams.get("experienceLevel") || "";
  const salary = searchParams.get("salary") || "";

  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        setLoading(true);
        const response = await getFilteredJobs(
          jobTitle,
          location,
          jobType,
          education,
          experienceLevel,
          salary
        );

        const jobData =
          response.data?.map((job) => ({
            id: job.id,
            ...job.attributes,
          })) || [];
        setJobs(jobData);
        setTotalJobs(response.meta?.pagination?.total || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching filtered jobs:", error);
        setError("Failed to fetch jobs");
        setLoading(false);
      }
    };

    fetchFilteredJobs();
  }, [jobTitle, location, jobType, education, experienceLevel, salary]);

  const getUserIdFromCookies = () => Cookies.get("userId");

  const handleApply = async (jobId) => {
    const userId = getUserIdFromCookies();
    if (!userId) {
      toast.error("You must be logged in to apply for jobs.");
      return;
    }

    try {
      await applyForJob(jobId, userId);
      toast.success("You have successfully applied for the job!");
    } catch (error) {
      toast.error("Error applying for job");
    }
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Filtered Jobs {jobTitle && `for "${jobTitle}"`}{" "}
        {location && `in "${location}"`}
      </h1>
      <p className="mb-4 text-lg font-semibold">
        {totalJobs} job{totalJobs !== 1 ? "s" : ""} found
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.title}
                </h3>
                <div className="text-gray-700 mb-4 flex-grow">
                  {job.jobDescription || "No description available"}
                </div>
                <div className="flex flex-col justify-between mt-auto">
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Company:</span>{" "}
                    {job.Company}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Job Type:</span>{" "}
                    {job.jobType}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.remoteOk ? "Remote" : job.location}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Salary:</span>{" "}
                    {job.salary ? `$${job.salary}K` : "N/A"}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleApply(job.id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex-1"
                    >
                      Apply for Job
                    </button>
                    <button
                      onClick={() => handleJobClick(job.slug)}
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors flex-1"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No jobs available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default FilteredJobs;
