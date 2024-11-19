"use client";

import axiosClient from "@/app/_utils/axiosClient";
import { fetchPostedJobs } from "@/app/api/company";
import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaUser,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFileDownload,
} from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ViewApplicants = () => {
  const [isCompany, setIsCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  // Fetch user data from API
  useEffect(() => {
    const fetchCompanyJobs = async (userId) => {
      try {
        const jobsData = await fetchPostedJobs(userId);
        setJobs(jobsData.data);
        fetchApplicantsForCompanyJobs(jobsData.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axiosClient.get("/users/me");
        const user = response.data;
        setUserId(user.id);

        const userIsCompany = Boolean(user.isCompany);
        if (userIsCompany) {
          setIsCompany(true);
          fetchCompanyJobs(user.id);
        } else {
          setIsCompany(false);
        }
      } catch (error) {
        console.error("Error fetching user data from API:", error);
        setIsCompany(false);
      }
    };

    fetchUserData();
  }, []);

  // Fetch applicants for jobs posted by the logged-in company
  const fetchApplicantsForCompanyJobs = async (postedJobs) => {
    const jobIds = postedJobs.map((job) => job.id);
    try {
      const response = await axiosClient.get(
        `/apply-jobs?populate=jobs&populate=users_permissions_users`
      );
      const allApplicants = response.data.data;

      // Filter applicants to only those who applied for the relevant jobs
      const filteredApplicants = allApplicants.filter((applicant) =>
        jobIds.includes(applicant.attributes.jobs.data[0]?.id)
      );

      setApplicants(filteredApplicants);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  // Update applicant status
  const updateApplicantStatus = async (applicantId, jobId, status, userId) => {
    try {
      const applicantIdStr = String(applicantId);
      const jobIdStr = String(jobId);
      const userIdStr = String(userId);

      if (!applicantIdStr || !jobIdStr || !userIdStr || !status) {
        throw new Error("Invalid data for applicant, job, or company.");
      }

      const response = await axiosClient.put(`/apply-jobs/${applicantIdStr}`, {
        data: {
          Status: status,
          JobId: jobIdStr,
          CompanyId: userIdStr,
        },
      });

      console.log("Applicant status updated successfully", response.data);
      toast.success("Applicant status updated successfully!");
      router.refresh("/view-applicants");
    } catch (error) {
      console.error(
        "Error updating applicant status:",
        error.response?.data?.error?.message || error.message
      );
      toast.error(
        error.response?.data?.error?.message ||
          "Failed to update applicant status!"
      );
    }
  };

  const onChange = (applicant, newStatus) => {
    if (applicant && applicant.id && applicant.JobId && userId) {
      updateApplicantStatus(
        String(applicant.id),
        String(applicant.JobId),
        newStatus,
        String(userId)
      );
    } else {
      console.error("Invalid data for applicant, job, or company.");
      toast.error("Invalid data for applicant, job, or company.");
    }
  };

  // Open CV in a new tab
  const openCV = (cvUrl) => {
    window.open(cvUrl, "_blank");
  };

  if (isCompany === null) {
    return <p className="text-center text-lg">Loading user data...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      {isCompany ? (
        <div>
          <h2 className="text-4xl font-bold mb-8 text-indigo-600 text-center">
            Your Job Applicants
          </h2>
          {applicants.length > 0 ? (
            <ul className="space-y-8">
              {applicants.map((applicant) => (
                <li
                  key={applicant.id}
                  className="bg-white shadow-lg rounded-lg p-8 border border-gray-200 hover:shadow-2xl transform transition-all duration-200 hover:scale-105"
                >
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center space-x-6">
                      <FaUser className="text-indigo-500 text-2xl" />
                      <p className="text-xl font-semibold text-gray-800">
                        {
                          applicant?.attributes?.users_permissions_users
                            ?.data[0]?.attributes?.username
                        }
                      </p>
                    </div>
                    <p className="text-gray-500 flex items-center">
                      <FaCalendarAlt className="inline mr-2 text-gray-400" />
                      <span>
                        Applied on:{" "}
                        {new Date(
                          applicant?.attributes?.applicationDate
                        ).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <p className="text-gray-700">
                      <FaEnvelope className="inline mr-2 text-indigo-500" />
                      Email:{" "}
                      <span className="font-medium">
                        {
                          applicant?.attributes?.users_permissions_users
                            ?.data[0]?.attributes?.email
                        }
                      </span>
                    </p>
                    <p className="text-gray-700">
                      <FaBriefcase className="inline mr-2 text-indigo-500" />
                      Applied for:{" "}
                      <span className="font-medium">
                        {applicant?.attributes?.jobs.data[0]?.attributes?.title}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      <FaMapMarkerAlt className="inline mr-2 text-indigo-500" />
                      Location:{" "}
                      <span className="font-medium">
                        {applicant?.attributes?.jobs?.data[0]?.attributes
                          ?.location || "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Company:</span>{" "}
                      <span className="font-medium">
                        {applicant?.attributes?.jobs?.data[0]?.attributes
                          ?.Company || "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Job Status:</span>{" "}
                      <span className="font-medium">
                        {applicant?.attributes?.Status}
                      </span>
                    </p>

                    {/* Dropdown for changing status merged into grid */}
                    <div className="text-gray-700 ">
                      <label className="text-gray-800 font-medium">
                        <span className="mr-2">Change Status:</span>
                        <select
                          value={applicant?.attributes?.Status}
                          onChange={(e) =>
                            onChange(
                              {
                                id: applicant.id,
                                JobId: applicant?.attributes?.jobs?.data[0]?.id,
                              },
                              e.target.value
                            )
                          }
                          className="p-3 pl-8 pr-4 bg-white border rounded-md text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </label>
                    </div>

                    {applicant?.attributes?.users_permissions_users?.data[0]
                      ?.attributes?.cvUrl ? (
                      <button
                        onClick={() =>
                          openCV(
                            applicant.attributes.users_permissions_users.data[0]
                              .attributes.cvUrl
                          )
                        }
                        className="flex items-center text-blue-600 font-semibold hover:text-blue-800 mt-6"
                      >
                        <MdOutlineFileDownload className="mr-2 text-2xl" />
                        Download CV
                      </button>
                    ) : (
                      <p className="text-red-600 mt-2">No CV uploaded</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-lg text-gray-600">
              No applicants yet
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-xl text-red-600">
          You are not authorized to view applicants
        </p>
      )}
    </div>
  );
};

export default ViewApplicants;
