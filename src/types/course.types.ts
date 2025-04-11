import { School } from "../services/schools";
export interface  Course {
  id: string;
  title: string;
  image: string;
  school: string;
  rating: number;
  ratingCount: number;
  scholarshipType: string;
  price: number;
  country: string;
  profile? : string
  scholarship?: string
  currency?: string
  university? : School
  programLevel: string
  duration: number;
  updatedAt: string
  durationPeriod: string;
  scholarshipInformation: string;
  loanInformation: string;
  courseWebsiteUrl: string;
  acceptanceFee: number;
  acceptanceFeeCurrency: string;
  courseDescription: string;
  programLocation: string;
  examType: string;
  courseDuration: string;
  coursePrice: number;
  courseAcceptanceFee: number;
  courseDurationPeriod: string;
  courseProgramLevel: string;
  courseLocation: string;
  courseExamType: string; 
  courseWebsite: string;
  website: string;
  schoolId: string;
} 

export interface  Loan {
  id: string;
  name: string;
  time: string;
  school: string;
  course: string;
  amount: number;
  status: string;
} 

export interface ErrorObjType {
  title: boolean;
  courseDescription: boolean;
  loanDescription: boolean;
  isScholarship: boolean;
  scholarshipDescription: boolean;
  website: boolean;
  acceptanceFee: boolean;
  coursePrice: boolean;
  previewUrl: boolean;
  courseDuration: boolean;
  programLevel: boolean;
  durationPeriod: boolean;
  programLocation: boolean;
  examType: boolean;
}

export interface RequirementList {
  id: number
  subjects: SubjectGrade[];
  location: string;
  examType: string
}
export interface SubjectGrade {
  id: number;
  subject: string;
  grade: string;
}

export interface Condition {
  examType: string;
  operator: 'or' | '+';
}

export interface Rule {
  ruleName: string;
  conditions: Condition[];
}