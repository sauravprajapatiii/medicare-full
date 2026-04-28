import React, { useRef, useState, useEffect } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useClerk, SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";
import logo from "../assets/logo.png";
import { Key, Menu, User, X } from "lucide-react";

const STORAGE_KEY = "doctorToken_v1";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem(STORAGE_KEY));
  });
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const clerk = useClerk();
  const navRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setIsDoctorLoggedIn(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Doctors", href: "/doctors" },
    { label: "Services", href: "/services" },
    { label: "Appointments", href: "/appointments" },
    { label: "Contact", href: "/contact" },
  ];

  const handleDoctorLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsDoctorLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <div className={navbarStyles.navbarBorder}></div>
      <nav
        ref={navRef}
        className={`${navbarStyles.navbarContainer} ${showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden}`}
      >
        <div className={navbarStyles.contentWrapper}>
          <div className={navbarStyles.flexContainer}>
            <Link to="/" className={navbarStyles.logoLink}>
              <div className={navbarStyles.logoContainer}>
                <div className={navbarStyles.logoImageWrapper}>
                  <img
                    src={logo}
                    alt="logo"
                    className={navbarStyles.logoImage}
                  />
                </div>
                <div className={navbarStyles.logoTextContainer}>
                  <h1 className={navbarStyles.logoTitle}>MediCare</h1>
                  <p className={navbarStyles.logoSubtitle}>
                    Healthcare Solutions
                  </p>
                </div>
              </div>
            </Link>

            <div className={navbarStyles.desktopNav}>
              <div className={navbarStyles.navItemsContainer}>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`${navbarStyles.navItem} ${isActive ? navbarStyles.navItemActive : navbarStyles.navItemInactive}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className={navbarStyles.rightContainer}>
              <SignedOut>
                <Link to="/admin" className={navbarStyles.doctorAdminButton}>
                  <User className={navbarStyles.doctorAdminIcon} />
                  <span className={navbarStyles.doctorAdminText}>Admin</span>
                </Link>

                <Link
                  to="/doctor-admin/login"
                  className={navbarStyles.doctorAdminButton}
                >
                  <User className={navbarStyles.doctorAdminIcon} />
                  <span className={navbarStyles.doctorAdminText}>
                    Doctor Admin
                  </span>
                </Link>

                <button
                  onClick={() => clerk.openSignIn()}
                  className={navbarStyles.loginButton}
                >
                  <Key className={navbarStyles.loginIcon} />
                  Login
                </button>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={navbarStyles.mobileToggle}
              >
                {isOpen ? (
                  <X className={navbarStyles.toggleIcon} />
                ) : (
                  <Menu className={navbarStyles.toggleIcon} />
                )}
              </button>
            </div>
            {isOpen && (
              <div className={navbarStyles.mobileMenu}>
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={index}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`${navbarStyles.mobileMenuItem} ${isActive ? navbarStyles.mobileMenuItemActive : navbarStyles.mobileMenuItemInactive}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <SignedOut>
                  <div className="mt-4 p-3 rounded-2xl bg-gray-50 border border-emerald-100 space-y-2">
                    <p className="text-xs text-gray-500 px-1">Admin Access</p>

                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition"
                    >
                      🛠️ Admin Panel
                    </Link>

                    <Link
                      to="/doctor-admin/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition"
                    >
                      👨‍⚕️ Doctor Panel
                    </Link>
                  </div>
                  <div className={navbarStyles.mobileLoginContainer}>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        clerk.openSignIn();
                      }}
                      className={navbarStyles.mobileLoginButton}
                    >
                      Login
                    </button>
                  </div>
                </SignedOut>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
