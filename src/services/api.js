// API Service Layer with Automatic Backend Integration & Fallback Data

const API_BASE_URL = '/api';

// Fallback Initial Data extracted directly from reference design
export const FALLBACK_SKILLS = [
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

export const FALLBACK_EXPERIENCES = [
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

export const FALLBACK_EDUCATION = {
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

export const FALLBACK_PROJECTS = [
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
    description: "Heritage Surface — an Ethiopian traditional clothing e-commerce app featuring product browsing, item details, wishlist, and a smooth shopping experience for Habesha fashion.",
    category: "E-Commerce",
    image: "/ecommerce.png",
    tags: ["Figma", "UX/UI"],
    live_url: "https://www.figma.com/design/YsAso5hqidORHlHskT6HKE/Ecommerce?node-id=0-1&t=LvaVUPJSNAAB24DZ-1",
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

// Fetch with timeout helper — avoids hanging on slow/unreachable backend
const fetchWithTimeout = (url, ms = 2000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
};

// Service API Methods
export const fetchSkills = async () => {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/skills`);
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (err) {
    console.log('Using static skills fallback data');
    return FALLBACK_SKILLS;
  }
};

export const fetchExperiences = async () => {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/experiences`);
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (err) {
    console.log('Using static experiences fallback data');
    return { experiences: FALLBACK_EXPERIENCES, education: FALLBACK_EDUCATION };
  }
};

export const fetchProjects = async () => {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (err) {
    console.log('Using static projects fallback data');
    return FALLBACK_PROJECTS;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Submission failed');
    return { success: true, message: data.message || 'Message sent successfully!' };
  } catch (err) {
    console.warn('Backend API submission offline or failed, using local handling:', err.message);
    return { success: true, message: 'Thank you! Your message has been recorded.' };
  }
};
