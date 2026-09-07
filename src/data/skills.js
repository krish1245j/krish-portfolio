export const skillCategories = [
  {
    id: "backend",
    label: "Backend Development",
    items: [
      { name: "Node.js", context: "Runtime for every API Krish ships" },
      { name: "Express.js", context: "Routing, middleware, request handling" },
      { name: "REST APIs", context: "Resource-oriented, predictable endpoints" },
      { name: "Custom Middleware", context: "Auth checks, logging, validation" },
      { name: "RBAC", context: "Role-based route and action permissions" },
      { name: "JWT Authentication", context: "Stateless, signed session tokens" },
    ],
  },
  {
    id: "data",
    label: "Databases & Storage",
    items: [
      { name: "MongoDB", context: "Primary datastore across projects" },
      { name: "Mongoose", context: "Schema modeling and validation" },
      { name: "SQL", context: "Relational fundamentals" },
      { name: "Cloud Storage", context: "Object storage for uploaded assets" },
      { name: "File Uploads", context: "Multer-handled multipart data" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React.js", context: "Component-driven client interfaces" },
      { name: "Tailwind CSS", context: "Utility-first styling system" },
      { name: "HTML5", context: "Semantic structure" },
      { name: "CSS3", context: "Layout and animation" },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    items: [
      { name: "Docker", context: "Containerized, reproducible environments" },
      { name: "AWS EC2", context: "Compute for hosted services" },
      { name: "AWS S3", context: "Object storage at scale" },
      { name: "AWS IAM", context: "Fine-grained access permissions" },
    ],
  },
  {
    id: "architecture",
    label: "Architecture & Core Concepts",
    items: [
      { name: "MVC Architecture", context: "Separation of routes, logic, data" },
      { name: "Service Layer", context: "Business logic isolated from controllers" },
      { name: "API Security", context: "Authentication and input validation" },
      { name: "DSA", context: "100+ problems solved" },
      { name: "OOP", context: "Structured, reusable code design" },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    items: [
      { name: "Git", context: "Version control" },
      { name: "GitHub", context: "Source hosting and collaboration" },
      { name: "Postman", context: "API testing and documentation" },
      { name: "Vercel", context: "Frontend deployment" },
      { name: "Render", context: "Backend deployment" },
    ],
  },
];

// Relationships used to cross-highlight related skills on hover
export const skillRelations = {
  "JWT Authentication": ["RBAC", "API Security", "Custom Middleware"],
  RBAC: ["JWT Authentication", "API Security", "MVC Architecture"],
  "REST APIs": ["Express.js", "Node.js", "Postman", "API Security"],
  MongoDB: ["Mongoose", "SQL"],
  "Service Layer": ["MVC Architecture", "REST APIs"],
  "React.js": ["Tailwind CSS", "HTML5", "CSS3"],
  Docker: ["AWS EC2", "AWS IAM"],
};
