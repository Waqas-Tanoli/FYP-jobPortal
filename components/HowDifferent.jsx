import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const HowDifferent = () => {
  return (
    <div className="max-w-screen-lg mx-auto flex flex-col items-center p-4 mt-10 space-y-8">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-wider text-center">
        How Job Portal is <span className="text-[#8E3CCB]">Different</span>
      </h1>

      {/* Content Section */}
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8 bg-white p-6 md:p-8 rounded-lg shadow-md w-full">
        {/* Features Section */}
        <div className="flex flex-col space-y-6 md:w-2/3">
          {/* Card */}
          <div className="flex flex-col space-y-6 p-6 bg-white rounded-lg shadow-lg h-auto w-full md:max-w-md">
            <div className="flex flex-col space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start text-lg">
                <FaCheckCircle className="text-green-500 mr-3 text-3xl" />
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-2">
                    Higher Quality Listings
                  </h2>
                  <p className="text-gray-600">
                    Only legit jobs. No ads, scams, or junk to sift through. Our
                    team spends 200+ hours/day verifying every job.
                  </p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="flex items-start text-lg">
                <FaCheckCircle className="text-green-500 mr-3 text-3xl" />
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-2">
                    Unlimited Job Search Resource
                  </h2>
                  <p className="text-gray-600">
                    Full access to all features including unlimited jobs,
                    articles, skills tests, and webinars to help you with your
                    remote job search.
                  </p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="flex items-start text-lg">
                <FaCheckCircle className="text-green-500 mr-3 text-3xl" />
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-2">
                    Save Time
                  </h2>
                  <p className="text-gray-600">
                    Go straight from job listings to applications. No more
                    hopping from one job board to the next.
                  </p>
                </div>
              </div>
            </div>
            {/* Button */}
            <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white transition-all ease-in-out text-white py-2 px-12 rounded text-lg tracking-wider self-center mt-5">
              Get Started
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:w-1/3 w-full">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/how-different.png"
              layout="fill"
              objectFit="contain"
              alt="Illustration showing different features"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowDifferent;
