import type { Metadata } from 'next';
import { Inter, Noto_Sans_Tamil, Noto_Sans_Devanagari } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/components/providers/language-provider';
import { AuthProvider } from '@/components/providers/auth-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  variable: '--font-noto-tamil',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-noto-devanagari',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Makkal Kural 2.0 (மக்கள் குரல் 2.0 / जन आवाज 2.0) — Central Government Grievance Redressal Network',
  description: 'AI-Powered Public Grievance Redressal & Intelligent Representative Routing Platform connecting citizens across India directly with Union Ministries, Central Departments, and Members of Parliament.',
  keywords: ['Makkal Kural 2.0', 'Jan Aawaz', 'Central Public Grievance', 'CPGRAMS', 'Union Ministry', 'Lok Sabha MP', 'NHAI', 'Railways', 'Jal Shakti', 'MoHUA', 'EPFO'],
  authors: [{ name: 'Makkal Kural 2.0 National Civic Tech' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansTamil.variable} ${notoSansDevanagari.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased">
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
