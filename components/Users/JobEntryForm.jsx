"use client";

import React, { useState } from "react";
import GlobalApi from "@/_utils/GlobalApi";
import { toast } from "react-toastify";

const JobEntryForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    remoteOk: false,
    datePosted: "",
    jobType: "Full-Time",
    jobCategory: "",
    jobDescription: "",
    jobResponsibilities: "",
    education: "Bachelors",
    salary: "",
    experienceLevel: "Junior",
    company: "",
    skillsTags: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const slug = formData.title.toLowerCase().replace(/\s+/g, "-");

      const jobData = {
        ...formData,
        slug,
        skillsTags: formData.skillsTags.split(","),
      };

      await GlobalApi.createJobEntry(jobData);

      toast.success("Job created successfully!");

      setFormData({
        title: "",
        remoteOk: false,
        datePosted: "",
        jobType: "Full-Time",
        jobCategory: "",
        jobDescription: "",
        jobResponsibilities: "",
        education: "Bachelors",
        salary: "",
        experienceLevel: "Junior",
        company: "",
        skillsTags: "",
      });
    } catch (error) {
      console.error(
        "Error creating job:",
        error.response?.data || error.message
      );
      toast.error("Failed to create job. Please check your input.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Create a Job Entry
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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
            <option>M.Phil</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Job Category
          </label>
          <input
            type="text"
            name="jobCategory"
            value={formData.jobCategory}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
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
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Job Responsibilities
          </label>
          <textarea
            name="jobResponsibilities"
            value={formData.jobResponsibilities}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Salary
          </label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
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
            <option>Tech Lead</option>
            <option>Senior</option>
            <option>Mediocre</option>
            <option>Junior</option>
            <option>Fresher</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Skills Tags
          </label>
          <input
            type="text"
            name="skillsTags"
            value={formData.skillsTags}
            onChange={handleChange}
            placeholder="Separate tags with commas"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default JobEntryForm;
