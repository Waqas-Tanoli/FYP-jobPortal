"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const jobTypes = ["Full-Time", "Part-Time", "Internship", "Contract"];
const educationLevels = ["Matric", "F.Sc", "Bachelors", "Masters", "Ph.D"];
const experienceLevels = [
  "Tech-Lead",
  "Senior",
  "Mediocre",
  "Junior",
  "Fresher",
];
const salaryRanges = [
  { label: "$0K - $50K", value: "0-50" },
  { label: "$50K - $100K", value: "50-100" },
  { label: "$100K - $150K", value: "100-150" },
  { label: "$150K+", value: "150-1000" },
];

const AdvancedSearch = ({ onFilter }) => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    jobType: [],
    education: [],
    experienceLevel: [],
    salary: "",
  });

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value];
      return {
        ...prevFilters,
        [category]: updatedCategory,
      };
    });
  };

  const handleSalaryChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      salary: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = new URLSearchParams();

    if (filters.jobType.length) {
      query.append("jobType", filters.jobType.join(","));
    }

    if (filters.education.length) {
      query.append("education", filters.education.join(","));
    }

    if (filters.experienceLevel.length) {
      query.append("experienceLevel", filters.experienceLevel.join(","));
    }

    if (filters.salary) {
      query.append("salary", filters.salary);
    }

    console.log("Generated Query String:", query.toString());

    const queryString = query.toString();

    if (queryString) {
      router.push(`/FilteredJobs?${queryString}`);
    } else {
      router.push("/Jobs");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">Advanced Search</h2>
      <form onSubmit={handleSearch}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Job Type */}
          <div>
            <fieldset className="mb-4">
              <legend className="text-lg font-semibold mb-2">Job Type</legend>
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`jobType-${type}`}
                    value={type}
                    checked={filters.jobType.includes(type)}
                    onChange={() => handleCheckboxChange("jobType", type)}
                    className="mr-2"
                  />
                  <label htmlFor={`jobType-${type}`} className="text-gray-700">
                    {type}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          {/* Education */}
          <div>
            <fieldset className="mb-4">
              <legend className="text-lg font-semibold mb-2">Education</legend>
              {educationLevels.map((level) => (
                <div key={level} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`education-${level}`}
                    value={level}
                    checked={filters.education.includes(level)}
                    onChange={() => handleCheckboxChange("education", level)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`education-${level}`}
                    className="text-gray-700"
                  >
                    {level}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          {/* Experience */}
          <div>
            <fieldset className="mb-4">
              <legend className="text-lg font-semibold mb-2">
                Experience Level
              </legend>
              {experienceLevels.map((exp) => (
                <div key={exp} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`experienceLevel-${exp}`}
                    value={exp}
                    checked={filters.experienceLevel.includes(exp)}
                    onChange={() =>
                      handleCheckboxChange("experienceLevel", exp)
                    }
                    className="mr-2"
                  />
                  <label
                    htmlFor={`experienceLevel-${exp}`}
                    className="text-gray-700"
                  >
                    {exp}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          {/* Salary Range */}
          <div>
            <fieldset className="mb-4">
              <legend className="text-lg font-semibold mb-2">
                Salary Range
              </legend>
              {salaryRanges.map((range) => (
                <div key={range.value} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`salary-${range.value}`}
                    name="salary"
                    value={range.value}
                    checked={filters.salary === range.value}
                    onChange={() => handleSalaryChange(range.value)}
                    className="mr-2"
                  />
                  <label
                    htmlFor={`salary-${range.value}`}
                    className="text-gray-700"
                  >
                    {range.label}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mt-4"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default AdvancedSearch;
