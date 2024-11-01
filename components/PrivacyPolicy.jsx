"use client";

import { FaShieldAlt, FaLock, FaRegEnvelope } from "react-icons/fa";

const PrivacyPolicy = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 text-gray-800 shadow-lg rounded-lg bg-white overflow-hidden">
        <h1 className="text-4xl font-bold text-center text-teal-800 mb-8 mt-8">
          Privacy Policy
        </h1>
        <p className="text-lg text-center mb-8 text-gray-700">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use our services.
        </p>

        <div className="space-y-8">
          <div className="flex items-start border-l-4 border-teal-600 pl-4 mb-4 hover:shadow-lg transition-shadow duration-300 rounded-md">
            <FaShieldAlt className="text-teal-600 text-2xl mr-2 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                1. Information We Collect
              </h2>
              <p className="mb-4 text-gray-700">
                We collect information you provide directly to us when you
                create an account, apply for jobs, or contact us. This may
                include your name, email address, phone number, and any other
                details you choose to share.
              </p>
            </div>
          </div>

          <div className="flex items-start border-l-4 border-teal-600 pl-4 mb-4 hover:shadow-lg transition-shadow duration-300 rounded-md">
            <FaLock className="text-teal-600 text-2xl mr-2 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                2. How We Use Your Information
              </h2>
              <p className="mb-4 text-gray-700">
                We use your information to provide and improve our services, to
                communicate with you, and to personalize your experience. Your
                information helps us enhance our offerings and ensure a seamless
                experience.
              </p>
            </div>
          </div>

          <div className="flex items-start border-l-4 border-teal-600 pl-4 mb-4 hover:shadow-lg transition-shadow duration-300 rounded-md">
            <FaShieldAlt className="text-teal-600 text-2xl mr-2 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                3. Data Security
              </h2>
              <p className="mb-4 text-gray-700">
                We take appropriate security measures to protect your
                information from unauthorized access, alteration, disclosure, or
                destruction. Your data is stored securely, and we use encryption
                where appropriate.
              </p>
            </div>
          </div>

          <div className="flex items-start border-l-4 border-teal-600 pl-4 mb-4 hover:shadow-lg transition-shadow duration-300 rounded-md">
            <FaLock className="text-teal-600 text-2xl mr-2 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                4. Sharing Your Information
              </h2>
              <p className="mb-4 text-gray-700">
                We do not sell or rent your personal information to third
                parties. We may share your information with trusted partners who
                assist us in operating our services, provided they agree to keep
                your information confidential.
              </p>
            </div>
          </div>

          <div className="flex items-start border-l-4 border-teal-600 pl-4 mb-4 hover:shadow-lg transition-shadow duration-300 rounded-md">
            <FaRegEnvelope className="text-teal-600 text-2xl mr-2 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                5. Your Rights
              </h2>
              <p className="mb-4 text-gray-700">
                You have the right to access, update, or delete your personal
                information. If you have any questions or concerns about your
                information, please contact us at{" "}
                <a
                  href="mailto:support@jobportal.com"
                  className="text-teal-600 hover:underline"
                >
                  support@jobportal.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            Thank you for trusting us with your information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
