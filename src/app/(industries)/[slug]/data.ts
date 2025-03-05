export interface IndustryItem {
  key: string;
  href: string;
  icon: string;
  title: string;
  count: number;
}

export const INDUSTRIES: IndustryItem[] = [
  {
    key: "Marketing",
    href: "/marketing",
    title: "Marketing",
    icon: "solar:pie-chart-2-outline",
    count: 1,
  },
  {
    key: "Legal",
    href: "/legal",
    icon: "solar:chart-outline",
    title: "Legal",
    count: 1,
  },
  {
    key: "E-commerce",
    href: "/e-commerce",
    icon: "solar:gift-linear",
    title: "E-commerce",
    count: 3,
  },
  {
    key: "Healthcare",
    href: "/healthcare",
    icon: "solar:bill-list-outline",
    title: "Healthcare",
    count: 2,
  },
  {
    key: "Finance",
    href: "/finance",
    icon: "solar:settings-outline",
    title: "Finance",
    count: 1,
  },
];

export interface IndustryTool {
  title: string;
  description: string;
  category: string;
  image: string;
  slug: string;
  industry: string;
}

export const INDUSTRY_TOOLS: IndustryTool[] = [
  {
    title: "Marketing Analytics Dashboard",
    description: "Track and analyze your marketing campaigns with real-time data visualization.",
    category: "Marketing",
    image: "/image.jpg",
    slug: "marketing-analytics",
    industry: "marketing",
  },
  {
    title: "Legal Document Generator",
    description: "Generate legally compliant documents for your business needs.",
    category: "Legal",
    image: "/image.jpg",
    slug: "legal-document-generator",
    industry: "legal",
  },
  {
    title: "E-commerce Product Analyzer",
    description: "Analyze product performance and customer behavior for your online store.",
    category: "E-commerce",
    image: "/image.jpg",
    slug: "ecommerce-product-analyzer",
    industry: "e-commerce",
  },
  {
    title: "Healthcare Patient Portal",
    description: "Secure patient portal for managing healthcare information and appointments.",
    category: "Healthcare",
    image: "/image.jpg",
    slug: "healthcare-patient-portal",
    industry: "healthcare",
  },
  {
    title: "Financial Forecasting Tool",
    description: "Predict financial trends and make data-driven decisions for your business.",
    category: "Finance",
    image: "/image.jpg",
    slug: "financial-forecasting",
    industry: "finance",
  },
  {
    title: "Social Media Scheduler",
    description: "Schedule and manage your social media posts across multiple platforms.",
    category: "Marketing",
    image: "/image.jpg",
    slug: "social-media-scheduler",
    industry: "marketing",
  },
  {
    title: "Contract Management System",
    description: "Organize, track, and manage all your legal contracts in one place.",
    category: "Legal",
    image: "/image.jpg",
    slug: "contract-management",
    industry: "legal",
  },
  {
    title: "Inventory Management System",
    description: "Track inventory levels, orders, sales, and deliveries for your e-commerce business.",
    category: "E-commerce",
    image: "/image.jpg",
    slug: "inventory-management",
    industry: "e-commerce",
  },
];