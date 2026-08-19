export interface DeliverableLine {
  name: string;
  note: string;
}

export interface TerminalLine {
  n: string;
  t: string;
}

export interface BranchDef {
  index: string;
  badge: string;
  name: string;
  tease: string;
  load: string;
  kicker: string;
  title: string;
  body: string;
  chips: string[];
  fileName: string;
  lines: TerminalLine[];
  deliverables: DeliverableLine[];
}

export interface Metric {
  k: string;
  v: string;
}

export interface FeaturedWork {
  num: string;
  name: string;
  brand?: boolean;
  meta: string;
  branch: string;
  status: string;
  desc: string;
  long: string;
  shot: string;
  metrics: Metric[];
  stack: string[];
}

export type ProjectFilter = "All" | "Web" | "Mobile" | "Chain";

export interface Project {
  num: string;
  name: string;
  brand?: boolean;
  year: string;
  branch: string;
  filter: ProjectFilter;
  desc: string;
  headline: string;
  status: string;
  shot: string;
  stack: string[];
  metrics: Metric[];
}

export interface Step {
  n: string;
  week: string;
  days: string;
  title: string;
  body: string;
  out: string;
  checks: string[];
}

export interface Principle {
  index: string;
  short: string;
  title: string;
  body: string;
  test: string;
  assert: string;
}

export interface Stat {
  to: number;
  suffix: string;
  label: string;
}

export interface BriefFact {
  k: string;
  v: string;
}

export interface FootLink {
  label: string;
  meta: string;
  page: PageId;
}

export type PageId = "home" | "work" | "brief";
