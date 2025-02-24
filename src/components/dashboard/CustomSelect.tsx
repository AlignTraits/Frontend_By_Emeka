import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  selectedProps?: {
    value: string,
    label: string
  }
}

const CustomSelect: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  selectedProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);
  const [dropUp, setDropUp] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
    onChange(option.value);
  };

  useEffect(() => {
    const checkDropdownPosition = () => {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        setDropUp(rect.bottom + 200 > windowHeight);
      }
    };

    if (isOpen) {
      checkDropdownPosition();
      window.addEventListener("resize", checkDropdownPosition);
    } else {
      window.removeEventListener("resize", checkDropdownPosition);
    }

    return () => window.removeEventListener("resize", checkDropdownPosition);
  }, [isOpen]);


  // This is applied when a default value is provided
  useEffect(() => {
    if (selectedProps) {
      setSelected(selectedProps)
    }
  }, [])

  return (
    <div ref={selectRef} className={`relative ${className}`}>
    
      <button
        type="button"
        className="w-full px-4 py-2 text-left bg-white p-2 rounded-md border-[0.8px] border-[#000000] focus:outline-none focus:ring-2 focus:ring-blue-200 capitalize"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected ? selected.label : placeholder}
        <FiChevronDown className="float-right mt-[1%]" />
      </button>

      
      {isOpen && (
        <ul
          className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto ${
            dropUp ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          {options.map((option, index) => (
            <li
              key={option.value +index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
