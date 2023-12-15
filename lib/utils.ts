import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Inter as FontSans } from "next/font/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Function to calculate energy savings percentage
export function calculateEnergySavingsPercentage(
  currentConsumption: number,
  upgradedConsumption: number
) {
  return (
    ((currentConsumption - upgradedConsumption) / currentConsumption) * 100
  );
}

// Function to calculate projected annual savings
export function calculateProjectedAnnualSavings(
  currentConsumption: number,
  upgradedConsumption: number,
  energyPrice: number
) {
  return (currentConsumption - upgradedConsumption) * energyPrice * 12;
}

export const logic = [
  {
    "*": [{ var: "upgrade_costs" }, { var: "home_size" }],
  },
  {
    "*": [
      {
        "*": [
          { var: "current_energy_consumption" },
          {
            if: [
              { "==": [{ var: "selected_upgrade" }, "insulation"] },
              { "-": [{ var: "energy_savings_percentage" }, 0.1] },
              { "==": [{ var: "selected_upgrade" }, "hvac"] },
              { "-": [{ var: "energy_savings_percentage" }, 0.2] },
              { "==": [{ var: "selected_upgrade" }, "solar panels"] },
              { "-": [{ var: "energy_savings_percentage" }, 0.4] },
              { var: "energy_savings_percentage" },
            ],
          },
        ],
      },
      { var: "energy_price" },
      12,
    ],
  },
  {
    "-": [
      { "*": [{ var: "upgrade_costs" }, { var: "home_size" }] },
      { var: "incentives" },
    ],
  },
  {
    "/": [
      {
        "-": [
          { "*": [{ var: "upgrade_costs" }, { var: "home_size" }] },
          { var: "incentives" },
        ],
      },
      {
        "*": [
          {
            "*": [
              {
                "*": [
                  { var: "current_energy_consumption" },
                  { var: "energy_savings_percentage" },
                ],
              },
              { var: "energy_price" },
            ],
          },
          12,
        ],
      },
    ],
  },
];
