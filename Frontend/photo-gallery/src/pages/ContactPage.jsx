

const ContactPage = () => {
  return (
    
    <div className="absolute w-[462px] h-[97px] left-[489px] top-[145px] flex flex-col items-center">
      <h1 className="text-black font-poppins font-bold text-[40px] leading-[60px]">
        Contact Us
      </h1>
      <p className="text-[#717171] font-poppins font-medium text-[18px] leading-[27px] text-center">
        Any question or remarks? Just write us a message!
      </p>
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your message"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
    </div>
  );
};

export default ContactPage;
