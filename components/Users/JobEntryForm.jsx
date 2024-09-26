"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createJobEntry } from "@/app/api/jobs";
import Cookies from "js-cookie";

const JobEntryForm = () => {
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

  const router = useRouter();

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
      await createJobEntry(jobData);
      toast.success("Job created successfully!");

      // Reset the form
      setFormData({
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

      router.push("/Jobs");
    } catch (error) {
      console.error(
        "Error creating job:",
        error.response?.data || error.message
      );

      const errorDetails = error.response?.data?.error?.details?.errors || [];
      errorDetails.forEach((err) => {
        console.error(`Field: ${err.path}, Message: ${err.message}`);
      });

      toast.error("Failed to create job. Please check your input.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Create a Job Entry
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Job Type */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Job Type
          </label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>

        {/* Education */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Education
          </label>
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option>Matric</option>
            <option>F.Sc</option>
            <option>Bachelors</option>
            <option>Masters</option>
            <option>Ph.D</option>
            <option>M.phill</option>
          </select>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Industry
          </label>
          <select
            name="Industry"
            value={formData.Industry}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          >
            <option>Business</option>
            <option>Banking</option>
            <option>Education</option>
            <option>Telecommunication</option>
            <option>Others</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Job Description
          </label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Salary */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Salary
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Experience Level
          </label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Tech-Lead</option>
            <option>Senior</option>
            <option>Mediocre</option>
            <option>Junior</option>
            <option>Fresher</option>
          </select>
        </div>

        {/* Company */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Company
          </label>
          <input
            type="text"
            name="Company" // Make sure it matches formData key
            value={formData.Company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Skills Tags */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Skills Tags (comma-separated)
          </label>
          <input
            type="text"
            name="skills_tags" // Make sure it matches formData key
            value={formData.skills_tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default JobEntryForm;
