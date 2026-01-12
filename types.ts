
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  images: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface ServiceItem {
  name: string;
  price: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  strengths: {
    title: string;
    description: string;
    icon: string;
  }[];
  portfolio: PortfolioItem[];
  processes: ProcessStep[];
  testimonials: Testimonial[];
  services: ServiceItem[];
  faqs: FAQItem[];
}

export interface InquiryFormData {
  name: string;
  contact: string;
  type: string;
  schedule: string;
  budget: string;
  message: string;
}
