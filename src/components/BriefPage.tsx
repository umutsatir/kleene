import { useState } from "react";
import type { RevealMotion } from "../config";
import { branchPickLabels, briefFacts } from "../data/site";
import { Reveal } from "../hooks/Reveal";
import { useMagnetic } from "../hooks/useMagnetic";
import s from "./BriefPage.module.css";

interface BriefForm {
  project: string;
  timeline: string;
  email: string;
  detail: string;
}

const EMPTY_FORM: BriefForm = { project: "", timeline: "", email: "", detail: "" };

interface BriefPageProps {
  motion: RevealMotion;
}

export function BriefPage({ motion }: BriefPageProps) {
  const [form, setForm] = useState<BriefForm>(EMPTY_FORM);
  const [branch, setBranch] = useState<string>("Web");
  const [sent, setSent] = useState(false);
  const submitRef = useMagnetic<HTMLButtonElement>();

  const setField = (key: keyof BriefForm) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className={s.page}>
      <div className={s.inner}>
        <Reveal motion={motion}>
          <div className={s.kicker}>BRIEF</div>
          <div className={s.headline}>Tell us what must not fail.</div>
          <div className={s.lede}>
            Two engineers read every brief — app, API or protocol. You get a scoped technical response within
            two working days, not a sales call.
          </div>
          <div className={s.facts}>
            {briefFacts.map((f) => (
              <div key={f.k} className={s.fact}>
                <span>{f.k}</span>
                <span className={s.factValue}>{f.v}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal motion={motion} className={s.formCard}>
          <div className={s.formGrid}>
            <div className={s.field}>
              <div className={s.label}>PROJECT</div>
              <input
                className={s.input}
                value={form.project}
                onChange={setField("project")}
                placeholder="e.g. field ops platform, L2 indexer"
              />
            </div>

            <div className={s.field}>
              <div className={s.label}>BRANCH</div>
              <div className={s.branchPicks}>
                {branchPickLabels.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className={`${s.branchPick} ${branch === label ? s.branchPickActive : ""}`}
                    onClick={() => setBranch(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className={s.fieldTwoCol}>
              <div className={s.field}>
                <div className={s.label}>TIMELINE</div>
                <input
                  className={s.input}
                  value={form.timeline}
                  onChange={setField("timeline")}
                  placeholder="start + hard deadline"
                />
              </div>
              <div className={s.field}>
                <div className={s.label}>EMAIL</div>
                <input
                  className={s.input}
                  value={form.email}
                  onChange={setField("email")}
                  placeholder="you@company.xyz"
                />
              </div>
            </div>

            <div className={s.field}>
              <div className={s.label}>WHAT MUST NOT FAIL</div>
              <textarea
                className={s.textarea}
                value={form.detail}
                onChange={setField("detail")}
                rows={4}
                placeholder="the one property of this system that can never break"
              />
            </div>

            <button ref={submitRef} type="button" className={s.submit} onClick={() => setSent(true)}>
              <span>{sent ? "Brief received" : "Submit brief"}</span>
              <span className={s.submitStar}>*</span>
            </button>
            <div className={s.submitNote}>
              {sent
                ? "Logged. Two engineers will read it and reply within two working days."
                : "No CRM, no drip campaign. One reply from the people who would build it."}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
