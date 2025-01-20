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
} 