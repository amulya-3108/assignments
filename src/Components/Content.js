import React from "react";
import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import AllInfo from "./showInfo";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

function Content() {
  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 1100,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center flex-col">
        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="max-w-[90%] lg:max-w-[80%]">
          {languages.map((item) => (
            <SwiperSlide key={item.name}>
              <motion.div
                className="flex flex-col gap-6 mt-5 mb-10 group relative shadow-lg rounded-xl px-6 py-8 h-[250px] w-[215px] lg:h-[500px] lg:w-[380px] overflow-hidden cursor-pointer"
                animate={{ x: [-100, 0] }}
                transition={{
                  type: "spring",
                  repeat: Infinity,
                  duration: 5,
                  ease: "linear",
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center blur-sm"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                <div className="absolute inset-0 bg-black opacity-10 group hover:opacity-50" />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}>
                </motion.div>
                <div className="relative flex flex-col gap-3 pt-64">
                  <h1 className="text-xl lg:text-3xl text-black font-bold">
                    {item.name}
                  </h1>
                  <p className="lg:text-[18px] text-black font-semibold">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <AllInfo />
      <div className="w-4/5 m-auto mt-20 mb-14">
        <Slider {...settings}>
          {languages.map((d, index) => (
            <div
              key={index}
              className="bg-black h-[450px] gap-8 text-white rounded-xl">
              <div className="h-56 rounded-t-xl bg-blue-600 flex justify-center items-center">
                <img
                  src={d.img}
                  alt="sliding images"
                  className="h-44 w-44 rounded-full my-5"
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-2xl font-bold">{d.name}</p>
                <p className="font-normal w-5/6">{d.desc}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="pt-10">
        <div className="max-w-6xl mx-auto px-20">
          <h1 className="text-5xl font-semibold mb-9 text-center">
            Work done easily
          </h1>
          <div className="mt-20 mb-12">
            {steps.map((step, index) => (
              <motion.div
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}
                key={index}
                className={`md:flex items-center ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                } mb-40`}>
                <div className="md:w-1/2 text-center md:text-left mb-4 md:mb-0">
                  <div className="text-3xl text-green-600 mb-4 font-semibold">
                    {step.number}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{step.title}</h3>
                  <p className="text-2xl">{step.description}</p>
                </div>
                <div className="md:w-1/2 relative w-64 h-64 bg-opacity-50">
                  <img
                    src={step.img}
                    alt={step.title}
                    className="mx-auto h-80 absolute inset-0 w-full object-cover dshd"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-5">
        <div className="p-6">
          <h1 className="text-4xl font-semibold mb-5 text-center">
            Download Our App
          </h1>
          <p className="text-2xl mb-8 text-center">
            Scan the QR code below to download our app. Available on both iOS
            and Android.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center mb-4">
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <img
                src="../images/smartmockups_lwv3xtn9.jpg"
                alt=""
                className="mx-auto h-80"
              />
              <span className="mt-2 text-lg">Download for iOS</span>
            </div>
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <img
                src="../images/smartmockups_lwv3xtn9.jpg"
                alt=""
                className="mx-auto h-80"
              />
              <span className="mt-2 text-lg">Download for Android</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const steps = [
  {
    number: "Step 1",
    img: "../images/step-1.png",
    title: "Upload Work",
    description:
      "Just plug in skills, experience, and more and instantly see a set of candidates matching your needs.",
  },
  {
    number: "Step 2",
    img: "../images/step-2.png",
    title: "Accept or Reject Work",
    description:
      "Save and share talent profiles you find on your own, or choose from candidates we hand-select for you.",
  },
  {
    number: "Step 3",
    img: "../images/step-3.png",
    title: "Download and Feedback",
    description:
      "When you’re ready to hire, we manage contracts, billing, and ensure smooth onboarding to your project.",
  },
  {
    number: "Step 4",
    img: "../images/step-4.png",
    title: "Give Feedback",
    description:
      "Your dedicated success manager is there to ensure every aspect of your project exceeds expectations.",
  },
];

const languages = [
  {
    name: "Web Development",
    img: "../images/webdevelopment.jpg",
    desc: "Web development involves creating and maintaining websites, encompassing aspects like web design, web publishing, web programming, and database management.",
  },
  {
    name: "Social media marketing",
    img: "../images/socialmedia.jpg",
    desc: "Social media marketing involves using social media platforms to promote products, services, or brands, engaging with audiences to drive traffic and sales.",
  },
  {
    name: "Health Care",
    img: "../images/healthcare.jpg",
    desc: "Health care encompasses the diagnosis, treatment, and prevention of illnesses, as well as the maintenance and improvement of physical and mental well-being through medical services.",
  },
  {
    name: "Mobile Solution",
    img: "../images/mobilesolution.jpg",
    desc: "A mobile solution refers to applications and services designed for mobile devices to enhance user experience, streamline operations, and provide on-the-go accessibility for various tasks.",
  },
];
export default Content;
