import { marqueeItems } from "../data/site";
import s from "./Ticker.module.css";

// Doubled, exactly like the source's `items.concat(items)`, so the -50% keyframe loops seamlessly.
const doubled = marqueeItems.concat(marqueeItems);

export function Ticker() {
  return (
    <div className={s.wrap}>
      <div className={s.marquee}>
        {doubled.map((item, i) => (
          <span key={i} className={s.item}>
            {item}
            <span className={s.itemStar}>*</span>
          </span>
        ))}
      </div>
    </div>
  );
}
