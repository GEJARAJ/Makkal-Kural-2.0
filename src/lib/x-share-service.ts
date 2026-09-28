import { Complaint, Representative } from '@/types/database';

export const MINISTRY_X_HANDLES: Record<string, { ministryHandle: string; ministerHandle: string }> = {
  'highways-roads': { ministryHandle: '@MoRTHIndia', ministerHandle: '@nitin_gadkari' },
  'railways': { ministryHandle: '@RailMinIndia', ministerHandle: '@AshwiniVaishnaw' },
  'water-jal-shakti': { ministryHandle: '@JalShaktiMin', ministerHandle: '@CRPaatil' },
  'power-energy': { ministryHandle: '@MinOfPower', ministerHandle: '@mlkhattar' },
  'urban-housing': { ministryHandle: '@MoHUA_India', ministerHandle: '@mlkhattar' },
  'telecom-postal': { ministryHandle: '@DoT_India', ministerHandle: '@JM_Scindia' },
  'environment-pollution': { ministryHandle: '@moefcc', ministerHandle: '@byadavbjp' },
  'health-family-welfare': { ministryHandle: '@MoHFW_INDIA', ministerHandle: '@JPNadda' },
  'finance-epfo-banking': { ministryHandle: '@FinMinIndia', ministerHandle: '@nsitharaman' },
  'consumer-civil-supplies': { ministryHandle: '@jagograhakjago', ministerHandle: '@JoshiPralhad' },
  'civil-aviation': { ministryHandle: '@MoCA_GoI', ministerHandle: '@RamMNK' },
  'agriculture-rural': { ministryHandle: '@AgriGoI', ministerHandle: '@ChouhanShivraj' },
};

export function buildXDraftPetition(
  complaint: Partial<Complaint> & { reference_number?: string; title?: string; locality?: string; district?: string; state?: string; category?: string; ai_improved_title?: string },
  representative?: Representative
): string {
  const ref = complaint.reference_number || 'MK2-REF';
  const area = complaint.locality || complaint.city || complaint.district || 'India';
  const state = complaint.state || '';
  const categoryId = complaint.category || '';
  const ministryInfo = categoryId ? MINISTRY_X_HANDLES[categoryId] : null;

  const titleClean = (complaint.ai_improved_title || complaint.title || 'Civic Issue').trim();
  const shortTitle = titleClean.length > 80 ? titleClean.slice(0, 77) + '...' : titleClean;

  // Handles to tag
  const handles: string[] = [];

  if (representative?.x_handle) {
    const raw = representative.x_handle.trim().replace(/^@+/, '');
    if (raw) {
      const cleanHandle = `@${raw}`;
      if (!handles.includes(cleanHandle)) handles.push(cleanHandle);
    }
  }

  if (ministryInfo) {
    if (ministryInfo.ministerHandle && !handles.includes(ministryInfo.ministerHandle)) {
      handles.push(ministryInfo.ministerHandle);
    }
    if (ministryInfo.ministryHandle && !handles.includes(ministryInfo.ministryHandle)) {
      handles.push(ministryInfo.ministryHandle);
    }
  }

  if (handles.length === 0) {
    handles.push('@PMOIndia', '@DARPG_GoI');
  }

  const appBaseUrl = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_APP_URL || 'https://makkal-kural-2-0.vercel.app');
  const trackUrl = `${appBaseUrl}/track/${ref}`;

  const textLines = [
    `📢 CITIZEN PETITION #${ref}`,
    ``,
    `Attn: ${handles.join(' ')}`,
    ``,
    `"${shortTitle}"`,
    `📍 ${area}${state ? `, ${state}` : ''}`,
    ``,
    `Tracking & Live Audit Dossier:`,
    `${trackUrl}`,
    ``,
    `#MakkalKural #CPGRAMS #CitizenVoice`
  ];

  return textLines.join('\n');
}

export function buildXShareUrl(
  complaint: Partial<Complaint> & { reference_number?: string; title?: string; locality?: string; district?: string; state?: string; category?: string; ai_improved_title?: string },
  representative?: Representative
): string {
  const fullText = buildXDraftPetition(complaint, representative);
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}`;
}

export function buildXOfficialReplyUrl(
  complaint: Partial<Complaint> & { reference_number?: string; title?: string; locality?: string; district?: string; state?: string; category?: string; ai_improved_title?: string },
  representative?: Representative
): string {
  return buildXShareUrl(complaint, representative);
}

/**
 * Automates opening the X / Twitter composer:
 * Works seamlessly across Desktop and Mobile without popup-blocker issues.
 */
export function openXIntentOrApp(
  complaint: Partial<Complaint> & { reference_number?: string; title?: string; locality?: string; district?: string; state?: string; category?: string; ai_improved_title?: string },
  representative?: Representative
): void {
  if (typeof window === 'undefined') return;

  const fullText = buildXDraftPetition(complaint, representative);
  const encodedText = encodeURIComponent(fullText);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;

  // Create an invisible link element and click it natively to prevent popup blockers
  const link = document.createElement('a');
  link.href = tweetUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
