import { useScrollProgress } from "../hooks/useScrollProgress";
import s from "./ProgressBar.module.css";

export function ProgressBar() {
  const ref = useScrollProgress<HTMLDivElement>();
  return <div ref={ref} className={s.bar} />;
}
