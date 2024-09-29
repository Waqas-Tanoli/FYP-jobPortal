"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import { fetchJobEntry, updateJobEntry } from "@/app/api/jobs";
import Cookies from "js-cookie";

const EditJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    remoteOk: false,
    datePosted: "",
    jobType: "",
    Industry: "",
    jobDescription: "",
    education: "",
    salary: "",
    experienceLevel: "",
    Company: "",
    skills_tags: "",
    lastDateToApply: "",
    location: "",
  });

  const { jobId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const getJobData = async () => {
      try {
        const jobData = await fetchJobEntry(jobId);
        if (jobData && jobData.attributes) {
          setFormData({
            title: jobData.attributes.title || "",
            remoteOk: jobData.attributes.remoteOk || false,
            datePosted: jobData.attributes.datePosted || "",
            jobType: jobData.attributes.jobType || "",
            Industry: jobData.attributes.Industry || "",
            jobDescription: jobData.attributes.jobDescription || "",
            education: jobData.attributes.education || "",
            salary: jobData.attributes.salary || "",
            experienceLevel: jobData.attributes.experienceLevel || "",
            Company: jobData.attributes.Company || "",
            skills_tags: jobData.attributes.skills_tags || "",
            lastDateToApply: jobData.attributes.lastDateToApply || "",
            location: jobData.attributes.location || "",
          });
        }
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
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
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
            <option value="Business">Business</option>
            <option value="Banking">Banking</option>
            <option value="Education">Education</option>
            <option value="Telecommunication">Telecommunication</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Company */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Company
          </label>
          <input
            type="text"
            name="Company"
            value={formData.Company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
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
            required
          />
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
            <option value="Bachelors">Matric</option>
            <option value="Masters">F.Sc</option>
            <option value="Ph.D">Bachelors</option>
            <option value="Ph.D">Masters</option>
            <option value="Ph.D">Ph.D</option>
            <option value="Ph.D">M.phill</option>
          </select>
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
            required
          >
            <option value="Junior">Tech-lead</option>
            <option value="Mediocre">Senior</option>
            <option value="Senior">Mediocre</option>
            <option value="Tech Lead">Junior</option>
            <option value="Tech Lead">Fresher</option>
          </select>
        </div>

        {/* Skills Tags */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Skills Tags (comma separated)
          </label>
          <input
            type="text"
            name="skills_tags"
            value={formData.skills_tags}
            onChange={handleChange}
            placeholder="DevOps, MERN Stack"
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
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;
