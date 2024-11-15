import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#8E3CCB] to-[#040c1b] text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section */}
          <div className="bg-[#1c022e] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-4 transition-all ease-in-out duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#8E3CCB] transition-all ease-in-out duration-300">
              Job Portal
            </h3>
            <p className="text-sm leading-relaxed text-gray-300 transition-all ease-in-out duration-300">
              Helping you find a better way to work. Join millions of job
              seekers and start your journey with us today!
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-[#1c022e] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-4 transition-all ease-in-out duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#8E3CCB] transition-all ease-in-out duration-300">
              Quick Links
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="hover:underline hover:text-[#8E3CCB] transition-all ease-in-out duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:underline hover:text-[#8E3CCB] transition-all ease-in-out duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:underline hover:text-[#8E3CCB] transition-all ease-in-out duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:underline hover:text-[#8E3CCB] transition-all ease-in-out duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:underline hover:text-[#8E3CCB] transition-all ease-in-out duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="bg-[#1c022e] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-4 transition-all ease-in-out duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#8E3CCB] transition-all ease-in-out duration-300">
              Follow Us
            </h3>
            <div className="flex space-x-5">
              <a
                href="#"
                className="text-lg hover:text-[#8E3CCB] transition-all ease-in-out duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="#"
                className="text-lg hover:text-[#8E3CCB] transition-all ease-in-out duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-lg hover:text-[#8E3CCB] transition-all ease-in-out duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a
                href="#"
                className="text-lg hover:text-[#8E3CCB] transition-all ease-in-out duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-[#1c022e] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:translate-y-4 transition-all ease-in-out duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-[#8E3CCB] transition-all ease-in-out duration-300">
              Contact Us
            </h3>
            <p className="text-sm text-gray-300 transition-all ease-in-out duration-300">
              POF Havelian Cantt,
            </p>
            <p className="text-sm text-gray-300 transition-all ease-in-out duration-300">
              Abbottabad, Pakistan
            </p>
            <p className="text-sm text-gray-300 transition-all ease-in-out duration-300">
              Email: support@jobportal.com
            </p>
            <p className="text-sm text-gray-300 transition-all ease-in-out duration-300">
              Phone: +92300000000
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8 border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-300 transition-all ease-in-out duration-300">
            © 2024 Job Portal. All rights reserved.
          </p>
          <p className="text-sm text-gray-300 mt-2 transition-all ease-in-out duration-300">
            Developed by Waqas Ahmed | BC210200939
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
