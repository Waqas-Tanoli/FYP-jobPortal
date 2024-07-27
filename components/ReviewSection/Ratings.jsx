const Ratings = () => {
  return (
    <div className="flex justify-center mt-8">
      <div className="flex flex-col items-center text-center w-full max-w-lg">
        <h1 className="text-4xl font-semibold mb-4 whitespace-nowrap tracking-widest">
          What Our Members Are Saying
        </h1>
        <div className="flex border border-[#022abb] rounded-lg w-full mt-4 overflow-hidden">
          {/* Left Segment */}
          <div className="flex flex-col items-center justify-center w-1/3 bg-[#022abb] text-white p-4">
            <div className="text-center">
              <span className="text-3xl font-bold">4.6</span>
              <span className="text-sm block">out of 5</span>
            </div>
          </div>
          {/* Right Segment */}
          <div className="flex flex-col justify-center items-start w-2/3 p-4 text-[#010824] font-semibold bg-white">
            <div className="max-w-xs">
              <h2 className="text-lg font-medium mb-2">10,000+ Reviews</h2>
              <h2 className="text-sm">5 Stars Demo</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ratings;
