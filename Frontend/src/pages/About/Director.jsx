import React from "react";
import director from "../../assets/management/narvesh.png";
import BreadCrumbs from "../../component/BreadCums";
import { FaQuoteLeft } from "react-icons/fa";

const DirectorMessage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Dr. Narvesh Kumar " },
  ];

  return (
    <section className="bg-white text-gray-800 mx-auto ">
      <BreadCrumbs headText={"Director's Message"} items={breadcrumbItems} />

      <div className="container mx-auto px-4 py-10 sm:py-12 md:py-14 lg:py-16 ">
        <div className="flex flex-col md:flex-row lg:items-start justify-center md:items-start items-center gap-8 ">
          {/* Left: Image Section */}
          <div className="relative w-full max-w-[20rem]  text-center lg:text-left">
            <div className="border-4 border-main rounded-lg overflow-hidden shadow-lg">
              <img
                src={director}
                alt="Director"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-4">
              <p className="text-xl font-bold text-center text-yellow tracking-wide uppercase">
                Dr. Narvesh Kumar
              </p>
              <p className="text-center ">M.B.B.S. , M.D.(SGPGI), PDCC (SGPGI)

              </p>
              <p className="text-gray-500 text-sm mt-1 px-3 py-1 rounded-md bg-gray-100 border border-main inline-block shadow-md italic text-center">
                Director & Head - <span className="text-main font-medium">Nuclear Medicine & PET-CT</span> 🔬
              </p>
            </div>
          </div>



          {/* Right: Director's Message */}
          <div className="w-full lg:max-w-4xl border-l-4 border-main lg:pl-6 pl-2 text-justify ">
            <div className="flex gap-2">
              <FaQuoteLeft className="text-main text-start text-xl" />
              <h2 className="text-3xl font-bold text-main mb-4 flex items-center gap-2">
                The Greatest Wealth is Health.
              </h2>
            </div>

            <p className="text-lg leading-relaxed text-gray-600">
              Welcome to{" "}  Our Diagnostic and Theranostic Center, where our commitment to your health and well-being is our top priority. In an era where personalized medicine is transforming healthcare, we are dedicated to providing cutting-edge diagnostic and therapeutic services tailored to your individual needs.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 mt-4">
              Our State-of-the-Art Facility features AI-Enabled and fully Automated Technology, ensuring the highest standards of diagnostic and therapeutic care. Our experienced professionals are dedicated to delivering accurate diagnoses and effective treatment options.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 mt-4">
              At Shanya Scans, we believe in the power of collaboration. Our multidisciplinary team works closely together to ensure that each patient receives a comprehensive approach to their care, utilizing both diagnostic and therapeutic strategies. We are committed to ongoing research and innovation, staying at the forefront of advancements in medical science to provide you with the best possible outcome.
            </p>
            <p className="text-lg leading-relaxed text-gray-600 mt-4">
              Your trust is invaluable to us, and we are here to support you every step of the way. Thank you for choosing our center as your partner in health. Together, we can achieve better health outcomes and enhance your quality of life.
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default DirectorMessage;
