"use client";

import { useEffect, useState } from "react";
import api from "@/_utils/GlobalApi";
import { useRouter } from "next/navigation";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.getJobs();
        setJobs(response.data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleJobClick = (slug) => {
    router.push(`/jobs/${slug}`);
  };

  // Function to render rich text content
  const renderRichText = (richText) => {
    if (!richText || !Array.isArray(richText)) {
      return "Description not available";
    }

    return richText.map((block, index) => {
      if (block.type === "paragraph") {
        return (
          <p key={index} className="text-gray-700 mb-4">
            {block.children.map((child, childIndex) => child.text).join("")}
          </p>
        );
      }

      return null;
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            onClick={() => handleJobClick(job.attributes.slug)}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {job.attributes.title}
              </h3>
              <p className="text-gray-600 mb-2">
                {job.attributes.company} - {job.attributes.jobType}
              </p>
              <p className="text-gray-500 mb-4">
                {job.attributes.remoteOk ? "Remote" : "On-site"}
              </p>
              <div className="text-gray-700 mb-4">
                {renderRichText(job.attributes.jobDescripiton)}
              </div>
              <p className="text-gray-700 font-medium mb-4">
                {job.attributes.salary ? `$${job.attributes.salary}` : "N/A"}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">
                  {job.attributes.experienceLevel}
                </span>
                <span className="text-sm text-gray-500">
                  Date Posted:{" "}
                  {new Date(job.attributes.datePosted).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">
          No jobs available at the moment.
        </p>
      )}
    </div>
  );
};

export default Jobs;
