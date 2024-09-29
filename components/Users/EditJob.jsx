"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation"; // Importing useParams for route params
import { fetchJobEntry, updateJobEntry } from "@/app/api/jobs";
import Cookies from "js-cookie";

const EditJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    remoteOk: false,
    datePosted: "",
    jobType: "Full-Time",
    Industry: "Business",
    jobDescription: "",
    education: "Bachelors",
    salary: "",
    experienceLevel: "Senior",
    Company: "",
    skills_tags: "",
    lastDateToApply: "",
    location: "",
  });

  const { jobId } = useParams(); // Access jobId from the route
  const router = useRouter();

  useEffect(() => {
    // Fetch the job data by jobId when the component loads
    const getJobData = async () => {
      try {
        const jobData = await fetchJobEntry(jobId);
        setFormData({
          title: jobData.title || "",
          remoteOk: jobData.remoteOk || false,
          datePosted: jobData.datePosted || "",
          jobType: jobData.jobType || "Full-Time",
          Industry: jobData.Industry || "Business",
          jobDescription: jobData.jobDescription || "",
          education: jobData.education || "Bachelors",
          salary: jobData.salary || "",
          experienceLevel: jobData.experienceLevel || "Senior",
          Company: jobData.Company || "",
          skills_tags: jobData.skills_tags || "",
          lastDateToApply: jobData.lastDateToApply || "",
          location: jobData.location || "",
        });
      } catch (error) {
        console.error("Error fetching job data:", error);
        toast.error("Failed to load job details.");
      }
    };

    getJobData();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const slug = formData.title.toLowerCase().replace(/\s+/g, "-");
    const userId = Cookies.get("userId");

    const jobData = {
      data: {
        ...formData,
        slug,
        users_permissions_users: [{ id: userId }],
      },
    };

    try {
      await updateJobEntry(jobId, jobData);
      toast.success("Job updated successfully!");

      // Redirect to job list or another page
      router.push("/Jobs");
    } catch (error) {
      console.error(
        "Error updating job:",
        error.response?.data || error.message
      );
      toast.error("Failed to update job. Please check your input.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pre-filled form with job details */}
        {/* Job Title */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Remote OK */}
        <div className="flex items-center space-x-3">
          <label className="block text-gray-700 font-semibold">
            Remote OK?
          </label>
          <input
            type="checkbox"
            name="remoteOk"
            checked={formData.remoteOk}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600"
          />
        </div>

        {/* Date Posted */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Date Posted
          </label>
          <input
            type="date"
            name="datePosted"
            value={formData.datePosted}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Last Date to Apply */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Last Date to Apply
          </label>
          <input
            type="date"
            name="lastDateToApply"
            value={formData.lastDateToApply}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Other form fields for jobType, Industry, Location, etc. */}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
