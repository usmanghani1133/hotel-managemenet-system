import { useState } from 'react';
import {
  Envelope, ChatText, Plus, CheckCircle, Pencil,
  ArrowsClockwise, Bell, Sparkle, X
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function Communication() {
  const { state, dispatch } = useApp();

  const [templates, setTemplates] = useState(state.communicationTemplates || [
    { id: 'ct-1', name: 'Booking Confirmation', trigger: 'On Reservation', subject: 'Your Booking is Confirmed — {{hotel_name}}', type: 'Email', active: true },
    { id: 'ct-2', name: 'Pre-arrival Welcome', trigger: '1 day before check-in', subject: 'We Look Forward to Welcoming You Tomorrow!', type: 'Email', active: true },
    { id: 'ct-3', name: 'Check-in Confirmation', trigger: 'On Check-in', subject: 'Welcome to {{hotel_name}} — Room {{room_number}}', type: 'Email', active: true },
    { id: 'ct-4', name: 'Payment Receipt', trigger: 'On Payment', subject: 'Payment Receipt — {{hotel_name}}', type: 'Email', active: true },
    { id: 'ct-5', name: 'Checkout Invoice', trigger: 'On Check-out', subject: 'Thank You for Staying — Your Invoice', type: 'Email', active: true },
    { id: 'ct-6', name: 'Cancellation Confirmation', trigger: 'On Cancellation', subject: 'Booking Cancellation Confirmed', type: 'Email', active: true },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [templateBody, setTemplateBody] = useState(`Dear {{guest_name}},

Thank you for choosing {{hotel_name}}. Your reservation {{booking_id}} is confirmed from {{checkin_date}} to {{checkout_date}}.

Room Type: {{room_type}}
Total Tariff: {{total_amount}}

We look forward to welcoming you soon!

Warm regards,
Front Office Team
{{hotel_name}}`);

  const handleToggleActive = (id) => {
    setTemplates(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'info',
        title: 'Template Updated',
        message: 'Communication automation status changed.'
      }
    });
  };

  const handleSaveTemplate = () => {
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Template Saved',
        message: `${selectedTemplate.name} updated and active for automations.`
      }
    });
  };

  return (
    <div className="communication-page" style={{ maxWidth: 1100, margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Guest Communication & Messaging Automations</h1>
          <p className="page-subtitle">Configure automated email and SMS notification templates for guest lifecycle triggers</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 'var(--space-6)' }}>
        {/* Templates List */}
        <div className="card" style={{ padding: 'var(--space-4)' }}>
          <h3 style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', color: 'var(--color-neutral-400)', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
            System Event Triggers ({templates.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {templates.map(t => {
              const isSelected = selectedTemplate?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTemplate(t)}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    border: isSelected ? '2px solid var(--color-primary-600)' : '1px solid var(--color-neutral-200)',
                    background: isSelected ? 'var(--color-primary-50)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontWeight: '600', fontSize: 'var(--text-sm)', color: isSelected ? 'var(--color-primary-700)' : 'var(--color-neutral-900)' }}>
                      {t.name}
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleActive(t.id);
                      }}
                      className={`badge ${t.active ? 'badge-success' : 'badge-neutral'}`}
                      style={{ fontSize: '9px', cursor: 'pointer' }}
                    >
                      {t.active ? 'ACTIVE' : 'PAUSED'}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--color-neutral-500)' }}>
                    Trigger: <strong>{t.trigger}</strong> • {t.type}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Template Editor */}
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <div style={{ borderBottom: '1px solid var(--color-neutral-200)', paddingBottom: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="badge badge-info" style={{ fontSize: '10px' }}>
                  {selectedTemplate?.type} Trigger
                </span>
                <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 'bold', margin: '6px 0 2px', color: 'var(--color-neutral-900)' }}>
                  {selectedTemplate?.name}
                </h2>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                  Auto-dispatched: <strong>{selectedTemplate?.trigger}</strong>
                </div>
              </div>

              <button className="btn btn-primary btn-sm" onClick={handleSaveTemplate}>
                Save Template
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Subject Line</label>
            <input
              type="text"
              className="form-control"
              value={selectedTemplate?.subject || ''}
              onChange={e => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <label className="form-label" style={{ fontSize: 'var(--text-xs)', margin: 0 }}>Message Body</label>
              <div style={{ fontSize: '11px', color: 'var(--color-primary-600)' }}>
                Tokens: {'{{guest_name}}, {{hotel_name}}, {{checkin_date}}, {{room_number}}'}
              </div>
            </div>
            <textarea
              className="form-control"
              rows={10}
              style={{ fontFamily: 'monospace', fontSize: 'var(--text-xs)', lineHeight: '1.5' }}
              value={templateBody}
              onChange={e => setTemplateBody(e.target.value)}
            />
          </div>

          {/* Available Placeholders */}
          <div style={{ background: 'var(--color-neutral-50)', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--color-neutral-500)', textTransform: 'uppercase' }}>
              Available Merge Fields
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
              {['{{guest_name}}', '{{hotel_name}}', '{{booking_id}}', '{{checkin_date}}', '{{checkout_date}}', '{{room_number}}', '{{room_type}}', '{{total_amount}}', '{{balance_due}}'].map(token => (
                <span
                  key={token}
                  onClick={() => setTemplateBody(prev => prev + ` ${token} `)}
                  style={{
                    fontSize: '11px', fontFamily: 'monospace', background: 'white',
                    border: '1px solid var(--color-neutral-300)', padding: '2px 6px',
                    borderRadius: 4, cursor: 'pointer', color: 'var(--color-primary-700)'
                  }}
                  title="Click to insert"
                >
                  + {token}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
