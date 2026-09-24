import { Representative } from '@/types/database';
import { getRepresentatives } from '@/lib/supabase/database';

export interface RoutingResult {
  representative?: Representative;
  isVerified: boolean;
  matchScore: number;
  routingReason: string;
  matchedMinistry?: string;
  matchedLevel?: string;
}

const CENTRAL_PORTFOLIO_KEYWORDS: Record<string, string[]> = {
  'highways-roads': [
    'national highway', 'highway', 'nhai', 'expressway', 'flyover', 'toll', 'toll plaza',
    'fastag', 'road transport', 'morth', 'road safety', 'bypass', 'overbridge', 'pothole on highway'
  ],
  'railways': [
    'railway', 'train', 'irctc', 'rail', 'coach', 'station', 'pantry', 'ticket', 'locomotive',
    'vande bharat', 'railway track', 'platform', 'berth', 'train delay', 'rail grievance'
  ],
  'water-jal-shakti': [
    'water', 'jal shakti', 'jal jeevan', 'drinking water', 'river', 'namami gange', 'groundwater',
    'sanitation', 'canal', 'irrigation', 'water resources', 'sewage treatment'
  ],
  'power-energy': [
    'power', 'electricity', 'energy', 'grid', 'powergrid', 'solar', 'pm surya ghar', 'renewable',
    'transmission', 'substation', 'electrification', 'tariff', 'high tension'
  ],
  'urban-housing': [
    'housing', 'urban', 'pmay', 'pradhan mantri awas', 'smart city', 'metro rail', 'swachh bharat',
    'urban development', 'slum', 'mohua', 'drainage', 'amrut'
  ],
  'telecom-postal': [
    'telecom', 'postal', 'post', 'speed post', 'india post', 'bsnl', 'mtnl', 'broadband',
    'bharatnet', 'dot', 'meity', 'aadhaar', 'cyber crime', 'mobile tower', 'digital india'
  ],
  'environment-pollution': [
    'environment', 'pollution', 'cpcb', 'forest', 'emission', 'air quality', 'industrial effluent',
    'wildlife', 'deforestation', 'toxic waste', 'e-waste', 'national park'
  ],
  'health-welfare': [
    'health', 'hospital', 'aiims', 'ayushman bharat', 'pm-jay', 'cghs', 'medicine', 'fssai',
    'food safety', 'jan aushadhi', 'medical college', 'family welfare'
  ],
  'finance-pension': [
    'finance', 'banking', 'rbi', 'ombudsman', 'epfo', 'provident fund', 'pf claim', 'pension',
    'nps', 'sparsh', 'income tax', 'gst', 'insurance', 'upi fraud', 'banking fraud'
  ],
  'consumer-civil-supplies': [
    'consumer', 'consumer affairs', 'misleading ad', 'e-commerce', 'refund fraud', 'nfsa',
    'ration', 'fci', 'food grain', 'mrp', 'weights and measures'
  ],
  'civil-aviation': [
    'aviation', 'airport', 'airline', 'flight', 'airsewa', 'dgca', 'aai', 'airports authority',
    'baggage', 'flight cancellation', 'udan'
  ],
  'agriculture-rural': [
    'agriculture', 'pm-kisan', 'kisan', 'farmer', 'rural development', 'pmgsy', 'rural road',
    'crop insurance', 'pmfby', 'fertilizer', 'urea', 'mgnrega'
  ],
};

function getRepresentativeScore(
  category: string,
  rep: Representative,
  state?: string,
  district?: string,
  constituency?: string
): { score: number; reason: string } {
  const cat = (category || '').toLowerCase();
  const specialty = (rep.category_specialty || '').toLowerCase();
  const role = (rep.role || '').toLowerCase();
  const org = (rep.organization || '').toLowerCase();
  const repMinistry = (rep.ministry || '').toLowerCase();
  const repState = (rep.state || '').toLowerCase();
  const repDistrict = (rep.district || '').toLowerCase();
  const repConstituency = (rep.parliamentary_constituency || rep.constituency || '').toLowerCase();

  let score = 0;
  const reasons: string[] = [];

  // Direct category / specialty matching
  if (specialty.includes(cat) || cat.includes(specialty)) {
    score += 45;
    reasons.push('Direct portfolio specialty match');
  }

  // Check keyword hits for ministry
  const keywords = CENTRAL_PORTFOLIO_KEYWORDS[cat] || [];
  let keywordHit = false;
  for (const kw of keywords) {
    if (specialty.includes(kw) || role.includes(kw) || org.includes(kw) || repMinistry.includes(kw)) {
      score += 40;
      keywordHit = true;
      reasons.push(`Central ministry portfolio match (${rep.organization})`);
      break;
    }
  }

  // Location / MP matching
  if (state && repState.includes(state.toLowerCase())) {
    score += 10;
    reasons.push(`State jurisdiction: ${rep.state}`);
  }

  if (district && repDistrict.includes(district.toLowerCase())) {
    score += 15;
    reasons.push(`District: ${rep.district}`);
  }

  if (constituency && repConstituency.includes(constituency.toLowerCase())) {
    score += 25;
    reasons.push(`Constituency Representative: ${rep.name}`);
  }

  // Verification status boost
  if (rep.verification_status === 'VERIFIED') {
    score += 10;
  }

  // Cabinet Minister bonus for category jurisdiction
  if (rep.level === 'CABINET_MINISTER' && keywordHit) {
    score += 20;
  }

  return {
    score,
    reason: reasons.length > 0 ? reasons.join(' • ') : 'Standard Central Grievance routing match',
  };
}

export async function routeComplaintToRepresentative(
  category: string,
  state: string,
  district?: string,
  constituency?: string
): Promise<RoutingResult> {
  const reps = await getRepresentatives();
  const activeReps = reps.filter(r => r.active);

  if (activeReps.length === 0) {
    return {
      isVerified: false,
      matchScore: 0,
      routingReason: 'No active representatives found in system',
    };
  }

  // Evaluate every representative and find highest score
  let bestRep: Representative | undefined;
  let highestScore = -1;
  let bestReason = '';

  for (const rep of activeReps) {
    const { score, reason } = getRepresentativeScore(category, rep, state, district, constituency);
    if (score > highestScore) {
      highestScore = score;
      bestRep = rep;
      bestReason = reason;
    }
  }

  if (bestRep && highestScore > 30) {
    return {
      representative: bestRep,
      isVerified: bestRep.verification_status === 'VERIFIED',
      matchScore: Math.min(100, highestScore),
      routingReason: bestReason || `Routed to ${bestRep.organization}`,
      matchedMinistry: bestRep.ministry || bestRep.organization,
      matchedLevel: bestRep.level || 'CENTRAL_MINISTRY',
    };
  }

  // Fallback to CPGRAMS / Public Grievance Nodal Cell
  const cpgramsRep = activeReps.find(r => 
    r.organization.toLowerCase().includes('darpg') || 
    r.organization.toLowerCase().includes('public grievance') ||
    r.name.toLowerCase().includes('grievance')
  ) || activeReps[0];

  return {
    representative: cpgramsRep,
    isVerified: cpgramsRep.verification_status === 'VERIFIED',
    matchScore: 65,
    routingReason: 'Auto-routed to Central Public Grievance Nodal Authority (DARPG / CPGRAMS)',
    matchedMinistry: 'Department of Administrative Reforms and Public Grievances',
    matchedLevel: 'CENTRAL_AGENCY',
  };
}
