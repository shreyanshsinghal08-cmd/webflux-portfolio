'use client';

import { useState, useEffect } from 'react';
import BillingShell from '@/components/billing/layout/BillingShell';
import {
  Settings,
  ShieldCheck,
  Bell,
  Building,
  MapPin,
  CheckCircle2,
  Lock,
  Save,
} from 'lucide-react';
import type { BillingSettings } from '@/types/billing';
import { billingApi, INITIAL_SETTINGS } from '@/lib/billing-api';

export default function SettingsPage() {
  const [settings, setSettings] = useState<BillingSettings>(INITIAL_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await billingApi.getSettings();
        setSettings(data);
      } catch {
        // use default
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await billingApi.updateSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <BillingShell
      pageTitle="Billing Preferences & Legal Tax"
      pageSubtitle="Configure automated debits, invoice delivery triggers, and VAT entity details"
    >
      <form onSubmit={handleSave} className="max-w-4xl space-y-8">
        {saveSuccess && (
          <div className="p-4 rounded-xl bg-stashr-status-paid/10 border border-stashr-status-paid/30 flex items-center gap-2 text-xs text-stashr-status-paid font-medium animate-fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Billing preferences and tax entity records updated successfully.</span>
          </div>
        )}

        {/* Automated Settlement Preferences */}
        <div className="glass-card p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-stashr-border">
            <div className="w-10 h-10 rounded-lg bg-stashr-primary/10 border border-stashr-primary/20 flex items-center justify-center text-stashr-primary-light">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="section-heading">Automated Settlement (Auto-Pay)</h3>
              <p className="section-subheading">Prevent node suspension by permitting automatic invoice clearing</p>
            </div>
          </div>

          <div className="flex items-start justify-between p-4 rounded-xl bg-stashr-surface-elevated/40 border border-stashr-border gap-4">
            <div>
              <p className="text-sm font-bold text-stashr-text-heading">Enable Automatic Invoice Clearing</p>
              <p className="text-xs text-stashr-text-dim mt-1 max-w-xl leading-relaxed">
                When active, invoices are settled automatically on the due date using available Cloud Wallet credits first, then falling back to your default card token.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 mt-1">
              <input
                type="checkbox"
                checked={settings.autoPay}
                onChange={(e) => setSettings({ ...settings, autoPay: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stashr-surface-input peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-stashr-primary border border-stashr-border"></div>
            </label>
          </div>
        </div>

        {/* Email & Notification Triggers */}
        <div className="glass-card p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-stashr-border">
            <div className="w-10 h-10 rounded-lg bg-stashr-primary-cyan/10 border border-stashr-primary-cyan/20 flex items-center justify-center text-stashr-primary-cyan">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="section-heading">Invoice Delivery & Notification Triggers</h3>
              <p className="section-subheading">Configure accounting email notifications and renewal alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-stashr-surface-elevated/40 border border-stashr-border">
              <div>
                <p className="text-sm font-semibold text-stashr-text-heading">Email PDF Invoices on Issuance</p>
                <p className="text-xs text-stashr-text-dim mt-0.5">Send itemized PDF receipts directly to accounting contact</p>
              </div>
              <input
                type="checkbox"
                checked={settings.invoiceEmails}
                onChange={(e) => setSettings({ ...settings, invoiceEmails: e.target.checked })}
                className="w-4 h-4 rounded border-stashr-border bg-stashr-surface-input text-stashr-primary focus:ring-stashr-primary"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-stashr-surface-elevated/40 border border-stashr-border">
              <div>
                <p className="text-sm font-semibold text-stashr-text-heading">Upcoming Renewal Warnings</p>
                <p className="text-xs text-stashr-text-dim mt-0.5">Receive reminders prior to upcoming bare-metal hardware renewals</p>
              </div>
              <input
                type="checkbox"
                checked={settings.renewalReminders}
                onChange={(e) => setSettings({ ...settings, renewalReminders: e.target.checked })}
                className="w-4 h-4 rounded border-stashr-border bg-stashr-surface-input text-stashr-primary focus:ring-stashr-primary"
              />
            </div>

            <div className="p-4 rounded-xl bg-stashr-surface-elevated/40 border border-stashr-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-stashr-text-heading">Reminder Lead Time</p>
                <p className="text-xs text-stashr-text-dim mt-0.5">Days prior to renewal date to trigger dispatch notice</p>
              </div>
              <select
                value={settings.reminderDaysBefore}
                onChange={(e) => setSettings({ ...settings, reminderDaysBefore: parseInt(e.target.value, 10) })}
                className="glass-input py-2 px-3 text-xs font-mono w-32"
              >
                <option value={1} className="bg-stashr-surface">1 Day Prior</option>
                <option value={3} className="bg-stashr-surface">3 Days Prior</option>
                <option value={7} className="bg-stashr-surface">7 Days Prior</option>
                <option value={14} className="bg-stashr-surface">14 Days Prior</option>
              </select>
            </div>
          </div>
        </div>

        {/* Company & Tax Entity Identification */}
        <div className="glass-card p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-stashr-border">
            <div className="w-10 h-10 rounded-lg bg-stashr-status-paid/10 border border-stashr-status-paid/20 flex items-center justify-center text-stashr-status-paid">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="section-heading">Company Legal Entity & VAT</h3>
              <p className="section-subheading">Printed on official invoices and reverse-charge VAT calculations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-stashr-text-dim uppercase tracking-wider mb-1.5">
                Registered Company Name
              </label>
              <input
                type="text"
                required
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="glass-input w-full text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stashr-text-dim uppercase tracking-wider mb-1.5">
                VAT / Tax Registration Number
              </label>
              <input
                type="text"
                required
                value={settings.taxId}
                onChange={(e) => setSettings({ ...settings, taxId: e.target.value })}
                className="glass-input w-full text-sm font-mono"
                placeholder="GB 982 4410 22"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <span className="text-xs font-semibold text-stashr-text-dim uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stashr-primary-light" /> Registered Billing Address
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Address Line 1"
                value={settings.billingAddress.line1}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    billingAddress: { ...settings.billingAddress, line1: e.target.value },
                  })
                }
                className="glass-input w-full text-sm"
              />
              <input
                type="text"
                placeholder="Address Line 2 (Optional)"
                value={settings.billingAddress.line2}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    billingAddress: { ...settings.billingAddress, line2: e.target.value },
                  })
                }
                className="glass-input w-full text-sm"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="City"
                value={settings.billingAddress.city}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    billingAddress: { ...settings.billingAddress, city: e.target.value },
                  })
                }
                className="glass-input w-full text-sm"
              />
              <input
                type="text"
                placeholder="County / State"
                value={settings.billingAddress.state}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    billingAddress: { ...settings.billingAddress, state: e.target.value },
                  })
                }
                className="glass-input w-full text-sm"
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={settings.billingAddress.postalCode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    billingAddress: { ...settings.billingAddress, postalCode: e.target.value },
                  })
                }
                className="glass-input w-full text-sm font-mono"
              />
              <input
                type="text"
                placeholder="Country"
                value={settings.billingAddress.country}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    billingAddress: { ...settings.billingAddress, country: e.target.value },
                  })
                }
                className="glass-input w-full text-sm"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="btn-primary text-sm flex items-center gap-2 py-3 px-8 shadow-glow-sm hover:shadow-glow-md"
          >
            {isSaving ? (
              'Saving Settings...'
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Billing Preferences
              </>
            )}
          </button>
        </div>
      </form>
    </BillingShell>
  );
}
