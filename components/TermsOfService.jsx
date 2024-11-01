"use client";

import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaRegEnvelope,
} from "react-icons/fa";

const TermsOfService = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-indigo-200 to-blue-300">
      <div className="max-w-6xl mx-auto px-6 text-gray-800 shadow-lg rounded-lg bg-white overflow-hidden">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8 mt-8">
          Terms of Service
        </h1>
        <p className="text-lg text-center mb-8 text-gray-700">
          Welcome to our platform! These Terms of Service outline the rules and
          regulations for using our services. By accessing or using our
          services, you agree to comply with these terms.
        </p>

        <div className="space-y-8">
          <div className="flex items-start border-l-4 border-blue-600 pl-4 mb-4 hover:shadow-lg transition-shadow duration-300">
            <FaCheckCircle className="text-blue-600 text-2xl mr-2 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4 text-gray-700">
                By using our services, you agree to these Terms and our Privacy
                Policy. If you do not agree, please do not use our services.
              </p>
            </div>
          </div>

          <div className="flex items-start border-l-4 border-blue-600 pl-4 mb-4 hover:shadow-lg transition-shadow duration-300">
            <FaExclamationTriangle className="text-blue-600 text-2xl mr-2 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                2. Changes to Terms
              </h2>
              <p className="mb-4 text-gray-700">
                We reserve the right to modify these Terms at any time. Any
                changes will be effective immediately upon posting on our
                website. We encourage you to review these Terms periodically.
              </p>
            </div>
          </div>

          <div className="flex items-start border-l-4 border-blue-600 pl-4 mb-4 hover:shadow-lg transition-shadow duration-300">
            <FaCheckCircle className="text-blue-600 text-2xl mr-2 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                3. User Responsibilities
              </h2>
              <p className="mb-4 text-gray-700">
                Users are responsible for maintaining the confidentiality of
                their account information and for all activities that occur
                under their account. You agree to notify us immediately of any
                unauthorized use of your account.
              </p>
            </div>
          </div>

          <div className="flex items-start border-l-4 border-blue-600 pl-4 mb-4 hover:shadow-lg transition-shadow duration-300">
            <FaExclamationTriangle className="text-blue-600 text-2xl mr-2 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                4. Limitation of Liability
              </h2>
              <p className="mb-4 text-gray-700">
                In no event shall our company be liable for any indirect,
                incidental, special, consequential, or punitive damages arising
                from your use of our services.
              </p>
            </div>
          </div>

          <div className="flex items-start border-l-4 border-blue-600 pl-4 mb-4 hover:shadow-lg transition-shadow duration-300">
            <FaCheckCircle className="text-blue-600 text-2xl mr-2 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                5. Governing Law
              </h2>
              <p className="mb-4 text-gray-700">
                These Terms shall be governed by and construed in accordance
                with the laws of the jurisdiction in which our company is
                located.
              </p>
            </div>
          </div>

          <div className="flex items-start border-l-4 border-blue-600 pl-4 mb-4 hover:shadow-lg transition-shadow duration-300">
            <FaRegEnvelope className="text-blue-600 text-2xl mr-2 mt-1" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                6. Contact Us
              </h2>
              <p className="mb-4 text-gray-700">
                If you have any questions about these Terms, please contact us
                at{" "}
                <a
                  href="mailto:support@jobportal.com"
                  className="text-blue-600 hover:underline"
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
            Thank you for using our services!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
