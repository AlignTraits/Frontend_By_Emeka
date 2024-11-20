import React, { useState } from 'react';
import { Course } from '../../types/course.types';
import { FiStar,   FiSearch, FiX, FiChevronDown, FiSliders } from 'react-icons/fi';


interface CoursesProps {
  courses: Course[];
  isLoading: boolean;
  error: string | null;
}

interface FilterProps {
  courses: Course[];
  onFilterChange: (filteredCourses: Course[]) => void;
}



const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {[...Array(6)].map((_, index) => (
        <div 
          key={index} 
          className="bg-white border rounded-lg shadow-sm"
        >
          {/* Image skeleton */}
          <div className="w-full h-48 bg-gray-200 rounded-t-lg animate-pulse" />
          
          <div className="p-4 space-y-4">
            {/* Title and School skeleton */}
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
            
            {/* Rating and Country skeleton */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-8 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
                {/* Rating count */}
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              {/* Country */}
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Scholarship and Price skeleton */}
            <div className="flex items-center justify-between">
              <div className="w-24 h-6 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Button skeleton */}
            <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

const SortDropdown: React.FC<FilterProps> = ({ courses, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...courses];

    switch (value) {
      case 'name-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'scholarship':
        sorted.sort((a, b) => {
          const order = { full: 0, half: 1, none: 2 };
          return (order[a.scholarshipType as keyof typeof order] || 0) - 
                 (order[b.scholarshipType as keyof typeof order] || 0);
        });
        break;
      case 'no-scholarship':
        sorted.sort((a, b) => {
          const order = { none: 0, half: 1, full: 2 };
          return (order[a.scholarshipType as keyof typeof order] || 0) - 
                 (order[b.scholarshipType as keyof typeof order] || 0);
        });
        break;
      default:
        // Reset to original order
        sorted = courses;
    }

    onFilterChange(sorted);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 h-10 bg-white text-[#212121] font-[600] border border-[#007BFF66] rounded-lg hover:bg-gray-50"
      >
        <span>Sort By</span>
        <FiChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-white border rounded-lg shadow-lg p-2 z-20">
          {[
            { value: '', label: 'Default' },
            { value: 'name-asc', label: 'Name (A-Z)' },
            { value: 'name-desc', label: 'Name (Z-A)' },
            { value: 'rating', label: 'Rating' },
            { value: 'scholarship', label: 'Scholarship First' },
            { value: 'no-scholarship', label: 'No Scholarship First' }
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => {
                handleSort(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm rounded-md hover:bg-gray-50 ${
                sortBy === option.value ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Courses({ courses, isLoading, error }: CoursesProps) {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  React.useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  return (
    <div className="basis-[60%]">
      <div className="flex  items-center mb-6 gap-5">
        {!isLoading && (
          <div className="flex space-x-3">
            <FilterDropdown 
              courses={courses} 
              onFilterChange={setFilteredCourses} 
            />
            <SortDropdown 
              courses={filteredCourses} 
              onFilterChange={setFilteredCourses} 
            />
          </div>
        )}
        <h2 className="text-[#007BFF] text-2xl font-semibold">Career Opportunities:</h2>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

// Course Card Component
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const getScholarshipBadge = (type: 'full' | 'none' | number) => {
    const getScholarshipText = (type: 'full' | 'none' | number) => {
      if (type === 'full') return 'Full Scholarship';
      if (type === 'none') return 'No Scholarship';
      return `${type}% Scholarship`;
    };

    return (
      <div className="flex justify-end w-full">
        <span 
          className={`px-3 py-1 rounded-full text-sm font-semibold text-[#004085]`}
        >
          {getScholarshipText(type)}
        </span>
      </div>
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FiStar 
          key={`star-${i}`} 
          className="w-4 h-4 text-yellow-400 fill-current" 
        />
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <div key="half-star" className="relative">
          <FiStar className="w-4 h-4 text-gray-300 fill-current" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
          </div>
        </div>
      );
    }

    // Add empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FiStar 
          key={`empty-star-${i}`} 
          className="w-4 h-4 text-gray-300 fill-current" 
        />
      );
    }

    return stars;
  };

  return (
    <div className="bg-white border rounded-lg hover:border-[#00408540] transition-shadow cursor-pointer">
      {/* Course Image */}
      <div className="h-50 p-2">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="p-2 py-2 space-y-4">
        {/* Title and School */}
        <div>
          <h3 className="text-[16px] font-[500] text-[#333333]">
            {course.title}
          </h3>
        </div>

        {/* School and Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <img
                src={course.schoolLogo}
                alt={`${course.school} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[14px] text-[#101828] font-semibold">{course.school}</p>
          </div>
          
          <span className="text-[14px] font-[500] text-blue-600">
            {formatPrice(course.price)}
          </span>
        </div>

        {/* Rating and Scholarship */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            {/* Rating Number */}
            <span className="text-[14px] font-semibold text-[#004085]">
              {course.rating}
            </span>
            {/* Stars */}
            <div className="flex">
              {renderStars(course.rating)}
            </div>
            {/* Rating Count */}
            <span className="text-sm text-[#969696]">
              ({course.ratingCount.toLocaleString()})
            </span>
          </div>
          {getScholarshipBadge(course.scholarshipType)}
        </div>

        {/* Apply Button */}
        <div className="flex justify-center">
          <button
            className=" w-[70%] py-2 px-8 bg-[#004085] text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => console.log(`Applying for ${course.title}`)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

// Update FilterDropdown to remove sorting functionality
const FilterDropdown: React.FC<FilterProps> = ({ courses, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const countries = [...new Set(courses.map(course => course.country))].sort();

  React.useEffect(() => {
    const applyFilters = () => {
      let filtered = [...courses];

      if (searchTerm) {
        filtered = filtered.filter(course => 
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.school.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCountry) {
        filtered = filtered.filter(course => course.country === selectedCountry);
      }

      onFilterChange(filtered);
    };

    applyFilters();
  }, [searchTerm, selectedCountry, courses, onFilterChange]);

  return (
    <div className="relative filter-dropdown ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 h-10 bg-white border border-[#007BFF66] rounded-lg hover:bg-gray-50"
      >
        <FiSliders className="w-5 h-5 text-[#004085]" />
        <FiChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute  left-0 top-12 w-80 bg-white border rounded-lg  shadow-lg  p-4 z-20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Filter Location:</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Country Filter */}
          <div className="mb-4">
            
            <div className="max-h-48 overflow-y-auto">
              <div 
                className="cursor-pointer py-2 px-2 hover:bg-gray-50 rounded-md"
                onClick={() => setSelectedCountry('')}
              >
                <span className={selectedCountry === '' ? 'text-blue-600' : 'text-gray-700'}>
                  All Countries
                </span>
              </div>
              {countries.map((country) => (
                <div
                  key={country}
                  className="cursor-pointer py-2 px-2 hover:bg-gray-50 rounded-md"
                  onClick={() => setSelectedCountry(country)}
                >
                  <span className={selectedCountry === country ? 'text-blue-600' : 'text-gray-700'}>
                    {country}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCountry('');
            }}
            className="w-full py-2 text-sm text-blue-600 hover:text-blue-700"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
