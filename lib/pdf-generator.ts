import type { Invoice } from '@/types/billing';
import { formatCurrency } from './currency';
import { formatReadableDate } from './date-helpers';

export function generateInvoiceHTML(invoice: Invoice): string {
  const lineItemsHtml = invoice.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #1E293B;">
        <td style="padding: 12px 16px; font-size: 13px; color: #E2E8F0;">
          <strong>${item.description}</strong>
          ${item.metadata?.nodeSpec ? `<div style="font-size: 11px; color: #94A3B8; font-family: monospace;">${item.metadata.nodeSpec} [${item.metadata.region || 'EU-West'}]</div>` : ''}
        </td>
        <td style="padding: 12px 16px; font-size: 13px; text-align: center; color: #E2E8F0; font-family: monospace;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 16px; font-size: 13px; text-align: right; color: #E2E8F0; font-family: monospace;">
          ${formatCurrency(item.unitPrice, invoice.currency)}
        </td>
        <td style="padding: 12px 16px; font-size: 13px; text-align: right; font-weight: 600; color: #FFFFFF; font-family: monospace;">
          ${formatCurrency(item.total, invoice.currency)}
        </td>
      </tr>
    `
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Invoice ${invoice.invoiceNumber} - StashrNode</title>
      <style>
        body {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          background: #080B11;
          color: #E2E8F0;
          margin: 0;
          padding: 40px;
        }
        .invoice-card {
          max-width: 800px;
          margin: 0 auto;
          background: #0D121F;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 24px;
        }
        .brand {
          font-size: 22px;
          font-weight: 800;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .brand span {
          color: #7C3AED;
        }
        .badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          font-family: monospace;
          text-transform: uppercase;
        }
        .badge-paid { background: rgba(16,185,129,0.15); color: #10B981; border: 1px solid rgba(16,185,129,0.3); }
        .badge-pending { background: rgba(245,158,11,0.15); color: #F59E0B; border: 1px solid rgba(245,158,11,0.3); }
        .badge-overdue { background: rgba(239,68,68,0.15); color: #EF4444; border: 1px solid rgba(239,68,68,0.3); }
        .badge-cancelled { background: rgba(100,116,139,0.15); color: #64748B; border: 1px solid rgba(100,116,139,0.3); }
        .grid-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 24px;
          font-size: 13px;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 32px;
        }
        .table th {
          text-align: left;
          font-size: 11px;
          text-transform: uppercase;
          color: #94A3B8;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 10px 16px;
        }
        .totals {
          margin-top: 24px;
          display: flex;
          justify-content: flex-end;
        }
        .totals-table {
          width: 280px;
          font-size: 13px;
        }
        .totals-table td {
          padding: 6px 0;
        }
        .totals-table .grand-total {
          border-top: 1px solid rgba(255,255,255,0.15);
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
          font-family: monospace;
          padding-top: 12px;
        }
        @media print {
          body { background: #FFFFFF; color: #000000; padding: 0; }
          .invoice-card { border: none; box-shadow: none; background: #FFFFFF; color: #000000; }
          .table th { color: #555555; }
          tr { border-bottom-color: #E2E8F0 !important; }
          td { color: #111111 !important; }
        }
      </style>
    </head>
    <body>
      <div class="invoice-card">
        <div class="header">
          <div>
            <div class="brand">Stashr<span>Node</span></div>
            <p style="margin: 4px 0 0 0; color: #94A3B8; font-size: 12px;">High Performance Cloud Infrastructure</p>
            <p style="margin: 2px 0 0 0; color: #64748B; font-size: 11px;">VAT Reg: GB 982 4410 22</p>
          </div>
          <div style="text-align: right;">
            <span class="badge badge-${invoice.status}">${invoice.status}</span>
            <h2 style="margin: 8px 0 0 0; font-family: monospace; font-size: 20px; color: #FFFFFF;">${invoice.invoiceNumber}</h2>
          </div>
        </div>

        <div class="grid-info">
          <div>
            <p style="color: #64748B; font-size: 11px; text-transform: uppercase; margin: 0 0 4px 0;">Billed To:</p>
            <strong style="color: #FFFFFF; font-size: 14px;">${invoice.clientName}</strong>
            <p style="margin: 4px 0; color: #94A3B8;">${invoice.clientEmail}</p>
            <p style="margin: 2px 0; color: #64748B;">Client ID: ${invoice.clientId}</p>
          </div>
          <div style="text-align: right;">
            <p style="color: #64748B; font-size: 11px; text-transform: uppercase; margin: 0 0 4px 0;">Invoice Metadata:</p>
            <p style="margin: 4px 0; color: #94A3B8;">Issued: <span style="font-family: monospace; color: #FFFFFF;">${formatReadableDate(invoice.issuedAt)}</span></p>
            <p style="margin: 4px 0; color: #94A3B8;">Due: <span style="font-family: monospace; color: #FFFFFF;">${formatReadableDate(invoice.dueAt)}</span></p>
            ${invoice.paidAt ? `<p style="margin: 4px 0; color: #10B981;">Paid: <span style="font-family: monospace;">${formatReadableDate(invoice.paidAt)}</span></p>` : ''}
          </div>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th style="width: 50%;">Description</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Unit Price</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${lineItemsHtml}
          </tbody>
        </table>

        <div class="totals">
          <table class="totals-table">
            <tr>
              <td style="color: #94A3B8;">Subtotal</td>
              <td style="text-align: right; font-family: monospace;">${formatCurrency(invoice.subtotal, invoice.currency)}</td>
            </tr>
            <tr>
              <td style="color: #94A3B8;">VAT (${invoice.taxRate}%)</td>
              <td style="text-align: right; font-family: monospace;">${formatCurrency(invoice.tax, invoice.currency)}</td>
            </tr>
            ${
              invoice.discount > 0
                ? `<tr>
                    <td style="color: #10B981;">Discount Applied</td>
                    <td style="text-align: right; font-family: monospace; color: #10B981;">-${formatCurrency(invoice.discount, invoice.currency)}</td>
                  </tr>`
                : ''
            }
            <tr class="grand-total">
              <td>Total Due</td>
              <td style="text-align: right;">${formatCurrency(invoice.total, invoice.currency)}</td>
            </tr>
          </table>
        </div>

        ${
          invoice.notes
            ? `<div style="margin-top: 32px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); font-size: 12px; color: #94A3B8;">
                <strong>Notes:</strong> ${invoice.notes}
              </div>`
            : ''
        }
      </div>
    </body>
    </html>
  `;
}

export function printInvoice(invoice: Invoice): void {
  if (typeof window === 'undefined') return;
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(generateInvoiceHTML(invoice));
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 250);
}
