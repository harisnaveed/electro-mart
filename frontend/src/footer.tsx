import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import MapComponent from "./components/MapComponent";
import SocialIcons from "./components/SocialIcons";

export default function Footer() {
  const navItems = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/shop", label: "Shop" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-gray-100/70 backdrop-blur-lg border-t border-white/30  shadow-lg mt-auto dark:bg-gray-900 dark:border-gray-700/30">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <h2 className="text-xl font-bold text-secondary dark:text-white">
              Electro Mart
            </h2>
            <p className="mt-3 text-sm text-gray-600 dark:text-white">
              Electro Mart is your trusted destination for high-quality
              electronics, accessories, and gadgets. We provide reliable
              products at competitive prices with excellent customer service to
              meet all your tech needs.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-secondary dark:text-white">
              Navigation
            </h3>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="group flex items-center gap-2 text-gray-600 hover:text-primary transition dark:text-white"
                >
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-xs group-hover:animate-[arrow-bounce_0.4s_ease-in-out_2] group-hover:text-primary"
                  />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-secondary dark:text-white">
              Information
            </h3>
            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-2 dark:text-white">
                <FontAwesomeIcon icon={faPhone} className="text-primary" />
                <a
                  href="tel:+923121592007"
                  className="hover:text-primary transition"
                >
                  +92-312-1592007
                </a>
              </p>

              <p className="flex items-center gap-2 dark:text-white">
                <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
                <a
                  href="mailto:haris.workspace5@gmail.com"
                  className="hover:text-primary transition"
                >
                  haris.workspace5@gmail.com
                </a>
              </p>

              <p className="flex items-center gap-2 dark:text-white">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-primary"
                />
                <a
                  href="https://www.google.com/maps?q=890, Green Lane, Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition"
                >
                  890, Green Lane, Pakistan
                </a>
              </p>
            </div>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-secondary dark:text-white">
              Location
            </h3>
            <div className="mt-3">
              <MapComponent />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t dark:border-gray-700 pt-6 flex flex-col items-center gap-4">
          <p className="text-sm text-gray-600 text-center dark:text-gray-400">
            © {new Date().getFullYear()}
            <span className="ml-1 font-medium text-primary">Electro Mart</span>.
            All rights reserved. | Developed by{" "}
            <span className="font-medium text-gray-900 dark:text-white">
              Haris Naveed
            </span>
          </p>

          {/* Social Icons */}
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
}
