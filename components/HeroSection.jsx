import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex justify-between pl-40 pr-40 mt-20 tracking-widest">
      <div className="">
        <h1 className="font-bold leading-snug text-5xl text-[#040c1b]">
          The <span className="text-6xl text-[#8E3CCB]">#1 Job Site</span> to
          Find
          <br /> Jobs-No Ads, Scams, <br /> or Junk
        </h1>
        <p className="text-xl mt-4 font-normal">
          Find your next flexible, hybrid, or work from home job.
        </p>
        <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-3 px-[8rem] border border-gray-400 rounded shadow mt-10 text-2xl">
          Find Your Next Job!
        </button>
      </div>
      <Image src="/hero.png" height={500} width={500} alt="Image" priority />
    </div>
  );
};
export default HeroSection;
