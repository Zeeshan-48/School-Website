require('dotenv').config();
const { sequelize } = require('./src/config/database');
const Admission = require('./src/models/Admission');
const Inquiry = require('./src/models/Inquiry');
const Career = require('./src/models/Career');
const JobApplicant = require('./src/models/JobApplicant');
const Faculty = require('./src/models/Faculty');
const Gallery = require('./src/models/Gallery');

const runSeed = async () => {
  try {
    await sequelize.sync({ force: false });
    
    console.log('Seeding Admissions...');
    await Admission.bulkCreate([
      { studentName: 'Aarav Patel', grade: 'Grade 1', parentName: 'Ramesh Patel', email: 'ramesh@example.com', phone: '9876543210', status: 'Submitted' },
      { studentName: 'Diya Sharma', grade: 'Grade 6', parentName: 'Suresh Sharma', email: 'suresh@example.com', phone: '9876543211', status: 'Under Review' },
      { studentName: 'Rohan Gupta', grade: 'Grade 11', parentName: 'Mohan Gupta', email: 'mohan@example.com', phone: '9876543212', status: 'Approved' },
    ]);

    console.log('Seeding Inquiries...');
    await Inquiry.bulkCreate([
      { fullName: 'Priya Singh', email: 'priya@example.com', phone: '9876543213', subject: 'Admissions Inquiry', message: 'When does the admission process start?' },
      { fullName: 'Amit Kumar', email: 'amit@example.com', phone: '9876543214', subject: 'Academic Curriculum', message: 'What is the syllabus for Grade 5?' },
      { fullName: 'Neha Verma', email: 'neha@example.com', phone: '9876543215', subject: 'Bus Transport', message: 'Do you have bus routes for Sector 12?' },
    ]);

    console.log('Seeding Careers...');
    const careers = await Career.bulkCreate([
      { title: 'Mathematics Teacher', department: 'Academic', location: 'Main Campus', type: 'Full Time', experience: '3+ Years', qualification: 'M.Sc. B.Ed.', description: 'Teach math for senior grades.' },
      { title: 'Sports Coach', department: 'Sports', location: 'Main Campus', type: 'Part Time', experience: '2+ Years', qualification: 'B.P.Ed.', description: 'Coach students in basketball and football.' },
    ]);

    console.log('Seeding Job Applicants...');
    await JobApplicant.bulkCreate([
      { fullName: 'Ankit Desai', email: 'ankit@example.com', phone: '9876543216', experience: '3-5 Years', coverLetter: 'I love teaching math.', jobId: careers[0].id },
      { fullName: 'Sneha Jain', email: 'sneha@example.com', phone: '9876543217', experience: '1-3 Years', coverLetter: 'I am a passionate coach.', jobId: careers[1].id },
    ]);

    console.log('Seeding Faculty...');
    await Faculty.bulkCreate([
      { name: 'Dr. R.K. Sharma', designation: 'Principal', department: 'Administration', experience: '20+ Years', qualification: 'Ph.D. Education', bio: 'Experienced educational leader.' },
      { name: 'Ms. Anita Desai', designation: 'Senior Teacher', department: 'Science', experience: '10+ Years', qualification: 'M.Sc. Physics', bio: 'Passionate about physics.' },
    ]);

    console.log('Seeding Gallery...');
    await Gallery.bulkCreate([
      { title: 'Annual Sports Day', category: 'Sports', type: 'image', imagePath: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=500&q=80', caption: 'Students participating in sprint.' },
      { title: 'Science Exhibition', category: 'Events', type: 'image', imagePath: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?w=500&q=80', caption: 'Innovative projects by students.' },
      { title: 'School Campus', category: 'Campus', type: 'image', imagePath: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&q=80', caption: 'Main building.' },
    ]);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

runSeed();
