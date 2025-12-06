import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import { Typewriter } from "react-simple-typewriter";

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

function Slider() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Swiper
        navigation
        pagination
        modules={[Navigation, Pagination]}
        onSlideChange={(swiper) => {
          const idx = swiper.activeIndex;
          setActiveSlide(idx);
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img className="w-full h-[500px] object-cover" src={cat5} />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-full">
            <img className="w-full h-[500px] object-cover" src={dog1} />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-full">
            <img className="w-full h-[500px] object-cover" src={cat1} />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img className="w-full h-[500px] object-cover" src={dog2} />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-full">
            <img className="w-full h-[500px] object-cover" src={cat2} />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-full">
            <img className="w-full h-[500px] object-cover" src={dog3} />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-full">
            <img className="w-full h-[500px] object-cover" src={cat3} />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-full">
            <img className="w-full h-[500px] object-cover" src={dog4} />
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className="absolute left-10 top-1/2 -translate-y-1/2 z-50 pointer-events-none w-[65%]">
        <h2 className="text-white text-3xl md:text-5xl font-bold leading-snug drop-shadow-xl">
          <Typewriter
            words={[SLIDE_TAGLINES[activeSlide]]}
            loop={false}
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1200}
            cursor
            cursorStyle="|"
          />
        </h2>
      </div>
    </div>
  );
}

export default Slider;
