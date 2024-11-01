"use client";

const HowItWorks = () => {
  const steps = [
    {
      title: "Create an Account",
      description:
        "Start by signing up with your email and creating a password. You can also register using your social media accounts for convenience.",
      icon: "🔑",
    },
    {
      title: "Complete Your Profile",
      description:
        "Fill in your profile with relevant information, including your name, address, skills, and a profile picture. A complete profile helps you stand out.",
      icon: "📝",
    },
    {
      title: "Explore Job Listings",
      description:
        "Browse through a wide range of job listings tailored to your skills and interests. Use filters to narrow down your search for the perfect job.",
      icon: "🔍",
    },
    {
      title: "Apply for Jobs",
      description:
        "Once you find a job that interests you, click 'Apply'. You may need to submit your CV and a cover letter to strengthen your application.",
      icon: "✉️",
    },
    {
      title: "Interview Preparation",
      description:
        "If your application is successful, prepare for interviews by reviewing common questions and practicing your responses.",
      icon: "🤝",
    },
    {
      title: "Get Hired!",
      description:
        "After the interview process, celebrate your success when you receive a job offer! Your new journey begins here.",
      icon: "🎉",
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
        <p className="text-lg text-gray-600 mb-12">
          Follow these simple steps to kickstart your job search journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
