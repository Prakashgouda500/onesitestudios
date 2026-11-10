import React, { useEffect } from "react";
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Code2, Gift, GraduationCap, Heart, IndianRupee, Mail, Newspaper, Sparkles, Users, Wifi } from "lucide-react";
import { Contact } from "./Contact";
import { WaveDivider } from "./ui/WaveDivider";

type DedicatedPageProps = {
  page: "solutions" | "blog" | "careers" | "refer";
  onNavigate?: (page: "home" | "solutions" | "pricing" | "blog" | "careers" | "refer" | "contact" | "quote" | string) => void;
};

const pageContent = {
  blog: {
    eyebrow: "THE JOURNAL",
    title: "Ideas for building better digital products.",
    description: "Practical notes on product strategy, engineering, AI, and the decisions that help ambitious teams move faster.",
    icon: Newspaper,
    items: [
      ["Product strategy", "How to turn a strong idea into a clear product roadmap."],
      ["Engineering", "Patterns for building software that stays fast as it grows."],
      ["AI and automation", "Where intelligent workflows create meaningful leverage."],
    ],
  },
  careers: {
    eyebrow: "CAREERS",
    title: "Do work that moves businesses forward.",
    description: "We are building a thoughtful, curious team for ambitious digital projects. Bring your craft, your questions, and your point of view.",
    icon: BriefcaseBusiness,
    items: [
      ["Frontend Engineer", "Build polished interfaces with React and TypeScript."],
      ["Product Designer", "Shape clear, useful experiences from first principles."],
      ["AI Engineer", "Turn emerging capabilities into dependable products."],
    ],
  },
  refer: {
    eyebrow: "REFER & EARN",
    title: "Good work is better when it is shared.",
    description: "Know a team that needs a reliable digital partner? Introduce us and earn a referral reward when the project begins.",
    icon: Gift,
    items: [
      ["Introduce a team", "Share a warm introduction with a business that needs help."],
      ["We take it from there", "Our team handles discovery and keeps the process transparent."],
      ["Earn a reward", "Receive a referral reward when the engagement starts."],
    ],
  },
} as const;

const solutionSections = [
  {
    id: "web-dev",
    number: "01",
    title: "Web Development",
    subtitle: "Fast. SEO-optimized. Mobile-first.",
    description: "We build high-performance websites using Next.js, React, and modern web technologies. Every site is optimized for speed, SEO, and mobile responsiveness from day one.",
    features: ["Server-side rendering for SEO", "Mobile-first responsive design", "90+ Lighthouse performance score", "Fast loading under 2 seconds", "Content management ready", "Analytics & tracking integration"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "erp-management",
    number: "02",
    title: "ERP & Management Systems",
    subtitle: "Attendance. Fees. Payroll. Automation.",
    description: "Custom-built management systems for schools, colleges, and institutions. Automate attendance, fees, payroll, and reporting with a single unified platform.",
    features: ["Student/Staff attendance tracking", "Fee management & payment gateway", "Payroll automation", "Report generation & analytics", "Role-based access control", "Parent/Student portals"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "mobile-apps",
    number: "03",
    title: "Mobile Applications",
    subtitle: "Android & iOS from a single codebase.",
    description: "Native-quality mobile applications built with React Native. Deploy to both Android and iOS from one codebase, saving time and cost.",
    features: ["Single codebase for Android & iOS", "Native-quality performance", "Push notifications", "Offline-first capabilities", "App Store & Play Store deployment", "API integration & backend"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "custom-software",
    number: "04",
    title: "Custom Software",
    subtitle: "Systems shaped around your operations.",
    description: "Custom-built management systems for schools, colleges, institutions, and growing businesses that need software built around their processes.",
    features: ["Role-based access control", "Dashboards and reporting", "Business process automation", "Secure API integrations", "Scalable cloud architecture", "Ongoing support and updates"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "ui-ux",
    number: "05",
    title: "UI/UX Design",
    subtitle: "Clear, useful, and memorable experiences.",
    description: "User interfaces that combine clarity, usability, and visual impact to help people complete important tasks with confidence.",
    features: ["User flows and wireframes", "Responsive interface systems", "Interactive prototypes", "Accessibility-first design", "Design systems and components", "Usability improvements"],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "e-commerce",
    number: "06",
    title: "E-Commerce",
    subtitle: "Sell online. Take bookings. Manage operations.",
    description: "Full-featured online stores and booking systems with payment processing, inventory management, and customer management built in.",
    features: ["Product catalog and inventory", "Secure payment processing", "Order tracking and management", "Booking and appointment scheduling", "Customer accounts and wishlists", "Admin dashboards and reports"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "saas-dev",
    number: "07",
    title: "SaaS Development",
    subtitle: "From MVP to a scalable product.",
    description: "Scalable software-as-a-service products built with the foundations needed to support teams, subscriptions, and sustained growth.",
    features: ["Multi-tenant architecture", "Subscription and billing flows", "Team and permission management", "Usage analytics", "Reliable cloud deployment", "MVP-to-production roadmap"],
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "automation",
    number: "08",
    title: "Automation",
    subtitle: "Less repetition. More operational focus.",
    description: "Automate repetitive workflows and connect the tools your business already depends on to improve speed and consistency.",
    features: ["Workflow and task automation", "API and tool integrations", "Scheduled data processing", "Notifications and approvals", "Error handling and audit trails", "Performance monitoring"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "iot",
    number: "09",
    title: "IoT",
    subtitle: "Connected devices. Real-time telemetry. Intelligent hardware.",
    description: "End-to-end IoT software and firmware solutions connecting microcontrollers, smart sensors, and edge gateways to secure cloud platforms and real-time operational dashboards.",
    features: ["Custom microcontroller firmware (ESP32, STM32, ARM)", "Real-time MQTT, WebSockets, and telemetry streaming", "Ultra-low power sleep states and mesh networking", "Industrial protocols: Modbus, CAN Bus, and RS485", "Over-the-Air (OTA) secure firmware fleet deployments", "Enterprise cloud pipelines with AWS IoT & Azure IoT Hub"],
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=85",
  },
] as const;

const careerBenefits = [
  { title: "Remote Friendly", description: "Work from anywhere in India. Flexible hybrid options available.", icon: Wifi },
  { title: "Learning & Growth", description: "Access to courses, conferences, and mentorship programs.", icon: GraduationCap },
  { title: "Modern Tech Stack", description: "Work with Next.js, React, TypeScript, and cloud-native tools.", icon: Code2 },
  { title: "Collaborative Culture", description: "Small team, big impact. Your ideas shape the product.", icon: Users },
  { title: "Competitive Pay", description: "Market-aligned compensation with performance bonuses.", icon: IndianRupee },
  { title: "Work-Life Balance", description: "Flexible hours, paid time off, and no crunch culture.", icon: Heart },
] as const;

const CareersPage: React.FC = () => (
  <main className="min-h-screen bg-white pt-20 text-[#071a3a]">
    <section className="bg-gradient-to-br from-[#091540] via-[#102c70] to-[#1b5ed8] px-6 py-28 text-center text-white md:px-8 md:py-36">
      <BriefcaseBusiness className="mx-auto h-9 w-9 text-blue-200" />
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-blue-200">CAREERS</p>
      <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Do work that moves businesses forward.</h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100">We are building a thoughtful, curious team for ambitious digital projects. Bring your craft, your questions, and your point of view.</p>
    </section>
    <WaveDivider fromColor="#102c70" toColor="#ffffff" />
    <section className="relative overflow-hidden bg-white px-6 py-20 md:px-8 md:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#dbe4f3_1px,transparent_1px)] [background-size:1.5rem_1.5rem]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Perks &amp; Benefits</h2>
          <p className="mt-5 text-lg text-slate-500">We invest in our people as much as our products.</p>
        </div>
        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {careerBenefits.map(({ title, description, icon: BenefitIcon }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-slate-50/90 p-7 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <BenefitIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-7 text-xl font-bold text-slate-950">{title}</h3>
              <p className="mt-3 text-base leading-relaxed text-slate-500">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  </main>
);

const SolutionsPage: React.FC<{ onNavigate?: (page: string) => void }> = ({ onNavigate }) => {
  const selectedService = new URLSearchParams(window.location.search).get("service");

  useEffect(() => {
    if (!selectedService) return;
    document.getElementById(`solution-${selectedService}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedService]);

  return (
  <main className="bg-white pt-20 text-[#071a3a]">
    <section className="px-6 pb-20 pt-24 text-center md:px-8 md:pb-28 md:pt-32">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-600">WHAT WE BUILD</p>
      <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">Digital products built for real-world growth.</h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-500">From modern websites to intelligent business systems, we design and build solutions that make your next move easier.</p>
    </section>

    <section className="mx-auto max-w-7xl px-6 pb-24 md:px-8 md:pb-32">
      {solutionSections.map((solution, index) => (
        <article id={`solution-${solution.id}`} key={solution.id} className={`scroll-mt-24 grid items-center gap-12 border-t border-slate-100 py-16 md:grid-cols-2 md:gap-20 md:py-20 ${selectedService === solution.id ? "rounded-2xl bg-blue-50/60 px-5 ring-1 ring-blue-200 md:px-8" : ""}`}>
          <div className={index % 2 === 1 ? "md:order-2" : ""}>
            <p className="text-sm font-bold text-blue-600">{solution.number}</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">{solution.title}</h2>
            <p className="mt-4 text-lg font-medium text-blue-600">{solution.subtitle}</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500">{solution.description}</p>
            <ul className="mt-8 space-y-4">
              {solution.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-base text-slate-800">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-blue-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="/quote"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("quote");
                }
              }}
              className="mt-10 inline-flex items-center gap-3 rounded-lg bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className={index % 2 === 1 ? "md:order-1" : ""}>
            <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
              <img src={solution.image} alt={solution.title} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
              <div className="absolute bottom-5 left-5 rounded-xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm">
                <p className="text-sm font-bold text-slate-900">{solution.title}</p>
                <p className="mt-1 text-xs text-slate-500">{solution.subtitle}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>

    <WaveDivider fromColor="#ffffff" toColor="#1d2737" />
    <section className="relative overflow-hidden bg-[#1d2737] px-6 py-24 text-center text-white md:px-8 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_55%)]" />
      <div className="relative">
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Ready to get started?</h2>
        <p className="mt-5 text-base text-slate-300">Let&apos;s discuss your project and build something great together.</p>
        <a
          href="/quote"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate("quote");
            }
          }}
          className="mt-9 inline-flex items-center gap-3 rounded-lg bg-blue-600 px-8 py-4 text-sm font-bold text-white transition-colors hover:bg-blue-500"
        >
          Schedule Free Consultation
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  </main>
  );
};

export const DedicatedPage: React.FC<DedicatedPageProps> = ({ page, onNavigate }) => {
  if (page === "solutions") {
    return <SolutionsPage onNavigate={onNavigate} />;
  }

  if (page === "careers") {
    return <CareersPage />;
  }

  const content = pageContent[page];
  const Icon = content.icon;

  return (
    <main className="min-h-screen bg-slate-50 pt-20 text-slate-950">
      <section className="bg-gradient-to-br from-[#091540] via-[#102c70] to-[#1b5ed8] px-6 py-28 text-center text-white md:px-8 md:py-36">
        <Icon className="mx-auto h-9 w-9 text-blue-200" />
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.3em] text-blue-200">{content.eyebrow}</p>
        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">{content.title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-blue-100">{content.description}</p>
      </section>
      <WaveDivider fromColor="#102c70" toColor="#f8fafc" />
      <section className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <div className="grid gap-5 md:grid-cols-3">
          {content.items.map(([title, description]) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <h2 className="mt-6 text-xl font-bold">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">{description}</p>
            </article>
          ))}
        </div>
        <a
          href="/quote"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate("quote");
            }
          }}
          className="mx-auto mt-12 flex w-fit items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
        >
          Start a conversation
          <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </main>
  );
};

export const ContactPage: React.FC = () => <Contact />;

export const ContactIcon: React.FC = () => <Mail className="h-5 w-5" />;
