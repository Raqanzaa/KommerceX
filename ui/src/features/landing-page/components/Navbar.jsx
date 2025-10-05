import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function NavbarComponent() {
  const navLinks = [
    { href: "#home", name: "Home" },
    { href: "#features", name: "Features" },
    { href: "#pricing", name: "Pricing" },
    { href: "#contact", name: "Contact" },
  ];

  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.querySelector(link.href));
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (
          section &&
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveLink(section.getAttribute('id'));
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  return (
    <div className="sticky top-0 z-50">
      <Navbar>
        <NavbarBrand href="#home">
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

        <div className="flex md:order-2">
          <Button
            className="hidden items-center md:inline-flex"
            href="/products"
          >
            Get started
            <Icon icon="heroicons:arrow-right-solid" className="ml-2 h-5 w-5" />
          </Button>
          <NavbarToggle />
        </div>

        <NavbarCollapse>
          {navLinks.map((link) => (
            <NavbarLink
              key={link.name}
              href={link.href}
              active={activeLink === link.href.substring(1)}
            >
              {link.name}
            </NavbarLink>
          ))}
          <div className="mt-2 md:hidden">
            <Button className="w-full" href="/products" color="blue">
              Get started
              <Icon
                icon="heroicons:arrow-right-solid"
                className="ml-2 h-5 w-5"
              />
            </Button>
          </div>
        </NavbarCollapse>
      </Navbar>
    </div>
  );
}
