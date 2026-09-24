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

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'c0000001-0000-0000-0000-000000000001',
    reference_number: 'MK2-2026-NH48-001',
    category: 'highways-roads',
    subcategory: 'National Highway Potholes / Damage',
    ministry: 'Ministry of Road Transport and Highways',
    title: 'Severe crater damage on NH-48 Express Corridor near Kanchipuram Bypass',
    description: 'Multiple deep craters and damaged expansion joints on the National Highway 48 stretch causing fatal accident hazards for high-speed traffic.',
    original_language: 'en',
    ai_improved_title: 'Urgent Structural Repairs Required for Deep Craters on NH-48 (Kanchipuram Stretch)',
    ai_improved_description: 'Respectfully submitting this urgent petition to the National Highways Authority of India regarding severe asphalt erosion and dangerous potholes along the NH-48 highway corridor.',
    state: 'Tamil Nadu',
    district: 'Kanchipuram',
    city: 'Sriperumbudur',
    constituency: 'Sriperumbudur',
    parliamentary_constituency: 'Sriperumbudur',
    locality: 'NH-48 Km 54 Marker',
    latitude: 12.9675,
    longitude: 79.9419,
    severity: 'HIGH',
    status: 'IN_PROGRESS',
    assigned_representative_id: 'a0000001-0000-0000-0000-000000000002',
    is_anonymous: false,
    submitter_name: 'Venkatesh Ramanathan',
    submitter_email: 'venkatesh.r@example.com',
    submitter_phone: '+91 98401 23456',
    upvotes_count: 87,
    sla_deadline: '2026-02-24T10:00:00Z',
    sla_escalated: false,
    escalation_level: 'LEVEL_1_NODAL',
    created_at: '2026-02-10T10:00:00Z',
    updated_at: '2026-02-12T14:30:00Z',
    updates: [
      {
        id: 'u1',
        complaint_id: 'c0000001-0000-0000-0000-000000000001',
        status: 'SUBMITTED',
        message: 'Complaint submitted and validated by system.',
        is_public: true,
        created_at: '2026-02-10T10:00:00Z',
      },
      {
        id: 'u2',
        complaint_id: 'c0000001-0000-0000-0000-000000000001',
        status: 'IN_PROGRESS',
        message: 'Dispatched to NHAI Regional Project Director office for site inspection.',
        is_public: true,
        created_at: '2026-02-12T14:30:00Z',
      }
    ],
    delivery_logs: [
      {
        id: 'l1',
        complaint_id: 'c0000001-0000-0000-0000-000000000001',
        channel: 'EMAIL',
        recipient: 'nitin.gadkari@nic.in',
        status: 'SUCCESS',
        external_message_id: 'msg_nhai_001',
        sent_at: '2026-02-10T10:05:00Z',
      }
    ]
  },
  {
    id: 'c0000001-0000-0000-0000-000000000002',
    reference_number: 'MK2-2026-RAIL-002',
    category: 'railways',
    subcategory: 'Railway Station Amenities & Accessibility',
    ministry: 'Ministry of Railways',
    title: 'Non-functional wheelchair ramps and lift at New Delhi Railway Station (Paharganj Side)',
    description: 'Elderly passengers and persons with disabilities are facing extreme difficulty accessing Platform 1-6 due to non-operational elevators.',
    original_language: 'en',
    state: 'Delhi',
    district: 'New Delhi',
    city: 'New Delhi',
    constituency: 'New Delhi',
    parliamentary_constituency: 'New Delhi',
    locality: 'New Delhi Railway Station Paharganj Gate',
    latitude: 28.6429,
    longitude: 77.2195,
    severity: 'MEDIUM',
    status: 'RESOLVED',
    assigned_representative_id: 'a0000001-0000-0000-0000-000000000003',
    is_anonymous: false,
    submitter_name: 'Anjali Sharma',
    submitter_email: 'anjali.s@example.com',
    upvotes_count: 142,
    sla_deadline: '2026-03-01T09:00:00Z',
    sla_escalated: false,
    resolution_proof_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    citizen_rating: 5,
    citizen_feedback: 'Elevator and accessibility ramps were repaired within 4 days. Excellent quick redressal by Northern Railways!',
    created_at: '2026-02-15T09:00:00Z',
    updated_at: '2026-02-19T11:00:00Z',
    updates: [
      {
        id: 'u3',
        complaint_id: 'c0000001-0000-0000-0000-000000000002',
        status: 'ACKNOWLEDGED',
        message: 'Acknowledged by Northern Railway Division Grievance Cell.',
        is_public: true,
        created_at: '2026-02-15T11:00:00Z',
      },
      {
        id: 'u4',
        complaint_id: 'c0000001-0000-0000-0000-000000000002',
        status: 'RESOLVED',
        message: 'Elevator motor replaced and ramps safety-certified. Issue resolved.',
        is_public: true,
        created_at: '2026-02-19T11:00:00Z',
      }
    ]
  },
  {
    id: 'c0000001-0000-0000-0000-000000000003',
    reference_number: 'MK2-2026-JAL-003',
    category: 'water-jal-shakti',
    subcategory: 'Jal Jeevan Mission Pipeline Leakage',
    ministry: 'Ministry of Jal Shakti',
    title: 'Drinking water pipeline contamination near Whitefield, Bengaluru',
    description: 'Fresh drinking water supply pipe has breached adjacent to stormwater drain, leading to foul-smelling turbid water entering 300+ residential households.',
    original_language: 'en',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    constituency: 'Bangalore South',
    parliamentary_constituency: 'Bangalore South',
    locality: 'Whitefield Main Road, Kadugodi',
    latitude: 12.9698,
    longitude: 77.7499,
    severity: 'URGENT',
    status: 'IN_PROGRESS',
    assigned_representative_id: 'a0000001-0000-0000-0000-000000000004',
    is_anonymous: false,
    submitter_name: 'Kiran Gowda',
    submitter_email: 'kiran.gowda@example.com',
    upvotes_count: 215,
    sla_deadline: '2026-02-23T12:00:00Z',
    sla_escalated: true,
    escalation_level: 'LEVEL_2_JOINT_SECRETARY',
    created_at: '2026-02-16T12:00:00Z',
    updated_at: '2026-02-18T16:00:00Z',
    updates: [
      {
        id: 'u5',
        complaint_id: 'c0000001-0000-0000-0000-000000000003',
        status: 'SUBMITTED',
        message: 'Submitted to Jal Shakti Nodal desk.',
        is_public: true,
        created_at: '2026-02-16T12:00:00Z',
      },
      {
        id: 'u6',
        complaint_id: 'c0000001-0000-0000-0000-000000000003',
        status: 'IN_PROGRESS',
        message: 'Escalated to Joint Secretary level due to urgent public health alert.',
        is_public: true,
        created_at: '2026-02-18T16:00:00Z',
      }
    ]
  },
  {
    id: 'c0000001-0000-0000-0000-000000000004',
    reference_number: 'MK2-2026-PWR-004',
    category: 'power-energy',
    subcategory: 'High Voltage Transformer Sparking & Sagging Cables',
    ministry: 'Ministry of Power',
    title: 'Exposed 11kV transformer sparking continuously near Marine Drive, Mumbai',
    description: 'High voltage distribution transformer sparking during sea breeze humidity. Immediate fire hazard near dense pedestrian walkway.',
    original_language: 'en',
    state: 'Maharashtra',
    district: 'Mumbai City',
    city: 'Mumbai',
    constituency: 'Mumbai South',
    parliamentary_constituency: 'Mumbai South',
    locality: 'Marine Drive Promenade Opp. Chowpatty',
    latitude: 18.9438,
    longitude: 72.8232,
    severity: 'URGENT',
    status: 'RESOLVED',
    assigned_representative_id: 'a0000001-0000-0000-0000-000000000005',
    is_anonymous: false,
    submitter_name: 'Rajesh Parekh',
    submitter_email: 'r.parekh@example.com',
    upvotes_count: 340,
    sla_deadline: '2026-02-21T18:00:00Z',
    sla_escalated: false,
    resolution_proof_url: 'https://images.unsplash.com/photo-1508873696983-2df570464756?auto=format&fit=crop&w=600&q=80',
    citizen_rating: 5,
    citizen_feedback: 'Emergency team isolated the faulty transformer and insulated all wires within 6 hours. Superb response!',
    created_at: '2026-02-18T18:00:00Z',
    updated_at: '2026-02-19T00:30:00Z',
    updates: [
      {
        id: 'u7',
        complaint_id: 'c0000001-0000-0000-0000-000000000004',
        status: 'RESOLVED',
        message: 'Faulty insulator bushing replaced, load re-balanced.',
        is_public: true,
        created_at: '2026-02-19T00:30:00Z',
      }
    ]
  },
  {
    id: 'c0000001-0000-0000-0000-000000000005',
    reference_number: 'MK2-2026-ENV-005',
    category: 'environment-pollution',
    subcategory: 'Industrial Effluent Discharge in Ganga Tributary',
    ministry: 'Ministry of Environment, Forest and Climate Change',
    title: 'Untreated chemical foam discharge in Assi River basin, Varanasi',
    description: 'Chemical industrial effluents discharging directly without secondary treatment, generating toxic foam and severe ecological distress.',
    original_language: 'en',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    city: 'Varanasi',
    constituency: 'Varanasi',
    parliamentary_constituency: 'Varanasi',
    locality: 'Assi Ghat Confluence Point',
    latitude: 25.2820,
    longitude: 83.0062,
    severity: 'HIGH',
    status: 'IN_PROGRESS',
    assigned_representative_id: 'a0000001-0000-0000-0000-000000000001',
    is_anonymous: false,
    submitter_name: 'Dr. Amit Tripathi',
    submitter_email: 'amit.tripathi@example.com',
    upvotes_count: 512,
    sla_deadline: '2026-02-28T14:00:00Z',
    sla_escalated: true,
    escalation_level: 'LEVEL_3_MINISTER',
    created_at: '2026-02-14T14:00:00Z',
    updated_at: '2026-02-17T11:00:00Z',
    updates: [
      {
        id: 'u8',
        complaint_id: 'c0000001-0000-0000-0000-000000000005',
        status: 'IN_PROGRESS',
        message: 'CPCB and Namami Gange surveillance team issued notice to 3 dyeing units.',
        is_public: true,
        created_at: '2026-02-17T11:00:00Z',
      }
    ]
  }
];

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

