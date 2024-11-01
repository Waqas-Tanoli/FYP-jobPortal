"use client";

import Image from "next/image";

const AboutUs = () => {
  const teamMember = {
    name: "Waqas Ahmed",
    role: "CEO",
    image: "/profile.png", // Ensure this path is correct
    description:
      "Waqas Ahmed is a visionary leader with a passion for technology and innovation. She has over 10 years of experience in the industry and leads our team with enthusiasm.",
  };

  return (
    <div className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">About Us</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          We are dedicated to helping you find the right job and build a
          successful career. Our team is committed to innovation, excellence,
          and customer satisfaction.
        </p>
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Our Mission
        </h3>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Our mission is to connect job seekers with the best opportunities
          while providing employers with the tools they need to find top talent.
        </p>

        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          Meet Our Team
        </h3>
        <div className="flex justify-center mb-12">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 max-w-xs hover:shadow-xl">
            <Image
              height={200}
              width={200}
              src={teamMember.image}
              alt={teamMember.name}
              className="w-full h-52 object-cover rounded-t-lg transition-transform duration-200 hover:scale-110"
            />
            <div className="p-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {teamMember.name}
              </h4>
              <p className="text-gray-600 mb-2">{teamMember.role}</p>
              <p className="text-gray-500">{teamMember.description}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto mt-8">
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">
            Join Us Today!
          </h4>
          <p className="text-gray-600 mb-4">
            We are always looking for talented individuals to join our team. If
            you’re passionate about making a difference and helping others, we’d
            love to hear from you!
          </p>
          <a
            href="/careers"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
          >
            Explore Careers
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
