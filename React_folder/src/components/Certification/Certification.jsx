import React from "react";
import SwiperCoverflow from "../Certification/SwiperCoverflow";

// Helper function to convert glob import result into usable array
const importAllCertificates = (importedImages) => {
    return Object.keys(importedImages).map((key) => ({
        img: importedImages[key].default,
        link: "#", // You can update actual links here manually or map it from metadata
    }));
};

// Import all PNGs from the two folders
const devopsImages = import.meta.glob("../../assets/certification/devops/*.png", {
    eager: true,
});
const otherImages = import.meta.glob("../../assets/certification/others/*.png", {
    eager: true,
});

const Certification = () => {
    const devopsCertificates = importAllCertificates(devopsImages);
    const otherCertificates = importAllCertificates(otherImages);

    return (
        <section
            id="certification"
            className="py-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-[#0c0c1d]"
        >
            {/* Section Title */}
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white">CERTIFICATIONS</h2>
                <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
                <p className="text-gray-400 mt-4 text-lg font-semibold">
                    A showcase of my DevOps and other relevant certifications.
                </p>
            </div>

            {/* DevOps Certifications */}
            <div className="mb-24">
                <h3 className="text-2xl font-semibold text-white text-center mb-6">
                    DevOps Certifications
                </h3>
                <SwiperCoverflow certificates={devopsCertificates} />
            </div>

            {/* Other Certifications */}
            <div>
                <h3 className="text-2xl font-semibold text-white text-center mb-6">
                    Other Certifications
                </h3>
                <SwiperCoverflow certificates={otherCertificates} />
            </div>
        </section>
    );
};

export default Certification;
