import { IMAGES } from '../utils/images';
import academicImg1 from '../assets/academic_img_1.png';
import academicImg2 from '../assets/academic_img_2.png';
import academicImg3 from '../assets/academic_img_3.png';
import academicImg4 from '../assets/academic_img_4.png';

export const ACADEMIC_PROGRAMS = [
  {
    id: "pre-primary",
    level: "Kindergarten",
    title: "Pre-Primary Wing (Nursery - UKG)",
    age: "Ages 3 - 5 Years",
    description: "Play-based inquiry learning developing motor skills, early literacy, numerical curiosity, and emotional intelligence in a safe environment.",
    subjects: ["English Phonics & Stories", "Number Magic & Math Readiness", "Environmental Awareness", "Art, Music & Creative Movement"],
    highlights: ["Montessori Activity Corners", "Phonics & Storytelling", "Sensory Play Area", "Splash Pool & Mini Garden"],
    image: academicImg1
  },
  {
    id: "primary",
    level: "Primary School",
    title: "Primary Wing (Grades 1 - 5)",
    age: "Ages 6 - 10 Years",
    description: "Building strong foundational concepts in Science, Mathematics, Languages, Environmental Studies, and introductory STEM skills.",
    subjects: ["English Literature & Grammar", "Mathematics & Mental Math", "Science & Nature Exploration", "Second Language (Hindi/Sanskrit/French)", "Computer Fundamentals"],
    highlights: ["Interactive STEM Tinkering", "Coding & Digital Literacy", "Language Immersion Lab", "Visual & Performing Arts"],
    image: academicImg2
  },
  {
    id: "secondary",
    level: "Middle & High School",
    title: "Secondary Wing (Grades 6 - 10)",
    age: "Ages 11 - 15 Years",
    description: "Rigorously preparing students for CBSE Board exams through inquiry-based learning, practical laboratory experiments, and competitive coaching.",
    subjects: ["Physics, Chemistry & Biology Labs", "Advanced Mathematics", "Social Sciences & History", "English & Foreign Languages", "Artificial Intelligence & IT"],
    highlights: ["Physics/Chem/Bio Labs", "National Olympiad Training", "Model United Nations (MUN)", "Leadership & Debate Clubs"],
    image: academicImg3
  },
  {
    id: "senior-secondary",
    level: "Senior Secondary",
    title: "Senior Secondary (Grades 11 & 12)",
    age: "Ages 16 - 18 Years",
    description: "Specialized academic streams in Science, Commerce, and Humanities with integrated competitive exam preparation (JEE, NEET, CUET, SAT).",
    subjects: ["Science Stream (PCM/PCB/PCMB)", "Commerce Stream (Accounts, Econ, B.St)", "Humanities (Psychology, Pol Sci, Soc)", "Applied Math & Computer Science"],
    highlights: ["Integrated Competitive Prep", "Career Counseling Desk", "Research Projects & Seminars", "University Application Mentorship"],
    image: academicImg4
  }
];

export const SENIOR_STREAMS = [
  {
    id: "science",
    title: "Science Stream (Medical / Non-Medical)",
    desc: "Designed for aspiring engineers, doctors, research scientists, and technology innovators.",
    coreSubjects: ["Physics", "Chemistry", "Mathematics / Biology", "English Core"],
    electives: ["Computer Science (Python)", "Physical Education", "Informatics Practices", "Psychology"]
  },
  {
    id: "commerce",
    title: "Commerce Stream",
    desc: "Targeted at future entrepreneurs, chartered accountants, finance experts, and business leaders.",
    coreSubjects: ["Accountancy", "Business Studies", "Economics", "English Core"],
    electives: ["Applied Mathematics", "Informatics Practices", "Entrepreneurship", "Physical Education"]
  },
  {
    id: "humanities",
    title: "Humanities / Arts Stream",
    desc: "Ideal for future civil servants, psychologists, journalists, international relations specialists, and legal professionals.",
    coreSubjects: ["Political Science", "Psychology", "Sociology / History", "English Core"],
    electives: ["Economics", "Fine Arts", "Physical Education", "Mass Media Studies"]
  }
];

export const STEM_FEATURES = [
  {
    title: "Atal Robotics & IoT Lab",
    desc: "Hands-on micro-controller coding, sensors, and autonomous robotics assembly."
  },
  {
    title: "3D Printing & Design",
    desc: "Computer-Aided Design (CAD) software modeling and 3D rapid prototyping."
  },
  {
    title: "AI & Data Science Hub",
    desc: "Python programming, machine learning fundamentals, and data visualization."
  },
  {
    title: "Eco STEM Experiments",
    desc: "Solar energy kits, hydroponics systems, and environmental science projects."
  }
];
