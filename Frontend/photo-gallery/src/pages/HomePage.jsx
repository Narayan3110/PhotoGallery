import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-gray-400 to-gray-800 text-gray-50">
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center">
        <img
          src="/src/assets/photos/homePage/g1.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl font-extrabold text-white mb-4 drop-shadow-lg animate-fade-in-down">
            Welcome to Photo Gallery
          </h1>
          <p className="text-3xl font-extrabold text-yellow-200 drop-shadow-lg mb-6 animate-fade-in-down">
            Upload and explore stunning images seamlessly.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium text-lg rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-8 bg-gray-100 text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Explore Features
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Seamless Uploads",
              description:
                "Upload your images quickly and effortlessly with our simple interface.",
              icon: "cloud-upload",
            },
            {
              title: "Image Collections",
              description: "Organize your images into stunning collections.",
              icon: "folder",
            },
            {
              title: "Share Instantly",
              description:
                "Share your creations directly with your friends and family.",
              icon: "share",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="bg-blue-600 text-white p-4 rounded-full mb-4 shadow-md transform group-hover:scale-110 transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      feature.icon === "cloud-upload"
                        ? "M12 4v8m0 0l-3-3m3 3l3-3m-3 3v8"
                        : feature.icon === "folder"
                        ? "M3 7h18l-2 14H5L3 7z"
                        : "M4 4v12c0 2.21 1.79 4 4 4h12"
                    }
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-8 bg-white text-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "John Doe",
              feedback:
                "The best platform for uploading and managing my photography work.",
              image: "/src/assets/photos/homePage/users/user1.jpg",
            },
            {
              name: "Jane Smith",
              feedback: "Love the seamless interface and amazing features.",
              image: "/src/assets/photos/homePage/users/user2.jpg",
            },
            {
              name: "Sam Wilson",
              feedback: "A must-have for all photography enthusiasts!",
              image: "/src/assets/photos/homePage/users/user3.jpg",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-100 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-gray-600 italic mt-2">
                {testimonial.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
