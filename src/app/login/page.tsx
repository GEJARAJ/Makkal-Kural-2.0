'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { useAuth } from '@/components/providers/auth-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { isTamil, language } = useLanguage();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password || 'password123');
      setLoading(false);
      router.push('/dashboard');
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || (isTamil ? 'உள்நுழைவு தோல்வி' : 'Login failed. Please check your credentials.'));
    }
  };

  const handleQuickDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demoPass123');
    setError(null);
    setLoading(true);
    try {
      await login(demoEmail, 'demoPass123');
      setLoading(false);
      router.push('/dashboard');
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Login failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-4">
      <Card className="border-navy-200 shadow-md overflow-hidden">
        <CardHeader className="bg-navy-50/60 border-b border-navy-100">
          <CardTitle className="text-xl text-navy-950 font-tamil">
            {isTamil ? 'குடிமக்கள் உள்நுழைவு' : language === 'hi' ? 'नागरिक लॉगिन' : 'Citizen & Admin Sign In'}
          </CardTitle>
          <p className="text-xs text-navy-600 mt-1">
            {isTamil ? 'உங்கள் புகார்களை நிர்வகிக்க உள்நுழையவும்' : 'Sign in to track your grievances and submit updates'}
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-5 text-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. citizen@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-xs text-red-600 font-medium bg-red-50 p-2.5 rounded-lg border border-red-200">{error}</p>}
            <Button type="submit" variant="civic" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white" isLoading={loading}>
              {isTamil ? 'உள்நுழைக' : 'Sign In'}
            </Button>
          </form>

          {/* 1-Click Quick Demo Sign-in */}
          <div className="pt-3 border-t border-navy-100 space-y-2">
            <span className="text-[11px] font-bold text-navy-500 uppercase tracking-wider block">
              ⚡ 1-Click Quick Demo Access:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickDemoLogin('citizen@makkalkural.in')}
                className="text-xs border-navy-200 hover:bg-navy-50 text-navy-800"
              >
                <User className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                Citizen Demo
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickDemoLogin('admin@cpgrams.gov.in')}
                className="text-xs border-navy-200 hover:bg-navy-50 text-navy-800"
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-amber-600" />
                Admin Portal
              </Button>
            </div>
          </div>

          <p className="text-xs text-navy-600 text-center pt-2">
            {isTamil ? 'புதிய கணக்கு வேண்டுமா?' : 'Don’t have an account?'}{' '}
            <Link href="/register" className="text-emerald-700 font-semibold underline">
              {isTamil ? 'பதிவு செய்யவும்' : 'Register Now'}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
