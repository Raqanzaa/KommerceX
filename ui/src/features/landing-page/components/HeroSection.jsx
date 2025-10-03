import { Button } from "flowbite-react";
import { Icon } from "@iconify/react"; // Import Iconify

export default function HeroSection() {
  return (
    <section
      id="home"
      className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Build Modern Web Apps, Faster.
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:px-48 lg:text-xl">
          We provide high-quality React components and beautifully designed
          templates to kickstart your next big project.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Button href="#contact">
            Get started
            <Icon icon="heroicons:arrow-right-solid" className="ml-2 h-5 w-5" />
          </Button>
          <Button href="#features" color="gray">
            Learn more
            <Icon icon="heroicons:book-open-solid" className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
