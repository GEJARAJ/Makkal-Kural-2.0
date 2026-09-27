'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { useAuth } from '@/components/providers/auth-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { INDIAN_STATES_AND_UTS, getDistrictsByState } from '@/lib/constants/locations';
import { ShieldCheck, UserCheck, CheckCircle2, Lock, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { t, isTamil, language } = useLanguage();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedState, setSelectedState] = useState('Tamil Nadu');
  const [selectedDistrict, setSelectedDistrict] = useState('Chennai');
  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Available districts for the selected state
  const currentStateObj = INDIAN_STATES_AND_UTS.find(
    s => s.nameEn.toLowerCase() === selectedState.toLowerCase() || s.id === selectedState.toLowerCase()
  ) || INDIAN_STATES_AND_UTS[0];

  const districts = currentStateObj.districts;

  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    const foundState = INDIAN_STATES_AND_UTS.find(
      s => s.nameEn.toLowerCase() === stateName.toLowerCase() || s.id === stateName.toLowerCase()
    );
    if (foundState && foundState.districts.length > 0) {
      setSelectedDistrict(foundState.districts[0].nameEn);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(isTamil ? 'கடவுச்சொற்கள் பொருந்தவில்லை' : 'Passwords do not match. Please verify.');
      return;
    }

    if (phone && phone.replace(/\D/g, '').length < 10) {
      setError(isTamil ? 'சரியான 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      // Store user profile details in localStorage and register auth
      const userProfile = {
        name,
        email,
        phone,
        state: selectedState,
        district: selectedDistrict,
        pincode,
        registeredAt: new Date().toISOString(),
      };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('mk_user_profile', JSON.stringify(userProfile));
      }

      await register(email, password, name);
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    } catch (err: any) {
      setError(err?.message || (isTamil ? 'பதிவு தோல்வி' : 'Registration failed. Please check details and try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>National Citizen Registration</span>
        </div>
        <h1 className="text-3xl font-extrabold text-navy-950 dark:text-white tracking-tight">
          {isTamil ? 'குடிமக்கள் கணக்கு உருவாக்குக' : language === 'hi' ? 'नागरिक खाता बनाएं' : 'Create Citizen Account'}
        </h1>
        <p className="text-xs sm:text-sm text-navy-600 dark:text-navy-400 max-w-md mx-auto">
          {isTamil
            ? 'அரசுத் துறைகள் மற்றும் மக்கள் பிரதிநிதிகளுக்கு நேரடியாக புகார்களை அனுப்ப உங்கள் விவரங்களை பதிவு செய்யவும்.'
            : 'Register to file official petitions, track status in real-time, and receive verified authority responses.'}
        </p>
      </div>

      <Card className="border-navy-200/80 dark:border-navy-800 shadow-md bg-white dark:bg-navy-900">
        <CardHeader className="border-b border-navy-100 dark:border-navy-800 pb-4">
          <CardTitle className="text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Citizen KYC & Jurisdiction Information</span>
          </CardTitle>
          <CardDescription className="text-xs text-navy-500 dark:text-navy-400">
            All details are protected under Digital Personal Data Protection guidelines.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {success ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-navy-950 dark:text-white">Account Created Successfully!</h3>
              <p className="text-xs text-navy-600 dark:text-navy-400">Redirecting to your citizen dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              
              {/* Full Name */}
              <Input
                label={isTamil ? 'முழுப் பெயர் (Full Name)' : 'Full Name'}
                placeholder="e.g. Ramesh Sundaram"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={isTamil ? 'மின்னஞ்சல் (Email Address)' : 'Email Address'}
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label={isTamil ? 'கைபேசி எண் (Mobile Number)' : 'Mobile Number'}
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* State & District Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                    {isTamil ? 'மாநிலம் (State / UT)' : 'State / UT'}
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-navy-300 dark:border-navy-700 bg-white dark:bg-navy-900 text-xs font-medium text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {INDIAN_STATES_AND_UTS.map((state) => (
                      <option key={state.id} value={state.nameEn}>
                        {isTamil ? state.nameTa : state.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-navy-800 dark:text-navy-200">
                    {isTamil ? 'மாவட்டம் (District)' : 'District'}
                  </label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-navy-300 dark:border-navy-700 bg-white dark:bg-navy-900 text-xs font-medium text-navy-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {districts.map((dist) => (
                      <option key={dist.id} value={dist.nameEn}>
                        {isTamil ? dist.nameTa : dist.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pincode */}
              <Input
                label={isTamil ? 'அஞ்சல் குறியீட்டு எண் (Pincode)' : 'Pincode'}
                placeholder="e.g. 600001"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={isTamil ? 'கடவுச்சொல் (Password)' : 'Password'}
                  type="password"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <Input
                  label={isTamil ? 'கடவுச்சொல்லை உறுதிப்படுத்துக' : 'Confirm Password'}
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 font-medium">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="civic"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 shadow-md shadow-emerald-700/20"
                isLoading={loading}
              >
                <span>{isTamil ? 'கணக்கை உருவாக்கு & தொடர்க' : 'Create Account & Continue'}</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>

              <div className="pt-2 text-center text-xs text-navy-600 dark:text-navy-400">
                {isTamil ? 'ஏற்கனவே கணக்கு உள்ளதா?' : 'Already have an account?'}{' '}
                <Link href="/login" className="text-emerald-700 dark:text-emerald-400 font-bold underline hover:text-emerald-800">
                  {isTamil ? 'உள்நுழைக' : 'Sign In here'}
                </Link>
              </div>

            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
