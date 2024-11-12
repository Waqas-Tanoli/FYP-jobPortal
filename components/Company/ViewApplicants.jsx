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
const ViewApplicants = () => {
  const [isCompany, setIsCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosClient.get("/users/me");
        const user = response.data;
        console.log("Full User Data from API:", user);

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

  // Fetch company jobs
  const fetchCompanyJobs = async (userId) => {
    try {
      const jobsData = await fetchPostedJobs(userId);
      setJobs(jobsData.data);
      // Fetch applicants for these jobs once jobs are loaded
      fetchApplicantsForCompanyJobs(jobsData.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

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
            <ul className="space-y-6">
              {applicants.map((applicant) => (
                <li
                  key={applicant.id}
                  className="bg-white shadow-lg rounded-lg p-8 border border-gray-200 hover:shadow-2xl transform transition-all duration-200 hover:scale-105"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
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

                  <div className="grid grid-cols-2 gap-6 mb-4">
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
                    {applicant?.attributes?.users_permissions_users?.data[0]
                      ?.attributes?.cvUrl ? (
                      <button
                        onClick={() =>
                          openCV(
                            applicant.attributes.users_permissions_users.data[0]
                              .attributes.cvUrl
                          )
                        }
                        className="flex items-center text-blue-600 font-semibold hover:text-blue-800"
                      >
                        <MdOutlineFileDownload className="mr-2 text-2xl" />
                        Download CV
                      </button>
                    ) : (
                      <p className="text-gray-500 mt-4 italic">
                        CV not uploaded
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-4 text-center">No applicants yet.</p>
          )}
        </div>
      ) : (
        <p className="text-red-500 text-center">
          You are not authorized to view this page.
        </p>
      )}
    </div>
  );
};

export default ViewApplicants;
