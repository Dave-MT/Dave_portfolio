import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, isDbConnected } from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Fallback Mock Data
const FALLBACK_SKILLS = [
  {
    category: "UI/UX Design",
    skills: [
      { name: "Figma", icon: "figma" }
    ]
  },
  {
    category: "Full Stack Development",
    skills: [
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "node" },
      { name: "PHP", icon: "php" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "Bootstrap", icon: "bootstrap" },
      { name: "MySQL", icon: "mysql" }
    ]
  },
  {
    category: "Tools",
    skills: [
      { name: "Postman", icon: "postman" },
      { name: "Figma", icon: "figma" },
      { name: "Ubuntu Linux", icon: "linux" }
    ]
  }
];

const FALLBACK_EXPERIENCES = [
  {
    id: 1,
    role: "Full Stack Developer and ERP",
    company: "Intern",
    year: "2025",
    description: "Developed backend server logic and integrated database systems to handle user data. Built responsive frontend web pages using HTML, CSS, Bootstrap, React, and JavaScript. Tested backend API endpoints using Postman to make sure they connected with the frontend UI. At Zala technology.",
    tags: ["React", "Node.js", "MySQL"]
  },
  {
    id: 2,
    role: "UI Design",
    company: "Sidama ID",
    year: "2026",
    description: "Focused on crafting user-design user interface. Collaborated with cross-functional teams to deliver high-fidelity prototypes at Kayo Technology.",
    tags: ["Figma"]
  }
];

const FALLBACK_EDUCATION = {
  degree: "Bachelors in Computer Science",
  institution: "St Mary University",
  year: "GRADUATED",
  certification: "Udacity Coders",
  certificationDesc: "Artificial Intelligence and Data Analysis Certifications",
  highlights: [
    "Completed 3 app projects (Figma).",
    "Completed 3 team Projects."
  ]
};

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: "Brokers App",
    description: "Real estate broker management platform with property listings, filtering, and real-time client inquiry management.",
    category: "Full Stack",
    image: "/brokers.png",
    tags: ["React", "Node.js", "MySQL"],
    live_url: "https://www.figma.com/design/KFUT7TW4gjA207e6QoPzVP/Broker_app?node-id=0-1&t=XJHfuE9bSLBukAIs-1",
    github_url: "#"
  },
  {
    id: 2,
    title: "Vaccination Tracking",
    subtitle: "Empowering Health Through Digital Precision",
    description: "Digital health precision tracking system for healthcare clinics and patients to record immunization records securely.",
    category: "Full Stack / Health",
    image: "/vaccination.png",
    tags: ["React", "MySQL", "Node.js", "UI/UX"],
    live_url: "https://www.figma.com/site/wyVKtRbRR33ppQ8oeL8ItM/Vacc_track?node-id=0-1&t=3dRyC9P69rLQLQoh-1",
    github_url: "https://github.com/Dave-MT/VaxClient"
  },
  {
    id: 3,
    title: "Edu Connect Web",
    description: "Interactive educational web platform connecting students and educators for course materials, assignments, and analytics.",
    category: "EdTech",
    image: "/educonnect.png",
    tags: ["PHP", "MySQL"],
    live_url: "#",
    github_url: "https://github.com/Dave-MT/Website__educonect"
  },
  {
    id: 4,
    title: "Ecommerce",
    promoText: "Get your Special Sale up to 40%",
    description: "Modern online store with product search, detailed categorization, shopping cart, and smooth checkout experience.",
    category: "E-Commerce",
    image: "/ecommerce.png",
    tags: ["Figma", "UX/UI"],
    live_url: "https://www.figma.com/design/YsAso5hqidORHlHskT6HKE/Ecommerce?node-id=0-1&t=LvaVUPJSNAAB24DZ-1",
    github_url: "#"
  },
  {
    id: 5,
    title: "Sidama_ID Design",
    description: "Custom digital identification card design system, layout guidelines, and regional administrative asset branding.",
    category: "UI/UX Design",
    image: "/sidama.png",
    tags: ["Figma", "UI/UX"],
    live_url: "https://www.figma.com/design/k04Q5Nyk0u5w7pWHYKnLE5/Sidam_ID?node-id=0-1&t=JByZUKuh49lp8x4L-1",
    github_url: "#"
  },
  {
    id: 6,
    title: "Citizen_ID System Web",
    description: "Comprehensive Web application for issuing, registering, and validating citizen national identity verification data.",
    category: "GovTech / Security",
    image: "/citizen.png",
    tags: ["Full Stack", "React", "Express.js", "MySQL"],
    live_url: "#",
    github_url: "https://github.com/mickeytw53-ops/citizen-id-system"
  },
  {
    id: 7,
    title: "Yango New Design",
    subtitle: "Modern Ride-Hailing Reimagined",
    description: "A fresh new redesign of the Yango app — covering branding, navigation, trip flow improvements. Designed entirely in Figma with modern UI principles and accessibility in mind.",
    category: "UX/UI Design · Figma",
    image: "/yango.png",
    tags: ["Figma", "UX/UI", "Mobile Design"],
    live_url: "https://www.figma.com/design/X2pXGv2crK9BBzQBYXMMLq/Yango?node-id=0-1&t=intxtBo1x3ykpkIh-1",
    github_url: "#"
  },
  {
    id: 8,
    title: "Personal Portfolio Design",
    subtitle: "Designing My Own Digital Identity",
    description: "Full design and development of a personal portfolio website — from wireframes and high-fidelity Figma prototypes to a fully responsive React web application showcasing projects, skills, and experience.",
    category: "UX/UI Design · Web",
    image: "/portfolio-preview.png",
    tags: ["Figma", "React", "UI/UX", "Web Design"],
    live_url: "https://www.figma.com/design/2aWahZPyrWpWOLG22Opjvq/My_Portfolio?node-id=39-476&t=XBbq68yiE1DbOKFn-1",
    github_url: "#"
  }
];

// Healthcheck Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    dbConnected: isDbConnected,
    timestamp: new Date().toISOString(),
  });
});

// GET Skills
app.get('/api/skills', async (req, res) => {
  if (isDbConnected && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM skills');
      const categoriesMap = {};
      rows.forEach((item) => {
        if (!categoriesMap[item.category]) {
          categoriesMap[item.category] = [];
        }
        categoriesMap[item.category].push({ name: item.name, icon: item.icon });
      });

      const formattedSkills = Object.keys(categoriesMap).map((cat) => ({
        category: cat,
        skills: categoriesMap[cat],
      }));

      return res.json(formattedSkills);
    } catch (err) {
      console.error('Error fetching skills from MySQL:', err.message);
    }
  }
  return res.json(FALLBACK_SKILLS);
});

// GET Experiences & Education
app.get('/api/experiences', async (req, res) => {
  if (isDbConnected && pool) {
    try {
      const [expRows] = await pool.query('SELECT * FROM experiences ORDER BY id DESC');
      const [eduRows] = await pool.query('SELECT * FROM education LIMIT 1');

      const experiences = expRows.map((r) => ({
        id: r.id,
        role: r.role,
        company: r.company,
        year: r.year,
        description: r.description,
        tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags,
      }));

      const education = eduRows[0]
        ? {
          degree: eduRows[0].degree,
          institution: eduRows[0].institution,
          year: eduRows[0].year,
          highlights: typeof eduRows[0].highlights === 'string' ? JSON.parse(eduRows[0].highlights) : eduRows[0].highlights,
        }
        : FALLBACK_EDUCATION;

      return res.json({ experiences, education });
    } catch (err) {
      console.error('Error fetching experiences from MySQL:', err.message);
    }
  }
  return res.json({ experiences: FALLBACK_EXPERIENCES, education: FALLBACK_EDUCATION });
});

// GET Projects
app.get('/api/projects', async (req, res) => {
  if (isDbConnected && pool) {
    try {
      const [rows] = await pool.query('SELECT * FROM projects ORDER BY id ASC');
      const projects = rows.map((r) => ({
        id: r.id,
        title: r.title,
        subtitle: r.subtitle,
        promoText: r.promo_text,
        description: r.description,
        category: r.category,
        image: r.image,
        tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags,
        live_url: r.live_url,
        github_url: r.github_url,
      }));
      return res.json(projects);
    } catch (err) {
      console.error('Error fetching projects from MySQL:', err.message);
    }
  }
  return res.json(FALLBACK_PROJECTS);
});

// POST Contact Form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (isDbConnected && pool) {
    try {
      await pool.query(
        'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
        [name, email, message]
      );
      return res.json({ success: true, message: 'Message sent and stored in MySQL database successfully!' });
    } catch (err) {
      console.error('Error saving contact to MySQL:', err.message);
      return res.status(500).json({ error: 'Database error saving message.' });
    }
  }

  console.log('Received contact message (Offline fallback mode):', { name, email, message });
  return res.json({ success: true, message: 'Thank you! Your message has been received.' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Express Backend Server running on http://localhost:${PORT}`);
});

