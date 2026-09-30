import { useState } from 'react';
import {
  Gear, Buildings, Clock, CurrencyDollar, Bell,
  CheckCircle, FloppyDisk, ShieldCheck
} from '@phosphor-icons/react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { state, dispatch } = useApp();

  const [activeTab, setActiveTab] = useState('general');

  const [generalSettings, setGeneralSettings] = useState({
    hotelName: 'Pearl Continental Islamabad',
    shortName: 'PC Islamabad',
    phone: '+92-51-2279011',
    email: 'islamabad@pchotels.pk',
    address: 'Club Road, Islamabad, Pakistan',
    starRating: 5,
    timezone: 'Asia/Karachi (PKT)'
  });

  const [frontDeskSettings, setFrontDeskSettings] = useState({
    checkInTime: '14:00',
    checkOutTime: '12:00',
    lateCheckoutGraceMinutes: 60,
    allowOverbooking: false,
    autoDirtyOnCheckout: true
  });

  const [financeSettings, setFinanceSettings] = useState({
    currency: 'PKR',
    currencySymbol: '₨',
    taxRate: 15,
    ntnNumber: '1234567-8',
    invoicePrefix: 'INV-2026',
    autoInvoiceGeneration: true
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: {
        currency: financeSettings.currency,
        taxRate: Number(financeSettings.taxRate),
        checkInTime: frontDeskSettings.checkInTime,
        checkOutTime: frontDeskSettings.checkOutTime
      }
    });

    dispatch({
      type: 'ADD_TOAST',
      payload: {
        type: 'success',
        title: 'Settings Saved',
        message: 'Platform configuration updated successfully.'
      }
    });
  };

  return (
    <div className="settings-page" style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div className="page-header" style={{ marginBottom: 'var(--space-6)' }}>
        <div className="page-title-group">
          <h1 className="page-title">Hotel & System Settings</h1>
          <p className="page-subtitle">Configure hotel operational policies, tax parameters, business details and integrations</p>
        </div>
      </div>

      <div className="responsive-settings-layout">
        {/* Navigation Sidebar */}
        <div className="card" style={{ padding: 'var(--space-3)' }}>
          {[
            { id: 'general', label: 'Hotel Profile', icon: Buildings },
            { id: 'operations', label: 'Front Desk Policies', icon: Clock },
            { id: 'finance', label: 'Taxes & Invoicing', icon: CurrencyDollar },
            { id: 'notifications', label: 'Alerts & Automations', icon: Bell },
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-lg)',
                  border: 'none', background: isSelected ? 'var(--color-primary-50)' : 'transparent',
                  color: isSelected ? 'var(--color-primary-700)' : 'var(--color-neutral-700)',
                  fontWeight: isSelected ? 'bold' : '500', fontSize: 'var(--text-xs)',
                  cursor: 'pointer', textAlign: 'left', marginBottom: 4
                }}
              >
                <Icon size={18} weight={isSelected ? 'fill' : 'regular'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <form onSubmit={handleSaveSettings} className="card" style={{ padding: 'var(--space-6)' }}>
          {activeTab === 'general' && (
            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-4)', color: 'var(--color-neutral-900)' }}>
                Hotel Property Profile
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Official Hotel Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={generalSettings.hotelName}
                    onChange={e => setGeneralSettings({ ...generalSettings, hotelName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Display Code / Short Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={generalSettings.shortName}
                    onChange={e => setGeneralSettings({ ...generalSettings, shortName: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Contact Telephone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={generalSettings.phone}
                    onChange={e => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Official Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={generalSettings.email}
                    onChange={e => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Physical Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={generalSettings.address}
                  onChange={e => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Hotel Star Category</label>
                  <select
                    className="form-control"
                    value={generalSettings.starRating}
                    onChange={e => setGeneralSettings({ ...generalSettings, starRating: Number(e.target.value) })}
                  >
                    <option value="3">3 Star Boutique</option>
                    <option value="4">4 Star Executive</option>
                    <option value="5">5 Star Luxury Resort</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Standard Timezone</label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={generalSettings.timezone}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'operations' && (
            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-4)', color: 'var(--color-neutral-900)' }}>
                Front Desk Operations & Policy
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Default Check-In Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={frontDeskSettings.checkInTime}
                    onChange={e => setFrontDeskSettings({ ...frontDeskSettings, checkInTime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Default Check-Out Time</label>
                  <input
                    type="time"
                    className="form-control"
                    value={frontDeskSettings.checkOutTime}
                    onChange={e => setFrontDeskSettings({ ...frontDeskSettings, checkOutTime: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Complimentary Late Checkout Grace (Minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ width: 140 }}
                  value={frontDeskSettings.lateCheckoutGraceMinutes}
                  onChange={e => setFrontDeskSettings({ ...frontDeskSettings, lateCheckoutGraceMinutes: Number(e.target.value) })}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={frontDeskSettings.autoDirtyOnCheckout}
                    onChange={e => setFrontDeskSettings({ ...frontDeskSettings, autoDirtyOnCheckout: e.target.checked })}
                  />
                  <span>Automatically flag room as <strong>Dirty</strong> and create high-priority turnover cleaning task on check-out</span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'finance' && (
            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-4)', color: 'var(--color-neutral-900)' }}>
                Taxation, Currency & Invoicing
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Base Operating Currency</label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value="Pakistani Rupee (PKR - ₨)"
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Provincial / Federal Sales Tax (GST %)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={financeSettings.taxRate}
                    onChange={e => setFinanceSettings({ ...financeSettings, taxRate: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>FBR / PRA Tax Registration NTN</label>
                  <input
                    type="text"
                    className="form-control"
                    value={financeSettings.ntnNumber}
                    onChange={e => setFinanceSettings({ ...financeSettings, ntnNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: 'var(--text-xs)' }}>Invoice Serial Prefix</label>
                  <input
                    type="text"
                    className="form-control"
                    value={financeSettings.invoicePrefix}
                    onChange={e => setFinanceSettings({ ...financeSettings, invoicePrefix: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'bold', marginBottom: 'var(--space-4)', color: 'var(--color-neutral-900)' }}>
                Automations & Real-Time Alerts
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-xs)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Send instant automated Booking Confirmation email to guest with PDF registration summary</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-xs)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Send pre-arrival SMS & WhatsApp notification 24 hours before check-in</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-xs)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Notify General Manager immediately when room maintenance ticket marked Urgent</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-xs)', cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Low stock threshold alert when toiletries drop below 200 units</span>
                </label>
              </div>
            </div>
          )}

          {/* Submit */}
          <div style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-neutral-200)', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '8px 24px' }}>
              <FloppyDisk size={16} /> Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
