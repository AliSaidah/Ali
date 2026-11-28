import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

const isBrowser = typeof window !== 'undefined';
if (isBrowser) gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export const reducedMotion = isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let lenis: Lenis | null = null;

export function startLenis() {
  if (!isBrowser || reducedMotion || lenis) return lenis;
  lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollToTarget(target: string | HTMLElement, offset = -90) {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 });
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
