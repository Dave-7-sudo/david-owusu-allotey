import { useEffect, useState } from "react";
import {
  Award,
  BookOpen,
  Briefcase,
  ChevronRight,
  Cpu,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  ShieldCheck,
  Terminal,
  User,
  X,
} from "lucide-react";
import { cn } from "@/utils/cn";

// ============================================================
//  YOUR IMAGES GO HERE
//
//  Place your files in public/images/:
//    - profile.jpg          → your photo
//    - cert-ibm.jpg         → IBM certificate
//    - cert-google.jpg      → Google certificate
//    - cert-data-labelling.jpg
//    - cert-wa-rtc.jpg
//    - cert-presec.jpg
//
//  Then update the paths below to match your filenames.
// ============================================================

export const PROFILE_IMAGE = "/images/profile.jpg";

const CERTIFICATES = [
  // --- Certificates WITH uploaded images ---
  // Uncomment and fill these in once you add your photos:

  /*
  {
    id: "cert-1",
    title: "IBM SkillsBuild | Cybersecurity Fundamentals",
    date: "May 2026",
    image: "/images/cert-ibm.jpg",
  },
  */

  // --- Static certifications (always shown as text cards) ---
  {
    id: "ibm-skillsbuild",
    title: "IBM SkillsBuild | Cybersecurity Fundamentals",
    date: "May 2026",
    image: "/images/ibm.jpg",
  },
  {
    id: "google-coursera",
    title: "Google & Coursera | Cybersecurity Professional Certificate",
    date: "In Progress",
    image: "",
  },
  {
    id: "data-labelling",
    title: "Datamaker Ghana & KOICA | Certified Data Labelling Specialist",
    date: "May 2025",
    image: "/images/datamaker.jpg",
  },
  {
    id: "wa-rtc",
    title: "West Africa Regional Training Center (RTC) | Cybersecurity Awareness Workshop",
    date: "August 2024",
    image: "/images/rtc.jpg",
  },
  {
    id: "presec-award",
    title: "PRESEC Cybersecurity & Awareness Club | Organizing Secretary & Service Award",
    date: "",
    image: "/images/presec.jpg",
  },
];

// Separate certificates: images vs text-only
const imageCerts = ((): typeof CERTIFICATES => {
  // Dynamically filter at runtime to avoid hoisting issues
  return CERTIFICATES.filter((c: { id: string; title: string; date?: string; image: string }) => Boolean(c.image));
})();
const textCerts = ((): typeof CERTIFICATES => {
  return CERTIFICATES.filter((c: { id: string; title: string; date?: string; image: string }) => !c.image);
})();

const NAV_LINKS = [
  { label: "Summary", href: "#summary" },
  { label: "Impact", href: "#impact" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

const SKILLS = [
  {
    category: "Cybersecurity & Networking",
    items: [
      "Network Security",
      "Threat Vectors",
      "Cybersecurity Fundamentals",
      "Computer Networking Fundamentals",
    ],
  },
  { category: "Operating Systems", items: ["Linux Fundamentals", "Command Line Basics"] },
  { category: "Programming", items: ["Python", "C++"] },
  {
    category: "Professional Skills",
    items: [
      "Leadership & Team Management",
      "Public Speaking",
      "Communication",
      "Teamwork & Collaboration",
    ],
  },
];

function SectionHeading({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mb-10 md:mb-14">
      {subtitle && (
        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">{children}</h2>
      <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
    </div>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group rounded-2xl border border-slate-800 bg-[#13151a]/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:shadow-blue-500/10 md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    NAV_LINKS.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0b0c0f] text-slate-50 antialiased">
      {/* Navigation */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-[#0b0c0f]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-white"
            aria-label="David Owusu Allotey home"
          >
            <Shield className="h-6 w-6 text-blue-500" />
            <span>DOA</span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeSection === link.href.slice(1)
                    ? "bg-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="mailto:dallotey452@gmail.com"
            className="hidden items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 md:inline-flex"
          >
            <Mail className="h-4 w-4" />
            Hire Me
          </a>

          <button
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t border-white/5 bg-[#0b0c0f] px-6 py-4 md:hidden" aria-label="Mobile">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={cn(
                    "rounded-lg px-4 py-3 text-base font-medium transition-colors",
                    activeSection === link.href.slice(1)
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="mailto:dallotey452@gmail.com"
                className="mt-2 flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
              >
                <Mail className="h-4 w-4" /> Hire Me
              </a>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* ========== HERO ========== */}
        <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />
            <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-violet-600/10 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
            {/* Left — Text */}
            <div className="order-2 md:order-1">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300">
                <ShieldCheck className="h-4 w-4" />
                Cybersecurity Specialist
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                David Owusu{" "}
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Allotey</span>
              </h1>

              <p className="mt-6 text-lg font-medium text-slate-300 md:text-xl">
                BSc. Computer Science (Cybersecurity) Student
              </p>

              <blockquote className="mt-8 border-l-4 border-blue-500 pl-6">
                <p className="text-2xl font-light italic text-white md:text-3xl">&ldquo;Aspire to inspire before you expire.&rdquo;</p>
              </blockquote>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
                >Get in Touch<ChevronRight className="h-4 w-4" /></a>
                <a
                  href="#certificates"
                  onClick={(e) => { e.preventDefault(); handleNavClick("#certificates"); }}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-transparent px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-slate-500 hover:text-white"
                ><Award className="h-4 w-4" />View Credentials</a>
              </div>
            </div>

            {/* Right — Profile Image */}
            <div className="order-1 flex justify-center md:order-2">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 to-violet-600 opacity-60 blur-2xl" />
                <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-slate-800 shadow-2xl sm:h-80 sm:w-80">
                  <img
                    src={PROFILE_IMAGE}
                    alt="David Owusu Allotey"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Show placeholder if image not found yet
                      (e.currentTarget).parentElement!.innerHTML = `
                        <div class="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#13151a] text-slate-500">
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
                          <span class="text-sm font-medium">Profile photo</span>
                        </div>`;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== SUMMARY ========== */}
        <section id="summary" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading subtitle="About Me">Professional Summary</SectionHeading>
            <div className="grid gap-8 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <p className="text-lg leading-relaxed text-slate-300 md:text-xl">
                  Dedicated and proactive Cybersecurity student with a strong foundational knowledge in network security, threat vectors, and data analysis. A detail-oriented individual with demonstrated leadership and community-building experience, seeking to leverage technical skills and structured academic training into a cybersecurity internship or technical learning opportunity.
                </p>
                <p className="mt-6 text-slate-400">
                  Proven track record of early career commitment, holding foundational certifications from IBM and Google alongside a regional cybersecurity awareness credential.
                </p>
              </Card>
              <Card className="flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div><div className="text-4xl font-bold text-blue-400">600%</div><div className="mt-1 text-sm text-slate-400">Membership Growth</div></div>
                  <div><div className="text-4xl font-bold text-violet-400">40+</div><div className="mt-1 text-sm text-slate-400">Workshop Attendees</div></div>
                  <div><div className="text-4xl font-bold text-emerald-400">5+</div><div className="mt-1 text-sm text-slate-400">Certifications</div></div>
                  <div><div className="text-4xl font-bold text-amber-400">105</div><div className="mt-1 text-sm text-slate-400">Club Members</div></div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ========== LEADERSHIP ========== */}
        <section id="impact" className="bg-[#0f1116] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading subtitle="Experience">Leadership & Impact</SectionHeading>
            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="relative overflow-hidden">
                <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-blue-500/10 blur-2xl" />
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"><Briefcase className="h-7 w-7" /></div>
                <h3 className="text-2xl font-bold text-white">Organizing Secretary</h3>
                <p className="mt-1 text-lg text-blue-400">PRESEC Cybersecurity & Awareness Club</p>
                <ul className="mt-6 space-y-4 text-slate-300">
                  <li className="flex gap-3"><ChevronRight className="mt-1 h-5 w-5 shrink-0 text-blue-500" /><span>Coordinated club initiatives and raised cybersecurity awareness within the student body, demonstrating early leadership and peer education in technology.</span></li>
                  <li className="flex gap-3"><ChevronRight className="mt-1 h-5 w-5 shrink-0 text-blue-500" /><span>Scaled membership from<strong className="text-white mx-1">15 to 105</strong>, achieving a<strong className="text-white mx-1">600%</strong> increase.</span></li>
                  <li className="flex gap-3"><ChevronRight className="mt-1 h-5 w-5 shrink-0 text-blue-500" /><span>Co-led weekly cybersecurity workshops, engaging over<strong className="text-white mx-1">40 attendees</strong> each session.</span></li>
                </ul>
              </Card>

              <div className="grid gap-6">
                <Card><div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400"><Terminal className="h-6 w-6" /></div><div><h4 className="text-lg font-semibold text-white">Peer Education</h4><p className="mt-1 text-slate-400">Translated complex cybersecurity topics into accessible workshops for fellow students.</p></div></div></Card>
                <Card><div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400"><User className="h-6 w-6" /></div><div><h4 className="text-lg font-semibold text-white">Community Building</h4><p className="mt-1 text-slate-400">Built a thriving student community around cybersecurity awareness and continuous learning.</p></div></div></Card>
                <Card><div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400"><Award className="h-6 w-6" /></div><div><h4 className="text-lg font-semibold text-white">Service Award</h4><p className="mt-1 text-slate-400">Recognized with the PRESEC Cybersecurity & Awareness Club Service Award for outstanding contribution.</p></div></div></Card>
              </div>
            </div>
          </div>
        </section>

        {/* ========== EDUCATION & CREDENTIALS ========== */}
        <section id="education" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading subtitle="Academic Background">Education & Credentials</SectionHeading>
            <div className="grid gap-8 lg:grid-cols-2">
              <Card><div className="flex items-start gap-5"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400"><GraduationCap className="h-7 w-7" /></div><div><h3 className="text-xl font-bold text-white">BSc. Computer Science</h3><p className="text-lg text-blue-400">Cybersecurity</p><p className="mt-2 text-slate-300">Ghana Communication Technology University</p><p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500"><MapPin className="h-3.5 w-3.5" />Accra, Ghana</p></div></div></Card>
              <Card><div className="flex items-start gap-5"><div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400"><BookOpen className="h-7 w-7" /></div><div><h3 className="text-xl font-bold text-white">WASSCE — General Science</h3><p className="text-lg text-violet-400">Presbyterian Boys&apos; Secondary School</p><p className="mt-2 text-slate-300">PRESEC, Legon</p><p className="mt-1 text-sm text-slate-500">Graduated 2025</p></div></div></Card>
            </div>

            {/* Text-only certification cards */}
            <div className="mt-12">
              <h3 className="mb-6 text-2xl font-bold text-white">Certifications</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {textCerts.map((cert) => (
                  <div key={cert.id} className="rounded-xl border border-slate-800 bg-[#13151a] p-5 transition-colors hover:border-blue-500/30">
                    <Award className="h-6 w-6 text-blue-500" />
                    <h4 className="mt-4 font-semibold text-white">{cert.title}</h4>
                    {cert.date && <p className="mt-2 text-sm text-slate-500">{cert.date}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========== SKILLS ========== */}
        <section id="skills" className="bg-[#0f1116] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <SectionHeading subtitle="Capabilities">Technical Skills</SectionHeading>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SKILLS.map((skill) => (
                <Card key={skill.category}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400"><Cpu className="h-6 w-6" /></div>
                  <h3 className="mb-4 text-lg font-bold text-white">{skill.category}</h3>
                  <ul className="space-y-2">
                    {skill.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-slate-400"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" />{item}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CERTIFICATE GALLERY (image cards only) ========== */}
        {imageCerts.length > 0 && (
          <section id="certificates" className="px-6 py-24">
            <div className="mx-auto max-w-7xl">
              <SectionHeading subtitle="Proof of Learning">Certificate Gallery</SectionHeading>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {imageCerts.map((cert) => (
                  <div key={cert.id} className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#13151a] transition-all hover:border-blue-500/30">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={cert.image} alt={cert.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <h4 className="font-semibold text-white">{cert.title}</h4>
                      {cert.date && <p className="mt-1 text-sm text-slate-500">{cert.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ========== CONTACT / FOOTER ========== */}
        <footer id="contact" className="border-t border-white/5 bg-[#0b0c0f] px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Let&apos;s build a safer digital world together.</h2>
                <p className="mt-4 text-lg text-slate-400">
                  I&apos;m open to cybersecurity internships, technical learning opportunities, and collaborative projects.
                </p>
              </div>
              <div className="space-y-6">
                <a href="mailto:dallotey452@gmail.com" className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-[#13151a] p-5 transition-colors hover:border-blue-500/30"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400"><Mail className="h-5 w-5" /></div><div><p className="text-sm text-slate-500">Email</p><p className="font-medium text-white">dallotey452@gmail.com</p></div></a>
                <a href="https://www.linkedin.com/in/david-owusu-allotey/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-[#13151a] p-5 transition-colors hover:border-blue-500/30"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400"><svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></div><div><p className="text-sm text-slate-500">LinkedIn</p><p className="font-medium text-white">david-owusu-allotey</p></div></a>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-[#13151a] p-5"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400"><MapPin className="h-5 w-5" /></div><div><p className="text-sm text-slate-500">Location</p><p className="font-medium text-white">Accra, Ghana</p></div></div>
                <a href="tel:+233535208505" className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-[#13151a] p-5 transition-colors hover:border-blue-500/30"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-400"><Phone className="h-5 w-5" /></div><div><p className="text-sm text-slate-500">Phone</p><p className="font-medium text-white">+233 53 520 8505</p></div></a>
              </div>
            </div>
            <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
              <p className="text-sm text-slate-500">© {new Date().getFullYear()} David Owusu Allotey. All rights reserved.</p>
              <p className="flex items-center gap-1.5 text-sm text-slate-500"><Shield className="h-4 w-4 text-blue-500" />Built with React, Vite & Tailwind CSS</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
