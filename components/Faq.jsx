"use client";

import { useState } from "react";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on the 'Sign Up' button on the homepage and filling in your details.",
    },
    {
      question: "What if I forget my password?",
      answer:
        "If you forget your password, click on 'Forgot Password' on the login page to reset it.",
    },
    {
      question: "How can I update my profile?",
      answer:
        "You can update your profile by going to the 'My Profile' section after logging in.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we prioritize your privacy and use advanced encryption to protect your information.",
    },
    {
      question: "Can I apply for multiple jobs?",
      answer: "Yes, you can apply for as many jobs as you like!",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg transition-all duration-200 ease-in-out"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <MdExpandLess className="w-6 h-6 text-blue-600" />
                ) : (
                  <MdExpandMore className="w-6 h-6 text-blue-600" />
                )}
              </button>
              {openIndex === index && (
                <p className="p-4 text-gray-600 border-t">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
