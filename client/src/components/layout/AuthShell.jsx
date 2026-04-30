import { FiBarChart2, FiCheckCircle, FiLayers, FiShield, FiSmartphone, FiZap } from 'react-icons/fi';
import BrandLogo from '../branding/BrandLogo';

const highlights = [
  {
    icon: FiLayers,
    title: 'Beautiful portfolio blocks',
    description: 'Build polished sections for hero, about, skills, projects, and contact in minutes.',
  },
  {
    icon: FiBarChart2,
    title: 'ATS-aware storytelling',
    description: 'Shape a resume and portfolio that reinforce each other with smart structure.',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile-first by default',
    description: 'Every page responds cleanly from compact screens to large desktop layouts.',
  },
  {
    icon: FiShield,
    title: 'Secure publishing flow',
    description: 'Keep the build process simple while users publish and update with confidence.',
  },
];

export default function AuthShell({ children, eyebrow, title, description, badgeText }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F1A] text-[#E5E7EB]">
      <div className="absolute inset-0 brand-grid opacity-35" />
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#7C3AED]/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[#06B6D4]/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-[1200px] flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="flex items-center justify-between gap-4 pb-10 sm:pb-12">
          <BrandLogo />

          <div className="hidden items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-[#9CA3AF] backdrop-blur md:flex">
            <span className="inline-flex h-2 w-2 rounded-full bg-[#06B6D4]" />
            Fast, responsive, ATS-ready portfolio experiences
          </div>
        </header>

        <div className="grid flex-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <section className="hidden lg:flex lg:flex-col lg:justify-center lg:pr-8">
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#2563EB]/30 bg-[#111827]/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#93C5FD]">
              {eyebrow}
            </span>

            <h1 className="font-display max-w-xl text-5xl font-extrabold leading-tight text-white xl:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-[#9CA3AF]">
              {description}
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/8 bg-white/5 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-1 hover:border-[#2563EB]/30"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-white shadow-lg shadow-[#7C3AED]/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#9CA3AF]">{item.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#9CA3AF]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <FiCheckCircle className="text-[#06B6D4]" />
                Mobile responsive layouts
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <FiCheckCircle className="text-[#06B6D4]" />
                Smart resume flow
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <FiCheckCircle className="text-[#06B6D4]" />
                Premium portfolio branding
              </span>
            </div>
          </section>

          <section className="flex justify-center lg:justify-end">
            <div className="glass-panel brand-glow w-full max-w-xl rounded-[28px] border border-white/10 p-5 sm:p-6 lg:p-8">
              <div className="mb-8 flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/5 p-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9CA3AF]">{badgeText}</p>
                  <h2 className="mt-1 text-xl font-semibold text-white">Built for creators who want clarity</h2>
                </div>
                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] shadow-lg shadow-[#7C3AED]/20 sm:flex">
                  <img src="/Icon_logo.png" alt="Portlify icon" className="h-8 w-8 object-contain" />
                </div>
              </div>

              {children}

              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Clean UI', value: '01' },
                  { label: 'ATS ready', value: '02' },
                  { label: 'Responsive', value: '03' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/8 bg-white/5 p-3">
                    <div className="text-2xl font-bold text-white">{item.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[#9CA3AF]">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#06B6D4]/20 bg-gradient-to-r from-[#7C3AED]/15 to-[#06B6D4]/15 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#E5E7EB]">
                    <FiZap className="h-5 w-5 text-[#06B6D4]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">One workflow, three wins</p>
                    <p className="mt-1 text-sm leading-6 text-[#9CA3AF]">
                      Create the portfolio, refine the resume, and publish a polished public profile from one place.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}