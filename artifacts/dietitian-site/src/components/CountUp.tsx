import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface CountUpProps {
  /** The formatted value, e.g. "1000+", "98%", "+1000", "%98", "15". */
  value: string;
  /** Animation length in seconds. */
  duration?: number;
  className?: string;
}

/**
 * Counts a number up from 0 to its target when it scrolls into view.
 * It parses any non-digit prefix/suffix (e.g. "+", "%") and keeps them in
 * place, so localized strings like "%98" or "1000+" animate correctly.
 * If the value has no digits, it's rendered as-is (no animation).
 */
export default function CountUp({ value, duration = 1.6, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  const match = value.match(/^(\D*)(\d[\d,]*)(\D*)$/);
  const prefix = match ? match[1] : '';
  const target = match ? parseInt(match[2].replace(/,/g, ''), 10) : 0;
  const suffix = match ? match[3] : '';
  const hasNumber = match !== null;

  useEffect(() => {
    if (!inView || !hasNumber) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, hasNumber, target, duration]);

  if (!hasNumber) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
