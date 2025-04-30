import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules"; // Correct import path for Swiper v9+
import "swiper/css";
import "swiper/css/effect-coverflow";
import './SwiperCoverflow.css'; // Import the CSS file

const SwiperCoverflow = ({ certificates }) => {
    const [activeIndex, setActiveIndex] = useState(Math.floor(certificates.length / 2));
    const [showModal, setShowModal] = useState(false); // Manage modal visibility
    const [currentImage, setCurrentImage] = useState(null); // Track the current image
    const swiperRef = React.useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check if the device is mobile
    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth <= 768) { // Standard mobile breakpoint
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        checkMobile(); // Initial check
        window.addEventListener("resize", checkMobile); // Update on resize

        return () => window.removeEventListener("resize", checkMobile); // Cleanup on unmount
    }, []);

    // Handle image click: Center the clicked image and show modal
    const handleClick = (index, img) => {
        if (!isMobile) {  // Only trigger the modal if not on mobile
            setActiveIndex(index); // Update active index
            setCurrentImage(img); // Set the clicked image for the modal
            setShowModal(true); // Show the modal
            if (swiperRef.current) {
                swiperRef.current.swiper.slideTo(index); // Programmatically move Swiper to the clicked image
            }
        }
    };

    // Handle clicking outside of the modal to close it
    const handleOutsideClick = () => {
        setActiveIndex(null);
        setShowModal(false); // Close the modal
    };

    return (
        <div onClick={handleOutsideClick}>
            <Swiper
                effect="coverflow"
                modules={[EffectCoverflow]} // Correct module inclusion
                centeredSlides={true}
                slidesPerView={2}
                spaceBetween={40}
                initialSlide={activeIndex} // Start from the middle image
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex); // Update active index on slide change
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
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
                            className={`transition-all duration-500 ease-in-out cursor-pointer rounded-xl overflow-hidden mx-auto ${index === activeIndex ? "scale-[1.5] z-50" : "scale-100"
                                }`}
                            style={{
                                width: "440px",  // Adjusted width for image container
                                aspectRatio: "4/3",
                                backgroundImage: `url(${cert.img})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                boxShadow: index === activeIndex ? "0 0 30px rgba(130, 69, 236, 0.6)" : "none",
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Modal Display */}
            {showModal && !isMobile && (  // Only display modal if not on mobile
                <div className="modal-overlay">
                    <div className="modal-content">
                        <img src={currentImage} alt="Certificate" className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SwiperCoverflow;
