import React, { useState } from "react";

const MapMarker = ({ style, locationName }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative w-10 h-10"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        <img src="/photo/aboutus/pointer.png" />
      </div>
      {/* Popup on Hover */}
      {isHovered && (
        <div
          className="relative w-[150px] -top-20 left-1/2 transform -translate-x-1/2 bg-white text-black text-lg px-3 py-1 rounded-lg shadow-lg"
          style={{ whiteSpace: "nowrap" }}
        >
          {locationName}
        </div>
      )}
    </div>
  );
};
const SectionHeader = ({ title, highlight }) => (
  <div className="w-full mb-12">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
      {title} <span className="text-blue-700">{highlight}</span>
    </h2>
    <div className="w-24 h-1.5 bg-blue-700 mx-auto mt-4 rounded-full" />
  </div>
);
// Reusable Team Member Component
const TeamMember = ({ imgSrc, name, role, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
    <img
      src={imgSrc}
      alt={name}
      className="w-48 h-48 rounded-full object-cover border-4 border-blue-100"
    />
    <h3 className="mt-6 text-xl font-semibold text-gray-900">{name}</h3>
    <p className="text-blue-700 text-sm font-medium mb-4">{role}</p>
    <p className="text-gray-600 text-center leading-relaxed">{description}</p>
  </div>
);
const teamMembers = [
  {
    imgSrc: "/photo/aboutus/team/Rushi.png",
    name: "Rushikesh Aher",
    role: "Full Stack Developer",
    description:
      "Frontend integration specialist focused on seamless user experiences.",
  },
  {
    imgSrc: "/photo/aboutus/team/N.png",
    name: "Nikhil Katoch",
    role: "Backend Engineer",
    description: "Ensures robust system architecture and API integrations.",
  },
  {
    imgSrc: "/photo/aboutus/team/N.png",
    name: "Narayan Pandey",
    role: "UI/UX Designer",
    description: "Crafts intuitive interfaces with modern design principles.",
  },
  {
    imgSrc: "/photo/aboutus/team/S.png",
    name: "Shresth Shrivastav",
    role: "Cloud Architect",
    description: "Manages cloud infrastructure and media storage solutions.",
  },
];

const AboutUsPage = () => {
  return (
    <div className="flex flex-col items-center py-20 md:py-[50px] gap-3 w-full">
      <div className="flex flex-col p-10 w-full max-w-7xl mx-auto ">
        <SectionHeader title="About" highlight="Us" />
      </div>
      <div className="shadow-xl rounded-xl border border-gray-300 p-5 w-full max-w-7xl">
        <div className="flex flex-col items-start gap-8 w-full">
          <div className="relative bg-black w-full rounded-lg border border-gray-300 overflow-hidden">
            <img
              src="/photo/aboutus/Banner.webp"
              alt="Business Meeting"
              className="w-full h-auto shadow-xl"
            />
            <div className="absolute shadow-xl top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-20 p-5">
              <div className="w-[250px] shadow-xl md:w-[250px] lg:w-[400px] lg:pb-7 bg-black bg-opacity-40 p-4 rounded-lg">
                <p className="text-gray-200 text-center font-bold text-sm md:text-sm lg:text-2xl">
                  SnapSafe showcases stunning visuals, captured with
                  care to bring a unique perspective to each subject. Whether
                  it&apos;s landscapes, architecture, or moments frozen in time,
                  our collection is designed to inspire and engage visitors like
                  you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Our" highlight="Vision" />

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="p-6 bg-blue-50 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Capturing Excellence
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Delivering unparalleled visual experiences through
                  meticulously curated photography.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Focused Creativity
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Specializing in thematic storytelling through carefully
                  composed visual narratives.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="p-6 bg-blue-50 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Technical Artistry
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Merging advanced imaging technology with creative direction
                  for perfect results.
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Secure Innovation
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Implementing enterprise-grade security without compromising
                  visual quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col items-start pl-10 pr-10 gap-8 w-full max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-2 w-full">
          <SectionHeader title="Our" highlight="Commitment" />
          <div className="w-full h-1 bg-neutral-300"></div>
        </div>

        <div className="flex flex-col items-start gap-8 w-full">
          <div className="flex flex-row items-start gap-16 w-full">
            <h2 className="text-2xl font-semibold text-gray-900 w-80">
              Integrity
            </h2>
            <p className="text-lg text-justify text-gray-600 w-full">
              We prioritize confidentiality and exclusivity, ensuring that every
              photo collection is uniquely curated for our audience. Each image
              is thoughtfully presented to offer a one-of-a-kind visual
              experience.{" "}
            </p>
          </div>

          <div className="flex flex-row items-start gap-16 w-full">
            <h2 className="text-2xl font-semibold text-gray-900 w-80">
              Excellence
            </h2>
            <p className="text-lg text-justify text-gray-600 w-full">
              ConsultUs is committed to ensuring that our advice and
              recommendations are based on the best combination of methods,
              information research, creativity and internal quality assurance.
            </p>
          </div>

          <div className="flex flex-row items-start gap-16 w-full">
            <h2 className="text-2xl font-semibold text-gray-900 w-80">
              Lasting Connections
            </h2>
            <p className="text-lg text-justify text-gray-600 w-full">
              We value long-term relationships with our audience and
              contributors, believing that consistency and trust are key to
              delivering an inspiring and ever-evolving photography experience.{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-center items-start pl-10 pr-10 gap-8 w-full max-w-7xl mx-auto">
        {/* Team Bios */}
        <div className="">
          {/* Team Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeader title="Our" highlight="Success Team" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <TeamMember key={index} {...member} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Map */}
      <section className="py-20 bg-gray-900">
        <div className="flex flex-col items-start pl-10 pr-10 gap-8 w-full max-w-7xl mx-auto">
          <div className="w-full max-w-screen-xl">
            <div className="flex flex-col items-center gap-12 md:gap-[48px] w-full">
              <SectionHeader title="" highlight="Global Presence" />
            </div>

            <div className="flex gap-8 w-full pt-5">
              <div className="w-full h-full relative">
                <MapMarker
                  style={{
                    position: "absolute",
                    top: "52.5%",
                    left: "69%",
                    transform: "translate(-50%, -50%)",
                    cursor: "pointer",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  locationName="Bengaluru,India"
                />
                <img
                  src="https://dashboard.codeparrot.ai/api/image/Z5fajtgGlUAkMdME/contents.png"
                  alt="world map"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-8">
        <h2 className="text-2xl md:text-4xl font-semibold text-center text-neutral-900 leading-tight">
          Frequently Asked Questions
        </h2>
        <div className="w-full mt-6 space-y-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg text-gray-800">
              How can I view the photos?
            </h3>
            <p className="text-gray-600">
              Simply navigate through our gallery section where you can explore
              different categories of photos. Click on any image to view it in
              full size.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg text-gray-800">
              Can I purchase the images?
            </h3>
            <p className="text-gray-600">
              Yes, we offer high-resolution downloads of selected images. You
              can purchase them directly through our website.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg text-gray-800">
              Are the images free to use?
            </h3>
            <p className="text-gray-600">
              While we offer free previews, the images are copyrighted. Please
              check our licensing terms for details on how you can use the
              images.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg text-gray-800">
              Do you provide custom photography services?
            </h3>
            <p className="text-gray-600">
              Yes, we offer custom photography services. Contact us directly to
              discuss your needs and get a quote.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
