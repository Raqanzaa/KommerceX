import { Card } from "flowbite-react";
import { Icon } from "@iconify/react"; // Import Iconify

const features = [
  {
    icon: (
      <Icon
        icon="heroicons:code-bracket-solid"
        className="h-10 w-10 text-primary-600"
      />
    ),
    title: "Developer Friendly",
    description:
      "Built with developers in mind. Easy to customize, extend, and integrate with your existing projects.",
  },
  {
    icon: (
      <Icon
        icon="heroicons:swatch-solid"
        className="h-10 w-10 text-primary-600"
      />
    ),
    title: "Beautifully Designed",
    description:
      "Leverages Tailwind CSS and Flowbite for a modern, clean, and visually appealing user interface out of the box.",
  },
  {
    icon: (
      <Icon
        icon="heroicons:device-phone-mobile-solid"
        className="h-10 w-10 text-primary-600"
      />
    ),
    title: "Fully Responsive",
    description:
      "All components are designed to work seamlessly on all screen sizes, from mobile phones to desktops.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white dark:bg-gray-800 py-16 px-4">
      <div className="mx-auto max-w-screen-xl text-center">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Everything You Need to Succeed
        </h2>
        <p className="mb-8 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
          Focus on your business logic, not on reinventing the UI wheel.
        </p>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="text-left">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                {feature.title}
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
