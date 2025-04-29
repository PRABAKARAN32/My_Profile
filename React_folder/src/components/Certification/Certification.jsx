import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

// Helper function to convert glob import result into usable array
const importAllCertificates = (importedImages) => {
    return Object.keys(importedImages).map((key) => ({
        img: importedImages[key].default,
        link: "#", // Optional: You can set a URL if needed
    }));
};

// Import images
const devopsImages = import.meta.glob("../../assets/certification/devops/*.png", {
    eager: true,
});
const otherImages = import.meta.glob("../../assets/certification/others/*.png", {
    eager: true,
});

const Certification = () => {
    const devopsCertificates = importAllCertificates(devopsImages);
    const otherCertificates = importAllCertificates(otherImages);

    const SwiperCoverflow = ({ certificates }) => {
        const [activeIndex, setActiveIndex] = useState(Math.floor(certificates.length / 2));
        const swiperRef = useRef(null);

        const handleClick = (index) => {
            setActiveIndex(index);
            if (swiperRef.current) {
                swiperRef.current.swiper.slideTo(index);
            }
        };

        return (
            <div>
                <Swiper
                    effect="coverflow"
                    modules={[EffectCoverflow]}
                    centeredSlides={true}
                    slidesPerView={2}
                    spaceBetween={40}
                    initialSlide={activeIndex}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
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
                                onClick={() => handleClick(index)}
                                className={`transition-all duration-500 ease-in-out cursor-pointer rounded-xl overflow-hidden mx-auto ${index === activeIndex ? "scale-[1.5] z-50" : "scale-100"
                                    }`}
                                style={{
                                    width: "440px",
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
            </div>
        );
    };

    return (
        <section
            id="certification"
            className="py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-[#0c0c1d]"
        >
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white">CERTIFICATIONS</h2>
                <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
                <p className="text-gray-400 mt-4 text-lg font-semibold">
                    A showcase of my DevOps and other relevant certifications.
                </p>
            </div>

            <div className="mb-24">
                <h3 className="text-2xl font-semibold text-white text-center mb-6">
                    DevOps Certifications
                </h3>
                <SwiperCoverflow certificates={devopsCertificates} />
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-white text-center mb-6">
                    Other Certifications
                </h3>
                <SwiperCoverflow certificates={otherCertificates} />
            </div>

            <style jsx>{`
        .swiper-container {
          height: 500px;
          width: 100%;
        }

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 350px;
          max-width: 100%;
          transition: transform 0.3s ease-out;
        }

        .swiper-slide .scaled-image {
          transition: transform 0.3s ease-out;
        }
      `}</style>
        </section>
    );
};

export default Certification;
