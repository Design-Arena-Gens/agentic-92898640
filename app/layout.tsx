import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spice Buyer WhatsApp Outreach Generator',
  description:
    'Generate culturally-appropriate WhatsApp outreach and step-by-step plan to contact foreign spice buyers.',
  icons: { icon: '/favicon.svg' }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

