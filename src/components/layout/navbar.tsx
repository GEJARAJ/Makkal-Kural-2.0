'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/providers/language-provider';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  Search, 
  PlusCircle, 
  Building2, 
  Globe, 
  Menu, 
  X, 
  User, 
  Lock,
  LayoutDashboard,
  Landmark,
  Radio,
  Sparkles,
  ChevronDown,
  Bus,
  AlertTriangle,
  TrendingUp,
  Cpu,
  Wrench,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [urbanMenuOpen, setUrbanMenuOpen] = useState(false);

  const cycleLanguage = () => {
    if (language === 'en') setLanguage('hi');
    else if (language === 'hi') setLanguage('ta');
    else setLanguage('en');
  };

  const getLangLabel = () => {
    if (language === 'en') return 'हिन्दी';
    if (language === 'hi') return 'தமிழ்';
    return 'English';
  };

  const navLinks = [
    { href: '/', label: t.nav.home, icon: null },
    { href: '/raise-complaint', label: t.nav.raiseComplaint, icon: PlusCircle, highlight: true },
    { href: '/track', label: t.nav.track, icon: Search },
    { href: '/heatmap', label: language === 'ta' ? 'தேசிய வரைபடம்' : language === 'hi' ? 'राष्ट्रीय मानचित्र' : 'GIS Heatmap', icon: Landmark },
    { href: '/representatives', label: t.nav.representatives, icon: Building2 },
    { href: '/dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
  ];

  const urbanLinks = [
    { href: '/urban-command', label: 'UrbanSense Command', icon: Radio, desc: 'Central Real-Time Operations' },
    { href: '/fleet', label: 'AI Bus Fleet Tracker', icon: Bus, desc: '5-Camera Telemetry & NPU Status' },
    { href: '/road-intelligence', label: 'Road Defect Detection', icon: AlertTriangle, desc: 'Pothole & Hazard Escalation' },
    { href: '/traffic-intelligence', label: 'Traffic & OD Flows', icon: TrendingUp, desc: 'Vehicle Classification Matrix' },
    { href: '/incidents', label: 'Incident & ANPR Search', icon: ShieldAlert, desc: 'Visual Tracking & OCR' },
    { href: '/maintenance', label: 'Maintenance Prioritization', icon: Wrench, desc: 'Multi-Bus Fusion Work Orders' },
    { href: '/edge-ai', label: 'Edge AI Architecture', icon: Cpu, desc: '98.6% Bandwidth Optimization' },
  ];

  const isUrbanActive = pathname.startsWith('/urban') || pathname.startsWith('/fleet') || pathname.startsWith('/road-intelligence') || pathname.startsWith('/traffic-intelligence') || pathname.startsWith('/route-intelligence') || pathname.startsWith('/incidents') || pathname.startsWith('/maintenance') || pathname.startsWith('/edge-ai');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-navy-200/80 dark:border-navy-800 bg-white/95 dark:bg-navy-950/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-navy-950 dark:bg-navy-800 flex items-center justify-center text-white shadow-md shadow-navy-950/20 group-hover:bg-emerald-700 transition-colors border border-navy-800">
              <Landmark className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-navy-950 dark:text-white tracking-tight">
                  {t.brand.name}
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-mono font-bold tracking-wider border border-emerald-300 dark:border-emerald-800">
                  GOI &bull; CENTRAL
                </span>
              </div>
              <p className="text-[11px] text-navy-500 dark:text-navy-400 font-medium hidden sm:block">
                National Grievance & Representative Routing Network
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              if (item.highlight) {
                return (
                  <Link key={item.href} href={item.href} className="ml-1">
                    <Button variant="civic" size="sm" className="font-medium shadow-emerald-600/20 bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                      {Icon && <Icon className="w-3.5 h-3.5 mr-1" />}
                      {item.label}
                    </Button>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors',
                    isActive
                      ? 'bg-navy-100 dark:bg-navy-800 text-navy-950 dark:text-white font-semibold'
                      : 'text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-900 hover:text-navy-950'
                  )}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-navy-500 dark:text-navy-400" />}
                  {item.label}
                </Link>
              );
            })}

            {/* UrbanSense AI Menu Hub */}
            <div className="relative ml-1">
              <button
                onClick={() => setUrbanMenuOpen(!urbanMenuOpen)}
                onBlur={() => setTimeout(() => setUrbanMenuOpen(false), 250)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                  isUrbanActive
                    ? "bg-emerald-950 text-emerald-300 border-emerald-500/50 shadow-xs"
                    : "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"
                )}
              >
                <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
                <span>UrbanSense AI</span>
                <ChevronDown className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              </button>

              {/* Dropdown Menu */}
              {urbanMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 p-2 rounded-xl bg-white dark:bg-navy-950 border border-navy-200 dark:border-navy-800 shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 duration-150 space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase font-bold text-navy-400 border-b border-navy-100 dark:border-navy-800">
                    AI Urban Mobility Suite
                  </div>
                  {urbanLinks.map((sub) => {
                    const SubIcon = sub.icon;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setUrbanMenuOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-900 transition-colors group"
                      >
                        <div className="p-1.5 rounded-md bg-navy-100 dark:bg-navy-800 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <SubIcon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-navy-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            {sub.label}
                          </div>
                          <div className="text-[10px] text-navy-500">
                            {sub.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Trilingual Language Switcher Toggle */}
            <button
              onClick={cycleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-navy-300/80 dark:border-navy-700 bg-navy-50 dark:bg-navy-900 text-xs font-semibold text-navy-800 dark:text-navy-200 hover:bg-navy-100 dark:hover:bg-navy-800 transition-all shadow-2xs"
              title="Switch Language / भाषा बदलें / மொழியை மாற்றுக"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{getLangLabel()}</span>
            </button>

            {/* Admin Console Direct Link */}
            <Link href="/admin">
              <Button
                variant={pathname.startsWith('/admin') ? 'primary' : 'outline'}
                size="sm"
                className="hidden lg:flex items-center gap-1.5 text-xs py-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t.nav.admin}</span>
              </Button>
            </Link>

            {/* User Login/Logout */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-navy-700 dark:text-navy-300 hidden sm:inline-block">
                  {user.name}
                </span>
                <Button variant="ghost" size="sm" onClick={logout} className="text-xs">
                  {t.nav.logout}
                </Button>
              </div>
            ) : (
              <Link href="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="text-xs">
                  <User className="w-3.5 h-3.5 mr-1" />
                  {t.nav.login}
                </Button>
              </Link>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-navy-700 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-950 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive ? 'bg-navy-100 dark:bg-navy-800 text-navy-950 dark:text-white font-bold' : 'text-navy-700 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-900'
                )}
              >
                {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
                {item.label}
              </Link>
            );
          })}

          <div className="pt-2 border-t border-navy-100 dark:border-navy-800">
            <div className="px-3 py-1 text-[11px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400">
              UrbanSense AI Suite
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {urbanLinks.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-navy-50 dark:bg-navy-900 text-xs font-semibold text-navy-800 dark:text-navy-200"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="pt-3 border-t border-navy-100 dark:border-navy-800 flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-navy-800 dark:text-navy-200 flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-navy-500" />
              {t.nav.admin}
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400"
            >
              {user ? t.nav.logout : t.nav.login}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
