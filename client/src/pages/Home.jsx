import { Link } from 'react-router-dom';
import { FiArrowRight, FiBarChart2, FiGrid, FiLayers, FiMonitor, FiTarget, FiEdit3, FiZap, FiCheckCircle } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import BrandLogo from '../components/branding/BrandLogo';
import { useAuthStore } from '../store/authStore';

const featureCards = [
  {
    icon: FiLayers,
    title: 'Premium portfolio blocks',
    description: 'Assemble hero, about, skills, projects, and contact sections that feel custom without starting from scratch.',
  },
  {
    icon: FiEdit3,
    title: 'Fast content editing',
    description: 'Update content quickly, keep the layout sharp, and publish a profile that looks intentional on every screen.',
  },
  {
    icon: FiBarChart2,
    title: 'ATS-informed storytelling',
    description: 'Use smarter structure for both the resume and the portfolio so the story is consistent from application to profile.',
  },
  {
    icon: FiMonitor,
    title: 'Responsive by default',
    description: 'Every section adapts cleanly across mobile, tablet, and large desktop breakpoints.',
  },
];

const templateCards = [
  {
    title: 'Bold Creator',
    detail: 'Large hero, confident typography, strong project focus.',
  },
  {
    title: 'Minimal Analyst',
    detail: 'Tight layout, clean hierarchy, ATS-friendly structure.',
  },
  {
    title: 'Studio Profile',
    detail: 'Visual-first sections with refined spacing and soft glow accents.',
  },
];

const atsPoints = [
  'Import a resume and turn it into a guided portfolio workflow.',
  'Highlight skills, experience, and projects with the right hierarchy.',
  'Publish a portfolio that feels designed, not assembled.',
];

const supportEmail = 'portlify.ind@gmail.com';

export default function Home() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="relative overflow-hidden bg-[#0B0F1A] text-[#E5E7EB]">
      <div className="absolute inset-0 brand-grid opacity-30" />
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#7C3AED]/20 blur-3xl" />
      <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-[#06B6D4]/15 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[28px] border border-white/8 bg-white/5 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex items-center justify-between gap-4">
            <BrandLogo />
            <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#9CA3AF] md:hidden">
              ATS-ready portfolio system
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#9CA3AF] md:gap-6">
            <a className="transition hover:text-white" href="#features">Features</a>
            <a className="transition hover:text-white" href="#templates">Templates</a>
            <a className="transition hover:text-white" href="#ats">ATS</a>
            <a className="transition hover:text-white" href="#cta">Get started</a>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="border-[#2563EB]/60 bg-transparent text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/5">
                Sign in
              </Button>
            </Link>
            <Link to={isAuthenticated ? '/dashboard' : '/register'}>
              <Button className="group bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white shadow-lg shadow-[#7C3AED]/20 transition-all duration-200 hover:scale-[1.02] hover:shadow-[#06B6D4]/25">
                {isAuthenticated ? 'Open dashboard' : 'Start free'}
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </header>

        <main className="space-y-24 pb-10 pt-8 sm:space-y-28 sm:pt-12 lg:space-y-32 lg:pt-16">
          <section className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/30 bg-[#111827]/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#93C5FD]">
                <FiZap className="h-4 w-4 text-[#06B6D4]" />
                Portlify complete brand system
              </span>

              <h1 className="font-display mt-6 max-w-3xl text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl">
                Build a portfolio that feels premium, smart, and mobile-ready from the first glance.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#9CA3AF] sm:text-xl">
                Portlify combines polished portfolio design, resume intelligence, and responsive publishing so creators can move fast without sacrificing quality.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to={isAuthenticated ? '/dashboard' : '/register'}>
                  <Button className="group h-12 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-6 text-white shadow-lg shadow-[#7C3AED]/25 transition-all duration-200 hover:scale-[1.02]">
                    {isAuthenticated ? 'Go to dashboard' : 'Create your portfolio'}
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="h-12 rounded-xl border-[#2563EB]/60 bg-transparent px-6 text-[#E5E7EB] hover:border-[#06B6D4] hover:bg-white/5">
                    Sign in
                  </Button>
                </Link>
              </div>

              <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  'Modern hero and project layouts',
                  'ATS-friendly resume workflow',
                  'Responsive across every breakpoint',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-[#D1D5DB]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-[#7C3AED]/20 via-[#1E2A78]/10 to-[#06B6D4]/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111827]/90 p-5 shadow-[0_28px_100px_rgba(0,0,0,0.45)] sm:p-6">
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <BrandLogo compact />
                  <div className="rounded-full border border-[#06B6D4]/25 bg-[#06B6D4]/10 px-3 py-1 text-xs font-semibold text-[#A5F3FC]">
                    Live portfolio preview
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="rounded-[24px] border border-white/8 bg-gradient-to-br from-[#111827] to-[#0B0F1A] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-[#9CA3AF]">Portfolio builder</p>
                        <h2 className="mt-2 text-2xl font-bold text-white">Elegant storytelling for every creator</h2>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] p-3 text-white shadow-lg shadow-[#7C3AED]/20">
                        <FiTarget className="h-6 w-6" />
                      </div>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {[
                        'Hero block',
                        'Project cards',
                        'Skills grid',
                        'Contact CTA',
                      ].map((item) => (
                        <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-[#E5E7EB]">
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-[#1F2937] bg-[#0F172A] p-4">
                      <div className="flex items-center justify-between text-sm text-[#9CA3AF]">
                        <span>Publishing readiness</span>
                        <span>98%</span>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white/10">
                        <div className="h-2 w-[98%] rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]" />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-[#9CA3AF]">
                        A clean build pipeline for a polished public portfolio and a confident career presence.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Card className="border-white/8 bg-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                      <CardHeader className="p-5 pb-3">
                        <CardTitle className="text-lg text-white">Design system</CardTitle>
                        <CardDescription className="text-[#9CA3AF]">Consistent brand palette, spacing, and motion</CardDescription>
                      </CardHeader>
                      <CardContent className="p-5 pt-0">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-[#1E2A78]" />
                          <div className="h-10 w-10 rounded-full bg-[#2563EB]" />
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-white/8 bg-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                      <CardHeader className="p-5 pb-3">
                        <CardTitle className="text-lg text-white">Mobile ready</CardTitle>
                        <CardDescription className="text-[#9CA3AF]">Layouts collapse cleanly on smaller screens</CardDescription>
                      </CardHeader>
                      <CardContent className="p-5 pt-0">
                        <div className="rounded-[22px] border border-white/10 bg-[#0B0F1A] p-4">
                          <div className="mx-auto h-40 max-w-[220px] rounded-[26px] border border-white/10 bg-gradient-to-b from-[#111827] to-[#0F172A] p-4">
                            <div className="h-3 w-20 rounded-full bg-white/15" />
                            <div className="mt-4 h-10 rounded-2xl bg-white/8" />
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              <div className="h-14 rounded-xl bg-white/8" />
                              <div className="h-14 rounded-xl bg-white/8" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="space-y-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#93C5FD]">Features</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Everything the user needs in one clean flow</h2>
              <p className="mt-4 text-base leading-7 text-[#9CA3AF]">
                Each section is designed to feel professional, fast, and easy to understand at a glance.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featureCards.map((card) => {
                const Icon = card.icon;

                return (
                  <Card key={card.title} className="border-white/8 bg-[#111827]/90 shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-1 hover:border-[#2563EB]/30">
                    <CardHeader className="p-5 pb-3">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-white shadow-lg shadow-[#7C3AED]/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-xl text-white">{card.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0">
                      <CardDescription className="text-sm leading-7 text-[#9CA3AF]">{card.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          <section id="templates" className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#93C5FD]">Templates showcase</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Starter directions that already feel finished</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#9CA3AF]">
                Give users a strong starting point with patterns that are clear, elegant, and quick to customize.
              </p>

              <div className="mt-8 space-y-4">
                {templateCards.map((template) => (
                  <div key={template.title} className="rounded-2xl border border-white/8 bg-white/5 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{template.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#9CA3AF]">{template.detail}</p>
                      </div>
                      <FiGrid className="h-5 w-5 text-[#06B6D4]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-white/8 bg-[#111827]/90 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardHeader className="p-6 pb-3">
                <CardTitle className="text-2xl text-white">Quick onboarding preview</CardTitle>
                <CardDescription className="text-[#9CA3AF]">A simple flow that keeps the user moving</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-0">
                {[
                  'Pick a visual direction',
                  'Add resume content and core sections',
                  'Publish a responsive portfolio page',
                ].map((step, index) => (
                  <div key={step} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/5 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-sm font-bold text-white">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{step}</p>
                      <p className="mt-1 text-sm leading-6 text-[#9CA3AF]">
                        Lightweight steps that keep the experience fast and approachable on every device.
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section id="ats" className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <Card className="border-white/8 bg-[#111827]/90 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardHeader className="p-6 pb-3">
                <CardTitle className="text-2xl text-white">ATS and resume intelligence</CardTitle>
                <CardDescription className="text-[#9CA3AF]">The career signal should be as strong as the design signal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-0">
                {atsPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 p-4">
                    <FiCheckCircle className="mt-1 h-5 w-5 shrink-0 text-[#06B6D4]" />
                    <p className="text-sm leading-7 text-[#D1D5DB]">{point}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#93C5FD]">Career focused</p>
              <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">A polished public page that supports the job search</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#9CA3AF]">
                The layout keeps the portfolio creator, resume importer, and live portfolio view aligned around one story.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Consistent brand language',
                  'Readable hierarchy',
                  'Fast editor-to-publish flow',
                  'Responsive presentation layer',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-[#E5E7EB]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="cta" className="rounded-[32px] border border-white/10 bg-gradient-to-r from-[#111827] via-[#1E2A78]/65 to-[#111827] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.35)] sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#93C5FD]">Start now</p>
                <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">Launch a portfolio presence that feels premium on day one</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[#D1D5DB]">
                  Sign in to manage your work or create a fresh account and start shaping the kind of portfolio people remember.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link to={isAuthenticated ? '/dashboard' : '/register'}>
                  <Button className="w-full rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] px-6 text-white shadow-lg shadow-[#7C3AED]/25 transition-all duration-200 hover:scale-[1.02] sm:w-auto">
                    {isAuthenticated ? 'Open dashboard' : 'Create account'}
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full rounded-xl border-white/15 bg-white/5 px-6 text-[#E5E7EB] hover:bg-white/10 sm:w-auto">
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <Card className="border-white/8 bg-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardHeader className="p-6 pb-3">
                <CardTitle className="text-2xl text-white">Built with love</CardTitle>
                <CardDescription className="text-[#9CA3AF]">Creator credit and platform contact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-0">
                <div className="rounded-2xl border border-white/8 bg-[#111827]/85 p-4">
                  <p className="text-sm uppercase tracking-[0.24em] text-[#9CA3AF]">Builder</p>
                  <p className="mt-2 text-2xl font-bold text-white">Nitesh Sharma</p>
                  <p className="mt-2 text-sm leading-7 text-[#D1D5DB]">
                    Built with love by Nitesh Sharma for creators who want a premium portfolio, resume intelligence, and a fast publishing flow.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <a
                    href="https://github.com/NITESHBHARDWAJ001"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open Nitesh Sharma GitHub profile"
                    title="Open Nitesh Sharma GitHub profile"
                    className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-[#E5E7EB] transition hover:border-[#06B6D4]/40 hover:bg-white/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111827] text-white ring-1 ring-white/10 transition group-hover:ring-[#06B6D4]/40">
                      <FaGithub className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-white">GitHub profile</span>
                      <span className="block break-all text-xs text-[#93C5FD]">github.com/NITESHBHARDWAJ001</span>
                    </span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nitesh-sharma-5b4115306"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open Nitesh Sharma LinkedIn profile"
                    title="Open Nitesh Sharma LinkedIn profile"
                    className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-[#E5E7EB] transition hover:border-[#06B6D4]/40 hover:bg-white/10"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#111827] text-white ring-1 ring-white/10 transition group-hover:ring-[#06B6D4]/40">
                      <FaLinkedinIn className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-medium text-white">LinkedIn profile</span>
                      <span className="block break-all text-xs text-[#93C5FD]">linkedin.com/in/nitesh-sharma-5b4115306</span>
                    </span>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/8 bg-[#111827]/90 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
              <CardHeader className="p-6 pb-3">
                <CardTitle className="text-2xl text-white">Platform suggestions</CardTitle>
                <CardDescription className="text-[#9CA3AF]">Help shape what comes next</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-0">
                <p className="text-sm leading-7 text-[#D1D5DB]">
                  If you want to suggest new blocks, templates, AI prompts, ATS improvements, or any other additions, send them here:
                </p>

                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex items-center gap-2 rounded-2xl border border-[#06B6D4]/25 bg-[#06B6D4]/10 px-4 py-3 text-sm font-semibold text-[#A5F3FC] transition hover:border-[#06B6D4]/50 hover:bg-[#06B6D4]/15"
                >
                  {supportEmail}
                </a>

                <p className="text-xs leading-6 text-[#9CA3AF]">
                  Suggestions, additions, bug reports, and feature ideas are all welcome.
                </p>
              </CardContent>
            </Card>
          </section>
        </main>

        <footer className="pb-8 pt-4 text-center text-sm text-[#6B7280]">
          Portlify — a complete portfolio, resume, and career storytelling system. Built with love by Nitesh Sharma.
        </footer>
      </div>
    </div>
  );
}