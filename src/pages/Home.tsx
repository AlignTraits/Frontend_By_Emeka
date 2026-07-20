// import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import AlignTraitBanner from "../assets/aligntraits-banner.svg";
import Confetti from "../assets/confetti.svg";
// import Study from "../assets/study.svg";
// import Glove from "../assets/Glove.svg";
// import DirectionArrow from "../assets/DirectionArrow.svg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#001833] text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">
        <img
          src={AlignTraitBanner}
          alt="AlignTraits"
          className="w-[280px] md:w-[360px] mb-8"
        />

        <h1 className="text-4xl md:text-6xl font-semibold leading-tight max-w-4xl">
          Discover Your True Career Path with{" "}
          <span className="text-[#F6C648]">AlignTraits</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-[#E0E0E0] max-w-2xl">
          Take a quick personality & aptitude assessment. Get personalized
          course and career recommendations from top universities — designed
          specifically for you.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/assessment")}
            className="bg-[#F6C648] hover:bg-[#f5b92e] text-[#001833] font-semibold px-10 py-4 rounded-full text-lg flex items-center gap-3 transition-all"
          >
            Start Free Assessment
            <FiArrowRight className="text-xl" />
          </button>

          <button
            onClick={() => navigate("/login")}
            className="border border-white/60 hover:bg-white/10 font-medium px-8 py-4 rounded-full text-lg transition-all"
          >
            Login
          </button>
        </div>

        <img
          src={Confetti}
          alt=""
          className="absolute top-12 right-12 hidden xl:block w-24 opacity-80"
        />
      </div>

      {/* How It Works */}
      <div className="bg-white text-[#001833] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-4xl font-semibold mb-4">
            How AlignTraits Works
          </h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-xl mx-auto">
            From confusion to clarity in just a few steps
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-[#F6C648] rounded-2xl flex items-center justify-center text-4xl mb-6">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Take the Assessment
              </h3>
              <p className="text-gray-600">
                Answer simple questions about your personality, strengths,
                interests, and values.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-[#F6C648] rounded-2xl flex items-center justify-center text-4xl mb-6">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-3">Get Matched</h3>
              <p className="text-gray-600">
                Receive personalized course and career recommendations based on
                your unique traits.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-[#F6C648] rounded-2xl flex items-center justify-center text-4xl mb-6">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                Choose with Confidence
              </h3>
              <p className="text-gray-600">
                Explore top universities offering your best-fit courses and make
                informed decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="py-20 px-6 bg-[#001833]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-6">
            Why Thousands Trust AlignTraits
          </h2>

          <div className="grid sm:grid-cols-2 gap-8 mt-12 text-left">
            <div className="flex gap-4">
              <FiCheckCircle className="text-[#F6C648] text-3xl mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-medium">Save Time & Money</h4>
                <p className="text-[#E0E0E0] mt-2">
                  Stop guessing. Get data-driven recommendations before spending
                  years on the wrong course.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FiCheckCircle className="text-[#F6C648] text-3xl mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-medium">Match Your Personality</h4>
                <p className="text-[#E0E0E0] mt-2">
                  Courses and careers that align with who you truly are — not
                  just what’s popular.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FiCheckCircle className="text-[#F6C648] text-3xl mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-medium">Real University Options</h4>
                <p className="text-[#E0E0E0] mt-2">
                  See actual programs from real universities that match your
                  strengths.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <FiCheckCircle className="text-[#F6C648] text-3xl mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-xl font-medium">Career Clarity</h4>
                <p className="text-[#E0E0E0] mt-2">
                  Understand what jobs you’ll love and excel in after
                  graduation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-br from-[#F6C648] to-[#f5b92e] py-20 text-center text-[#001833]">
        <h2 className="text-4xl font-bold mb-4">Ready to Find Your Path?</h2>
        <p className="text-xl mb-8 max-w-md mx-auto">
          Join thousands of students making confident education decisions.
        </p>
        <button
          onClick={() => navigate("/assessment")}
          className="bg-[#001833] text-white font-semibold text-xl px-12 py-5 rounded-full hover:bg-black transition-all"
        >
          Start Your Free Assessment
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-[#001833] text-[#E0E0E0] py-12 text-center border-t border-white/10">
        <p>© {new Date().getFullYear()} AlignTraits. All rights reserved.</p>
      </footer>
    </div>
  );
}
