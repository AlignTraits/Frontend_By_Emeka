export const generateYearStrings = (startYear = 1970): string[] => {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];

  for (let year = startYear; year <= currentYear; year++) {
    years.push(year.toString());
  }

  return years;
}

export const YEARS = generateYearStrings();
export const JAMB_SCORE_lLIST = Array.from({ length: 101 }, (_, i) => i.toString());

export const SUBJECTS = [
  "English",
  "Mathematics",
  "Civic Education",
  "Physics",
  "Chemistry",
  "Biology",
  "Geography",
  "Economics",
  "Accounting",
  "Christian Religious Studies",
  "Islamic Religious Studies",
  "Marketing",
  "Government",
  "History",
  "Agricultural Science",
  "Computer Studies",
  "Information and communication Technology",
  "Fine Art",
  "Visual Arts",
  "Literature in English",
  "Business Studies",
  "Physical and Health Education",
  "Commerce",
  "Home Economics",
  "Further Mathematics",
  "Technical Drawing",
  "French",
  "Yourba",
  "Igbo",
  "Hausa",
  "Food and Nutrition",
  "Music",
  "Statistics",
  "Insurance",
  "Trade Subject",
  "Entrepreneurial Subject"
]


export const EXAMTYPE = [
  "JAMB",
  "UTME",
  "NECO",
  "GCE",
  "WAEC",
  "NABTEB",
  "A_LEVEL"
]

export const GRADES = [
  "A1",
  "B2",
  "B3",
  "C4",
  "C5",
  "C6",
  "D7",
  "E8",
  "F9"
]