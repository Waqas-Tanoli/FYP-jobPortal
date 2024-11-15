import Image from "next/image";

const Ratings = () => {
  return (
    <div className="flex justify-center mt-8 px-4">
      <div className="flex flex-col items-center text-center w-full max-w-lg">
        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-semibold lg:whitespace-nowrap mb-6 tracking-widest">
          What Our Members Are Saying
        </h1>

        {/* Ratings Card */}
        <div className="flex flex-col sm:flex-row border border-[#022abb] rounded-lg w-full overflow-hidden">
          {/* Left Segment */}
          <div className="flex flex-col items-center justify-center w-full sm:w-1/3 bg-[#022abb] text-white p-6">
            <div className="text-center">
              <span className="text-4xl font-bold">4.6</span>
              <span className="text-sm block mt-1">out of 5</span>
            </div>
          </div>

          {/* Right Segment */}
          <div className="flex flex-col justify-center items-start w-full sm:w-2/3 p-6 text-[#010824] font-semibold bg-white">
            <div className="max-w-full">
              <h2 className="text-lg md:text-xl font-medium mb-2">
                10,000+ Reviews
              </h2>
              <Image
                height={50}
                width={120}
                src="/rate.svg"
                alt="Ratings Graphic"
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
