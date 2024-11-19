"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { applyForJob, getJobs } from "@/app/api/jobs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { getUserProfile } from "@/app/api/profile";
import { fetchPostedJobs, deleteJob } from "@/app/api/company";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null);
  const [isCompany, setIsCompany] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewingMyJobs, setViewingMyJobs] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        if (response && response.data && Array.isArray(response.data)) {
          setJobs(response.data);
        } else {
          console.error("Unexpected API response structure:", response);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const checkLoginStatus = async () => {
      const token = Cookies.get("token");

      if (token) {
        setIsLoggedIn(true);

        try {
          const userData = Cookies.get("user");
          if (userData) {
            const parsedUser = JSON.parse(userData);
            const userProfile = await getUserProfile(parsedUser.userId);
            setIsCompany(userProfile.isCompany);

            if (userProfile.isCompany) {
              try {
                const myJobs = await fetchPostedJobs(parsedUser.userId);
                setJobs(myJobs.data);
                setViewingMyJobs(true);
              } catch (error) {
                toast.error("Failed to fetch your posted jobs.");
                console.error("Error fetching posted jobs:", error);
              }
            } else {
              fetchJobs();
            }
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoggedIn(false);
        setIsCompany(false);
        setIsLoading(false);
        toast.info("Login to view jobs");
      }
    };

    checkLoginStatus();
  }, []);

  const getUserIdFromCookies = () => {
    const userId = Cookies.get("userId");
    return userId ? userId : null;
  };

  // Fetch jobs posted by the logged-in company user
  const fetchMyJobs = async () => {
    const userId = getUserIdFromCookies();
    if (userId && isCompany) {
      try {
        const myJobs = await fetchPostedJobs(userId);
        setJobs(myJobs.data);
        setViewingMyJobs(true);
      } catch (error) {
        toast.error("Failed to fetch your posted jobs.");
        console.error("Error fetching posted jobs:", error);
      }
    }
  };

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

  const handleEditJob = (jobId) => {
    router.push(`/edit-job/${jobId}`);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteJob(jobId);
      toast.success("Job has been deleted.");

      const response = await fetchMyJobs();
      setJobs(response.data);
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

    const isLong = tempDiv.clientHeight > 60;
    document.body.removeChild(tempDiv);
    return isLong;
  };

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-4 text-lg font-semibold">
        {viewingMyJobs ? "Your Posted Jobs" : "Total Jobs Available"}:{" "}
        {jobs.length}
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
                      {isCompany ? (
                        <>
                          <button
                            onClick={() => handleEditJob(job.id)}
                            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors flex-1"
                          >
                            Edit Job
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id)}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors flex-1"
                          >
                            Delete Job
                          </button>
                        </>
                      ) : (
                        <>
                          {canApply ? (
                            <button
                              onClick={() => handleApply(job.id)}
                              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex-1"
                            >
                              Apply for Job
                            </button>
                          ) : (
                            <button className="bg-red-600 text-white py-2 px-4 rounded cursor-not-allowed flex-1">
                              Job Expired
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 col-span-3">
            No jobs available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
