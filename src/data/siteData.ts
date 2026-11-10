export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  number: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  subtitle: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  name: string;
  role: string;
  description: string;
  skills: string[];
  portfolioUrl: string;
  image?: string;
}

export const siteData = {
  company: {
    name: "OneSiteStudios",
    shortName: "OneSiteStudios",
    tagline: "Building Digital Experiences That Move Businesses Forward.",
    description: "We design and engineer modern websites, applications, AI solutions, and custom software that turn ideas into scalable digital products.",
    eyebrow: "SOFTWARE • AI • DIGITAL PRODUCTS",
    availableForProjects: true
  },
  
  contact: {
    phone: "+91 9353981311",
    phoneUrl: "919353981311", // WhatsApp formatted number
    email: "contact.onesitestudios@gmail.com",
    location: "Bengaluru, Karnataka, India",
    whatsappDefaultMessage: "Hi OneSiteStudios, I would like to discuss a software project.",
    // Web3Forms access key to receive leads at contact.onesitestudios@gmail.com
    web3formsAccessKey: "6ad42536-ba3f-4b69-8031-62337e01bc30"
  },
  
  socials: {
    linkedin: "http://www.linkedin.com/in/onesitestudios-47405a437",
    twitter: "https://x.com/onesitestudios",
    instagram: "https://www.instagram.com/onesitestudios.in/"
  },
  
  technologies: [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
    "Three.js",
    "MongoDB",
    "MySQL",
    "AWS",
    "Docker",
    "Git"
  ],
  
  services: [
    {
      id: "web-dev",
      number: "01",
      title: "Web Development",
      description: "High-performance websites and web applications built for modern businesses."
    },
    {
      id: "erp-management",
      number: "02",
      title: "ERP & Management Systems",
      description: "Custom-built management systems for schools, colleges, institutions, and growing businesses."
    },
    {
      id: "mobile-apps",
      number: "03",
      title: "Mobile Applications",
      description: "Modern mobile experiences designed for Android and iOS devices."
    },
    {
      id: "custom-software",
      number: "04",
      title: "Custom Software",
      description: "Tailored business software designed around your unique operating processes."
    },
    {
      id: "ui-ux",
      number: "05",
      title: "UI/UX Design",
      description: "User interfaces that seamlessly combine clarity, usability, and visual impact."
    },
    {
      id: "e-commerce",
      number: "06",
      title: "E-Commerce",
      description: "Scalable online stores engineered to convert visitors into loyal customers."
    },
    {
      id: "saas-dev",
      number: "07",
      title: "SaaS Development",
      description: "Scalable software-as-a-service products from initial MVP to high production."
    },
    {
      id: "automation",
      number: "08",
      title: "Automation",
      description: "Automate repetitive workflows and drastically improve operational efficiency."
    },
    {
      id: "iot",
      number: "09",
      title: "IoT",
      description: "Connected devices, smart sensor networks, real-time telemetry, and edge-to-cloud integrations."
    }
  ] as ServiceItem[],
  
  servicesVisual: {
    centralNode: "OneSiteStudios Core",
    categories: [
      { name: "WEB", description: "Vite, React, Next.js, high-speed single page apps, SEO optimized architectures." },
      { name: "AI", description: "LLM integration, agentic workflows, custom vector databases, model fine-tuning." },
      { name: "MOBILE", description: "React Native, iOS & Android apps, smooth animations, native device features." },
      { name: "CLOUD", description: "AWS deployments, Docker containerization, serverless pipelines, high availability." },
      { name: "DATA", description: "MongoDB, MySQL, PostgreSQL, high throughput databases, analytical pipelines." },
      { name: "AUTOMATION", description: "CI/CD pipelines, automated scripts, API integrations, workflow tools." }
    ]
  },
  
  about: {
    headline: "WE TURN IDEAS INTO DIGITAL PRODUCTS.",
    content: "We help startups, entrepreneurs, and growing businesses transform ideas into reliable digital experiences. From websites and mobile applications to AI-powered software, we combine design, engineering, and modern technology to build products that solve real problems.",
    principles: [
      {
        number: "01",
        title: "Strategy",
        description: "Aligning product concepts with key business metrics and scalability roadmaps."
      },
      {
        number: "02",
        title: "Design",
        description: "Crafting beautiful, accessible, and intuitive visual interfaces that users love."
      },
      {
        number: "03",
        title: "Engineering",
        description: "Writing high-quality, typed, secure, and clean code that is built to perform."
      }
    ]
  },
  
  projects: [
    {
      id: "project-1",
      title: "Rubie Trends",
      subtitle: "E-Commerce Platform",
      description: "A fast-loading, dynamic storefront built for high volume transactions with advanced filtering.",
      tags: ["React", "Node.js", "MySQL", "Tailwind"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: "project-2",
      title: "AI Assistant",
      subtitle: "AI Productivity Platform",
      description: "A smart workspace integrating state-of-the-art LLMs with real-time vector search embeddings.",
      tags: ["React", "Python", "AI APIs", "FastAPI"],
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: "project-3",
      title: "BusinessOS",
      subtitle: "Business Management Dashboard",
      description: "Enterprise panel that brings all team analytics, reports, and customer pipelines together.",
      tags: ["React", "Node.js", "MongoDB", "Express"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ] as ProjectItem[],
  
  process: [
    {
      number: "01",
      title: "DISCOVER",
      description: "Understand the business target, user behaviors, and clear project goals."
    },
    {
      number: "02",
      title: "STRATEGIZE",
      description: "Define software architecture, product roadmap, and core features backlog."
    },
    {
      number: "03",
      title: "DESIGN",
      description: "Establish the complete digital design system, UI screens, and user workflows."
    },
    {
      number: "04",
      title: "DEVELOP",
      description: "Code the frontend and backend using modern, reliable tech stacks."
    },
    {
      number: "05",
      title: "TEST",
      description: "Perform end-to-end testing for performance, security, and responsive layouts."
    },
    {
      number: "06",
      title: "LAUNCH",
      description: "Deploy to production, optimize infrastructure, and continuously update."
    }
  ],
  
  pricing: [
    {
      id: "pricing-starter",
      name: "STARTER",
      price: "₹14,999",
      subtitle: "Best for small businesses, personal brands, and local services.",
      features: [
        "Fully Responsive Web Layout",
        "Modern and Professional UI",
        "Direct WhatsApp Click-to-Chat",
        "Google Maps Embed Integration",
        "Social Media Profile Connectivity",
        "Production Deployment Support"
      ],
      cta: "Start a Project"
    },
    {
      id: "pricing-professional",
      name: "PROFESSIONAL",
      price: "₹49,000",
      subtitle: "Best for growing businesses, complex landing pages, and web apps.",
      features: [
        "Everything in Starter plan",
        "Advanced Sections & Copywriting",
        "Custom SVG Micro-animations",
        "Interactive Contact Form Submissions",
        "Third-party API Integrations",
        "Advanced Custom Functionality"
      ],
      cta: "Discuss Your Project",
      popular: true
    },
    {
      id: "pricing-custom",
      name: "CUSTOM",
      price: "Let's Talk",
      subtitle: "Best for custom AI solutions, complex SaaS tools, and e-commerce.",
      features: [
        "Custom AI/LLM Workflows",
        "SaaS Platforms from MVP to Scale",
        "Custom Software Engineering",
        "Advanced E-Commerce Architectures",
        "Secure Payment Gateway Integrations",
        "Dedicated Continuous Development Support"
      ],
      cta: "Contact Us"
    }
  ] as PricingPlan[],
  
  testimonials: [] as TestimonialItem[],
  
  
  portfolios: [
    {
      id: "portfolio-prakash",
      name: "Prakash Gouda",
      role: "Full Stack Developer",
      description: "Experienced full-stack developer specializing in modern web technologies, responsive design, and interactive user experiences.",
      skills: ["React", "TypeScript", "Node.js", "Three.js", "Tailwind CSS", "MongoDB"],
      portfolioUrl: "https://prakashgouda-ind.netlify.app/"
    }
  ] as PortfolioItem[]
};
