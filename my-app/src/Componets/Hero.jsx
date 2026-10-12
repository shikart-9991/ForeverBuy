import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const sliderData = [
  {
    subtitle: "OUR BESTSELLERS",
    title: "Latest Arrivals",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1470&auto=format&fit=crop",
  },
  {
    subtitle: "ADVENTURE AWAITS",
    title: "Winter Gear",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1374&auto=format&fit=crop",
  },
  {
    subtitle: "TRENDING NOW",
    title: "Summer Style",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1440&auto=format&fit=crop",
  },
  {
    subtitle: "NEW SEASON",
    title: "Autumn Collection",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1470&auto=format&fit=crop",
  },
  {
    subtitle: "LIMITED EDITION",
    title: "Exclusive Picks",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=1470&auto=format&fit=crop",
  },
  {
    subtitle: "TOP DEALS",
    title: "Up to 50% Off",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop",
  },
  {
    subtitle: "STYLE ESSENTIALS",
    title: "Everyday Wear",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470&auto=format&fit=crop",
  },
  {
    subtitle: "EDITOR'S CHOICE",
    title: "Premium Collection",
    img: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1470&auto=format&fit=crop",
  },
];


const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 h-[500px] overflow-hidden">

      {/* LEFT SIDE (CHANGES WITH SLIDE) */}
      <div className="w-full sm:w-1/2 flex items-center justify-center px-10">
        <div className="text-[#414141] transition-all duration-500">
          <div className="flex items-center gap-2 mb-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]" />
            <p className="font-medium text-sm md:text-base tracking-widest">
              {sliderData[activeIndex].subtitle}
            </p>
          </div>

          <h1 className="prata-regular text-3xl lg:text-5xl leading-relaxed">
            {sliderData[activeIndex].title}
          </h1>

          <div className="flex items-center gap-2 mt-4 cursor-pointer group">
            <p className="font-semibold text-sm md:text-base underline underline-offset-4">
              SHOP NOW
            </p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141] transition-all group-hover:w-16" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (IMAGE SLIDER) */}
      <div className="w-full sm:w-1/2">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full"
        >
          {sliderData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex items-center justify-center p-6">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};

export default Hero;
