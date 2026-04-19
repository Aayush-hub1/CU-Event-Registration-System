require('dotenv').config();
const mongoose = require('mongoose');
const User  = require('./models/User');
const Event = require('./models/Event');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB...');

  await User.deleteMany({});
  await Event.deleteMany({});

  const admin = await User.create({
    name: 'Admin CU', email: 'admin@cu.ac.in', password: 'admin123',
    uid: 'ADMIN001', department: 'Administration', semester: 1, role: 'admin'
  });

  await User.create({
    name: 'Rahul Sharma', email: 'rahul@cumail.in', password: 'student123',
    uid: '21BCS1001', department: 'Computer Science', semester: 5, role: 'student'
  });

  const events = [
    { title: 'TechFest 2024', description: 'Annual technical festival with coding contests, hackathons, robotics competitions and more. Open to all departments.', category: 'Technical', venue: 'UIE Auditorium', date: new Date('2024-03-15'), time: '10:00', totalSeats: 200, organizer: 'CSE Department', status: 'upcoming' },
    { title: 'Cultural Night — Utsav', description: 'A grand evening of music, dance, drama and talent performances by CU students celebrating diversity and culture.', category: 'Cultural', venue: 'Open Air Theatre', date: new Date('2024-03-20'), time: '18:00', totalSeats: 500, organizer: 'Student Council', status: 'upcoming' },
    { title: 'Full Stack Web Dev Workshop', description: 'Hands-on 2-day workshop covering React, Node.js, MongoDB and deployment. Certificates will be provided to all participants.', category: 'Workshop', venue: 'Lab Block C-301', date: new Date('2024-03-25'), time: '09:00', totalSeats: 60, organizer: 'IEEE CU Chapter', status: 'upcoming' },
    { title: 'Inter-Department Cricket', description: 'Annual inter-department cricket tournament. Teams from all departments compete for the CU Cricket Trophy.', category: 'Sports', venue: 'CU Sports Ground', date: new Date('2024-04-01'), time: '08:00', totalSeats: 150, organizer: 'Sports Committee', status: 'upcoming' },
    { title: 'AI & ML Seminar', description: 'Industry experts from Google and Microsoft will speak about the latest trends in Artificial Intelligence and Machine Learning.', category: 'Seminar', venue: 'Seminar Hall A', date: new Date('2024-04-05'), time: '11:00', totalSeats: 100, organizer: 'Research Cell', status: 'upcoming' },
    { title: 'Startup Pitch Competition', description: 'Present your startup idea to a panel of investors and entrepreneurs. Top 3 teams win seed funding and mentorship.', category: 'Technical', venue: 'Innovation Hub', date: new Date('2024-04-10'), time: '14:00', totalSeats: 80, organizer: 'E-Cell CU', status: 'upcoming' }
  ];

  for (const e of events) await Event.create({ ...e, createdBy: admin._id });

  console.log('\n✅ Seed complete!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Admin   → admin@cu.ac.in / admin123');
  console.log('Student → rahul@cumail.in / student123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
