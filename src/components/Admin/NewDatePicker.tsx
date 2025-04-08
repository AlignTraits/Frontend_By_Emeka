import { useState } from 'react';

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
}

export default function DatePicker({ setShowModal, setEndDate, endDate }: ModalProps) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const today = new Date();
  const formattedToday = `${monthNames[today.getMonth()].slice(0, 3)} ${today.getDate()}, ${today.getFullYear()}`;

  const [startDate, setStartDate] = useState<string>(formattedToday);
  // const [endDate, setEndDate] = useState<string>(formattedToday);
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [nextMonth, setNextMonth] = useState<number>((today.getMonth() + 1) % 12);
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [activePreset, setActivePreset] = useState<string>('today');

  const [selectedStartDate, setSelectedStartDate] = useState<{ day: number, month: number, year: number }>({
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  });

  const [selectedEndDate, setSelectedEndDate] = useState<{ day: number, month: number, year: number }>({
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear()
  });

  const [_, setSelectionMode] = useState<'start' | 'end'>('start');

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const isDateInRange = (day: number, month: number, year: number) => {
    const currentDate = new Date(year, month, day);
    const start = new Date(selectedStartDate.year, selectedStartDate.month, selectedStartDate.day);
    const end = new Date(selectedEndDate.year, selectedEndDate.month, selectedEndDate.day);
    return currentDate >= start && currentDate <= end;
  };

  const isStartDate = (day: number, month: number, year: number) =>
    day === selectedStartDate.day && month === selectedStartDate.month && year === selectedStartDate.year;

  const isEndDate = (day: number, month: number, year: number) =>
    day === selectedEndDate.day && month === selectedEndDate.month && year === selectedEndDate.year;

  const renderCalendar = (year: number, month: number, calendarType: 'start' | 'end') => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <div key={`prev-${day}`} className="text-center py-1 text-gray-400">
          {day}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isInRange = isDateInRange(i, month, year);
      const isStart = isStartDate(i, month, year);
      const isEnd = isEndDate(i, month, year);

      let dayClass = "text-center py-1 cursor-pointer hover:bg-blue-100";

      if (isInRange) {
        dayClass = "text-center py-1 cursor-pointer bg-blue-100";
      }

      if (isStart || isEnd) {
        dayClass = "text-center py-1 cursor-pointer bg-[#004085] text-white rounded-full";
      }

      days.push(
        <div
          key={`current-${i}`}
          className={dayClass}
          onClick={() => handleDateClick(i, month, year, calendarType)}
        >
          {i}
        </div>
      );
    }

    const totalCells = 42;
    const remainingCells = totalCells - days.length;

    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className="text-center py-1 text-gray-400">
          {i}
        </div>
      );
    }

    return days;
  };

  const handleDateClick = (day: number, month: number, year: number, calendarType: 'start' | 'end') => {
    if (calendarType === 'start') {
      setSelectedStartDate({ day, month, year });
      setStartDate(`${monthNames[month].slice(0, 3)} ${day}, ${year}`);

      const newStartDate = new Date(year, month, day);
      const currentEndDate = new Date(selectedEndDate.year, selectedEndDate.month, selectedEndDate.day);

      if (newStartDate > currentEndDate) {
        setSelectedEndDate({ day, month, year });
        setEndDate(`${monthNames[month].slice(0, 3)} ${day}, ${year}`);
      }

      setSelectionMode('end');
    } else {
      const newEndDate = new Date(year, month, day);
      const currentStartDate = new Date(selectedStartDate.year, selectedStartDate.month, selectedStartDate.day);

      if (newEndDate >= currentStartDate) {
        setSelectedEndDate({ day, month, year });
        setEndDate(`${monthNames[month].slice(0, 3)} ${day}, ${year}`);
      } else {
        setSelectedEndDate(selectedStartDate);
        setEndDate(startDate);
        setSelectedStartDate({ day, month, year });
        setStartDate(`${monthNames[month].slice(0, 3)} ${day}, ${year}`);
      }

      setSelectionMode('start');
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setNextMonth(0);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
      setNextMonth(nextMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setNextMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
      setNextMonth(nextMonth + 1);
    }
  };

  const handlePresetDateRange = (preset: string) => {
    const today = new Date();
    let start = new Date();
    let end = new Date();
    setActivePreset(preset);

    switch (preset) {
      case 'today':
        break;
      case 'yesterday':
        start.setDate(start.getDate() - 1);
        end = new Date(start);
        break;
      case 'thisWeek':
        start.setDate(start.getDate() - start.getDay() + 1);
        break;
      case 'lastWeek':
        start.setDate(start.getDate() - start.getDay() - 6);
        end.setDate(end.getDate() - end.getDay());
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'lastMonth':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'thisYear':
        start = new Date(today.getFullYear(), 0, 1);
        break;
      case 'lastYear':
        start = new Date(today.getFullYear() - 1, 0, 1);
        end = new Date(today.getFullYear() - 1, 11, 31);
        break;
      case 'allTime':
        start = new Date(2000, 0, 1);
        break;
      default:
        break;
    }

    setSelectedStartDate({ day: start.getDate(), month: start.getMonth(), year: start.getFullYear() });
    setStartDate(`${monthNames[start.getMonth()].slice(0, 3)} ${start.getDate()}, ${start.getFullYear()}`);
    setSelectedEndDate({ day: end.getDate(), month: end.getMonth(), year: end.getFullYear() });
    setEndDate(`${monthNames[end.getMonth()].slice(0, 3)} ${end.getDate()}, ${end.getFullYear()}`);
    setCurrentMonth(start.getMonth());
    setNextMonth(start.getMonth() === 11 ? 0 : start.getMonth() + 1);
    setCurrentYear(start.getFullYear());
  };

  const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-2 w-full max-w-2xl">
        <div className="flex">
          <div className="w-1/4 border-r px-3 py-2 space-y-2">
            {[
              ['Today', 'today'],
              ['Yesterday', 'yesterday'],
              ['This week', 'thisWeek'],
              ['Last week', 'lastWeek'],
              ['This month', 'thisMonth'],
              ['Last month', 'lastMonth'],
              ['This year', 'thisYear'],
              ['Last year', 'lastYear'],
              ['All time', 'allTime'],
            ].map(([label, value]) => (
              <div
                key={value}
                className={`py-2 px-3 rounded cursor-pointer ${
                  activePreset === value
                    ? 'bg-[#F9FAFB] font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => handlePresetDateRange(value)}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between w-3/4 px-3 py-2">
            <div className="flex border-b">
              <div className="w-1/2 px-2">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={handlePrevMonth} className="text-gray-500 hover:text-gray-700">&lt;</button>
                  <div className="font-medium">{monthNames[currentMonth]} {currentYear}</div>
                  <div className="w-6"></div>
                </div>
                <div className="grid grid-cols-7 gap-4">
                  {weekdays.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500">{day}</div>
                  ))}
                  {renderCalendar(currentYear, currentMonth, 'start')}
                </div>
              </div>

                <div className="border-l border-gray-300"></div>

              <div className="w-1/2 px-2">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-6"></div>
                  <div className="font-medium">{monthNames[nextMonth]} {currentYear}</div>
                  <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-700">&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-4">
                  {weekdays.map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500">{day}</div>
                  ))}
                  {renderCalendar(currentYear, nextMonth, 'end')}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6 pt-4">
              <div className="flex space-x-2 items-center">
                <div className="border rounded p-2">{startDate}</div>
                <span className="text-gray-500">-</span>
                <div className="border rounded p-2">{endDate}</div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
                <button className="px-4 py-2 bg-[#004085] text-white rounded hover:bg-blue-700">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
