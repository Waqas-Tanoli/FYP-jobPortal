import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const HowDifferent = () => {
  return (
    <div className="max-w-screen-lg mx-auto flex flex-col items-center p-4 mt-10 ">
      <h1 className="text-4xl font-bold mb-8 tracking-wider">
        How Job Portal is <span className="text-[#8E3CCB]">Different</span>
      </h1>
      <div className="card flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 w-full md:w-[80rem] bg-white p-6 md:p-8">
        <div className="flex flex-col space-y-6 md:w-2/3">
          <div className="flex flex-col space-y-6 p-6 rounded-lg shadow-lg bg-white h-[560px] w-[450px] flex-grow">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col space-y-6">
                <div className="flex items-start text-lg">
                  <FaCheckCircle className="text-green-500 mr-3 mt-1 text-2xl" />
                  <div>
                    <h1 className="text-2xl font-semibold mb-3">
                      Higher Quality Listings
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Only legit jobs. No ads, scams, or junk to sift through.
                      Our team spends 200+ hours/day verifying every job.
                    </p>
                  </div>
                </div>
                <div className="flex items-start text-lg">
                  <FaCheckCircle className="text-green-500 mr-3 mt-1 text-2xl" />
                  <div>
                    <h1 className="text-2xl font-semibold mb-3">
                      Unlimited Job Search Resource
                    </h1>
                    <p className="text-gray-600 text-lg">
                      Full access to all features including unlimited jobs,
                      articles, skills tests, and webinars to help you with your
                      remote job search.
                    </p>
                  </div>
                </div>
                <div className="flex items-start text-lg">
                  <FaCheckCircle className="text-green-500 mr-3 mt-1 text-2xl" />
                  <div>
                    <h1 className="text-2xl font-semibold mb-3">Save Time</h1>
                    <p className="text-gray-600 text-lg">
                      Go straight from job listings to applications. No more
                      hopping from one job board to the next.
                    </p>
                  </div>
                </div>
              </div>
              <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white py-2 px-20 rounded  self-center text-xl tracking-wider">
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:w-1/3">
          <div className="relative w-full h-[600px]">
            {" "}
            {/* Container for the image */}
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
