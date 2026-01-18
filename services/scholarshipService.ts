import { Scholarship } from '../types';

// --- 1. THE DATABASE (Converted from your Python file) ---
const SCHOLARSHIPS_DB: Scholarship[] = [
  // 1. GENERAL (SC/ST/BC/Minority/Kapu)
  {
    id: '1',
    name: "Jagananna Vidya Deevena (RTF)",
    provider: "Andhra Pradesh Govt",
    category: "All (SC/ST/BC/Kapu/Minority)",
    amount: "Full Fee Reimbursement",
    deadline: "Open",
    description: "Full fee reimbursement for ITI, Polytechnic, Degree, B.Tech, MBA, MCA. Credited directly to mother's account.",
    eligibility: ["Income < ₹2.5L", "75% Attendance"],
    applicationLink: "https://jnanabhumi.ap.gov.in/",
    tags: ["fee", "reimbursement", "btech", "degree", "engineering", "mba", "mca", "polytechnic", "general", "all"]
  },
  {
    id: '2',
    name: "Jagananna Vasathi Deevena (MTF)",
    provider: "Andhra Pradesh Govt",
    category: "All (SC/ST/BC/Kapu/Minority)",
    amount: "₹10,000 - ₹20,000 / year",
    deadline: "Open",
    description: "Financial aid for food & hostel expenses. ITI: ₹10K, Polytechnic: ₹15K, Degree/Engg: ₹20K.",
    eligibility: ["Income < ₹2.5L"],
    applicationLink: "https://jnanabhumi.ap.gov.in/",
    tags: ["hostel", "food", "mess", "boarding", "lodging", "stay", "general", "all"]
  },
  {
    id: '3',
    name: "Ambedkar Overseas Vidya Nidhi",
    provider: "Andhra Pradesh Govt",
    category: "SC/ST",
    amount: "Up to ₹15 Lakhs",
    deadline: "September / February",
    description: "Financial assistance for SC/ST students pursuing higher studies (Masters/PhD) abroad.",
    eligibility: ["Income < ₹6L", "Valid Passport"],
    applicationLink: "https://jnanabhumi.ap.gov.in/",
    tags: ["abroad", "foreign", "masters", "phd", "ms", "overseas", "sc", "st"]
  },
  {
    id: '4',
    name: "NSP Post Matric Scholarship",
    provider: "Central Govt",
    category: "Minority",
    amount: "Variable",
    deadline: "October",
    description: "Central scholarship for Minority community students from Class 11 to Ph.D.",
    eligibility: ["Income < ₹2L", "50% Marks"],
    applicationLink: "https://scholarships.gov.in/",
    tags: ["muslim", "christian", "sikh", "minority", "jain", "central"]
  },

  // 2. BRAHMIN WELFARE
  {
    id: '101',
    name: "Bharati Scheme - Graduation",
    provider: "AP Brahmin Corp",
    category: "Brahmin",
    amount: "Financial Aid",
    deadline: "Open",
    description: "Financial assistance for Brahmin students pursuing any regular 3-year graduation course (BA, BCom, BSc).",
    eligibility: ["Income < ₹3L", "EWS"],
    applicationLink: "https://apadapter.ap.gov.in/",
    tags: ["degree", "b.a", "b.com", "b.sc", "brahmin", "upper caste"]
  },
  {
    id: '102',
    name: "Bharati Scheme - Post-Graduation",
    provider: "AP Brahmin Corp",
    category: "Brahmin",
    amount: "Financial Aid",
    deadline: "Open",
    description: "Support for Brahmin students pursuing 2-year+ PG courses like M.Sc, M.Com, M.Tech, MBA.",
    eligibility: ["Income < ₹3L"],
    applicationLink: "https://apadapter.ap.gov.in/",
    tags: ["pg", "masters", "mba", "mca", "mtech", "brahmin"]
  },
  {
    id: '103',
    name: "Bharati Scheme - Professional",
    provider: "AP Brahmin Corp",
    category: "Brahmin",
    amount: "Financial Aid",
    deadline: "Open",
    description: "Financial assistance for Brahmin students pursuing professional courses like B.Tech, Medicine, Pharmacy.",
    eligibility: ["Income < ₹3L"],
    applicationLink: "https://apadapter.ap.gov.in/",
    tags: ["professional", "medicine", "engineering", "btech", "pharmacy", "brahmin"]
  },
  {
    id: '104',
    name: "Bharati Scheme - Intermediate/ITI",
    provider: "AP Brahmin Corp",
    category: "Brahmin",
    amount: "Financial Aid",
    deadline: "Open",
    description: "Financial assistance for eligible poor Brahmin students pursuing Intermediate, ITI, or Polytechnic.",
    eligibility: ["Income < ₹3L"],
    applicationLink: "https://apadapter.ap.gov.in/",
    tags: ["inter", "intermediate", "diploma", "iti", "polytechnic", "brahmin"]
  },
  {
    id: '105',
    name: "Bharati Overseas Scheme",
    provider: "AP Brahmin Corp",
    category: "Brahmin",
    amount: "Up to ₹20 Lakhs",
    deadline: "Variable",
    description: "Financial aid for Brahmin students who secured admission for a Master's degree abroad.",
    eligibility: ["Income < ₹6L"],
    applicationLink: "https://apadapter.ap.gov.in/",
    tags: ["abroad", "foreign", "masters", "ms", "brahmin"]
  },
  {
    id: '106',
    name: "Veda Vyasa Scheme",
    provider: "AP Brahmin Corp",
    category: "Brahmin",
    amount: "Annual Assistance",
    deadline: "Open",
    description: "Annual financial assistance to encourage Vedic Education.",
    eligibility: ["Vedic Student", "Income < ₹3L"],
    applicationLink: "https://apadapter.ap.gov.in/",
    tags: ["veda", "vedic", "archaka", "purohit", "brahmin", "priest"]
  },
  {
    id: '107',
    name: "Gayathri Awards",
    provider: "AP Brahmin Corp",
    category: "Brahmin",
    amount: "Merit Award",
    deadline: "After Results",
    description: "Awards for toppers in SSC, Intermediate, Graduation, or Professional courses.",
    eligibility: ["Merit Rank", "Income < ₹3L"],
    applicationLink: "https://apadapter.ap.gov.in/",
    tags: ["topper", "merit", "rank", "award", "brahmin"]
  },
  {
    id: '108',
    name: "Bharati Scheme (CA)",
    provider: "AP Brahmin Corp",
    category: "Brahmin",
    amount: "Financial Aid",
    deadline: "Open",
    description: "Financial assistance for Brahmin students pursuing CA Intern and Final.",
    eligibility: ["Income < ₹3L"],
    applicationLink: "https://apadapter.ap.gov.in/",
    tags: ["ca", "chartered accountant", "ipcc", "brahmin"]
  },
  {
    id: '109',
    name: "Bharati School Education",
    provider: "AP Brahmin Corp",
    category: "Brahmin",
    amount: "Financial Aid",
    deadline: "June/July",
    description: "Financial assistance for Brahmin students in Class 1 to Class 10.",
    eligibility: ["Income < ₹3L"],
    applicationLink: "https://apadapter.ap.gov.in/",
    tags: ["school", "class 1", "class 10", "child", "brahmin"]
  },

  // 3. WORKERS & DISABLED
  {
    id: '201',
    name: "BOC Workers Children Scholarship",
    provider: "Labour Dept",
    category: "Construction Workers",
    amount: "Variable",
    deadline: "Open",
    description: "Scholarships for children of registered Building & Other Construction workers.",
    eligibility: ["Parent Registered with BOC", "Income < ₹3L"],
    applicationLink: "https://labour.ap.gov.in/",
    tags: ["labour", "worker", "construction", "mason", "daily wage"]
  },
  {
    id: '301',
    name: "Sanction of Laptops",
    provider: "Dept for Differently Abled",
    category: "Differently Abled",
    amount: "Free Laptop",
    deadline: "Open",
    description: "Distribution of laptops to visually, hearing, speech, and orthopedically challenged students in professional courses.",
    eligibility: ["Professional Course", "Income < ₹3L"],
    applicationLink: "https://apte.ap.gov.in/",
    tags: ["laptop", "computer", "disabled", "handicapped", "blind", "deaf"]
  },
  {
    id: '302',
    name: "Motorized Three Wheelers",
    provider: "Dept for Differently Abled",
    category: "Differently Abled",
    amount: "Free Vehicle",
    deadline: "Open",
    description: "Provision of motorized three-wheelers to eligible orthopedically challenged persons for mobility.",
    eligibility: ["Orthopedic Disability", "Income < ₹3L"],
    applicationLink: "https://apte.ap.gov.in/",
    tags: ["vehicle", "scooter", "bike", "disabled", "handicapped", "mobility"]
  },
  {
    id: '303',
    name: "Daisy Players",
    provider: "Dept for Differently Abled",
    category: "Differently Abled",
    amount: "Free Audio Player",
    deadline: "Open",
    description: "Distribution of Daisy Players (Audio Books) to visually challenged students from 9th Class to Degree.",
    eligibility: ["Visually Challenged", "Income < ₹3L"],
    applicationLink: "https://apte.ap.gov.in/",
    tags: ["blind", "audio", "player", "daisy", "disabled", "visually challenged"]
  }
];

// --- 2. THE LOCAL BRAIN (Search Logic) ---
export const scholarshipService = {
  
  // This function replaces Google AI. It runs instantly on the user's laptop.
  searchScholarships: async (query: string): Promise<Scholarship[]> => {
    // 1. Simulate "Thinking" time (0.8 seconds) to feel like AI
    await new Promise(resolve => setTimeout(resolve, 800));

    const lowerQuery = query.toLowerCase();
    
    // 2. Filter Logic
    return SCHOLARSHIPS_DB.filter(scholarship => {
      // A. Direct Category Match (e.g., user types "SC")
      if (scholarship.category.toLowerCase().includes(lowerQuery)) return true;
      
      // B. Name Match (e.g., user types "Jagananna")
      if (scholarship.name.toLowerCase().includes(lowerQuery)) return true;
      
      // C. Tag Match (e.g., user types "BTech" -> matches "engineering" tag)
      if (scholarship.tags && scholarship.tags.some(tag => lowerQuery.includes(tag))) return true;
      
      // D. "General" Logic: If user asks for general schemes, give them the "All" category
      if (lowerQuery.includes('general') || lowerQuery.includes('all')) {
        if (scholarship.category.includes('All')) return true;
      }

      return false;
    });
  },

  getAllScholarships: async (): Promise<Scholarship[]> => {
    return SCHOLARSHIPS_DB;
  }
};
