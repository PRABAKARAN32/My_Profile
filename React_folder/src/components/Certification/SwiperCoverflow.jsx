import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "./SwiperCoverflow.css"; // Import the CSS file

const SwiperCoverflow = ({ certificates }) => {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(certificates.length / 2),
  );
  const [showModal, setShowModal] = useState(false); // Manage modal visibility
  const [currentImage, setCurrentImage] = useState(null); // Track the current image
  const swiperRef = React.useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        // Standard mobile breakpoint
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile); // Update on resize

    return () => window.removeEventListener("resize", checkMobile); // Cleanup on unmount
  }, []);

  // Pause auto-play while the modal is open, resume once it closes
  useEffect(() => {
    const swiper = swiperRef.current?.swiper;
    if (!swiper?.autoplay) return;

    if (showModal) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  }, [showModal]);

  // Handle image click: Center the clicked image and show modal
  const handleClick = (index, img) => {
    if (!isMobile) {
      // Only trigger the modal if not on mobile
      setActiveIndex(index); // Update active index
      setCurrentImage(img); // Set the clicked image for the modal
      setShowModal(true); // Show the modal
      if (swiperRef.current) {
        swiperRef.current.swiper.slideToLoop(index); // Programmatically move Swiper to the clicked image
      }
    }
  };

  // Handle clicking outside of the modal to close it
  const handleOutsideClick = () => {
    setShowModal(false); // Close the modal (keep the centered slide highlighted)
  };

  return (
    <div onClick={handleOutsideClick}>
      <Swiper
        modules={[Autoplay]}
        centeredSlides={true}
        slidesPerView={"auto"}
        spaceBetween={60}
        loop={true} // Endless carousel so the auto-play never dead-ends
        speed={900} // Smooth, slower glide between slides
        autoplay={{
          delay: 2500, // Advance every 2.5s
          disableOnInteraction: false, // Keep moving after the user drags
          pauseOnMouseEnter: true, // Pause the whole carousel while hovered
        }}
        initialSlide={activeIndex} // Start from the middle image
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex); // Track the real (un-looped) index
        }}
        className="swiper-container"
        ref={swiperRef}
      >
        {certificates.map((cert, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from propagating to the modal background
                handleClick(index, cert.img);
              }}
              className={`cert-card transition-all duration-500 ease-in-out cursor-pointer rounded-xl overflow-hidden mx-auto ${
                index === activeIndex
                  ? "cert-card--active scale-[1.1] z-20 opacity-100"
                  : "scale-95 opacity-50"
              }`}
              style={{
                width: "100%",
                maxWidth: "440px", // Cap width; stays responsive on small screens
                aspectRatio: "16 / 9", // Uniform card shape for every certificate
                backgroundImage: `url(${cert.img})`,
                backgroundSize: "100% 100%", // Stretch the full image to fill the card exactly
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundColor: "#0d0b1e",
                boxShadow:
                  index === activeIndex
                    ? "0 0 30px rgba(130, 69, 236, 0.6)"
                    : "none",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal Display */}
      {showModal &&
        !isMobile && ( // Only display modal if not on mobile
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div
              className="relative w-full max-w-5xl rounded-2xl border border-purple-500/40 bg-[#0d0b1e] p-3 shadow-[0_0_40px_rgba(130,69,236,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleOutsideClick}
                aria-label="Close"
                className="absolute -top-3 -right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-white text-2xl font-bold leading-none shadow-lg transition-colors duration-200 hover:bg-purple-700"
              >
                &times;
              </button>
              <img
                src={currentImage}
                alt="Certificate"
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default SwiperCoverflow;
