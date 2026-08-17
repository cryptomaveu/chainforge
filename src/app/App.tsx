import { useState, useRef, type ReactNode, type CSSProperties } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, Upload, Twitter, Linkedin, Globe, X } from "lucide-react";
import logoImg from "@/imports/_39ea12f_400x400.jpg";

type Screen = "home" | "freelancer" | "project" | "program";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @keyframes cf-marquee {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .cf-marquee-track {
      display: flex;
      width: max-content;
      animation: cf-marquee 30s linear infinite;
    }
    .cf-marquee-wrap {
      overflow: hidden;
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
      mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    }
    @keyframes cf-float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33%       { transform: translateY(-10px) rotate(1deg); }
      66%       { transform: translateY(-5px) rotate(-1deg); }
    }
    @keyframes cf-glow-pulse {
      0%, 100% { filter: drop-shadow(0 0 14px rgba(254,134,2,0.45)); }
      50%       { filter: drop-shadow(0 0 32px rgba(254,134,2,0.9)); }
    }
    .cf-float-logo {
      animation: cf-float 6s ease-in-out infinite, cf-glow-pulse 3s ease-in-out infinite;
    }
    @keyframes cf-border-spin {
      from { --angle: 0deg; }
      to   { --angle: 360deg; }
    }
    .cf-grid-bg {
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0);
      background-size: 32px 32px;
    }
    @keyframes cf-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
  `}</style>
);

// ─── ANIMATION HELPERS ───────────────────────────────────────────────────────
const easeOut = [0.22, 1, 0.36, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: easeOut } },
};

function StaggerGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 group shrink-0">
      <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 ring-1 ring-white/10">
        <img src={logoImg} alt="ChainForge" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-[3px]">
        <div className="leading-none">
          <span className="font-['Big_Shoulders_Display'] font-black text-[19px] tracking-tight text-[#F0F0F0]">
            Chain
          </span>
          <span className="font-['Big_Shoulders_Display'] font-black text-[19px] tracking-tight text-[#FE8602]">
            Forge
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-px w-3 bg-white/20" />
          <span className="font-['IBM_Plex_Mono'] text-[8px] uppercase tracking-[0.2em] text-[#7A7A8A]">
            Ecosystem
          </span>
          <div className="h-px w-3 bg-white/20" />
        </div>
      </div>
    </button>
  );
}

// ─── GRADIENT TEXT ────────────────────────────────────────────────────────────
const orangeGrad: CSSProperties = {
  background: "linear-gradient(90deg, #FE8602, #FF6B00)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

// ─── BUTTONS ─────────────────────────────────────────────────────────────────
function PrimaryBtn({
  children, onClick, className = "", type = "button", fullWidth = false,
}: {
  children: ReactNode; onClick?: () => void; className?: string;
  type?: "button" | "submit"; fullWidth?: boolean;
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.03, boxShadow: "0 0 24px rgba(254,134,2,0.45)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FE8602] text-white font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.12em] font-medium whitespace-nowrap ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </motion.button>
  );
}

function DarkBtn({
  children, onClick, className = "",
}: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.12em] font-medium hover:bg-white/15 transition-colors whitespace-nowrap ${className}`}
    >
      {children}
    </motion.button>
  );
}

function GhostBtn({
  children, onClick, className = "", fullWidth = false,
}: { children: ReactNode; onClick?: () => void; className?: string; fullWidth?: boolean }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03, borderColor: "rgba(254,134,2,0.6)" }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 text-[#F0F0F0] font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-[0.12em] font-medium whitespace-nowrap transition-colors ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </motion.button>
  );
}

// ─── EYEBROW ──────────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.22em] mb-3 text-[#FE8602]">
      {children}
    </div>
  );
}

// ─── SECTION HEADING ─────────────────────────────────────────────────────────
function SectionHead({ eyebrow, title }: { eyebrow: string; title: ReactNode }) {
  return (
    <FadeUp className="mb-12">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-['Big_Shoulders_Display'] font-black text-5xl md:text-6xl uppercase leading-[0.92] text-[#F0F0F0]">
        {title}
      </h2>
    </FadeUp>
  );
}

// ─── GLOW ORBS ───────────────────────────────────────────────────────────────
function OrangeGlow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(254,134,2,0.13) 0%, transparent 70%)",
        filter: "blur(1px)",
      }}
    />
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ onNavigate, currentScreen }: { onNavigate: (s: Screen) => void; currentScreen: Screen }) {
  const [open, setOpen] = useState(false);
  const close = (s: Screen) => { setOpen(false); onNavigate(s); };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06]" style={{ background: "rgba(7,7,13,0.88)", backdropFilter: "blur(16px)" }}>
      <div className="max-w-7xl mx-auto px-5 h-[60px] flex items-center justify-between gap-6">
        <Logo onClick={() => onNavigate("home")} />

        <div className="hidden md:flex items-center gap-8">
          {([["Ecosystem", "home"], ["The Program", "program"]] as [string, Screen][]).map(([label, s]) => (
            <button
              key={label}
              onClick={() => onNavigate(s)}
              className={`font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.14em] transition-colors ${
                currentScreen === s ? "text-[#FE8602]" : "text-[#7A7A8A] hover:text-[#F0F0F0]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <GhostBtn onClick={() => onNavigate("freelancer")} className="py-2 text-[10px]">
            Join as Talent
          </GhostBtn>
          <PrimaryBtn onClick={() => onNavigate("project")} className="py-2 text-[10px]">
            Get Started
          </PrimaryBtn>
        </div>

        <button className="md:hidden p-2 text-[#F0F0F0]" onClick={() => setOpen(v => !v)}>
          {open ? <X size={18} /> : (
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <line y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5"/>
              <line y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.5"/>
              <line y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          )}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/[0.06] px-5 py-5 flex flex-col gap-5"
          style={{ background: "rgba(7,7,13,0.96)" }}
        >
          {(["Ecosystem", "The Program"] as const).map(label => (
            <button key={label}
              className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#7A7A8A] text-left"
              onClick={() => close(label === "The Program" ? "program" : "home")}
            >
              {label}
            </button>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-white/[0.06]">
            <GhostBtn onClick={() => close("freelancer")} fullWidth>Join as Talent</GhostBtn>
            <PrimaryBtn onClick={() => close("project")} fullWidth>Get Started</PrimaryBtn>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

// ─── STAT BAR ────────────────────────────────────────────────────────────────
function StatBar() {
  const stats = [
    { number: "3", label: "Engines, One Network" },
    { number: "100%", label: "Web3-Native Focus" },
    { number: "Vetted", label: "Every Talent Match" },
    { number: "Direct", label: "No Cold Applications" },
  ];
  const borders = [
    "border-r border-b md:border-b-0",
    "border-b md:border-b-0 md:border-r",
    "border-r",
    "",
  ];
  return (
    <div className="border-y border-white/[0.06] bg-[#0C0C16]">
      <StaggerGrid className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <StaggerItem key={i} className={`px-8 py-8 ${borders[i]} border-white/[0.06]`}>
            <div className="font-['Big_Shoulders_Display'] font-black text-5xl leading-none mb-2" style={orangeGrad}>
              {stat.number}
            </div>
            <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#7A7A8A]">
              {stat.label}
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </div>
  );
}

// ─── DARK CTA BAND ───────────────────────────────────────────────────────────
function DarkCTA({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <section className="relative overflow-hidden py-28 px-6 text-center bg-[#0A0A12]">
      <OrangeGlow className="inset-0" />
      <div className="cf-grid-bg absolute inset-0 opacity-60 pointer-events-none" />
      <FadeUp className="relative max-w-3xl mx-auto">
        <h2 className="font-['Big_Shoulders_Display'] font-black text-6xl md:text-8xl uppercase leading-[0.92] text-[#F0F0F0] mb-8">
          Pick your link<br />
          <span style={orangeGrad}>in the chain.</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryBtn onClick={() => onNavigate("project")}>Sign Up as a Project</PrimaryBtn>
          <GhostBtn onClick={() => onNavigate("freelancer")}>Join as a Freelancer</GhostBtn>
        </div>
        <p className="font-['Inter'] text-[#7A7A8A] text-sm mt-7">
          prefer to talk first?{" "}
          <a href="mailto:hello@chainforge.xyz" className="text-[#FE8602]/70 underline underline-offset-2 hover:text-[#FE8602] transition-colors">
            hello@chainforge.xyz
          </a>
        </p>
      </FadeUp>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <footer className="bg-[#050508] text-white border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <Logo onClick={() => onNavigate("home")} />
          <p className="font-['Inter'] text-[#7A7A8A] text-[13px] leading-relaxed mt-5 mb-6 max-w-[200px]">
            Linking buyers with sellers, and talent with projects — across the entire Web3 stack.
          </p>
          <div className="flex gap-2.5">
            {[Twitter, Linkedin, Globe].map((Icon, i) => (
              <motion.button key={i} whileHover={{ scale: 1.1 }} transition={{ duration: 0.15 }}
                className="w-8 h-8 border border-white/10 rounded-sm flex items-center justify-center text-[#7A7A8A] hover:text-white hover:border-[#FE8602]/40 transition-colors">
                <Icon size={13} />
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <div className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#7A7A8A]/60 mb-5">Ecosystem</div>
          {["Marketing & Growth", "Buyer-Seller Flow", "Talent Network", "The Program", "Roadmap"].map(item => (
            <button key={item} className="block text-[13px] text-[#7A7A8A] hover:text-[#F0F0F0] transition-colors mb-2 font-['Inter'] text-left">
              {item}
            </button>
          ))}
        </div>

        <div>
          <div className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#7A7A8A]/60 mb-5">Get Started</div>
          {([["Join as Talent", "freelancer"], ["Sign Up as Project", "project"], ["View the Program", "program"]] as [string, Screen][]).map(([label, s]) => (
            <button key={label} onClick={() => onNavigate(s)}
              className="block text-[13px] text-[#7A7A8A] hover:text-[#F0F0F0] transition-colors mb-2 font-['Inter'] text-left">
              {label}
            </button>
          ))}
        </div>

        <div>
          <div className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#7A7A8A]/60 mb-5">Stay Updated</div>
          <p className="text-[#7A7A8A] text-[13px] mb-4 font-['Inter']">Ecosystem updates, talent drops, and deal flow intel.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="Your email"
              className="flex-1 min-w-0 px-3 py-2 bg-white/5 border border-white/10 rounded-sm text-[13px] text-[#F0F0F0] placeholder-[#7A7A8A]/50 focus:outline-none focus:border-[#FE8602]/50 font-['Inter'] transition-colors" />
            <button className="w-9 h-9 bg-[#FE8602] rounded-sm flex items-center justify-center hover:bg-[#E8600C] transition-colors shrink-0">
              <ArrowRight size={13} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="font-['IBM_Plex_Mono'] text-[9px] text-white/20 uppercase tracking-widest">
            © 2025 ChainForge Ecosystem
          </span>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Contact"].map(item => (
              <button key={item} className="font-['IBM_Plex_Mono'] text-[9px] text-white/20 uppercase tracking-widest hover:text-white/50 transition-colors">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME SCREEN ─────────────────────────────────────────────────────────────
function HomeScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const marketingTags = [
    "GTM Strategy", "Community Management", "Content & Copy", "Growth & Paid",
    "KOL & Influencer", "OTC Deal Flow", "Partnership Intros", "Buyer Sourcing",
    "Seller Sourcing", "Launch Support", "Token Economics", "PR & Media",
    "Social Strategy", "Discord Ops", "Whitepaper Writing", "Liquidity Strategy",
  ];

  return (
    <div className="bg-[#07070D]">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-16 px-6 text-center min-h-[90vh] flex flex-col items-center justify-center">
        {/* Background layers */}
        <div className="cf-grid-bg absolute inset-0 pointer-events-none" />
        <OrangeGlow className="inset-x-0 -top-20 h-[80%]" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(254,134,2,0.06) 0%, transparent 60%)" }} />

        <div className="relative max-w-5xl mx-auto w-full">
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
            className="inline-flex items-center gap-2 border border-[#FE8602]/25 rounded-full px-4 py-1.5 mb-8 bg-[#FE8602]/[0.06]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#FE8602] animate-pulse" />
            <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#FE8602]/80">
              Marketing · Deal Flow · Talent — One Ecosystem
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
            >
              <h1 className="font-['Big_Shoulders_Display'] font-black text-[72px] sm:text-[96px] md:text-[120px] lg:text-[140px] uppercase leading-[0.86] text-[#F0F0F0]">
                Convergence,
              </h1>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: easeOut }}
            >
              <h1 className="font-['Big_Shoulders_Display'] font-black text-[72px] sm:text-[96px] md:text-[120px] lg:text-[140px] uppercase leading-[0.86]" style={orangeGrad}>
                Forged.
              </h1>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
            className="font-['Inter'] text-[#7A7A8A] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            ChainForge connects Web3 projects with vetted talent, qualified buyers and sellers,
            and the marketing infrastructure to grow — all through one connected network.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <PrimaryBtn onClick={() => onNavigate("project")}>
              Sign Up as a Project <ArrowRight size={13} />
            </PrimaryBtn>
            <GhostBtn onClick={() => onNavigate("freelancer")}>Join as a Freelancer</GhostBtn>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="font-['Inter'] text-sm text-[#7A7A8A]/60 hover:text-[#7A7A8A] underline underline-offset-2 transition-colors"
          >
            Learn how it works
          </motion.button>

          {/* Floating logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.0, ease: easeOut }}
            className="mt-16 flex justify-center"
          >
            <div className="relative cf-float-logo">
              <div className="absolute -inset-6 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(254,134,2,0.25) 0%, transparent 70%)" }} />
              <img src={logoImg} alt="ChainForge mark" className="w-24 h-24 object-contain relative rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STAT BAR ──────────────────────────────────────── */}
      <StatBar />

      {/* ── ECOSYSTEM SECTION ─────────────────────────────── */}
      <section className="py-20 px-6 bg-[#07070D] relative overflow-hidden">
        <div className="cf-grid-bg absolute inset-0 opacity-50 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <SectionHead eyebrow="The Network" title={<>Three engines.<br/>One connected network.</>} />

          <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 border border-white/[0.07] rounded-sm overflow-hidden">
            {[
              { eyebrow: "Engine 01", domain: "Marketing", title: "Visibility & Growth",
                desc: "GTM strategy, community building, content, KOL relationships, and paid growth — everything a Web3 project needs to capture attention and grow.",
                status: "Active", focus: "B2B & Consumer" },
              { eyebrow: "Engine 02", domain: "Deal Flow", title: "Buyers ↔ Sellers",
                desc: "OTC deal facilitation, partnership brokering, buyer and seller sourcing. We sit in the middle so both sides find the right counterpart.",
                status: "Active", focus: "OTC & Strategic" },
              { eyebrow: "Engine 03", domain: "Talent", title: "Projects ↔ Freelancers",
                desc: "A vetted roster of Web3 specialists matched directly to live project needs. No job boards, no cold applications, no guesswork.",
                status: "Active", focus: "Technical & Creative" },
            ].map((card, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(254,134,2,0.04)", transition: { duration: 0.2 } }}
                  className={`p-8 bg-[#0C0C16] h-full relative ${i < 2 ? "border-b md:border-b-0 md:border-r border-white/[0.07]" : ""}`}
                >
                  {i < 2 && (
                    <div className="absolute hidden md:flex -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-[#07070D] border border-white/[0.07] rounded-sm items-center justify-center">
                      <ArrowRight size={9} className="text-[#FE8602]" />
                    </div>
                  )}
                  <Eyebrow>{card.eyebrow}</Eyebrow>
                  <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#F0F0F0]/40 mb-2">{card.domain}</div>
                  <h3 className="font-['Big_Shoulders_Display'] font-black text-[28px] uppercase text-[#F0F0F0] leading-[0.95] mb-4">{card.title}</h3>
                  <p className="font-['Inter'] text-[#7A7A8A] text-[13px] leading-relaxed mb-6">{card.desc}</p>
                  <div className="flex gap-6 pt-4 border-t border-white/[0.06]">
                    <div>
                      <div className="font-['IBM_Plex_Mono'] text-[8px] uppercase tracking-[0.14em] text-[#7A7A8A]/50 mb-1">Status</div>
                      <div className="font-['IBM_Plex_Mono'] text-[10px] text-[#F0F0F0] flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FE8602] animate-pulse" />
                        {card.status}
                      </div>
                    </div>
                    <div>
                      <div className="font-['IBM_Plex_Mono'] text-[8px] uppercase tracking-[0.14em] text-[#7A7A8A]/50 mb-1">Focus</div>
                      <div className="font-['IBM_Plex_Mono'] text-[10px] text-[#F0F0F0]">{card.focus}</div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <FadeIn delay={0.3} className="mt-5 py-4 border-y border-white/[0.06] text-center overflow-hidden">
            <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.3em] text-white/15 whitespace-nowrap">
              One Ecosystem — Three Engines — Every Link Connected
            </span>
          </FadeIn>
        </div>
      </section>

      {/* ── WHY THIS MATTERS ──────────────────────────────── */}
      <section className="py-20 px-6 bg-[#0A0A12]">
        <div className="max-w-7xl mx-auto">
          <SectionHead eyebrow="The Problem" title="Why this matters." />
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { label: "For Projects", headline: "You're building in public with no map.",
                desc: "Hiring is slow. Growth is expensive. Deal flow is buried in Telegram groups. You need one trusted partner who knows the terrain.",
                stats: [{ n: "70%", l: "of Web3 hires go through unvetted networks" }, { n: "4×", l: "faster to market with structured deal support" }] },
              { label: "For Freelancers", headline: "Your skills are real. Your exposure isn't.",
                desc: "You have the work. You lack the pipeline. Cold applications don't work in Web3 — relationships and reputation do.",
                stats: [{ n: "3×", l: "more opportunities through direct matching" }, { n: "Zero", l: "cold applications after verification" }] },
            ].map((card, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ borderColor: "rgba(254,134,2,0.3)", transition: { duration: 0.2 } }}
                  className="bg-[#0F0F1A] p-8 border border-white/[0.07] rounded-sm h-full"
                >
                  <Eyebrow>{card.label}</Eyebrow>
                  <h3 className="font-['Big_Shoulders_Display'] font-black text-[28px] md:text-[32px] uppercase leading-[0.95] text-[#F0F0F0] mb-4">{card.headline}</h3>
                  <p className="font-['Inter'] text-[#7A7A8A] text-[13px] leading-relaxed mb-8">{card.desc}</p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.06]">
                    {card.stats.map((s, j) => (
                      <div key={j}>
                        <div className="font-['Big_Shoulders_Display'] font-black text-[42px] leading-none mb-1" style={orangeGrad}>{s.n}</div>
                        <div className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.1em] text-[#7A7A8A]">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── TALENT DEEP DIVE ──────────────────────────────── */}
      <section className="py-20 px-6 bg-[#07070D] relative overflow-hidden">
        <div className="cf-grid-bg absolute inset-0 opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <SectionHead eyebrow="The Roster" title={<>The roster, and how<br/>you get on it.</>} />

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-white/[0.07] rounded-sm overflow-hidden">
            {[
              { n: "01", title: "Vetting Program", desc: "Multi-stage review of skills, history, and track record before anyone joins the roster." },
              { n: "02", title: "Identity Verification", desc: "KYC-backed verification so projects know exactly who they're working with." },
              { n: "03", title: "Verified Badge", desc: "A public trust signal that elevates your profile across every deal and hire." },
              { n: "04", title: "Direct Recommendations", desc: "Matched to live opportunities by our team — not an algorithm, not a wall of jobs." },
              { n: "05", title: "Ongoing Matching", desc: "Once verified, you stay active. We keep matching as new projects come through." },
            ].map((f, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(254,134,2,0.04)", transition: { duration: 0.2 } }}
                  className={`p-6 bg-[#0C0C16] h-full ${i < 4 ? "border-b lg:border-b-0 lg:border-r" : "border-b sm:border-b-0"} border-white/[0.07]`}
                >
                  <div className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.18em] text-[#FE8602] mb-3">{f.n}</div>
                  <h4 className="font-['Big_Shoulders_Display'] font-black text-[18px] uppercase text-[#F0F0F0] leading-[0.95] mb-3">{f.title}</h4>
                  <p className="font-['Inter'] text-[#7A7A8A] text-[12px] leading-relaxed">{f.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>

          <FadeUp delay={0.2} className="flex flex-col sm:flex-row gap-4 mt-8">
            <PrimaryBtn onClick={() => onNavigate("freelancer")}>Apply as Talent</PrimaryBtn>
            <GhostBtn onClick={() => onNavigate("program")}>View the Program</GhostBtn>
          </FadeUp>
        </div>
      </section>

      {/* ── MARKETING MARQUEE ─────────────────────────────── */}
      <section className="py-20 bg-[#0A0A12] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <SectionHead eyebrow="Engine 01 + 02" title={<>Everything outside<br/>the codebase.</>} />
        </div>
        <div className="cf-marquee-wrap">
          <div className="cf-marquee-track py-2">
            {[...marketingTags, ...marketingTags].map((tag, i) => (
              <div key={i} className="mx-2 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.14em] text-[#7A7A8A] whitespace-nowrap hover:border-[#FE8602]/30 hover:text-[#F0F0F0] transition-colors">
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#07070D]">
        <div className="max-w-7xl mx-auto">
          <SectionHead eyebrow="The Flow" title={<>One flow. Either side<br/>of the chain.</>} />

          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border border-white/[0.07] rounded-sm overflow-hidden">
            {[
              { n: "01", title: "Sign Up", desc: "Submit your application as a project or freelancer through the relevant track." },
              { n: "02", title: "Pass the Program", desc: "Complete the vetting program — skills check, identity verification, and review." },
              { n: "03", title: "Get Matched", desc: "Our team matches you directly to relevant opportunities as they come through." },
              { n: "04", title: "Stay Connected", desc: "Ongoing relationship. We keep matching as the ecosystem grows." },
            ].map((step, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(254,134,2,0.04)", transition: { duration: 0.2 } }}
                  className={`p-8 bg-[#0C0C16] h-full relative ${i < 3 ? "border-b sm:border-b-0 md:border-r border-white/[0.07]" : ""}`}
                >
                  <div className="font-['IBM_Plex_Mono'] font-bold text-[52px] text-white/04 mb-3 leading-none select-none">{step.n}</div>
                  <h3 className="font-['Big_Shoulders_Display'] font-black text-[22px] uppercase text-[#F0F0F0] leading-none mb-3">{step.title}</h3>
                  <p className="font-['Inter'] text-[#7A7A8A] text-[13px] leading-relaxed">{step.desc}</p>
                  {i < 3 && (
                    <div className="absolute hidden md:flex -right-3 top-10 z-10 w-6 h-6 bg-[#07070D] border border-white/[0.07] rounded-sm items-center justify-center">
                      <ArrowRight size={9} className="text-[#FE8602]" />
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── ROADMAP ───────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#0A0A12]">
        <div className="max-w-7xl mx-auto">
          <SectionHead eyebrow="The Plan" title={<>Where the ecosystem<br/>is headed.</>} />
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { phase: "Phase 1", tag: "Live", title: "Foundation",
                bullets: ["Talent network open", "Project onboarding", "Core vetting program", "Initial deal flow pipeline"], active: true },
              { phase: "Phase 2", tag: "Q2 2025", title: "Scale",
                bullets: ["Marketing engine launch", "Buyer-seller platform", "Expanded KYC layer", "Partner integrations"], active: false },
              { phase: "Phase 3", tag: "Q3 2025", title: "Intelligence",
                bullets: ["Match quality scoring", "On-chain reputation", "Project health signals", "Ecosystem analytics"], active: false },
              { phase: "Phase 4", tag: "Q4 2025", title: "Network",
                bullets: ["DAO governance layer", "Token-gated tiers", "Cross-chain identities", "Community expansion"], active: false },
            ].map((phase, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ borderColor: "rgba(254,134,2,0.3)", transition: { duration: 0.2 } }}
                  className="bg-[#0F0F1A] p-6 border border-white/[0.07] rounded-sm h-full"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.18em] text-[#7A7A8A]">{phase.phase}</span>
                    <span className={`font-['IBM_Plex_Mono'] text-[8px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-sm ${phase.active ? "bg-[#FE8602] text-white" : "bg-white/[0.07] text-[#7A7A8A]"}`}>
                      {phase.tag}
                    </span>
                  </div>
                  <h4 className="font-['Big_Shoulders_Display'] font-black text-[24px] uppercase text-[#F0F0F0] leading-none mb-4">{phase.title}</h4>
                  <ul className="space-y-2">
                    {phase.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <div className="mt-[5px] w-1 h-1 rounded-full bg-[#FE8602] shrink-0" />
                        <span className="font-['Inter'] text-[12px] text-[#7A7A8A]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#07070D]">
        <div className="max-w-7xl mx-auto">
          <SectionHead eyebrow="The People" title={<>The people behind<br/>the ecosystem.</>} />
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Alex Mercer", role: "Co-Founder & CEO" },
              { name: "Jordan Reyes", role: "Head of Talent" },
              { name: "Sam Okeke", role: "Deal Flow Lead" },
              { name: "Maya Chen", role: "Marketing Director" },
            ].map((member, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group"
                >
                  <motion.div
                    whileHover={{ borderColor: "rgba(254,134,2,0.3)", transition: { duration: 0.2 } }}
                    className="aspect-square bg-[#0F0F1A] border border-white/[0.07] mb-3 flex items-end p-5 overflow-hidden"
                  >
                    <div className="w-full">
                      <div className="w-14 h-14 rounded-full bg-white/[0.06] mx-auto mb-3" />
                      <div className="w-3/4 h-1.5 bg-white/[0.04] rounded mx-auto" />
                    </div>
                  </motion.div>
                  <div className="font-['Big_Shoulders_Display'] font-bold text-[17px] uppercase text-[#F0F0F0] leading-none">{member.name}</div>
                  <div className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.12em] text-[#7A7A8A] mt-1">{member.role}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <DarkCTA onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─── FORM HELPERS ────────────────────────────────────────────────────────────
const inputBase = "w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-sm text-[#F0F0F0] font-['Inter'] text-[13px] placeholder-[#7A7A8A]/50 focus:outline-none focus:border-[#FE8602]/60 transition-colors";

function Field({ label, type = "text", placeholder, required, options, value, onChange }: {
  label: string; type?: "text" | "email" | "select" | "textarea";
  placeholder?: string; required?: boolean; options?: string[];
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.18em] text-[#7A7A8A] mb-2">
        {label}{required && <span className="text-[#FE8602] ml-0.5">*</span>}
      </label>
      {type === "select" ? (
        <select className={`${inputBase} bg-[#0F0F1A]`} value={value} onChange={e => onChange(e.target.value)}>
          <option value="">Select…</option>
          {options?.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : type === "textarea" ? (
        <textarea className={`${inputBase} min-h-[110px] resize-none`} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
      ) : (
        <input type={type} className={inputBase} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
      )}
    </div>
  );
}

function Dropzone({ label, helper }: { label: string; helper: string }) {
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <label className="block font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.18em] text-[#7A7A8A] mb-2">{label}</label>
      <motion.div
        whileHover={{ borderColor: file ? undefined : "rgba(254,134,2,0.4)" }}
        className={`border-2 border-dashed rounded-sm p-5 text-center cursor-pointer transition-colors ${file ? "border-green-500/60 bg-green-500/[0.04]" : "border-white/[0.1] bg-white/[0.02]"}`}
        onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setFile(f); }}
        onDragOver={e => e.preventDefault()}
        onClick={() => ref.current?.click()}
      >
        <input ref={ref} type="file" className="hidden" onChange={e => setFile(e.target.files?.[0] ?? null)} />
        {file ? (
          <div className="flex items-center justify-center gap-2">
            <Check size={13} className="text-green-400" />
            <span className="font-['IBM_Plex_Mono'] text-[10px] text-green-400 uppercase tracking-[0.1em] truncate max-w-[120px]">{file.name}</span>
          </div>
        ) : (
          <>
            <Upload size={15} className="text-[#7A7A8A]/40 mx-auto mb-2" />
            <div className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.12em] text-[#7A7A8A]/40">Drop or click to upload</div>
          </>
        )}
      </motion.div>
      <p className="font-['Inter'] text-[11px] text-[#7A7A8A]/40 mt-1">{helper}</p>
    </div>
  );
}

function FormBlock({ num, title, children }: { num: string; title: string; children: ReactNode }) {
  return (
    <FadeUp>
      <div className="flex items-baseline gap-4 mb-7">
        <span className="font-['IBM_Plex_Mono'] font-bold text-[52px] text-white/[0.04] leading-none select-none">{num}</span>
        <h2 className="font-['Big_Shoulders_Display'] font-black text-[28px] uppercase text-[#F0F0F0] leading-none">{title}</h2>
      </div>
      {children}
    </FadeUp>
  );
}

function SuccessCard({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  return (
    <div className="min-h-screen bg-[#07070D] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="bg-[#0F0F1A] border border-white/[0.07] p-12 max-w-md w-full text-center rounded-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
          className="w-14 h-14 rounded-full bg-[#FE8602]/15 flex items-center justify-center mx-auto mb-6"
          style={{ boxShadow: "0 0 24px rgba(254,134,2,0.2)" }}
        >
          <Check size={22} className="text-[#FE8602]" />
        </motion.div>
        <h2 className="font-['Big_Shoulders_Display'] font-black text-[44px] uppercase text-[#F0F0F0] leading-[0.92] mb-4">
          Application<br/>received.
        </h2>
        <p className="font-['Inter'] text-[#7A7A8A] text-[13px] leading-relaxed mb-8">
          Our team reviews every application personally — expect to hear back within 5–7 business days.
        </p>
        <div className="flex flex-col gap-3">
          <PrimaryBtn onClick={() => onNavigate("program")} fullWidth>Track Your Status</PrimaryBtn>
          <GhostBtn onClick={() => onNavigate("home")} fullWidth>Back to Home</GhostBtn>
        </div>
      </motion.div>
    </div>
  );
}

function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: ReactNode; subtitle: string }) {
  return (
    <div className="relative py-16 px-6 border-b border-white/[0.06] overflow-hidden">
      <div className="cf-grid-bg absolute inset-0 opacity-40 pointer-events-none" />
      <OrangeGlow className="inset-x-0 -top-10 h-full opacity-60" />
      <div className="max-w-3xl mx-auto relative">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: easeOut }}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }} animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: easeOut }}
            className="font-['Big_Shoulders_Display'] font-black text-[64px] md:text-[80px] uppercase leading-[0.88] text-[#F0F0F0] mt-1 mb-5"
          >
            {title}
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
          className="font-['Inter'] text-[#7A7A8A] text-[17px] max-w-xl leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}

// ─── FREELANCER SCREEN ───────────────────────────────────────────────────────
function FreelancerScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "", alias: "", email: "", telegram: "", country: "", wallet: "",
    role: "", experience: "", skills: "", portfolio: "", social: "", projects: "",
    availability: "", rate: "", pitch: "", consent: false,
  });
  const set = (k: keyof typeof form) => (v: string | boolean) => setForm(f => ({ ...f, [k]: v }));
  if (submitted) return <SuccessCard onNavigate={onNavigate} />;
  const chains = ["Ethereum","Solana","BNB Chain","Polygon","Arbitrum","Optimism","Avalanche","Cosmos","Near","Sui","Aptos","Other"];

  return (
    <div className="bg-[#07070D] min-h-screen">
      <PageHero eyebrow="Talent Track" title="Join the roster." subtitle="Apply to join ChainForge's vetted talent network. Every submission is reviewed personally. Only those who pass the program make the roster." />
      <form className="max-w-3xl mx-auto px-6 py-14 space-y-16"
        onSubmit={e => { e.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0 }); }}>

        <FormBlock num="01" title="Who you are">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name" placeholder="Your legal name" required value={form.fullName} onChange={set("fullName")} />
            <Field label="Alias / Handle" placeholder="@handle" value={form.alias} onChange={set("alias")} />
            <Field label="Email" type="email" placeholder="you@example.com" required value={form.email} onChange={set("email")} />
            <Field label="Telegram / Discord" placeholder="@username" value={form.telegram} onChange={set("telegram")} />
            <Field label="Country / Timezone" placeholder="e.g. Germany / UTC+1" value={form.country} onChange={set("country")} />
            <Field label="Wallet Address" placeholder="0x…" value={form.wallet} onChange={set("wallet")} />
          </div>
        </FormBlock>

        <FormBlock num="02" title="What you do">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Primary Role" type="select" required options={["Developer","Designer","Copywriter","Community Manager","Growth Marketer","KOL / Influencer","Strategist","Advisor","Other"]} value={form.role} onChange={set("role")} />
              <Field label="Years of Experience" type="select" required options={["Under 1 year","1–2 years","3–5 years","5–10 years","10+ years"]} value={form.experience} onChange={set("experience")} />
            </div>
            <div>
              <label className="block font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.18em] text-[#7A7A8A] mb-3">Chains & Stack</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-y-3 gap-x-2">
                {chains.map(c => (
                  <label key={c} className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="w-3 h-3 accent-[#FE8602]" />
                    <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.06em] text-[#7A7A8A]">{c}</span>
                  </label>
                ))}
              </div>
            </div>
            <Field label="Key Skills" placeholder="Solidity, React, Community, Tokenomics…" value={form.skills} onChange={set("skills")} />
          </div>
        </FormBlock>

        <FormBlock num="03" title="Portfolio & Links">
          <div className="space-y-4">
            <Field label="Portfolio / GitHub URL" placeholder="https://…" value={form.portfolio} onChange={set("portfolio")} />
            <Field label="Social / Twitter URL" placeholder="https://twitter.com/…" value={form.social} onChange={set("social")} />
            <Field label="Previous Web3 Projects" type="textarea" placeholder="Describe 2–3 projects, your role, and outcomes…" value={form.projects} onChange={set("projects")} />
          </div>
        </FormBlock>

        <FormBlock num="04" title="Availability & Rate">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Availability" type="select" options={["Full-time","Part-time (20+ hrs/wk)","Part-time (under 20 hrs/wk)","Project-based only","Retainer only"]} value={form.availability} onChange={set("availability")} />
            <Field label="Rate Expectation (USD)" placeholder="e.g. $80/hr or $5,000/mo" value={form.rate} onChange={set("rate")} />
          </div>
        </FormBlock>

        <FormBlock num="05" title="Documents">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Dropzone label="Resume / CV" helper="PDF or Word. Max 10MB." />
            <Dropzone label="Portfolio Samples" helper="PDF, ZIP, or link doc. Max 20MB." />
            <Dropzone label="Government ID" helper="Passport or national ID. Confidential." />
          </div>
        </FormBlock>

        <FormBlock num="06" title="About you">
          <Field label="Short Pitch — Why ChainForge?" type="textarea" placeholder="Tell us who you are, what makes you exceptional, and why you want to join the ecosystem…" required value={form.pitch} onChange={set("pitch")} />
        </FormBlock>

        <FadeUp className="pt-4 border-t border-white/[0.06]">
          <label className="flex items-start gap-3 cursor-pointer mb-8">
            <input type="checkbox" className="mt-0.5 w-4 h-4 accent-[#FE8602] shrink-0" checked={form.consent} onChange={e => set("consent")(e.target.checked)} required />
            <span className="font-['Inter'] text-[13px] text-[#7A7A8A] leading-relaxed">
              I confirm the information is accurate and consent to ChainForge storing and processing my data for application review and talent matching.
            </span>
          </label>
          <PrimaryBtn type="submit" fullWidth className="py-4">Submit Application</PrimaryBtn>
          <p className="font-['IBM_Plex_Mono'] text-[9px] text-[#7A7A8A]/40 text-center mt-3 uppercase tracking-[0.12em]">Applications reviewed within 5–7 business days</p>
        </FadeUp>
      </form>
    </div>
  );
}

// ─── PROJECT SCREEN ──────────────────────────────────────────────────────────
function ProjectScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    projectName: "", website: "", contactName: "", role: "", email: "", telegram: "",
    hiringRoles: "", budget: "", stage: "", chain: "", description: "", consent: false,
  });
  const [needs, setNeeds] = useState<string[]>([]);
  const set = (k: keyof typeof form) => (v: string | boolean) => setForm(f => ({ ...f, [k]: v }));
  const toggleNeed = (n: string) => setNeeds(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n]);
  if (submitted) return <SuccessCard onNavigate={onNavigate} />;

  return (
    <div className="bg-[#07070D] min-h-screen">
      <PageHero eyebrow="Project Track" title="One door in." subtitle="Tell us about your project. Whether you need talent, deal support, or growth — we'll match you to the right resources in the ecosystem." />
      <form className="max-w-3xl mx-auto px-6 py-14 space-y-16"
        onSubmit={e => { e.preventDefault(); setSubmitted(true); window.scrollTo({ top: 0 }); }}>

        <FormBlock num="01" title="Project Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Project Name" placeholder="Your project name" required value={form.projectName} onChange={set("projectName")} />
            <Field label="Website / Landing Page" placeholder="https://…" value={form.website} onChange={set("website")} />
            <Field label="Contact Name" placeholder="Your name" required value={form.contactName} onChange={set("contactName")} />
            <Field label="Your Role" placeholder="Founder, CMO, Dev Lead…" value={form.role} onChange={set("role")} />
            <Field label="Email" type="email" placeholder="you@project.xyz" required value={form.email} onChange={set("email")} />
            <Field label="Telegram / Discord" placeholder="@username" value={form.telegram} onChange={set("telegram")} />
          </div>
        </FormBlock>

        <FormBlock num="02" title="What you need">
          <div className="space-y-4">
            <div>
              <label className="block font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.18em] text-[#7A7A8A] mb-3">
                I need help with <span className="text-[#FE8602]">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                {["Hire talent", "Buyer-seller matchmaking", "Marketing & growth"].map(n => (
                  <motion.label key={n}
                    whileHover={{ borderColor: "rgba(254,134,2,0.4)" }}
                    className={`flex items-center gap-3 cursor-pointer px-4 py-3 border rounded-sm transition-colors ${needs.includes(n) ? "border-[#FE8602]/50 bg-[#FE8602]/[0.06]" : "border-white/[0.08] bg-white/[0.02]"}`}
                  >
                    <input type="checkbox" className="accent-[#FE8602] shrink-0" checked={needs.includes(n)} onChange={() => toggleNeed(n)} />
                    <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.1em] text-[#F0F0F0]">{n}</span>
                  </motion.label>
                ))}
              </div>
            </div>
            <Field label="Roles Hiring For" placeholder="e.g. Solidity Dev, Community Manager…" value={form.hiringRoles} onChange={set("hiringRoles")} />
            <Field label="Budget Range (USD)" type="select" options={["Under $5k/mo","$5k–$15k/mo","$15k–$50k/mo","$50k+/mo","Project-based","Equity / Token"]} value={form.budget} onChange={set("budget")} />
          </div>
        </FormBlock>

        <FormBlock num="03" title="About the project">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Project Stage" type="select" required options={["Idea / Pre-product","MVP / Beta","Live & growing","Scaling","Established"]} value={form.stage} onChange={set("stage")} />
              <Field label="Chain / Tech Stack" placeholder="e.g. Ethereum, Solana, cross-chain…" value={form.chain} onChange={set("chain")} />
            </div>
            <Field label="Project Description" type="textarea" required placeholder="What is your project? What problem does it solve? What's the current state?" value={form.description} onChange={set("description")} />
          </div>
        </FormBlock>

        <FormBlock num="04" title="Documents">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Dropzone label="Pitch Deck / Whitepaper" helper="PDF preferred. Max 20MB." />
            <Dropzone label="Logo / Brand Assets" helper="ZIP with PNG/SVG files." />
            <Dropzone label="Proof of Entity" helper="Registration doc. Confidential." />
          </div>
        </FormBlock>

        <FadeUp className="pt-4 border-t border-white/[0.06]">
          <label className="flex items-start gap-3 cursor-pointer mb-8">
            <input type="checkbox" className="mt-0.5 w-4 h-4 accent-[#FE8602] shrink-0" checked={form.consent} onChange={e => set("consent")(e.target.checked)} required />
            <span className="font-['Inter'] text-[13px] text-[#7A7A8A] leading-relaxed">
              I confirm the information is accurate and consent to ChainForge storing and processing my data for reviewing this submission.
            </span>
          </label>
          <PrimaryBtn type="submit" fullWidth className="py-4">Submit Project</PrimaryBtn>
          <p className="font-['IBM_Plex_Mono'] text-[9px] text-[#7A7A8A]/40 text-center mt-3 uppercase tracking-[0.12em]">We'll be in touch within 48 hours</p>
        </FadeUp>
      </form>
    </div>
  );
}

// ─── PROGRAM SCREEN ──────────────────────────────────────────────────────────
function ProgramScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [track, setTrack] = useState<"freelancer" | "project">("freelancer");

  const freelancerSteps = [
    { title: "Application Submitted", desc: "Your submission is in. We've received all documents and information.", status: "done" },
    { title: "Application Review", desc: "Our team is reviewing your background, portfolio, and initial fit assessment.", status: "active" },
    { title: "Skills Check", desc: "A short task or call to verify your stated expertise in context.", status: "pending" },
    { title: "Identity Verification", desc: "KYC process to confirm your identity and protect the ecosystem.", status: "pending" },
    { title: "Verified & Live on Roster", desc: "You're in. Your profile goes live and matching begins immediately.", status: "pending" },
  ];
  const projectSteps = [
    { title: "Submission Received", desc: "Your project details are in. Initial review begins within 24 hours.", status: "done" },
    { title: "Project Review", desc: "Our team evaluates fit, legitimacy, and ecosystem alignment.", status: "active" },
    { title: "Verification Call", desc: "Short call with the ChainForge team to align on needs and process.", status: "pending" },
    { title: "Entity Verification", desc: "Verification of project entity, team, and on-chain presence.", status: "pending" },
    { title: "Active & Live", desc: "Your project is active in the ecosystem. Matching and deal flow begins.", status: "pending" },
  ];
  const steps = track === "freelancer" ? freelancerSteps : projectSteps;

  return (
    <div className="bg-[#07070D] min-h-screen">
      <PageHero eyebrow="The Program" title={<>How you get<br />verified.</>}
        subtitle="Every person and project in ChainForge goes through a structured verification program. Here's how it works, step by step." />

      <div className="max-w-3xl mx-auto px-6 py-14">
        {/* Toggle */}
        <FadeUp className="mb-10">
          <div className="flex items-center border border-white/[0.08] rounded-full p-1 w-fit">
            {(["freelancer", "project"] as const).map(t => (
              <motion.button key={t} onClick={() => setTrack(t)}
                className={`px-6 py-2 rounded-full font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.12em] transition-all relative ${track === t ? "text-white" : "text-[#7A7A8A] hover:text-[#F0F0F0]"}`}
              >
                {track === t && (
                  <motion.div layoutId="track-pill" className="absolute inset-0 bg-[#FE8602] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                <span className="relative z-10">{t === "freelancer" ? "Freelancer Track" : "Project Track"}</span>
              </motion.button>
            ))}
          </div>
        </FadeUp>

        {/* Status bar */}
        <FadeUp delay={0.1} className="flex items-center gap-3 px-4 py-3 bg-[#FE8602]/[0.06] border border-[#FE8602]/20 rounded-sm mb-12">
          <div className="w-2 h-2 rounded-full bg-[#FE8602] animate-pulse shrink-0" />
          <span className="font-['IBM_Plex_Mono'] text-[9px] uppercase tracking-[0.14em] text-[#7A7A8A]">
            Current stage: <span className="text-[#FE8602]">Application Review</span>
          </span>
        </FadeUp>

        {/* Tracker */}
        <div className="relative">
          <div className="absolute left-[13px] top-0 bottom-0 w-px bg-white/[0.07] pointer-events-none" />
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={`${track}-${i}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: easeOut }}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                <div className="shrink-0 mt-0.5 relative z-10">
                  {step.status === "done" ? (
                    <div className="w-7 h-7 rounded-full bg-[#FE8602] flex items-center justify-center"
                      style={{ boxShadow: "0 0 12px rgba(254,134,2,0.4)" }}>
                      <Check size={12} className="text-white" />
                    </div>
                  ) : step.status === "active" ? (
                    <div className="w-7 h-7 rounded-full border-2 border-[#FE8602] bg-[#07070D] flex items-center justify-center"
                      style={{ boxShadow: "0 0 0 4px rgba(254,134,2,0.12), 0 0 16px rgba(254,134,2,0.3)" }}>
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FE8602]" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full border border-white/[0.12] bg-[#07070D]" />
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <div className="flex items-center flex-wrap gap-2.5 mb-1.5">
                    <h3 className="font-['Big_Shoulders_Display'] font-bold text-[20px] uppercase text-[#F0F0F0] leading-none">{step.title}</h3>
                    <span className={`font-['IBM_Plex_Mono'] text-[8px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-sm ${
                      step.status === "done" ? "bg-white/[0.08] text-[#F0F0F0]" :
                      step.status === "active" ? "bg-[#FE8602] text-white" :
                      "bg-white/[0.05] text-[#7A7A8A]"
                    }`}>
                      {step.status === "done" ? "Complete" : step.status === "active" ? "In Progress" : "Pending"}
                    </span>
                  </div>
                  <p className="font-['Inter'] text-[13px] text-[#7A7A8A] leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Unlocks */}
        <FadeUp delay={0.3} className="mt-16 pt-12 border-t border-white/[0.06]">
          <Eyebrow>What You Unlock</Eyebrow>
          <StaggerGrid className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { title: "Direct Recommendations", desc: "You're matched to live opportunities without applying anywhere." },
              { title: "Verified Badge", desc: "A public trust signal that increases your visibility and deal flow." },
              { title: "Ongoing Matching", desc: "Continuous matching as new projects and deals enter the ecosystem." },
            ].map((u, i) => (
              <StaggerItem key={i}>
                <motion.div whileHover={{ borderColor: "rgba(254,134,2,0.3)", transition: { duration: 0.2 } }}
                  className="p-5 bg-[#0F0F1A] border border-white/[0.07] rounded-sm">
                  <div className="w-7 h-7 rounded-sm bg-[#FE8602]/10 flex items-center justify-center mb-4">
                    <Check size={13} className="text-[#FE8602]" />
                  </div>
                  <h4 className="font-['Big_Shoulders_Display'] font-bold text-[17px] uppercase text-[#F0F0F0] leading-none mb-2">{u.title}</h4>
                  <p className="font-['Inter'] text-[12px] text-[#7A7A8A] leading-relaxed">{u.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </FadeUp>
      </div>

      <DarkCTA onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─── APP ROOT ────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const navigate = (s: Screen) => { setScreen(s); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div className="font-['Inter'] bg-[#07070D] min-h-screen">
      <GlobalStyles />
      <Nav onNavigate={navigate} currentScreen={screen} />
      {screen === "home" && <HomeScreen onNavigate={navigate} />}
      {screen === "freelancer" && <FreelancerScreen onNavigate={navigate} />}
      {screen === "project" && <ProjectScreen onNavigate={navigate} />}
      {screen === "program" && <ProgramScreen onNavigate={navigate} />}
    </div>
  );
}
