import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black text-white font-Playfair">
      <footer className="text-white body-font">
        <div className="container px-5 py-12 mx-auto flex flex-col md:flex-row md:items-start">
          {/* Brand Section */}
          <div className=" w-full md:w-1/3 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left px-5">
            <Link
              to="/"
              className="flex title-font font-medium items-center justify-center md:justify-start text-gray-900"
            >
              <span className=" text-5xl text-white lowercase ">Aidasx</span>
            </Link>
            <p className="mt-2 text-sm text-white">One step ahead, always.</p>
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
      <section className="bg-gray-900 text-white">
        <h1 className="text-center text-sm">
          Copyright &copy; Aidasx. All Rights Reserved.
        </h1>
      </section>
    </div>
  );
};

export default Footer;
