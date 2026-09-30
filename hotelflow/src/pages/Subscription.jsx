import { useState } from 'react';
import {
  CreditCard, CheckCircle, Sparkle, Download,
  ArrowRight, ShieldCheck, CurrencyDollar, CalendarBlank
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../data/demoData';

export default function Subscription() {
  const { state, dispatch } = useApp();

  const [currentPlan, setCurrentPlan] = useState('enterprise');

  const plans = [
    {
      id: 'starter',
      name: 'Starter PMS',
      price: 12000,
      billing: 'per month',
      rooms: 'Up to 15 Rooms',
      features: ['Front Desk & Reservations', 'Room Calendar', 'Basic Invoicing', '1 Property', 'Email Support'],
      active: currentPlan === 'starter'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 25000,
      billing: 'per month',
      rooms: 'Up to 50 Rooms',
      features: ['Everything in Starter', 'Housekeeping & Maintenance', 'Restaurant POS & Inventory', 'Channel Manager API', 'Up to 3 Properties', 'Priority Phone Support'],
      popular: true,
      active: currentPlan === 'professional'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Chain',
      price: 45000,
      billing: 'per month',
      rooms: 'Unlimited Rooms & Chains',
      features: ['All Features Unlocked', 'Multi-Property Management', 'Custom GST & Tax Reports', 'Unlimited Staff Accounts', 'Biometric Clock Integration', 'Dedicated 24/7 Account Manager'],
      active: currentPlan === 'enterprise'
    }
  ];

  const invoices = [
    { id: 'SaaS-INV-1092', date: '15 Sep 2026', amount: 45000, status: 'paid', plan: 'Enterprise Plan (Sep 15 - Oct 14)' },
    { id: 'SaaS-INV-1024', date: '15 Aug 2026', amount: 45000, status: 'paid', plan: 'Enterprise Plan (Aug 15 - Sep 14)' },
    { id: 'SaaS-INV-0951', date: '15 Jul 2026', amount: 45000, status: 'paid', plan: 'Enterprise Plan (Jul 15 - Aug 14)' },
  ];

  const handleSelectPlan = (planId) => {
    setCurrentPlan(planId);
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Plan Updated',
        message: `Your hotel subscription updated to ${plans.find(p => p.id === planId)?.name}.`
      }
    });
  };

  return (
    <div className="subscription-page" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">SaaS Subscription & Licensing</h1>
          <p className="page-subtitle">Manage your HotelFlow enterprise subscription, capacity quotas and billing history</p>
        </div>
      </div>

      {/* Current Plan Overview Card */}
      <div className="card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-8)', background: 'linear-gradient(135deg, var(--color-primary-900), var(--color-primary-800))', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-gold" style={{ fontSize: '11px', background: '#F59E0B', color: '#1E293B', fontWeight: 'bold' }}>
                CURRENT ACTIVE TIER
              </span>
              <span style={{ fontSize: 'var(--text-xs)', color: '#93C5FD' }}>Renews on 15 Oct 2026</span>
            </div>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', margin: '8px 0 4px', color: 'white' }}>
              HotelFlow Enterprise Chain License
            </h2>
            <p style={{ margin: 0, fontSize: 'var(--text-xs)', color: '#CBD5E1' }}>
              Full access to multi-property management, restaurant POS, inventory, and unlimited room licenses.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 'bold' }}>₨45,000<span style={{ fontSize: 'var(--text-xs)', fontWeight: 'normal', color: '#93C5FD' }}> / month</span></div>
            <div style={{ fontSize: '11px', color: '#93C5FD', marginTop: 2 }}>Auto-charged via Master Credit Card (**** 4523)</div>
          </div>
        </div>

        {/* Capacity Meters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginTop: 'var(--space-6)', paddingTop: 'var(--space-5)', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#CBD5E1', marginBottom: 4 }}>
              <span>Total Rooms Active</span>
              <strong style={{ color: 'white' }}>42 / Unlimited</strong>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '42%', height: '100%', background: '#60A5FA' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#CBD5E1', marginBottom: 4 }}>
              <span>Staff Accounts</span>
              <strong style={{ color: 'white' }}>8 / Unlimited</strong>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '25%', height: '100%', background: '#34D399' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#CBD5E1', marginBottom: 4 }}>
              <span>Cloud Storage</span>
              <strong style={{ color: 'white' }}>4.2 GB / 50 GB</strong>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '15%', height: '100%', background: '#F472B6' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Plans Comparison */}
      <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-4)', color: 'var(--color-neutral-900)' }}>
        Available Subscription Tiers
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
        {plans.map(p => (
          <div
            key={p.id}
            className="card"
            style={{
              padding: 'var(--space-6)',
              border: p.active ? '2px solid var(--color-primary-600)' : '1px solid var(--color-neutral-200)',
              borderRadius: 'var(--radius-2xl)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            {p.popular && (
              <span style={{
                position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                background: 'var(--color-primary-600)', color: 'white', fontSize: '10px',
                fontWeight: 'bold', padding: '2px 10px', borderRadius: 'var(--radius-full)'
              }}>
                MOST POPULAR
              </span>
            )}
            <div>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', color: 'var(--color-neutral-900)', margin: '0 0 4px' }}>
                {p.name}
              </h3>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', marginBottom: 'var(--space-4)' }}>
                {p.rooms}
              </div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--color-neutral-900)', marginBottom: 'var(--space-5)' }}>
                {formatCurrency(p.price)}
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'normal', color: 'var(--color-neutral-500)' }}> / mo</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {p.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)' }}>
                    <CheckCircle size={14} color="var(--color-success)" weight="fill" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-6)' }}>
              {p.active ? (
                <button className="btn btn-secondary" style={{ width: '100%' }} disabled>
                  Current Plan
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => handleSelectPlan(p.id)}
                >
                  Switch to {p.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* SaaS Billing History */}
      <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-4)', color: 'var(--color-neutral-900)' }}>
        HotelFlow SaaS Billing Receipts
      </h2>
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Subscription Period</th>
              <th>Date</th>
              <th>Amount (PKR)</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'var(--color-primary-600)' }}>
                  {inv.id}
                </td>
                <td style={{ fontWeight: '500' }}>{inv.plan}</td>
                <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>{inv.date}</td>
                <td style={{ fontWeight: 'bold' }}>{formatCurrency(inv.amount)}</td>
                <td>
                  <span className="badge badge-success" style={{ fontSize: '10px' }}>PAID</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="btn btn-xs btn-ghost" onClick={() => window.print()}>
                    <Download size={13} /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
