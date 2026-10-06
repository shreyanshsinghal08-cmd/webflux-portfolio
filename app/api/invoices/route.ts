import { NextResponse } from 'next/server';
import { getInvoices, getInvoiceById, addInvoice, getWalletBalance } from '@/lib/invoicesData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    const invoice = getInvoiceById(id);
    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    }
    return NextResponse.json(invoice);
  }

  const invoices = getInvoices();
  const balance = getWalletBalance();
  return NextResponse.json({ invoices, balance });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { client, email, service, amount, dueDate, description } = body;

    if (!client || !service || !amount) {
      return NextResponse.json({ error: 'Missing required fields: client, service, amount' }, { status: 400 });
    }

    const created = addInvoice({
      client,
      email: email || `${client.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      service,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0],
      dueDate: dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      status: 'Pending',
      description: description || `Dedicated Cloud Resource Provisioning: ${service}`,
    });

    return NextResponse.json({ success: true, invoice: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create invoice' }, { status: 500 });
  }
}
