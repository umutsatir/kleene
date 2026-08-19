import type { Principle, Step } from "./types";

export const steps: Step[] = [
  {
    n: "01",
    week: "WEEK 01",
    days: "DAY 1–5",
    title: "Brief & invariants",
    body: "We turn the brief into a written list of properties the system must hold, and the ones it may break.",
    out: "SPEC + RISK LIST",
    checks: ["Invariant list, signed off by you", "Architecture on one page", "Risk register with owners"],
  },
  {
    n: "02",
    week: "WEEK 02",
    days: "DAY 6–10",
    title: "Thin vertical slice",
    body: "One real path built end to end — schema, API, screen — deployed to staging you can click.",
    out: "RUNNING SLICE",
    checks: ["Schema + typed API", "One screen, real data", "Preview deploy per PR"],
  },
  {
    n: "03",
    week: "WEEK 03",
    days: "DAY 11–17",
    title: "Widen & harden",
    body: "Remaining surfaces, test coverage where it matters, observability wired before launch.",
    out: "BETA BUILD",
    checks: ["Remaining surfaces built", "Tests on the invariants", "Dashboards + alerts live"],
  },
  {
    n: "04",
    week: "WEEK 04",
    days: "DAY 18–20",
    title: "Handoff",
    body: "Repos, runbooks, dashboards and threat model land in your org. We are replaceable by design.",
    out: "OWNERSHIP TRANSFER",
    checks: ["Repos in your org", "Runbooks + threat model", "Walkthrough with your team"],
  },
];

export const principles: Principle[] = [
  {
    index: "01",
    short: "INVARIANTS FIRST",
    title: "The properties are written before the implementation.",
    body: "Every system starts as a list of statements that must hold forever. Code makes them true; tests keep them true.",
    test: "spec/invariants",
    assert: "assert(balances.sum === totalSupply)",
  },
  {
    index: "02",
    short: "FAILURE BUDGET",
    title: "Assume the network partitions while you deploy.",
    body: "Replay-safe pipelines, idempotent writes, and reconciliation jobs that rebuild state from the source of truth alone.",
    test: "chaos/partition",
    assert: "replay(30d) → drift === 0",
  },
  {
    index: "03",
    short: "NO CEREMONY",
    title: "Small surface, few abstractions, readable diffs.",
    body: "We would rather delete a layer than document it. Interfaces are typed end to end so the compiler carries the review load.",
    test: "ci/typecheck",
    assert: "any === 0 && ts-ignore === 0",
  },
  {
    index: "04",
    short: "HANDOFF",
    title: "You own everything on day one.",
    body: "Repos, runbooks, dashboards and threat model live in your org, not ours. Being replaceable is a design goal.",
    test: "handoff/audit",
    assert: "owner(repo) === client.org",
  },
];
