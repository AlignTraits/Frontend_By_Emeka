import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaLongArrowAltLeft } from "react-icons/fa";
import resetIcon from "../assets/recommedationIcon.svg"
import menuIcon from "../assets/androidMenu.svg"
import { questions } from "../data/questions";
import { BeatLoader } from "react-spinners";
import {toast} from 'react-toastify'
import { sendCareerPath } from "../services/utils";

type Answers = {
  [questionId: string]: string; // e.g., { q1: "blue", q2: "laptop" }
};

export default function Questionaire() {
  const navigate = useNavigate()

  // const questions = [
  //   { id: 1, text: "What’s your name?" },
  //   { id: 2, text: "What’s your favorite color?" },
  //   { id: 3, text: "What’s your favorite food?" },
  // ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const question = questions[currentIndex];
  const [showSignUpBtn, setShowSignUpBtn] = useState(false)
  const [answers, setAnswers] = useState<Answers>(() => {
    const stored = localStorage.getItem("questionnaire-answers");
    return stored ? JSON.parse(stored) : {};
  });
  const [isLoading, setIsLoading] = useState(false);

  // console.log("questions: ", questions)

  // console.log("answers: ", answers)

  function handleSelectAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  const next = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = async () => {
    // setShowSignUpBtn(true)
    // console.log("setShowSignUpBtn: ", setShowSignUpBtn)
    setIsLoading(true)

    let storedUserDetailsRaw = localStorage.getItem("pathway-data");
    let storedUserDetails: { firstName?: string; lastName?: string; email?: string } = {};

    if (storedUserDetailsRaw) {
      try {
        storedUserDetails = JSON.parse(storedUserDetailsRaw) || {};
      } catch {
        storedUserDetails = {};
      }
    }

    let answerArray: { question: string; answer: string }[] = [];

    questions.forEach((question) => {
      const answer = answers[question.id];
      if (answer) {
        answerArray.push({
          question: question.question,
          answer: answer,
        });
      }
    })

    const finalObject = {
      "answers": answerArray,
      "firstName": storedUserDetails.firstName || "",
      "lastName": storedUserDetails.lastName || "",
      "email": storedUserDetails.email || "",
    }

    try {
      setIsLoading(true)
      const response = await sendCareerPath(finalObject);

      console.log("response: ", response);
      if (response.ok === true) {
        setShowSignUpBtn(true)
      }

    } catch (e) {
      toast.error("An error occurred while submitting your answers. Please try again later.");
      console.error("Error submitting answers: ", e);
    } finally {
      setIsLoading(false)
    }

    setTimeout(() => {
      setIsLoading(false)
      toast.success("Your answers have been submitted successfully!");
    }, 2000)
  }

  function resetAnswers() {
    setAnswers({});
    localStorage.removeItem("questionnaire-answers");
    localStorage.removeItem("pathway-data");

    navigate("/signup");
  }

  useEffect(() => {
    localStorage.setItem("questionnaire-answers", JSON.stringify(answers));
  }, [answers]);


  return (
    <div className="relative h-screen w-full bg-[white]">
      <Header />

      {
        showSignUpBtn ?
        <div className='flex flex-col items-center bg-[white] p-[20px] gap-y-[20px] mt-10'>
          <div className=''>
            <img src={resetIcon} />
          </div>
          <p className='text-[#4C4E53]'>Great! we’ve matched you with a career path. Please sign up to view your result.</p>

          <button
            type="submit"
            // disabled={isLoading}
            onClick={() => resetAnswers()}
            className="w-[400px] h-[50px] mx-auto py-2 px-4 bg-[#004085] hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
          >
            {"Sign up"}
          </button>
        </div> :
        <>
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
                  <p className="mb-[10px] w-[700px] text-[20px] text-[#757575] font-semibold">Question {currentIndex + 1}/{questions.length}:</p>

                  <div className="w-[700px] h-[300px] space-y-4 flex flex-col w-[500px] p-6 pl-[40px] bg-white rounded-lg shadow-lg border-[#ccc] border-[1px]">
                    <p className="text-[#101828] text-[16px] font-semibold">{question.question}</p>

                    <div className="flex flex-col space-y-4 ml-[30px]">
                      {
                        question.options.map((elem) => (
                          <div className="flex gap-x-[20px]">
                            {/* <div className="cursor-pointer border-[#D0D5DD] border-[1px] h-[25px] w-[25px] rounded-[50%] flex justify-center items-center">
                              {
                                // selectedCourseList.includes(course.id) && 
                                // <div className="h-[15px] w-[15px] bg-[#004085] rounded-[50%]"></div>
                              }
                            </div> */}

                            <input
                              type="radio"
                              name={question.id}
                              value={elem.value}
                              checked={answers[question.id] === elem.value}
                              onChange={() => handleSelectAnswer(question.id, elem.value)}
                            />
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

            {
              (currentIndex === questions.length - 1) &&
              <button
                onClick={handleSubmit}
                // disabled={currentIndex === questions.length - 1}
                className="w-[200px] px-4 py-2 bg-[#004085] text-white font-semibold text-[18px] rounded-xl disabled:opacity-50"
              >
                { isLoading ? <BeatLoader /> : "Submit"}
              </button>
            }
          </div>

        </>

      }


      <div className="h-[20px] w-[40px]"></div>
    </div>
  );
} 