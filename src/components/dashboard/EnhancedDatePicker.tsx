import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ChevronDown } from 'lucide-react';

interface EnhancedDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  onFocus?: () => void;
  dateFormat?: string;
}

const EnhancedDatePicker: React.FC<EnhancedDatePickerProps> = ({
  selected,
  onChange,
  placeholder = "Select date",
  className = "",
  onFocus,
  dateFormat = "dd/MM/yyyy"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(selected ? selected.getMonth() : new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(selected ? selected.getFullYear() : new Date().getFullYear());
  const [showYearSelector, setShowYearSelector] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Generate year options (from 1900 to current year + 10)
  const currentYearActual = new Date().getFullYear();
  const yearOptions = Array.from({ length: currentYearActual - 1900 + 11 }, (_, i) => 1900 + i).reverse();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowYearSelector(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    if (dateFormat === "dd/MM/yyyy") {
      return `${day}/${month}/${year}`;
    }
    return date.toLocaleDateString();
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onChange(newDate);
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleYearSelect = (year: number) => {
    setCurrentYear(year);
    setShowYearSelector(false);
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = selected && 
        date.getDate() === selected.getDate() &&
        date.getMonth() === selected.getMonth() &&
        date.getFullYear() === selected.getFullYear();

      const isToday = 
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`w-8 h-8 rounded-full text-sm font-medium transition-colors
            ${isSelected 
              ? 'bg-blue-600 text-white' 
              : isToday 
                ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="relative w-[100%]" ref={dropdownRef}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          onFocus && onFocus();
        }}
        className={`h-10 w-full flex items-center justify-between border rounded-md px-3 bg-white cursor-pointer hover:border-gray-400 transition-colors ${className}`}
      >
        <span className={`text-sm ${selected ? 'text-gray-900' : 'text-gray-500'}`}>
          {selected ? formatDate(selected) : placeholder}
        </span>
        <Calendar className="h-5 w-5 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute bottom-full left-0 mt-1 w-80 bg-white border rounded-lg shadow-lg z-50 p-4">
          {/* Header with month/year navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePrevMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">
                {months[currentMonth]}
              </span>
              <div className="relative">
                <button
                  onClick={() => setShowYearSelector(!showYearSelector)}
                  className="flex items-center gap-1 px-2 py-1 text-lg font-semibold text-gray-900 hover:bg-gray-100 rounded transition-colors"
                >
                  {currentYear}
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showYearSelector && (
                  <div className="absolute top-full right-0 mt-1 w-24 max-h-48 bg-white border rounded-md shadow-lg overflow-y-auto z-10">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className={`w-full px-3 py-2 text-sm text-left hover:bg-gray-100 transition-colors
                          ${year === currentYear ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}
                        `}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={handleNextMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {renderDays()}
          </div>

          {/* Quick year selection buttons */}
          <div className="flex justify-center gap-2 mt-4 pt-3 border-t">
            <button
              onClick={() => {
                const today = new Date();
                setCurrentMonth(today.getMonth());
                setCurrentYear(today.getFullYear());
              }}
              className="px-3 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => {
                onChange(null);
                setIsOpen(false);
              }}
              className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 rounded transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDatePicker;
