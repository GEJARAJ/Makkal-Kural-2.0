export interface DistrictData {
  id: string;
  nameEn: string;
  nameTa: string;
  nameHi: string;
  headquarters: string;
  constituenciesEn: string[];
  constituenciesTa: string[];
  constituenciesHi: string[];
}

export interface StateData {
  id: string;
  nameEn: string;
  nameTa: string;
  nameHi: string;
  type: 'STATE' | 'UT';
  capital: string;
  districts: DistrictData[];
  parliamentaryConstituencies: string[];
}

export const INDIAN_STATES_AND_UTS: StateData[] = [
  {
    id: 'tamil-nadu',
    nameEn: 'Tamil Nadu',
    nameTa: 'தமிழ்நாடு',
    nameHi: 'तमिलनाडु',
    type: 'STATE',
    capital: 'Chennai',
    parliamentaryConstituencies: [
      'Chennai North', 'Chennai South', 'Chennai Central', 'Sriperumbudur', 'Kancheepuram', 'Arakkonam',
      'Vellore', 'Tiruvannamalai', 'Arani', 'Viluppuram', 'Kallakurichi', 'Salem', 'Namakkal', 'Erode',
      'Tiruppur', 'Nilgiris', 'Coimbatore', 'Pollachi', 'Dindigul', 'Karur', 'Tiruchirappalli', 'Perambalur',
      'Cuddalore', 'Chidambaram', 'Mayiladuthurai', 'Nagapattinam', 'Thanjavur', 'Sivaganga', 'Madurai',
      'Theni', 'Virudhunagar', 'Ramanathapuram', 'Thoothukkudi', 'Tenkasi', 'Tirunelveli', 'Kanniyakumari'
    ],
    districts: [
      {
        id: 'chennai',
        nameEn: 'Chennai',
        nameTa: 'சென்னை',
        nameHi: 'चेन्नई',
        headquarters: 'Chennai',
        constituenciesEn: ['Chennai North', 'Chennai South', 'Chennai Central', 'Saidapet', 'Mylapore', 'Anna Nagar', 'Velachery', 'T.Nagar'],
        constituenciesTa: ['வட சென்னை', 'தென் சென்னை', 'மத்திய சென்னை', 'சைதாப்பேட்டை', 'மயிலாப்பூர்', 'அண்ணா நகர்', 'வேளச்சேரி', 'தி.நகர்'],
        constituenciesHi: ['उत्तरी चेन्नई', 'दक्षिणी चेन्नई', 'मध्य चेन्नई', 'सैदापेट', 'मायलापुर', 'अन्ना नगर', 'वेलाचेरी', 'टी.नगर'],
      },
      {
        id: 'coimbatore',
        nameEn: 'Coimbatore',
        nameTa: 'கோயம்புத்தூர்',
        nameHi: 'कोयंबटूर',
        headquarters: 'Coimbatore',
        constituenciesEn: ['Coimbatore', 'Pollachi', 'Singanallur', 'Sulur', 'Thondamuthur'],
        constituenciesTa: ['கோயம்புத்தூர்', 'பொள்ளாச்சி', 'சிங்காநல்லூர்', 'சூலூர்', 'தொண்டாமுத்தூர்'],
        constituenciesHi: ['कोयंबटूर', 'पोल्लाची', 'सिंगनल्लूर', 'सुलूर', 'थोंडामुथुर'],
      },
      {
        id: 'madurai',
        nameEn: 'Madurai',
        nameTa: 'மதுரை',
        nameHi: 'मदुरै',
        headquarters: 'Madurai',
        constituenciesEn: ['Madurai', 'Melur', 'Thiruparankundram', 'Usilampatti'],
        constituenciesTa: ['மதுரை', 'மேலூர்', 'திருப்பரங்குன்றம்', 'உசிலம்பட்டி'],
        constituenciesHi: ['मदुरै', 'मेलूर', 'तिरुपरनकुंद्रम', 'उसीलमपट्टी'],
      },
      {
        id: 'tiruchirappalli',
        nameEn: 'Tiruchirappalli',
        nameTa: 'திருச்சிராப்பள்ளி',
        nameHi: 'तिरुचिरापल्ली',
        headquarters: 'Tiruchirappalli',
        constituenciesEn: ['Tiruchirappalli', 'Srirangam', 'Thiruverumbur', 'Manapparai'],
        constituenciesTa: ['திருச்சிராப்பள்ளி', 'ஸ்ரீரங்கம்', 'திருவெறும்பூர்', 'மணப்பாறை'],
        constituenciesHi: ['तिरुचिरापल्ली', 'श्रीरंगम', 'तिरुवेरुम्बुर', 'मनापराई'],
      },
      {
        id: 'salem',
        nameEn: 'Salem',
        nameTa: 'சேலம்',
        nameHi: 'सेलम',
        headquarters: 'Salem',
        constituenciesEn: ['Salem', 'Mettur', 'Edappadi', 'Attur'],
        constituenciesTa: ['சேலம்', 'மேட்டூர்', 'எடப்பாடி', 'ஆத்தூர்'],
        constituenciesHi: ['सेलम', 'मेट्टूर', 'एडाप्पाडी', 'अत्तूर'],
      },
      {
        id: 'tirunelveli',
        nameEn: 'Tirunelveli',
        nameTa: 'திருநெல்வேலி',
        nameHi: 'तिरुनेलवेली',
        headquarters: 'Tirunelveli',
        constituenciesEn: ['Tirunelveli', 'Palayamkottai', 'Ambasamudram'],
        constituenciesTa: ['திருநெல்வேலி', 'பாளையங்கோட்டை', 'அம்பாசமுத்திரம்'],
        constituenciesHi: ['तिरुनेलवेली', 'पलायमकोट्टई', 'अंबासमुद्रम'],
      },
      {
        id: 'kanchipuram',
        nameEn: 'Kanchipuram',
        nameTa: 'காஞ்சிபுரம்',
        nameHi: 'कांचीपुरम',
        headquarters: 'Kanchipuram',
        constituenciesEn: ['Kancheepuram', 'Sriperumbudur', 'Uthiramerur'],
        constituenciesTa: ['காஞ்சிபுரம்', 'ஸ்ரீபெரும்புதூர்', 'உத்திரமேரூர்'],
        constituenciesHi: ['कांचीपुरम', 'श्रीपेरंबदूर', 'उथिरमेरुर'],
      },
    ],
  },
  {
    id: 'delhi',
    nameEn: 'Delhi (NCT)',
    nameTa: 'டெல்லி',
    nameHi: 'दिल्ली (राष्ट्रीय राजधानी क्षेत्र)',
    type: 'UT',
    capital: 'New Delhi',
    parliamentaryConstituencies: [
      'New Delhi', 'Chandni Chowk', 'North East Delhi', 'East Delhi', 'North West Delhi', 'West Delhi', 'South Delhi'
    ],
    districts: [
      {
        id: 'new-delhi',
        nameEn: 'New Delhi',
        nameTa: 'புது தில்லி',
        nameHi: 'नई दिल्ली',
        headquarters: 'Connaught Place',
        constituenciesEn: ['New Delhi', 'Chanakyapuri', 'Delhi Cantt', 'Kasturba Nagar'],
        constituenciesTa: ['புது தில்லி', 'சாணக்யபுரி', 'தில்லி கன்டோன்மென்ட்', 'கஸ்தூரிபா நகர்'],
        constituenciesHi: ['नई दिल्ली', 'चाणक्यपुरी', 'दिल्ली कैंट', 'कस्तूरबा नगर'],
      },
      {
        id: 'central-delhi',
        nameEn: 'Central Delhi',
        nameTa: 'மத்திய தில்லி',
        nameHi: 'मध्य दिल्ली',
        headquarters: 'Daryaganj',
        constituenciesEn: ['Chandni Chowk', 'Karol Bagh', 'Pahar Ganj', 'Matia Mahal'],
        constituenciesTa: ['சாந்தினி சவுக்', 'கரோல் பாக்', 'பஹர்கஞ்ச்', 'மதியா மஹால்'],
        constituenciesHi: ['चांदनी चौक', 'करोल बाग', 'पहाड़गंज', 'मटिया महल'],
      },
      {
        id: 'south-delhi',
        nameEn: 'South Delhi',
        nameTa: 'தெற்கு தில்லி',
        nameHi: 'दक्षिण दिल्ली',
        headquarters: 'Saket',
        constituenciesEn: ['South Delhi', 'Hauz Khas', 'Mehrauli', 'Kalkaji', 'Sangam Vihar'],
        constituenciesTa: ['தெற்கு தில்லி', 'ஹவுஸ் காஸ்', 'மெஹ்ரௌலி', 'கல்காஜி', 'சங்கம் விஹார்'],
        constituenciesHi: ['दक्षिण दिल्ली', 'हौज खास', 'महरौली', 'कालकाजी', 'संगम विहार'],
      },
      {
        id: 'north-delhi',
        nameEn: 'North Delhi',
        nameTa: 'வடக்கு தில்லி',
        nameHi: 'उत्तरी दिल्ली',
        headquarters: 'Alipur',
        constituenciesEn: ['North West Delhi', 'Rohini', 'Narela', 'Burari'],
        constituenciesTa: ['வடமேற்கு தில்லி', 'ரோஹிணி', 'நரேலா', 'புராரி'],
        constituenciesHi: ['उत्तर पश्चिम दिल्ली', 'रोहिणी', 'नरेला', 'बुराड़ी'],
      },
    ],
  },
  {
    id: 'maharashtra',
    nameEn: 'Maharashtra',
    nameTa: 'மகாராஷ்டிரா',
    nameHi: 'महाराष्ट्र',
    type: 'STATE',
    capital: 'Mumbai',
    parliamentaryConstituencies: [
      'Mumbai South', 'Mumbai South Central', 'Mumbai North Central', 'Mumbai North East', 'Mumbai North West', 'Mumbai North',
      'Thane', 'Kalyan', 'Palghar', 'Pune', 'Baramati', 'Nagpur', 'Nashik', 'Chhatrapati Sambhajinagar (Aurangabad)', 'Kolhapur'
    ],
    districts: [
      {
        id: 'mumbai-city',
        nameEn: 'Mumbai City',
        nameTa: 'மும்பை நகரம்',
        nameHi: 'मुंबई शहर',
        headquarters: 'Mumbai',
        constituenciesEn: ['Mumbai South', 'Mumbai South Central', 'Colaba', 'Byculla', 'Malabar Hill'],
        constituenciesTa: ['தெற்கு மும்பை', 'தென் மத்திய மும்பை', 'குலாபா', 'பைகுல்லா', 'மலபார் ஹில்'],
        constituenciesHi: ['मुंबई दक्षिण', 'मुंबई दक्षिण मध्य', 'कोलाबा', 'भायखला', 'मालाबार हिल'],
      },
      {
        id: 'mumbai-suburban',
        nameEn: 'Mumbai Suburban',
        nameTa: 'மும்பை புறநகர்',
        nameHi: 'मुंबई उपनगर',
        headquarters: 'Bandra',
        constituenciesEn: ['Mumbai North', 'Mumbai North West', 'Mumbai North East', 'Bandra', 'Andheri', 'Borivali'],
        constituenciesTa: ['வடக்கு மும்பை', 'பாந்த்ரா', 'அந்தேரி', 'போரிவலி'],
        constituenciesHi: ['मुंबई उत्तर', 'बांद्रा', 'अंधेरी', 'बोरीवली'],
      },
      {
        id: 'pune',
        nameEn: 'Pune',
        nameTa: 'புனே',
        nameHi: 'पुणे',
        headquarters: 'Pune',
        constituenciesEn: ['Pune', 'Baramati', 'Shirur', 'Maval', 'Kothrud', 'Shivajinagar'],
        constituenciesTa: ['புனே', 'பாராமதி', 'ஷிரூர்', 'மாவல்', 'கோத்ரூட்'],
        constituenciesHi: ['पुणे', 'बारामती', 'शिरूर', 'मावल', 'कोथरुड'],
      },
      {
        id: 'nagpur',
        nameEn: 'Nagpur',
        nameTa: 'நாக்பூர்',
        nameHi: 'नागपुर',
        headquarters: 'Nagpur',
        constituenciesEn: ['Nagpur', 'Ramtek', 'Nagpur South West', 'Nagpur Central'],
        constituenciesTa: ['நாக்பூர்', 'ராம்டெக்', 'நாக்பூர் மத்திய'],
        constituenciesHi: ['नागपुर', 'रामटेक', 'नागपुर दक्षिण पश्चिम', 'नागपुर मध्य'],
      },
    ],
  },
  {
    id: 'karnataka',
    nameEn: 'Karnataka',
    nameTa: 'கர்நாடகா',
    nameHi: 'कर्नाटक',
    type: 'STATE',
    capital: 'Bengaluru',
    parliamentaryConstituencies: [
      'Bangalore South', 'Bangalore North', 'Bangalore Central', 'Bangalore Rural', 'Mysore', 'Mangalore (Dakshina Kannada)',
      'Belgaum', 'Dharwad', 'Hubli-Dharwad', 'Shimoga', 'Tumkur', 'Gulbarga (Kalaburagi)'
    ],
    districts: [
      {
        id: 'bengaluru-urban',
        nameEn: 'Bengaluru Urban',
        nameTa: 'பெங்களூரு நகரம்',
        nameHi: 'बेंगलुरु शहरी',
        headquarters: 'Bengaluru',
        constituenciesEn: ['Bangalore South', 'Bangalore North', 'Bangalore Central', 'Jayanagar', 'Malleshwaram', 'Indiranagar', 'Whitefield'],
        constituenciesTa: ['தெற்கு பெங்களூரு', 'வடக்கு பெங்களூரு', 'ஜெயநகர்', 'மல்லேஸ்வரம்', 'இந்திரா நகர்'],
        constituenciesHi: ['बैंगलोर दक्षिण', 'बैंगलोर उत्तर', 'बैंगलोर मध्य', 'जयनगर', 'मल्लेश्वरम', 'इंदिरानगर'],
      },
      {
        id: 'mysuru',
        nameEn: 'Mysuru',
        nameTa: 'மைசூரு',
        nameHi: 'मैसूरु',
        headquarters: 'Mysuru',
        constituenciesEn: ['Mysore', 'Chamundeshwari', 'Krishnaraja', 'Varuna'],
        constituenciesTa: ['மைசூர்', 'சாமுண்டேஸ்வரி', 'கிருஷ்ணராஜா'],
        constituenciesHi: ['मैसूर', 'चामुंडेश्वरी', 'कृष्णराजा'],
      },
    ],
  },
  {
    id: 'uttar-pradesh',
    nameEn: 'Uttar Pradesh',
    nameTa: 'உத்தரப் பிரதேசம்',
    nameHi: 'उत्तर प्रदेश',
    type: 'STATE',
    capital: 'Lucknow',
    parliamentaryConstituencies: [
      'Varanasi', 'Lucknow', 'Gorakhpur', 'Kanpur', 'Agra', 'Prayagraj (Allahabad)', 'Noida (Gautam Buddha Nagar)',
      'Ghaziabad', 'Meerut', 'Bareilly', 'Aligarh', 'Moradabad', 'Ayodhya (Faizabad)', 'Amethi', 'Raebareli'
    ],
    districts: [
      {
        id: 'lucknow',
        nameEn: 'Lucknow',
        nameTa: 'லக்னோ',
        nameHi: 'लखनऊ',
        headquarters: 'Lucknow',
        constituenciesEn: ['Lucknow', 'Lucknow East', 'Lucknow Central', 'Lucknow West', 'Sarojini Nagar'],
        constituenciesTa: ['லக்னோ', 'லக்னோ கிழக்கு', 'லக்னோ மத்திய'],
        constituenciesHi: ['लखनऊ', 'लखनऊ पूर्व', 'लखनऊ मध्य', 'लखनऊ पश्चिम', 'सरोजिनी नगर'],
      },
      {
        id: 'varanasi',
        nameEn: 'Varanasi',
        nameTa: 'வாரணாசி',
        nameHi: 'वाराणसी',
        headquarters: 'Varanasi',
        constituenciesEn: ['Varanasi', 'Varanasi Cantt', 'Varanasi North', 'Varanasi South', 'Rohaniya'],
        constituenciesTa: ['வாரணாசி', 'வாரணாசி வடக்கு', 'வாரணாசி தெற்கு'],
        constituenciesHi: ['वाराणसी', 'वाराणसी कैंट', 'वाराणसी उत्तर', 'वाराणसी दक्षिण', 'रोहनिया'],
      },
      {
        id: 'gautam-buddha-nagar',
        nameEn: 'Gautam Buddha Nagar (Noida)',
        nameTa: 'நொய்டா',
        nameHi: 'गौतम बुद्ध नगर (नोएडा)',
        headquarters: 'Noida',
        constituenciesEn: ['Gautam Buddha Nagar', 'Noida', 'Dadri', 'Jewar'],
        constituenciesTa: ['நொய்டா', 'தாத்ரி', 'ஜேவர்'],
        constituenciesHi: ['गौतम बुद्ध नगर', 'नोएडा', 'दादरी', 'जेवर'],
      },
    ],
  },
  {
    id: 'telangana',
    nameEn: 'Telangana',
    nameTa: 'தெலங்கானா',
    nameHi: 'तेलंगाना',
    type: 'STATE',
    capital: 'Hyderabad',
    parliamentaryConstituencies: [
      'Hyderabad', 'Secunderabad', 'Chevella', 'Malkajgiri', 'Medak', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam'
    ],
    districts: [
      {
        id: 'hyderabad',
        nameEn: 'Hyderabad',
        nameTa: 'ஹைதராபாத்',
        nameHi: 'हैदराबाद',
        headquarters: 'Hyderabad',
        constituenciesEn: ['Hyderabad', 'Secunderabad', 'Charminar', 'Jubilee Hills', 'Khairatabad', 'Chandrayangutta'],
        constituenciesTa: ['ஹைதராபாத்', 'செகந்திராபாத்', 'சார்மினார்', 'ஜூப்ளி ஹில்ஸ்'],
        constituenciesHi: ['हैदराबाद', 'सिकंदराबाद', 'चारमीनार', 'जुबली हिल्स', 'खैराताबाद'],
      },
    ],
  },
  {
    id: 'gujarat',
    nameEn: 'Gujarat',
    nameTa: 'குஜராத்',
    nameHi: 'गुजरात',
    type: 'STATE',
    capital: 'Gandhinagar',
    parliamentaryConstituencies: [
      'Gandhinagar', 'Ahmedabad East', 'Ahmedabad West', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Kutch'
    ],
    districts: [
      {
        id: 'ahmedabad',
        nameEn: 'Ahmedabad',
        nameTa: 'அகமதாபாத்',
        nameHi: 'अहमदाबाद',
        headquarters: 'Ahmedabad',
        constituenciesEn: ['Ahmedabad East', 'Ahmedabad West', 'Ghatlodia', 'Ellis Bridge', 'Maninagar'],
        constituenciesTa: ['அகமதாபாத் கிழக்கு', 'அகமதாபாத் மேற்கு'],
        constituenciesHi: ['अहमदाबाद पूर्व', 'अहमदाबाद पश्चिम', 'घाटलोडिया', 'एलिस ब्रिज'],
      },
      {
        id: 'gandhinagar',
        nameEn: 'Gandhinagar',
        nameTa: 'காந்திநகர்',
        nameHi: 'गांधीनगर',
        headquarters: 'Gandhinagar',
        constituenciesEn: ['Gandhinagar', 'Gandhinagar North', 'Gandhinagar South'],
        constituenciesTa: ['காந்திநகர்', 'காந்திநகர் வடக்கு'],
        constituenciesHi: ['गांधीनगर', 'गांधीनगर उत्तर', 'गांधीनगर दक्षिण'],
      },
    ],
  },
  {
    id: 'west-bengal',
    nameEn: 'West Bengal',
    nameTa: 'மேற்கு வங்காளம்',
    nameHi: 'पश्चिम बंगाल',
    type: 'STATE',
    capital: 'Kolkata',
    parliamentaryConstituencies: [
      'Kolkata North', 'Kolkata South', 'Howrah', 'Dum Dum', 'Barasat', 'Jadavpur', 'Darjeeling', 'Asansol', 'Siliguri'
    ],
    districts: [
      {
        id: 'kolkata',
        nameEn: 'Kolkata',
        nameTa: 'கொல்கத்தா',
        nameHi: 'कोलकाता',
        headquarters: 'Kolkata',
        constituenciesEn: ['Kolkata North', 'Kolkata South', 'Bhowanipore', 'Jorasanko', 'Shyampukur'],
        constituenciesTa: ['வட கொல்கத்தா', 'தென் கொல்கத்தா', 'பவானிபூர்'],
        constituenciesHi: ['कोलकाता उत्तर', 'कोलकाता दक्षिण', 'भवानीपुर'],
      },
    ],
  },
  {
    id: 'kerala',
    nameEn: 'Kerala',
    nameTa: 'கேரளா',
    nameHi: 'केरल',
    type: 'STATE',
    capital: 'Thiruvananthapuram',
    parliamentaryConstituencies: [
      'Thiruvananthapuram', 'Ernakulam (Kochi)', 'Kozhikode', 'Wayanad', 'Thrissur', 'Palakkad', 'Alappuzha', 'Kollam', 'Kannur'
    ],
    districts: [
      {
        id: 'thiruvananthapuram',
        nameEn: 'Thiruvananthapuram',
        nameTa: 'திருவனந்தபுரம்',
        nameHi: 'तिरुवनंतपुरम',
        headquarters: 'Thiruvananthapuram',
        constituenciesEn: ['Thiruvananthapuram', 'Attingal', 'Nemom', 'Kazhakoottam'],
        constituenciesTa: ['திருவனந்தபுரம்', 'ஆற்றிங்கல்'],
        constituenciesHi: ['तिरुवनंतपुरम', 'अट्टिंगल', 'नेमोम'],
      },
      {
        id: 'ernakulam',
        nameEn: 'Ernakulam (Kochi)',
        nameTa: 'எர்ணாகுளம் (கொச்சி)',
        nameHi: 'एर्नाकुलम (कोच्चि)',
        headquarters: 'Kochi',
        constituenciesEn: ['Ernakulam', 'Chalakudy', 'Thrikkakara', 'Kochi'],
        constituenciesTa: ['எர்ணாகுளம்', 'கொச்சி'],
        constituenciesHi: ['एर्नाकुलम', 'कोच्चि'],
      },
    ],
  },
  {
    id: 'andhra-pradesh',
    nameEn: 'Andhra Pradesh',
    nameTa: 'ஆந்திரப் பிரதேசம்',
    nameHi: 'आंध्र प्रदेश',
    type: 'STATE',
    capital: 'Amaravati',
    parliamentaryConstituencies: [
      'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kurnool', 'Nellore', 'Rajahmundry', 'Kakinada', 'Anantapur'
    ],
    districts: [
      {
        id: 'visakhapatnam',
        nameEn: 'Visakhapatnam',
        nameTa: 'விசாகப்பட்டினம்',
        nameHi: 'विशाखापट्टनम',
        headquarters: 'Visakhapatnam',
        constituenciesEn: ['Visakhapatnam', 'Anakapalle', 'Gajuwaka', 'Bheemili'],
        constituenciesTa: ['விசாகப்பட்டினம்', 'அனகாபள்ளி'],
        constituenciesHi: ['विशाखापट्टनम', 'अनकापल्ली'],
      },
    ],
  },
  {
    id: 'rajasthan',
    nameEn: 'Rajasthan',
    nameTa: 'ராஜஸ்தான்',
    nameHi: 'राजस्थान',
    type: 'STATE',
    capital: 'Jaipur',
    parliamentaryConstituencies: [
      'Jaipur', 'Jaipur Rural', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Barmer'
    ],
    districts: [
      {
        id: 'jaipur',
        nameEn: 'Jaipur',
        nameTa: 'ஜெய்ப்பூர்',
        nameHi: 'जयपुर',
        headquarters: 'Jaipur',
        constituenciesEn: ['Jaipur', 'Jaipur Rural', 'Civil Lines', 'Malviya Nagar', 'Sanganer'],
        constituenciesTa: ['ஜெய்ப்பூர்', 'மால்வியா நகர்'],
        constituenciesHi: ['जयपुर', 'जयपुर ग्रामीण', 'सिविल लाइन्स', 'मालवीय नगर'],
      },
    ],
  },
  {
    id: 'bihar',
    nameEn: 'Bihar',
    nameTa: 'பீகார்',
    nameHi: 'बिहार',
    type: 'STATE',
    capital: 'Patna',
    parliamentaryConstituencies: [
      'Patna Sahib', 'Pataliputra', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Nalanda', 'Purnia'
    ],
    districts: [
      {
        id: 'patna',
        nameEn: 'Patna',
        nameTa: 'பாட்னா',
        nameHi: 'पटना',
        headquarters: 'Patna',
        constituenciesEn: ['Patna Sahib', 'Pataliputra', 'Bankipur', 'Danapur'],
        constituenciesTa: ['பாட்னா சாகிப்', 'பாடலிபுத்ரா'],
        constituenciesHi: ['पटना साहिब', 'पाटलिपुत्र', 'बांकीपुर', 'दानापुर'],
      },
    ],
  },
  {
    id: 'punjab',
    nameEn: 'Punjab',
    nameTa: 'பஞ்சாப்',
    nameHi: 'पंजाब',
    type: 'STATE',
    capital: 'Chandigarh',
    parliamentaryConstituencies: ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda', 'Gurdaspur'],
    districts: [
      {
        id: 'amritsar',
        nameEn: 'Amritsar',
        nameTa: 'அமிர்தசரஸ்',
        nameHi: 'अमृतसर',
        headquarters: 'Amritsar',
        constituenciesEn: ['Amritsar', 'Amritsar Central', 'Amritsar East'],
        constituenciesTa: ['அமிர்தசரஸ்'],
        constituenciesHi: ['अमृतसर', 'अमृतसर मध्य'],
      },
    ],
  },
  {
    id: 'haryana',
    nameEn: 'Haryana',
    nameTa: 'ஹரியானா',
    nameHi: 'हरियाणा',
    type: 'STATE',
    capital: 'Chandigarh',
    parliamentaryConstituencies: ['Gurugram', 'Faridabad', 'Ambala', 'Karnal', 'Rohtak', 'Hisar', 'Sonipat'],
    districts: [
      {
        id: 'gurugram',
        nameEn: 'Gurugram (Gurgaon)',
        nameTa: 'குருகிராம்',
        nameHi: 'गुरुग्राम',
        headquarters: 'Gurugram',
        constituenciesEn: ['Gurugram', 'Badshahpur', 'Pataudi'],
        constituenciesTa: ['குருகிராம்'],
        constituenciesHi: ['गुरुग्राम', 'बादशाहपुर'],
      },
    ],
  },
  {
    id: 'madhya-pradesh',
    nameEn: 'Madhya Pradesh',
    nameTa: 'மத்தியப் பிரதேசம்',
    nameHi: 'मध्य प्रदेश',
    type: 'STATE',
    capital: 'Bhopal',
    parliamentaryConstituencies: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Rewa'],
    districts: [
      {
        id: 'bhopal',
        nameEn: 'Bhopal',
        nameTa: 'போபால்',
        nameHi: 'भोपाल',
        headquarters: 'Bhopal',
        constituenciesEn: ['Bhopal', 'Govindpura', 'Huzur'],
        constituenciesTa: ['போபால்'],
        constituenciesHi: ['भोपाल', 'गोविंदपुरा'],
      },
      {
        id: 'indore',
        nameEn: 'Indore',
        nameTa: 'இந்தூர்',
        nameHi: 'इंदौर',
        headquarters: 'Indore',
        constituenciesEn: ['Indore', 'Rau', 'Sanwer'],
        constituenciesTa: ['இந்தூர்'],
        constituenciesHi: ['इंदौर', 'राऊ'],
      },
    ],
  },
  {
    id: 'odisha',
    nameEn: 'Odisha',
    nameTa: 'ஒடிசா',
    nameHi: 'ओडिशा',
    type: 'STATE',
    capital: 'Bhubaneswar',
    parliamentaryConstituencies: ['Bhubaneswar', 'Cuttack', 'Puri', 'Sambalpur', 'Rourkela (Sundargarh)', 'Berhampur'],
    districts: [
      {
        id: 'khordha',
        nameEn: 'Bhubaneswar (Khordha)',
        nameTa: 'புவனேஸ்வர்',
        nameHi: 'भुवनेश्वर (खोरधा)',
        headquarters: 'Bhubaneswar',
        constituenciesEn: ['Bhubaneswar', 'Ekamra-Bhubaneswar', 'Jatni'],
        constituenciesTa: ['புவனேஸ்வர்'],
        constituenciesHi: ['भुवनेश्वर'],
      },
    ],
  },
  {
    id: 'assam',
    nameEn: 'Assam',
    nameTa: 'அசாம்',
    nameHi: 'असम',
    type: 'STATE',
    capital: 'Dispur',
    parliamentaryConstituencies: ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Tezpur', 'Nagaon'],
    districts: [
      {
        id: 'kamrup-metropolitan',
        nameEn: 'Guwahati (Kamrup Metro)',
        nameTa: 'குவஹாத்தி',
        nameHi: 'गुवाहाटी (कामरूप)',
        headquarters: 'Guwahati',
        constituenciesEn: ['Guwahati', 'Dispur', 'Gauhati East', 'Gauhati West'],
        constituenciesTa: ['குவஹாத்தி', 'திஸ்பூர்'],
        constituenciesHi: ['गुवाहाटी', 'दिसपुर'],
      },
    ],
  },
  {
    id: 'jammu-kashmir',
    nameEn: 'Jammu & Kashmir',
    nameTa: 'ஜம்மு & காஷ்மீர்',
    nameHi: 'जम्मू और कश्मीर',
    type: 'UT',
    capital: 'Srinagar / Jammu',
    parliamentaryConstituencies: ['Srinagar', 'Jammu', 'Baramulla', 'Anantnag-Rajouri', 'Udhampur'],
    districts: [
      {
        id: 'srinagar',
        nameEn: 'Srinagar',
        nameTa: 'ஸ்ரீநகர்',
        nameHi: 'श्रीनगर',
        headquarters: 'Srinagar',
        constituenciesEn: ['Srinagar', 'Lal Chowk', 'Hazratbal'],
        constituenciesTa: ['ஸ்ரீநகர்'],
        constituenciesHi: ['श्रीनगर', 'लाल चौक'],
      },
      {
        id: 'jammu',
        nameEn: 'Jammu',
        nameTa: 'ஜம்மு',
        nameHi: 'जम्मू',
        headquarters: 'Jammu',
        constituenciesEn: ['Jammu', 'Gandhi Nagar', 'Jammu West'],
        constituenciesTa: ['ஜம்மு'],
        constituenciesHi: ['जम्मू', 'गांधी नगर'],
      },
    ],
  },
  {
    id: 'chandigarh',
    nameEn: 'Chandigarh',
    nameTa: 'சண்டிகர்',
    nameHi: 'चंडीगढ़',
    type: 'UT',
    capital: 'Chandigarh',
    parliamentaryConstituencies: ['Chandigarh'],
    districts: [
      {
        id: 'chandigarh',
        nameEn: 'Chandigarh',
        nameTa: 'சண்டிகர்',
        nameHi: 'चंडीगढ़',
        headquarters: 'Chandigarh',
        constituenciesEn: ['Chandigarh', 'Sector 17', 'Manimajra'],
        constituenciesTa: ['சண்டிகர்'],
        constituenciesHi: ['चंडीगढ़'],
      },
    ],
  },
  {
    id: 'puducherry',
    nameEn: 'Puducherry',
    nameTa: 'புதுச்சேரி',
    nameHi: 'पुडुचेरी',
    type: 'UT',
    capital: 'Puducherry',
    parliamentaryConstituencies: ['Puducherry'],
    districts: [
      {
        id: 'puducherry',
        nameEn: 'Puducherry',
        nameTa: 'புதுச்சேரி',
        nameHi: 'पुडुचेरी',
        headquarters: 'Puducherry',
        constituenciesEn: ['Puducherry', 'Ozhukarai', 'Villianur'],
        constituenciesTa: ['புதுச்சேரி', 'உழவர்கரை'],
        constituenciesHi: ['पुडुचेरी'],
      },
    ],
  },
];

// Helper functions
export function getAllStates() {
  return INDIAN_STATES_AND_UTS;
}

export function getStateById(stateId: string) {
  return INDIAN_STATES_AND_UTS.find(s => s.id === stateId || s.nameEn.toLowerCase() === stateId.toLowerCase());
}

export function getDistrictsByState(stateId: string) {
  const state = getStateById(stateId);
  return state ? state.districts : [];
}

export function getConstituenciesByState(stateId: string) {
  const state = getStateById(stateId);
  return state ? state.parliamentaryConstituencies : [];
}

// Backward compatibility alias
export const TAMIL_NADU_DISTRICTS = INDIAN_STATES_AND_UTS.find(s => s.id === 'tamil-nadu')?.districts || [];
