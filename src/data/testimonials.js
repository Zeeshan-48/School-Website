import { IMAGES } from '../utils/images';

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Dr. Rajesh & Sunita Sharma",
    role: "Parents of Grade 10 Student",
    content: "Apex International School has transformed our daughter's personality. The balance between academic excellence and public speaking exposure is incredible.",
    rating: 5,
    avatar: IMAGES.testimonials.parent1
  },
  {
    id: 2,
    name: "Aarav Mehta",
    role: "Alumnus (Batch 2024) - MIT Freshman",
    content: "The robotics lab and faculty guidance at Apex gave me the technical foundation and confidence to get accepted into top global universities.",
    rating: 5,
    avatar: IMAGES.testimonials.alumni
  },
  {
    id: 3,
    name: "Priya Nair",
    role: "Parent of Grade 4 Student",
    content: "The safety, warmth of teachers, and individual attention given to every young child make Apex feel like a nurturing second home.",
    rating: 5,
    avatar: IMAGES.testimonials.parent2
  }
];

export const NEWS_EVENTS = [
  {
    id: 1,
    category: "Achievement",
    date: "July 24, 2026",
    title: "Apex Robotics Team Wins 1st Place at National STEM Challenge",
    summary: "Our senior robotics team designed an autonomous solar-powered water purifier prototype, securing gold among 150 schools nationwide.",
    image: IMAGES.news.robotics
  },
  {
    id: 2,
    category: "Event",
    date: "August 15, 2026",
    title: "Upcoming Annual Cultural & Arts Festival 2026",
    summary: "Join us for a three-day celebration of music, dance, theatrical performances, and student art exhibitions.",
    image: IMAGES.news.cultural
  },
  {
    id: 3,
    category: "Academic",
    date: "July 18, 2026",
    title: "100% Distinction in CBSE Board Examinations 2026",
    summary: "Apex students set a new milestone with 42 students scoring above 95% overall in Grade 10 & 12 board results.",
    image: IMAGES.news.academic
  }
];
