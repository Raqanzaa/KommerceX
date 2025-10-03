import { Button } from "flowbite-react";

export default function CTASection() {
  return (
    <section id="contact" className="bg-white dark:bg-gray-800 py-16">
      <div className="mx-auto max-w-screen-xl px-4 text-center">
        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Ready to dive in?
        </h2>
        <p className="mb-8 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
          Start your free trial today. No credit card required.
        </p>
        <Button size="xl" href="#">
          Get Started Now
        </Button>
      </div>
    </section>
  );
}
