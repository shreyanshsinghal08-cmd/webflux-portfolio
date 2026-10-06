'use client';

export function generateServerMetrics() {
  return {
    cpu: Math.floor(Math.random() * 40) + 35,
    ram: Math.floor(Math.random() * 30) + 50,
    bandwidth: Math.floor(Math.random() * 25) + 20,
    disk: Math.floor(Math.random() * 15) + 55,
    ping: Math.floor(Math.random() * 8) + 1,
    requests: Math.floor(Math.random() * 500) + 1200,
    activeConnections: Math.floor(Math.random() * 80) + 340,
    uptime: 99.97 + Math.random() * 0.02,
  };
}

export function generateActivityItem(): { icon: string; text: string; color: string } {
  const items = [
    { icon: 'credit', text: `Payment of £${(Math.random() * 80 + 10).toFixed(2)} received via Stripe`, color: 'paid' },
    { icon: 'invoice', text: `Invoice INV-${Math.floor(Math.random() * 900 + 100)} auto-generated`, color: 'pending' },
    { icon: 'server', text: `Node ${['Ryzen-Prod-01','EPYC-VPS-03','i9-Bot-02'][Math.floor(Math.random()*3)]} health check passed`, color: 'active' },
    { icon: 'user', text: `New signup: ${['alex','sarah','marcus','priya','james'][Math.floor(Math.random()*5)]}@${['gmail','outlook','proton'][Math.floor(Math.random()*3)]}.com`, color: 'info' },
    { icon: 'alert', text: `DDoS mitigation triggered on 185.24.67.${Math.floor(Math.random()*255)} — blocked`, color: 'overdue' },
    { icon: 'deploy', text: `Container deployed: minecraft-${Math.floor(Math.random()*99)} in LHR-1 cluster`, color: 'info' },
    { icon: 'renew', text: `Auto-renewal processed for VPS-London-0${Math.floor(Math.random()*9+1)}`, color: 'paid' },
    { icon: 'ticket', text: `Ticket #${Math.floor(Math.random()*900+100)} escalated to priority`, color: 'pending' },
  ];
  return items[Math.floor(Math.random() * items.length)];
}

export const LIVE_SERVERS = [
  { id: 'lhr-01', name: 'LHR-Prod-01', location: 'London, UK', ip: '185.24.67.112', type: 'Ryzen 9 7950X', ram: '64GB DDR5', status: 'online' as const },
  { id: 'lhr-02', name: 'LHR-Prod-02', location: 'London, UK', ip: '185.24.67.204', type: 'EPYC 9454', ram: '128GB DDR5', status: 'online' as const },
  { id: 'ams-01', name: 'AMS-Edge-01', location: 'Amsterdam, NL', ip: '45.132.1.88', type: 'i9-13900K', ram: '32GB DDR5', status: 'online' as const },
  { id: 'fra-01', name: 'FRA-Backup-01', location: 'Frankfurt, DE', ip: '91.107.204.33', type: 'EPYC 7443P', ram: '256GB DDR4', status: 'maintenance' as const },
  { id: 'sgp-01', name: 'SGP-Asia-01', location: 'Singapore', ip: '103.214.67.12', type: 'Ryzen 7 7700X', ram: '32GB DDR5', status: 'online' as const },
];
