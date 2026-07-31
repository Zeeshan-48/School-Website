import { IMAGES } from '../utils/images';

export const ABOUT_DATA = {
  hero: {
    badge: "28+ Years of Educational Excellence",
    title: "About Apex International School",
    subtitle: "Since 1995, Apex International School has led the way in holistic CBSE education, combining academic rigor with moral ethics and innovative STEM learning."
  },
  visionMission: {
    vision: "To be a globally recognized center of educational excellence that empowers students to become compassionate, innovative, and responsible global leaders.",
    mission: "To foster a dynamic learning environment through experiential CBSE curriculum, state-of-the-art STEM technology, sports mentorship, and values-driven character building."
  },
  coreValues: [
    {
      title: "Academic Rigor & Innovation",
      description: "Encouraging critical thinking, scientific curiosity, and continuous intellectual growth.",
      iconName: "Award"
    },
    {
      title: "Integrity & Character",
      description: "Instilling empathy, honesty, mutual respect, and ethical decision-making in every student.",
      iconName: "ShieldCheck"
    },
    {
      title: "Global Citizenship",
      description: "Preparing students to embrace diverse cultures, environmental sustainability, and global challenges.",
      iconName: "Globe"
    },
    {
      title: "Holistic Development",
      description: "Balancing academic mastery with sports, visual arts, performing arts, and emotional wellbeing.",
      iconName: "Heart"
    }
  ],
  timeline: [
    {
      year: "1995",
      title: "Foundation of Apex School",
      description: "Established with 120 primary students and a vision to deliver child-centric holistic education."
    },
    {
      year: "2003",
      title: "CBSE Senior Secondary Affiliation",
      description: "Expanded campus infrastructure to introduce Science and Commerce streams for Grades 11 & 12."
    },
    {
      year: "2012",
      title: "Green Eco-Campus Launch",
      description: "Inaugurated 25-acre eco-friendly campus with solar power, rainwater harvesting, and modern athletic grounds."
    },
    {
      year: "2018",
      title: "Atal STEM & Robotics Tinkering Lab",
      description: "Partnered with national STEM initiatives to establish state-of-the-art AI, IoT, and 3D printing tinkering labs."
    },
    {
      year: "2023",
      title: "International School Award",
      description: "Recognized among Top 10 International CBSE Institutions for global curriculum integration and sports excellence."
    },
    {
      year: "2026",
      title: "Smart Learning & AI Classrooms",
      description: "100% interactive smart classrooms with digital curriculum tools and integrated competitive exam counseling."
    }
  ],
  leadership: [
    {
      name: "Dr. Rajeshwar Verma",
      role: "Founder & Managing Director",
      qualification: "Ph.D. in Educational Leadership, M.Ed.",
      image: IMAGES.about.founder,
      message: "At Apex, we do not just educate; we ignite minds to question, innovate, and lead with purpose. Our focus remains steadfast on shaping empathetic global citizens."
    },
    {
      name: "Dr. Sunita Sharma",
      role: "Principal & Academic Head",
      qualification: "M.Sc. Physics, B.Ed., 22+ Yrs Experience",
      image: IMAGES.about.director,
      message: "Education is a lifelong journey. We provide our students with the wings of modern knowledge and the roots of strong cultural values."
    }
  ],
  accreditations: [
    { name: "CBSE Affiliated", desc: "Affiliation No. 2130492" },
    { name: "STEM Certified", desc: "Robotics & Innovation Hub" },
    { name: "ISO 9001:2015", desc: "Quality Education Standard" },
    { name: "Fit India School", desc: "Sports & Physical Fitness" }
  ]
};
