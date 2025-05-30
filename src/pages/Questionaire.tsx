import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaLongArrowAltLeft } from "react-icons/fa";
import menuIcon from "../assets/androidMenu.svg"
import { questions } from "../data/questions";

export default function Questionaire() {
  const navigate = useNavigate()

  // const questions = [
  //   { id: 1, text: "What’s your name?" },
  //   { id: 2, text: "What’s your favorite color?" },
  //   { id: 3, text: "What’s your favorite food?" },
  // ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const question = questions[currentIndex];

  const next = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };


  return (
    <div className="relative h-screen w-full bg-[white]">
      <Header />

      <div className="flex gap-x-[10px] items-center ml-[30px] mt-[20px] cursor-pointer" onClick={() => navigate(-1)}>
        <FaLongArrowAltLeft className="text-[#004085]" />
        <p className="text-[#004085]">Back to Explore</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          // className="bg-white shadow p-6 rounded-xl"
        >
          <div className="mt-[20px] w-[800px] mx-auto flex items-center gap-x-[10px]">
            <img src={menuIcon} alt="menu" />
            <div>
              <p className="mb-[10px] w-[700px] text-[20px] text-[#757575] font-semibold">Question:</p>

              <div className="w-[700px] h-[300px] space-y-4 flex flex-col w-[500px] p-6 pl-[40px] bg-white rounded-lg shadow-lg border-[#ccc] border-[1px]">
                <p className="text-[#101828] text-[16px] font-semibold">{question.question}</p>

                <div className="flex flex-col space-y-4 ml-[30px]">
                  {
                    question.options.map((elem) => (
                      <div className="flex gap-x-[20px]">
                        <div className="cursor-pointer border-[#D0D5DD] border-[1px] h-[25px] w-[25px] rounded-[50%] flex justify-center items-center">
                          {
                            // selectedCourseList.includes(course.id) && 
                            // <div className="h-[15px] w-[15px] bg-[#004085] rounded-[50%]"></div>
                          }
                        </div>
                        <p className="text-[#101828] text-[16px] font-semibold">{elem.value}</p>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-center gap-4 w-full mx-auto">
        {
          !(currentIndex === 0) &&         
          <button
            onClick={prev}
            disabled={currentIndex === 0}
            className="w-[200px] px-4 py-2 bg-[#F6C648] text-[#101828] font-semibold text-[18px] rounded-xl disabled:opacity-50"
          >
            Back
          </button>
        }

        {
          !(currentIndex === questions.length - 1) &&
          <button
            onClick={next}
            disabled={currentIndex === questions.length - 1}
            className="w-[200px] px-4 py-2 bg-[#004085] text-white font-semibold text-[18px] rounded-xl disabled:opacity-50"
          >
            Next
          </button>
        }
      </div>

      <div className="h-[20px] w-[40px]"></div>
    </div>
  );
} 