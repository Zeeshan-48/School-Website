// Helper to generate Unsplash Source URLs with specific keywords
// Note: Unsplash Source is officially deprecated and may return 503 errors.
// We use a fallback logic in our Image component.

export const getUnsplashUrl = (keywords, width = 800, height = 600) => {
  return `https://source.unsplash.com/${width}x${height}/?${keywords.join(',')}`;
};

export const getFallbackUrl = (keywords, width = 800, height = 600) => {
  return `https://loremflickr.com/${width}/${height}/${keywords.join(',')}`;
};

export const IMAGES = {
  banners: {
    home: getUnsplashUrl(['indian', 'modern', 'school', 'campus'], 1920, 1080),
    about: getUnsplashUrl(['indian', 'principal', 'students', 'happy'], 1920, 1080),
    vision: getUnsplashUrl(['indian', 'students', 'future', 'inspiration'], 1920, 1080),
    facilities: getUnsplashUrl(['indian', 'school', 'facilities', 'modern'], 1920, 1080),
    faculty: getUnsplashUrl(['indian', 'teachers', 'meeting', 'classroom'], 1920, 1080),
    academics: getUnsplashUrl(['indian', 'smart', 'classroom', 'studying'], 1920, 1080),
    admission: getUnsplashUrl(['indian', 'parents', 'school', 'admission'], 1920, 1080),
    gallery: getUnsplashUrl(['indian', 'school', 'event', 'function'], 1920, 1080),
    career: getUnsplashUrl(['indian', 'educators', 'collaboration'], 1920, 1080),
    contact: getUnsplashUrl(['indian', 'school', 'reception', 'office'], 1920, 1080)
  },
  facilities: {
    scienceLab: getUnsplashUrl(['indian', 'science', 'laboratory', 'students']),
    computerLab: getUnsplashUrl(['indian', 'computer', 'lab', 'coding']),
    library: getUnsplashUrl(['indian', 'school', 'library', 'reading']),
    playground: getUnsplashUrl(['indian', 'school', 'playground', 'sports']),
    auditorium: getUnsplashUrl(['indian', 'school', 'auditorium', 'event']),
    transport: getUnsplashUrl(['indian', 'school', 'bus', 'transport']),
    smartClassroom: getUnsplashUrl(['indian', 'smart', 'classroom', 'digital']),
    hostel: getUnsplashUrl(['indian', 'school', 'hostel', 'dormitory']),
    cafeteria: getUnsplashUrl(['indian', 'school', 'cafeteria', 'canteen']),
    medicalRoom: getUnsplashUrl(['indian', 'school', 'medical', 'room'])
  },
  gallery: {
    sportsDay: getUnsplashUrl(['indian', 'school', 'sports', 'day']),
    annualFunction: getUnsplashUrl(['indian', 'annual', 'function', 'performance']),
    scienceFair: getUnsplashUrl(['indian', 'science', 'fair', 'exhibition']),
    independenceDay: getUnsplashUrl(['indian', 'independence', 'day', 'school']),
    artCompetition: getUnsplashUrl(['indian', 'art', 'competition', 'painting']),
    culturalFest: getUnsplashUrl(['indian', 'cultural', 'fest', 'dance']),
    robotics: getUnsplashUrl(['indian', 'robotics', 'competition', 'students']),
    yogaDay: getUnsplashUrl(['indian', 'school', 'yoga', 'day']),
    teachersDay: getUnsplashUrl(['indian', 'teachers', 'day', 'celebration']),
    graduation: getUnsplashUrl(['indian', 'school', 'graduation', 'ceremony'])
  },
  faculty: {
    principal: getUnsplashUrl(['indian', 'principal', 'portrait']),
    vicePrincipal: getUnsplashUrl(['indian', 'professor', 'portrait', 'man']),
    math: getUnsplashUrl(['indian', 'teacher', 'woman', 'mathematics']),
    physics: getUnsplashUrl(['indian', 'teacher', 'man', 'physics']),
    chemistry: getUnsplashUrl(['indian', 'teacher', 'woman', 'chemistry']),
    biology: getUnsplashUrl(['indian', 'teacher', 'woman', 'biology']),
    english: getUnsplashUrl(['indian', 'teacher', 'woman', 'english']),
    computer: getUnsplashUrl(['indian', 'teacher', 'man', 'computer']),
    sports: getUnsplashUrl(['indian', 'coach', 'sports', 'man']),
    art: getUnsplashUrl(['indian', 'artist', 'teacher', 'woman']),
    music: getUnsplashUrl(['indian', 'musician', 'teacher', 'man'])
  },
  testimonials: {
    parent1: getUnsplashUrl(['indian', 'father', 'portrait']),
    parent2: getUnsplashUrl(['indian', 'mother', 'portrait']),
    student1: getUnsplashUrl(['indian', 'student', 'boy', 'portrait']),
    student2: getUnsplashUrl(['indian', 'student', 'girl', 'portrait']),
    alumni: getUnsplashUrl(['indian', 'university', 'student', 'portrait'])
  },
  about: {
    founder: getUnsplashUrl(['indian', 'founder', 'portrait', 'man']),
    director: getUnsplashUrl(['indian', 'director', 'portrait', 'woman'])
  },
  news: {
    robotics: getUnsplashUrl(['indian', 'robotics', 'students']),
    cultural: getUnsplashUrl(['indian', 'cultural', 'dance', 'school']),
    academic: getUnsplashUrl(['indian', 'students', 'studying', 'exam'])
  }
};
