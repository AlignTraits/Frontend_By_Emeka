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