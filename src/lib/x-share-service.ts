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
  complaint: Complaint,
  representative?: Representative
): string {
  const ref = complaint.reference_number;
  const area = complaint.locality || complaint.city || complaint.district;
  const state = complaint.state;
  const categoryId = complaint.category;
  const ministryInfo = MINISTRY_X_HANDLES[categoryId];

  const titleClean = (complaint.ai_improved_title || complaint.title).trim();
  const shortTitle = titleClean.length > 90 ? titleClean.slice(0, 87) + '...' : titleClean;

  // Handles to tag
  const handles: string[] = [];

  if (representative?.x_handle) {
    const cleanHandle = `@${representative.x_handle.replace('@', '')}`;
    if (!handles.includes(cleanHandle)) handles.push(cleanHandle);
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

  const appBaseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'https://makkalkural.org');
  const trackUrl = `${appBaseUrl}/track/${ref}`;

  const textLines = [
    `📢 CITIZEN PETITION #${ref}`,
    ``,
    `Attention: ${handles.join(' ')}`,
    ``,
    `Issue: "${shortTitle}"`,
    `📍 ${area}, ${complaint.district}, ${state}`,
    ``,
    `Citizens request prompt verification and redressal under Citizen's Charter.`,
    ``,
    `🔗 Live Audit Dossier: ${trackUrl}`,
    ``,
    `#MakkalKural #CPGRAMS #PublicGrievance #CitizenVoice #GoI`
  ];

  return textLines.join('\n');
}

export function buildXShareUrl(
  complaint: Complaint,
  representative?: Representative
): string {
  const fullText = buildXDraftPetition(complaint, representative);
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}`;
}

export function buildXOfficialReplyUrl(
  complaint: Complaint,
  representative?: Representative
): string {
  return buildXShareUrl(complaint, representative);
}

/**
 * Automates redirecting to X (Twitter):
 * Opens universal compose intent directly with pop-up blocker fallback.
 * Works seamlessly on both Desktop & Mobile (iOS / Android X App).
 */
export function openXIntentOrApp(
  complaint: Complaint,
  representative?: Representative
): void {
  if (typeof window === 'undefined') return;

  const fullText = buildXDraftPetition(complaint, representative);
  const encodedText = encodeURIComponent(fullText);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedText}`;

  try {
    const newWin = window.open(tweetUrl, '_blank', 'noopener,noreferrer');
    if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
      window.location.href = tweetUrl;
    }
  } catch {
    window.location.href = tweetUrl;
  }
}
