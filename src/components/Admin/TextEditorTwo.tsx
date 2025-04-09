import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Bold, Italic, Underline, Type, AlignLeft, AlignCenter, AlignRight, Link2, Image, ListOrdered, List } from 'lucide-react';

interface TextEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
}

export default function TextEditor({ 
  initialContent = '', 
  onContentChange 
}: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState<string>('16px');
  const [placeholderVisible, setPlaceholderVisible] = useState<boolean>(true);
  // const [content, setContent] = useState<string>(initialContent);

  // Function to handle formatting commands
  const handleFormat = (command: string, value: string | null = null): void => {
    document.execCommand(command, false, value ?? undefined);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Handle content change
  const handleContentChange = (): void => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      // setContent(newContent);
      
      // Hide placeholder if there's content
      setPlaceholderVisible(newContent.trim() === '');
      
      // Call the callback if provided
      if (onContentChange) {
        onContentChange(newContent);
      }
    }
  };

  // Handle font size change
  const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const size = e.target.value;
    setFontSize(`${size}px`);
    handleFormat('fontSize', getSizeNumber(size));
  };

  // Map font size to execCommand fontSize values (1-7)
  const getSizeNumber = (size: string): string => {
    const sizeMap: Record<string, number> = {
      '12': 1,
      '14': 2,
      '16': 3,
      '18': 4,
      '24': 5,
      '32': 6,
      '48': 7
    };
    return String(sizeMap[size] || 3);
  };

  // Handle heading change
  const handleHeading = (level: number): void => {
    handleFormat('formatBlock', `h${level}`);
  };

  // Handle focus on editor
  const handleFocus = (): void => {
    if (placeholderVisible && editorRef.current) {
      // Don't clear the editor if it already has content
      if (!editorRef.current.innerHTML.trim()) {
        editorRef.current.innerHTML = '';
      }
    }
  };

  // Handle blur on editor
  const handleBlur = (): void => {
    handleContentChange();
  };

  // Set up mutation observer to track content changes
  useEffect(() => {
    if (editorRef.current) {
      // Create a MutationObserver to track changes
      const observer = new MutationObserver(handleContentChange);
      
      // Start observing
      observer.observe(editorRef.current, {
        characterData: true,
        childList: true,
        subtree: true,
        attributes: true
      });
      
      // Clean up
      return () => observer.disconnect();
    }
  }, []);

  // Initialize with initial content
  useEffect(() => {
    if (initialContent && editorRef.current) {
      editorRef.current.innerHTML = initialContent;
      setPlaceholderVisible(false);
    }
  }, [initialContent]);

  // Track keyboard input as well
  const handleKeyUp = (): void => {
    handleContentChange();
  };

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm">
      <div className="border border-gray-300 rounded-md">
        <div className="border-b border-gray-300 p-2">
          <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 pb-2">
            <div className="flex items-center space-x-1 mr-2">
              <button 
                className="p-1 hover:bg-gray-100 rounded" 
                onClick={() => handleFormat('bold')}
                type="button"
              >
                <Bold size={18} className="text-gray-700" />
              </button>
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleFormat('italic')}
                type="button"
              >
                <Italic size={18} className="text-gray-700" />
              </button>
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleFormat('underline')}
                type="button"
              >
                <Underline size={18} className="text-gray-700" />
              </button>
            </div>
            
            <div className="flex items-center border-l border-gray-200 pl-2 mr-2">
              <div className="relative">
                <select 
                  className="appearance-none bg-transparent pr-6 pl-1 py-1 text-sm focus:outline-none"
                  value={fontSize.replace('px', '')}
                  onChange={handleFontSizeChange}
                >
                  <option value="12">12</option>
                  <option value="14">14</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                  <option value="24">24</option>
                </select>
                <Type size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            
            <div className="flex items-center border-l border-gray-200 pl-2 mr-2">
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleFormat('justifyLeft')}
                type="button"
              >
                <AlignLeft size={18} className="text-gray-700" />
              </button>
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleFormat('justifyCenter')}
                type="button"
              >
                <AlignCenter size={18} className="text-gray-700" />
              </button>
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleFormat('justifyRight')}
                type="button"
              >
                <AlignRight size={18} className="text-gray-700" />
              </button>
            </div>
            
            <div className="flex items-center border-l border-gray-200 pl-2 mr-2">
              <button 
                className="flex items-center p-1 hover:bg-gray-100 rounded text-sm"
                onClick={() => handleHeading(1)}
                type="button"
              >
                <span className="font-semibold mr-1">H</span><span className="text-xs">1</span>
              </button>
              <button 
                className="flex items-center p-1 hover:bg-gray-100 rounded text-sm"
                onClick={() => handleHeading(2)}
                type="button"
              >
                <span className="font-semibold mr-1">H</span><span className="text-xs">2</span>
              </button>
              <button 
                className="flex items-center p-1 hover:bg-gray-100 rounded text-sm"
                onClick={() => handleHeading(3)}
                type="button"
              >
                <span className="font-semibold mr-1">H</span><span className="text-xs">3</span>
              </button>
              <button 
                className="flex items-center p-1 hover:bg-gray-100 rounded text-sm"
                onClick={() => handleHeading(4)}
                type="button"
              >
                <span className="font-semibold mr-1">H</span><span className="text-xs">4</span>
              </button>
              <button 
                className="flex items-center p-1 hover:bg-gray-100 rounded text-sm"
                onClick={() => handleHeading(5)}
                type="button"
              >
                <span className="font-semibold mr-1">H</span><span className="text-xs">5</span>
              </button>
            </div>
            
            <div className="flex items-center border-l border-gray-200 pl-2 mr-2">
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleFormat('insertOrderedList')}
                type="button"
              >
                <ListOrdered size={18} className="text-gray-700" />
              </button>
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => handleFormat('insertUnorderedList')}
                type="button"
              >
                <List size={18} className="text-gray-700" />
              </button>
            </div>
            
            <div className="flex items-center border-l border-gray-200 pl-2">
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => {
                  const url = prompt('Enter URL:');
                  if (url) handleFormat('createLink', url);
                }}
                type="button"
              >
                <Link2 size={18} className="text-gray-700" />
              </button>
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                onClick={() => {
                  alert('Image upload feature would be implemented here');
                }}
                type="button"
              >
                <Image size={18} className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-2 relative">
          <div
            ref={editorRef}
            contentEditable="true"
            className="w-full min-h-32 p-2 focus:outline-none border border-transparent text-gray-700 overflow-y-auto"
            style={{ minHeight: '8rem' }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
          />
          {placeholderVisible && (
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
              Describe the main objectives of this course.....
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        What students will learn and achieve by completing this course.
      </div>
    </div>
  );
}