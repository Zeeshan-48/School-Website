import { IMAGES } from '../utils/images';

export const FACULTY_DEPARTMENTS = [
  { id: 'all', name: 'All Faculty' },
  { id: 'leadership', name: 'Leadership & Administration' },
  { id: 'stem', name: 'Science & STEM' },
  { id: 'humanities', name: 'Languages & Humanities' },
  { id: 'sports', name: 'Sports & Fine Arts' },
];

export const FACULTY_MEMBERS = [
  {
    id: 'principal',
    name: 'Dr. Sunita Sharma',
    designation: 'Principal',
    department: 'leadership',
    qualification: 'Ph.D. in Educational Leadership (Delhi University), M.Sc. Physics',
    experience: '22+ Years in CBSE Education',
    bio: 'Pioneering holistic STEM integration and values-based character building across 2 decades of academic leadership.',
    image: IMAGES.faculty.principal,
    awards: 'National Best Principal Award 2024',
    subjects: ['Educational Policy']
  },
  {
    id: 'vice-principal',
    name: 'Prof. Rajeshwar Verma',
    designation: 'Vice Principal',
    department: 'leadership',
    qualification: 'M.Sc. Organic Chemistry (IIT Delhi), B.Ed.',
    experience: '18+ Years',
    bio: 'Dedicated to fostering analytical curiosity and academic excellence across all disciplines.',
    image: IMAGES.faculty.vicePrincipal,
    awards: 'Excellence in Academic Leadership',
    subjects: ['Research Methodology']
  },
  {
    id: 'teacher-math',
    name: 'Dr. Shalini Raman',
    designation: 'Mathematics Teacher',
    department: 'stem',
    qualification: 'Ph.D. Applied Mathematics (IISc Bangalore), M.Ed.',
    experience: '14+ Years',
    bio: 'Making abstract mathematical concepts intuitive and practical through visual geometry tools.',
    image: IMAGES.faculty.math,
    awards: 'Global Math Mentor 2023',
    subjects: ['Mathematics', 'Calculus']
  },
  {
    id: 'teacher-physics',
    name: 'Vikramaditya Roy',
    designation: 'Physics Teacher',
    department: 'stem',
    qualification: 'M.Sc Physics (BITS Pilani)',
    experience: '10+ Years',
    bio: 'Guiding students to deeply understand the fundamental laws of nature and their applications.',
    image: IMAGES.faculty.physics,
    awards: 'Best STEM Innovation Instructor',
    subjects: ['Physics']
  },
  {
    id: 'teacher-chemistry',
    name: 'Dr. Neha Kapoor',
    designation: 'Chemistry Teacher',
    department: 'stem',
    qualification: 'Ph.D. Organic Chemistry',
    experience: '12+ Years',
    bio: 'Fostering a love for chemical sciences through hands-on laboratory experiments and analysis.',
    image: IMAGES.faculty.chemistry,
    awards: 'Excellence in Chemistry Teaching',
    subjects: ['Chemistry']
  },
  {
    id: 'teacher-biology',
    name: 'Anjali Desai',
    designation: 'Biology Teacher',
    department: 'stem',
    qualification: 'M.Sc. Life Sciences',
    experience: '9+ Years',
    bio: 'Inspiring future doctors and biologists through comprehensive study of living systems.',
    image: IMAGES.faculty.biology,
    awards: 'Outstanding Biology Educator',
    subjects: ['Biology', 'Environmental Science']
  },
  {
    id: 'teacher-english',
    name: 'Ananya Deshmukh',
    designation: 'English Teacher',
    department: 'humanities',
    qualification: 'M.A. English Literature (Delhi University), CELTA Certified',
    experience: '15+ Years',
    bio: 'Cultivating eloquence, critical literary thought, and award-winning public speaking skills.',
    image: IMAGES.faculty.english,
    awards: 'Distinguished Educator in Humanities',
    subjects: ['World Literature', 'English']
  },
  {
    id: 'teacher-computer',
    name: 'Arjun Nair',
    designation: 'Computer Teacher',
    department: 'stem',
    qualification: 'M.Tech Computer Science',
    experience: '8+ Years',
    bio: 'Equipping students with modern programming, AI, and robotics skills for the digital age.',
    image: IMAGES.faculty.computer,
    awards: 'Tech Innovator Award',
    subjects: ['Computer Science', 'Coding']
  },
  {
    id: 'teacher-sports',
    name: 'Capt. Vikram Singh',
    designation: 'Sports Teacher',
    department: 'sports',
    qualification: 'M.P.Ed, Certified NIS Athletic Coach',
    experience: '16+ Years',
    bio: 'Instilling discipline, sportsmanship, and national-level athletic performance in student athletes.',
    image: IMAGES.faculty.sports,
    awards: 'National Coach of Distinction',
    subjects: ['Physical Education', 'Athletics']
  },
  {
    id: 'teacher-art',
    name: 'Meera Nambiar',
    designation: 'Art Teacher',
    department: 'sports',
    qualification: 'M.F.A. Visual Arts (Shantiniketan)',
    experience: '12+ Years',
    bio: 'Inspiring visual expression, creativity, and aesthetic appreciation through various mediums.',
    image: IMAGES.faculty.art,
    awards: 'State Cultural Mentor Award',
    subjects: ['Visual Arts', 'Painting']
  },
  {
    id: 'teacher-music',
    name: 'Ravi Shankar',
    designation: 'Music Teacher',
    department: 'sports',
    qualification: 'M.A. Music (Gandharva Mahavidyalaya)',
    experience: '11+ Years',
    bio: 'Nurturing musical talent in classical and contemporary styles through dedicated practice.',
    image: IMAGES.faculty.music,
    awards: 'Best Music Director',
    subjects: ['Vocal Music', 'Instrumental']
  }
];
