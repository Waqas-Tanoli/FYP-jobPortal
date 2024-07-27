const Header = () => {
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Find Jobs",
      path: "/",
    },
    {
      id: 3,
      name: "Career Advice",
      path: "/",
    },
    {
      id: 4,
      name: "How job portal works",
      path: "/",
    },
  ];

  return (
    <div className="flex items-center justify-between mt-2 pl-5 shadow-current">
      <div className="flex items-center gap-10">
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <li
              key={index}
              className="font-semibold hover:text-[040c1b] cursor-pointer hover:scale-105 transition-all ease-in-out"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side three buttons */}
      <div className="flex gap-9 mr-5">
        <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-2 px-3 border border-gray-400 rounded shadow ">
          For Employers
        </button>
        <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Log in
        </button>
        <button className="bg-[#040c1b] hover:bg-[#8E3CCB] hover:text-white hover:scale-105 transition-all ease-in-out text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Sign up
        </button>
      </div>
    </div>
  );
};
export default Header;
