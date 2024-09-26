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
} from "react-icons/fa";

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
    const jobIds = postedJobs.map((job) => job.id); // Extract job IDs
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

  if (isCompany === null) {
    return <p className="text-center text-lg">Loading user data...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      {isCompany ? (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-blue-700">
            Your Job Applicants
          </h2>
          {applicants.length > 0 ? (
            <ul className="space-y-4">
              {applicants.map((applicant) => (
                <li
                  key={applicant.id}
                  className="bg-white shadow-md rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <FaUser className="text-blue-500 mr-2" />
                      <p className="font-semibold text-lg">
                        {
                          applicant?.attributes?.users_permissions_users
                            ?.data[0]?.attributes?.username
                        }
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center">
                      <FaCalendarAlt className="inline mr-1" />
                      <span>
                        Applied on:{" "}
                        {new Date(
                          applicant?.attributes?.applicationDate
                        ).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <p className="text-gray-700">
                      <FaEnvelope className="inline mr-1" />
                      Email:{" "}
                      <span className="font-medium">
                        {
                          applicant?.attributes?.users_permissions_users
                            ?.data[0]?.attributes?.email
                        }
                      </span>
                    </p>
                    <p className="text-gray-700">
                      <FaBriefcase className="inline mr-1" />
                      Applied for:{" "}
                      <span className="font-medium">
                        {applicant?.attributes?.jobs.data[0]?.attributes?.title}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      <FaMapMarkerAlt className="inline mr-1" />
                      Location:{" "}
                      <span className="font-medium">
                        {applicant?.attributes?.jobs?.data[0]?.attributes
                          ?.location || "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      Company:{" "}
                      <span className="font-medium">
                        {applicant?.attributes?.jobs?.data[0]?.attributes
                          ?.Company || "N/A"}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      Job Status:{" "}
                      <span className="font-medium">
                        {applicant?.attributes?.Status}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-4">No applicants yet.</p>
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
