'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/components/providers/language-provider';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { SeverityLevel } from '@/types/database';
import { AlertTriangle, Mic, MicOff, Volume2, Sparkles, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface StepDetailsProps {
  title: string;
  description: string;
  dateStarted: string;
  isOngoing: boolean;
  severity: SeverityLevel;
  onChange: (fields: {
    title?: string;
    description?: string;
    dateStarted?: string;
    isOngoing?: boolean;
    severity?: SeverityLevel;
  }) => void;
  errors?: Record<string, string>;
}

export function StepDetails({
  title,
  description,
  dateStarted,
  isOngoing,
  severity,
  onChange,
  errors = {},
}: StepDetailsProps) {
  const { isTamil, language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check Speech Recognition support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  const toggleVoiceRecording = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in this browser. Please use Google Chrome or Edge.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      // Select appropriate speech language code
      if (language === 'ta') {
        recognition.lang = 'ta-IN';
      } else if (language === 'hi') {
        recognition.lang = 'hi-IN';
      } else {
        recognition.lang = 'en-IN';
      }

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }

        if (transcript.trim()) {
          const updated = description
            ? `${description.trim()} ${transcript.trim()}`
            : transcript.trim();
          onChange({ description: updated });
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition', err);
      setIsListening(false);
    }
  };

  const severities: { id: SeverityLevel; labelEn: string; labelTa: string; labelHi: string; descEn: string; descTa: string; descHi: string; color: string }[] = [
    {
      id: 'LOW',
      labelEn: 'Low Priority',
      labelTa: 'குறைந்த அவசரம்',
      labelHi: 'कम प्राथमिकता',
      descEn: 'Minor cosmetic maintenance or non-blocking inconvenience',
      descTa: 'சாதாரண பராமரிப்பு அல்லது சிறிய சிரமங்கள்',
      descHi: 'सामान्य रखरखाव या गैर-बाधाजनक असुविधा',
      color: 'border-slate-300 hover:border-slate-400',
    },
    {
      id: 'MEDIUM',
      labelEn: 'Medium (Standard)',
      labelTa: 'மிதமான அவசரம் (இயல்பு)',
      labelHi: 'मध्यम (मानक)',
      descEn: 'Standard civic grievance affecting daily commute or sanitation',
      descTa: 'தினசரி போக்குவரத்து அல்லது தூய்மைக்கு பாதிப்பு',
      descHi: 'दैनिक आवागमन या स्वच्छता को प्रभावित करने वाली समस्या',
      color: 'border-blue-300 hover:border-blue-400',
    },
    {
      id: 'HIGH',
      labelEn: 'High Priority',
      labelTa: 'அதிக அவசரம்',
      labelHi: 'उच्च प्राथमिकता',
      descEn: 'Persistent issue causing health risk or vehicle breakdowns',
      descTa: 'தொடர் சுகாதாரம் அல்லது வாகன விபத்து அபாயம்',
      descHi: 'स्वास्थ्य जोखिम या वाहन क्षति पैदा करने वाली समस्या',
      color: 'border-amber-300 hover:border-amber-400',
    },
    {
      id: 'URGENT',
      labelEn: 'Urgent Hazard',
      labelTa: 'மிக அவசரம் / அபாயம்',
      labelHi: 'अति आवश्यक / आपातकालीन',
      descEn: 'Immediate public safety risk (live wire, deep open manhole)',
      descTa: 'உடனடி ஆபத்து (மின்கம்பி அறுந்து விழுதல், திறந்த சாக்கடை)',
      descHi: 'तत्काल सार्वजनिक सुरक्षा जोखिम (खुला मेनहोल, टूटा तार)',
      color: 'border-red-400 hover:border-red-500',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h3 className="text-xl font-bold text-navy-950 font-tamil">
          {isTamil
            ? '3. புகாரின் விபரம் & அவசர நிலை'
            : language === 'hi'
            ? '3. शिकायत विवरण और गंभीरता'
            : '3. Complaint Details & Severity'}
        </h3>
        <p className="text-sm text-navy-600 mt-1">
          {isTamil
            ? 'பிரச்சனையை தெளிவாக விவரிக்கவும். நீங்கள் நேரடியாக பேசவும் (Voice Input) செய்யலாம்.'
            : language === 'hi'
            ? 'समस्या को स्पष्ट रूप से बताएं। आप बोलकर भी लिख सकते हैं।'
            : 'Describe the issue clearly. You can also use voice dictation to speak in your preferred language.'}
        </p>
      </div>

      {/* Title */}
      <div>
        <Input
          label={
            isTamil
              ? 'புகார் தலைப்பு (சுருக்கமாக)'
              : language === 'hi'
              ? 'शिकायत का शीर्षक (संक्षिप्त)'
              : 'Complaint Title (Clear & Concise)'
          }
          placeholder={
            isTamil
              ? 'எ.கா: பிரதான தேசிய நெடுஞ்சாலையில் 2 மாதங்களாக மூடப்படாத பெரிய குழி'
              : language === 'hi'
              ? 'उदा: राष्ट्रीय राजमार्ग पर खतरनाक गड्ढा और जलभराव'
              : 'e.g. Broken water pipeline leaking on Main Road for 3 days'
          }
          value={title}
          error={errors.title}
          onChange={(e) => onChange({ title: e.target.value })}
          helperText={`${title.length}/150 characters`}
        />
      </div>

      {/* Description with Voice Dictation */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700">
            {isTamil
              ? 'முழு விபரம்'
              : language === 'hi'
              ? 'विस्तृत विवरण'
              : 'Detailed Description'}
          </label>

          {/* Voice Input Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toggleVoiceRecording}
            className={cn(
              'text-xs h-8 px-2.5 rounded-lg border transition-all flex items-center gap-1.5',
              isListening
                ? 'bg-red-500 text-white border-red-600 animate-pulse hover:bg-red-600'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            )}
          >
            {isListening ? (
              <>
                <MicOff className="w-3.5 h-3.5 animate-spin" />
                <span>{isTamil ? 'பேசுவதை நிறுத்துக...' : language === 'hi' ? 'रिकॉर्डिंग रोकें...' : 'Stop Recording...'}</span>
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5 text-emerald-700" />
                <span>{isTamil ? 'குரல் மூலம் எழுதுக (Voice)' : language === 'hi' ? 'बोलकर लिखें (Voice)' : 'Voice Dictate'}</span>
              </>
            )}
          </Button>
        </div>

        {isListening && (
          <div className="p-2.5 rounded-lg bg-red-50/80 border border-red-200 text-xs text-red-800 flex items-center gap-2 animate-in fade-in">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
            <span>
              {isTamil
                ? 'மைக் ஆன் செய்யப்பட்டுள்ளது... உங்கள் தாய்மொழியில் தெளிவாக பேசுங்கள்.'
                : language === 'hi'
                ? 'माइक चालू है... कृपया स्पष्ट रूप से बोलें।'
                : 'Listening... Speak clearly in your selected language.'}
            </span>
          </div>
        )}

        <Textarea
          placeholder={
            isTamil
              ? 'பிரச்சனை எப்போது தொடங்கியது? பொதுமக்களுக்கு என்ன பாதிப்பு ஏற்படுகிறது? என்பதை தெளிவாக எழுதவும் அல்லது குரல் மூலம் பேசவும்...'
              : language === 'hi'
              ? 'समस्या कब शुरू हुई? स्थानीय लोगों पर क्या प्रभाव पड़ रहा है? विस्तार से लिखें या बोलें...'
              : 'Explain what the issue is, exact landmark, how long it has been pending, and how it impacts local residents...'
          }
          value={description}
          error={errors.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={5}
          helperText={`${description.length} characters (minimum 20)`}
        />
      </div>

      {/* Date Started & Ongoing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            type="date"
            label={
              isTamil
                ? 'பிரச்சனை தொடங்கிய நாள்'
                : language === 'hi'
                ? 'समस्या शुरू होने की तिथि'
                : 'Date Issue Started'
            }
            value={dateStarted}
            error={errors.dateStarted}
            onChange={(e) => onChange({ dateStarted: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700 mb-1.5">
            {isTamil
              ? 'தற்போது தொடர்கிறதா?'
              : language === 'hi'
              ? 'क्या समस्या अभी भी जारी है?'
              : 'Is the Issue Currently Ongoing?'}
          </label>
          <div className="flex gap-3 h-11 items-center">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-navy-800">
              <input
                type="radio"
                name="ongoing"
                checked={isOngoing === true}
                onChange={() => onChange({ isOngoing: true })}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
              />
              <span>{isTamil ? 'ஆம், தொடர்கிறது' : language === 'hi' ? 'हाँ, जारी है' : 'Yes, Ongoing'}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-navy-800 ml-4">
              <input
                type="radio"
                name="ongoing"
                checked={isOngoing === false}
                onChange={() => onChange({ isOngoing: false })}
                className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
              />
              <span>{isTamil ? 'இல்லை (மீண்டும் ஏற்பட்டது)' : language === 'hi' ? 'नहीं (पुनरावृत्ति)' : 'No (Recurring)'}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Severity Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-navy-700">
          {isTamil
            ? 'அவசர நிலையை தேர்வு செய்க'
            : language === 'hi'
            ? 'गंभीरता स्तर चुनें'
            : 'Select Severity Level'}
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {severities.map((s) => {
            const isSelected = severity === s.id;
            return (
              <div
                key={s.id}
                onClick={() => onChange({ severity: s.id })}
                className={cn(
                  'p-3.5 rounded-xl border cursor-pointer transition-all duration-150',
                  isSelected
                    ? s.id === 'URGENT'
                      ? 'border-red-600 bg-red-50/60 ring-2 ring-red-600/20'
                      : 'border-navy-950 bg-navy-50/80 ring-2 ring-navy-950/20'
                    : s.color + ' bg-white'
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      'font-semibold text-sm font-tamil',
                      isSelected && s.id === 'URGENT' ? 'text-red-700' : 'text-navy-950'
                    )}
                  >
                    {isTamil ? s.labelTa : language === 'hi' ? s.labelHi : s.labelEn}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-navy-950" />}
                </div>
                <p className="text-xs text-navy-600 mt-1">
                  {isTamil ? s.descTa : language === 'hi' ? s.descHi : s.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Warning about Urgent abuse */}
        {severity === 'URGENT' && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2 animate-in fade-in duration-150">
            <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>
              {isTamil
                ? 'கவனம்: "மிக அவசரம்" என்பது நேரடி உயிராபத்து (மின்கம்பி தீப்பொறி, திறந்த சாக்கடை பள்ளம்) உள்ளவற்றிற்கு மட்டுமே உரியது.'
                : language === 'hi'
                ? 'महत्वपूर्ण: "अति आवश्यक" केवल तत्काल सार्वजनिक सुरक्षा खतरों के लिए आरक्षित है।'
                : 'Important: "Urgent" is strictly reserved for imminent safety hazards (e.g. live wire, deep open manholes).'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
