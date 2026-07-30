import { IMAGES } from '../utils/images';
import campusImg1 from '../assets/campus_img_1.png';
import campusImg2 from '../assets/campus_img_2.png';
import campusImg3 from '../assets/campus_img_3.jpg';


export const FACILITIES_CATEGORIES = [
  { id: "all", name: "All Facilities" },
  { id: "academics", name: "Academics & Labs" },
  { id: "sports", name: "Sports & Athletics" },
  { id: "infrastructure", name: "Infrastructure & Dining" },
  { id: "safety", name: "Safety & Transport" }
];

export const FACILITIES = [
  {
    id: "smart-classes",
    category: "academics",
    title: "Smart Digital Classrooms",
    shortDesc: "Interactive 4K touch panels, high-speed Wi-Fi, ergonomic furniture, and 3D learning simulations in every classroom.",
    details: "Every classroom is equipped with interactive smartboards, high-definition audio systems, climate control, and ergonomically designed furniture to promote active participation and visual learning.",
    image: campusImg1,
    iconName: "Monitor",
    badge: "Tech Integration"
  },
  {
    id: "library",
    category: "academics",
    title: "Resource & Knowledge Library",
    shortDesc: "25,000+ books, international research journals, e-reading pods, and peaceful quiet study spaces.",
    details: "Our library spans over 6,000 sq. ft., offering a digital cataloging system, Kindle reading pods, encyclopedias, competitive exam prep sections, and collaborative discussion rooms.",
    image: campusImg2,
    iconName: "BookOpen",
    badge: "Knowledge Hub"
  },
  {
    id: "science-lab",
    category: "academics",
    title: "Advanced Science & Innovation Labs",
    shortDesc: "State-of-the-art Physics, Chemistry, Biology, and Biotechnology research labs equipped with precision gear.",
    details: "Separate state-approved laboratories for Physics, Chemistry, and Biology featuring digital microscopes, safety eye-wash stations, fume hoods, and individual student experiment stations.",
    image: campusImg3,
    iconName: "FlaskConical",
    badge: "Hands-on Research"
  },
  {
    id: "stem-lab",
    category: "academics",
    title: "Robotics & AI Innovation Hub",
    shortDesc: "High-spec workstations, 3D printers, VR learning kits, and coding environments for AI and Robotics.",
    details: "Powered by modern microcontrollers, IoT development boards, 3D printers, and Python software suites, allowing students to prototype real-world engineering solutions.",
    image: IMAGES.facilities.computerLab,
    iconName: "Laptop",
    badge: "Next-Gen Tech"
  },
  {
    id: "sports-complex",
    category: "sports",
    title: "Sports & Athletics Arena",
    shortDesc: "Olympic-sized swimming pool, FIFA-standard synthetic turf, indoor badminton courts, and basketball arena.",
    details: "Includes a 400m synthetic running track, floodlit tennis courts, professional gymnastics hall, karate/taekwondo dojo, and full-time certified coaches.",
    image: IMAGES.facilities.playground,
    iconName: "Trophy",
    badge: "Fitness & Athletics"
  },
  {
    id: "swimming-pool",
    category: "sports",
    title: "Aquatic Swimming Complex",
    shortDesc: "Temperature-controlled 8-lane swimming pool with separate splash pool for primary kids and lifeguard supervision.",
    details: "Maintained with automated filtration systems, certified male and female swimming coaches, and dedicated locker rooms.",
    image: IMAGES.facilities.auditorium, // Will map to pool in images.js later if needed
    iconName: "Waves",
    badge: "Aquatic Sports"
  },
  {
    id: "transport",
    category: "safety",
    title: "GPS-Tracked AC Bus Fleet",
    shortDesc: "Air-conditioned school buses equipped with real-time GPS tracking, CCTV cameras, speed governors, and trained female attendants.",
    details: "Covering 45+ city routes with parent app live tracking, speed limit alerts, first aid kits, and verified drivers.",
    image: IMAGES.facilities.transport,
    iconName: "Bus",
    badge: "Safe Commute"
  },
  {
    id: "cafeteria",
    category: "infrastructure",
    title: "Hygienic Organic Cafeteria & Dining",
    shortDesc: "Nutritious chef-prepared vegetarian meals, balanced diet charts, and strict hygiene protocols.",
    details: "Spacious 500-seater dining hall serving hot, balanced, nutritionist-approved meals prepared in a stainless-steel modern kitchen.",
    image: IMAGES.facilities.cafeteria,
    iconName: "Utensils",
    badge: "Healthy Dining"
  },
  {
    id: "infirmary",
    category: "safety",
    title: "24/7 Medical Care & Infirmary",
    shortDesc: "Resident medical officer, full-time nursing staff, 4-bed infirmary, and tie-up with nearby multi-specialty hospital.",
    details: "Fully equipped with emergency oxygen support, first aid, routine health checkup tracking, and immediate ambulance access.",
    image: IMAGES.facilities.medicalRoom,
    iconName: "HeartPulse",
    badge: "Healthcare & Safety"
  }
];

export const FACILITIES_DATA = FACILITIES;
