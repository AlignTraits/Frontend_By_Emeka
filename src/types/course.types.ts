export interface  Course {
  id: string;
  title: string;
  image: string;
  school: string;
  schoolLogo: string;
  rating: number;
  ratingCount: number;
  scholarshipType: 'full' | 'none' | number;
  price: number;
  country: string;
  profile? : string
  scholarship?: string
  currency?: string

} 