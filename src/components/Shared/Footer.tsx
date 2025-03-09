import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white font-Playfair">
      <footer className="text-white body-font">
        <div className="container px-5 py-12 mx-auto flex flex-col md:flex-row md:items-start">
          {/* Brand Section */}
          <div className="w-full md:w-1/3 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              to="/"
              className="flex title-font font-medium items-center justify-center md:justify-start text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="ml-3 text-xl text-white">Forbes</span>
            </Link>
            <p className="mt-2 text-sm text-white">
              Air plant banjo lyft occupy retro adaptogen indego
            </p>
          </div>

          {/* Categories Section */}
          <div className="flex-grow flex flex-wrap md:pl-20 mt-10 md:mt-0 text-center md:text-left">
            {/* Column 1 */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                Site Policies
              </h2>
              <nav className="list-none space-y-2">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-white hover:text-gray-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="text-white hover:text-gray-400"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </nav>
            </div>

            {/* Column 2 */}
            <div className="w-full md:w-1/4 px-4 mt-6 md:mt-0">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                Get Connected
              </h2>
              <nav className="list-none space-y-2">
                <li>
                  <Link
                    to="/contact"
                    className="text-white hover:text-gray-400"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white hover:text-gray-400">
                    About Us
                  </Link>
                </li>
              </nav>
            </div>
          </div>
        </div>
      </footer>
      <section className="bg-blue-200 text-black">
        <h1 className="text-center ">
          Copyright &copy; Aidasx. All Rights Reserved.
        </h1>
      </section>
    </div>
  );
};

export default Footer;
