import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { GOOGLE_FORM_URL } from '../constants';
import '../styles/visl25.css';

// Register required GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, DrawSVGPlugin);

// Fallback form URL if not present
const FORM_URL = GOOGLE_FORM_URL || 'https://forms.gle/visl25';

interface BenefitItem {
  id: string;
  num: string;
  stat: string;
  statLabel: string;
  boldHeading: string;
  bodyText: string;
}

const BENEFITS: BenefitItem[] = [
  {
    id: 'benefit-1',
    num: '01',
    stat: '$130',
    statLabel: 'FREE CREDITS',
    boldHeading: 'In free credits',
    bodyText: 'to make your first films on Visl, on us.',
  },
  {
    id: 'benefit-2',
    num: '02',
    stat: '0.10%',
    statLabel: 'FOUNDING EQUITY',
    boldHeading: 'Early access to everything',
    bodyText:
      '+ Founding Creator Partnership equity for select top creators (subject to approval) + New features and models first.',
  },
  {
    id: 'benefit-3',
    num: '03',
    stat: 'DIRECT',
    statLabel: 'VIP COMMUNITY',
    boldHeading: 'Private Discord community',
    bodyText: 'to build with the team and creators.',
  },
  {
    id: 'benefit-4',
    num: '04',
    stat: '25 SEATS',
    statLabel: 'GLOBAL SPOTLIGHT',
    boldHeading: 'Featured by Visl',
    bodyText: 'On our channels and website.',
  },
  {
    id: 'benefit-5',
    num: '05',
    stat: 'TOP 10',
    statLabel: 'CREATOR LAURELS',
    boldHeading: 'Bonus credits',
    bodyText: 'for standout creators.',
  },
];

export function Visl25Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const benefitsTitleRef = useRef<HTMLHeadingElement>(null);
  const guidingLineRef = useRef<SVGPathElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Title Animation: SplitText staggered drop effect so main title falls & locks into place
      if (titleRef.current) {
        try {
          const split = new SplitText(titleRef.current, {
            type: 'lines, words, chars',
            charsClass: 'v25-title-char',
          });

          gsap.from(split.chars, {
            y: -70,
            rotationX: 45,
            opacity: 0,
            duration: 0.9,
            stagger: 0.02,
            ease: 'back.out(1.7)',
            clearProps: 'transform,opacity',
          });
        } catch {
          gsap.from(titleRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.5)',
          });
        }
      }

      // 2. Subheadline & Description text falling
      if (subheadlineRef.current) {
        gsap.from(subheadlineRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8,
          delay: 0.35,
          ease: 'power2.out',
        });
      }

      if (descriptionRef.current) {
        gsap.from(descriptionRef.current, {
          y: -25,
          opacity: 0,
          duration: 0.8,
          delay: 0.5,
          ease: 'power2.out',
        });
      }

      // 3. ScrambleText on numbers & key stats on scroll
      const scrambleTargets = containerRef.current?.querySelectorAll('.v25-scramble-text');
      if (scrambleTargets) {
        scrambleTargets.forEach((el) => {
          const textVal = el.getAttribute('data-text') || el.textContent || '';
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.to(el, {
                duration: 1.3,
                scrambleText: {
                  text: textVal,
                  chars: '$#@!&%0123456789',
                  speed: 0.45,
                },
              });
            },
          });
        });
      }

      // 4. Large Bold High-Impact Stats: Scale-in Drop + ScrambleText
      const largeStats = containerRef.current?.querySelectorAll('.v25-scramble-stat');
      if (largeStats) {
        largeStats.forEach((el) => {
          const targetText = el.getAttribute('data-text') || el.textContent || '';
          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.from(el, {
                y: -32,
                scale: 0.8,
                opacity: 0,
                duration: 0.85,
                ease: 'back.out(2)',
              });
              gsap.to(el, {
                duration: 1.4,
                scrambleText: {
                  text: targetText,
                  chars: '$#@!&%0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                  speed: 0.45,
                },
              });
            },
          });
        });
      }

      // 5. Scroll-Driven Guiding Line (DrawSVG)
      if (guidingLineRef.current) {
        gsap.fromTo(
          guidingLineRef.current,
          { drawSVG: '0% 0%', opacity: 0.45 },
          {
            drawSVG: '0% 100%',
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.7,
            },
          }
        );
      }

      // 5b. Letter-by-letter CTA assembly: individual characters flip, rotate and snap into place.
      const ctaLetters = containerRef.current?.querySelectorAll('.v25-seat-cta .v25-letter:not(.v25-letter-space)');
      if (ctaLetters?.length) {
        gsap.set(ctaLetters, {
          transformPerspective: 700,
          transformOrigin: '50% 70%',
        });
        gsap.fromTo(
          ctaLetters,
          {
            opacity: 0,
            y: (index) => (index % 3 === 0 ? 34 : index % 3 === 1 ? -24 : 16),
            x: (index) => (index % 2 === 0 ? -9 : 9),
            rotationZ: (index) => (index % 2 === 0 ? -28 : 24),
            rotationY: (index) => (index % 4 === 0 ? 95 : index % 4 === 1 ? -75 : 0),
            rotationX: (index) => (index % 5 === 0 ? -80 : index % 5 === 1 ? 55 : 0),
            scale: (index) => (index % 4 === 0 ? 0.72 : 0.9),
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotationZ: 0,
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.82,
            stagger: { each: 0.035, from: 'random' },
            ease: 'back.out(1.65)',
            scrollTrigger: {
              trigger: '.v25-seat-cta',
              start: 'top 78%',
              once: true,
            },
          }
        );
        gsap.to('.v25-cta-orbit-a', {
          rotation: 360, duration: 18, repeat: -1, ease: 'none', transformOrigin: '50% 50%',
        });
        gsap.to('.v25-cta-spark-a', {
          rotation: 180, scale: 1.15, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
        gsap.to('.v25-cta-spark-b', {
          rotation: -140, scale: 0.8, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut',
        });
        gsap.to('.v25-cta-film-doodle', {
          y: -3, rotation: -3, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
          transformOrigin: '50% 50%',
        });
      }

      // 6. Benefits Header Falling
      if (benefitsTitleRef.current) {
        try {
          const bSplit = new SplitText(benefitsTitleRef.current, {
            type: 'words',
          });

          gsap.from(bSplit.words, {
            scrollTrigger: {
              trigger: benefitsTitleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            y: -35,
            opacity: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          });
        } catch {
          gsap.from(benefitsTitleRef.current, {
            scrollTrigger: {
              trigger: benefitsTitleRef.current,
              start: 'top 85%',
            },
            y: -30,
            opacity: 0,
            duration: 0.7,
          });
        }
      }

      // 7. Dropping Benefits Boxes & Stacking
      if (stackRef.current) {
        const cards = stackRef.current.querySelectorAll('.visl25-card');

        gsap.from(cards, {
          scrollTrigger: {
            trigger: stackRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: -40,
          scale: 0.95,
          opacity: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        });
      }

      // 8. Ambient SVGs remain static so they don't distract from the content.

    },
    { scope: containerRef }
  );

  return (
    <div className="visl25-page" ref={containerRef}>
      {/* ─────────────────────────────────────────────────────────────
          1. LIGHT THEME AMBIENCE, 3 FLOATING STAT WIDGETS & 42 FUNKY SVGS
          ───────────────────────────────────────────────────────────── */}
      <div className="visl25-ambient-decor" aria-hidden="true">
        {/* Soft background glow orbs */}
        <div className="visl25-light-glow visl25-light-glow-1" />
        <div className="visl25-light-glow visl25-light-glow-2" />
        <div className="visl25-light-glow visl25-light-glow-3" />
        

        {/* ── 3 FLOATING STAT MICRO-WIDGETS (GLASSMORPHISM PILLS) ── */}

        <div className="v25-ambient-widget v25-amb-widget-3 v25-ambient-drift">
          <span className="v25-amb-widget-dot" />
          <span>25 Seats</span>
        </div>

        {/* ── 42 FUNKY CONTENT-RELEVANT FLOATING SVGS ── */}
        {/* 1. Film Clapperboard SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-1" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="3" />
          <path d="M2 9h20" />
          <path d="M6 4l2 5" />
          <path d="M12 4l2 5" />
          <path d="M18 4l2 5" />
        </svg>

        {/* 2. AI Magic Sparkle SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-2" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
          <path d="M19 2l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
        </svg>

        {/* 3. Play Button Vector */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" fillOpacity="0.25" />
        </svg>

        {/* 4. Laurel Crown SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-4" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 14c0 3 2 5.5 5 6.5" />
          <path d="M19 14c0 3-2 5.5-5 6.5" />
          <path d="M4 10c1-2 3.5-3 6-2" />
          <path d="M20 10c-1-2-3.5-3-6-2" />
          <path d="M6 5c2-1 5 0 6 3" />
          <path d="M18 5c-2-1-5 0-6 3" />
          <circle cx="12" cy="20" r="1.5" fill="currentColor" />
        </svg>

        {/* 5. Dollar Coin SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-5" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9c-.5-.7-1.4-1.2-2.5-1.2-1.7 0-2.8.9-2.8 2.2 0 2.5 5.5 1.4 5.5 4 0 1.4-1.2 2.2-2.8 2.2-1.3 0-2.3-.6-2.9-1.4" />
          <path d="M12 6.5v11" />
        </svg>

        {/* 6. Equity Shield SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-6" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L4 5v6c0 5.5 3.5 10.5 8 12 4.5-1.5 8-6.5 8-12V5l-8-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>

        {/* 7. Discord Chat Bubble SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-7" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          <circle cx="9" cy="12" r="1.2" fill="currentColor" />
          <circle cx="15" cy="12" r="1.2" fill="currentColor" />
        </svg>

        {/* 8. Open Book SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-8" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6s3-2 7-2 7 2 7 2v13s-3-2-7-2-7 2-7 2V6z" />
          <path d="M16 6s3-2 7-2v13s-4 0-7 2V6z" />
        </svg>

        {/* 9. Ancient Pillar Silhouette SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-9" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16" />
          <path d="M5 7h14" />
          <path d="M7 7v11" />
          <path d="M11 7v11" />
          <path d="M13 7v11" />
          <path d="M17 7v11" />
          <path d="M5 18h14" />
          <path d="M4 21h16" />
        </svg>

        {/* 10. Seat Ticket Badge SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-10" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v3z" />
          <path d="M12 8v8" strokeDasharray="2 2" />
        </svg>

        {/* 11. Classic 4-Point Star SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-11" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>

        {/* 12. Geometric Cross (+) SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-12" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 4v16M4 12h16" />
        </svg>

        {/* 13. Floating UI Pill Tag "✨ Microdramas" */}
        <div className="v25-ambient-svg v25-ambient-drift v25-svg-13 v25-floating-genre-tag">
          <span>✨ Microdramas</span>
        </div>

        {/* 14. Camera Lens Aperture SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-14" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M14.31 8l5.74 9.94" />
          <path d="M9.69 8h11.48" />
          <path d="M7.38 12l5.74-9.94" />
          <path d="M9.69 16L3.95 6.06" />
          <path d="M14.31 16H2.83" />
          <path d="M16.62 12l-5.74 9.94" />
        </svg>

        {/* 15. Script Quill SVG */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-15" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 2c-4 2-7 6-8 10l-2 2-3-1-3 3 4 1 1 4 3-3-1-3 2-2c4-1 8-4 10-8V2z" />
          <path d="M14 8l2 2" />
        </svg>

        {/* ── 12 MORE FLOATING STORYTELLING / CREATOR SVGs ── */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-16" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /><circle cx="8" cy="7" r="1" /><circle cx="17" cy="8" r="1" /><circle cx="7" cy="16" r="1" /><circle cx="17" cy="16" r="1" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-17" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L15 9" /><path d="M14 3v3M20 9h-3M18 3l-1 2M21 14l-2 1" /><path d="M3 8l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-18" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L3 20l1.7-4.4A7.5 7.5 0 1 1 20 11.5z" /><path d="M8 11h.01M12 11h.01M16 11h.01" strokeWidth="2.5" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-19" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="M10 8l6 4-6 4z" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-20" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-21" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13v-1a9 9 0 0 1 18 0v1" /><rect x="3" y="12" width="4" height="7" rx="2" /><rect x="17" y="12" width="4" height="7" rx="2" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-22" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z" /><path d="M4 5.5v16.5M8 7h8M8 11h7M8 15h5" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-23" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-24" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1l2.7 8.3L23 12l-8.3 2.7L12 23l-2.7-8.3L1 12l8.3-2.7z" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-25" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5v14M20 5v14M4 8h16M4 16h16" /><circle cx="9" cy="8" r="2" fill="currentColor" fillOpacity=".2" /><circle cx="15" cy="16" r="2" fill="currentColor" fillOpacity=".2" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-26" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7l5 4 4-7 4 7 5-4-2 12H5z" /><path d="M6 22h12" /></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-27" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h4l2-3h4l2 3h4a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" /><circle cx="12" cy="13" r="3.5" /></svg>
        {/* Additional ambient SVG accents (28–42) */}
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-28" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="7"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-29" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16v16H4zM8 8h8M8 12h5M8 16h7"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-30" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-31" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 5h18v14H3zM7 9h10M7 13h6"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-32" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h5"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-33" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><path d="M9 8l7 4-7 4z"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-34" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-35" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 19V5M4 19h16M7 15l4-4 3 2 5-6"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-36" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 7h16M4 12h10M4 17h13"/><circle cx="18" cy="12" r="2"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-37" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2zM19 16v5M16.5 18.5h5"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-38" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6l9-4 9 4-9 4zM3 6v12l9 4 9-4V6M12 10v12"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-39" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16v16H4zM5 17l5-4 3 2 3-3 3 5"/><circle cx="9" cy="9" r="2"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-40" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 3a7 7 0 0 0-4 12.7V19h8v-3.3A7 7 0 0 0 12 3zM9 22h6M9 16h6"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-41" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 4h16v16H4zM8 8l8 8M16 8l-8 8"/><circle cx="12" cy="12" r="3"/></svg>
        <svg className="v25-ambient-svg v25-ambient-drift v25-svg-42" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 3l2.8 5.7L21 12l-6.2 3.3L12 21l-2.8-5.7L3 12l6.2-3.3z"/></svg>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          SCROLL-DRIVEN GUIDING LINE (DrawSVG)
          ───────────────────────────────────────────────────────────── */}
      <svg
        className="visl25-guiding-line-canvas"
        viewBox="0 0 1200 2400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="v25-scroll-ribbon" x1="0" y1="0" x2="1200" y2="2400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="48%" stopColor="#4387ff" />
            <stop offset="100%" stopColor="#22c3ee" />
          </linearGradient>
        </defs>
        <path
          className="visl25-guiding-line-glow"
          d="M 600 120 C 650 350 480 600 520 850 C 560 1100 680 1350 600 1600 C 520 1850 640 2100 600 2350"
          stroke="url(#v25-scroll-ribbon)"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <path
          ref={guidingLineRef}
          className="visl25-guiding-line"
          d="M 600 120 C 650 350 480 600 520 850 C 560 1100 680 1350 600 1600 C 520 1850 640 2100 600 2350"
          stroke="url(#v25-scroll-ribbon)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="1 11"
        />
        </svg>

      <div className="visl25-container">
        {/* =========================================================
            HEADER SECTION (STRICTLY FROM POSTERS ONLY)
            ========================================================= */}
        <header className="visl25-header" aria-label="Header">
          {/* Badge: "ONLY 25 SEATS" */}
          <div className="visl25-badge-box">
            <div className="visl25-badge">
              <span className="visl25-badge-dot" />
              <span
                className="visl25-badge-text v25-scramble-text"
                data-text="ONLY 25 SEATS"
              >
                ONLY 25 SEATS
              </span>
            </div>
          </div>

          {/* Title: "VISL 25 FOUNDING CREATORS PROGRAM" */}
          <div className="visl25-title-wrap">
            <h1 className="visl25-main-title" ref={titleRef}>
              VISL 25 FOUNDING <span className="v25-gradient-shimmer">CREATORS</span> PROGRAM
            </h1>
          </div>

          {/* Subheadline: "Your stories deserve more than 60 seconds." */}
          <p className="visl25-subheadline" ref={subheadlineRef}>
            Your stories deserve more than{' '}
            <span className="v25-scramble-text" data-text="60 seconds" style={{ fontWeight: 800 }}>
              60 seconds
            </span>
            .
          </p>

          {/* Description: "25 founding seats for storytellers & AI creators building long-form stories." */}
          <p className="visl25-description" ref={descriptionRef}>
            25 founding seats for storytellers &amp; AI creators building long-form stories.
          </p>

          {/* Primary Apply CTA */}
          <div className="visl25-hero-btn-wrap">
            <a
              href={FORM_URL}
              className="visl25-apply-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply now for Visl 25"
            >
              <span>Apply Now</span>
              <span className="visl25-btn-arrow">→</span>
            </a>
          </div>
        </header>

        {/* =========================================================
            BENEFITS SECTION: "25 seats. Here's what you get."
            (High-Impact Typography & Scramble Animation Upgrade)
            ========================================================= */}
        <section className="visl25-benefits-section" aria-label="Benefits">
          <div className="visl25-benefits-header">
            <h2 className="visl25-benefits-title" ref={benefitsTitleRef}>
              25 seats. <span className="v25-gradient-shimmer">Here&apos;s what you get.</span>
            </h2>
          </div>

          {/* Dropping Benefits Boxes / Cards Stack */}
          <div className="visl25-cards-stack" ref={stackRef}>
            {BENEFITS.map((item) => (
              <div key={item.id} className="visl25-card">
                {/* Large Bold High-Impact Stat Column */}
                <div className="visl25-card-stat-col">
                  <div
                    className="visl25-stat-huge v25-scramble-stat"
                    data-text={item.stat}
                  >
                    {item.stat}
                  </div>
                  <span className="visl25-stat-sublabel">{item.statLabel}</span>
                </div>

                {/* Benefit Statement Body Column */}
                <div className="visl25-card-body-col">
                  <div className="visl25-card-num-badge">BENEFIT {item.num}</div>
                  <div className="visl25-card-statement">
                    <strong>{item.boldHeading}</strong> {item.bodyText}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer tag strictly from posters */}
          <div className="visl25-footer-tag-wrap">
            <div className="visl25-footer-tag">
              <span className="genres">KIDS · MYTHOLOGY · HISTORY · MICRODRAMAS</span>
              <span className="divider">—</span>
              <span>Storytellers &amp; AI creators welcome</span>
            </div>
          </div>
        </section>

        {/* =========================================================
            APPLY CTA BOX
            ========================================================= */}
        <section className="visl25-cta-section" aria-label="Apply Now Box">
          <div className="visl25-cta-box v25-seat-cta">
            <h3 className="visl25-cta-headline v25-letter-headline" aria-label="Claim 1 of 25 Founding Seats">
              <span className="v25-letter-word" aria-hidden="true">
                {'Claim'.split('').map((letter, index) => (
                  <span className={`v25-letter v25-letter-${index % 6}`} key={`claim-${index}`}>{letter}</span>
                ))}
              </span>
              <span className="v25-letter v25-letter-space" aria-hidden="true"> </span>
              <span className="v25-letter v25-letter-number" aria-hidden="true">1</span>
              <span className="v25-letter v25-letter-space" aria-hidden="true"> </span>
              <span className="v25-letter-word" aria-hidden="true">
                {'of'.split('').map((letter, index) => (
                  <span className={`v25-letter v25-letter-${(index + 2) % 6}`} key={`of-${index}`}>{letter}</span>
                ))}
              </span>
              <span className="v25-letter v25-letter-space" aria-hidden="true"> </span>
              <span className="v25-letter-word v25-gradient-shimmer" aria-hidden="true">
                {'25 Founding Seats'.split('').map((letter, index) => letter === ' ' ? (
                  <span className="v25-letter-space" key={`seat-space-${index}`}> </span>
                ) : (
                  <span className={`v25-letter v25-letter-gradient-glyph v25-letter-${(index + 3) % 6}`} key={`seat-${index}`}>{letter}</span>
                ))}
              </span>
            </h3>

            <p className="visl25-cta-sub">
              Make your first films on us. Applications are open to ambitious storytellers and AI creators building
              long-form stories.
            </p>

            <a
              href={FORM_URL}
              className="visl25-apply-btn"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply now for Visl 25"
            >
              <span>Apply Now</span>
              <span className="visl25-btn-arrow">→</span>
            </a>

            <div className="v25-cta-orbit-art" aria-hidden="true">
              <svg className="v25-cta-orbit v25-cta-orbit-a" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 6" />
                <circle cx="60" cy="18" r="5" fill="#4387ff" />
              </svg>
              <svg className="v25-cta-spark v25-cta-spark-a" viewBox="0 0 40 40" fill="none">
                <path d="M20 2 L23 15 L36 20 L23 23 L20 38 L17 23 L4 20 L17 15 Z" fill="#4387ff" />
              </svg>
              <svg className="v25-cta-spark v25-cta-spark-b" viewBox="0 0 40 40" fill="none">
                <path d="M20 2 L23 15 L36 20 L23 23 L20 38 L17 23 L4 20 L17 15 Z" fill="#ff8a70" />
              </svg>
              <svg className="v25-cta-film-doodle" viewBox="0 0 72 56" fill="none">
                <rect x="7" y="12" width="58" height="36" rx="6" stroke="currentColor" strokeWidth="2.2" />
                <path d="M7 23H65" stroke="currentColor" strokeWidth="2.2" />
                <path d="M19 12L24 23M33 12L38 23M47 12L52 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M31 30L43 36L31 42V30Z" fill="#4387ff" />
              </svg>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Visl25Page;
