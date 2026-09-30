import { useNavigate } from 'react-router-dom';
import {
  Buildings, CheckCircle, ChartBar, Users,
  ArrowRight, Star, Shield, Globe, Phone, Envelope,
  TwitterLogo, LinkedinLogo, GithubLogo, Play,
  RocketLaunch, Calendar, CreditCard, Wrench,
  ForkKnife, Package, Bell
} from '@phosphor-icons/react';

const features = [
  { icon: Calendar, title: 'Smart Reservations', desc: 'Manage bookings from direct, OTA, corporate and walk-in channels in one unified calendar.' },
  { icon: Users, title: 'Guest CRM', desc: 'Build rich guest profiles with preferences, history, VIP status and communication records.' },
  { icon: Buildings, title: 'Room Management', desc: 'Real-time room rack with drag-and-drop, status tracking and multi-floor floor plans.' },
  { icon: CheckCircle, title: 'Seamless Check-in/out', desc: 'Digital registration, ID verification, deposit collection and automated room assignment.' },
  { icon: CreditCard, title: 'Integrated Billing', desc: 'Consolidated invoices combining room charges, services, restaurant and extras.' },
  { icon: ForkKnife, title: 'Restaurant POS', desc: 'Full table management, menu, orders and direct room-charging for F&B operations.' },
  { icon: Wrench, title: 'Maintenance Tracking', desc: 'Issue tickets, assign staff, track resolution and keep rooms in perfect condition.' },
  { icon: Package, title: 'Inventory Control', desc: 'Manage stock levels, get low-stock alerts and automate purchase orders to vendors.' },
  { icon: ChartBar, title: 'Advanced Analytics', desc: 'ADR, RevPAR, occupancy trends and profit dashboards with beautiful interactive charts.' },
  { icon: Bell, title: 'Smart Notifications', desc: 'Automated alerts for arrivals, payments, maintenance issues and low inventory.' },
  { icon: Globe, title: 'Multi-property', desc: 'Manage multiple hotels from one dashboard with property-level and group analytics.' },
  { icon: Shield, title: 'Role-based Access', desc: 'Granular permissions for every team member from front desk to executive management.' },
];

const testimonials = [
  {
    name: 'Ahmed Raza',
    role: 'GM, Grand Royale Hotel, Lahore',
    text: 'HotelFlow transformed our operations completely. Occupancy is up 23% and our team saves 3+ hours daily.',
    rating: 5
  },
  {
    name: 'Sana Mirza',
    role: 'Owner, Serene Boutique, Islamabad',
    text: 'Finally a PMS that actually makes sense for Pakistani hotels. The bilingual support and PKR billing is perfect.',
    rating: 5
  },
  {
    name: 'James Whitfield',
    role: 'Director Ops, Whitfield Group',
    text: 'Managing 3 properties from one dashboard used to be a dream. HotelFlow made it reality.',
    rating: 5
  }
];

const faqs = [
  { q: 'Can I manage multiple properties?', a: 'Yes! Business and Enterprise plans support multiple properties with consolidated reporting and individual property controls.' },
  { q: 'Do you support Pakistani Rupee (PKR)?', a: 'Absolutely. HotelFlow is fully configured for PKR and Pakistani hospitality context, while remaining configurable for any global currency.' },
  { q: 'Is there a free trial?', a: 'Yes, you get a full 14-day free trial with no credit card required. Access all features of the Professional plan.' },
  { q: 'How does billing integration work?', a: 'All room charges, restaurant POS sales, services and extras automatically consolidate into guest invoices in real-time.' },
  { q: 'Can I integrate with existing booking platforms?', a: 'Yes, the API layer supports integration with OTAs like Booking.com, Expedia and local platforms. Enterprise plans include custom integrations.' },
  { q: 'What support is available?', a: 'Starter includes email support, Professional adds phone support, Business and Enterprise get priority and dedicated account management.' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-neutral-800)', background: '#FFFFFF' }}>
      {/* ===== NAVBAR ===== */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-neutral-100)',
        padding: '0 var(--space-8)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{
              width: 36, height: 36, background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-800))',
              borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(36,73,216,0.35)'
            }}>
              <Buildings size={20} color="white" weight="fill" />
            </div>
            <span style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}>
              HotelFlow
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
            <a href="#features" style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', textDecoration: 'none' }}>Features</a>
            <a href="#pricing" style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', textDecoration: 'none' }}>Pricing</a>
            <a href="#faq" style={{ color: 'var(--color-neutral-600)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-medium)', textDecoration: 'none' }}>FAQ</a>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/login')}>Sign In</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/dashboard')}>Start Free</button>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={{
        padding: '96px var(--space-8) 80px',
        background: 'linear-gradient(180deg, #F0F4FF 0%, #FFFFFF 100%)',
        borderBottom: '1px solid var(--color-neutral-100)'
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
            background: 'var(--color-primary-50)', border: '1px solid var(--color-primary-200)',
            borderRadius: 'var(--radius-full)', padding: '6px 16px',
            fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-primary-600)',
            marginBottom: 'var(--space-6)'
          }}>
            <RocketLaunch size={12} weight="fill" />
            Now with Multi-property Management
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-neutral-900)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-6)'
          }}>
            Run Your Hotel{' '}
            <span style={{ color: 'var(--color-primary-600)' }}>Smarter.</span>
          </h1>

          <p style={{
            fontSize: 'var(--text-xl)', color: 'var(--color-neutral-500)',
            lineHeight: 'var(--leading-relaxed)', maxWidth: 680, margin: '0 auto var(--space-10)'
          }}>
            One powerful platform to manage reservations, rooms, guests, housekeeping, billing, staff, and hotel performance.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-xl" onClick={() => navigate('/app/dashboard')}>
              Start Free — No Credit Card
              <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-secondary btn-xl"
              onClick={() => navigate('/app/dashboard')}
              style={{ gap: 'var(--space-3)' }}
            >
              <Play size={16} weight="fill" />
              View Live Demo
            </button>
          </div>

          <div style={{
            display: 'flex', gap: 'var(--space-8)', justifyContent: 'center',
            marginTop: 'var(--space-10)', flexWrap: 'wrap'
          }}>
            {[
              { label: '500+', sub: 'Hotels Using HotelFlow' },
              { label: '₨2.8B+', sub: 'Revenue Processed' },
              { label: '99.9%', sub: 'Uptime SLA' },
              { label: '4.9/5', sub: 'Customer Rating' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)' }}>{s.label}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DASHBOARD PREVIEW ===== */}
      <section style={{ padding: '80px var(--space-8)', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary-900) 0%, var(--color-primary-700) 100%)',
            borderRadius: 'var(--radius-2xl)',
            padding: 'var(--space-8)',
            boxShadow: 'var(--shadow-2xl)'
          }}>
            <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
              {[
                { label: 'Total Revenue', value: '₨29L', change: '+12%', color: '#22d3ee' },
                { label: 'Occupancy Rate', value: '78%', change: '+5%', color: '#34d399' },
                { label: 'ADR', value: '₨16,800', change: '+8%', color: '#a78bfa' },
                { label: 'RevPAR', value: '₨13,104', change: '+14%', color: '#fb923c' },
                { label: 'Rooms Available', value: '12', change: null, color: '#60a5fa' },
                { label: 'Today Check-ins', value: '2', change: null, color: '#f472b6' },
              ].map(k => (
                <div key={k.label} style={{
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: 'var(--radius-xl)', padding: 'var(--space-4)',
                  flex: '1 1 140px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.6)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k.label}</div>
                  <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-bold)', color: 'white' }}>{k.value}</div>
                  {k.change && <div style={{ fontSize: 'var(--text-xs)', color: k.color, marginTop: 4 }}>{k.change} vs last month</div>}
                </div>
              ))}
            </div>
            <div style={{
              height: 160, background: 'rgba(255,255,255,0.05)',
              borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.3)', fontSize: 'var(--text-sm)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <ChartBar size={32} style={{ marginBottom: 8, opacity: 0.5 }} />
                <div>Revenue & Occupancy Trend Chart</div>
                <button className="btn btn-sm" onClick={() => navigate('/app/analytics')}
                  style={{ marginTop: 12, background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
                  View Live Dashboard →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="features" style={{ padding: '80px var(--space-8)', background: 'var(--color-neutral-50)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-primary-600)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-3)' }}>
              Complete Feature Set
            </div>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)', letterSpacing: '-0.02em', marginBottom: 'var(--space-4)' }}>
              Everything Your Hotel Needs
            </h2>
            <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-lg)', maxWidth: 560, margin: '0 auto' }}>
              From front desk to back office — one integrated platform covers every aspect of your hotel operations.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--space-5)' }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                border: '1px solid var(--color-neutral-200)',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{
                  width: 44, height: 44, background: 'var(--color-primary-50)',
                  borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 'var(--space-4)', color: 'var(--color-primary-600)'
                }}>
                  <f.icon size={22} weight="duotone" />
                </div>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-semibold)', color: 'var(--color-neutral-800)', marginBottom: 'var(--space-2)' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WORKFLOW SECTION ===== */}
      <section style={{ padding: '80px var(--space-8)', background: 'white' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-semibold)', color: 'var(--color-primary-600)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-3)' }}>
            Integrated Workflow
          </div>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)', letterSpacing: '-0.02em', marginBottom: 'var(--space-4)' }}>
            One Connected System
          </h2>
          <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-base)', marginBottom: 'var(--space-10)' }}>
            Every module works together seamlessly. Changes in one area automatically cascade to related workflows.
          </p>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', gap: 'var(--space-2)', fontSize: 'var(--text-sm)'
          }}>
            {[
              'Reservation', '→', 'Check-in', '→', 'Room Occupied', '→',
              'Services', '→', 'Restaurant', '→', 'Invoice', '→',
              'Payment', '→', 'Checkout', '→', 'Room Dirty', '→',
              'Housekeeping', '→', 'Available'
            ].map((step, i) => (
              <span key={i} style={{
                ...(step === '→' ? {
                  color: 'var(--color-neutral-400)', fontWeight: 'var(--font-bold)'
                } : {
                  background: 'var(--color-primary-50)',
                  border: '1px solid var(--color-primary-200)',
                  color: 'var(--color-primary-700)',
                  fontWeight: 'var(--font-semibold)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-xs)'
                })
              }}>
                {step}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" style={{ padding: '80px var(--space-8)', background: 'var(--color-neutral-50)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)', letterSpacing: '-0.02em', marginBottom: 'var(--space-4)' }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ color: 'var(--color-neutral-500)', fontSize: 'var(--text-lg)' }}>
              Start free. Scale as you grow.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-5)' }}>
            {[
              { name: 'Starter', price: '₨9,900', period: '/mo', color: 'var(--color-neutral-600)', rooms: '20 rooms', highlight: false },
              { name: 'Professional', price: '₨24,900', period: '/mo', color: 'var(--color-primary-600)', rooms: '100 rooms', highlight: true },
              { name: 'Business', price: '₨59,900', period: '/mo', color: '#7C3AED', rooms: '300 rooms, 3 properties', highlight: false },
              { name: 'Enterprise', price: 'Custom', period: '', color: 'var(--color-gold)', rooms: 'Unlimited', highlight: false },
            ].map(plan => (
              <div key={plan.name} style={{
                background: plan.highlight ? 'var(--color-primary-600)' : 'white',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-8)',
                border: plan.highlight ? 'none' : '1px solid var(--color-neutral-200)',
                boxShadow: plan.highlight ? 'var(--shadow-xl)' : 'var(--shadow-sm)',
                position: 'relative',
                transform: plan.highlight ? 'scale(1.04)' : 'none'
              }}>
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--color-gold)', color: 'white',
                    fontSize: 'var(--text-xs)', fontWeight: 'var(--font-bold)',
                    padding: '4px 16px', borderRadius: 'var(--radius-full)'
                  }}>MOST POPULAR</div>
                )}
                <div style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: plan.highlight ? 'white' : plan.color, marginBottom: 'var(--space-2)' }}>
                  {plan.name}
                </div>
                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: plan.highlight ? 'white' : 'var(--color-neutral-900)', marginBottom: 'var(--space-2)' }}>
                  {plan.price}
                  <span style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-regular)', color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'var(--color-neutral-400)' }}>
                    {plan.period}
                  </span>
                </div>
                <div style={{ fontSize: 'var(--text-sm)', color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'var(--color-neutral-500)', marginBottom: 'var(--space-6)' }}>
                  Up to {plan.rooms}
                </div>
                <button
                  className={`btn btn-md w-full`}
                  style={plan.highlight ? {
                    background: 'white', color: 'var(--color-primary-700)', border: 'none', fontWeight: 'var(--font-semibold)'
                  } : {
                    background: 'transparent', color: plan.color, border: `1px solid ${plan.color}`
                  }}
                  onClick={() => navigate('/pricing')}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ padding: '80px var(--space-8)', background: 'white' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)', letterSpacing: '-0.02em' }}>
              Trusted by Hotel Professionals
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: 'var(--color-neutral-50)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-6)',
                border: '1px solid var(--color-neutral-200)'
              }}>
                <div style={{ display: 'flex', marginBottom: 'var(--space-4)' }}>
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} weight="fill" color="var(--color-gold)" />
                  ))}
                </div>
                <p style={{ color: 'var(--color-neutral-700)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-5)', fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div>
                  <div style={{ fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)' }}>{t.name}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" style={{ padding: '80px var(--space-8)', background: 'var(--color-neutral-50)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-neutral-900)', textAlign: 'center', marginBottom: 'var(--space-10)', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-neutral-200)', overflow: 'hidden'
              }}>
                <details style={{ cursor: 'pointer' }}>
                  <summary style={{
                    padding: 'var(--space-5)', fontWeight: 'var(--font-semibold)',
                    fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)',
                    listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}>
                    {faq.q}
                  </summary>
                  <div style={{ padding: '0 var(--space-5) var(--space-5)', color: 'var(--color-neutral-600)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section style={{
        padding: '96px var(--space-8)',
        background: 'linear-gradient(135deg, var(--color-primary-800) 0%, var(--color-primary-600) 100%)'
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)', color: 'white', letterSpacing: '-0.02em', marginBottom: 'var(--space-5)' }}>
            Ready to Transform Your Hotel?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-10)' }}>
            Join 500+ hotels already running on HotelFlow. Start your free 14-day trial today.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-xl" style={{ background: 'white', color: 'var(--color-primary-700)', border: 'none', fontWeight: 'var(--font-bold)' }} onClick={() => navigate('/app/dashboard')}>
              Start Free Trial
              <ArrowRight size={18} />
            </button>
            <button className="btn btn-xl" style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.4)' }} onClick={() => navigate('/app/dashboard')}>
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: 'var(--color-neutral-900)', padding: '64px var(--space-8) var(--space-8)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--space-10)', marginBottom: 'var(--space-10)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div style={{ width: 32, height: 32, background: 'var(--color-primary-600)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Buildings size={18} color="white" weight="fill" />
                </div>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)', color: 'white' }}>HotelFlow</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', maxWidth: 280 }}>
                Complete Hotel Management & Operations Platform. Built for modern hospitality businesses.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
                {[TwitterLogo, LinkedinLogo, GithubLogo].map((Icon, i) => (
                  <a key={i} href="#" style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'API Docs'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Partners'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Status', 'Security', 'Privacy'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ color: 'white', fontWeight: 'var(--font-semibold)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{col.title}</div>
                {col.links.map(link => (
                  <a key={link} href="#" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
                  >{link}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'var(--text-xs)' }}>
              © 2026 HotelFlow. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.35)', fontSize: 'var(--text-xs)', textDecoration: 'none' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
