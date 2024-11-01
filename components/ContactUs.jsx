"use client";

import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-indigo-100 to-indigo-200">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-lg text-gray-600 mb-12">
          We're here to help! Reach out to us with any questions or feedback.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Address
            </h3>
            <div className="flex items-center mb-4">
              <MdLocationOn className="w-8 h-8 text-blue-600 mr-2" />
              <div>
                <p className="text-gray-600">POF Havelian Cantt,</p>
                <p className="text-gray-600">Abbottabad, Pakistan</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Details
            </h3>
            <div className="flex items-center mb-4">
              <MdEmail className="w-8 h-8 text-blue-600 mr-2" />
              <p className="text-gray-600">
                Email:{" "}
                <a
                  href="mailto:support@jobportal.com"
                  className="text-blue-600 hover:underline"
                >
                  support@jobportal.com
                </a>
              </p>
            </div>
            <div className="flex items-center">
              <MdPhone className="w-8 h-8 text-blue-600 mr-2" />
              <p className="text-gray-600">
                Phone:{" "}
                <a
                  href="tel:+92300000000"
                  className="text-blue-600 hover:underline"
                >
                  +92 300 0000000
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
