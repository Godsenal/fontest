const TIMING = {
  linear: t => t,
  'ease-in': t => t * t,
  'ease-out': t => t * (2 - t),
  'ease-in-out': t => (t < 0.5 ? 2 * t * t : -1 + ((4 - (2 * t)) * t)),
};

export function scrollToTargetSmooth(initY, targetY = 0, duration = 200, timingName = 'ease-in') {
  const timingFunc = TIMING[timingName];
  let start = null;
  const step = (timestamp) => {
    start = start || timestamp;
    const progress = timestamp - start; // Growing from 0 to 1
    const time = Math.min(1, ((timestamp - start) / duration));
    const offset = targetY - initY;
    window.scrollTo(0, initY + (offset * timingFunc(time)));
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}
