'use client';

import React, { useState } from 'react';
import { INDIAN_STATES_AND_UTS, getStateById, getAllStates } from '@/lib/constants/locations';
import { useLanguage } from '@/components/providers/language-provider';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Landmark } from 'lucide-react';

interface StepLocationProps {
  state?: string;
  district: string;
  constituency: string;
  city: string;
  locality: string;
  latitude?: number;
  longitude?: number;
  onChange: (fields: {
    state?: string;
    district?: string;
    constituency?: string;
    city?: string;
    locality?: string;
    latitude?: number;
    longitude?: number;
  }) => void;
  errors?: Record<string, string>;
}

export function StepLocation({
  state = 'Tamil Nadu',
  district,
  constituency,
  city,
  locality,
  latitude,
  longitude,
  onChange,
  errors = {},
}: StepLocationProps) {
  const { isTamil, isHindi } = useLanguage();
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsMsg, setGpsMsg] = useState<string | null>(null);

  const allStates = getAllStates();
  const selectedStateData = allStates.find(
    s => s.nameEn.toLowerCase() === (state || 'Tamil Nadu').toLowerCase() || s.id === state
  ) || allStates[0];

  const selectedDistrictData = selectedStateData.districts.find(
    d => d.nameEn.toLowerCase() === district.toLowerCase()
  );

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGpsMsg('Geolocation is not supported by your browser');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        onChange({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setGpsMsg(`GPS Coordinates Recorded (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`);
      },
      () => {
        setGpsLoading(false);
        setGpsMsg('Unable to retrieve location. Please fill the state, district & locality manually.');
      }
    );
  };

  const getTitle = () => {
    if (isTamil) return '2. மாநிலம், மாவட்டம் & நாடாளுமன்றத் தொகுதி';
    if (isHindi) return '2. राज्य, जिला एवं संसदीय क्षेत्र';
    return '2. State, District & Parliamentary Constituency';
  };

  const getSubtitle = () => {
    if (isTamil) return 'சரியான மத்திய அமைச்சக அதிகாரிகள் மற்றும் மக்களவை எம்.பி.யை சென்றடைய உங்கள் மாநிலம் மற்றும் தொகுதியைத் தேர்வு செய்யவும்.';
    if (isHindi) return 'सटीक केंद्रीय मंत्रालय व क्षेत्रीय सांसद तक पहुंचने के लिए अपना राज्य एवं लोकसभा क्षेत्र चुनें।';
    return 'Select your State/UT, District, and Parliamentary Constituency for jurisdiction routing.';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h3 className="text-xl font-bold text-navy-950 dark:text-white">
          {getTitle()}
        </h3>
        <p className="text-sm text-navy-600 dark:text-navy-400 mt-1">
          {getSubtitle()}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* State / UT Selector */}
        <div>
          <Select
            label={isTamil ? 'மாநிலம் / யூனியன் பிரதேசம்' : (isHindi ? 'राज्य / केंद्र शासित प्रदेश' : 'State / Union Territory')}
            value={selectedStateData.nameEn}
            error={errors.state}
            onChange={(e) => {
              const newStateName = e.target.value;
              const found = allStates.find(s => s.nameEn === newStateName);
              if (found) {
                const firstDist = found.districts[0]?.nameEn || '';
                const firstConst = found.parliamentaryConstituencies[0] || '';
                onChange({
                  state: found.nameEn,
                  district: firstDist,
                  constituency: firstConst,
                  city: firstDist,
                });
              }
            }}
          >
            {allStates.map((s) => (
              <option key={s.id} value={s.nameEn}>
                {isTamil ? `${s.nameTa} (${s.nameEn})` : (isHindi ? `${s.nameHi} (${s.nameEn})` : s.nameEn)}
              </option>
            ))}
          </Select>
        </div>

        {/* District */}
        <div>
          <Select
            label={isTamil ? 'மாவட்டம்' : (isHindi ? 'जिला' : 'District')}
            value={district}
            error={errors.district}
            onChange={(e) => {
              const newDist = e.target.value;
              const distData = selectedStateData.districts.find(d => d.nameEn === newDist);
              onChange({
                district: newDist,
                constituency: distData?.constituenciesEn[0] || selectedStateData.parliamentaryConstituencies[0] || '',
                city: city || newDist,
              });
            }}
          >
            <option value="">
              {isTamil ? '-- மாவட்டத்தை தேர்வு செய்க --' : (isHindi ? '-- जिला चुनें --' : '-- Select District --')}
            </option>
            {selectedStateData.districts.map((d) => (
              <option key={d.id} value={d.nameEn}>
                {isTamil ? `${d.nameTa} (${d.nameEn})` : (isHindi ? `${d.nameHi} (${d.nameEn})` : d.nameEn)}
              </option>
            ))}
          </Select>
        </div>

        {/* Parliamentary Constituency (Lok Sabha) */}
        <div>
          <Select
            label={isTamil ? 'மக்களவை நாடாளுமன்றத் தொகுதி (Lok Sabha MP)' : (isHindi ? 'संसदीय क्षेत्र (लोकसभा सांसद)' : 'Parliamentary Constituency (Lok Sabha MP)')}
            value={constituency}
            error={errors.constituency}
            onChange={(e) => onChange({ constituency: e.target.value })}
          >
            <option value="">
              {isTamil ? '-- நாடாளுமன்றத் தொகுதியை தேர்வு செய்க --' : (isHindi ? '-- संसदीय क्षेत्र चुनें --' : '-- Select Parliamentary Constituency --')}
            </option>
            {selectedStateData.parliamentaryConstituencies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        {/* City / Town / Taluk */}
        <div>
          <Input
            label={isTamil ? 'நகரம் / தாலுகா / கிராமம்' : (isHindi ? 'शहर / तालुका / कस्बा' : 'City / Town / Area')}
            placeholder="e.g. New Delhi, Chennai, Mumbai, Varanasi"
            value={city}
            error={errors.city}
            onChange={(e) => onChange({ city: e.target.value })}
          />
        </div>
      </div>

      {/* Street / Locality Area */}
      <div>
        <Input
          label={isTamil ? 'தெரு / பகுதி / முக்கிய நெடுஞ்சாலை அடையாளம்' : (isHindi ? 'क्षेत्र / इलाका / प्रमुख स्थल' : 'Area / Locality / Landmark / Highway Stretch')}
          placeholder="e.g. Near Railway Station, NH-48 Km Marker 54, Main Market"
          value={locality}
          error={errors.locality}
          onChange={(e) => onChange({ locality: e.target.value })}
          helperText={isTamil 
            ? 'பொதுப் பகுதி அடையாளத்தை மட்டும் குறிப்பிடவும்.' 
            : (isHindi ? 'कृपया सार्वजनिक क्षेत्र या पहचान स्थल का विवरण दें।' : 'Provide public area landmark, station, or highway milepost marker.')}
        />
      </div>

      {/* GPS Geo-tagging */}
      <div className="p-4 rounded-xl border border-navy-200 dark:border-navy-800 bg-navy-50/60 dark:bg-navy-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-navy-700 dark:text-navy-300">
          <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            {gpsMsg || (isTamil ? 'துல்லியமான வரைபட இருப்பிடத்திற்கு GPS பயன்படுத்தலாம் (விருப்பமானது).' : (isHindi ? 'सटीक मानचित्र स्थिति के लिए GPS पिन संलग्न करें (वैकल्पिक).' : 'Optional: Auto-attach GPS coordinates for field inspection teams.'))}
          </span>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleGetLocation}
          isLoading={gpsLoading}
          className="text-xs py-1.5"
        >
          <Navigation className="w-3.5 h-3.5 mr-1" />
          {isTamil ? 'GPS பதிவு செய்' : (isHindi ? 'GPS पिन प्राप्त करें' : 'Get GPS Pin')}
        </Button>
      </div>
    </div>
  );
}
