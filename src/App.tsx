/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface AchievementItem {
  title: string;
  desc: string;
}

interface Project {
  code: string;
  category: string;
  name: string;
  summary: string;
  overview: string;
  points: string[];
  achievement?: string;
  achievements?: AchievementItem[];
  role?: string;
  context?: string;
  chips: string[];
  tech?: string[];
  idea?: string;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    code: 'PRJ-01',
    category: 'Civic Technology',
    name: 'NagrikOne',
    summary: "Civic issue reporting platform that connects citizens' reports with the appropriate authorities.",
    overview: "A civic issue reporting platform designed to help citizens report local problems and connect those reports with the appropriate authorities. Built to make civic issue reporting more structured, transparent and easier for citizens.",
    points: [
      'Citizens can report local civic issues with precise geotags',
      'Reports can include location coordinates and visual evidence',
      'Reports are categorized and processed through a structured validation and routing workflow',
      'Designed to connect reports directly with the relevant municipal or government department'
    ],
    achievements: [
      {
        title: 'Achievement 1 — MAIT',
        desc: 'Cleared the first round and secured a Top 5 finish in the final hackathon, earning a certificate and cash prize.'
      },
      {
        title: 'Achievement 2 — GDG Pitch Break 2026',
        desc: 'Secured 3rd Prize at Pitch Break, organized by Google Developer Groups at USAR on 22 October 2026.'
      }
    ],
    role: 'Backend / project development and presentation.',
    context: 'A team hackathon project, built as an intensive learning experience while I was a first-year B.Tech IT student.',
    chips: ['Hackathon project', 'MAIT Top 5', 'GDG 3rd Prize'],
    link: 'https://nagrikone-ai-citizen-civic-reporting-governance-p.ai.studio/'
  },
  {
    code: 'PRJ-02',
    category: 'AI / Artisan Technology',
    name: 'Kalakriti AI',
    summary: 'Artisan-focused platform giving traditional Indian artisans a stronger digital presence.',
    overview: "An artisan-focused digital platform that helps traditional Indian artisans build a stronger digital presence and present their crafts to potential buyers, combining technology with India's traditional crafts.",
    points: [
      'Digital identity for artisans: profiles covering craft, region, materials, techniques and cultural background',
      'AI-assisted product information, storytelling and pricing suggestions',
      'Product cataloguing, discovery and better presentation of handmade products',
      'Preserves the cultural context behind crafts instead of treating them as generic e-commerce items',
      'Artisan and product data can be shared with the buyer-facing side'
    ],
    context: 'A project and concept I built and experimented with, not a production-scale platform.',
    tech: ['Supabase', 'AI Storytelling', 'Cloud Storage'],
    chips: ['Concept project', 'Artisan Tech'],
    link: 'https://remix-kalakriti-ai-7036.ai.studio/'
  },
  {
    code: 'PRJ-03',
    category: 'Web Design / E-commerce Concept',
    name: 'Riwaaz / Sandook',
    summary: 'Buyer-facing marketplace for discovering Indian handcrafts and the stories behind them.',
    overview: 'The buyer-facing side of the artisan marketplace ecosystem, designed around discovering Indian handcrafted products and learning about the artisans and cultural stories behind them.',
    points: [
      'Buyer-facing marketplace experience optimized for exploratory discovery',
      'Discover handcrafted products made by registered artisans',
      'Artisan stories and cultural context shown alongside products',
      'Designed to work with the Kalakriti artisan and product ecosystem',
      'Shares artisan and product data with Kalakriti through Supabase'
    ],
    context: 'A web design and e-commerce concept that connects the artisan side with the buyer side through a more meaningful digital experience.',
    tech: ['Supabase', 'Responsive UI', 'Modern Web'],
    chips: ['Web design', 'Concept', 'Cultural Heritage'],
    link: 'https://sandook.ai.studio/'
  }
];

const CONTACT = {
  email: 'prakharjain0506@gmail.com',
  instagram: 'itsprakharjain',
  linkedin: 'https://www.linkedin.com/in/prakhar-jain-a77614412',
  github: 'PrakharJain-0506'
};

function CursorMotion() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorFazeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only enable for devices with fine pointer (mouse/trackpad)
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    let mouseX = -200;
    let mouseY = -200;
    let dotX = -200;
    let dotY = -200;
    let fazeX = -200;
    let fazeY = -200;
    let reqId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]') ||
          target.closest('input') ||
          target.closest('.car-card'))
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const animate = () => {
      // Snappy response for inner ring/dot
      dotX += (mouseX - dotX) * 0.22;
      dotY += (mouseY - dotY) * 0.22;

      // Gentle trailing drift for ambient white faze
      fazeX += (mouseX - fazeX) * 0.085;
      fazeY += (mouseY - fazeY) * 0.085;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      }
      if (cursorFazeRef.current) {
        cursorFazeRef.current.style.transform = `translate3d(${fazeX}px, ${fazeY}px, 0)`;
      }

      reqId = requestAnimationFrame(animate);
    };

    reqId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Ambient white haze/faze glow */}
      <div
        ref={cursorFazeRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform transition-all duration-300"
        style={{
          width: isHovering ? '360px' : '280px',
          height: isHovering ? '360px' : '280px',
          background: isHovering
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.015) 40%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Subtle core white faze ring & dot */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center pointer-events-none"
      >
        <div
          className={`rounded-full border border-white/30 bg-white/[0.04] backdrop-blur-[0.5px] transition-all duration-200 ease-out flex items-center justify-center ${
            isClicking
              ? 'scale-75 border-white/50 bg-white/20'
              : isHovering
              ? 'scale-150 border-white/60 bg-white/[0.12] shadow-[0_0_15px_rgba(255,255,255,0.25)]'
              : 'scale-100 shadow-[0_0_8px_rgba(255,255,255,0.15)]'
          }`}
          style={{ width: '22px', height: '22px' }}
        >
          <div
            className={`rounded-full bg-white transition-all duration-150 ${
              isHovering ? 'w-1 h-1 opacity-80' : 'w-1.5 h-1.5 opacity-100'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [activeSection, setActiveSection] = useState('hero');
  const [cppOutputVisible, setCppOutputVisible] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // 3D Carousel Refs and State
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const rotRef = useRef(0);
  const velRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isCapturedRef = useRef(false);
  const pidRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTRef = useRef(0);
  const movedRef = useRef(0);
  const txRef = useRef(0);
  const tyRef = useRef(0);
  const gxRef = useRef(0);
  const gyRef = useRef(0);
  const isVisibleRef = useRef(true);
  const radiusRef = useRef(240);

  // Copy email handler
  const handleCopyEmail = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CONTACT.email).then(() => {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2600);
      }).catch(() => {
        window.location.href = `mailto:${CONTACT.email}`;
      });
    } else {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  }, []);

  // Scroll Spy for active navigation highlight
  useEffect(() => {
    const sections = [
      { id: 'hero', element: document.getElementById('hero') },
      { id: 'about', element: document.getElementById('about') },
      { id: 'work', element: document.getElementById('work') },
      { id: 'skills', element: document.getElementById('skills') },
      { id: 'contact', element: document.getElementById('contact') }
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.element && sec.element.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 3D Carousel Layout and Animation Loop
  useEffect(() => {
    if (viewMode !== '3d') return;

    const stage = stageRef.current;
    const ring = ringRef.current;
    const tilt = tiltRef.current;
    if (!stage || !ring || !tilt) return;

    const n = PROJECTS.length;
    const step = 360 / n;

    const updateLayout = () => {
      const w = ring.offsetWidth || (window.innerWidth >= 1024 ? 340 : 260);
      const gap = window.innerWidth >= 1024 ? 180 : 110;
      const R = n > 1 ? (w / 2) / Math.tan(Math.PI / n) + gap : 0;
      radiusRef.current = R;

      cardsRef.current.forEach((el, i) => {
        if (el) {
          el.style.transform = `rotateY(${i * step}deg) translateZ(${R}px)`;
        }
      });
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DRIFT = 4.5;
    const DRAG = 0.38;
    const FRICTION = 0.94;
    const TILT = 6;

    let reqId: number;
    let prev = performance.now();

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      isDraggingRef.current = true;
      isCapturedRef.current = false;
      movedRef.current = 0;
      velRef.current = 0;
      pidRef.current = e.pointerId;
      lastXRef.current = e.clientX;
      lastTRef.current = performance.now();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') {
        const r = stage.getBoundingClientRect();
        gyRef.current = ((e.clientX - r.left) / r.width - 0.5) * TILT * 2;
        gxRef.current = -((e.clientY - r.top) / r.height - 0.5) * TILT * 2;
      }
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastXRef.current;
      const now = performance.now();
      const dt = Math.max(now - lastTRef.current, 1);
      movedRef.current += Math.abs(dx);
      if (!isCapturedRef.current && movedRef.current > 5) {
        stage.setPointerCapture(pidRef.current);
        isCapturedRef.current = true;
        stage.classList.add('dragging');
      }
      if (!isCapturedRef.current) return;
      rotRef.current += dx * DRAG;
      velRef.current = (dx * DRAG) / dt * 16;
      lastXRef.current = e.clientX;
      lastTRef.current = now;
    };

    const release = () => {
      isDraggingRef.current = false;
      stage.classList.remove('dragging');
    };

    const onPointerLeave = () => {
      gxRef.current = 0;
      gyRef.current = 0;
    };

    stage.addEventListener('pointerdown', onPointerDown);
    stage.addEventListener('pointermove', onPointerMove);
    stage.addEventListener('pointerup', release);
    stage.addEventListener('pointercancel', release);
    stage.addEventListener('pointerleave', onPointerLeave);

    const observer = new IntersectionObserver(entries => {
      if (entries[0]) {
        isVisibleRef.current = entries[0].isIntersecting;
      }
    });
    observer.observe(stage);

    const frame = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      if (isVisibleRef.current) {
        if (!isDraggingRef.current) {
          rotRef.current += velRef.current;
          velRef.current *= FRICTION;
          if (Math.abs(velRef.current) < 0.015) {
            velRef.current = 0;
          }
          if (!reduce && velRef.current === 0 && autoRotate) {
            rotRef.current += DRIFT * dt;
          }
        }

        txRef.current += (gxRef.current - txRef.current) * 0.08;
        tyRef.current += (gyRef.current - tyRef.current) * 0.08;

        tilt.style.transform = `rotateX(${txRef.current}deg) rotateY(${tyRef.current}deg)`;
        ring.style.transform = `translateZ(${-radiusRef.current}px) rotateY(${rotRef.current}deg)`;

        cardsRef.current.forEach((el, i) => {
          if (el) {
            const f = (Math.cos(((i * step + rotRef.current) * Math.PI) / 180) + 1) / 2;
            el.style.opacity = (0.35 + 0.65 * f).toFixed(3);
          }
        });
      }

      reqId = requestAnimationFrame(frame);
    };

    reqId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', updateLayout);
      stage.removeEventListener('pointerdown', onPointerDown);
      stage.removeEventListener('pointermove', onPointerMove);
      stage.removeEventListener('pointerup', release);
      stage.removeEventListener('pointercancel', release);
      stage.removeEventListener('pointerleave', onPointerLeave);
      observer.disconnect();
    };
  }, [viewMode, autoRotate]);

  const rotateCarouselBy = (direction: 'next' | 'prev') => {
    const step = 360 / PROJECTS.length;
    velRef.current = direction === 'next' ? -step * 0.15 : step * 0.15;
  };

  return (
    <div className="relative min-h-screen bg-[#131315] text-[#e5e1e4] font-sans selection:bg-white selection:text-black">
      <CursorMotion />

      {/* ========================================================= */}
      {/* TOP DESKTOP & MOBILE HEADER */}
      {/* ========================================================= */}
      <header className="fixed top-0 w-full z-50 bg-[#0e0e10]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
        <div className="h-16 px-4 sm:px-8 lg:px-12 max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="w-8 sm:w-12" />

          <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            <a
              href="#hero"
              className={`transition-colors py-1 ${activeSection === 'hero' ? 'text-white border-b border-white' : 'text-[#c5c7c9] hover:text-white'}`}
            >
              Home
            </a>
            <a
              href="#about"
              className={`transition-colors py-1 ${activeSection === 'about' ? 'text-white border-b border-white' : 'text-[#c5c7c9] hover:text-white'}`}
            >
              About
            </a>
            <a
              href="#work"
              className={`transition-colors py-1 ${activeSection === 'work' ? 'text-white border-b border-white' : 'text-[#c5c7c9] hover:text-white'}`}
            >
              Work
            </a>
            <a
              href="#skills"
              className={`transition-colors py-1 ${activeSection === 'skills' ? 'text-white border-b border-white' : 'text-[#c5c7c9] hover:text-white'}`}
            >
              Skills
            </a>
            <a
              href="#contact"
              className={`transition-colors py-1 ${activeSection === 'contact' ? 'text-white border-b border-white' : 'text-[#c5c7c9] hover:text-white'}`}
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-wider text-[#c5c7c9] hidden sm:inline">
              PRAKHAR JAIN
            </span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black shadow-inner">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* ATMOSPHERIC SVG VECTOR CONDUIT BACKGROUND */}
      {/* ========================================================= */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <svg
          className="telemetry-svg w-full h-full min-h-[2400px] opacity-80"
          preserveAspectRatio="none"
          viewBox="0 0 420 2200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient cx="50%" cy="18%" id="vignette-core" r="65%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.045" />
              <stop offset="60%" stopColor="#0e0e10" stopOpacity="0" />
            </radialGradient>
            <radialGradient cx="85%" cy="8%" id="light-bloom" r="35%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#131315" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="datum-fade-v" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="15%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="85%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="datum-fade-curved" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Background lighting */}
          <rect fill="url(#vignette-core)" height="2200" width="420" x="0" y="0" />
          <circle cx="360" cy="180" fill="url(#light-bloom)" r="260" />

          {/* Architectural Conduits & Spines */}
          <line stroke="url(#datum-fade-v)" strokeWidth="0.85" x1="32" x2="32" y1="80" y2="2160" />
          <line stroke="url(#datum-fade-v)" strokeWidth="0.85" x1="388" x2="388" y1="120" y2="2160" />

          {/* Curved Sweeps */}
          <path
            d="M 0 110 L 80 110 Q 110 110 110 140 L 110 390 Q 110 420 140 420 L 420 420"
            fill="none"
            stroke="url(#datum-fade-curved)"
            strokeWidth="0.9"
          />
          <path
            d="M 420 160 L 330 160 Q 300 160 300 190 L 300 520 Q 300 550 270 550 L 0 550"
            fill="none"
            stroke="url(#datum-fade-curved)"
            strokeWidth="0.85"
          />
          <path
            d="M 210 630 L 210 940 Q 210 970 170 970 L 32 970"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.18"
            strokeWidth="0.8"
          />
          <path
            d="M 388 1280 L 250 1280 Q 210 1280 210 1320 L 210 1720 Q 210 1760 170 1760 L 32 1760"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.2"
            strokeWidth="0.8"
          />

          {/* Dynamic Pulses */}
          <path
            className="animate-dash-slow"
            d="M 32 80 L 32 2160"
            fill="none"
            stroke="#ffffff"
            strokeDasharray="14, 180"
            strokeOpacity="0.75"
            strokeWidth="1.2"
          />
          <path
            className="animate-dash-med"
            d="M 0 110 L 80 110 Q 110 110 110 140 L 110 390 Q 110 420 140 420 L 420 420"
            fill="none"
            stroke="#ffffff"
            strokeDasharray="24, 220"
            strokeOpacity="0.85"
            strokeWidth="1.4"
          />
          <path
            className="animate-dash-reverse"
            d="M 420 160 L 330 160 Q 300 160 300 190 L 300 520 Q 300 550 270 550 L 0 550"
            fill="none"
            stroke="#ffffff"
            strokeDasharray="20, 200"
            strokeOpacity="0.75"
            strokeWidth="1.3"
          />

          {/* Technical Nodes & Crosshairs */}
          <g stroke="#ffffff" strokeOpacity="0.45" strokeWidth="0.8">
            <path d="M 28 110 H 36 M 32 106 V 114" />
            <path d="M 384 160 H 392 M 388 156 V 164" />
            <path d="M 106 140 H 114 M 110 136 V 144" />
            <path d="M 296 190 H 304 M 300 186 V 194" />
            <path d="M 206 630 H 214 M 210 626 V 634" />
            <path d="M 28 970 H 36 M 32 966 V 974" />
            <path d="M 384 1280 H 392 M 388 1276 V 1284" />
          </g>
        </svg>
      </div>

      {/* ========================================================= */}
      {/* MAIN CONTENT CONTAINER */}
      {/* ========================================================= */}
      <main className="relative z-10 flex flex-col w-full pt-20 pb-28 sm:pb-24 px-4 sm:px-6 lg:px-12 max-w-[1200px] mx-auto">
        {/* ======================================================= */}
        {/* SECTION 1: HERO VIEWPORT */}
        {/* ======================================================= */}
        <section id="hero" className="flex flex-col pt-8 sm:pt-14 pb-16 sm:pb-24 w-full">
          {/* Telemetry Coordinate Track */}
          <div className="flex items-center justify-between w-full pb-6 text-[#c5c7c9] border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] sm:text-xs text-white tracking-widest uppercase">
                LOC // DELHI NCR, INDIA
              </span>
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-[#8f9194] tracking-widest flex items-center gap-2">
              <span className="hidden sm:inline">SYS // ACTIVE</span>
              <span>28.6139° N, 77.2090° E</span>
            </div>
          </div>

          {/* Architectural Badge Capsule */}
          <div className="self-center mt-8 mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2a2a2c]/80 backdrop-blur-md border border-white/10 shadow-sm hover:border-white/20 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs text-[#e5e1e4] tracking-wider uppercase">
                USICT • GGSIPU • DELHI NCR
              </span>
              <span className="material-symbols-outlined text-[14px] text-[#8f9194]">north_east</span>
            </div>
          </div>

          {/* Core Verbatim Hero Headlines */}
          <div className="flex flex-col items-center text-center w-full">
            <span className="font-mono text-xs sm:text-sm text-[#c2c6d3] tracking-[0.24em] uppercase mb-2 font-medium">
              B.TECH IT STUDENT
            </span>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-[5.25rem] lg:leading-[1.05] text-white tracking-tight font-medium mb-3">
              PRAKHAR JAIN
            </h1>

            <h2 className="font-display text-lg sm:text-2xl text-[#e5e1e4] font-normal tracking-wide uppercase mb-5">
              LEARNING BY BUILDING.
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#c5c7c9] max-w-[340px] sm:max-w-[620px] mb-8 leading-relaxed">
              First-year IT student at USICT, GGSIPU. I build projects, join hackathons, and try to
              understand how things actually work. Still figuring things out.
            </p>

            {/* Interactive Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-[320px] sm:max-w-[460px]">
              <a
                href="#work"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-wider uppercase shadow-lg shadow-white/10 hover:bg-[#eaeaea] active:scale-[0.98] transition-all"
              >
                <span>View Projects</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
              <a
                href="#about"
                className="flex items-center justify-center w-full py-3.5 px-6 rounded-full bg-[#2a2a2c]/90 text-white font-mono text-xs font-semibold tracking-wider uppercase border border-white/10 hover:border-white/20 hover:bg-[#353437] active:scale-[0.98] transition-all"
              >
                <span>About Me</span>
              </a>
            </div>
          </div>

          {/* Telemetry Metric Pill Capsules */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5 w-full max-w-[660px] mx-auto mt-12 pt-6">
            <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1c1b1e] border border-white/[0.08] shadow-md hover:border-white/20 transition-colors">
              <span className="font-mono text-xs sm:text-sm text-white font-semibold">B.TECH IT</span>
              <span className="font-mono text-[10px] sm:text-xs text-[#8f9194] tracking-widest mt-1">
                USICT
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1c1b1e] border border-white/[0.08] shadow-md hover:border-white/20 transition-colors">
              <span className="font-mono text-xs sm:text-sm text-white font-semibold">01</span>
              <span className="font-mono text-[10px] sm:text-xs text-[#8f9194] tracking-widest mt-1">
                YEAR
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-[#1c1b1e] border border-white/[0.08] shadow-md hover:border-white/20 transition-colors">
              <span className="font-mono text-xs sm:text-sm text-white font-semibold">03</span>
              <span className="font-mono text-[10px] sm:text-xs text-[#8f9194] tracking-widest mt-1">
                PROJECTS
              </span>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* SECTION 2: ARCHITECTURAL FOUNDATION & ABOUT */}
        {/* ======================================================= */}
        <section id="about" className="flex flex-col pt-12 pb-16 sm:pb-24 w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              <span className="font-mono text-xs text-[#c5c7c9] uppercase tracking-widest">
                01 // ABOUT ME
              </span>
            </div>
            <span className="font-mono text-xs text-[#8f9194]">FOUNDATION</span>
          </div>

          <div className="flex flex-col p-6 sm:p-8 lg:p-10 lg:grid lg:grid-cols-2 lg:gap-x-12 rounded-2xl bg-[#1c1b1e] border border-white/[0.08] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="lg:col-start-1 space-y-1">
              <div className="about-text-glow group">
                <p className="font-sans text-base sm:text-lg text-white font-light leading-relaxed">
                  I'm a first-year B.Tech IT student at USICT, GGSIPU, still building my foundations and
                  learning by making things.
                </p>
              </div>
              <div className="about-text-glow group">
                <p className="font-sans text-sm sm:text-base text-[#c5c7c9] leading-relaxed">
                  Right now I'm strengthening my programming fundamentals, learning C++ and slowly getting
                  into data structures and algorithms. I enjoy building things and experimenting with web
                  experiences, and hackathons and projects are a big part of how I learn.
                </p>
              </div>
              <div className="about-text-glow group">
                <p className="font-sans text-sm sm:text-base text-[#c5c7c9] leading-relaxed">
                  I care more about understanding how things work under the hood than simply getting
                  something to work with AI.
                </p>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-[#2a2a2c] font-mono text-xs text-[#e5e1e4] border border-white/[0.06]">
                  B.Tech IT
                </span>
                <span className="px-3 py-1 rounded-full bg-[#2a2a2c] font-mono text-xs text-[#e5e1e4] border border-white/[0.06]">
                  USICT, GGSIPU
                </span>
                <span className="px-3 py-1 rounded-full bg-[#2a2a2c] font-mono text-xs text-[#e5e1e4] border border-white/[0.06]">
                  First Year
                </span>
                <span className="px-3 py-1 rounded-full bg-[#2a2a2c] font-mono text-xs text-[#e5e1e4] border border-white/[0.06]">
                  Delhi NCR, India
                </span>
              </div>
            </div>

            {/* Interactive Code Window */}
            <div className="mt-6 lg:mt-0 p-4 sm:p-5 rounded-xl bg-[#0e0e10] font-mono text-xs text-[#c2c6d3] leading-6 shadow-inner border border-white/[0.05] lg:col-start-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[#8f9194] pb-2 mb-3 border-b border-white/[0.07]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-white">MAIN.CPP</span>
                  </div>
                  <span className="text-[10px] tracking-wider uppercase text-[#c5c7c9]">BASIC C++</span>
                </div>

                <div className="space-y-0.5">
                  <div>
                    <span className="text-[#8f9194] select-none mr-3">01</span>
                    <span className="text-purple-400">#include</span>{' '}
                    <span className="text-emerald-400">&lt;iostream&gt;</span>
                  </div>
                  <div>
                    <span className="text-[#8f9194] select-none mr-3">02</span>
                    <span className="text-blue-400">int</span> <span className="text-yellow-300">main</span>() &#123;
                  </div>
                  <div>
                    <span className="text-[#8f9194] select-none mr-3">03</span>
                    &nbsp;&nbsp;std::cout &lt;&lt;{' '}
                    <span className="text-emerald-300">"Hello, world!"</span> &lt;&lt; std::endl;
                  </div>
                  <div>
                    <span className="text-[#8f9194] select-none mr-3">04</span>
                    &nbsp;&nbsp;<span className="text-purple-400">return</span> 0;
                  </div>
                  <div>
                    <span className="text-[#8f9194] select-none mr-3">05</span>
                    &#125;
                  </div>
                </div>

                {cppOutputVisible && (
                  <div className="mt-4 pt-3 border-t border-white/[0.08] text-[11px] text-emerald-400 animate-fadeIn">
                    <div className="text-[#8f9194]">// Terminal output:</div>
                    <div className="mt-1 font-semibold">&gt; Hello, world!</div>
                    <div className="text-[#8f9194] text-[10px] mt-0.5">
                      Process finished with exit code 0 (in 0.002s)
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-3 border-t border-white/[0.05] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCppOutputVisible(!cppOutputVisible)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#201f22] hover:bg-[#2c303a] text-white text-[11px] border border-white/10 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[14px] text-emerald-400">
                    {cppOutputVisible ? 'restart_alt' : 'play_arrow'}
                  </span>
                  <span>{cppOutputVisible ? 'Reset Terminal' : 'Run Program'}</span>
                </button>
                <span className="text-[10px] text-[#8f9194]">GCC 14.2 // C++23</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* SECTION 3: SELECTED WORK / PROJECTS */}
        {/* ======================================================= */}
        <section id="work" className="flex flex-col pt-8 pb-16 sm:pb-24 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full" />
              <span className="font-mono text-xs text-[#c5c7c9] uppercase tracking-widest">
                02 // PROJECTS
              </span>
            </div>

            {/* View Mode & Controls */}
            <div className="flex items-center gap-3">
              {viewMode === '3d' && (
                <div className="flex items-center gap-1.5 bg-[#1c1b1e] p-1 rounded-full border border-white/10">
                  <button
                    type="button"
                    onClick={() => rotateCarouselBy('prev')}
                    aria-label="Previous Project"
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAutoRotate(!autoRotate)}
                    title={autoRotate ? 'Pause Rotation' : 'Resume Auto Rotation'}
                    aria-label={autoRotate ? 'Pause Rotation' : 'Resume Auto Rotation'}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      autoRotate ? 'bg-white/15 text-white' : 'text-[#8f9194] hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {autoRotate ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => rotateCarouselBy('next')}
                    aria-label="Next Project"
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/10 text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              )}

              <div className="flex items-center bg-[#1c1b1e] p-1 rounded-full border border-white/10 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    viewMode === '3d' ? 'bg-white text-black font-semibold shadow' : 'text-[#8f9194] hover:text-white'
                  }`}
                >
                  3D Ring
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-full transition-all ${
                    viewMode === 'grid' ? 'bg-white text-black font-semibold shadow' : 'text-[#8f9194] hover:text-white'
                  }`}
                >
                  Grid View
                </button>
              </div>
            </div>
          </div>

          {/* 3D CAROUSEL VIEW */}
          {viewMode === '3d' ? (
            <div className="relative -mx-4 sm:mx-0">
              <div ref={stageRef} className="car-stage" id="carStage">
                <div ref={tiltRef} className="car-3d" id="carTilt">
                  <div ref={ringRef} className="car-3d" id="carRing">
                    {PROJECTS.map((p, idx) => (
                      <div
                        key={p.code}
                        ref={(el) => {
                          cardsRef.current[idx] = el;
                        }}
                        className="car-card group"
                        role="button"
                        tabIndex={0}
                        aria-label={`${p.name} details`}
                        onClick={() => {
                          if (movedRef.current < 6) {
                            setSelectedProject(p);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedProject(p);
                          }
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs text-[#8f9194] tracking-wider">{p.code}</span>
                          <span className="font-mono text-[11px] text-[#c2c6d3] uppercase bg-white/[0.06] px-2 py-0.5 rounded">
                            {p.category}
                          </span>
                        </div>

                        <h3 className="font-display text-lg sm:text-xl text-white uppercase font-medium mb-2 group-hover:text-emerald-300 transition-colors">
                          {p.name}
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-[#c5c7c9] line-clamp-4 leading-relaxed mb-4">
                          {p.summary}
                        </p>

                        <div className="flex-1" />

                        <div className="flex items-center justify-between pt-3 border-t border-white/[0.08]">
                          <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                            {p.chips.slice(0, 2).map((chip) => (
                              <span
                                key={chip}
                                className="px-2 py-0.5 rounded-full bg-[#2a2a2c] font-mono text-[10px] text-[#e5e1e4]"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                          <span className="font-mono text-[11px] text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            <span>DETAILS</span>
                            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="font-mono text-xs text-[#8f9194] text-center tracking-widest mt-2 uppercase">
                Swipe or drag to rotate • Tap a card for full details
              </p>
            </div>
          ) : (
            /* GRID VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((p) => (
                <div
                  key={p.code}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedProject(p)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(p);
                    }
                  }}
                  className="p-6 rounded-2xl bg-[#1c1b1e] border border-white/[0.08] hover:border-white/25 shadow-lg flex flex-col justify-between transition-all hover:-translate-y-1 cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-[#8f9194] tracking-wider">{p.code}</span>
                      <span className="font-mono text-[10px] text-[#c2c6d3] uppercase bg-white/[0.06] px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                    </div>

                    <h3 className="font-display text-xl text-white uppercase font-medium mb-2 group-hover:text-emerald-300 transition-colors">
                      {p.name}
                    </h3>

                    <p className="font-sans text-sm text-[#c5c7c9] leading-relaxed mb-4">
                      {p.summary}
                    </p>

                    {p.achievements && p.achievements.length > 0 && (
                      <div className="mb-4 space-y-2 border-t border-white/[0.06] pt-3">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] uppercase tracking-wider font-medium">
                          <span className="material-symbols-outlined text-[13px]">emoji_events</span>
                          <span>Achievements</span>
                        </div>
                        {p.achievements.map((ach, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-[#0e0e10] border border-emerald-500/20">
                            <span className="font-mono text-emerald-300 font-semibold block text-[11px] mb-0.5">
                              {ach.title}
                            </span>
                            <span className="font-sans text-[#c5c7c9] text-xs leading-snug line-clamp-2 block">
                              {ach.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.chips.map((chip) => (
                        <span
                          key={chip}
                          className="px-2 py-0.5 rounded-full bg-[#2a2a2c] font-mono text-[10px] text-[#e5e1e4]"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="font-mono text-xs text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>VIEW SPECIFICATION</span>
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                      {p.link && (
                        <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-0.5">
                          LIVE <span className="material-symbols-outlined text-[12px]">north_east</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ======================================================= */}
        {/* SECTION 4: ENGINEERING METRICS & SKILLS */}
        {/* ======================================================= */}
        <section id="skills" className="flex flex-col pt-8 pb-16 sm:pb-24 w-full">
          <div className="lg:grid lg:grid-cols-2 lg:gap-10 lg:items-start">
            {/* Column 1: Skills */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span className="font-mono text-xs text-[#c5c7c9] uppercase tracking-widest">
                    03 // SKILLS
                  </span>
                </div>
                <span className="font-mono text-xs text-[#8f9194]">TECHNICAL STACK</span>
              </div>

              <div className="flex flex-col p-6 rounded-2xl bg-[#1c1b1e] border border-white/[0.08] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="flex items-center gap-2 pb-4 border-b border-white/[0.06]">
                  <span className="material-symbols-outlined text-[20px] text-white">terminal</span>
                  <span className="font-mono text-xs text-white uppercase tracking-wider font-medium">
                    Core Technical Foundation
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="p-3.5 rounded-xl bg-[#0e0e10] flex flex-col gap-1 border border-white/[0.04]">
                    <span className="font-mono text-[10px] text-[#8f9194] tracking-widest">MARKUP</span>
                    <span className="font-sans text-sm text-white font-medium">HTML5</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0e0e10] flex flex-col gap-1 border border-white/[0.04]">
                    <span className="font-mono text-[10px] text-[#8f9194] tracking-widest">STYLING</span>
                    <span className="font-sans text-sm text-white font-medium">CSS3 / Modern Layouts</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0e0e10] flex flex-col gap-1 border border-white/[0.04]">
                    <span className="font-mono text-[10px] text-[#8f9194] tracking-widest">PROGRAMMING</span>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-sm text-white font-medium">Basic C++</span>
                      <span className="font-mono text-[10px] text-emerald-400">In Progress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Current Objectives */}
            <div className="mt-12 lg:mt-0">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full" />
                  <span className="font-mono text-xs text-[#c5c7c9] uppercase tracking-widest">
                    04 // CURRENT OBJECTIVE
                  </span>
                </div>
                <span className="font-mono text-xs text-[#8f9194]">2026 ROADMAP</span>
              </div>

              <div className="flex flex-col p-6 rounded-2xl bg-[#1c1b1e] border border-white/[0.08] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="space-y-3 pt-1">
                  {[
                    { num: '01', text: 'Strengthen C++ fundamentals' },
                    { num: '02', text: 'Learn DSA properly' },
                    { num: '03', text: 'Improve web development' },
                    { num: '04', text: 'Build better projects' },
                    { num: '05', text: 'Keep learning by shipping' }
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="p-3.5 rounded-xl bg-[#0e0e10] flex items-center gap-3.5 border border-white/[0.04] hover:border-white/20 transition-colors"
                    >
                      <span className="font-mono text-xs text-white font-semibold">{item.num}</span>
                      <span className="font-sans text-sm text-[#e5e1e4]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* SECTION 5: CONTACT & CONVERGENCE */}
        {/* ======================================================= */}
        <section id="contact" className="flex flex-col pt-8 pb-16 relative w-full text-center items-center">
          <div className="w-14 h-14 rounded-full bg-[#201f22] border border-white/10 flex items-center justify-center mb-4 shadow-lg shadow-black/40">
            <span className="material-symbols-outlined text-white text-[24px]">satellite_alt</span>
          </div>

          <span className="font-mono text-xs text-[#c2c6d3] tracking-[0.2em] uppercase mb-1 font-medium">
            CONTACT
          </span>

          <h3 className="font-display text-2xl sm:text-3xl text-white mb-2 font-medium">
            LET'S CONNECT
          </h3>

          <p className="font-sans text-sm text-[#c5c7c9] max-w-[360px] mb-8 leading-relaxed">
            Always happy to talk about projects, learning and hackathons.
          </p>

          <div className="flex flex-col gap-3 w-full max-w-[340px]">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full bg-white text-black font-mono text-xs tracking-wider uppercase font-semibold shadow-xl active:scale-[0.98] transition-all hover:bg-[#eaeaea]"
            >
              <span className="material-symbols-outlined text-[18px]">
                {copiedEmail ? 'check' : 'mail'}
              </span>
              <span>{copiedEmail ? `COPIED // ${CONTACT.email}` : 'Copy Email'}</span>
            </button>

            {/* Direct Email link alternative */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full bg-[#1c1b1e] text-[#e5e1e4] font-mono text-xs tracking-wider uppercase border border-white/10 hover:border-white/20 hover:bg-[#252427] transition-all"
            >
              <span>Direct Mail</span>
              <span className="material-symbols-outlined text-[14px]">send</span>
            </a>

            {/* Horizontal Social Media Tooltips (Uiverse-inspired) */}
            <div className="pt-6 pb-2 w-full flex justify-center">
              <ul className="uiverse-social-icons">
                <li className="icon-content">
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    data-social="linkedin"
                  >
                    <div className="filled" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-linkedin"
                      viewBox="0 0 16 16"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <div className="tooltip">LinkedIn</div>
                </li>

                <li className="icon-content">
                  <a
                    href={`https://github.com/${CONTACT.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    data-social="github"
                  >
                    <div className="filled" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-github"
                      viewBox="0 0 16 16"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <div className="tooltip">GitHub</div>
                </li>

                <li className="icon-content">
                  <a
                    href={`https://instagram.com/${CONTACT.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    data-social="instagram"
                  >
                    <div className="filled" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-instagram"
                      viewBox="0 0 16 16"
                      xmlSpace="preserve"
                    >
                      <path
                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <div className="tooltip">Instagram</div>
                </li>
              </ul>
            </div>
          </div>

          {/* Architectural Datum Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-16 mt-8 border-t border-white/[0.06] text-[#8f9194] font-mono text-xs gap-2">
            <span>© 2026 PRAKHAR JAIN</span>
            <span className="text-white/60">BUILT WHILE LEARNING</span>
            <span>USICT • GGSIPU</span>
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* PROJECT DETAILS MODAL / DRAWER */}
      {/* ========================================================= */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-6"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Panel */}
          <div className="relative w-full max-w-[620px] max-h-[85vh] overflow-y-auto bg-[#1c1b1e] border-t lg:border border-white/15 rounded-t-2xl lg:rounded-2xl p-6 sm:p-8 shadow-2xl z-10 animate-in slide-in-from-bottom duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <span className="font-mono text-xs text-[#8f9194] tracking-wider uppercase">
                {selectedProject.code} // {selectedProject.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close modal"
                className="w-8 h-8 rounded-full bg-[#2a2a2c] hover:bg-[#353437] text-white flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-white font-medium uppercase mb-3">
              {selectedProject.name}
            </h3>

            <p className="font-sans text-sm sm:text-base text-[#c5c7c9] leading-relaxed mb-6">
              {selectedProject.overview || selectedProject.summary}
            </p>

            {/* Key Aspects */}
            {selectedProject.points && selectedProject.points.length > 0 && (
              <div className="mb-6">
                <span className="font-mono text-xs text-[#8f9194] block uppercase tracking-wider mb-2">
                  Key Aspects
                </span>
                <ul className="space-y-2">
                  {selectedProject.points.map((pt, i) => (
                    <li key={i} className="flex gap-2.5 font-sans text-sm text-[#e5e1e4]">
                      <span className="text-[#8f9194] font-mono select-none">—</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Role */}
            {selectedProject.role && (
              <div className="p-3.5 rounded-xl bg-[#0e0e10] border border-white/[0.06] mb-3">
                <span className="font-mono text-[11px] text-[#8f9194] block uppercase tracking-wider mb-1">
                  My Role
                </span>
                <span className="font-sans text-sm text-white">{selectedProject.role}</span>
              </div>
            )}

            {/* Achievements */}
            {selectedProject.achievements && selectedProject.achievements.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] uppercase tracking-wider mb-2 font-medium">
                  <span className="material-symbols-outlined text-[15px]">emoji_events</span>
                  <span>Achievements</span>
                </div>
                <div className="space-y-2.5">
                  {selectedProject.achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#0e0e10] border border-emerald-500/30 shadow-inner"
                    >
                      <div className="font-mono text-xs text-emerald-300 font-semibold mb-1">
                        {ach.title}
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                        {ach.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.achievement && !selectedProject.achievements && (
              <div className="p-3.5 rounded-xl bg-[#0e0e10] border border-emerald-500/30 mb-3">
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] uppercase tracking-wider mb-1">
                  <span className="material-symbols-outlined text-[15px]">emoji_events</span>
                  <span>Achievement</span>
                </div>
                <span className="font-sans text-sm text-emerald-100">{selectedProject.achievement}</span>
              </div>
            )}

            {/* Context */}
            {selectedProject.context && (
              <div className="p-3.5 rounded-xl bg-[#0e0e10] border border-white/[0.06] mb-4">
                <span className="font-mono text-[11px] text-[#8f9194] block uppercase tracking-wider mb-1">
                  Context
                </span>
                <span className="font-sans text-sm text-[#c5c7c9]">{selectedProject.context}</span>
              </div>
            )}

            {/* Tech Stack */}
            {selectedProject.tech && selectedProject.tech.length > 0 && (
              <div className="mb-4">
                <span className="font-mono text-xs text-[#8f9194] block uppercase tracking-wider mb-2">
                  Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-[#2a2a2c] font-mono text-xs text-white border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Chips */}
            {selectedProject.chips && selectedProject.chips.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-2.5 py-1 rounded-full bg-white/[0.06] font-mono text-[11px] text-[#c5c7c9]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}

            {/* Action button */}
            {selectedProject.link ? (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-white text-black font-mono text-xs tracking-wider uppercase font-semibold shadow-lg hover:bg-[#eaeaea] transition-all"
              >
                <span>Visit Site</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            ) : (
              <div className="p-3 text-center rounded-xl bg-[#0e0e10] font-mono text-xs text-[#8f9194]">
                LIVE LINK COMING SOON
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {/* ========================================================= */}
      <nav className="lg:hidden fixed bottom-0 w-full z-40 bg-[#0e0e10]/90 backdrop-blur-xl border-t border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
        <div className="flex justify-around items-center h-16 px-4">
          <a
            href="#hero"
            className={`flex flex-col items-center justify-center min-w-[48px] py-1 transition-colors ${
              activeSection === 'hero' ? 'text-white font-semibold' : 'text-[#8f9194] hover:text-[#e5e1e4]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span className="font-mono text-[10px] uppercase tracking-wider mt-0.5">Hero</span>
          </a>

          <a
            href="#about"
            className={`flex flex-col items-center justify-center min-w-[48px] py-1 transition-colors ${
              activeSection === 'about' ? 'text-white font-semibold' : 'text-[#8f9194] hover:text-[#e5e1e4]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">terminal</span>
            <span className="font-mono text-[10px] uppercase tracking-wider mt-0.5">About</span>
          </a>

          <a
            href="#work"
            className={`flex flex-col items-center justify-center min-w-[48px] py-1 transition-colors ${
              activeSection === 'work' ? 'text-white font-semibold' : 'text-[#8f9194] hover:text-[#e5e1e4]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">code_blocks</span>
            <span className="font-mono text-[10px] uppercase tracking-wider mt-0.5">Work</span>
          </a>

          <a
            href="#skills"
            className={`flex flex-col items-center justify-center min-w-[48px] py-1 transition-colors ${
              activeSection === 'skills' ? 'text-white font-semibold' : 'text-[#8f9194] hover:text-[#e5e1e4]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">deployed_code</span>
            <span className="font-mono text-[10px] uppercase tracking-wider mt-0.5">Skills</span>
          </a>

          <a
            href="#contact"
            className={`flex flex-col items-center justify-center min-w-[48px] py-1 transition-colors ${
              activeSection === 'contact' ? 'text-white font-semibold' : 'text-[#8f9194] hover:text-[#e5e1e4]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">alternate_email</span>
            <span className="font-mono text-[10px] uppercase tracking-wider mt-0.5">Contact</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
