/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import "../Components/Slider.css";

import dog1 from "../assets/dog-coat-1.jpg";
import dog2 from "../assets/dog-coat.jpg";
import dog3 from "../assets/dog-warm.jpg";
import dog4 from "../assets/dog-warm-2.jpg";
import cat1 from "../assets/cat-warm.jpg";
import cat2 from "../assets/cat-warm-2.jpg";
import cat3 from "../assets/cat-warm-3.jpg";
import cat5 from "../assets/cat-warm-4.jpg";

const SLIDE_TAGLINES = [
  "Find Your Furry Friend Today!",
  "Adopt, Don’t Shop — Give a Pet a Home.",
  "Because Every Pet Deserves Love and Care.",
  "Warm Coats for Your Loving Pets.",
  "Comfort Meets Cuteness for Every Pet.",
  "Keep Your Pet Cozy This Winter.",
  "Soft, Safe, and Stylish Pet Wear.",
  "Perfect Warmth for Your Perfect Friend.",
];

// typing effect hook
const useTypingEffect = (text) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text || typeof text !== "string") {
      setDisplayedText("");
      return;
    }

    const words = text.split(" ").filter(Boolean);
    let wordIndex = 0;
    let charIndex = 0;
    let finalOutput = "";

    setDisplayedText("");

    const interval = setInterval(() => {
      const currentWord = words[wordIndex];

      if (!currentWord) {
        clearInterval(interval);
        return;
      }

      const partial = currentWord.substring(0, charIndex + 1);

      const fullWordsSoFar =
        wordIndex === 0 ? "" : words.slice(0, wordIndex).join(" ") + " ";

      setDisplayedText(fullWordsSoFar + partial);

      charIndex++;

      if (charIndex >= currentWord.length) {
       
        wordIndex++;
        charIndex = 0;

        if (wordIndex >= words.length) {
          clearInterval(interval);
        }
      }
    }, 80);

    return () => clearInterval(interval);
  }, [text]);

  return displayedText;
};

function Slider() {
  const [activeSlide, setActiveSlide] = useState(0);

  const currentTagline =
    SLIDE_TAGLINES[activeSlide] ?? "";

  const typedTagline = useTypingEffect(currentTagline);

  return (
    <div className="relative w-full">

      <Swiper
        navigation
        pagination
        modules={[Navigation, Pagination]}
        onSlideChange={(swiper) => {
          const idx = swiper.activeIndex;
          if (idx >= 0 && idx < SLIDE_TAGLINES.length) {
            setActiveSlide(idx);
          }
        }}
        className="mySwiper"
      >
        <SwiperSlide><img className="w-full h-[500px] object-cover" src={cat5} /></SwiperSlide>
        <SwiperSlide><img className="w-full h-[500px] object-cover" src={dog1} /></SwiperSlide>
        <SwiperSlide><img className="w-full h-[500px] object-cover" src={cat1} /></SwiperSlide>
        <SwiperSlide><img className="w-full h-[500px] object-cover" src={dog2} /></SwiperSlide>
        <SwiperSlide><img className="w-full h-[500px] object-cover" src={cat2} /></SwiperSlide>
        <SwiperSlide><img className="w-full h-[500px] object-cover" src={dog3} /></SwiperSlide>
        <SwiperSlide><img className="w-full h-[500px] object-cover" src={cat3} /></SwiperSlide>
        <SwiperSlide><img className="w-full h-[500px] object-cover" src={dog4} /></SwiperSlide>
      </Swiper>

      <div className="absolute left-10 top-1/2 -translate-y-1/2 z-50 pointer-events-none w-[45%]">
        <h2 className="text-white text-3xl md:text-5xl font-bold leading-snug tagline">
          {typedTagline}
          <span className="typing-cursor">|</span>
        </h2>
      </div>

    </div>
  );
}

export default Slider;
