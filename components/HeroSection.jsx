import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:pl-40 md:pr-40 p-4 mt-10 tracking-widest">
      {/* Text Section */}
      <div className="text-center md:text-left">
        <h1 className="font-bold leading-snug text-4xl sm:text-5xl md:text-6xl text-[#040c1b]">
          The <span className="text-[#8E3CCB]">#1 Job Site</span> to Find
          <br className="hidden md:block" /> Jobs-No Ads, Scams,{" "}
          <br className="hidden md:block" /> or Junk
        </h1>
        <p className="text-lg sm:text-xl mt-4 font-normal">
          Find your next flexible, hybrid, or work from home job.
        </p>
        <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-3 px-8 md:px-[8rem] border border-gray-400 rounded shadow mt-6 md:mt-10 text-lg sm:text-2xl">
          Find Your Next Job!
        </button>
      </div>

      {/* Image Section */}
      <div className="mt-6 md:mt-0">
        <Image
          src="/hero.png"
          height={500}
          width={500}
          alt="Hero Image"
          priority
          className="w-full max-w-xs sm:max-w-md md:max-w-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
