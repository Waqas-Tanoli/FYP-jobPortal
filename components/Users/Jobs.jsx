"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJobs } from "@/app/api/jobs";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState({});
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        console.log("API Response:", response);
        if (response && response.data) {
          setJobs(response.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  const handleJobClick = (slug) => {
    router.push(`/jobs/${slug}`);
  };

  const handleApplyClick = (slug) => {
    router.push(`/jobs/${slug}/apply`);
  };

  const toggleExpand = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  // Function to render rich text content
  const renderRichText = (richText) => {
    if (!richText || !Array.isArray(richText)) {
      return [<p key="default">Description not available</p>];
    }

    return richText.map((block, index) => {
      if (block.type === "paragraph") {
        return (
          <p key={index} className="text-gray-700 mb-4">
            {block.children.map((child) => child.text).join("")}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {Array.isArray(jobs) && jobs.length > 0 ? (
        jobs.map((job) => {
          const isExpanded = expandedJobId === job.id;
          const jobDescription = renderRichText(job.attributes.jobDescription);

          const handleDescriptionToggle = () => {
            setExpandedDescription((prev) => ({
              ...prev,
              [job.id]: !prev[job.id],
            }));
          };

          return (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {job.attributes.title}
                </h3>
                <div className="text-gray-700 mb-4 flex-grow">
                  {jobDescription.slice(0, 1)}
                  {jobDescription.length > 1 && (
                    <button
                      onClick={handleDescriptionToggle}
                      className="text-blue-500 mt-2 block"
                    >
                      {expandedDescription[job.id] ? "Show less" : "Read more"}
                    </button>
                  )}
                  {expandedDescription[job.id] && jobDescription.slice(1)}
                </div>

                <div className="flex flex-col justify-between mt-auto">
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Job Type:</span>{" "}
                    {job.attributes.jobType}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {job.attributes.remoteOk ? "Remote" : "On-site"}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Salary:</span>{" "}
                    {job.attributes.salary
                      ? `$${job.attributes.salary}K`
                      : "N/A"}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleApplyClick(job.attributes.slug)}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex-1"
                    >
                      Apply for Job
                    </button>
                    <button
                      onClick={() => handleJobClick(job.attributes.slug)}
                      className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors flex-1"
                    >
                      View Details
                    </button>
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
  );
};

export default Jobs;
