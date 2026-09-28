'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/language-provider';
import { Complaint, ComplaintStatus, ComplaintAttachment } from '@/types/database';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { buildXShareUrl, buildXOfficialReplyUrl, buildXDraftPetition, openXIntentOrApp } from '@/lib/x-share-service';
import nextDynamic from 'next/dynamic';
import { formatDate, cn } from '@/lib/utils';
const ComplaintMap = nextDynamic(
  () => import('@/components/maps/complaint-map').then((mod) => mod.ComplaintMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] rounded-xl bg-navy-50/70 dark:bg-navy-900/70 flex items-center justify-center text-xs text-navy-500">
        Loading map location...
      </div>
    ),
  }
);
import { exportComplaintPDF } from '@/lib/export-service';
import { 
  CheckCircle2, 
  Clock, 
  Send, 
  Building2, 
  Share2, 
  Printer, 
  ShieldCheck, 
  ArrowLeft, 
  ExternalLink,
  Lock,
  FileCheck,
  Map,
  Download,
  FileText,
  Image as ImageIcon,
  FileArchive,
  ThumbsUp,
  Heart,
  Star,
  AlertTriangle,
  Flame,
  Check,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Copy
} from 'lucide-react';
export const dynamic = 'force-dynamic';

export default function TrackDetailPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = use(params);
  const { t, isTamil, language } = useLanguage();
  const [complaint, setComplaint] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Upvote state
  const [upvotes, setUpvotes] = useState<number>(0);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isUpvoting, setIsUpvoting] = useState(false);

  // Citizen Rating & Feedback state
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  useEffect(() => {
    async function fetchComplaint() {
      setLoading(true);
      setError(null);

      // 1. Try server API
      try {
        const res = await fetch(`/api/track?ref=${encodeURIComponent(reference)}`);
        const json = await res.json();
        if (res.ok && json.success && json.data) {
          setComplaint(json.data);
          setUpvotes(json.data.upvotes_count || 1);
          if (json.data.citizen_rating) {
            setRating(json.data.citizen_rating);
            setFeedbackSubmitted(true);
          }
          setLoading(false);
          return;
        }
      } catch {
        // Continue to local fallbacks
      }

      // 2. Client-side localStorage fallback
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('mk_complaints');
          if (stored) {
            const list = JSON.parse(stored);
            const found = list.find((c: any) =>
              c.reference_number?.toUpperCase() === reference.trim().toUpperCase() ||
              c.id === reference.trim()
            );
            if (found) {
              setComplaint(found);
              setUpvotes(found.upvotes_count || 1);
              if (found.citizen_rating) {
                setRating(found.citizen_rating);
                setFeedbackSubmitted(true);
              }
              setLoading(false);
              return;
            }
          }
        } catch {
          // Ignore
        }
      }

      // 3. Built-in initial grievance showcase fallback
      try {
        const { INITIAL_COMPLAINTS } = await import('@/lib/supabase/mock-store');
        const fallbackMatch = INITIAL_COMPLAINTS.find((c: any) =>
          c.reference_number?.toUpperCase() === reference.trim().toUpperCase() ||
          c.id === reference.trim()
        );
        if (fallbackMatch) {
          setComplaint(fallbackMatch);
          setUpvotes(fallbackMatch.upvotes_count || 1);
          if (fallbackMatch.citizen_rating) {
            setRating(fallbackMatch.citizen_rating);
            setFeedbackSubmitted(true);
          }
          setLoading(false);
          return;
        }
      } catch {
        // Ignore
      }

      setError('Complaint not found');
      setLoading(false);
    }

    fetchComplaint();
  }, [reference]);

  const handleUpvote = async () => {
    if (hasUpvoted || isUpvoting) return;
    setIsUpvoting(true);

    try {
      const res = await fetch('/api/complaints/upvote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();
      if (data.success) {
        setUpvotes(data.upvotes);
        setHasUpvoted(true);
      } else {
        setHasUpvoted(true);
      }
    } catch {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    } finally {
      setIsUpvoting(false);
    }
  };

  const handleRatingSubmit = async (selectedRating: number) => {
    setRating(selectedRating);
    setIsSubmittingRating(true);

    try {
      await fetch('/api/complaints/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reference,
          rating: selectedRating,
          feedback: feedbackText,
        }),
      });
      setFeedbackSubmitted(true);
    } catch {
      setFeedbackSubmitted(true);
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <ImageIcon className="w-4 h-4 text-emerald-600" />;
    if (mimeType === 'application/pdf') return <FileText className="w-4 h-4 text-red-500" />;
    return <FileArchive className="w-4 h-4 text-blue-500" />;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm text-navy-600 font-medium">
          {isTamil ? 'புகார் விபரங்கள் பெறப்படுகின்றன...' : language === 'hi' ? 'शिकायत का विवरण लोड हो रहा है...' : 'Retrieving official grievance record...'}
        </p>
      </div>
    );
  }

  if (error || !complaint) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="p-4 rounded-full bg-red-100 text-red-600 w-16 h-16 mx-auto flex items-center justify-center">
          <Clock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-navy-950 font-tamil">
          {isTamil ? 'புகார் மனு கிடைக்கவில்லை' : language === 'hi' ? 'शिकायत नहीं मिली' : 'Complaint Not Found'}
        </h2>
        <p className="text-sm text-navy-600">
          {t.tracking.notFound.replace('{ref}', reference)}
        </p>
        <div className="pt-4">
          <Link href="/track">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              {isTamil ? 'மீண்டும் தேட' : 'Search Another Reference'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const stepsList: { key: ComplaintStatus; labelEn: string; labelTa: string; labelHi: string }[] = [
    { key: 'SUBMITTED', labelEn: 'Submitted', labelTa: 'பதிவு செய்யப்பட்டது', labelHi: 'दर्ज की गई' },
    { key: 'EMAIL_SENT', labelEn: 'Sent to Ministry', labelTa: 'அமைச்சகத்திற்கு அனுப்பப்பட்டது', labelHi: 'मंत्रालय को प्रेषित' },
    { key: 'ACKNOWLEDGED', labelEn: 'Acknowledged', labelTa: 'ஏற்றுக்கொள்ளப்பட்டது', labelHi: 'स्वीकृत' },
    { key: 'IN_PROGRESS', labelEn: 'Under Action', labelTa: 'நடவடிக்கையில் உள்ளது', labelHi: 'प्रगति पर' },
    { key: 'RESOLVED', labelEn: 'Resolved', labelTa: 'தீர்க்கப்பட்டது', labelHi: 'निस्तारित' },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
      case 'EMAIL_QUEUED':
        return 0;
      case 'EMAIL_SENT':
      case 'EMAIL_FAILED':
        return 1;
      case 'ACKNOWLEDGED':
        return 2;
      case 'IN_PROGRESS':
        return 3;
      case 'RESOLVED':
      case 'CLOSED':
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepIndex(complaint.status);
  const xShareUrl = buildXShareUrl(complaint, complaint.assigned_representative);
  const xReplyUrl = buildXOfficialReplyUrl(complaint, complaint.assigned_representative);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // SLA calculations
  const slaDeadline = complaint.sla_deadline ? new Date(complaint.sla_deadline) : null;
  const isOverdue = slaDeadline ? new Date() > slaDeadline && complaint.status !== 'RESOLVED' && complaint.status !== 'CLOSED' : false;
  const isEscalated = complaint.sla_escalated || isOverdue;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/track" className="inline-flex items-center text-xs font-semibold text-navy-600 hover:text-emerald-700">
          <ArrowLeft className="w-4 h-4 mr-1" />
          {isTamil ? 'அனைத்து புகார்கள் / தேடலுக்கு திரும்புக' : 'Back to Grievance Tracking'}
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportComplaintPDF(complaint)}
            className="text-xs border-navy-300 hover:bg-navy-50"
          >
            <Printer className="w-3.5 h-3.5 mr-1 text-navy-600" />
            {isTamil ? 'PDF பதிவிறக்கம்' : 'Download Citizen Dossier (PDF)'}
          </Button>
        </div>
      </div>

      {/* SLA Alert Banner */}
      {isEscalated ? (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-red-950 uppercase tracking-wider">
                {isTamil
                  ? 'மத்திய குறைதீர்ப்பு முகமைக்கு உயர்த்தப்பட்டது (CPGRAMS Level 2/3 Escalation)'
                  : language === 'hi'
                  ? 'केंद्रीय नोडल अधिकारी (संयुक्त सचिव) को एस्केलेट किया गया'
                  : 'Escalated to Ministry Nodal Joint Secretary'}
              </h4>
              <p className="text-xs text-red-700 mt-0.5">
                {isTamil
                  ? 'குடிமக்கள் சாசன காலக்கெடுவை தாண்டியதால் இந்த மனு மத்திய அமைச்சக கண்காணிப்பு குழுவின் நேரடி ஆய்வுக்கு அனுப்பப்பட்டுள்ளது.'
                  : 'Citizens Charter SLA threshold reached. High-priority red-flagged for direct Union Ministry review.'}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-red-600 text-white font-bold text-[10px] tracking-wider uppercase">
            Escalated
          </span>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Citizen Charter SLA:</strong> Within Standard Timeframe (Target:{' '}
              {complaint.severity === 'URGENT' ? '7 Days' : complaint.severity === 'HIGH' ? '14 Days' : '30 Days'})
            </span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-800 bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
            🟢 Active Redressal Phase
          </span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-950 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-bold tracking-wider">
              {complaint.reference_number}
            </span>
            <Badge status={complaint.status}>
              {complaint.status}
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-tamil">
            {complaint.ai_improved_title || complaint.title}
          </h1>
          <p className="text-xs text-navy-300">
            {isTamil ? 'பதிவு செய்யப்பட்ட நாள்: ' : 'Filed on: '}
            <span className="font-mono text-white">{formatDate(complaint.created_at, language)}</span>
            {' '}&bull;{' '}
            <span>{complaint.locality}, {complaint.district}, {complaint.state}</span>
          </p>
        </div>

        {/* Community Upvote & Social Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleUpvote}
            disabled={hasUpvoted || isUpvoting}
            className={cn(
              'text-xs font-bold transition-all shadow-xs',
              hasUpvoted
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-white text-navy-950 hover:bg-navy-50'
            )}
          >
            <ThumbsUp className={cn('w-3.5 h-3.5 mr-1.5', hasUpvoted ? 'text-white' : 'text-emerald-600')} />
            {hasUpvoted
              ? isTamil ? `ஆதரிக்கப்பட்டது (${upvotes})` : `Endorsed (${upvotes})`
              : isTamil ? `நானும் பாதிக்கப்பட்டுள்ளேன் (${upvotes})` : `I Am Also Affected (${upvotes})`}
          </Button>

          <a
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              const draft = buildXDraftPetition(complaint, complaint.assigned_representative);
              if (navigator?.clipboard?.writeText) {
                navigator.clipboard.writeText(draft).catch(() => {});
              }
              setCopiedDraft(true);
              setTimeout(() => setCopiedDraft(false), 3000);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white transition-all shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{isTamil ? 'X (Twitter)-ல் பதிவிடுக' : 'Post to X'}</span>
          </a>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const draft = buildXDraftPetition(complaint, complaint.assigned_representative);
              navigator.clipboard.writeText(draft);
              setCopiedDraft(true);
              setTimeout(() => setCopiedDraft(false), 3000);
            }}
            className="text-xs border-navy-700 bg-navy-800 text-navy-200 hover:bg-navy-700 hover:text-white"
          >
            {copiedDraft ? <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
            {copiedDraft ? (isTamil ? 'நகலெடுக்கப்பட்டது!' : 'Copied!') : (isTamil ? 'மனு உரை நகல்' : 'Copy Draft')}
          </Button>

          {complaint.assigned_representative?.x_handle && (
            <a
              href={xReplyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isTamil ? 'அதிகாரியை குறிப்பிடுக' : 'Tag Official'}</span>
            </a>
          )}
        </div>
      </div>

      {/* Visual Timeline Stepper */}
      <Card className="border-navy-200 shadow-sm p-6 overflow-hidden">
        <div className="text-xs font-bold uppercase tracking-wider text-navy-500 mb-6">
          {isTamil ? 'தீர்வு முன்னேற்ற நிலை' : language === 'hi' ? 'निवारण प्रगति समयरेखा' : 'Resolution Progress Timeline'}
        </div>

        <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-0">
          {stepsList.map((step, idx) => {
            const isDone = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;

            return (
              <div key={step.key} className="flex md:flex-col items-center gap-3 md:gap-2 flex-1 relative text-left md:text-center">
                {idx < stepsList.length - 1 && (
                  <div
                    className={cn(
                      'hidden md:block absolute top-4 left-1/2 w-full h-1 -z-0',
                      idx < currentStepIdx ? 'bg-emerald-600' : 'bg-navy-200'
                    )}
                  />
                )}

                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs z-10 transition-all shadow-xs',
                    isDone
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : 'bg-navy-100 text-navy-400 border border-navy-300'
                  )}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>

                <div>
                  <div className={cn(
                    'text-xs font-semibold font-tamil',
                    isCurrent ? 'text-emerald-700 font-bold' : isDone ? 'text-navy-900' : 'text-navy-400'
                  )}>
                    {isTamil ? step.labelTa : language === 'hi' ? step.labelHi : step.labelEn}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Complaint Dossier */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Resolution Verification & Star Rating (if resolved) */}
          {complaint.status === 'RESOLVED' && (
            <Card className="border-emerald-300 bg-emerald-50/40 shadow-sm overflow-hidden">
              <CardHeader className="bg-emerald-100/60 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <CardTitle className="text-sm font-bold text-emerald-950">
                    {isTamil ? 'தீர்வு சரிபார்ப்பு & புகைப்பட ஆதாரம்' : 'Resolution Verification & Citizen Feedback'}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-4 text-xs">
                {complaint.resolution_proof_url && (
                  <div className="space-y-2">
                    <span className="font-bold uppercase tracking-wider text-emerald-900 block">
                      {isTamil ? 'பழுதுநீக்கம் செய்யப்பட்ட புகைப்பட ஆதாரம்' : 'Field Completion Photographic Evidence'}
                    </span>
                    <div className="relative rounded-xl overflow-hidden border border-emerald-200 max-h-64 shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={complaint.resolution_proof_url}
                        alt="Resolution Verification"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Citizen Star Rating Widget */}
                <div className="pt-3 border-t border-emerald-200 space-y-2">
                  <span className="font-bold uppercase tracking-wider text-emerald-950 block">
                    {isTamil ? 'உங்கள் திருப்தி மதிப்பீடு' : 'Rate Redressal Quality & Citizen Satisfaction'}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingSubmit(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        disabled={feedbackSubmitted}
                        className="p-1 rounded hover:scale-110 transition-transform disabled:cursor-default"
                      >
                        <Star
                          className={cn(
                            'w-6 h-6 transition-colors',
                            (hoverRating || rating) >= star
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-navy-300'
                          )}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="text-xs font-bold text-emerald-950 ml-2">
                        {rating}/5 Stars
                      </span>
                    )}
                  </div>

                  {feedbackSubmitted ? (
                    <div className="p-2.5 rounded-lg bg-white border border-emerald-200 text-emerald-900 font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{isTamil ? 'உங்கள் கருத்துக்கு நன்றி!' : 'Thank you for rating the redressal service!'}</span>
                    </div>
                  ) : (
                    <div className="flex gap-2 pt-1">
                      <input
                        type="text"
                        placeholder={isTamil ? 'கூடுதல் கருத்துரைகள் (விருப்பமானது)...' : 'Optional comments on repair quality...'}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-navy-200 bg-white text-xs text-navy-900 focus:outline-emerald-600"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleRatingSubmit(rating || 5)}
                        disabled={isSubmittingRating}
                        className="text-xs bg-emerald-600 text-white hover:bg-emerald-700"
                      >
                        {isTamil ? 'சமர்ப்பிக்க' : 'Submit Rating'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dossier Card */}
          <Card className="border-navy-200 dark:border-navy-800 bg-white dark:bg-navy-900 shadow-sm">
            <CardHeader className="border-b border-navy-100 dark:border-navy-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-navy-500 dark:text-navy-400">
                  {complaint.category.toUpperCase()} &rsaquo; {complaint.subcategory}
                </span>
                <Badge severity={complaint.severity}>
                  {complaint.severity}
                </Badge>
              </div>
              <CardTitle className="text-lg mt-2 text-navy-950 dark:text-white">
                {complaint.ai_improved_title || complaint.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs pt-4">
              {/* Problem Statement Section */}
              <div className="space-y-3">
                <div>
                  <span className="font-bold uppercase tracking-wider text-navy-700 dark:text-navy-300 block mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    {isTamil ? 'குடிமக்கள் புகார் அறிக்கை (Citizen Problem Statement)' : 'Citizen Problem Statement'}
                  </span>
                  <div className="p-4 rounded-xl bg-navy-50/80 dark:bg-navy-950/80 text-navy-900 dark:text-navy-100 leading-relaxed whitespace-pre-wrap border border-navy-200/80 dark:border-navy-800">
                    {complaint.description}
                  </div>
                </div>

                {complaint.ai_improved_description && complaint.ai_improved_description !== complaint.description && (
                  <div>
                    <span className="font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      {isTamil ? 'அரசு துறைக்கான AI சட்டபூர்வ மனு வடிவம்' : 'AI-Structured Official Government Petition'}
                    </span>
                    <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100 leading-relaxed whitespace-pre-wrap border border-emerald-200/80 dark:border-emerald-800">
                      {complaint.ai_improved_description}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="font-semibold uppercase tracking-wider text-navy-500 block mb-0.5">
                    {isTamil ? 'மத்திய அமைச்சகம் / துறை' : 'Union Ministry Jurisdiction'}
                  </span>
                  <span className="text-navy-900 font-medium">
                    {complaint.ministry || 'Union Government Department'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold uppercase tracking-wider text-navy-500 block mb-0.5">
                    {isTamil ? 'பாராளுமன்ற தொகுதி' : 'Parliamentary Constituency'}
                  </span>
                  <span className="text-navy-900 font-medium">
                    {complaint.parliamentary_constituency || complaint.constituency || 'All India'}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-semibold uppercase tracking-wider text-navy-500 block mb-1.5">
                  {isTamil ? 'இருப்பிட வரைபடம்' : 'Location Map'}
                </span>
                <ComplaintMap
                  latitude={complaint.latitude}
                  longitude={complaint.longitude}
                  locality={complaint.locality}
                  district={complaint.district}
                  height={280}
                />
              </div>

              {complaint.attachments && complaint.attachments.length > 0 && (
                <div className="pt-2">
                  <span className="font-semibold uppercase tracking-wider text-navy-500 block mb-1.5">
                    {isTamil ? 'ஆதாரங்கள் / இணைப்புகள்' : 'Evidence / Attachments'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {complaint.attachments.map((att: ComplaintAttachment) => (
                      <button
                        key={att.id}
                        onClick={() => handleDownload(att.file_url, att.file_name)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-navy-200 bg-white text-xs text-navy-800 hover:bg-navy-50 hover:border-navy-300 transition-colors"
                      >
                        {getFileIcon(att.mime_type)}
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-navy-900 max-w-[200px] truncate">{att.file_name}</span>
                          <span className="text-[10px] text-navy-500">{formatFileSize(att.file_size)}</span>
                        </div>
                        <Download className="w-3.5 h-3.5 text-navy-400 ml-1" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline & Resolution Updates */}
          <Card className="border-navy-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy-700">
                {isTamil ? 'நடவடிக்கை பதிவுகள்' : 'Official Action & Update Log'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {complaint.updates && complaint.updates.length > 0 ? (
                <div className="space-y-4 border-l-2 border-emerald-500 pl-4 ml-2">
                  {complaint.updates.map((upd: any, idx: number) => (
                    <div key={idx} className="space-y-1 relative">
                      <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-white" />
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-navy-900">
                          {upd.status}
                        </span>
                        <span className="text-[11px] text-navy-500 font-mono">
                          {formatDate(upd.created_at, language)}
                        </span>
                      </div>
                      <p className="text-xs text-navy-700 leading-relaxed bg-navy-50/60 p-2.5 rounded-lg border border-navy-100">
                        {upd.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-navy-500">
                  {isTamil ? 'இன்னும் கூடுதல் பதிவுகள் எதுவும் இல்லை.' : 'No follow-up updates recorded yet.'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Assigned Official & Masked Privacy */}
        <div className="space-y-6">
          
          {/* Official Recipient Box */}
          <Card className="border-navy-200 shadow-sm">
            <CardHeader className="bg-navy-50/60">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                <CardTitle className="text-sm">
                  {isTamil ? 'பொறுப்பு அதிகாரி / துறை' : 'Assigned Authority'}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-3 text-xs">
              {complaint.assigned_representative ? (
                <>
                  <div>
                    <h5 className="font-bold text-navy-950 text-sm">
                      {complaint.assigned_representative.name}
                    </h5>
                    <p className="text-navy-600">
                      {complaint.assigned_representative.role}
                    </p>
                    <p className="text-navy-500 font-medium">
                      {complaint.assigned_representative.organization}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-navy-100">
                    <Badge verification={complaint.assigned_representative.verification_status}>
                      {complaint.assigned_representative.verification_status}
                    </Badge>
                  </div>

                  {complaint.assigned_representative.source_url && (
                    <div className="pt-1">
                      <a
                        href={complaint.assigned_representative.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 hover:underline flex items-center gap-1 text-[11px]"
                      >
                        <span>Official Ministry Source Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-navy-600">
                  {isTamil ? 'மத்திய அமைச்சக பரிசீலனையில் உள்ளது' : 'Under Union Ministry intake triage'}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Masked Citizen Information Card */}
          <Card className="border-navy-200 shadow-sm bg-navy-50/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-navy-500" />
                <CardTitle className="text-xs uppercase tracking-wider text-navy-700">
                  {isTamil ? 'பாதுகாக்கப்பட்ட மனுதாரர் விபரம்' : 'Masked Citizen Privacy'}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-2 text-xs text-navy-700">
              <div>
                <span className="font-medium text-navy-500">Name: </span>
                <span className="font-semibold text-navy-900">{complaint.submitter_masked_name || 'Verified Citizen'}</span>
              </div>
              <div>
                <span className="font-medium text-navy-500">Email: </span>
                <span className="font-mono text-navy-900">{complaint.submitter_masked_email || 'c***n@gov.in'}</span>
              </div>
              <div>
                <span className="font-medium text-navy-500">Phone: </span>
                <span className="font-mono text-navy-900">{complaint.submitter_masked_phone || '+91 98*** ***12'}</span>
              </div>
              <p className="text-[11px] text-navy-500 pt-2 border-t border-navy-200 leading-normal">
                {t.tracking.privacyProtected}
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
