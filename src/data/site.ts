import type { BriefFact, Stat } from "./types";

export const stats: Stat[] = [
  { to: 24, suffix: "", label: "Products shipped since 2021" },
  { to: 11, suffix: "", label: "Web & mobile engagements" },
  { to: 9, suffix: "", label: "On-chain systems in production" },
  { to: 6, suffix: " yr", label: "Median engineer experience" },
];

export const briefFacts: BriefFact[] = [
  { k: "RESPONSE TIME", v: "≤ 2 WORKING DAYS" },
  { k: "ENGAGEMENT MIN.", v: "4 WEEKS" },
  { k: "TIMEZONES", v: "CET ± 6H" },
];

export const marqueeItems: string[] = [
  "TypeScript",
  "React",
  "React Native",
  "Node",
  "Postgres",
  "Solidity",
  "Foundry",
  "viem",
  "Rust",
  "Kubernetes",
  "Expo",
  "GraphQL",
  "Terraform",
  "Redis",
];

export const branchPickLabels = ["Web", "Mobile", "Chain", "Not sure yet"] as const;

export const projectFilters = ["All", "Web", "Mobile", "Chain"] as const;
