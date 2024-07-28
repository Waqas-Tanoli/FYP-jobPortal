import Image from "next/image";

const SeekersUsed = () => {
  return (
    <div className="flex flex-col items-center bg-[#8E3CCB] py-8">
      <div className="text-center">
        <Image
          src="/stars.svg"
          width={49}
          height={40}
          alt="stars"
          className="mx-auto"
        />
        <p className="text-white text-4xl  mt-4 font-semibold leading-normal">
          Over 10 Million Job Seekers Have Used <br />
          Job Portal to Find a Better Way to Work
        </p>

        <button className="bg-[#040c1b] hover:bg-[#1c022e] hover:border hover:border-black hover:text-white hover:scale-105 transition-all ease-in-out text-white py-3 px-24 rounded text-2xl tracking-wider mt-9">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default SeekersUsed;
