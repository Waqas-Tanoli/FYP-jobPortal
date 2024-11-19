"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { applyForJob, getFilteredJobs } from "@/app/api/jobs";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const FilteredJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salaryStats, setSalaryStats] = useState({
    averageSalary: 0,
    maxSalary: 0,
    minSalary: 0,
  });

  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("title") || "";
  const location = searchParams.get("location") || "";
  const jobType = searchParams.get("jobType") || "";
  const education = searchParams.get("education") || "";
  const experienceLevel = searchParams.get("experienceLevel") || "";
  const salary = searchParams.get("salary") || "";

  // Function to calculate salary statistics
  const calculateSalaryStats = (jobs) => {
    if (!jobs || jobs.length === 0) {
      return {
        averageSalary: 0,
        maxSalary: 0,
        minSalary: 0,
      };
    }

    const salaries = jobs
      .map((job) => job.salary)
      .filter((salary) => salary !== null && salary !== undefined);

    const totalSalaries = salaries.reduce((acc, salary) => acc + salary, 0);
    const maxSalary = Math.max(...salaries);
    const minSalary = Math.min(...salaries);
    const averageSalary = (totalSalaries / salaries.length).toFixed(2);

    return {
      averageSalary: parseFloat(averageSalary),
      maxSalary,
      minSalary,
    };
  };

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
        setSalaryStats(calculateSalaryStats(jobData));
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
      const applicationCreated = await applyForJob(jobId, userId);

      if (applicationCreated) {
        toast.success("You have successfully applied for the job!");
      } else {
        toast.error("You have already applied for this job.");
      }
    } catch (error) {
      toast.error(error.message);
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
      {totalJobs > 0 && (
        <div className="mb-6 p-4 bg-[#8E3CCB] text-white rounded-xl shadow-2xl max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4 text-center text-white shadow-md">
            💼 Salary Insights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="text-center bg-white text-gray-800 p-3 rounded-md shadow-md border border-gray-300 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-md font-semibold mb-1">Average Salary</h3>
              <p className="text-xl font-bold text-[#8E3CCB]">
                {salaryStats.averageSalary}K
              </p>
            </div>
            <div className="text-center bg-white text-gray-800 p-3 rounded-md shadow-md border border-gray-300 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-md font-semibold mb-1">Maximum Salary</h3>
              <p className="text-xl font-bold text-[#8E3CCB]">
                {salaryStats.maxSalary}K
              </p>
            </div>
            <div className="text-center bg-white text-gray-800 p-3 rounded-md shadow-md border border-gray-300 transform hover:scale-105 transition-transform duration-300">
              <h3 className="text-md font-semibold mb-1">Minimum Salary</h3>
              <p className="text-xl font-bold text-[#8E3CCB]">
                {salaryStats.minSalary}K
              </p>
            </div>
          </div>
        </div>
      )}

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
