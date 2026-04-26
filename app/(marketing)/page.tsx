"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bell,
  Check,
  Clock3,
  Command,
  FileText,
  Fingerprint,
  Gauge,
  Layers3,
  Mail,
  MessageSquareText,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import {
  FadeIn,
  FloatingElement,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";

const reviewStreams = [
  "App Store",
  "Play Store",
  "Support inbox",
  "NPS verbatims",
];

const pulseRows = [
  {
    label: "Checkout failure on UPI",
    count: "428",
    sentiment: "Critical",
    color: "bg-[#ff5a3d]",
  },
  {
    label: "Portfolio screen feels instant",
    count: "312",
    sentiment: "Loved",
    color: "bg-[#10756D]",
  },
  {
    label: "KYC flow needs clearer states",
    count: "186",
    sentiment: "Watch",
    color: "bg-[#f4b740]",
  },
];

const proofMetrics = [
  ["18k", "reviews synthesized per run"],
  ["8 min", "from scrape to stakeholder-ready"],
  ["0.50$", "hard cost ceiling per report"],
  ["100%", "quotes verified against source text"],
];

function Navbar() {
  const { scrollY } = useScroll();
  const [isCondensed, setIsCondensed] = useState(false);
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScrollY.current;

    if (current < 32) {
      setIsCondensed(false);
    } else if (current > previous + 6) {
      setIsCondensed(true);
    } else if (current < previous - 6) {
      setIsCondensed(false);
    }

    lastScrollY.current = current;
  });

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <motion.div
        animate={isCondensed ? "compact" : "expanded"}
        variants={{
          expanded: {
            maxWidth: 960,
            paddingTop: 10,
            paddingBottom: 10,
            boxShadow: "0 20px 55px rgba(16,117,109,0.10)",
          },
          compact: {
            maxWidth: 820,
            paddingTop: 6,
            paddingBottom: 6,
            boxShadow: "0 14px 34px rgba(16,117,109,0.14)",
          },
        }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="mx-auto flex items-center justify-between overflow-hidden rounded-full border border-[#E6DDD0] bg-[#FAF6F0] px-4 sm:px-5"
      >
        <motion.div
          animate={isCondensed ? { scale: 0.95 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
        >
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#10756D] text-white shadow-[0_14px_35px_rgba(16,117,109,0.24)]">
              <Activity className="h-4 w-4" />
              <span className="absolute inset-x-1 top-1 h-px bg-white/55" />
            </span>
            <span className="text-[15px] font-semibold tracking-normal text-[#1A1A1A]">
              Pulse
            </span>
          </Link>
        </motion.div>

        <div className="hidden items-center gap-1 rounded-full border border-[#E6DDD0] bg-white p-1 md:flex">
          {[
            ["Intelligence", "#intelligence"],
            ["Workflow", "#workflow"],
            ["Trust", "#trust"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-full px-4 py-2 text-[12px] font-medium text-[#64748B] transition-colors duration-300 hover:bg-[#F5F0E8] hover:text-[#10756D]"
            >
              {label}
            </a>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-2 rounded-full bg-[#10756D] px-4 py-2.5 text-[12px] font-semibold text-white shadow-[0_18px_45px_rgba(16,117,109,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0A524C] sm:px-5"
        >
          Open Console
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </motion.nav>
  );
}

function AuroraField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#FAF6F0]" />
      {/* Main ambient orbs */}
      <div className="absolute left-[-18%] top-[-16%] h-[720px] w-[720px] rounded-full bg-[#10756D]/[0.14] blur-[130px]" />
      <div className="absolute right-[-14%] top-[2%] h-[580px] w-[580px] rounded-full bg-[#10756D]/[0.11] blur-[145px]" />
      <div className="absolute bottom-[-8%] left-[26%] h-[500px] w-[500px] rounded-full bg-[#0A524C]/[0.08] blur-[110px]" />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#10756D_1px,transparent_1px)] [background-size:34px_34px] opacity-[0.045]" />
      {/* Center highlight */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.92)_0%,rgba(250,246,240,0)_70%)]" />
    </div>
  );
}

function HeroConsole() {
  return (
    <FadeIn delay={0.7}>
      <div className="relative mx-auto mt-4 max-w-4xl px-1 sm:px-4">
        <FloatingElement duration={7}>
          <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/44 p-2 shadow-[0_28px_90px_rgba(16,117,109,0.16)] backdrop-blur-[42px]">
            <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(255,255,255,0.72),rgba(255,255,255,0.22)_42%,rgba(16,117,109,0.09))]" />
            <div className="relative rounded-[22px] border border-white/65 bg-[#fffdf9]/82 p-3 shadow-inner shadow-white/70 sm:p-4">
              <div className="flex flex-col gap-3 pb-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#10756D] text-white shadow-[0_16px_35px_rgba(16,117,109,0.22)]">
                    <Command className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-[13px] font-semibold text-[#1A1A1A]">
                      Product Voice Command Center
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      Weekly pulse generated 03:42 ago
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:flex">
                  {reviewStreams.map((stream) => (
                    <span
                      key={stream}
                      className="rounded-full border border-[#10756D]/10 bg-[#FAF6F0] px-3 py-2 text-[11px] font-medium text-[#64748B] shadow-sm"
                    >
                      {stream}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 pt-3 lg:grid-cols-[1.04fr_0.96fr]">
                <div className="rounded-[22px] border border-white/75 bg-white/70 p-4 shadow-[0_18px_60px_rgba(16,117,109,0.11)]">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#10756D]">
                        Live Theme Radar
                      </p>
                      <h3 className="mt-2 text-left text-[20px] font-semibold tracking-normal text-[#1A1A1A] sm:text-[24px]">
                        Signal, ranked by urgency.
                      </h3>
                    </div>
                    <div className="hidden rounded-full bg-[#10756D] px-3 py-2 text-[11px] font-semibold text-white sm:block">
                      4.8k new
                    </div>
                  </div>

                  <div className="space-y-3">
                    {pulseRows.map((row, index) => (
                      <div
                        key={row.label}
                        className="group grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-[#10756D]/8 bg-[#FFFCF7] p-2.5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#10756D]/30 hover:bg-white"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10756D] text-[12px] font-semibold text-white">
                          0{index + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-semibold text-[#1A1A1A]">
                            {row.label}
                          </p>
                          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8E1D8]">
                            <div
                              className={`${row.color} h-full rounded-full`}
                              style={{ width: `${88 - index * 18}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[13px] font-semibold text-[#1A1A1A]">
                            {row.count}
                          </p>
                          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#64748B]">
                            {row.sentiment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-[22px] border border-[#0A524C]/10 bg-[linear-gradient(160deg,#10756D_0%,#0A524C_100%)] p-4 text-left text-white shadow-[0_24px_70px_rgba(16,117,109,0.24)]">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radar className="h-4 w-4 text-[#D7F5F1]" />
                        <span className="text-[12px] font-semibold">Executive Brief</span>
                      </div>
                      <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white/70">
                        Auto-sent
                      </span>
                    </div>
                    <p className="text-[22px] font-semibold leading-[1.05] tracking-normal sm:text-[26px]">
                      3 risks, 2 wins, 5 product bets.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-[12px] text-white/62">
                      <Mail className="h-3.5 w-3.5" />
                      Monday 09:00 to leadership
                    </div>
                  </div>

                  <div className="rounded-[22px] border border-white/75 bg-[#FAF6F0] p-4 text-left shadow-[0_18px_45px_rgba(16,117,109,0.1)]">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-[#1A1A1A]">
                        Verbatim Guard
                      </span>
                      <ShieldCheck className="h-4 w-4 text-[#10756D]" />
                    </div>
                    <p className="mt-4 text-[13px] leading-6 text-[#64748B]">
                      &quot;Payment failed after OTP but money was debited.&quot;
                    </p>
                    <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#E7F3F1] px-3 py-2 text-[11px] font-semibold text-[#10756D]">
                      <span>Source matched</span>
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FloatingElement>
      </div>
    </FadeIn>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-24 sm:px-6 lg:pt-28">
      <AuroraField />

      {/* Floating ambient stat cards, visible on xl+ screens only */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute left-[3%] top-[48%] hidden -translate-y-1/2 rounded-2xl border border-[#10756D]/15 bg-white/90 px-3.5 py-3 shadow-[0_14px_44px_rgba(16,117,109,0.16)] backdrop-blur-md xl:block"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#ff5a3d]">
            <Bell className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#1A1A1A]">428 critical</p>
            <p className="text-[10px] text-[#64748B]">payment failures</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0], rotate: [1, -1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute right-[3%] top-[44%] hidden -translate-y-1/2 rounded-2xl border border-[#10756D]/15 bg-white/90 px-3.5 py-3 shadow-[0_14px_44px_rgba(16,117,109,0.16)] backdrop-blur-md xl:block"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#10756D]">
            <Star className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#1A1A1A]">312 loved</p>
            <p className="text-[10px] text-[#64748B]">portfolio speed</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        className="absolute right-[4%] top-[62%] hidden -translate-y-1/2 rounded-2xl border border-[#10756D]/15 bg-white/90 px-3.5 py-3 shadow-[0_14px_44px_rgba(16,117,109,0.16)] backdrop-blur-md xl:block"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#f4b740]">
            <Clock3 className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-[#1A1A1A]">8 min</p>
            <p className="text-[10px] text-[#64748B]">scrape to report</p>
          </div>
        </div>
      </motion.div>

      <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-5xl flex-col items-center justify-center text-center">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FadeIn delay={0.08}>
            <div className="liquid-glass mx-auto mb-5 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10756D] opacity-55" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10756D]" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-[#10756D]" />
              <span className="text-[11px] font-semibold tracking-[0.08em] text-[#1A1A1A] sm:text-[12px]">
                AI review intelligence for serious product teams
              </span>
            </div>
          </FadeIn>
        </motion.div>

        <FadeIn delay={0.16}>
          <h1 className="mx-auto max-w-3xl text-[42px] font-semibold leading-[1.06] tracking-[-0.01em] text-[#1A1A1A] sm:text-[56px] lg:text-[72px]">
            Know what
            <br />
            customers feel,
            <br />
            <span className="bg-gradient-to-r from-[#10756D] via-[#14907F] to-[#0A524C] bg-clip-text text-transparent">
              before metrics confess.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.28}>
          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-[#64748B] sm:text-[18px] sm:leading-8">
            Pulse turns raw app reviews into an executive-grade weekly command
            center: verified quotes, ranked themes, product actions, and
            stakeholder-ready reports without manual triage.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="group relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-[#10756D] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_22px_60px_rgba(16,117,109,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0A524C] sm:px-7"
            >
              <motion.span
                aria-hidden
                className="absolute inset-y-0 left-[-20%] w-16 rotate-12 bg-white/25 blur-xl"
                animate={{ x: ["-160%", "380%"] }}
                transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
              />
              <span className="relative z-10">Generate a premium pulse</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#showcase"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#10756D]/12 bg-white/58 px-6 py-3 text-[14px] font-semibold text-[#10756D] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white sm:px-7"
            >
              <Search className="h-4 w-4" />
              Explore the system
            </a>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}

function ShowcaseSection() {
  return (
    <section id="showcase" className="relative px-4 pb-8 pt-6 sm:px-6 sm:pb-12">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-8 text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#10756D]">
              Product Surface
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-7 text-[#64748B] sm:text-[15px]">
              One run turns scattered review noise into a polished weekly command
              center your team can actually act on.
            </p>
          </div>
        </FadeIn>

        <HeroConsole />
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="relative px-4 py-12 sm:px-6">
      <StaggerContainer className="mx-auto grid max-w-6xl gap-3 rounded-[28px] border border-white/70 bg-white/42 p-3 shadow-[0_24px_90px_rgba(16,117,109,0.10)] backdrop-blur-3xl sm:grid-cols-2 lg:grid-cols-4">
        {proofMetrics.map(([metric, label]) => (
          <StaggerItem key={label}>
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="rounded-3xl bg-white/62 px-5 py-6 text-center"
            >
              <p className="text-[32px] font-semibold tracking-normal text-[#1A1A1A]">
                {metric}
              </p>
              <p className="mt-2 text-[12px] font-medium text-[#758394]">
                {label}
              </p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

function IntelligenceSection() {
  const cards = [
    {
      icon: Layers3,
      title: "Theme architecture",
      text: "Clusters reviews into crisp product themes, separates symptoms from causes, and ranks the work by business urgency.",
    },
    {
      icon: MessageSquareText,
      title: "Quote integrity",
      text: "Every customer quote is checked against the original review text before it earns a place in the report.",
    },
    {
      icon: Gauge,
      title: "Run economics",
      text: "Token usage, retry behavior, and cost ceilings are visible by design so AI never becomes a mystery invoice.",
    },
  ];

  return (
    <section id="intelligence" className="relative overflow-hidden px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#10756D]">
              Intelligence Layer
            </p>
            <h2 className="mt-5 text-[38px] font-semibold leading-[1.02] tracking-normal text-[#1A1A1A] sm:text-[58px]">
              Built like a private analyst team, not a chatbot wrapper.
            </h2>
          </div>
        </FadeIn>

        <StaggerContainer className="mt-16 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <div className="group h-full rounded-[28px] border border-white/68 bg-white/46 p-6 shadow-[0_20px_75px_rgba(37,61,83,0.1)] backdrop-blur-3xl transition duration-300 hover:-translate-y-1 hover:bg-white/66">
                <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#10756D] text-white shadow-[0_16px_35px_rgba(16,117,109,0.2)]">
                  <card.icon className="h-5 w-5" />
                </div>
                <h3 className="text-[20px] font-semibold tracking-normal text-[#1A1A1A]">
                  {card.title}
                </h3>
                <p className="mt-4 text-[14px] leading-7 text-[#5f6d7d]">
                  {card.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    ["01", "Ingest", "Pull weeks of public app reviews and support text into one clean review lake."],
    ["02", "Scrub", "Remove sensitive identifiers before summaries or embeddings are generated."],
    ["03", "Synthesize", "Cluster, label, verify quotes, and turn each pattern into a product-ready action."],
    ["04", "Publish", "Ship a Google Doc archive and concise email brief to the people who move the roadmap."],
  ];

  return (
    <section id="workflow" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <FadeIn>
          <div className="lg:sticky lg:top-32">
            <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#10756D]">
              Workflow
            </p>
            <h2 className="mt-5 text-[38px] font-semibold leading-[1.02] tracking-normal text-[#1A1A1A] sm:text-[56px]">
              A weekly ritual that feels expensive because it saves one.
            </h2>
            <p className="mt-6 text-[16px] leading-8 text-[#5f6d7d]">
              Pulse replaces the messy review spreadsheet, the forgotten Slack
              thread, and the frantic pre-QBR analysis with one polished system.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {steps.map(([number, title, text], index) => (
            <FadeIn key={title} delay={index * 0.08}>
              <div className="grid gap-4 rounded-[28px] border border-white/70 bg-white/48 p-4 shadow-[0_18px_65px_rgba(37,61,83,0.1)] backdrop-blur-3xl sm:grid-cols-[88px_1fr] sm:p-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#10756D] text-[14px] font-semibold text-white sm:h-full sm:w-full">
                  {number}
                </div>
                <div className="rounded-3xl bg-white/58 p-5">
                  <h3 className="text-[22px] font-semibold tracking-normal text-[#1A1A1A]">
                    {title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-7 text-[#5f6d7d]">
                    {text}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  const trust = [
    [Fingerprint, "PII scrubbed before AI", "Emails, phones, and sensitive IDs are removed before the model sees customer language."],
    [FileText, "Auditable reports", "Published docs preserve themes, counts, quotes, and action recommendations for every run."],
    [Bell, "Stakeholders stay aligned", "A tight executive email lands with the full report link, so the team starts from the same signal."],
    [Clock3, "Idempotent backfills", "Past weeks can be re-run without duplicating already published sections."],
  ];

  return (
    <section id="trust" className="relative px-4 py-28 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[34px] border border-white/70 bg-[linear-gradient(160deg,#10756D_0%,#0A524C_100%)] p-4 text-white shadow-[0_36px_110px_rgba(16,117,109,0.24)] sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <FadeIn>
            <div className="p-3 sm:p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#E6F6F3]">
                Trust Surface
              </p>
              <h2 className="mt-5 text-[38px] font-semibold leading-[1.02] tracking-normal sm:text-[56px]">
                Premium is not shine. It is confidence.
              </h2>
              <p className="mt-6 max-w-xl text-[16px] leading-8 text-white/64">
                The experience is glossy, but the system underneath is strict:
                traceable quotes, scrubbed inputs, predictable costs, and clear
                run states.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-3 sm:grid-cols-2">
            {trust.map(([Icon, title, text]) => (
              <StaggerItem key={title as string}>
                <div className="rounded-[24px] border border-white/12 bg-white/[0.07] p-5 backdrop-blur-2xl">
                  <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#10756D]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-white">
                    {title as string}
                  </h3>
                  <p className="mt-3 text-[13px] leading-6 text-white/58">
                    {text as string}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative px-4 py-28 text-center sm:px-6">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="liquid-glass mx-auto inline-flex items-center gap-2 rounded-full px-4 py-2">
            <Star className="h-3.5 w-3.5 fill-[#f4b740] text-[#f4b740]" />
            <span className="text-[12px] font-semibold text-[#1A1A1A]">
              Designed for teams who cannot afford vague feedback
            </span>
          </div>
        </FadeIn>
        <FadeIn delay={0.12}>
          <h2 className="mx-auto mt-8 max-w-3xl text-[42px] font-semibold leading-[0.98] tracking-normal text-[#1A1A1A] sm:text-[72px]">
            Turn every review into roadmap leverage.
          </h2>
        </FadeIn>
        <FadeIn delay={0.24}>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-8 text-[#5f6d7d]">
            Start with one product, generate the first pulse, and give your
            team the customer signal they wish they had last Monday.
          </p>
        </FadeIn>
        <FadeIn delay={0.36}>
          <Link
            href="/dashboard"
            className="group mt-10 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#10756D] px-7 py-3.5 text-[14px] font-semibold text-white shadow-[0_22px_65px_rgba(16,117,109,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0A524C]"
          >
            Open Pulse Console
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 rounded-[26px] border border-white/60 bg-white/38 px-5 py-5 text-[12px] text-[#758394] backdrop-blur-2xl md:flex-row">
        <div className="flex items-center gap-2 text-[#1A1A1A]">
          <Activity className="h-4 w-4" />
          <span className="font-semibold">Pulse Agent</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#intelligence" className="transition-colors hover:text-[#10756D]">
            Intelligence
          </a>
          <a href="#workflow" className="transition-colors hover:text-[#10756D]">
            Workflow
          </a>
          <a href="#trust" className="transition-colors hover:text-[#10756D]">
            Trust
          </a>
        </div>
        <p>© 2026 Pulse Agent</p>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF6F0] text-[#1A1A1A]">
      <Navbar />
      <Hero />
      <ShowcaseSection />
      <ProofStrip />
      <IntelligenceSection />
      <WorkflowSection />
      <TrustSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
