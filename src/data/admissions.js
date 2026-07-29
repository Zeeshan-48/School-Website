export const ADMISSION_STEPS = [
  {
    step: "01",
    title: "Online Registration & Form Submission",
    desc: "Fill out the online admission inquiry form or visit the school admissions desk to purchase the prospectus."
  },
  {
    step: "02",
    title: "Interaction / Aptitude Assessment",
    desc: "Child interaction for Pre-Primary; informal aptitude assessment in English, Math & Science for Grades 1 to 11."
  },
  {
    step: "03",
    title: "Document Verification & Approval",
    desc: "Submit birth certificate, previous school report card, transfer certificate (TC), and parent ID proofs."
  },
  {
    step: "04",
    title: "Fee Payment & Seat Confirmation",
    desc: "Pay the admission fee to confirm your child's enrollment for the upcoming 2026-27 academic session."
  }
];

export const FEE_STRUCTURE = [
  {
    grade: "Pre-Primary (Nursery - UKG)",
    tuitionFeePerTerm: 18500,
    annualCharges: 12000,
    developmentFee: 5000,
    termsPerYear: 4
  },
  {
    grade: "Primary (Grades 1 - 5)",
    tuitionFeePerTerm: 22000,
    annualCharges: 14000,
    developmentFee: 6000,
    termsPerYear: 4
  },
  {
    grade: "Secondary (Grades 6 - 10)",
    tuitionFeePerTerm: 26500,
    annualCharges: 16000,
    developmentFee: 7000,
    termsPerYear: 4
  },
  {
    grade: "Senior Secondary (Grades 11 & 12)",
    tuitionFeePerTerm: 32000,
    annualCharges: 18000,
    developmentFee: 8500,
    termsPerYear: 4
  }
];

export const ELIGIBILITY_CRITERIA = [
  { grade: "Nursery", ageRule: "3+ Years as of 31st March 2026", docs: "Birth Certificate, Passport Photos, Immunization Record" },
  { grade: "LKG & UKG", ageRule: "4+ & 5+ Years as of 31st March 2026", docs: "Birth Certificate, Previous School Progress Card" },
  { grade: "Grades 1 to 5", ageRule: "6+ Years for Grade 1 onwards", docs: "Report Card, Transfer Certificate (TC), Aadhaar Card" },
  { grade: "Grades 6 to 10", ageRule: "Based on previous passed grade", docs: "Original TC counter-signed by CBSE/Board, Report Card" },
  { grade: "Grade 11 (Streams)", ageRule: "Class 10 Board Passed", docs: "Class 10 Board Marksheet, Migration Cert, TC" }
];

export const ADMISSION_FAQS = [
  {
    q: "When do admissions open for the 2026-27 session?",
    a: "Admissions for the 2026-27 academic year are open from October 2025 onwards. Early registrations are encouraged due to limited seat availability per grade."
  },
  {
    q: "Is there an entrance exam for admission?",
    a: "For Pre-Primary, there are no formal exams—only an informal child interaction. For Grades 1-11, an age-appropriate aptitude evaluation in English, Science, and Math is conducted."
  },
  {
    q: "Does the school provide transport for all routes?",
    a: "Yes, our air-conditioned AC bus fleet covers 45+ major routes with real-time GPS tracking and trained female bus attendants."
  },
  {
    q: "What is the teacher-student ratio at Apex International?",
    a: "We maintain an ideal 1:15 ratio in Pre-Primary and 1:25 in Primary/Secondary wings to ensure personalized attention."
  },
  {
    q: "Can the fee be paid in installments?",
    a: "Yes, tuition fees are payable in 4 quarterly installments throughout the academic year."
  }
];
