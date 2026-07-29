import { IMAGES } from '../utils/images';

export const GALLERY_CATEGORIES = [
  { id: "all", name: "All Media" },
  { id: "sports", name: "Sports Meet" },
  { id: "academics", name: "STEM & Science" },
  { id: "events", name: "Cultural & Events" },
  { id: "campus", name: "Campus Life" }
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Annual Track & Field Sports Meet 2026",
    category: "sports",
    type: "image",
    url: IMAGES.gallery.sportsDay,
    caption: "Senior wing students competing in the inter-house 4x100m championship relay."
  },
  {
    id: 2,
    title: "National Science & Robotics Exhibition",
    category: "academics",
    type: "image",
    url: IMAGES.gallery.scienceFair,
    caption: "Grade 10 STEM innovation team presenting their AI-powered solar irrigation prototype."
  },
  {
    id: 3,
    title: "Annual Symphony & Choir Concert",
    category: "events",
    type: "image",
    url: IMAGES.gallery.annualFunction,
    caption: "Apex Symphonic Orchestra performing at the 500-seat main auditorium."
  },
  {
    id: 4,
    title: "Atal Tinkering Robotics Workshop",
    category: "academics",
    type: "image",
    url: IMAGES.gallery.robotics,
    caption: "Students building autonomous obstacle-avoidance robots in the STEM Tinkering Hub."
  },
  {
    id: 5,
    title: "Central Library Knowledge Pods",
    category: "campus",
    type: "image",
    url: IMAGES.facilities.library,
    caption: "Students conducting research using Kindle digital pods and quiet reading study spaces."
  },
  {
    id: 6,
    title: "Fine Arts & Clay Pottery Showcase",
    category: "events",
    type: "image",
    url: IMAGES.gallery.artCompetition,
    caption: "Handcrafted ceramic sculptures and canvas paintings created by middle school artists."
  },
  {
    id: 7,
    title: "Inter-School Swimming Championship",
    category: "sports",
    type: "image",
    url: IMAGES.facilities.auditorium, // Replace with specific later if needed
    caption: "Aquatic sports team bagging 5 gold medals at the State CBSE Aquatics meet."
  },
  {
    id: 8,
    title: "Smart Classroom Digital Learning",
    category: "campus",
    type: "image",
    url: IMAGES.facilities.smartClassroom,
    caption: "Interactive 4K visual lesson on molecular biology in Grade 11 Science Wing."
  },
  {
    id: 9,
    title: "Annual Founders' Day Drama",
    category: "events",
    type: "image",
    url: IMAGES.gallery.culturalFest,
    caption: "Theatrical stage production celebrating Shakespearean literature and drama."
  }
];

export const VIDEO_HIGHLIGHTS = [
  {
    id: "v1",
    title: "Campus Life & Infrastructure Documentary 2026",
    duration: "3:45",
    thumbnail: IMAGES.banners.home,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v2",
    title: "Annual Sports Meet Highlights & Parade",
    duration: "2:30",
    thumbnail: IMAGES.gallery.sportsDay,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: "v3",
    title: "Atal STEM Tinkering Lab Student Innovations",
    duration: "4:10",
    thumbnail: IMAGES.gallery.robotics,
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];
