import { Complaint, Representative, ComplaintAttachment, DeliveryLog, ComplaintUpdate } from '@/types/database';

export const INITIAL_REPRESENTATIVES: Representative[] = [
  {
    id: 'a0000001-0000-0000-0000-000000000001',
    name: 'Shri Narendra Modi',
    role: 'Prime Minister of India / Minister of Personnel & Public Grievances',
    organization: 'Prime Minister\'s Office (PMO) & DARPG',
    ministry: 'Ministry of Personnel, Public Grievances and Pensions',
    level: 'CABINET_MINISTER',
    category_specialty: 'all, general administration, central policy, public grievances, national development',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    constituency: 'Varanasi',
    parliamentary_constituency: 'Varanasi',
    email: 'pmo.grievance@gov.in',
    x_handle: '@PMOIndia',
    official_website: 'https://www.pmindia.gov.in',
    source_url: 'https://www.india.gov.in/my-government/prime-ministers-office',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000002',
    name: 'Shri Nitin Gadkari',
    role: 'Union Minister of Road Transport and Highways',
    organization: 'Ministry of Road Transport and Highways (MoRTH / NHAI)',
    ministry: 'Ministry of Road Transport and Highways',
    level: 'CABINET_MINISTER',
    category_specialty: 'highways-roads, national highways, expressways, flyovers, toll plaza, nhai, bridges, road safety',
    state: 'Maharashtra',
    district: 'Nagpur',
    constituency: 'Nagpur',
    parliamentary_constituency: 'Nagpur',
    email: 'nitin.gadkari@nic.in',
    x_handle: '@nitin_gadkari',
    official_website: 'https://morth.nic.in',
    source_url: 'https://morth.nic.in/who-is-who',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000003',
    name: 'Shri Ashwini Vaishnaw',
    role: 'Union Minister of Railways, Information & Broadcasting, Electronics & IT',
    organization: 'Ministry of Railways / MeitY',
    ministry: 'Ministry of Railways',
    level: 'CABINET_MINISTER',
    category_specialty: 'railways, trains, railway stations, pantry food, train delays, electronics, telecom, meity, digital india',
    state: 'All India',
    district: 'National',
    constituency: 'Rajya Sabha (Odisha)',
    parliamentary_constituency: 'All India',
    email: 'railgrievance@rb.railnet.gov.in',
    x_handle: '@AshwiniVaishnaw',
    official_website: 'https://indianrailways.gov.in',
    source_url: 'https://indianrailways.gov.in/railwayboard',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000004',
    name: 'Shri C. R. Patil',
    role: 'Union Minister of Jal Shakti',
    organization: 'Ministry of Jal Shakti',
    ministry: 'Ministry of Jal Shakti',
    level: 'CABINET_MINISTER',
    category_specialty: 'water-jal-shakti, jal jeevan mission, drinking water, river cleaning, namami gange, groundwater, canal irrigation',
    state: 'Gujarat',
    district: 'Surat',
    constituency: 'Navsari',
    parliamentary_constituency: 'Navsari',
    email: 'minister-jalshakti@gov.in',
    x_handle: '@CRPaatil',
    official_website: 'https://jalshakti.gov.in',
    source_url: 'https://jalshakti.gov.in/en/who-is-who',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000005',
    name: 'Shri Manohar Lal Khattar',
    role: 'Union Minister of Housing and Urban Affairs & Minister of Power',
    organization: 'Ministry of Housing and Urban Affairs (MoHUA) & Ministry of Power',
    ministry: 'Ministry of Housing and Urban Affairs',
    level: 'CABINET_MINISTER',
    category_specialty: 'urban-housing, power-energy, pmay, smart cities, metro rail, swachh bharat, powergrid, national grid, solar rooftop',
    state: 'Haryana',
    district: 'Karnal',
    constituency: 'Karnal',
    parliamentary_constituency: 'Karnal',
    email: 'minister-mohua@gov.in',
    x_handle: '@mlkhattar',
    official_website: 'https://mohua.gov.in',
    source_url: 'https://mohua.gov.in/cms/who-is-who.php',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000006',
    name: 'Shri Jyotiraditya Scindia',
    role: 'Union Minister of Communications and Minister of DoNER',
    organization: 'Ministry of Communications (DoT / India Post / BSNL)',
    ministry: 'Ministry of Communications',
    level: 'CABINET_MINISTER',
    category_specialty: 'telecom-postal, speed post, india post, bsnl, rural broadband, bharatnet, postal parcel, telecom network',
    state: 'Madhya Pradesh',
    district: 'Guna',
    constituency: 'Guna',
    parliamentary_constituency: 'Guna',
    email: 'minister-comm@gov.in',
    x_handle: '@JM_Scindia',
    official_website: 'https://dot.gov.in',
    source_url: 'https://dot.gov.in/whos-who',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000007',
    name: 'Shri Bhupender Yadav',
    role: 'Union Minister of Environment, Forest and Climate Change',
    organization: 'Ministry of Environment, Forest and Climate Change (MoEFCC / CPCB)',
    ministry: 'Ministry of Environment, Forest and Climate Change',
    level: 'CABINET_MINISTER',
    category_specialty: 'environment-pollution, cpcb, industrial emissions, river effluent, deforestation, illegal mining, e-waste, wildlife',
    state: 'Rajasthan',
    district: 'Alwar',
    constituency: 'Alwar',
    parliamentary_constituency: 'Alwar',
    email: 'mefcc@gov.in',
    x_handle: '@byadavbjp',
    official_website: 'https://moef.gov.in',
    source_url: 'https://moef.gov.in/en/about-the-ministry/who-is-who/',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000008',
    name: 'Shri J. P. Nadda',
    role: 'Union Minister of Health and Family Welfare & Chemicals and Fertilizers',
    organization: 'Ministry of Health and Family Welfare (MoHFW / AIIMS / NHA)',
    ministry: 'Ministry of Health and Family Welfare',
    level: 'CABINET_MINISTER',
    category_specialty: 'health-welfare, ayushman bharat, pm-jay, aiims hospitals, cghs dispensaries, generic medicines, fssai food adulteration',
    state: 'All India',
    district: 'National',
    constituency: 'Rajya Sabha (Gujarat)',
    parliamentary_constituency: 'All India',
    email: 'hfwminister@gov.in',
    x_handle: '@JPNadda',
    official_website: 'https://mohfw.gov.in',
    source_url: 'https://mohfw.gov.in/about-us/who-is-who',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000009',
    name: 'Smt. Nirmala Sitharaman',
    role: 'Union Minister of Finance and Corporate Affairs',
    organization: 'Ministry of Finance (CBDT / CBIC / Banking Ombudsman)',
    ministry: 'Ministry of Finance',
    level: 'CABINET_MINISTER',
    category_specialty: 'finance-pension, banking ombudsman, upi fraud, income tax refund, gst portal, epfo, national pension system, central taxes',
    state: 'All India',
    district: 'National',
    constituency: 'Rajya Sabha (Karnataka)',
    parliamentary_constituency: 'All India',
    email: 'appointment.fm@gov.in',
    x_handle: '@nsitharaman',
    official_website: 'https://finmin.nic.in',
    source_url: 'https://finmin.nic.in/whos-who',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000010',
    name: 'Shri Pralhad Joshi',
    role: 'Union Minister of Consumer Affairs, Food and Public Distribution & MNRE',
    organization: 'Ministry of Consumer Affairs, Food and Public Distribution / MNRE',
    ministry: 'Ministry of Consumer Affairs, Food and Public Distribution',
    level: 'CABINET_MINISTER',
    category_specialty: 'consumer-civil-supplies, national consumer helpline, nfsa food grains, e-commerce fraud, misleading ads, solar subsidy',
    state: 'Karnataka',
    district: 'Dharwad',
    constituency: 'Dharwad',
    parliamentary_constituency: 'Dharwad',
    email: 'minister.ca@nic.in',
    x_handle: '@JoshiPralhad',
    official_website: 'https://consumeraffairs.nic.in',
    source_url: 'https://consumeraffairs.nic.in/whos-who',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000011',
    name: 'Shri Kinjarapu Rammohan Naidu',
    role: 'Union Minister of Civil Aviation',
    organization: 'Ministry of Civil Aviation (DGCA / AAI / AirSewa)',
    ministry: 'Ministry of Civil Aviation',
    level: 'CABINET_MINISTER',
    category_specialty: 'civil-aviation, airsewa, airline refund, airport infrastructure, luggage delay, flight cancellation, udan',
    state: 'Andhra Pradesh',
    district: 'Srikakulam',
    constituency: 'Srikakulam',
    parliamentary_constituency: 'Srikakulam',
    email: 'minister.moca@nic.in',
    x_handle: '@RamMNK',
    official_website: 'https://www.civilaviation.gov.in',
    source_url: 'https://www.civilaviation.gov.in/whos-who',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000012',
    name: 'Shri Shivraj Singh Chouhan',
    role: 'Union Minister of Agriculture and Farmers Welfare & Minister of Rural Development',
    organization: 'Ministry of Agriculture & Ministry of Rural Development',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    level: 'CABINET_MINISTER',
    category_specialty: 'agriculture-rural, pm-kisan, pmgsy rural roads, crop insurance pmfby, fertilizer supply, mgnrega rural wages',
    state: 'Madhya Pradesh',
    district: 'Vidisha',
    constituency: 'Vidisha',
    parliamentary_constituency: 'Vidisha',
    email: 'agri.minister@gov.in',
    x_handle: '@ChouhanShivraj',
    official_website: 'https://agricoop.gov.in',
    source_url: 'https://agricoop.gov.in/en/who-is-who',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000013',
    name: 'Secretary, DARPG / CPGRAMS Nodal Cell',
    role: 'Director General / Central Public Grievances Officer',
    organization: 'Department of Administrative Reforms and Public Grievances (DARPG)',
    ministry: 'Ministry of Personnel, Public Grievances and Pensions',
    level: 'CENTRAL_AGENCY',
    category_specialty: 'all, cpgrams, general civic grievances, central escalation, administrative reform',
    state: 'Delhi',
    district: 'New Delhi',
    constituency: 'New Delhi',
    parliamentary_constituency: 'New Delhi',
    email: 'cpgrams-grievance@nic.in',
    x_handle: '@DARPG_GoI',
    official_website: 'https://pgportal.gov.in',
    source_url: 'https://darpg.gov.in/whos-who',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000014',
    name: 'Smt. Bansuri Swaraj',
    role: 'Member of Parliament (Lok Sabha)',
    organization: 'Parliament of India (Lok Sabha)',
    ministry: 'Lok Sabha Secretariat',
    level: 'LOK_SABHA_MP',
    category_specialty: 'all, new delhi local grievance, municipal, mp lad fund, public amenities',
    state: 'Delhi',
    district: 'New Delhi',
    constituency: 'New Delhi',
    parliamentary_constituency: 'New Delhi',
    email: 'bansuri.swaraj.mp@sansad.nic.in',
    x_handle: '@BansuriSwaraj',
    official_website: 'https://sansad.in/ls',
    source_url: 'https://sansad.in/ls/members',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000015',
    name: 'Dr. Kalanidhi Veeraswamy',
    role: 'Member of Parliament (Lok Sabha)',
    organization: 'Parliament of India (Lok Sabha)',
    ministry: 'Lok Sabha Secretariat',
    level: 'LOK_SABHA_MP',
    category_specialty: 'all, chennai north local grievance, coastal roads, ports, municipal water, drainage',
    state: 'Tamil Nadu',
    district: 'Chennai',
    constituency: 'Chennai North',
    parliamentary_constituency: 'Chennai North',
    email: 'kalanidhi.v.mp@sansad.nic.in',
    x_handle: '@KalanidhiV',
    official_website: 'https://sansad.in/ls',
    source_url: 'https://sansad.in/ls/members',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000016',
    name: 'Smt. Thamizhachi Thangapandian',
    role: 'Member of Parliament (Lok Sabha)',
    organization: 'Parliament of India (Lok Sabha)',
    ministry: 'Lok Sabha Secretariat',
    level: 'LOK_SABHA_MP',
    category_specialty: 'all, chennai south local grievance, it corridor, omr highway, velachery metro, urban amenities',
    state: 'Tamil Nadu',
    district: 'Chennai',
    constituency: 'Chennai South',
    parliamentary_constituency: 'Chennai South',
    email: 'thamizhachi.mp@sansad.nic.in',
    x_handle: '@ThamizhachiTh',
    official_website: 'https://sansad.in/ls',
    source_url: 'https://sansad.in/ls/members',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000017',
    name: 'Shri Tejasvi Surya',
    role: 'Member of Parliament (Lok Sabha)',
    organization: 'Parliament of India (Lok Sabha)',
    ministry: 'Lok Sabha Secretariat',
    level: 'LOK_SABHA_MP',
    category_specialty: 'all, bangalore south local grievance, bengaluru metro, suburban rail, urban traffic, digital tech',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    constituency: 'Bangalore South',
    parliamentary_constituency: 'Bangalore South',
    email: 'tejasvi.surya.mp@sansad.nic.in',
    x_handle: '@Tejasvi_Surya',
    official_website: 'https://sansad.in/ls',
    source_url: 'https://sansad.in/ls/members',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'a0000001-0000-0000-0000-000000000018',
    name: 'Shri Arvind Sawant',
    role: 'Member of Parliament (Lok Sabha)',
    organization: 'Parliament of India (Lok Sabha)',
    ministry: 'Lok Sabha Secretariat',
    level: 'LOK_SABHA_MP',
    category_specialty: 'all, mumbai south local grievance, port trust, coastal road, railway terminus, municipal amenities',
    state: 'Maharashtra',
    district: 'Mumbai City',
    constituency: 'Mumbai South',
    parliamentary_constituency: 'Mumbai South',
    email: 'arvind.sawant.mp@sansad.nic.in',
    x_handle: '@AGSawant',
    official_website: 'https://sansad.in/ls',
    source_url: 'https://sansad.in/ls/members',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-01-01T00:00:00Z',
    active: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  }
];

export const INITIAL_COMPLAINTS: Complaint[] = [];

class MockStore {
  private representatives: Representative[] = [...INITIAL_REPRESENTATIVES];
  private complaints: Complaint[] = [...INITIAL_COMPLAINTS];
  private upvotedFingerprints: Set<string> = new Set();

  getRepresentatives(): Representative[] {
    return this.representatives;
  }

  getRepresentativeById(id: string): Representative | undefined {
    return this.representatives.find(r => r.id === id);
  }

  addRepresentative(rep: Representative): void {
    const idx = this.representatives.findIndex(r => r.id === rep.id);
    if (idx >= 0) {
      this.representatives[idx] = rep;
    } else {
      this.representatives.unshift(rep);
    }
  }

  getComplaints(): Complaint[] {
    return this.complaints;
  }

  getComplaintById(id: string): Complaint | undefined {
    return this.complaints.find(c => c.id === id);
  }

  getComplaintByReference(ref: string): Complaint | undefined {
    return this.complaints.find(c => c.reference_number.toLowerCase() === ref.toLowerCase());
  }

  addComplaint(complaint: Complaint): void {
    const idx = this.complaints.findIndex(c => c.id === complaint.id);
    if (!complaint.upvotes_count) complaint.upvotes_count = 1;
    if (!complaint.sla_deadline) {
      // 7 days for URGENT, 14 days for HIGH, 30 days for others
      const days = complaint.severity === 'URGENT' ? 7 : complaint.severity === 'HIGH' ? 14 : 30;
      const deadline = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      complaint.sla_deadline = deadline.toISOString();
    }
    if (idx >= 0) {
      this.complaints[idx] = complaint;
    } else {
      this.complaints.unshift(complaint);
    }
  }

  upvoteComplaint(idOrRef: string, userFingerprint?: string): { success: boolean; upvotes: number; message: string } {
    const complaint = this.complaints.find(c => c.id === idOrRef || c.reference_number.toLowerCase() === idOrRef.toLowerCase());
    if (!complaint) return { success: false, upvotes: 0, message: 'Complaint not found' };

    const key = `${userFingerprint || 'anon'}_${complaint.id}`;
    if (userFingerprint && this.upvotedFingerprints.has(key)) {
      return { success: false, upvotes: complaint.upvotes_count || 1, message: 'You have already endorsed this complaint' };
    }

    if (userFingerprint) this.upvotedFingerprints.add(key);
    complaint.upvotes_count = (complaint.upvotes_count || 0) + 1;
    complaint.updated_at = new Date().toISOString();

    return { success: true, upvotes: complaint.upvotes_count, message: 'Endorsement recorded successfully' };
  }

  submitCitizenRating(idOrRef: string, rating: number, feedback?: string): boolean {
    const complaint = this.complaints.find(c => c.id === idOrRef || c.reference_number.toLowerCase() === idOrRef.toLowerCase());
    if (!complaint) return false;

    complaint.citizen_rating = rating;
    if (feedback) complaint.citizen_feedback = feedback;
    complaint.updated_at = new Date().toISOString();
    return true;
  }

  updateComplaintStatus(id: string, status: string, message?: string, repId?: string, resolutionProofUrl?: string): boolean {
    const complaint = this.complaints.find(c => c.id === id);
    if (!complaint) return false;

    complaint.status = status as any;
    complaint.updated_at = new Date().toISOString();
    if (repId) complaint.assigned_representative_id = repId;
    if (resolutionProofUrl) complaint.resolution_proof_url = resolutionProofUrl;

    if (message) {
      if (!complaint.updates) complaint.updates = [];
      complaint.updates.unshift({
        id: crypto.randomUUID(),
        complaint_id: id,
        status: status as any,
        message,
        is_public: true,
        created_at: new Date().toISOString(),
      });
    }
    return true;
  }
}

export const mockStore = new MockStore();

