import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle, Buildings, ArrowRight, ShieldCheck,
  Star, Sparkle, Question
} from '@phosphor-icons/react';
import { formatCurrency } from '../data/demoData';

export default function Pricing() {
  const navigate = useNavigate();
  const [annualBilling, setAnnualBilling] = useState(false);

  const tiers = [
    {
      name: 'Starter PMS',
      description: 'Ideal for guest houses, boutique hotels & B&Bs.',
      priceMonthly: 12000,
      priceAnnual: 9600,
      rooms: 'Up to 15 Rooms',
      features: [
        'Front Desk & Reservations',
        'Visual Room Rack & Calendar',
        'Guest Folios & Invoicing',
        'Express Check-In / Check-Out',
        'Single Property Access',
        'Standard Email Support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      description: 'For full-service independent hotels & resorts.',
      priceMonthly: 25000,
      priceAnnual: 20000,
      rooms: 'Up to 50 Rooms',
      features: [
        'Everything in Starter',
        'Housekeeping & Maintenance Dispatch',
        'Restaurant POS & Table Management',
        'Procurement & Inventory Tracking',
        'FBR / PRA 15% Sales Tax Invoicing',
        'Up to 3 Hotel Branches',
        'Priority Phone & WhatsApp Support'
      ],
      popular: true
    },
    {
      name: 'Enterprise Chain',
      description: 'Complete multi-property platform for hotel groups.',
      priceMonthly: 45000,
      priceAnnual: 36000,
      rooms: 'Unlimited Rooms & Branches',
      features: [
        'Everything in Professional',
        'Unlimited Hotel Properties & Chains',
        'Multi-Property Centralized Dashboard',
        'Biometric Time Clock Integration',
        'Custom Tax & Night Audit Reports',
        'White-Label Guest Portal',
        'Dedicated 24/7 Account Manager & SLA'
      ],
      popular: false
    }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-neutral-50)' }}>
      {/* Top Navbar */}
      <header style={{
        padding: 'var(--space-4) var(--space-8)',
        background: 'white',
        borderBottom: '1px solid var(--color-neutral-200)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--color-primary-600), var(--color-primary-800))',
            color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Buildings size={22} weight="bold" />
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)', lineHeight: 1 }}>
              HotelFlow
            </div>
            <div style={{ fontSize: '10px', color: 'var(--color-neutral-500)', letterSpacing: '0.05em' }}>
              PMS PLATFORM
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/login')}>
            Sign In
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/app/dashboard')}>
            Launch PMS App
          </button>
        </div>
      </header>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4) var(--space-8)', maxWidth: 800, margin: '0 auto' }}>
        <span className="badge badge-primary" style={{ fontSize: '11px', textTransform: 'uppercase', marginBottom: 12 }}>
          Commercial SaaS Pricing
        </span>
        <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)', margin: '8px 0 12px' }}>
          Transparent, Scalable Pricing for Hospitality
        </h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)', maxWidth: 580, margin: '0 auto var(--space-6)' }}>
          Choose the ideal tier for your hotel. No hidden transaction fees, no long-term lock-in. Cancel or upgrade anytime.
        </p>

        {/* Monthly / Annual Toggle */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'white', padding: '6px 12px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-neutral-300)', boxShadow: 'var(--shadow-xs)', maxWidth: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: !annualBilling ? 'bold' : 'normal', color: !annualBilling ? 'var(--color-neutral-900)' : 'var(--color-neutral-500)' }}>
            Monthly Billing
          </span>
          <div
            onClick={() => setAnnualBilling(!annualBilling)}
            style={{
              width: 44, height: 24, borderRadius: 12, background: annualBilling ? 'var(--color-primary-600)' : 'var(--color-neutral-300)',
              cursor: 'pointer', position: 'relative', transition: 'background 0.2s ease'
            }}
          >
            <div style={{
              width: 18, height: 18, borderRadius: '50%', background: 'white',
              position: 'absolute', top: 3, left: annualBilling ? 23 : 3,
              transition: 'left 0.2s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }} />
          </div>
          <span style={{ fontSize: 'var(--text-xs)', fontWeight: annualBilling ? 'bold' : 'normal', color: annualBilling ? 'var(--color-neutral-900)' : 'var(--color-neutral-500)' }}>
            Annual Billing <span style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>(Save 20%)</span>
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="responsive-pricing-grid" style={{ maxWidth: 1140, margin: '0 auto var(--space-16)', padding: '0 var(--space-4)' }}>
        {tiers.map(t => {
          const price = annualBilling ? t.priceAnnual : t.priceMonthly;

          return (
            <div
              key={t.name}
              className="card"
              style={{
                padding: 'var(--space-8)',
                borderRadius: 'var(--radius-2xl)',
                border: t.popular ? '2px solid var(--color-primary-600)' : '1px solid var(--color-neutral-200)',
                boxShadow: t.popular ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              {t.popular && (
                <span style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--color-primary-600)', color: 'white', fontSize: '11px',
                  fontWeight: 'bold', padding: '3px 12px', borderRadius: 'var(--radius-full)'
                }}>
                  HOTELIER'S CHOICE
                </span>
              )}
              <div>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)', margin: '0 0 6px' }}>
                  {t.name}
                </h3>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', margin: '0 0 var(--space-5)' }}>
                  {t.description}
                </p>

                <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)', marginBottom: 4 }}>
                  {formatCurrency(price)}
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'normal', color: 'var(--color-neutral-500)' }}> / month</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-primary-600)', fontWeight: '500', marginBottom: 'var(--space-6)' }}>
                  {t.rooms}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {t.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)' }}>
                      <CheckCircle size={15} color="var(--color-success)" weight="fill" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-8)' }}>
                <button
                  className={`btn ${t.popular ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ width: '100%', padding: '10px 0' }}
                  onClick={() => navigate('/app/dashboard')}
                >
                  Start 14-Day Free Trial <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
