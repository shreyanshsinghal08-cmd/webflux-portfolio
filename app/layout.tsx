import './globals.css';
import CyberSidebar from '@/components/cyber/Sidebar';
import TopHeader from '@/components/cyber/TopHeader';

export const metadata = {
  title: 'StashrNode // Cyber Billing System',
  description: 'Clinical grade cloud billing, automated invoicing, and live checkout payment processing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden bg-[#171229] text-[#E0F9FF] font-body">
        {/* Main Fixed Sidebar */}
        <CyberSidebar />

        {/* Content Shell */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
          <TopHeader />
          <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
            <div className="max-w-7xl mx-auto w-full space-y-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
