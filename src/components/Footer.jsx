import React from "react";
import { footerStyles as fs } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import { FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import {
  Stethoscope,
  ActivityIcon,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";
const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Appointments", href: "/appointments" },
  ];

  const services = [
    { name: "Blood Pressure Check", href: "/services" },
    { name: "Blood Sugar Test", href: "/services" },
    { name: "Full Blood Count", href: "/services" },
    { name: "X-Ray Scan", href: "/services" },
    { name: "Blood Sugar Test", href: "/services" },
  ];

  const socialLinks = [
    {
      Icon: FaFacebookF,
      color: fs.facebookColor,
      name: "Facebook",
      href: "https://www.facebook.com/people/Hexagon-Digital-Services/61567156598660/",
    },
    {
      Icon: CiTwitter,
      color: fs.twitterColor,
      name: "Twitter",
      href: "https://www.linkedin.com/company/hexagondigtial-services/",
    },
    {
      Icon: FaInstagram,
      color: fs.instagramColor,
      name: "Instagram",
      href: "http://instagram.com/hexagondigitalservices?igsh=MWp2NG1oNTlibWVnZA%3D%3D",
    },
    {
      Icon: FaLinkedin,
      color: fs.linkedinColor,
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/hexagondigtial-services/",
    },
    {
      Icon: FaYoutube,
      color: fs.youtubeColor,
      name: "YouTube",
      href: "https://youtube.com/@hexagondigitalservices?si=lxEFYNCP42t6AoDJ",
    },
  ];

  return (
    <footer className={fs.footerContainer}>
      <div className={fs.floatingIcon1}>
        <Stethoscope className={fs.stethoscopeIcon} />
      </div>
      <div className={fs.floatingIcon2} style={{ animationDelay: "3s" }}>
        <ActivityIcon className={fs.activityIcon} />
      </div>
      <div className={fs.mainContent}>
        <div className={fs.gridContainer}>
          <div className={fs.companySection}>
            <div className={fs.logoContainer}>
              <div className={fs.logoWrapper}>
                <div className={fs.logoImageContainer}>
                  <img src={logo} alt="logo" className={fs.logoImage} />
                </div>
              </div>
              <div>
                <h2 className={fs.companyName}>MediCare</h2>
                <p className={fs.companyTagline}>Healthcare Solutions</p>
              </div>
            </div>
            <p className={fs.companyDescription}>
              Your trusted partener in healthcare innovation . We're commited to
              providing exceptional medical care with cutting-edge technology
              and compassionate service.
            </p>
            <div className={fs.contactContainer}>
              <div className={fs.contactItem}>
                <div className={fs.contactIconWrapper}>
                  <Phone className={fs.contactIcon} />
                </div>
                <span className={fs.contactText}>+91 9313841609</span>
              </div>
              <div className={fs.contactItem}>
                <div className={fs.contactIconWrapper}>
                  <Mail className={fs.contactIcon} />
                </div>
                <span className={fs.contactText}>medicare@info.com</span>
              </div>
              <div className={fs.contactItem}>
                <div className={fs.contactIconWrapper}>
                  <MapPin className={fs.contactIcon} />
                </div>
                <span className={fs.contactText}>Gujarat, India</span>
              </div>
            </div>
          </div>
          {/* link */}
          <div className={fs.linksSection}>
            <h3 className={fs.sectionTitle}>Quick Links</h3>
            <ul className={fs.linksList}>
              {quickLinks.map((link, index) => (
                <li className={fs.linkItem} key={link.name}>
                  <a
                    href={link.href}
                    className={fs.quickLink}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className={fs.quickLinkIconWrapper}>
                      <ArrowRight className={fs.quickLinkIcon} />
                    </div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={fs.linksSection}>
            <h3 className={fs.sectionTitle}>Our Services</h3>
            <ul className={fs.linksList}>
              {services.map((service, index) => (
                <li key={service.name}>
                  <a href={service.href} className={fs.serviceLink}>
                    <div className={fs.serviceIcon}></div>
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Newsletter & Social */}
          <div className={fs.newsletterSection}>
            <h3 className={fs.newsletterTitle}>Stay Connected</h3>
            <p className={fs.newsletterDescription}>
              Subscribe for health tips, medical updates, and wellness insights
              delivered to your inbox.
            </p>

            {/* Newsletter form */}
            <div className={fs.newsletterForm}>
              <div className={fs.mobileNewsletterContainer}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={fs.emailInput}
                />
                <button className={fs.mobileSubscribeButton}>
                  <Send className={fs.mobileButtonIcon} />
                  Subscribe
                </button>
              </div>

              {/* Desktop newsletter */}
              <div className={fs.desktopNewsletterContainer}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={fs.desktopEmailInput}
                />
                <button className={fs.desktopSubscribeButton}>
                  <Send className={fs.desktopButtonIcon} />
                  <span className={fs.desktopButtonText}>Subscribe</span>
                </button>
              </div>

              {/* Social icons */}
              <div className={fs.socialContainer}>
                {socialLinks.map(({ Icon, color, name, href }, index) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={fs.socialLink}
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div className={fs.socialIconBackground} />
                    <Icon className={`${fs.socialIcon} ${color}`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={fs.bottomSection}>
          <div className={fs.copyright}>
            <span>&copy; 2026 MediCare Healthcare.</span>
          </div>
          <div className={fs.designerText}>
            <span>Designed by</span>
            <a href="//" target="_blank" className={fs.designerLink}>
              desinger
            </a>
          </div>
        </div>
      </div>
      <style>{fs.animationStyles}</style>
    </footer>
  );
};

export default Footer;
