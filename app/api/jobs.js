import axiosClient from "../_utils/axiosClient";

export const getJobs = async () => {
  try {
    // Fetch all jobs
    const response = await axiosClient.get("/jobs?populate=*");
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

//create new job
export const createJobEntry = async (jobData) => {
  const response = await axiosClient.post("/jobs", jobData);
  return response.data;
};

//job filtering
export const getFilteredJobs = async (
  title,
  location,
  jobType,
  education,
  experienceLevel,
  salary
) => {
  try {
    const query = new URLSearchParams();

    // Filter by title
    if (title) {
      query.append("filters[title][$contains]", title);
    }

    // Filter by location
    if (location) {
      query.append("filters[location][$contains]", location);
    }

    // Filter by jobType
    if (jobType) {
      const jobTypesArray = Array.isArray(jobType) ? jobType : [jobType];
      jobTypesArray.forEach((type) =>
        query.append("filters[jobType][$eq]", type)
      );
    }

    // Filter by education
    if (education) {
      const educationArray = Array.isArray(education) ? education : [education];
      educationArray.forEach((level) =>
        query.append("filters[education][$eq]", level)
      );
    }

    // Filter by experience level
    if (experienceLevel) {
      const experienceArray = Array.isArray(experienceLevel)
        ? experienceLevel
        : [experienceLevel];
      experienceArray.forEach((level) =>
        query.append("filters[experienceLevel][$eq]", level)
      );
    }

    // Salary filter
    if (salary) {
      const [minSalary, maxSalary] = salary.split("-");
      query.append("filters[salary][$gte]", minSalary);
      if (maxSalary) query.append("filters[salary][$lte]", maxSalary);
    }

    const queryString = query.toString();
    console.log("Generated Query for API:", queryString);

    const response = await axiosClient.get(`/jobs?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered jobs:", error);
    throw error;
  }
};

//apply for job api
export const applyForJob = async (jobId, userId) => {
  try {
    const response = await axiosClient.post("/apply-jobs", {
      data: {
        JobId: String(jobId),
        jobs: jobId,
        users_permissions_users: userId,
        applicationDate: new Date().toISOString(),
        Status: "pending",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error applying for job:",
      error.response?.data || error.message
    );
    throw new Error(
      "Failed to apply for the job: " + error.response?.data?.message ||
        error.message
    );
  }
};

//api for job seeker to vview theier applied
export const fetchAppliedJobs = async (userId) => {
  try {
    const response = await axiosClient.get(
      `/apply-jobs?populate=jobs&filters[users_permissions_users][id][$eq]=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    throw error;
  }
};

{
  /*
 export const fetchAppliedJobs = async (userId) => {
  try {
    const response = await axiosClient.get(
      `/apply-jobs?filters[users_permissions_users][id][$eq]=${userId}&populate[jobs][populate]=*`
    );
    console.log("API Response:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error in API call:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}; 
  
  
  */
}
