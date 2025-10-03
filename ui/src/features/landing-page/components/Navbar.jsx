import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function NavbarComponent() {
  // Store navigation links in an array for easier management
  const navLinks = [
    { href: "#", name: "Home" },
    { href: "#", name: "About" },
    { href: "#", name: "Services" },
    { href: "#", name: "Pricing" },
    { href: "#", name: "Contact" },
  ];

  // State to manage which link is currently active
  const [activeLink, setActiveLink] = useState("Home");

  return (
    // Add a container with padding around the Navbar
    <div>
      <Navbar>
        <NavbarBrand href="#">
          {/* Tip: Uncomment and replace with your actual logo */}
          {/* <img
            src="/your-logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Your Brand Logo"
          /> */}
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Your Brand
          </span>
        </NavbarBrand>

        {/* This div contains the button and the hamburger menu toggle */}
        <div className="flex md:order-2">
          {/* Button is HIDDEN on mobile, and an inline-flex element on medium screens and up */}
          <Button className="hidden items-center md:inline-flex">
            Login
            <Icon
              icon="heroicons:arrow-right-on-rectangle-solid"
              className="ml-2 h-5 w-5"
            />
          </Button>
          <NavbarToggle />
        </div>

        {/* This contains all the navigation links that collapse into the hamburger menu */}
        <NavbarCollapse>
          {navLinks.map((link) => (
            <NavbarLink
              key={link.name}
              href={link.href}
              active={activeLink === link.name}
              onClick={() => setActiveLink(link.name)}
            >
              {link.name}
            </NavbarLink>
          ))}
          {/* Mobile-only "Get Started" link, styled to stand out */}
          <div className="mt-2 md:hidden">
            <Button
              className="w-full"
              href="#"
              color="blue" // Example of a different color
            >
              Login
            </Button>
          </div>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
