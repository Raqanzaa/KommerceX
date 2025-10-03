import { Button, Card } from "flowbite-react";
import { Icon } from "@iconify/react"; // Import Iconify

const pricingPlans = [
  {
    name: "Starter",
    price: "29",
    features: ["Individual license", "Email support", "Free updates"],
    popular: false,
  },
  {
    name: "Team",
    price: "99",
    features: [
      "Up to 10 users",
      "Priority support",
      "Free updates",
      "Team collaboration",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "499",
    features: [
      "Unlimited users",
      "24/7 support",
      "Custom features",
      "Dedicated manager",
    ],
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="mx-auto max-w-screen-xl text-center">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Fair and Simple Pricing
        </h2>
        <p className="mb-8 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
          Choose the plan that's right for your needs.
        </p>
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col p-6 ${
                plan.popular ? "border-2 border-primary-500" : ""
              }`}
            >
              <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
              <div className="flex items-baseline justify-center">
                <span className="mr-2 text-5xl font-extrabold">
                  ${plan.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul role="list" className="my-7 space-y-5 text-left">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex space-x-3 items-center">
                    <Icon
                      icon="heroicons:check-badge-solid"
                      className="h-5 w-5 text-green-500"
                    />
                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                color={plan.popular ? "gray" : "gray"}
                className="w-full"
              >
                Choose plan
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
