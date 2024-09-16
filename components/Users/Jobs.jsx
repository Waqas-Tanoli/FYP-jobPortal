"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { applyForJob, getJobs } from "@/app/api/jobs";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        console.log("API Response:", response);
        if (response && response.data && Array.isArray(response.data)) {
          setJobs(response.data);
        } else {
          console.error("Unexpected API response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  {
    /*
    const handleJobClick = (slug) => {
    router.push(`/jobs/${slug}`);
  };

  const handleApplyClick = (slug) => {
    router.push(`/jobs/${slug}/apply`);
  };
    */
  }

  const getUserIdFromCookies = () => {
    const userId = Cookies.get("userId");
    if (userId) {
      return userId;
    } else {
      return null;
    }
  };

  const handleApply = async (jobId) => {
    const userId = getUserIdFromCookies();
    if (!userId) {
      toast.error("You must be logged in to apply for jobs.");
      return;
    }

    try {
      const result = await applyForJob(jobId, userId);
      toast.success("You have successfully applied for the job!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6">
      {/* Display total number of jobs */}
      <div className="mb-4 text-lg font-semibold">
        Total Jobs Available: {jobs.length}
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => {
            job.attributes.jobDescription;

            return (
              <div
                key={job.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {job.attributes.title}
                  </h3>
                  <div className="text-gray-700 mb-4 flex-grow">
                    {job.jobDescription}
                  </div>

                  <div className="flex flex-col justify-between mt-auto">
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Job Type:</span>{" "}
                      {job.attributes.jobType}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Location:</span>{" "}
                      {job.attributes.remoteOk
                        ? "Remote"
                        : job.attributes.location}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold">Salary:</span>{" "}
                      {job.attributes.salary
                        ? `$${job.attributes.salary}K`
                        : "N/A"}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleApply(job.id)} // Pass only jobId, userId is handled internally
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex-1"
                      >
                        Apply for Job
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">
            No jobs available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
