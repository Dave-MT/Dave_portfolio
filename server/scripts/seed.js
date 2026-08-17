import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  console.log('🌱 Starting MySQL database seeding script...');

  try {
    // Initial connection without database selected to ensure database creation
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || '3306'),
    });

    console.log('Connected to MySQL server.');
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || 'dawit_portfolio'}\`;`);
    console.log(`Database '${process.env.DB_NAME || 'dawit_portfolio'}' ready.`);
    await connection.query(`USE \`${process.env.DB_NAME || 'dawit_portfolio'}\`;`);

    // Create Tables
    await connection.query(`
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        category VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL,
        icon VARCHAR(50) DEFAULT 'check'
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS experiences (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role VARCHAR(150) NOT NULL,
        company VARCHAR(150) NOT NULL,
        year VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        tags JSON NOT NULL
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS education (
        id INT AUTO_INCREMENT PRIMARY KEY,
        degree VARCHAR(150) NOT NULL,
        institution VARCHAR(150) NOT NULL,
        year VARCHAR(50) NOT NULL,
        highlights JSON NOT NULL
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        subtitle VARCHAR(255) DEFAULT NULL,
        promo_text VARCHAR(255) DEFAULT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        image VARCHAR(255) NOT NULL,
        tags JSON NOT NULL,
        live_url VARCHAR(255) DEFAULT '#',
        github_url VARCHAR(255) DEFAULT '#'
      );
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tables created successfully.');

    // Clear existing data
    await connection.query('TRUNCATE TABLE skills');
    await connection.query('TRUNCATE TABLE experiences');
    await connection.query('TRUNCATE TABLE education');
    await connection.query('TRUNCATE TABLE projects');

    // Seed Skills
    const skills = [
      ['UI/UX Design', 'Figma', 'figma'],
      ['Full Stack Development', 'React', 'react'],
      ['Full Stack Development', 'Node.js', 'node'],
      ['Full Stack Development', 'PHP', 'php'],
      ['Full Stack Development', 'HTML', 'html'],
      ['Full Stack Development', 'CSS', 'css'],
      ['Full Stack Development', 'Bootstrap', 'bootstrap'],
      ['Full Stack Development', 'MySQL', 'mysql'],
      ['Tools', 'Postman', 'postman'],
      ['Tools', 'Figma', 'figma'],
      ['Tools', 'Ubuntu Linux', 'linux'],
    ];
    for (const skill of skills) {
      await connection.query('INSERT INTO skills (category, name, icon) VALUES (?, ?, ?)', skill);
    }
    console.log('Seeded skills data.');

    // Seed Experiences
    await connection.query(`
      INSERT INTO experiences (role, company, year, description, tags) VALUES
      ('FULL STACK DEVELOPER INTERN', 'Tech Intern', '2024', 'Worked on developing responsive web applications using React and Node.js. Integrated MySQL databases for efficient data storage and API services.', ?),
      ('UI/UX DESIGN INTERN', 'Design Lab', '2023', 'Created high-fidelity wireframes, interactive prototypes, and user flows using Figma and Photoshop.', ?)
    `, [
      JSON.stringify(['React', 'Node.js', 'MySQL']),
      JSON.stringify(['Figma', 'Photoshop'])
    ]);
    console.log('Seeded experiences data.');

    // Seed Education
    await connection.query(`
      INSERT INTO education (degree, institution, year, highlights) VALUES
      ('Computer Science Bachelor''s Degree', 'St Mary University', '2020 - 2024', ?)
    `, [
      JSON.stringify([
        'Computer Science Major with specialization in Software Engineering',
        'Graduated with Honors & Distinction'
      ])
    ]);
    console.log('Seeded education data.');

    // Seed Projects
    const projects = [
      [
        'Brokers App',
        null,
        null,
        'Real estate broker management platform with property listings and search.',
        'Full Stack',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        JSON.stringify(['React', 'Node.js', 'MySQL'])
      ],
      [
        'Vaccination Tracking',
        'Empowering Health Through Digital Precision',
        null,
        'Vaccination tracking system for clinics and patients to track immunization history.',
        'Full Stack / Health',
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        JSON.stringify(['React', 'MySQL', 'Node.js', 'UI/UX'])
      ],
      [
        'Edu Connect Web',
        null,
        null,
        'Educational platform connecting students and tutors for interactive learning.',
        'EdTech',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        JSON.stringify(['React.js', 'Node.js', 'MySQL'])
      ],
      [
        'Ecommerce',
        null,
        'Get your Special Sale up to 40%',
        'Modern online store with product filtering, shopping cart, and checkout flow.',
        'E-Commerce',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
        JSON.stringify(['React', 'Tailwind', 'MySQL'])
      ],
      [
        'Sidama_ID Design',
        null,
        null,
        'Digital identity card layout and design system for regional administration.',
        'UI/UX Design',
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        JSON.stringify(['Figma', 'UI/UX'])
      ],
      [
        'Citizen_ID System Web',
        null,
        null,
        'Web portal for issuing and validating citizen national identification records securely.',
        'GovTech',
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        JSON.stringify(['Full Stack', 'React', 'Express.js', 'MySQL'])
      ],
      [
        'Yango Rider App',
        'Redesigning the Ride Experience',
        null,
        'A complete UX/UI redesign of the Yango ride-hailing app focused on improving rider onboarding, real-time trip tracking, and a cleaner, more intuitive interface for daily commuters.',
        'UX/UI Design',
        'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
        JSON.stringify(['Figma', 'UX/UI', 'Mobile Design', 'Prototyping'])
      ],
      [
        'Yango Driver App',
        'Empowering Drivers with Smarter Tools',
        null,
        'A new design concept for the Yango driver-side application, streamlining trip acceptance, earnings dashboard, navigation flow, and driver support — built with a focus on clarity and speed.',
        'UX/UI Design',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
        JSON.stringify(['Figma', 'UX/UI', 'Mobile Design', 'User Research'])
      ]
    ];

    for (const proj of projects) {
      await connection.query(`
        INSERT INTO projects (title, subtitle, promo_text, description, category, image, tags)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, proj);
    }
    console.log('Seeded projects data.');

    await connection.end();
    console.log('🎉 Seeding completed successfully!');
  } catch (err) {
    console.error('❌ Error seeding database:', err.message);
  }
};

seedDatabase();
