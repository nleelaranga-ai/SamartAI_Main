// services/scholarshipService.ts
import { Scholarship } from '../types';

const MOCK_SCHOLARSHIPS: Scholarship[] = [
  {
    id: 's001',
    name: 'National Scholarship for SC/ST Students',
    category: 'SC/ST',
    incomeLimit: 250000, // ₹2.5 Lakhs
    description: 'This scholarship aims to provide financial assistance to Scheduled Caste and Scheduled Tribe students pursuing higher education.',
    applyLink: 'https://scholarships.gov.in/scheme/1234',
    eligibilityCriteria: ['Must belong to SC/ST category', 'Family income below ₹2.5 Lakhs per annum', 'Minimum 60% marks in previous examination'],
    documentsRequired: ['Caste Certificate', 'Income Certificate', 'Academic Marksheets'],
    deadline: '2024-10-31',
  },
  {
    id: 's002',
    name: 'Post Matric Scholarship for Minorities',
    category: 'Minority',
    incomeLimit: 200000, // ₹2 Lakhs
    description: 'Financial support for minority students (Muslims, Sikhs, Christians, Buddhists, Zoroastrians and Jains) for post-matriculation studies.',
    applyLink: 'https://scholarships.gov.in/scheme/2345',
    eligibilityCriteria: ['Must belong to a notified minority community', 'Family income below ₹2 Lakhs per annum', 'Minimum 50% marks in previous examination'],
    documentsRequired: ['Minority Certificate', 'Income Certificate', 'Academic Marksheets'],
    deadline: '2024-11-15',
  },
  {
    id: 's003',
    name: 'Prime Minister’s Scholarship Scheme for RPF/RPSF',
    category: 'General',
    incomeLimit: 600000, // ₹6 Lakhs (higher for this specific scheme)
    description: 'Scholarship for dependent wards of Ex/Serving RPF/RPSF personnel pursuing higher professional courses.',
    applyLink: 'https://scholarships.gov.in/scheme/3456',
    eligibilityCriteria: ['Wards of RPF/RPSF personnel', 'Minimum 60% in 10+2/Diploma/Graduation', 'Professional courses only'],
    documentsRequired: ['Service Certificate', 'Academic Marksheets'],
    deadline: '2024-09-30',
  },
  {
    id: 's004',
    name: 'Pre-Matric Scholarship for OBC Students',
    category: 'OBC',
    incomeLimit: 150000, // ₹1.5 Lakhs
    description: 'A scholarship scheme for Other Backward Classes students studying in classes I to X.',
    applyLink: 'https://socialjustice.nic.in/scheme/pre_matric_obc',
    eligibilityCriteria: ['Must belong to OBC category', 'Family income below ₹1.5 Lakhs per annum'],
    documentsRequired: ['Caste Certificate', 'Income Certificate'],
    deadline: '2024-10-20',
  },
  {
    id: 's005',
    name: 'Chief Minister’s Scholarship for Meritorious Students (State-specific, e.g., Andhra Pradesh)',
    category: 'General', // Can be general or specific based on state rules
    incomeLimit: 300000, // ₹3 Lakhs
    description: 'A state-level scholarship for meritorious students from Andhra Pradesh pursuing undergraduate courses.',
    applyLink: 'https://ap.gov.in/scholarship',
    eligibilityCriteria: ['Resident of Andhra Pradesh', 'Minimum 80% marks in 10+2', 'Family income below ₹3 Lakhs per annum', 'Pursuing undergraduate degree'],
    documentsRequired: ['Domicile Certificate', 'Academic Marksheets'],
    deadline: '2024-11-01',
  },
  {
    id: 's006',
    name: 'Scholarship for Students with Disabilities',
    category: 'Disabled',
    incomeLimit: 250000, // ₹2.5 Lakhs
    description: 'Financial assistance for students with disabilities to pursue technical and professional education.',
    applyLink: 'https://disabilityaffairs.gov.in/content/page/scholarships.php',
    eligibilityCriteria: ['Must have a disability certificate (40% or more disability)', 'Family income below ₹2.5 Lakhs per annum', 'Enrolled in a technical/professional course'],
    documentsRequired: ['Disability Certificate', 'Income Certificate', 'Admission Proof'],
    deadline: '2024-10-25',
  },
  {
    id: 's007',
    name: 'National Means Cum Merit Scholarship Scheme (NMMSS)',
    category: 'EWS', // Economically Weaker Section
    incomeLimit: 350000, // ₹3.5 Lakhs
    description: 'Provides scholarships to meritorious students from economically weaker sections to arrest their dropout at Class VIII and encourage them to continue study at secondary stage.',
    applyLink: 'https://scholarships.gov.in/scheme/nmms',
    eligibilityCriteria: ['Students studying in Class IX to XII', 'Family income below ₹3.5 Lakhs per annum', 'Must have cleared NMMS examination'],
    documentsRequired: ['Income Certificate', 'NMMS Result'],
    deadline: '2024-12-05',
  },
  {
    id: 's008',
    name: 'Inspire Scholarship (SHE)',
    category: 'Merit',
    incomeLimit: 800000, // No income limit for meritorious usually
    description: 'Scholarship for Higher Education (SHE) component of INSPIRE (Innovation in Science Pursuit for Inspired Research) scheme to attract talented youth into Science Studies.',
    applyLink: 'https://online-inspire.gov.in/',
    eligibilityCriteria: ['Top 1% in Class 12th board exams', 'Enrolled in B.Sc./B.S./Int. M.Sc./Int. M.S. courses in basic & natural sciences'],
    documentsRequired: ['Class 12 Marksheet', 'Admission Proof'],
    deadline: '2024-09-15',
  },
  {
    id: 's009',
    name: 'Central Sector Scheme of Scholarship for College and University Students',
    category: 'Merit-cum-Means',
    incomeLimit: 450000, // ₹4.5 Lakhs
    description: 'Awarded to meritorious students for pursuing higher studies in colleges and universities.',
    applyLink: 'https://scholarships.gov.in/scheme/css',
    eligibilityCriteria: ['Above 80th percentile of successful candidates in 10+2', 'Family income below ₹4.5 Lakhs per annum', 'Pursuing regular courses'],
    documentsRequired: ['Academic Marksheets', 'Income Certificate'],
    deadline: '2024-10-10',
  },
  {
    id: 's010',
    name: 'National Scholarship for Single Girl Child',
    category: 'Girls',
    incomeLimit: 0, // Not based on income, typically merit-based
    description: 'A scheme to support higher education for single girl children.',
    applyLink: 'https://www.ugc.ac.in/sgc',
    eligibilityCriteria: ['Must be a single girl child in the family', 'Admitted to first year of PG courses', 'Age limit applies'],
    documentsRequired: ['Affidavit for Single Girl Child', 'Admission Proof'],
    deadline: '2024-11-20',
  },
];

interface SearchOptions {
  query?: string;
  category?: string;
  incomeLimit?: number;
  studyField?: string;
  location?: string;
  gender?: string;
  educationLevel?: string;
}

export const scholarshipService = {
  /**
   * Simulates fetching and filtering scholarships.
   * @param options Criteria to filter scholarships.
   * @returns A promise resolving to an array of matching scholarships.
   */
  async searchScholarships(options: SearchOptions): Promise<Scholarship[]> {
    console.log("Searching scholarships with options:", options);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let results = [...MOCK_SCHOLARSHIPS];

    if (options.query) {
      const lowerQuery = options.query.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(lowerQuery) ||
          s.description.toLowerCase().includes(lowerQuery) ||
          s.category.toLowerCase().includes(lowerQuery) ||
          s.eligibilityCriteria?.some(c => c.toLowerCase().includes(lowerQuery))
      );
    }

    if (options.category) {
      const lowerCategory = options.category.toLowerCase();
      results = results.filter((s) => s.category.toLowerCase() === lowerCategory);
    }

    if (options.incomeLimit !== undefined && options.incomeLimit > 0) {
      results = results.filter((s) => s.incomeLimit === 0 || s.incomeLimit >= options.incomeLimit);
    }

    // Add more filtering logic for studyField, location, gender, educationLevel if needed
    // For now, these are illustrative and mostly covered by 'query' based filtering

    // Simple keyword matching for study field
    if (options.studyField) {
      const lowerStudyField = options.studyField.toLowerCase();
      results = results.filter(s =>
        s.name.toLowerCase().includes(lowerStudyField) ||
        s.description.toLowerCase().includes(lowerStudyField) ||
        s.eligibilityCriteria?.some(c => c.toLowerCase().includes(lowerStudyField))
      );
    }

    // Simple keyword matching for gender
    if (options.gender) {
      const lowerGender = options.gender.toLowerCase();
      results = results.filter(s =>
        s.name.toLowerCase().includes(lowerGender) ||
        s.description.toLowerCase().includes(lowerGender) ||
        s.eligibilityCriteria?.some(c => c.toLowerCase().includes(lowerGender))
      );
    }

    // Prioritize exact matches or more relevant ones if any advanced scoring was implemented
    // For mock, we'll just return the filtered list
    return results;
  },

  async getAllScholarships(): Promise<Scholarship[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [...MOCK_SCHOLARSHIPS];
  },
};
