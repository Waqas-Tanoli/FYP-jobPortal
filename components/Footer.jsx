import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#040c1b] text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Job Portal</h3>
            <p className="text-sm w-[20vw]">
              Helping you find a better way to work. Join millions of job
              seekers and get started today!
            </p>
          </div>

          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-gray-400" aria-label="Facebook">
                <FaFacebookF size={16} />
              </a>
              <a href="#" className="hover:text-gray-400" aria-label="Twitter">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="hover:text-gray-400" aria-label="LinkedIn">
                <FaLinkedinIn size={16} />
              </a>
              <a
                href="#"
                className="hover:text-gray-400"
                aria-label="Instagram"
              >
                <FaInstagram size={16} />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/4">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">POF Havelian Cantt,</p>
            <p className="text-sm">Abbottabad, Pakistan</p>
            <p className="text-sm">Email: support@jobportal.com</p>
            <p className="text-sm">Phone: +92300000000</p>
          </div>
        </div>

        <div className="text-center mt-4 border-t border-gray-700 pt-4">
          <p className="text-sm">© 2024 Job Portal. All rights reserved.</p>
          <p className="text-sm mt-1">Developed by Waqas Ahmed | BC210200939</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
