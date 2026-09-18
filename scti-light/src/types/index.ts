export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: 'Foundation' | 'Programming' | 'Design' | 'Advanced IT';
  level: 'Beginner' | 'Beginner to Intermediate' | 'Intermediate to Pro';
  duration: string;
  totalHours: string;
  mode: 'Lab Hands-on + Online' | '100% In-Person Lab' | 'Hybrid';
  badge?: string;
  featured: boolean;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  enrolledStudents: number;
  description: string;
  highlights: string[];
  tools: { name: string; iconName: string }[];
  syllabus: {
    moduleNumber: number;
    title: string;
    duration: string;
    topics: string[];
    handsOnProject: string;
  }[];
  careerOpportunities: string[];
  certificateType: string;
  nextBatchDate: string;
  scheduleOptions: string[];
}

export interface StudentCertificate {
  certificateId: string;
  studentName: string;
  courseName: string;
  grade: 'A+' | 'A' | 'Distinction';
  issueDate: string;
  duration: string;
  verificationStatus: 'Verified & Active' | 'Pending Verification';
  regNumber: string;
  centerCode: string;
  skillsMastered: string[];
}

export interface LabFeature {
  id: string;
  title: string;
  description: string;
  spec: string;
  icon: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  course: string;
  avatar: string;
  quote: string;
  rating: number;
  year: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Admission' | 'Certification' | 'Placements' | 'Fees';
}
