"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { applyForJob, getJobs } from "@/app/api/jobs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);
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

  const getUserIdFromCookies = () => {
    const userId = Cookies.get("userId");
    return userId ? userId : null;
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

  const isApplicationAllowed = (lastDateToApply) => {
    const today = new Date();
    const deadline = new Date(lastDateToApply);
    return today <= deadline;
  };

  const toggleDescription = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const shouldShowReadMore = (description) => {
    const tempDiv = document.createElement("div");
    tempDiv.style.visibility = "hidden";
    tempDiv.style.position = "absolute";
    tempDiv.style.width = "300px";
    tempDiv.innerText = description;
    document.body.appendChild(tempDiv);

    // Measure the height of the text
    const isLong = tempDiv.clientHeight > 60;
    document.body.removeChild(tempDiv);
    return isLong;
  };

  return (
    <div className="p-6">
      <div className="mb-4 text-lg font-semibold">
        Total Jobs Available: {jobs.length}
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => {
            const {
              title,
              jobDescription,
              jobType,
              remoteOk,
              location,
              salary,
              lastDateToApply,
              Company,
              Industry,
              education,
              experienceLevel,
            } = job.attributes;
            const canApply = isApplicationAllowed(lastDateToApply);

            const showReadMore = shouldShowReadMore(jobDescription);

            return (
              <div
                key={job.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {title}
                  </h3>
                  <div className="text-gray-700 mb-4 flex-grow">
                    {expandedJob === job.id
                      ? jobDescription || "No description available."
                      : showReadMore
                      ? `${jobDescription.substring(0, 100)}...`
                      : jobDescription || "No description available."}
                  </div>

                  {showReadMore && (
                    <button
                      onClick={() => toggleDescription(job.id)}
                      className="text-blue-500 hover:underline"
                    >
                      {expandedJob === job.id ? "Read less" : "Read more..."}
                    </button>
                  )}

                  <div className="flex flex-col justify-between mt-auto">
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Company:</span> {Company}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Industry:</span>{" "}
                      {Industry}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Education:</span>{" "}
                      {education}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Experience Level:</span>{" "}
                      {experienceLevel}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Job Type:</span> {jobType}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Location:</span>{" "}
                      {remoteOk ? "Remote" : location}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Salary:</span>{" "}
                      {salary ? `$${salary}K` : "N/A"}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-semibold">Last Date to Apply:</span>{" "}
                      {new Date(lastDateToApply).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-4">
                      {canApply ? (
                        <button
                          onClick={() => handleApply(job.id)}
                          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex-1"
                        >
                          Apply for Job
                        </button>
                      ) : (
                        <div className="bg-red-500 text-white py-2 px-4 rounded flex-1 text-center">
                          Job Expired
                        </div>
                      )}
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
