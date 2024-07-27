import React from "react";

const PreHeader = () => {
  return (
    <div className="flex flex-col md:flex-row items-center p-4 border-b shadow-md border-gray-300">
      {/* Title Section */}
      <div className="w-full md:w-auto mb-4 md:mb-0 md:mr-8 text-center md:text-left">
        <h1 className="font-bold text-2xl md:text-3xl">
          Job <span className="text-[#8E3CCB]">Portal</span>
        </h1>
      </div>

      {/* Tagline Section */}
      <div className="w-full md:w-auto mb-4 md:mb-0 text-sm text-[#334892] font-semibold text-center md:text-left md:ml-4 mr-24">
        FIND A BETTER WAY TO WORK
      </div>

      {/* Search and Button Section */}
      <div className="w-full md:w-auto flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 ">
        <div className="flex flex-col md:flex-row border border-gray-300 rounded-lg overflow-hidden w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search by job title, keyword, etc.."
            className="p-2 outline-none flex-grow border-b md:border-b-0 md:border-r border-gray-300 w-[18rem]"
          />
          <input
            type="text"
            placeholder="Search by location"
            className="p-2 outline-none flex-grow border-b md:border-b-0 md:border-r border-gray-300"
          />
          <button className="flex items-center justify-center p-2 text-black hover:bg-gray-300  hover:scale-105 transition-all ease-in-out md:w-12">
            <i className="fas fa-search text-sm md:text-base"></i>
          </button>
        </div>
        <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-4 md:mt-0">
          Advanced
        </button>
      </div>
    </div>
  );
};

export default PreHeader;
