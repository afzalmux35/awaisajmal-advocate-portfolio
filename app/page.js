'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import {
  Menu, X, Phone, Mail, MapPin, Clock, ChevronDown, ArrowUp, Star, Quote,
  Gavel, Scale, Users, Home, Landmark, Building2, ShoppingCart, Receipt,
  FileText, HardHat, Banknote, KeyRound, ShieldCheck, Eye, Award, Lock,
  Search, Handshake, Clock3, TrendingUp, Target, Send, MessageCircle,
  Facebook, Linkedin, Instagram, Scale3d, BookOpen, GraduationCap, Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import siteConfig from '@/lib/siteConfig'

// ---------------------------------------------------------------------------
// Icon maps
// ---------------------------------------------------------------------------
const practiceIcons = {
  gavel: Gavel, scale: Scale, users: Users, home: Home, landmark: Landmark,
  building: Building2, cart: ShoppingCart, receipt: Receipt, file: FileText,
  hardhat: HardHat, bank: Banknote, key: KeyRound,
}
const whyIcons = {
  shield: ShieldCheck, eye: Eye, award: Award, lock: Lock, search: Search,
  handshake: Handshake, balance: Scale, clock: Clock3, trending: TrendingUp, target: Target,
}
const socialIcons = { facebook: Facebook, linkedin: Linkedin, instagram: Instagram, whatsapp: MessageCircle }

// ---------------------------------------------------------------------------
// Reusable motion helpers
// ---------------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
}

function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`${center ? 'text-center mx-auto' : ''} max-w-3xl mb-14`}>
      <Reveal>
        <span className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-gold/80 font-medium">
          <span className="h-px w-8 bg-gold/50" />
          {eyebrow}
          <span className="h-px w-8 bg-gold/50" />
        </span>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-5 leading-tight">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={2}>
          <p className="text-muted-foreground mt-5 text-base md:text-lg leading-relaxed">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}

// Count-up number
function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf
    const dur = 2000
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(to)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

// Floating gold particles
function Particles({ count = 26 }) {
  const [parts, setParts] = useState([])
  useEffect(() => {
    const arr = Array.from({ length: count }).map(() => ({
      left: Math.random() * 100,
      size: 2 + Math.random() * 5,
      dur: 12 + Math.random() * 18,
      delay: Math.random() * 12,
      opacity: 0.3 + Math.random() * 0.6,
    }))
    setParts(arr)
  }, [count])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {parts.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  )
}

// Cursor glow (desktop)
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e) => {
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return <div ref={ref} className="cursor-glow hidden lg:block" />
}

// ---------------------------------------------------------------------------
// Loading screen
// ---------------------------------------------------------------------------
function Loader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center"
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl animate-glow-pulse" />
              <div className="relative h-24 w-24 rounded-full gold-border flex items-center justify-center">
                <Scale className="h-10 w-10 text-gold" />
              </div>
            </div>
            <div className="font-display text-3xl mt-6 gold-text font-bold tracking-wider">AA</div>
            <div className="text-xs tracking-[0.4em] uppercase text-muted-foreground mt-2">Advocate High Court</div>
            <div className="w-48 h-[3px] bg-charcoal rounded-full mt-6 overflow-hidden">
              <motion.div
                className="h-full loader-bar rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-3 glass border-b border-gold/15' : 'py-5 bg-transparent'
        }`}
      >
        <nav className="container flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-full gold-border flex items-center justify-center font-display font-bold text-gold text-lg group-hover:bg-gold/10 transition-colors">
              AA
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-display font-semibold text-white text-lg">Awais Ajmal</div>
              <div className="text-[10px] tracking-[0.25em] uppercase text-gold/70">Advocate High Court</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {siteConfig.nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="relative text-sm text-white/80 hover:text-gold transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full"
              >
                {n.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${siteConfig.contact.phoneDial}`}>
              <Button className="bg-gold text-ink hover:bg-gold-light font-medium rounded-full px-5 gap-2">
                <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
              </Button>
            </a>
          </div>

          <button className="lg:hidden text-gold" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="h-7 w-7" />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
              className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-charcoal border-l border-gold/20 p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-display text-2xl gold-text font-bold">AA</span>
                <button onClick={() => setOpen(false)} className="text-gold"><X className="h-7 w-7" /></button>
              </div>
              <div className="flex flex-col gap-5">
                {siteConfig.nav.map((n) => (
                  <a key={n.href} href={n.href} onClick={() => setOpen(false)}
                    className="text-lg text-white/85 hover:text-gold transition-colors">
                    {n.label}
                  </a>
                ))}
              </div>
              <a href={`tel:${siteConfig.contact.phoneDial}`} className="mt-auto">
                <Button className="w-full bg-gold text-ink hover:bg-gold-light rounded-full gap-2">
                  <Phone className="h-4 w-4" /> {siteConfig.contact.phone}
                </Button>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const yPortrait = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const onMove = (e) => {
    const { innerWidth, innerHeight } = window
    setTilt({ x: (e.clientX / innerWidth - 0.5) * 20, y: (e.clientY / innerHeight - 0.5) * 20 })
  }

  return (
    <section id="home" ref={ref} onMouseMove={onMove} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <img src={siteConfig.images.heroBg} alt="High Court" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </motion.div>
      <div className="absolute inset-0 z-[1] mesh-bg" />
      <Particles count={22} />

      <div className="container relative z-10 pt-28 pb-20 grid lg:grid-cols-12 gap-10 items-center">
        {/* Text */}
        <motion.div style={{ opacity }} className="lg:col-span-7">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs tracking-[0.2em] uppercase text-white/80">{siteConfig.membership}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="font-display font-black leading-[0.95] text-shadow-lux"
          >
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white">AWAIS</span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl gold-text">AJMAL</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}
            className="mt-6 space-y-1.5">
            <p className="text-xl md:text-2xl font-display text-white/95">{siteConfig.designation}</p>
            <p className="text-sm md:text-base tracking-[0.25em] text-gold/90 uppercase">{siteConfig.credentials}</p>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-7 text-lg md:text-xl text-white/70 font-display italic max-w-xl border-l-2 border-gold/60 pl-5">
            &ldquo;{siteConfig.tagline}&rdquo;
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-9 flex flex-wrap gap-4">
            <a href="#contact">
              <Button size="lg" className="bg-gold text-ink hover:bg-gold-light rounded-full px-8 h-12 font-semibold gold-glow">
                Book Consultation
              </Button>
            </a>
            <a href="#about">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-gold/40 text-white hover:bg-gold/10 hover:text-gold bg-transparent">
                View Profile
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <motion.div
          style={{ y: yPortrait }}
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 1 }}
          className="lg:col-span-5 hidden md:block"
        >
          <div
            className="relative mx-auto max-w-sm"
            style={{ transform: `translate(${tilt.x}px, ${tilt.y}px)`, transition: 'transform 0.3s ease-out' }}
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-gold/30 via-transparent to-gold/10 blur-2xl animate-glow-pulse" />
            <div className="relative rounded-[1.8rem] overflow-hidden gold-border animate-float-slow bg-gradient-to-b from-charcoal via-ink to-black">
              <img src={siteConfig.images.heroPortrait} alt="Awais Ajmal" className="w-full h-[520px] object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 glass rounded-xl p-4">
                <div className="font-display text-lg text-white">Muhammad Awais Ajmal</div>
                <div className="text-xs text-gold/90 tracking-wider uppercase">Advocate High Court · Multan</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60"
        animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="h-5 w-5 text-gold" />
      </motion.a>
    </section>
  )
}

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------
function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container grid lg:grid-cols-2 gap-14 items-center">
        <Reveal className="relative">
          <div className="relative">
            <div className="absolute -top-6 -left-6 h-24 w-24 border-t-2 border-l-2 border-gold/60 rounded-tl-3xl" />
            <div className="absolute -bottom-6 -right-6 h-24 w-24 border-b-2 border-r-2 border-gold/60 rounded-br-3xl" />
            <div className="rounded-2xl overflow-hidden gold-glow bg-gradient-to-b from-charcoal via-ink to-black">
              <img src={siteConfig.images.aboutPortrait} alt="About Awais Ajmal" className="w-full h-[560px] object-cover object-top" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 glass rounded-2xl px-8 py-5 flex items-center gap-4 gold-border">
              <div className="text-center">
                <div className="font-display text-4xl gold-text font-bold"><Counter to={12} suffix="+" /></div>
                <div className="text-[10px] tracking-widest uppercase text-white/70">Years of<br />Experience</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionHeading center={false} eyebrow="About" title={siteConfig.about.heading} />
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            {siteConfig.about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i}><p>{p}</p></Reveal>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {siteConfig.about.stats.map((s, i) => (
              <Reveal key={s.label} delay={i}>
                <div className="glass rounded-xl p-5 text-center hover:border-gold/40 transition-colors">
                  <div className="font-display text-2xl md:text-3xl gold-text font-bold"><Counter to={s.value} suffix={s.suffix} /></div>
                  <div className="text-[11px] text-white/60 mt-1 leading-tight">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Qualifications timeline
// ---------------------------------------------------------------------------
function Qualifications() {
  return (
    <section id="qualifications" className="relative py-24 md:py-32 bg-charcoal/40">
      <div className="container">
        <SectionHeading eyebrow="Qualifications" title="Academic & Professional Journey"
          subtitle="A foundation built on rigorous education, continuous learning, and formal enrollment before the highest courts." />

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/10 via-gold/50 to-gold/10 md:-translate-x-1/2" />
          <div className="space-y-10">
            {siteConfig.qualifications.map((q, i) => {
              const left = i % 2 === 0
              return (
                <Reveal key={q.title} delay={i % 3}>
                  <div className={`relative flex md:items-center gap-6 ${left ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`hidden md:block md:w-1/2 ${left ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <QualCard q={q} />
                    </div>
                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
                      <div className="h-8 w-8 rounded-full bg-ink gold-border flex items-center justify-center">
                        <GraduationCap className="h-4 w-4 text-gold" />
                      </div>
                    </div>
                    <div className="md:hidden pl-14 w-full"><QualCard q={q} /></div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
function QualCard({ q }) {
  return (
    <div className="glass rounded-xl p-6 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 inline-block w-full">
      <span className="text-[10px] tracking-[0.25em] uppercase text-gold/80">{q.year}</span>
      <h3 className="font-display text-xl text-white mt-1.5">{q.title}</h3>
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{q.desc}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Practice Areas
// ---------------------------------------------------------------------------
function PracticeAreas() {
  return (
    <section id="practice" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading eyebrow="Practice Areas" title="Comprehensive Legal Expertise"
          subtitle="From criminal defence to corporate counsel, dedicated representation across the full spectrum of law." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.practiceAreas.map((a, i) => {
            const Icon = practiceIcons[a.icon] || Scale
            return (
              <Reveal key={a.title} delay={i % 3}>
                <div className="group relative glass rounded-2xl p-7 h-full overflow-hidden hover:-translate-y-2 transition-all duration-400 hover:border-gold/50">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative h-14 w-14 rounded-xl bg-gradient-to-br from-gold/20 to-transparent border border-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7 text-gold" />
                  </div>
                  <h3 className="font-display text-xl text-white mt-5">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a.desc}</p>
                  <div className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-gold to-transparent transition-all duration-500" />
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Why Choose
// ---------------------------------------------------------------------------
function WhyChoose() {
  return (
    <section className="relative py-24 md:py-32 bg-charcoal/40 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-60" />
      <div className="container relative">
        <SectionHeading eyebrow="Why Choose Awais Ajmal" title="Principles That Define the Practice"
          subtitle="Trust is earned. These are the values behind every case, every client, every courtroom appearance." />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {siteConfig.whyChoose.map((w, i) => {
            const Icon = whyIcons[w.icon] || ShieldCheck
            return (
              <Reveal key={w.title} delay={i % 5}>
                <div className="group glass rounded-2xl p-6 h-full text-center hover:border-gold/50 hover:bg-gold/[0.04] transition-all duration-300">
                  <div className="mx-auto h-12 w-12 rounded-full border border-gold/30 flex items-center justify-center group-hover:animate-float">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-display text-base text-white mt-4">{w.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Achievements
// ---------------------------------------------------------------------------
function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-28">
      <div className="container">
        <SectionHeading eyebrow="Achievements" title="A Record of Excellence" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {siteConfig.achievements.map((a, i) => (
            <Reveal key={a.label} delay={i % 6}>
              <div className="glass rounded-2xl p-6 text-center hover:border-gold/40 transition-colors">
                <div className="font-display text-3xl md:text-4xl gold-text font-bold">
                  <Counter to={a.value} suffix={a.suffix} />
                </div>
                <div className="text-[11px] tracking-wider uppercase text-white/60 mt-2">{a.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Case Studies
// ---------------------------------------------------------------------------
function CaseStudies() {
  return (
    <section className="relative py-24 md:py-32 bg-charcoal/40">
      <div className="container">
        <SectionHeading eyebrow="Case Study Showcase" title="Selected Matters"
          subtitle="Illustrative examples of complex challenges met with strategy, research and dedication. (Details anonymised.)" />
        <div className="grid md:grid-cols-2 gap-6">
          {siteConfig.caseStudies.map((c, i) => (
            <Reveal key={c.title} delay={i % 2}>
              <div className="group glass rounded-2xl p-8 h-full hover:border-gold/50 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-gold/90 glass-soft rounded-full px-3 py-1">{c.category}</span>
                  <Gavel className="h-5 w-5 text-gold/60 group-hover:rotate-12 transition-transform" />
                </div>
                <h3 className="font-display text-2xl text-white mt-4">{c.title}</h3>
                <div className="mt-5 space-y-3 text-sm">
                  <div><span className="text-gold/90 font-medium">Challenge · </span><span className="text-muted-foreground">{c.challenge}</span></div>
                  <div><span className="text-gold/90 font-medium">Approach · </span><span className="text-muted-foreground">{c.approach}</span></div>
                  <div><span className="text-gold/90 font-medium">Outcome · </span><span className="text-white/85">{c.outcome}</span></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
function Testimonials() {
  const items = siteConfig.testimonials
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % items.length), 6000)
    return () => clearInterval(t)
  }, [items.length])

  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 mesh-bg opacity-50" />
      <div className="container relative">
        <SectionHeading eyebrow="Testimonials" title="Voices of Trust" />
        <div className="max-w-3xl mx-auto relative min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
              transition={{ duration: 0.6 }}
              className="glass rounded-3xl p-9 md:p-12 text-center gold-glow"
            >
              <Quote className="h-10 w-10 text-gold/50 mx-auto" />
              <div className="flex justify-center gap-1 mt-4">
                {Array.from({ length: items[idx].rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-display text-xl md:text-2xl text-white/90 italic leading-relaxed mt-5">
                &ldquo;{items[idx].text}&rdquo;
              </p>
              <div className="mt-7 flex items-center justify-center gap-3">
                <div className="h-12 w-12 rounded-full gold-border flex items-center justify-center font-display text-gold text-lg">
                  {items[idx].name.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">{items[idx].name}</div>
                  <div className="text-xs text-gold/80 uppercase tracking-wider">{items[idx].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-8">
            {items.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all ${i === idx ? 'w-8 bg-gold' : 'w-2 bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------
function Gallery() {
  const [selected, setSelected] = useState(null)
  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-charcoal/40">
      <div className="container">
        <SectionHeading eyebrow="Gallery" title="Moments in Practice"
          subtitle="Courtrooms, chambers, seminars and the quiet discipline of legal research." />
        <div className="masonry">
          {siteConfig.gallery.map((g, i) => (
            <Reveal key={i} delay={i % 3}>
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer gold-border/0 hover:gold-border transition-all"
                onClick={() => setSelected(g)}>
                <img src={g.src} alt={g.caption} loading="lazy"
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="font-display text-lg text-white">{g.caption}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-ink/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-white/80 hover:text-gold"><X className="h-8 w-8" /></button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 22 }}
              className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden gold-border">
                <img src={selected.src} alt={selected.caption} className="w-full max-h-[75vh] object-contain bg-ink" />
              </div>
              <p className="text-center font-display text-xl text-gold mt-4">{selected.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Philosophy
// ---------------------------------------------------------------------------
function Philosophy() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <img src={siteConfig.images.justiceScales} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 mesh-bg" />
      <Particles count={16} />
      <div className="container relative text-center max-w-4xl">
        <Reveal>
          <Scale className="h-12 w-12 text-gold mx-auto mb-8 animate-float" />
        </Reveal>
        <Reveal delay={1}>
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-white italic">
            &ldquo;{siteConfig.philosophy.split('\u2014')[0]}<span className="gold-text">&mdash;{siteConfig.philosophy.split('\u2014')[1]}</span>&rdquo;
          </blockquote>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-8 text-sm tracking-[0.3em] uppercase text-gold/80">Muhammad Awais Ajmal</div>
        </Reveal>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Consultation CTA
// ---------------------------------------------------------------------------
function ConsultationCTA() {
  return (
    <section className="relative py-20">
      <div className="container">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-dark animate-gradient-move" style={{ backgroundSize: '200% 200%' }} />
            <div className="relative bg-ink/85 m-[2px] rounded-3xl p-10 md:p-16 text-center">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white">Need Trusted Legal Representation?</h2>
              <p className="text-white/70 mt-4 max-w-2xl mx-auto">Every strong case begins with an honest conversation. Reach out today for a confidential consultation.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a href="#contact">
                  <Button size="lg" className="bg-gold text-ink hover:bg-gold-light rounded-full px-8 h-12 font-semibold gold-glow">Book Appointment</Button>
                </a>
                <a href={`tel:${siteConfig.contact.phoneDial}`}>
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-gold/50 text-white hover:bg-gold/10 hover:text-gold bg-transparent gap-2">
                    <Phone className="h-4 w-4" /> Call Now
                  </Button>
                </a>
                <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-gold/50 text-white hover:bg-gold/10 hover:text-gold bg-transparent gap-2">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------
function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.message) {
      toast.error('Please fill in your name, phone and message.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSent(true)
        toast.success('Message sent successfully!')
        setForm({ name: '', phone: '', email: '', subject: '', message: '' })
        setTimeout(() => setSent(false), 4000)
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const info = [
    { icon: Phone, label: 'Phone', value: siteConfig.contact.phone, href: `tel:${siteConfig.contact.phoneDial}` },
    { icon: Mail, label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { icon: MapPin, label: 'Office', value: siteConfig.contact.address, href: siteConfig.contact.mapUrl },
    { icon: Clock, label: 'Working Hours', value: siteConfig.contact.hours, href: null },
  ]

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading eyebrow="Contact" title="Let Us Discuss Your Case"
          subtitle="Confidential, honest and prompt. Share your matter and Awais Ajmal will respond personally." />
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-5">
            {info.map((it, i) => (
              <Reveal key={it.label} delay={i}>
                <a href={it.href || undefined} target={it.href && it.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  className={`flex items-start gap-4 glass rounded-2xl p-6 ${it.href ? 'hover:border-gold/40 cursor-pointer' : ''} transition-colors`}>
                  <div className="h-12 w-12 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                    <it.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-widest uppercase text-gold/80">{it.label}</div>
                    <div className="text-white/90 mt-1">{it.value}</div>
                  </div>
                </a>
              </Reveal>
            ))}
            <Reveal delay={4}>
              <div className="rounded-2xl overflow-hidden gold-border h-48">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps?q=District+Courts+Multan&output=embed"
                  className="w-full h-full grayscale contrast-125"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={1}>
            <form onSubmit={submit} className="glass rounded-3xl p-8 space-y-4 relative overflow-hidden">
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 bg-ink/95 flex flex-col items-center justify-center text-center p-8"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}
                      className="h-20 w-20 rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center">
                      <Send className="h-8 w-8 text-gold" />
                    </motion.div>
                    <h3 className="font-display text-2xl text-white mt-6">Message Sent</h3>
                    <p className="text-muted-foreground mt-2">Thank you. Awais Ajmal will reach out to you shortly.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/70 mb-1.5 block">Full Name *</label>
                  <Input value={form.name} onChange={update('name')} placeholder="Your name"
                    className="bg-charcoal/60 border-white/10 focus-visible:ring-gold h-11" />
                </div>
                <div>
                  <label className="text-xs text-white/70 mb-1.5 block">Phone *</label>
                  <Input value={form.phone} onChange={update('phone')} placeholder="+92 3XX XXXXXXX"
                    className="bg-charcoal/60 border-white/10 focus-visible:ring-gold h-11" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/70 mb-1.5 block">Email</label>
                  <Input value={form.email} onChange={update('email')} type="email" placeholder="you@example.com"
                    className="bg-charcoal/60 border-white/10 focus-visible:ring-gold h-11" />
                </div>
                <div>
                  <label className="text-xs text-white/70 mb-1.5 block">Subject</label>
                  <Input value={form.subject} onChange={update('subject')} placeholder="Matter type"
                    className="bg-charcoal/60 border-white/10 focus-visible:ring-gold h-11" />
                </div>
              </div>
              <div>
                <label className="text-xs text-white/70 mb-1.5 block">Message *</label>
                <Textarea value={form.message} onChange={update('message')} rows={5} placeholder="Briefly describe your legal matter..."
                  className="bg-charcoal/60 border-white/10 focus-visible:ring-gold resize-none" />
              </div>
              <Button type="submit" disabled={loading}
                className="w-full bg-gold text-ink hover:bg-gold-light rounded-full h-12 font-semibold gap-2 gold-glow">
                {loading ? 'Sending...' : <>Send Message <Send className="h-4 w-4" /></>}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------
function Footer() {
  return (
    <footer className="relative border-t border-gold/15 pt-16 pb-8 bg-charcoal/40">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full gold-border flex items-center justify-center font-display font-bold text-gold text-lg">AA</div>
              <div>
                <div className="font-display font-semibold text-white text-lg">Awais Ajmal</div>
                <div className="text-[10px] tracking-widest uppercase text-gold/70">Advocate High Court</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{siteConfig.tagline}</p>
            <div className="flex gap-3 mt-5">
              {siteConfig.social.map((s) => {
                const Icon = socialIcons[s.icon] || Facebook
                return (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full glass flex items-center justify-center hover:border-gold/50 hover:text-gold text-white/70 transition-colors">
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="font-display text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.nav.map((n) => (
                <li key={n.href}><a href={n.href} className="text-muted-foreground hover:text-gold transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white mb-4">Practice Areas</h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.practiceAreas.slice(0, 6).map((a) => (
                <li key={a.title}><a href="#practice" className="text-muted-foreground hover:text-gold transition-colors">{a.title}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> {siteConfig.contact.phone}</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> {siteConfig.contact.email}</li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-gold mt-0.5" /> {siteConfig.contact.address}</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" /> {siteConfig.contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Muhammad Awais Ajmal · Advocate High Court. All rights reserved.</p>
          <p>Justice · Integrity · Commitment</p>
        </div>
      </div>
    </footer>
  )
}

// Back to top
function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 h-12 w-12 rounded-full bg-gold text-ink flex items-center justify-center shadow-lg gold-glow hover:bg-gold-light"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Floating WhatsApp
function FloatingWhatsApp() {
  return (
    <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 h-13 w-13 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      style={{ height: 52, width: 52 }} aria-label="WhatsApp">
      <MessageCircle className="h-6 w-6 text-white" />
    </a>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function App() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1900)
    return () => clearTimeout(t)
  }, [])

  return (
    <main className="relative bg-ink text-white min-h-screen overflow-x-hidden">
      <Loader done={loaded} />
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Qualifications />
      <PracticeAreas />
      <WhyChoose />
      <Achievements />
      <CaseStudies />
      <Testimonials />
      <Gallery />
      <Philosophy />
      <ConsultationCTA />
      <Contact />
      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
      <Toaster position="top-center" theme="dark" richColors />
    </main>
  )
}
